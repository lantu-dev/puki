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
//需要注意的是，由于比赛类型比较固定，因此采用写死在前端页面中的形式，而比赛名称、岗位等变动可能性较大，因此需要从后端获取
//请求
type GetCompetitionNameReq struct {
}

//响应
type GetCompetitionNameRes struct {
	Token string
}

//获取所有比赛的信息
func (c *CompetitionService) GetCompetitionName(r *http.Request,
	req *GetCompetitionNameReq, res *GetCompetitionNameRes) error {
	res.Token = "success"
	return nil
}

//----------------------------------------------------------------------------------------------------------------------

//添加比赛
//返回的json中的信息仅需包含在首屏中展示的简略信息
//请求，包括比赛信息
type AddCompetitionReq struct {
	Name string
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
		Description: "",
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
