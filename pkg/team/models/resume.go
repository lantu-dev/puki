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

	//用来判定项目的管理者是否已阅读过该简历【只有未阅读的简历会出现在”项目管理页中“】
	IsRead bool

	//用来判定该简历的投递者是否被录取了
	IsEnrolled bool

	//投递简历者ID
	SenderID int64
	//简历内容
	Content string
}

func FindResumesBySenderIDAndProjectID(tx *gorm.DB, senderID int64, projectID int64) []Resume {
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

func UpdateResumeBySenderIDAndPositionID(tx *gorm.DB, senderID int64, positionID int64, content string) (err error) {
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
		IsRead:       false,
		SenderID:     senderID,
		Content:      content,
	}).Error
	if err != nil {
		log.Debug(err)
		tx.Rollback()
	}
	return err
}

//根据ID查找简历
func FindResumeByID(tx *gorm.DB, resumeID int64) Resume {
	var resume Resume
	err := tx.First(&resume, resumeID).Error
	if err != nil {
		log.Debug(err)
		tx.Rollback()
	}
	return resume
}

//录取简历
func SetResumeEnrolled(tx *gorm.DB, ResumeID int64) (err error) {
	var resume Resume
	err = tx.First(&resume, ResumeID).Error
	if err != nil {
		log.Debug(err)
		tx.Rollback()
	}
	resume.IsRead = true
	resume.IsEnrolled = true
	tx.Save(&resume)
	return err
}

//拒绝简历
func SetResumeRejected(tx *gorm.DB, ResumeID int64) (err error) {
	var resume Resume
	err = tx.First(&resume, ResumeID).Error
	if err != nil {
		log.Debug(err)
		tx.Rollback()
	}
	resume.IsRead = true
	resume.IsEnrolled = false
	tx.Save(&resume)
	return err
}
