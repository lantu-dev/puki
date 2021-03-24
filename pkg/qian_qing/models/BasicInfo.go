package models

import (
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type BasicInfo struct {
	gorm.Model
	ClassPic    string
	ClassNumber int16
	AcademyName string
	Recorder    string
	RecorderID  string
	StudentNum  int
	StudentHere int
}

func GetBasicInfo(tx *gorm.DB, ID string) BasicInfo {
	var Infos BasicInfo
	result := tx.Where(&BasicInfo{RecorderID: ID}).Find(&Infos)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return Infos
}
func UpdateRecorder(tx *gorm.DB, ClassNumber int16, NewRecorder string) (err error) {
	result := tx.Model(&BasicInfo{}).
		Where("ClassNumber=?", ClassNumber).
		Update("Recorder", NewRecorder).Error
	if result != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return err
}
func UpdateStuNum(tx *gorm.DB, ClassNumber int16, NewStuNum int) (err error) {
	result := tx.Model(&BasicInfo{}).
		Where("ClassNumber=?", ClassNumber).
		Update("StudentNumber", NewStuNum).Error
	if result != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return err
}
func UpdateStudentHere(tx *gorm.DB, ClassNumber int16, NewStuHere int) (err error) {
	result := tx.Model(&BasicInfo{}).
		Where("ClassNumber=?", ClassNumber).
		Update("StudentHere", NewStuHere).Error
	if result != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return err
}
