package models

import "gorm.io/gorm"

// 类型为 EventKindHackathon 的活动详细步骤
type Hackathon struct {
	gorm.Model
	// 活动时间表主键
	ID int64 `gorm:"type:bigint;primaryKey;not null"`
	// 从属的活动ID
	EventID int64 `gorm:"type:bigint;not null"`

	// 步骤
	Steps string `gorm:"not null"`
}
