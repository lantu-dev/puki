package services

import (
	"fmt"
	"github.com/lantu-dev/puki/pkg/auth"
	"github.com/lantu-dev/puki/pkg/auth/models"
	"github.com/lantu-dev/puki/pkg/base"
	"gorm.io/gorm"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"
)

type UserService struct {
	db *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{db: db}
}

type UserLoginReq struct {
	UserName string
	Password string
}

type UserLoginRes struct {
	Token string
}

// 用户名、密码组合登陆
func (s *UserService) Login(r *http.Request, req *UserLoginReq, res *UserLoginRes) (err error) {

	return
}

type SMSSendCodeReq struct {
	PhoneNumber string `validate:"required,e164"` // like +86xxxxxx
}
type SMSSendCodeRes struct {
	Session string
}

// 手机号验证码登陆/发送验证码
func (s *UserService) SMSSendCode(r *http.Request, req *SMSSendCodeReq, res *SMSSendCodeRes) (err error) {
	if !strings.HasPrefix(req.PhoneNumber, "+86") {
		return base.UserErrorf("目前仅支持中国大陆地区(+86)手机号登陆")
	}
	phoneNumber, err := strconv.ParseInt(req.PhoneNumber[1:], 10, 64)
	if err != nil {
		log.Fatal(err)
	}
	res.Session, err = auth.SMSLogin.SendCode(r.Context(), phoneNumber)
	return
}

type SMSCodeLoginReq struct {
	PhoneNumber string `validate:"required,e164"` // like +86xxxxxx
	Code        string `validate:"required,numeric,len=6"`
	Session     string `validate:"required"`
}
type SMSCodeLoginRes struct {
	TokenUser *auth.TokenUser
	Token     string
}

// 手机号验证码登陆
func (s *UserService) SMSCodeLogin(r *http.Request, req *SMSCodeLoginReq, res *SMSCodeLoginRes) (err error) {
	if !strings.HasPrefix(req.PhoneNumber, "+86") {
		return base.UserErrorf("目前仅支持中国大陆地区(+86)手机号登陆") // 用户造成的错误，前端会弹窗报错
	}
	phoneNumber, err := strconv.ParseInt(req.PhoneNumber[1:], 10, 64)
	if err != nil {
		log.Fatal(err) // 认为是不可能出现的错误
	}
	err = auth.SMSLogin.Verify(r.Context(), req.Session, phoneNumber, req.Code)
	if err != nil {
		return err
	}

	tx := s.db.Begin() // 数据库事务，要求所有数据库操作都在数据库事务的包裹中操作

	user := models.FindOrCreateUserByPhoneNumber(tx, phoneNumber)
	res.TokenUser, err = auth.NewTokenUser(user)
	if err != nil {
		return err
	}

	res.Token = res.TokenUser.Sign(7 * 24 * time.Hour)
	r.Response.Header.Set("Set-Authorization", fmt.Sprintf("Token %s", res.Token))

	err = tx.Commit().Error // 数据库事务
	return
}

type WhoAmIReq struct {
}
type WhoAmIRes struct {
	User models.User
}

func (s *UserService) WhoAmI(r *http.Request, req *WhoAmIReq, res *WhoAmIRes) (err error) {
	tu, err := auth.ExtractTokenUser(r)
	if err != nil {
		return err
	}

	tx := s.db.Begin()

	if !tu.IsAnon() {
		res.User = tu.User(tx)
	}

	err = tx.Commit().Error
	return
}
