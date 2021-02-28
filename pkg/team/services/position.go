package models

import (
	"github.com/lantu-dev/puki/pkg/team/models"
	"gorm.io/gorm"
	"net/http"
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

func (c *PositionService) GetPositionNames(r *http.Request, req *GetPositionNamesReq, res *GetPositionNamesRes) error {
	var positionNames []string
	var positionTemplates []models.PositionTemplate
	c.db.Find(&positionTemplates)
	for _, item := range positionTemplates {
		positionNames = append(positionNames, item.Name)
	}
	res.PositionNames = positionNames
	return nil
}
