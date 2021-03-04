package services

import (
	"github.com/lantu-dev/puki/pkg/auth"
	"github.com/lantu-dev/puki/pkg/auth/models"
	"github.com/lantu-dev/puki/pkg/base"
	"gopkg.in/guregu/null.v4"
	"gorm.io/gorm"
	"log"
	"net/http"
	"strconv"
	"strings"
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
	User      *models.User
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

	res.Token = res.TokenUser.Encode()
	res.User = user

	err = tx.Commit().Error // 数据库事务
	return
}

type GetProfileReq struct {
}
type GetProfileRes struct {
	User    models.User
	Student models.Student
}

func (s *UserService) GetProfile(r *http.Request, req *GetProfileReq, res *GetProfileRes) (err error) {
	tu, err := auth.ExtractTokenUser(r)
	if err != nil {
		return base.UserErrorf("请通过手机号登录账户")
	}

	tx := s.db.Begin()

	if !tu.IsAnon() {
		res.User = tu.User(tx)
		tx.First(&res.Student, tu.ID)
	}

	err = tx.Commit().Error
	return
}

type CompleteProfileReq struct {
	RealName string
	UserName null.String
	NickName string
	Password string

	StudentID string
	School    string
}
type CompleteProfileRes struct {
	Completed bool
}

func (s *UserService) CompleteProfile(r *http.Request, req *CompleteProfileReq, res *CompleteProfileRes) error {
	// 检查用户登录
	tu, err := auth.ExtractTokenUser(r)
	if err != nil {
		// 用户请求头没有Token字段
		return base.UserErrorf("请登录/注册账户")
	}

	// 以后的游客权限
	if tu.IsAnon() {
		return base.UserErrorf("login required")
	}

	s.db.Transaction(func(tx *gorm.DB) (err error) {
		user := tu.User(tx)

		// 如果请求修改真实姓名
		if req.RealName != "" {
			// 校验并设置真实姓名
			if err = user.SetRealName(req.RealName); err != nil {
				return err
			}
		}

		// 如果请求修改用户名
		if !req.UserName.Equal(null.StringFrom("")) {
			// 校验并设置用户名
			if err = user.SetUserName(tx, req.UserName); err != nil {
				return err
			}
		}

		// 如果请求修改昵称
		if req.NickName != "" {
			// 校验并设置昵称
			if err = user.SetNickName(req.NickName); err != nil {
				return err
			}
		}

		// 如果请求修改密码
		if req.Password != "" {
			// 校验并设置密码
			if err = user.SetPassword(req.Password); err != nil {
				return err
			}
		}

		// 如果请求修改学号
		if req.StudentID != "" {
			stu, err := models.FindOrCreateStudentFromUser(tx, &user)
			if err != nil {
				return err
			}
			stu.UntrustedID = req.StudentID
			stu.School = req.School
			if err = tx.Save(stu).Error; err != nil {
				return err
			}
		}

		if err = tx.Save(&user).Error; err != nil {
			return err
		}

		res.Completed = true

		return nil
	})

	return nil
}
