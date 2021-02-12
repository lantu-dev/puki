package models

import (
	"gorm.io/gorm"
	"time"
)

type Comment struct {
	gorm.Model

	//发送评论者的ID
	UserID int64
	//项目ID
	ProjectID int64
	//评论内容
	Content string
	//评论发表时间
	Time time.Time
	//评论点赞数
	LinkNum int64
}
