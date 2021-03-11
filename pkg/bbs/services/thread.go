package services

import (
	"github.com/juju/errors"
	"github.com/lantu-dev/puki/pkg/auth"
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/base/null"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/bbs/models"
	"gorm.io/gorm"
	"time"
)

type ThreadService struct {
	db *gorm.DB
}

func NewThreadService(db *gorm.DB) *ThreadService {
	return &ThreadService{db}
}

type Thread struct {
	ID         base.ID
	UserID     base.ID
	NodeID     base.ID
	ReplyForID base.ID
	//HotReplyUserID   int64
	//HotReplyAbstract string
	RepliesCount int64
	Title        string
	Abstract     string
	Content      string
	ImagesURL    string
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type ListThreadsReq struct {
	NodeID base.ID

	// 0 for list all non-reply threads
	ID base.ID

	// `UpdatedBefore` & `Limit` are used for pagination
	UpdatedBefore null.Time
	Limit         int
}

type ListThreadsRes struct {
	Threads []Thread
}

func (s *ThreadService) ListThreads(ctx *rpc.Context, req *ListThreadsReq, res *ListThreadsRes) (err error) {
	if req.NodeID == 0 {
		return base.UserErrorf(nil, "NodeID should be provided")
	}
	if req.Limit == 0 || req.Limit > 50 {
		req.Limit = 50
	}

	threads := models.ListThreads(s.db, req.NodeID, req.ID, req.UpdatedBefore, req.Limit)
	res.Threads = make([]Thread, 0, len(threads))
	for _, thread := range threads {
		res.Threads = append(res.Threads, threadFromModelThread(&thread, false))
	}
	return
}

func threadFromModelThread(thread *models.Thread, keepContent bool) Thread {
	var repliesCount int64
	//if thread.TotalRepliesCount != 0 {
	//  repliesCount = thread.TotalRepliesCount
	//} else {
	repliesCount = thread.RepliesCount
	//}

	if !keepContent {
		thread.Content = ""
	}

	return Thread{
		ID:           thread.ID,
		UserID:       thread.UserID,
		NodeID:       thread.NodeID,
		ReplyForID:   thread.ReplyForID.ValueOrZero(),
		RepliesCount: repliesCount,
		Title:        thread.Title,
		Abstract:     thread.Abstract,
		Content:      thread.Content,
		ImagesURL:    thread.ImagesURL,
		CreatedAt:    thread.CreatedAt,
		UpdatedAt:    thread.UpdatedAt,
	}
}

type GetThreadReq struct {
	NodeID base.ID

	ID base.ID
}

type GetThreadRes struct {
	Thread Thread
}

func (s *ThreadService) GetThread(ctx *rpc.Context, req *GetThreadReq, res *GetThreadRes) (err error) {
	if req.NodeID == 0 {
		return base.UserErrorf(nil, "NodeID should be provided")
	}
	if req.ID == 0 {
		return base.UserErrorf(nil, "ID should be provided")
	}

	thread := models.GetThreadByID(s.db, req.NodeID, req.ID)
	if thread == nil {
		return base.UserErrorf(nil, "thread not found")
	} else {
		res.Thread = threadFromModelThread(thread, true)
	}

	return
}

type CreateThreadReq struct {
	NodeID     base.ID
	ReplyForID base.ID
	Title      string
	Abstract   string
	Content    string
}

type CreateThreadRes struct {
	Thread Thread
}

func (s *ThreadService) CreateThread(ctx *rpc.Context, req *CreateThreadReq, res *CreateThreadRes) (err error) {
	u, err := auth.ExtractTokenUser(ctx)
	if err != nil {
		return err
	}

	if !models.NodeExists(s.db, req.NodeID) {
		return base.UserErrorf(nil, "node not exist")
	}

	if req.ReplyForID != 0 && !models.ThreadExists(s.db, req.NodeID, req.ReplyForID) {
		return base.UserErrorf(nil, "thread not exist")
	}
	thread := models.Thread{
		ID:         base.GenerateID(),
		UserID:     base.ID(u.ID),
		NodeID:     req.NodeID,
		ReplyForID: null.NewID(req.ReplyForID, req.ReplyForID != 0),
		Title:      req.Title,
		Abstract:   req.Abstract,
		Content:    req.Content,
	}

	err = s.db.Transaction(func(tx *gorm.DB) error {
		if err := models.CreateThread(tx, &thread); err != nil {
			return errors.Trace(err)
		}
		return nil
	})

	if err != nil {
		return
	}
	res.Thread = threadFromModelThread(&thread, true)
	return
}
