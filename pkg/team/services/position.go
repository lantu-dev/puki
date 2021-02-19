package models

import (
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
