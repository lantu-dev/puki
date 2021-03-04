package models

type UserEvent struct {
	UserID  int  `gorm:"primaryKey"`
	EventID int  `gorm:"primaryKey"`
	Checked bool `gorm:"default:false"`
}
