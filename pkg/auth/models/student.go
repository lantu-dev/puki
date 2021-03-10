package models

import (
	"github.com/juju/errors"
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/base/null"
	"gorm.io/gorm"
)

// 学生用户模型
type Student struct {
	// 「用户 ID」
	UserID base.ID `gorm:"type:bigint;primaryKey;not null"`

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

func (student *Student) GetUser(tx *gorm.DB) (*User, error) {
	if student.User == nil {
		var user User
		if err := tx.Model(&User{}).First(&user, student.UserID).Error; err != nil {
			return nil, errors.Trace(err)
		}
		student.User = &user

	}
	return student.User, nil
}

func FindOrCreateStudentFromUser(tx *gorm.DB, user *User) (*Student, error) {
	stu := Student{UserID: user.ID}
	if err := tx.Model(&Student{}).FirstOrCreate(&stu).Error; err != nil {
		return nil, err
	}
	return &stu, nil
}
