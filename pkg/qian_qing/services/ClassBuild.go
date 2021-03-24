package services

import (
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/qian_qing/models"
	"gorm.io/gorm"
)

type ClassBuildService struct {
	db *gorm.DB
}

//返回一个带有保存了数据的数据库实例的服务对象而所有值为默认值的服务实例; 由于RegisterService函数的参数需要是指针，所以本函数返回指针类型
func NewClassBuildService(db *gorm.DB) *ClassBuildService {
	return &ClassBuildService{
		db: db,
	}
}

type FindComsreq struct {
	ClassNumber int16
}
type FindComres struct {
	ClassComs models.ClassBuild
}

//获取班级班委信息
func (c *ClassBuildService) FindClassComs(ctx *rpc.Context, req *FindComsreq, res *FindComres) error {
	var ClassComs models.ClassBuild
	tx := c.db.Begin()
	ClassComs = models.FindClassComs(tx, req.ClassNumber)
	err := tx.Commit().Error
	res.ClassComs = ClassComs
	return err
}

type UpdateComsreq struct {
	ClassNum  int16
	ComID     int
	NewComsID int16
}
type UpdateComsres struct {
	IsFailed bool
}

func (c *ClassBuildService) UpdateComs(ctx *rpc.Context, req *UpdateComsreq, res *UpdateComsres) error {
	tx := c.db.Begin()
	models.UpdateComs(tx, req.ClassNum, req.ComID, req.NewComsID)
	err := tx.Commit().Error
	if err != nil {
		res.IsFailed = true
	} else {
		res.IsFailed = false
	}
	return nil
}
