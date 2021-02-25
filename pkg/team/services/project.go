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
	PositionNames      []string
	CompetitionNames   []string
	TypeName           string
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
	result := c.db.Preload("Competitions").Find(&projects)
	if result.Error != nil {
		print(result.Error)
	}
	for _, item := range projects {
		var competitionNames []string
		for _, j := range item.Competitions {
			competitionNames = append(competitionNames, j.Name)
		}
		var typeNew models.Type
		c.db.First(&typeNew, item.TypeID)
		var positions []models.Position
		c.db.Where(&models.Position{ProjectID: int64(item.ID)}).Find(&positions)
		var positionNames []string
		for _, j := range positions {
			var positionTemplate models.PositionTemplate
			c.db.First(&positionTemplate, j.PositionTemplateID)
			positionNames = append(positionNames, positionTemplate.Name)
		}
		projectSimple := ProjectSimple{
			ProjectID:          item.ID,
			CreateTime:         item.CreatedAt,
			UpdateTime:         item.UpdatedAt,
			ProjectName:        item.Name,
			ProjectDescription: item.DescribeSimple,
			StarNum:            item.StarNum,
			CommentNum:         item.CommentsNum,
			PositionNames:      positionNames,
			CompetitionNames:   competitionNames,
			TypeName:           typeNew.Name,
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

//----------------------------------------------------------------------------------------------------------------------

//获取项目详情，请求项目ID，返回项目详情页所需各项信息
type GetProjectDetailReq struct {
	ProjectID int64
}
type Award struct {
	Name string
}
type PositionSimple struct {
	Name           string
	NowPeople      int64
	NeedPeople     int64
	InterestPeople int64
	Describe       string
}
type CommentSimple struct {
	CreatorName string
	Content     string
}
type GetProjectDetailRes struct {
	//1.Project本身信息
	DescribeDetail string
	LinkURL        string
	EndTime        string
	//2. 创建者相关信息
	CreatorName   string
	CreatorSchool string  //学院
	CreatorGrade  string  //年级
	CreatorAward  []Award //获奖情况
	//3. 招募相关信息
	Positions []PositionSimple //岗位
	//4. 评论相关信息
	Comments []CommentSimple //评论
}

func (c *ProjectService) GetProjectDetail(r *http.Request, req *GetProjectDetailReq, res *GetProjectDetailRes) error {
	var project models.Project
	c.db.First(&project, req.ProjectID) //根据项目ID查找到目标项目
	//根据项目中CreatorID查找用户，并获取用户相关信息【目前未连接auth服务】
	award1 := Award{Name: "互联网+一等奖"}
	award2 := Award{Name: "挑战杯二等奖"}
	var awards []Award
	awards = append(awards, award1)
	awards = append(awards, award2)
	//招募岗位，查找Position中ProjectID匹配的所有岗位对象
	var positions []models.Position
	c.db.Where(&models.Position{ProjectID: int64(project.ID)}).Find(&positions)
	var positionSimples []PositionSimple
	for _, item := range positions {
		var positionTemplate models.PositionTemplate
		c.db.First(&positionTemplate, item.PositionTemplateID)
		positionSimple := PositionSimple{
			Name:           positionTemplate.Name,
			NowPeople:      item.NowPeople,
			NeedPeople:     item.NeedPeople,
			InterestPeople: item.InterestPeople,
			Describe:       item.Describe,
		}
		positionSimples = append(positionSimples, positionSimple)
	}
	//评论，查找Comment中ProjectID匹配的所有评论对象
	var comments []models.Comment
	c.db.Where(&models.Comment{ProjectID: int64(project.ID)}).Find(&comments)
	var commentSimples []CommentSimple
	for _, item := range comments {
		commentSimple := CommentSimple{
			CreatorName: "测试姓名",
			Content:     item.Content,
		}
		commentSimples = append(commentSimples, commentSimple)
	}
	res.DescribeDetail = project.DescribeDetail
	res.LinkURL = project.LinkURL
	res.EndTime = project.EndTime.Format("2006-01-02")
	res.CreatorName = "测试姓名"
	res.CreatorSchool = "测试学院"
	res.CreatorGrade = "测试年级"
	res.CreatorAward = awards
	res.Positions = positionSimples
	res.Comments = commentSimples
	return nil
}
