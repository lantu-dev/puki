package models

import (
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type PartyBuild struct {
	gorm.Model
	ClassNumber       int16
	NumberInParty     int
	NumberWillInParty int
}

//查找党团建设信息
func FindPartyBuild(tx *gorm.DB, ClassNumber int16) (int, int) {
	var PartyInfo PartyBuild
	result := tx.Where(&PartyBuild{ClassNumber: ClassNumber}).Find(&PartyInfo)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return PartyInfo.NumberInParty, PartyInfo.NumberWillInParty
}

//修改党员人数
func UpdatePartyNumber(tx *gorm.DB, ClassNumber int16, NewPartyNum int) (err error) {
	result := tx.Where(&PartyBuild{ClassNumber: ClassNumber}).Update("NumberInParty", NewPartyNum)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return err
}

//修改预备党员人数
func UpdateWillPartyNumber(tx *gorm.DB, ClassNumber int16, NewWillPartyNum int) (err error) {
	result := tx.Where(&PartyBuild{ClassNumber: ClassNumber}).Update("NumberWillInParty", NewWillPartyNum)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return err
}
