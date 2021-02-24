package models

import (
	"github.com/lantu-dev/puki/pkg/team/models"
	"gorm.io/gorm"
	"net/http"
	"time"
)

type ProjectService struct {
	db *gorm.DB
}

//返回一个带有保存了数据的数据库实例的服务对象而所有值为默认值的服务实例; 由于RegisterService函数的参数需要是指针，所以本函数返回指针类型
func NewProjectService(db *gorm.DB) *ProjectService {
	return &ProjectService{
		db: db,
	}
}

//----------------------------------------------------------------------------------------------------------------------

//获取项目的简略信息，用于首屏中以卡片的形式展示
//信息包括：项目名称、项目介绍、岗位标签、(创建者头像、创建者姓名)、star数、评论数
//请求，包括比赛名称、比赛类别、岗位名称
type GetProjectSimpleReq struct {
}

type ProjectSimple struct {
	ProjectID          uint
	CreateTime         time.Time
	UpdateTime         time.Time
	ProjectName        string
	ProjectDescription string
	StarNum            int64
	CommentNum         int64
	Positions          []Position
}

//响应，包括一个项目对象的数组
type GetProjectSimpleRes struct {
	ProjectSimples []ProjectSimple
}

type Position struct {
}

type Projects []models.Project

func (c *ProjectService) GetProjectSimple(r *http.Request, req *GetProjectSimpleReq, res *GetProjectSimpleRes) error {
	var projects Projects
	result := c.db.Find(&projects)
	if result.Error != nil {
		print(result.Error)
	}
	for _, item := range projects {
		projectSimple := ProjectSimple{
			ProjectID:          item.ID,
			CreateTime:         item.CreatedAt,
			UpdateTime:         item.UpdatedAt,
			ProjectName:        item.Name,
			ProjectDescription: item.DescribeSimple,
			StarNum:            item.StarNum,
			CommentNum:         item.CommentsNum,
			Positions:          nil,
		}
		res.ProjectSimples = append(res.ProjectSimples, projectSimple)
	}
	return nil
}

//----------------------------------------------------------------------------------------------------------------------

//添加项目
//请求包括：创建者ID，类别ID，
type AddProjectReq struct {
	CreatorID      int64
	TypeID         int64
	Name           string
	DescribeSimple string
	DescribeDetail string
	LinkURL        string
	EndTime        time.Time
	CompetitionsID []int64 //传入ID数组，在创建Project后依据ID创建一系列中间表
	Positions      []models.Position
}

type AddProjectRes struct {
}

func (c *ProjectService) AddProject(r *http.Request, req *AddProjectReq, res *AddCompetitionRes) error {
	var competitions []*models.Competition
	for _, item := range req.CompetitionsID {
		var competition models.Competition
		c.db.First(&competition, item)
		competitions = append(competitions, &competition)
	}

	//创建Project实例
	project := models.Project{
		Model:          gorm.Model{},
		IsAvailable:    false,
		CreatorID:      req.CreatorID,
		Competitions:   competitions,
		TypeID:         1,
		Name:           req.Name,
		DescribeSimple: req.DescribeSimple,
		DescribeDetail: req.DescribeDetail,
		LinkURL:        req.LinkURL,
		EndTime:        req.EndTime,
		Positions:      req.Positions,
		Comments:       nil,
		CommentsNum:    0,
		StarNum:        0,
	}
	c.db.Create(&project)
	return nil
}
