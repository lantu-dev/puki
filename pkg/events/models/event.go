package models

import (
	"gorm.io/gorm"
	"time"
)

const (
	EventTypeNull uint16 = iota
	EventTypeOther
	EventTypeSalon
	EventTypeLecture
	EventTypeHackathon
)

type Event struct {
	gorm.Model
	// 活动ID
	ID int64 `gorm:"type:bigint;primaryKey;not null"`
	// 活动添加者ID
	OwnerUserID int64 `gorm:"type:bigint;not null"`

	// 活动举办方
	Organizer string `gorm:"not null"`
	// 活动标题
	Title string `gorm:"not null"`
	// 活动介绍
	Description string `gorm:"not null"`
	// 活动宣传图
	ImageUrl string `gorm:"not null"`

	// 活动开始时间
	StartedAt time.Time `gorm:"not null"`
	// 活动结束时间
	EndedAt time.Time `gorm:"not null"`

	// 活动地点
	Location string `gorm:"not null"`
	// 活动类型
	EventType uint16 `gorm:"not null;default:1"`
}

func FindEventByID(tx *gorm.DB, id int64, dest interface{}) error {
	err := tx.Model(&Event{}).Where(id).First(dest).Error
	return err
}

func FindEventsByIDs(tx *gorm.DB, ids []int64, dests interface{}) error {
	err := tx.Model(&Event{}).Where(ids).Find(dests).Error
	return err
}
