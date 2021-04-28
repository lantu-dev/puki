package models

import (
	"github.com/lantu-dev/puki/pkg/auth"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/team/models"
	"gorm.io/gorm"
)

type ResumeService struct {
	db *gorm.DB
}

func NewResumeService(db *gorm.DB) *ResumeService {
	return &ResumeService{db: db}
}

// ResumeSimple 获取简历信息，通过userID和projectID
type ResumeSimple struct {
	PositionID   int64
	PositionName string
	Content      string
}
type GetResumesReq struct {
	ProjectID int64
}
type GetResumesRes struct {
	IsFailed      bool
	ResumeSimples []ResumeSimple
}

func (c *ResumeService) GetResumes(ctx *rpc.Context, req *GetResumesReq, res *GetResumesRes) (err error) {
	//获取创建者信息
	var tokenUser auth.TokenUser
	tokenUser, err = auth.ExtractTokenUser(ctx)
	if err != nil {
		res.IsFailed = true
		return err
	}
	//获取简历
	tx := c.db.Begin()
	resumes := models.FindResumesBySenderIDAndProjectID(tx, tokenUser.ID, req.ProjectID)
	err = tx.Commit().Error
	if err != nil {
		res.IsFailed = true
		return err
	}
	var resumeSimples []ResumeSimple
	for _, item := range resumes {
		resumeSimple := ResumeSimple{
			PositionID:   item.PositionID,
			PositionName: item.PositionName,
			Content:      item.Content,
		}
		resumeSimples = append(resumeSimples, resumeSimple)
	}
	res.ResumeSimples = resumeSimples
	return err
}

// NewResume 编辑简历
type NewResume struct {
	PositionNames []string
	Contents      []string
}
type EditResumeReq struct {
	ProjectID   int64
	PositionIDs []int64
	Contents    []string
	NewResume   NewResume
}
type EditResumeRes struct {
	IsFailed bool
}

func (c *ResumeService) EditResume(ctx *rpc.Context,
	req *EditResumeReq, res *EditResumeRes) (err error) {
	//获取创建者信息
	var tokenUser auth.TokenUser
	tokenUser, err = auth.ExtractTokenUser(ctx)
	if err != nil {
		res.IsFailed = true
		return err
	}
	//已有表单修改
	for index, item := range req.PositionIDs {
		tx := c.db.Begin()
		err = models.UpdateResumeBySenderIDAndPositionID(tx, int64(tokenUser.ID), item, req.Contents[index])
		if err != nil {
			res.IsFailed = true
			return err
		}
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}
	}

	//新表单创建
	for index, item := range req.NewResume.Contents {
		tx := c.db.Begin()
		err = models.CreateResumeBySenderIDAndPositionName(tx, req.ProjectID, int64(tokenUser.ID),
			req.NewResume.PositionNames[index], item)
		if err != nil {
			res.IsFailed = true
			return err
		}
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}
	}
	return err
}

// LookUpResumeReq
// 查阅简历，需要信息：ResumeID, IsAccepted
type LookUpResumeReq struct {
	ResumeID   int64
	IsEnrolled bool
}
type LookUpResumeRes struct {
	IsFailed bool
}

// LookUpResume 查阅简历，可进行 “录取” | “拒绝” 操作
func (c *ResumeService) LookUpResume(ctx *rpc.Context,
	req *LookUpResumeReq, res *LookUpResumeRes) (err error) {
	//如果被录取了，则：标记Resume为IsEnrolled - 添加UserPosition【加入岗位】 - 添加UserProject【加入项目】
	if req.IsEnrolled {
		tx := c.db.Begin()
		err = models.SetResumeEnrolled(tx, req.ResumeID)
		if err != nil {
			res.IsFailed = true
			return err
		}
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}

		//根据ID得到resume对象
		tx = c.db.Begin()
		resume := models.FindResumeByID(tx, req.ResumeID)
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}

		//添加成员到岗位及项目中
		tx = c.db.Begin()
		err = models.AddMemberByPositionID(tx, resume.PositionID, resume.SenderID)
		if err != nil {
			res.IsFailed = true
			return err
		}
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}

	} else {
		//否则只需标记Resume为 !IsEnrolled，并且设置已读和拒绝
		tx := c.db.Begin()
		err = models.SetResumeRejected(tx, req.ResumeID)
		if err != nil {
			res.IsFailed = true
			return err
		}
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}
	}

	//若操作为报错，则标记Resume为IsRead
	return err
}
