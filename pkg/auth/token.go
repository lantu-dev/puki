/* 通证 ( Token ) 相关。

通证 ( Token ): 当客户端用户登陆成功后，系统会向该客户端用户签发一定有效期的 token，之后客户端用户每次请求的时候，都需要在请求头部携带该 token，
以标示自己的用户身份。

*/
package auth

import (
	"bytes"
	"crypto/hmac"
	"crypto/sha256"
	"encoding/base64"
	"fmt"
	"github.com/lantu-dev/puki/pkg/auth/models"
	log "github.com/sirupsen/logrus"
	"github.com/vmihailenco/msgpack/v5"
	"gorm.io/gorm"
	"net/http"
	"os"
	"strings"
	"time"
)

// TokenUser: 编码在 token 字符串中的用户信息
type TokenUser struct {
	// 用户 ID
	ID int64

	// Token 失效时间
	ExpiresAt int64

	// 用户角色
	// Roles []int64

	IsStaff bool
	IsSuper bool
}

// 是否是匿名用户 （即未登陆用户）
func (u *TokenUser) IsAnon() bool {
	return u.ID == 0
}

// 使用 TokenUser 获取 models.User
func (u *TokenUser) User(tx *gorm.DB) (user models.User) {
	err := tx.First(&user, u.ID).Error
	if err != nil {
		log.Fatal("bad TokenUser: ", err)
	}
	return
}

// 从 models.User 获得 TokenUser
func NewTokenUser(u *models.User) (*TokenUser, error) {
	user := &TokenUser{
		ID:      u.ID,
		IsStaff: u.IsStaff.ValueOrZero(),
		IsSuper: u.IsSuper.ValueOrZero(),
	}

	return user, nil
}

// http.Request 中解析 TokenUser
func ExtractTokenUser(r *http.Request) (user TokenUser, err error) {
	auth := r.Header.Get("Authorization")
	err = decodeTokenUser(auth, &user)
	return
}

func (t *TokenUser) Sign(dur time.Duration) string {
	t.ExpiresAt = time.Now().Add(dur).Unix()
	var payload bytes.Buffer
	enc := msgpack.NewEncoder(&payload)
	enc.UseArrayEncodedStructs(true)
	err := enc.Encode(t)
	if err != nil {
		log.Fatalf("gob encode error %v", err)
	}
	hasher := hmac.New(sha256.New, tokenKey)
	hasher.Write(payload.Bytes())
	mac := hasher.Sum(nil)
	return fmt.Sprintf("Token %s %s",
		base64.StdEncoding.EncodeToString(payload.Bytes()),
		base64.StdEncoding.EncodeToString(mac),
	)
}

func decodeTokenUser(token string, user *TokenUser) error {
	parts := strings.SplitN(token, " ", 3)
	if len(parts) != 3 || parts[0] != "Token" {
		return fmt.Errorf("bad token format")
	}
	payload, err := base64.StdEncoding.DecodeString(parts[1])
	if err != nil {
		return fmt.Errorf("bad token format(payload)")
	}
	sig, err := base64.StdEncoding.DecodeString(parts[2])
	if err != nil {
		return fmt.Errorf("bad token format(sig)")
	}
	hasher := hmac.New(sha256.New, tokenKey)
	hasher.Write(payload)
	mac := hasher.Sum(nil)
	if !hmac.Equal(sig, mac) {
		return fmt.Errorf("untrusted token")
	}
	dec := msgpack.NewDecoder(bytes.NewBuffer(payload))
	err = dec.Decode(user)
	if err != nil {
		log.Fatalf("bad siged payload %v", err)
	}

	if time.Now().Unix() > user.ExpiresAt {
		return fmt.Errorf("token expired")
	}
	return nil
}

var tokenKey []byte

func init() {
	tokenKeyStr := os.Getenv("TOKEN_KEY")
	if len(tokenKey) == 0 {
		log.Warn("env TOKEN_KEY is empty, use value `dev` instead")
		tokenKeyStr = "dev"
	}
	tokenKey = []byte(tokenKeyStr)
}
