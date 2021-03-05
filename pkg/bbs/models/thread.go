package models

import (
	"errors"
	"github.com/lantu-dev/puki/pkg/base"
	log "github.com/sirupsen/logrus"
	"golang.org/x/exp/utf8string"
	"gopkg.in/guregu/null.v4"
	"gorm.io/gorm"
	"time"
)

// A thread(post) belongs to a special node, contains user-generated content, and can be nested ( reply ).
type Thread struct {
	ID     int64 `gorm:"type:bigint;primaryKey;not null"`
	NodeID int64 `gorm:"type:bigint;not null;default:0"`

	// 0 means that it's a "root" thread.
	ReplyForID   null.Int `gorm:"type:bigint;not null;default:0"`
	RepliesCount int64    `gorm:"type:bigint;not null;default:0"`

	UserID int64 `gorm:"type:bigint;not null;default:0"`

	// An unique name for this thread, or empty.
	Name null.String `gorm:"unique;default:null"`

	Title    string `gorm:"not null"`
	Content  string `gorm:"not null"`
	Abstract string `gorm:"not null"`

	// auto populated from content
	ImagesURL string `gorm:"not null"`

	CreatedAt time.Time `gorm:"not null"`
	UpdatedAt time.Time `gorm:"not null"`
	DeletedAt *time.Time
}

func (m *Thread) BeforeSave(tx *gorm.DB) (err error) {
	a := utf8string.NewString(m.Abstract)
	if a == nil {
		m.Abstract = ""
	} else {
		if a.RuneCount() > 250 {
			m.Abstract = a.Slice(0, 250)
		}
	}
	return
}

func (m *Thread) BeforeCreate(tx *gorm.DB) (err error) {
	if m.ID == 0 {
		m.ID = base.GenerateID()
	}
	return
}

func ListThreads(tx *gorm.DB, nodeID, replyForID int64, updatedBefore null.Time, limit int) (threads []Thread) {
	tx = tx.Where(&Thread{NodeID: nodeID, ReplyForID: null.IntFrom(replyForID)})
	if updatedBefore.Valid {
		tx.Where("updated_at <", updatedBefore.Time)
	}
	if limit != 0 {
		tx.Limit(limit)
	}
	tx.Order("updated_at desc")

	if err := tx.Find(&threads).Error; err != nil {
		log.Fatalf("ListThreads failed %+v", err)
	}
	return
}

func GetThreadByID(tx *gorm.DB, nodeID, id int64) *Thread {
	var thread Thread
	if err := tx.First(&thread, id).Error; err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil
		}
		if thread.NodeID != nodeID {
			return nil
		}
		log.Fatalf("GetThreadByID error %+v", err)
		return nil
	}
	return &thread
}

func ThreadExists(tx *gorm.DB, nodeID, id int64) bool {
	var cnt int64
	err := tx.Model(&Thread{}).Where(&Thread{ID: id, NodeID: nodeID}).Limit(1).Count(&cnt).Error
	if err != nil {
		log.Warnf("ThreadExists err %+v", err)
	}
	return cnt > 0
}

func CreateThread(tx *gorm.DB, thread *Thread) error {
	if err := tx.Create(thread).Error; err != nil {
		return err
	}
	if thread.ReplyForID.ValueOrZero() != 0 {
		if err := tx.Model(&Thread{}).Where(&Thread{ID: thread.ReplyForID.Int64}).UpdateColumn("replies_count", gorm.Expr("replies_count + 1")).Error; err != nil {
			return err
		}
	} else {
		if err := tx.Model(&Node{}).Where(&Node{ID: thread.NodeID}).UpdateColumn("threads_count", gorm.Expr("threads_count + 1")).Error; err != nil {
			return err
		}
	}
	return nil

}
