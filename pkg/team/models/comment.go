package models

import (
	"gorm.io/gorm"
)

type Comment struct {
	gorm.Model

	//发送评论者的ID
	UserID int64
	//项目ID
	ProjectID int64
	//评论内容
	Content string
	//评论点赞数
	LinkNum int64
}
