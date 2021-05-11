package models

import (
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type ClassBuild struct {
	gorm.Model
	ClassNumber int16
	//班长
	Monitor   string
	MonitorID int16
	//团支书
	LeagueBranchSecretary   string
	LeagueBranchSecretaryID int16
	//学委
	StudyCom   string
	StudyComID int16
	//组织委员
	OrganizeCom   string
	OrganizeComID int16
	//劳委
	LaborCom   string
	LaborComID int16
	//文娱委员
	EntertainCom   string
	EntertainComID int16
	//体委
	SportCom   string
	SportComID int16
	//科技委员
	TechCom   string
	TechComID int16
}

func FindClassComs(tx *gorm.DB, ClassNumber int16) ClassBuild {
	var CB ClassBuild
	result := tx.Where(&ClassBuild{ClassNumber: ClassNumber}).Find(&CB)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return CB
}

//修改班委，只修改了ID，还应该USER里配套个人信息，返回一个姓名。。
func UpdateComs(tx *gorm.DB, ClassNum int16, ComID int, NewComsID int16) {
	switch ComID {
	case 1:
		result := tx.Where(&ClassBuild{ClassNumber: ClassNum}).Update("MonitorID", NewComsID)
		if result.Error != nil {
			tx.Rollback()
			log.Debug(result.Error)
		}
		break
	case 2:
		result := tx.Where(&ClassBuild{ClassNumber: ClassNum}).Update("LeagueBranchSecretaryID", NewComsID)

		if result.Error != nil {
			tx.Rollback()
			log.Debug(result.Error)
		}
		break
	case 3:
		result := tx.Where(&ClassBuild{ClassNumber: ClassNum}).Update("StudyComID", NewComsID)
		if result.Error != nil {
			tx.Rollback()
			log.Debug(result.Error)
		}
		break
	case 4:
		result := tx.Where(&ClassBuild{ClassNumber: ClassNum}).Update("OrganizeComID", NewComsID)
		if result.Error != nil {
			tx.Rollback()
			log.Debug(result.Error)
		}
		break
	case 5:
		result := tx.Where(&ClassBuild{ClassNumber: ClassNum}).Update("LaborComID", NewComsID)
		if result.Error != nil {
			tx.Rollback()
			log.Debug(result.Error)
		}
		break
	case 6:
		result := tx.Where(&ClassBuild{ClassNumber: ClassNum}).Update("LaborComID", NewComsID)
		if result.Error != nil {
			tx.Rollback()
			log.Debug(result.Error)
		}
		break
	case 7:
		result := tx.Where(&ClassBuild{ClassNumber: ClassNum}).Update("EntertainComID", NewComsID)
		if result.Error != nil {
			tx.Rollback()
			log.Debug(result.Error)
		}
		break
	case 8:
		result := tx.Where(&ClassBuild{ClassNumber: ClassNum}).Update("SportComID", NewComsID)
		if result.Error != nil {
			tx.Rollback()
			log.Debug(result.Error)
		}
		break
	case 9:
		result := tx.Where(&ClassBuild{ClassNumber: ClassNum}).Update("TechComID", NewComsID)
		if result.Error != nil {
			tx.Rollback()
			log.Debug(result.Error)
		}
		break
	}
}
