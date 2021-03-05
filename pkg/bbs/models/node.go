package models

import (
	"errors"
	log "github.com/sirupsen/logrus"
	"gopkg.in/guregu/null.v4"
	"gorm.io/gorm"
	"time"
)

// A node (forum) contains many threads (posts), and could be nested.
type Node struct {
	ID       int64    `gorm:"type:bigint;primaryKey;not null"`
	ParentID null.Int `gorm:"type:bigint;not null;default:0"`

	// An unique name for this node, or empty.
	Name null.String `gorm:"unique;default:null"`

	// The display name for this node
	Title string `gorm:"not null"`

	// If the node is created by a user, this field will be filled.
	UserID null.Int `gorm:"type:bigint;not null;default:0"`

	ThreadsCount int64 `gorm:"not null;default:0"`

	AvatarURL   string `gorm:"not null"`
	Description string `gorm:"not null"`

	CreatedAt time.Time
	DeletedAt time.Time
}

func GetNodeByID(tx *gorm.DB, id int64) *Node {
	var node Node
	if err := tx.First(&node, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			// it's ok
			return nil
		}
		// what happened ?
		log.Fatalf("GetNodeByID error %+v", err)
		return nil
	}
	return &node
}

func ListNodeChildren(tx *gorm.DB, parentID int64) (nodes []Node) {
	if err := tx.Where(&Node{ParentID: null.IntFrom(parentID)}).Find(&nodes).Error; err != nil {
		// it should not reach here.
		log.Fatalf("ListNodeChildren error %+v", err)
		return nil
	}
	return
}
func NodeExists(tx *gorm.DB, nodeID int64) bool {
	var cnt int64
	err := tx.Model(&Node{}).Where(&Node{ID: nodeID}).Limit(1).Count(&cnt).Error
	if err != nil {
		log.Warnf("NodeExists err %+v", err)
	}
	return cnt > 0
}
