package models

import (
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/team/models"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type PositionService struct {
	db *gorm.DB
}

//返回一个带有保存了数据的数据库实例的服务对象而所有值为默认值的服务实例; 由于RegisterService函数的参数需要是指针，所以本函数返回指针类型
func NewPositionService(db *gorm.DB) *PositionService {
	return &PositionService{
		db: db,
	}
}

//----------------------------------------------------------------------------------------------------------------------

//获取岗位的名称
type GetPositionNamesReq struct{}
type GetPositionNamesRes struct {
	PositionNames []string
}

func (c *PositionService) GetPositionNames(ctx *rpc.Context, req *GetPositionNamesReq, res *GetPositionNamesRes) error {
	var positionNames []string
	var positionTemplates []models.PositionTemplate

	tx := c.db.Begin() // 数据库事务，要求所有数据库操作都在数据库事务的包裹中操作
	positionTemplates = models.FindAllPositionTemplates(tx)
	err := tx.Commit().Error // 数据库事务
	if err != nil {
		log.Debug(err)
	}

	for _, item := range positionTemplates {
		positionNames = append(positionNames, item.Name)
	}
	res.PositionNames = positionNames
	return err
}

//编辑项目岗位
type NewPosition struct {
	Names        []string
	NeedNums     []int64
	Requirements []string
}
type EditPositionReq struct {
	ProjectID            uint
	PositionIDs          []uint
	PositionNames        []string
	PositionNeedNums     []int64
	PositionRequirements []string
	NewPosition          NewPosition
}
type EditPositionRes struct {
	IsFailed bool
}

func (c *PositionService) EditPosition(ctx *rpc.Context,
	req *EditPositionReq, res *EditPositionRes) (err error) {

	for index, item := range req.PositionIDs {
		tx := c.db.Begin()
		err = models.EditPositionByID(tx, item, req.PositionNeedNums[index], req.PositionRequirements[index])
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

	for index, item := range req.NewPosition.Names {
		tx := c.db.Begin()
		err = models.CreatePositionByProjectID(tx, req.ProjectID, item, req.NewPosition.NeedNums[index], req.NewPosition.Requirements[index])
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

type CreatePositionTemplateReq struct {
	Name            string
	DefaultDescribe string
}
type CreatePositionTemplateRes struct {
	IsFailed bool
}

func (c *PositionService) CreatePositionTemplate(ctx *rpc.Context, req *CreatePositionTemplateReq, res *CreatePositionTemplateRes) error {
	positionTemplate := models.PositionTemplate{
		Name:            req.Name,
		DefaultDescribe: req.DefaultDescribe,
	}
	tx := c.db.Begin()
	err := models.CreatePositionTemplate(tx, &positionTemplate)
	if err != nil {
		res.IsFailed = true
		log.Debug(err)
	}
	err = tx.Commit().Error
	if err != nil {
		res.IsFailed = true
		log.Debug(err)
	}
	return err
}
