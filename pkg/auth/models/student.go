package models

import (
	"github.com/juju/errors"
	"gopkg.in/guregu/null.v4"
	"gorm.io/gorm"
)

// 学生用户模型
type Student struct {
	// 「用户 ID」
	UserID int64 `gorm:"type:bigint;primaryKey;not null"`

	User *User

	// 「学校」
	University string `gorm:"not null"`

	// 「学院」
	School string `gorm:"not null"`

	// 「行政班」
	ClassID string `gorm:"not null"`

	// 「学号」（用户输入的）
	UntrustedID string `gorm:"not null"`

	// 「学号」 经过审核的，全局唯一
	TrustedID null.String `gorm:"unique,default:null"`

	// 「审核资料」 学生证照片
	VerifyImageURL null.String `gorm:"default:null"`
}

func (s *Student) GetUser(tx *gorm.DB) (*User, error) {
	if s.User == nil {
		var user User
		if err := tx.Model(&User{}).First(&user, s.UserID).Error; err != nil {
			return nil, errors.Trace(err)
		}
		s.User = &user

	}
	return s.User, nil
}

func FindOrCreateStudentFromUser(tx *gorm.DB, user *User) (*Student, error) {
	stu := Student{UserID: user.ID}
	if err := tx.Model(&Student{}).FirstOrCreate(&stu).Error; err != nil {
		return nil, err
	}
	return &stu, nil
}
