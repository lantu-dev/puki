package auth

import (
	"context"
	"fmt"
	"github.com/go-redis/redis/v8"
	"github.com/google/uuid"
	"github.com/juju/errors"
	"github.com/lantu-dev/puki/pkg/base"
	log "github.com/sirupsen/logrus"
	"math/rand"
	"time"
)

const otpChars = "1234567890"

func generateOTP(length int) (string, error) {
	rand.Seed(time.Now().Unix())
	buffer := make([]byte, length)
	otpCharsLength := len(otpChars)
	for i := 0; i < length; i++ {
		buffer[i] = otpChars[rand.Int()%otpCharsLength]
	}

	return string(buffer), nil
}

var SMSLogin *smsLogin

const _smsKeyTagCode = int64(1 << 56)
const _smsKeyTagRate = int64(2 << 56)
const _smsKeyTagVerifyTimes = int64(3 << 56)

type smsLogin struct {
	cache  *redis.Client
	sender func(phoneNumber int64, code string) error
}

// 初始化 SMSLogin 控制器
func SetupSMSLogin(sender func(phoneNumber int64, code string) error, rds *redis.Client) {
	SMSLogin = &smsLogin{
		cache:  rds,
		sender: sender,
	}
}

// 60秒内只能发送一次
func smsRateLimitKey(phoneNumber int64) string {
	return fmt.Sprintf("sms:rate:%d", phoneNumber)
}

// 一条验证码有效期5分钟
func smsCodeKey(phoneNumber int64) string {
	return fmt.Sprintf("sms:code:%d", phoneNumber)
}

//
func smsVerifyTimesKey(phoneNumber int64) string {
	return fmt.Sprintf("sms:times:%d", phoneNumber)
}

// 发送验证码。phoneNumber 格式同 auth/models.User.PhoneNumber
func (c *smsLogin) SendCode(ctx context.Context, phoneNumber int64) (session string, err error) {

	rateKey := smsRateLimitKey(phoneNumber)
	if ts, err := c.cache.Get(ctx, rateKey).Int64(); err == nil && time.Now().Unix()-ts < 10 {
		return "", errors.QuotaLimitExceededf("only one code per minute")
	}

	code, err := generateOTP(6)
	if err != nil {
		return "", err
	}
	if err := c.sender(phoneNumber, code); err != nil {
		return "", errors.Trace(err)
	}

	codeKey := smsCodeKey(phoneNumber)
	session = uuid.NewString()

	sessionAndCode := fmt.Sprintf("%s:%s", session, code)

	if base.IsDev {
		log.Infof("SMSLogin send code %s to %d", code, phoneNumber)
	}

	if err := c.cache.Set(ctx, rateKey, time.Now().Unix(), 1*time.Second).Err(); err != nil {
		return "", errors.Trace(err)
	}
	if err := c.cache.Set(ctx, codeKey, sessionAndCode, 5*time.Minute).Err(); err != nil {
		return "", errors.Trace(err)
	}
	if err := c.cache.Del(ctx, smsVerifyTimesKey(phoneNumber)).Err(); err != nil {
		return "", errors.Trace(err)
	}

	return

}

func (c *smsLogin) Verify(ctx context.Context, session string, phoneNumber int64, code string) (err error) {
	codeKey := smsCodeKey(phoneNumber)
	var sessionAndCode string

	if val, err := c.cache.Get(ctx, codeKey).Result(); err != nil {
		return base.UserErrorf(nil, "验证码不再有效期内")
	} else {
		sessionAndCode = val
	}

	timesKey := smsVerifyTimesKey(phoneNumber)

	var times int
	if times, err = c.cache.Get(ctx, timesKey).Int(); err != nil {
		if times >= 5 {
			return base.UserErrorf(nil, "操作过于频繁")
		}
	}
	times += 1
	if err := c.cache.Set(ctx, timesKey, times, 5*time.Minute).Err(); err != nil {
		return errors.Trace(err)
	}

	if fmt.Sprintf("%s:%s", session, code) != sessionAndCode {
		return base.UserErrorf(nil, "验证码错误")
	}
	err = errors.Trace(c.cache.Del(ctx, timesKey).Err())

	return

}
