package models

import (
	userModels "github.com/lantu-dev/puki/pkg/auth/models"
	"gorm.io/gorm"
)

type Attendance struct {
	UserID  int64 `gorm:"type:bigint;primaryKey;not null"`
	User    *userModels.User
	EventID int64 `gorm:"type:bigint;primaryKey;not null"`
	Event   *Event
	Checked bool `gorm:"default:false"`
}

func FindAttendanceByUserIDAndEventID(tx *gorm.DB, userID int64, eventID int64, dest interface{}) error {
	err := tx.Model(&Attendance{}).Where(&Attendance{UserID: userID, EventID: eventID}).First(dest).Error
	return err
}

func FindUserEnrolledEventsByUserID(tx *gorm.DB, userID int64, dests interface{}) error {
	err := tx.Model(&Attendance{}).Where(&Attendance{UserID: userID}).Joins("Event").Find(dests).Error
	return err
}

func CreateAttendance(tx *gorm.DB, userID int64, eventID int64) error {
	err := tx.Create(&Attendance{UserID: userID, EventID: eventID}).Error
	return err
}

func DeleteAttendance(tx *gorm.DB, userID int64, eventID int64) error {
	err := tx.Where(&Attendance{UserID: userID, EventID: eventID}).Delete(&Attendance{}).Error
	return err
}
