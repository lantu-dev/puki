package services

import (
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/qian_qing/models"
	"gorm.io/gorm"
)

type PersonalInfoService struct {
	db *gorm.DB
}

//返回一个带有保存了数据的数据库实例的服务对象而所有值为默认值的服务实例; 由于RegisterService函数的参数需要是指针，所以本函数返回指针类型
func NewPersonalInfoService(db *gorm.DB) *PersonalInfoService {
	return &PersonalInfoService{
		db: db,
	}
}

type GetSBInforeq struct {
	ID int16
}
type GetSBInfores struct {
	PersonalInfo models.PersonalInfo
}

func (p *PersonalInfoService) GetSBInfo(ctx *rpc.Context, req *GetSBInforeq, res *GetSBInfores) error {
	tx := p.db.Begin()
	res.PersonalInfo = models.GetSBInfo(tx, req.ID)
	err := tx.Commit().Error
	return err
}
