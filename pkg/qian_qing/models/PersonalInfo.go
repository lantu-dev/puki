package models

import (
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type PersonalInfo struct {
	//ID为学号
	gorm.Model
	ID int16
	//姓名
	Name     string
	ClassNum int16
	//群众，共青团团员，预备党员或者党员
	Identity       string
	IDNumber       string
	PhoneNum       int16
	ParentPhoneNum int16
	//家庭住址
	LivingLocation      string
	VolenteerTime       int
	VolunteerProjectNum int
}

func GetSBInfo(tx *gorm.DB, ID int16) PersonalInfo {
	var OnePersonalInfo PersonalInfo
	result := tx.Where(&PersonalInfo{ID: ID}).Find(&OnePersonalInfo)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return OnePersonalInfo
}
