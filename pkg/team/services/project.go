package models

import (
	"github.com/lantu-dev/puki/pkg/team/models"
	log "github.com/sirupsen/logrus"
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
	ProjectID uint
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
	IsFound       bool
	ProjectSimple ProjectSimple
}

type Position struct {
}

func (c *ProjectService) GetProjectSimple(r *http.Request, req *GetProjectSimpleReq, res *GetProjectSimpleRes) error {
	var project models.Project
	var typeNew models.Type
	var positions []models.Position

	tx := c.db.Begin()
	project = models.FindProjectByID(tx, req.ProjectID)
	typeNew = models.FindTypeByID(tx, project.TypeID)
	positions = models.FindPositionsByProjectID(tx, int64(project.ID))
	err := tx.Commit().Error
	if err != nil {
		res.IsFound = false
		return nil
	}

	var competitionNames []string
	for _, j := range project.Competitions {
		competitionNames = append(competitionNames, j.Name)
	}

	var positionNames []string
	for _, j := range positions {
		var positionTemplate models.PositionTemplate

		positionTemplate = models.FindPositionTemplateByID(tx, j.PositionTemplateID)
		err = tx.Commit().Error
		if err != nil {
			log.Debug(err)
		}

		positionNames = append(positionNames, positionTemplate.Name)
	}
	projectSimple := ProjectSimple{
		ProjectID:          project.ID,
		CreateTime:         project.CreatedAt,
		UpdateTime:         project.UpdatedAt,
		ProjectName:        project.Name,
		ProjectDescription: project.DescribeSimple,
		StarNum:            project.StarNum,
		CommentNum:         project.CommentsNum,
		PositionNames:      positionNames,
		CompetitionNames:   competitionNames,
		TypeName:           typeNew.Name,
	}
	res.ProjectSimple = projectSimple
	res.IsFound = true
	return nil
}

//----------------------------------------------------------------------------------------------------------------------

//添加项目
//请求包括：创建者ID，类别ID，
type AddProjectReq struct {
	CreatorID        int64
	TypeID           int64
	Name             string
	DescribeSimple   string
	DescribeDetail   string
	LinkURL          string
	EndTime          time.Time
	CompetitionNames []string //传入ID数组，在创建Project后依据ID创建一系列中间表
	Positions        []models.Position
}

type AddProjectRes struct {
}

func (c *ProjectService) AddProject(r *http.Request, req *AddProjectReq, res *AddCompetitionRes) error {
	var competitions []*models.Competition
	for _, item := range req.CompetitionNames {
		var competition models.Competition

		tx := c.db.Begin()
		competition = models.FindCompetitionByName(tx, item)
		err := tx.Commit().Error
		if err != nil {
			log.Debug(err)
		}

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

	tx := c.db.Begin()
	err := models.CreateProject(tx, project)
	if err != nil {
		log.Debug()
	}
	err = tx.Commit().Error

	return err
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
	var positions []models.Position
	var comments []models.Comment

	tx := c.db.Begin()
	project = models.FindProjectByID(tx, uint(req.ProjectID))
	//招募岗位，查找Position中ProjectID匹配的所有岗位对象
	positions = models.FindPositionsByProjectID(tx, int64(project.ID))
	//评论，查找Comment中ProjectID匹配的所有评论对象
	comments = models.FindCommentsByProjectID(tx, int64(project.ID))
	err := tx.Commit().Error
	if err != nil {
		log.Debug(err)
	}

	//根据项目中CreatorID查找用户，并获取用户相关信息【目前未连接auth服务】
	award1 := Award{Name: "互联网+一等奖"}
	award2 := Award{Name: "挑战杯二等奖"}
	var awards []Award
	awards = append(awards, award1)
	awards = append(awards, award2)

	var positionSimples []PositionSimple
	for _, item := range positions {
		var positionTemplate models.PositionTemplate

		positionTemplate = models.FindPositionTemplateByID(tx, item.PositionTemplateID)
		err := tx.Commit().Error
		if err != nil {
			log.Debug(err)
		}

		positionSimple := PositionSimple{
			Name:           positionTemplate.Name,
			NowPeople:      item.NowPeople,
			NeedPeople:     item.NeedPeople,
			InterestPeople: item.InterestPeople,
			Describe:       item.Describe,
		}
		positionSimples = append(positionSimples, positionSimple)
	}

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

	return err
}

//----------------------------------------------------------------------------------------------------------------------

//获取数据库中project的个数
type GetProjectNumReq struct{}
type GetProjectNumRes struct {
	ProjectNum int64
}

func (c *ProjectService) GetProjectNum(r *http.Request, req *GetProjectNumReq, res *GetProjectNumRes) error {
	tx := c.db.Begin()
	res.ProjectNum = models.GetProjectNum(tx)
	err := tx.Commit().Error
	if err != nil {
		log.Debug(err)
	}
	return err
}

//----------------------------------------------------------------------------------------------------------------------

//获取数据库中project的ID
type GetProjectIDReq struct{}
type GetProjectIDRes struct {
	ProjectID []int64
}

func (c *ProjectService) GetProjectID(r *http.Request, req *GetProjectIDReq, res *GetProjectIDRes) error {
	var projects []models.Project
	c.db.Find(&projects) //查找所有项目
	for _, item := range projects {
		res.ProjectID = append(res.ProjectID, int64(item.ID))
	}
	return nil
}

//----------------------------------------------------------------------------------------------------------------------

//通过请求中项目ID数组获取项目简介数组
type GetProjectSimplesReq struct {
	ProjectID []uint
}

//响应，包括一个项目对象的数组
type GetProjectSimplesRes struct {
	IsFound        bool
	ProjectSimples []ProjectSimple
}

func (c *ProjectService) GetProjectSimples(r *http.Request, req *GetProjectSimplesReq, res *GetProjectSimplesRes) error {
	var projects []models.Project

	//通过ID数组查找所有项目
	result := c.db.Preload("Competitions").Where(req.ProjectID).Find(&projects)
	if result.Error != nil {
		res.IsFound = false
		return nil
	}

	var competitionNames []string

	for _, project := range projects {
		for _, j := range project.Competitions {
			competitionNames = append(competitionNames, j.Name)
		}
		var typeNew models.Type
		c.db.First(&typeNew, project.TypeID)
		var positions []models.Position
		c.db.Where(&models.Position{ProjectID: int64(project.ID)}).Find(&positions)
		var positionNames []string
		for _, j := range positions {
			var positionTemplate models.PositionTemplate
			c.db.First(&positionTemplate, j.PositionTemplateID)
			positionNames = append(positionNames, positionTemplate.Name)
		}
		projectSimple := ProjectSimple{
			ProjectID:          project.ID,
			CreateTime:         project.CreatedAt,
			UpdateTime:         project.UpdatedAt,
			ProjectName:        project.Name,
			ProjectDescription: project.DescribeSimple,
			StarNum:            project.StarNum,
			CommentNum:         project.CommentsNum,
			PositionNames:      positionNames,
			CompetitionNames:   competitionNames,
			TypeName:           typeNew.Name,
		}
		res.ProjectSimples = append(res.ProjectSimples, projectSimple)
	}
	res.IsFound = true
	return nil
}
