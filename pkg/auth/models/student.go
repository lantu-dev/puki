package models

import (
	"github.com/lantu-dev/puki/pkg/base"
	log "github.com/sirupsen/logrus"
	"gopkg.in/guregu/null.v4"
	"gorm.io/gorm"
	"time"
)

// 学生用户模型
type Student struct {
	//「用户 ID」请不要使用自增主键 ( auto increment primary key )
	ID int64 `gorm:"type:bigint;primaryKey;not null"`

	//「用户名」外键
	Name null.String `gorm:"unique;default:null"`

	//「学校」
	University string `gorm:"not null"`

	//「学院」
	School string `gorm:"not null"`

	//「行政班」
	Class int64 `gorm:"not null"`

	//「学号」
	StuID int64 `gorm:"not null"`
}

func FindOrCreateUserByName(tx *gorm.DB, name string) *Student {
	var student Student
	student.Name = name
	if err := tx.Model(&Student{}).Where(&student).First(&student).Error; err == nil {
		//已有该用户
		return &student
	} else {
		log.Debug(err)
	}
	//注册新用户
	student.ID = base.GenerateID() //需要手动生成ID
	if err := tx.Model(&Student{}).Save(&student); err != nil {
		log.Panic(err)
	}

	return &student
}

func FindUserById(tx *gorm.DB, id int64) *Student {
	var student Student
	if err := tx.Model(&Student{}).First(&student, id).Error; err == nil {
		return &student
	} else {
		log.Debug(err)
		return nil
	}
}
