package models

import (
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/base/null"
	log "github.com/sirupsen/logrus"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

// 用户模型
type User struct {

	// 「用户 ID」请不要使用自增主键 ( auto increment primary key )
	ID base.ID `gorm:"type:bigint;primaryKey;not null"`

	// 「用户名」用于用户名、密码组合登陆中的用户名，全局唯一；可空，若空，则该用户未设置用户名，无法使用 "用户名、密码组合登陆"
	UserName null.String `gorm:"unique;default:null"`
	// 「密码」用于用户名、密码组合登陆中的密码
	Password string `json:"-"`

	// 「手机号」用于手机号、验证码登陆组合，全局唯一。可空，若空，则该用户未设置手机号，无法使用 "手机号、验证码组合登陆"
	// 格式为 <国家编号><手机号>，如 8615511123234
	PhoneNumber int64 `gorm:"unique;default:null"`

	// 「真实姓名」未设置为空字符串
	RealName string `gorm:"not null"`

	// 「头像」 URL 未设置为空字符串
	AvatarURI string `gorm:"not null"`

	// 「昵称」用于对外展示
	NickName string `gorm:"not null"`

	// 「性别」，true为男性, false为女性
	Gender null.Bool `gorm:"default:null"`

	// 「是否为内部用户」，内部用户可登陆后台管理页面
	IsStaff null.Bool `gorm:"not null;default:false"`

	// 「是否为超级管理员」
	IsSuper null.Bool `gorm:"not null;default:false"`

	// 「账号是否被禁用」
	IsDisabled null.Bool `gorm:"not null;default:false"`
}

func (user *User) CheckPassword(password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
	return err == nil
}

func (user *User) SetGender(gender null.Bool) error {
	user.Gender = gender

	return nil
}

func (user *User) SetNickName(nickName string) error {
	user.NickName = nickName

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

func (user *User) SetRealName(realName string) error {
	user.RealName = realName

	return nil
}

func (user *User) SetUserName(tx *gorm.DB, userName string) error {
	if userName == "" {
		user.UserName = null.NewString("", false)
		return nil
	}
	// TODO: remove non-ascii & length limit
	anotherUser := FindUserByUserName(tx, userName)
	if anotherUser != nil {
		return base.UserErrorf(nil, "UserName exists")
	}

	user.UserName = null.StringFrom(userName)
	return nil
}

func FindOrCreateUserByPhoneNumber(tx *gorm.DB, phoneNumber int64) *User {
	var user User
	user.PhoneNumber = phoneNumber
	if err := tx.Model(&User{}).Where(&user).First(&user).Error; err == nil {
		// 已有该用户
		return &user
	} else {
		log.Debug(err)
	}
	// 注册新用户
	user.ID = base.GenerateID() // 需要手动生成ID
	if err := tx.Model(&User{}).Create(&user).Error; err != nil {
		log.Panicf("%+v", err)
	}

	return &user
}

func FindUserById(tx *gorm.DB, id int64) *User {
	var user User
	if err := tx.Model(&User{}).First(&user, id).Error; err == nil {
		return &user
	} else {
		log.Debug(err)
		return nil
	}
}

func FindUserByUserName(tx *gorm.DB, userName string) *User {
	if userName == "" {
		return nil
	}
	var user User
	if err := tx.Model(&User{}).Where(&User{UserName: null.StringFrom(userName)}).First(&user).Error; err == nil {
		return &user
	} else {
		log.Debug(err)
		return nil
	}
}
