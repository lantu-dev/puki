package models

import (
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

//模型间逻辑说明：通过项目找到对应的Position => 通过Position找到对应的PositionTemplate => 通过PositionTemplate找到其他项目

//岗位Position，即招募需求中，需要具有哪些方面能力的人才；举例：前端开发、后端开发、UI设计、UX设计等
type Position struct {
	gorm.Model

	//岗位对应的项目ID，作为岗位-项目关系的foreignKey
	ProjectID int64

	//岗位介绍
	//岗位名称ID
	PositionTemplateID int64
	//岗位简介，若未空则显示对应PositionTemplate中的DefaultDescribe
	Describe string

	//目前该岗位已招募的人数（录用人数）
	NowPeople int64
	//需要招募的人数（需求人数）
	NeedPeople int64
	//对该岗位感兴趣的人数
	InterestPeople int64

	//对该岗位有兴趣的聊天
	Conversations []*Conversation `gorm:"many2many:conversation_positions;"`

	//该岗位的简历
	Resumes []Resume
}

//岗位模板，这里把岗位名称单拎出来是为了让岗位名称仅来自于从已有岗位名称中挑选，以方便首屏中依据岗位的筛选
//附有默认的岗位描述，该内容可自定义，若用户未编写则未默认内容
//同时Position未定死的原因是同一个岗位比如后端开发，在不同项目中的实际需求可能是不一样的
type PositionTemplate struct {
	gorm.Model
	//岗位名称
	Name string
	//岗位对象，用于通过岗位名称查找相对应的岗位
	Positions []Position
	//默认岗位描述
	DefaultDescribe string
}

//获取所有岗位模板
func FindAllPositionTemplates(tx *gorm.DB) []PositionTemplate {
	var positionTemplates []PositionTemplate
	result := tx.Find(&positionTemplates)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return positionTemplates
}

//通过项目ID查找所有岗位ID
func FindPositionTemplateByID(tx *gorm.DB, positionTemplateID int64) PositionTemplate {
	var positionTemplate PositionTemplate
	result := tx.First(&positionTemplate, positionTemplateID)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return positionTemplate
}

//通过名称查找所有岗位模板
func FindPositionTemplateByName(tx *gorm.DB, positionTemplateName string) PositionTemplate {
	var positionTemplate PositionTemplate
	result := tx.First(&positionTemplate, PositionTemplate{Name: positionTemplateName})
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return positionTemplate
}

//通过项目ID查找所有岗位ID
func FindPositionsByProjectID(tx *gorm.DB, projectID int64) []Position {
	var positions []Position
	result := tx.Where(Position{ProjectID: projectID}).Find(&positions)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return positions
}

func EditPositionByID(tx *gorm.DB, positionID uint, needPeople int64, describe string) (err error) {
	err = tx.Model(&Position{}).Where(positionID).Update("NeedPeople", needPeople).Error
	if err != nil {
		tx.Rollback()
		log.Debug(err)
		return err
	}
	err = tx.Model(&Position{}).Where(positionID).Update("Describe", describe).Error
	if err != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return err
}

func CreatePositionByProjectID(tx *gorm.DB, projectID uint, name string,
	needPeople int64, describe string) (err error) {
	var positionTemplate = FindPositionTemplateByName(tx, name)
	var position = Position{
		ProjectID:          int64(projectID),
		PositionTemplateID: int64(positionTemplate.ID),
		Describe:           describe,
		NowPeople:          0,
		NeedPeople:         needPeople,
		InterestPeople:     0,
		Conversations:      nil,
	}
	err = tx.Create(&position).Error
	if err != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return err
}

func FindPositionByID(tx *gorm.DB, positionID int64) Position {
	var position Position
	err := tx.First(&position, positionID).Error
	if err != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return position
}

func FindPositionByProjectIDAndPositionName(tx *gorm.DB, projectID int64, positionName string) Position {
	var position Position
	var positionTemplate PositionTemplate
	err := tx.First(&positionTemplate, PositionTemplate{Name: positionName}).Error
	if err != nil {
		tx.Rollback()
		log.Debug(err)
	}
	err = tx.First(&position, Position{PositionTemplateID: int64(positionTemplate.ID), ProjectID: projectID}).Error
	if err != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return position
}

func CreatePositionTemplate(tx *gorm.DB, positionTemplate *PositionTemplate) (err error) {
	err = tx.Create(&positionTemplate).Error
	if err != nil {
		tx.Rollback()
		log.Debug(err)
	}
	return err
}
