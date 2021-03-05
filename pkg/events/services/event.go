package services

import (
	"errors"
	"github.com/lantu-dev/puki/pkg/auth"
	models2 "github.com/lantu-dev/puki/pkg/auth/models"
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/events/models"
	"gorm.io/gorm"
	"net/http"
	"time"
)

type EventService struct {
	db *gorm.DB
}

func NewEventService(db *gorm.DB) *EventService {
	return &EventService{db: db}
}

type GetEventsListReq struct {
	EventIDs []int64
}
type GetEventsListRes []struct {
	ID          int64
	Organizer   string
	Title       string
	Description string
	ImageUrl    string
	StartedAt   time.Time
	EndedAt     time.Time
	Location    string
	EventType   uint16
}

// 根据req的EventID获取对应的活动简单信息列表, 若空数组则返回全部活动
func (s EventService) GetEventsList(r *http.Request, req *GetEventsListReq, res *GetEventsListRes) (err error) {
	err = s.db.Model(&models.Event{}).Where(req.EventIDs).Find(res).Error

	return
}

type GetEventMoreInfoReq struct {
	EventID int64
}
type GetEventMoreInfoRes struct {
	Schedules []struct {
		Title             string
		StartedAt         time.Time
		EndedAt           time.Time
		TalkerName        string
		TalkerTitle       string
		TalkerAvatarURL   string
		TalkerDescription string
	}
	Hackathon struct {
		Steps string
	}
}

// 获取单个活动详细信息
func (s EventService) GetEventMoreInfo(r *http.Request, req *GetEventMoreInfoReq, res *GetEventMoreInfoRes) (err error) {
	var Event struct {
		EventType uint16
	}

	err = s.db.Transaction(func(tx *gorm.DB) (err error) {
		if err = tx.Model(&models.Event{}).First(&Event, req.EventID).Error; err != nil {
			return
		}
		var target *gorm.DB
		switch Event.EventType {
		case models.EventTypeSalon:
			fallthrough

		case models.EventTypeLecture:
			target = tx.Model(&models.Schedule{}).Where(&models.Schedule{EventID: req.EventID})
			if err = target.Find(&res.Schedules).Error; err != nil {
				return
			}

		case models.EventTypeHackathon:
			target = tx.Model(&models.Hackathon{}).Where(&models.Hackathon{EventID: req.EventID})
			if err = target.First(&res.Hackathon).Error; err != nil {
				return
			}

		case models.EventTypeOther:

		case models.EventTypeNull:

		default:
		}

		return
	})

	return
}

const (
	// 活动报名成功 | 活动删除成功
	Success = iota
	// 活动重复报名 | 活动报名已取消
	Duplicate
	// 活动不存在
	NotFound
)

type EnrollForEventReq struct {
	EventID int64
}
type EnrollForEventRes struct {
	Status uint8
}

// 用户报名活动
func (s EventService) EnrollForEvent(r *http.Request, req *EnrollForEventReq, res *EnrollForEventRes) (err error) {
	tu, err := auth.ExtractTokenUser(r)
	if err != nil || tu.IsAnon() {
		return base.UserErrorf("请登录/注册账户")
	}

	if err = s.db.Transaction(func(tx *gorm.DB) (err error) {
		if err = tx.First(&models.Event{}, req.EventID).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			// 活动不存在
			res.Status = NotFound
			return nil
		}

		if tx.Where(&models.UserEvent{UserID: tu.ID, EventID: req.EventID}).First(&models.UserEvent{}).Error == nil {
			// 用户重复报名
			res.Status = Duplicate
			return nil
		}
		if err = tx.Create(&models.UserEvent{UserID: tu.ID, EventID: req.EventID}).Error; err != nil {
			// 关联失败
			return err
		}

		// 用户报名成功
		res.Status = Success

		return nil
	}); err != nil {
		return err
	}

	return nil
}

type QuitEventReq struct {
	EventID int64
}
type QuitEventRes struct {
	Status uint8
}

// 用户取消报名活动
func (s EventService) QuitEvent(r *http.Request, req *QuitEventReq, res *QuitEventRes) (err error) {
	tu, err := auth.ExtractTokenUser(r)
	if err != nil || tu.IsAnon() {
		return base.UserErrorf("请登录/注册账户")
	}

	if err = s.db.Transaction(func(tx *gorm.DB) (err error) {
		if err = tx.First(&models.Event{}, req.EventID).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			// 活动不存在
			res.Status = NotFound
			return nil
		}

		target := tx.Where(&models.UserEvent{UserID: tu.ID, EventID: req.EventID})

		if err = target.First(&models.UserEvent{}).Error; errors.Is(err, gorm.ErrRecordNotFound) {
			// 已取消报名
			res.Status = Duplicate
			return nil
		}

		if err = target.Delete(&models.UserEvent{}).Error; err != nil {
			// 删除失败
			return err
		}

		// 用户报名成功
		res.Status = Success

		return nil
	}); err != nil {
		return err
	}

	return nil
}

type CheckEventReq struct {
}
type CheckEventRes struct {
}

// 用户是否查看过已报名的活动
func (s EventService) CheckEvent(r *http.Request, req *CheckEventReq, res *CheckEventRes) (err error) {

	return nil
}

type GetUserEnrolledEventsReq struct {
}

type GetUserEnrolledEventsRes struct {
	Events []models.Event
}

func (s EventService) GetUserEnrolledEvents(r *http.Request, req *GetUserEnrolledEventsReq, res *GetUserEnrolledEventsRes) (err error) {
	tu, err := auth.ExtractTokenUser(r)
	if err != nil || tu.IsAnon() {
		return base.UserErrorf("请登录/注册账户")
	}

	if err = s.db.Transaction(func(tx *gorm.DB) (err error) {
		a := tx.Model(&models2.User{ID: tu.ID}).Association("Events")
		if err = a.Find(&res.Events); err != nil {
			return err
		}

		return nil
	}); err != nil {
		return err
	}

	return nil
}
