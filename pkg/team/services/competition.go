package models

import (
	"github.com/lantu-dev/puki/pkg/team/models"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"net/http"
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
type GetCompetitionNamesReq struct {
}

//响应
type GetCompetitionNamesRes struct {
	CompetitionNames []string
}

//获取所有比赛的名称
func (c *CompetitionService) GetCompetitionNames(r *http.Request,
	req *GetCompetitionNamesReq, res *GetCompetitionNamesRes) error {
	var competitions []models.Competition

	tx := c.db.Begin() // 数据库事务，要求所有数据库操作都在数据库事务的包裹中操作
	competitions = models.FindAllCompetitions(tx)
	err := tx.Commit().Error // 数据库事务

	var competitionNames []string
	for _, item := range competitions {
		competitionNames = append(competitionNames, item.Name)
	}
	res.CompetitionNames = competitionNames

	return err
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

	tx := c.db.Begin() // 数据库事务，要求所有数据库操作都在数据库事务的包裹中操作
	models.CreateCompetition(tx, competition)
	err := tx.Commit().Error // 数据库事务

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
type GetCompetitionTypesReq struct {
}

//响应
type GetCompetitionTypesRes struct {
	CompetitionTypes []string
}

//获取所有比赛的类型
func (c *CompetitionService) GetCompetitionTypes(r *http.Request,
	req *GetCompetitionTypesReq, res *GetCompetitionTypesRes) error {
	var types []models.Type

	tx := c.db.Begin() // 数据库事务，要求所有数据库操作都在数据库事务的包裹中操作
	types = models.FindAllTypes(tx)
	err := tx.Commit().Error // 数据库事务

	var competitionTypes []string
	for _, item := range types {
		competitionTypes = append(competitionTypes, item.Name)
	}
	res.CompetitionTypes = competitionTypes

	return err
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
	typeNew := models.Type{
		Name:     req.Name,
		Describe: req.Description,
	}

	tx := c.db.Begin() // 数据库事务，要求所有数据库操作都在数据库事务的包裹中操作
	err := models.CreateType(tx, typeNew)
	if err != nil {
		log.Debug(err)
	}
	err = tx.Commit().Error // 数据库事务

	if err != nil {
		res.Result = "failed"
	} else {
		res.Result = "success"
	}
	return nil
}
