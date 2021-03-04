package services

import (
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

type EnrollForEventReq struct {
	EventID int64
}

type EnrollForEventRes struct {
	Success bool
}

func (s EventService) EnrollForEvent(r *http.Request, req *EnrollForEventReq, res *EnrollForEventRes) (err error) {
	tu, err := auth.ExtractTokenUser(r)
	if err != nil || tu.IsAnon() {
		// 用户请求头没有Token字段
		return base.UserErrorf("请登录/注册账户")
	}

	if err = s.db.Transaction(func(tx *gorm.DB) (err error) {
		var user models2.User
		tx.First(&user, tu.ID)
		user.Events = append(user.Events, models.Event{ID: req.EventID})
		tx.Set("gorm:save_associations", false).Save(&user)
		res.Success = true
		return nil
	}); err != nil {
		return err
	}

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
