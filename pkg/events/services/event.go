package services

import (
	"errors"
	"github.com/lantu-dev/puki/pkg/auth"
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	eventsModels "github.com/lantu-dev/puki/pkg/events/models"
	"gorm.io/gorm"
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
type GetEventsListRes struct {
	Events []eventsModels.Event
}

// 根据req的EventID获取对应的活动简单信息列表, 若空数组则返回全部活动
func (s EventService) GetEventsList(ctx *rpc.Context, req *GetEventsListReq, res *GetEventsListRes) error {
	if err := eventsModels.FindEventsByIDs(s.db, req.EventIDs, &res.Events); err != nil {
		return err
	}
	return nil
}

type GetEventMoreInfoReq struct {
	EventID int64
}
type GetEventMoreInfoRes struct {
	Schedules []eventsModels.Schedule
	Hackathon eventsModels.Hackathon
}

// 获取单个活动详细信息
func (s EventService) GetEventMoreInfo(ctx *rpc.Context, req *GetEventMoreInfoReq, res *GetEventMoreInfoRes) (err error) {
	err = s.db.Transaction(func(tx *gorm.DB) error {
		var event struct {
			EventType uint16
		}

		if err = eventsModels.FindEventByID(tx, req.EventID, &event); err != nil {
			return err
		}

		switch event.EventType {
		case eventsModels.EventTypeSalon:
			fallthrough

		case eventsModels.EventTypeLecture:
			if err = eventsModels.FindScheduleByEventID(tx, req.EventID, &res.Schedules); err != nil {
				return err
			}

		case eventsModels.EventTypeHackathon:
			if err = eventsModels.FindHackathonByEventID(tx, req.EventID, &res.Hackathon); err != nil {
				return err
			}

		case eventsModels.EventTypeOther:

		case eventsModels.EventTypeNull:

		default:
		}

		return err
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
func (s EventService) EnrollForEvent(ctx *rpc.Context, req *EnrollForEventReq, res *EnrollForEventRes) (err error) {
	tu, err := auth.ExtractTokenUser(ctx)
	if err != nil || tu.IsAnon() {
		return base.UserErrorf(nil, "请登录/注册账户")
	}

	if err = s.db.Transaction(func(tx *gorm.DB) (err error) {
		if errors.Is(eventsModels.FindEventByID(tx, req.EventID, &eventsModels.Event{}), gorm.ErrRecordNotFound) {
			// 活动不存在
			res.Status = NotFound
			return nil
		}

		if eventsModels.FindAttendanceByUserIDAndEventID(tx, tu.ID, req.EventID, &eventsModels.Attendance{}) == nil {
			// 用户重复报名
			res.Status = Duplicate
			return nil
		}

		if err = eventsModels.CreateAttendance(tx, tu.ID, req.EventID); err != nil {
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
func (s EventService) QuitEvent(ctx *rpc.Context, req *QuitEventReq, res *QuitEventRes) (err error) {
	tu, err := auth.ExtractTokenUser(ctx)
	if err != nil || tu.IsAnon() {
		return base.UserErrorf(nil, "请登录/注册账户")
	}

	if err = s.db.Transaction(func(tx *gorm.DB) (err error) {
		if errors.Is(eventsModels.FindEventByID(tx, req.EventID, &eventsModels.Event{}), gorm.ErrRecordNotFound) {
			// 活动不存在
			res.Status = NotFound
			return nil
		}

		if errors.Is(eventsModels.FindAttendanceByUserIDAndEventID(tx, tu.ID, req.EventID, &eventsModels.Attendance{}), gorm.ErrRecordNotFound) {
			// 已取消报名
			res.Status = Duplicate
			return nil
		}

		if eventsModels.DeleteAttendance(tx, tu.ID, req.EventID) != nil {
			// 删除失败
			return err
		}

		// 用户取消报名成功
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
func (s EventService) CheckEvent(ctx *rpc.Context, req *CheckEventReq, res *CheckEventRes) (err error) {

	return nil
}

type GetUserEnrolledEventsReq struct {
}

type GetUserEnrolledEventsRes struct {
	Events []eventsModels.Event
}

func (s EventService) GetUserEnrolledEvents(ctx *rpc.Context, req *GetUserEnrolledEventsReq, res *GetUserEnrolledEventsRes) (err error) {
	tu, err := auth.ExtractTokenUser(ctx)
	if err != nil || tu.IsAnon() {
		return base.UserErrorf(nil, "请登录/注册账户")
	}

	if err = s.db.Transaction(func(tx *gorm.DB) (err error) {
		if err = eventsModels.FindUserEnrolledEventsByUserID(tx, tu.ID, &res.Events); err != nil {
			return err
		}

		return nil
	}); err != nil {
		return err
	}

	return nil
}
