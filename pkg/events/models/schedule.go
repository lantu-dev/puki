package models

import (
	"gorm.io/gorm"
	"time"
)

// 类型为 EventKindSalon, EventKindLecture 的时间安排表
type Schedule struct {
	gorm.Model
	// 活动时间表主键
	ID int64 `gorm:"type:bigint;primaryKey;not null"`
	// 从属的活动ID
	EventID int64 `gorm:"type:bigint;not null"`

	// 标题
	Title string `gorm:"not null"`
	// 该时间段开始时间
	StartedAt time.Time `gorm:"not null"`
	// 该时间段结束时间
	EndedAt time.Time `gorm:"not null"`

	// 该时间段主讲人姓名
	TalkerName string `gorm:"not null"`
	// 头衔
	TalkerTitle string `gorm:"not null"`
	// 头像
	TalkerAvatarURL string `gorm:"not null"`
	// 介绍
	TalkerDescription string `gorm:"not null"`
}

func FindScheduleByEventID(tx *gorm.DB, eventID int64, dest interface{}) error {
	err := tx.Model(&Schedule{}).Where(&Schedule{EventID: eventID}).Find(dest).Error
	return err
}
