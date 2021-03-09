package models

import (
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

//简历
type Resume struct {
	gorm.Model

	PositionID int64

	PositionName string

	//投递简历者ID
	SenderID int64
	//简历内容
	Content string
}

func FindResumesBySenderIAndProjectID(tx *gorm.DB, senderID int64, projectID int64) []Resume {
	var resumes []Resume
	positions := FindPositionsByProjectID(tx, projectID)
	for _, item := range positions {
		var resume Resume
		err := tx.Where(&Resume{PositionID: int64(item.ID), SenderID: senderID}).First(&resume).Error
		if err != nil {
			log.Debug(err)
			continue
		}
		resumes = append(resumes, resume)
	}
	return resumes
}

func UpdateResumeBySenderIAndPositionID(tx *gorm.DB, senderID int64, positionID int64, content string) (err error) {
	err = tx.Model(&Resume{}).Where(&Resume{PositionID: positionID, SenderID: senderID}).
		Update("Content", content).Error
	if err != nil {
		log.Debug(err)
		tx.Rollback()
	}
	return err
}

func CreateResumeBySenderIDAndPositionName(tx *gorm.DB, projectID int64, senderID int64, positionName string, content string) (err error) {
	position := FindPositionByProjectIDAndPositionName(tx, projectID, positionName)
	err = tx.Create(&Resume{
		PositionID:   int64(position.ID),
		PositionName: positionName,
		SenderID:     senderID,
		Content:      content,
	}).Error
	if err != nil {
		log.Debug(err)
		tx.Rollback()
	}
	return err
}
