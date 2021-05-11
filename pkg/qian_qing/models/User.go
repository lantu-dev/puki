package models

import (
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/base/null"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
)

type User struct {
	// 「用户 ID」请不要使用自增主键 ( auto increment primary key )
	ID base.ID `gorm:"type:bigint;primaryKey;not null"`
	// 「密码」用于用户名、密码组合登陆中的密码
	Password string `json:"-"`
	// 「真实姓名」未设置为空字符串
	RealName string `gorm:"not null"`
	// 「性别」，true为男性, false为女性
	Gender     null.Bool `gorm:"default:null"`
	ClassID    int16
	Age        int
	Identity   string
	IdentityID uint
	// 「手机号」用于手机号、验证码登陆组合，全局唯一。可空，若空，则该用户未设置手机号，无法使用 "手机号、验证码组合登陆"
	// 格式为 <国家编号><手机号>，如 8615511123234
	PhoneNumber int64 `gorm:"unique;default:null"`
	ParentPhone int16
	// 「是否为内部用户」，内部用户可登陆后台管理页面
	IsStaff null.Bool `gorm:"not null;default:false"`
	// 「是否为超级管理员」
	IsSuper null.Bool `gorm:"not null;default:false"`
	//班委
	IsManager null.Bool `gorm:"not null;default:false"`
}

func (user *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err == nil
}

func (user *User) SetGender(gender null.Bool) error {
	user.Gender = gender

	return nil
}
func (user *User) SetPassword(passWord string) error {
	hashed, err := bcrypt.GenerateFromPassword([]byte(passWord), 14)
	if err != nil {
		log.Fatal(err)
	}
	user.Password = string(hashed)

	return nil
}
