package models

type UserEvent struct {
	UserID  int64 `gorm:"primaryKey"`
	EventID int64 `gorm:"primaryKey"`
	Checked bool  `gorm:"default:false"`
}
