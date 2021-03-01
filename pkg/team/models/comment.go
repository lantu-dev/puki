package models

import (
	log "github.com/sirupsen/logrus"
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

func FindCommentsByProjectID(tx *gorm.DB, ProjectID int64) []Comment {
	var comments []Comment
	result := tx.Where(&Comment{ProjectID: ProjectID}).Find(&comments)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return comments
}
