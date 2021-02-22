package models

import (
	"gorm.io/gorm"
	"net/http"
	"pkg/team/models"
)

type CompetitionService struct {
	db *gorm.DB
}

//返回一个带有保存了数据的数据库实例的服务对象而所有值为默认值的服务实例; 由于RegisterService函数的参数需要是指针，所以本函数返回指针类型
func NewCompetitionService(db *gorm.DB) *CompetitionService {
	return &CompetitionService{
		db: db,
	}
}

//----------------------------------------------------------------------------------------------------------------------

//获取所有比赛信息，经过一定规则的排序后，以json的形式传回前端，GetCompetitionRes中包含排序规则
//返回的json中的信息仅需包含在首屏中展示的简略信息
//请求
type GetCompetitionReq struct {
	ID int
}

//响应
type GetCompetitionRes struct {
	Token       string
	Competition models.Competition
}

//获取所有比赛的信息
func (c *CompetitionService) GetCompetition(r *http.Request, req *GetCompetitionReq, res *GetCompetitionRes) error {
	res.Token = "success"
	return nil
}

//----------------------------------------------------------------------------------------------------------------------

//仅获取比赛名称,用于首屏中filter中比赛列表的获取；
//请求
type GetCompetitionNameReq struct {
}

//响应
type GetCompetitionNameRes struct {
	CompetitionNames []string
}

//获取所有比赛的名称
func (c *CompetitionService) GetCompetitionName(r *http.Request,
	req *GetCompetitionNameReq, res *GetCompetitionNameRes) error {
	var competitions []models.Competition
	result := c.db.Find(&competitions)
	if result.Error != nil {
		print(result.Error)
	}
	var competitionNames []string
	for _, item := range competitions {
		competitionNames = append(competitionNames, item.Name)
	}
	res.CompetitionNames = competitionNames
	return result.Error
}

//----------------------------------------------------------------------------------------------------------------------

//添加比赛
//返回的json中的信息仅需包含在首屏中展示的简略信息
//请求，包括比赛信息
type AddCompetitionReq struct {
	Name        string
	Description string
}

//响应，返回一个字符串，说明成功或失败
type AddCompetitionRes struct {
	Result string
}

//添加比赛
func (c *CompetitionService) AddCompetition(r *http.Request, req *AddCompetitionReq, res *AddCompetitionRes) error {
	competition := models.Competition{
		Model:       gorm.Model{},
		Name:        req.Name,
		Description: req.Description,
		ImageURL:    "",
		HomePageURL: "",
		Time:        "",
		Files:       nil,
	}
	err := c.db.Create(&competition)
	if err != nil {
		res.Result = "failed"
	} else {
		res.Result = "success"
	}
	return nil
}

//----------------------------------------------------------------------------------------------------------------------

//仅获取比赛类型,用于首屏中filter中比赛类型列表的获取；
//请求
type GetCompetitionTypeReq struct {
}

//响应
type GetCompetitionTypeRes struct {
	CompetitionTypes []string
}

//获取所有比赛的类型
func (c *CompetitionService) GetCompetitionType(r *http.Request,
	req *GetCompetitionTypeReq, res *GetCompetitionTypeRes) error {
	var types []models.Type
	result := c.db.Find(&types)
	if result.Error != nil {
		print(result.Error)
	}
	var competitionTypes []string
	for _, item := range types {
		competitionTypes = append(competitionTypes, item.Name)
	}
	res.CompetitionTypes = competitionTypes
	return result.Error
}

//----------------------------------------------------------------------------------------------------------------------

//添加比赛类型
//请求，包括比赛类型名称和介绍
type AddCompetitionTypeReq struct {
	Name        string
	Description string
}

//响应，返回一个字符串，说明成功或失败
type AddCompetitionTypeRes struct {
	Result string
}

//添加比赛类型
func (c *CompetitionService) AddCompetitionType(r *http.Request,
	req *AddCompetitionTypeReq, res *AddCompetitionTypeRes) error {
	type_new := models.Type{
		Name:     req.Name,
		Describe: req.Description,
	}
	err := c.db.Create(&type_new)
	if err != nil {
		res.Result = "failed"
	} else {
		res.Result = "success"
	}
	return nil
}
