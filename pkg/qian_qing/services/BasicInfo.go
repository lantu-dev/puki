package services

import (
	"github.com/lantu-dev/puki/pkg/auth"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/qian_qing/models"
	"gorm.io/gorm"
)

type BasicInfoService struct {
	db *gorm.DB
}

//返回一个带有保存了数据的数据库实例的服务对象而所有值为默认值的服务实例; 由于RegisterService函数的参数需要是指针，所以本函数返回指针类型
func NewBasicInfoService(db *gorm.DB) *BasicInfoService {
	return &BasicInfoService{
		db: db,
	}
}

type ModifyRecorderreq struct {
	ClassNumber int16
	NewRecorder string
}
type ModifyRecorderres struct {
	IsFailed bool
}

//修改记录人
func (b *BasicInfoService) UpdateRecorder(ctx *rpc.Context, req *ModifyRecorderreq, res *ModifyRecorderres) (err error) {
	var tokenUser auth.TokenUser
	tokenUser, err = auth.ExtractTokenUser(ctx)
	if err != nil {
		res.IsFailed = true
		return err
	}

	tx := b.db.Begin()
	err = models.UpdateRecorder(tx, req.ClassNumber, req.NewRecorder)
	if err != nil {
		res.IsFailed = true
		return err
	}
	err = tx.Commit().Error
	if err != nil {
		res.IsFailed = true
		return err
	}
	res.IsFailed = false
	return err
}

//修改学生数
type UpstateStuNumreq struct {
	ClassNumber   int16
	NewStudentNum int
}
type UpstateStuNumres struct {
	IsFailed bool
}

//修改学生数
func (b *BasicInfoService) UpdateStudentNum(ctx *rpc.Context, req *UpstateStuNumreq, res *UpstateStuNumres) (err error) {
	var tokenUser auth.TokenUser
	tokenUser, err = auth.ExtractTokenUser(ctx)
	if err != nil {
		res.IsFailed = true
		return err
	}
	tx := b.db.Begin()
	err = models.UpdateStuNum(tx, req.ClassNumber, req.NewStudentNum)
	if err != nil {
		res.IsFailed = true
		return err
	}
	err = tx.Commit().Error
	if err != nil {
		res.IsFailed = true
		return err
	}
	res.IsFailed = false
	return err
}

//修改团支部人数
type UpstateStuHerereq struct {
	ClassNumber   int16
	NewStudentNum int
}
type UpstateStuHereres struct {
	IsFailed bool
}

//修改团支部人数
func (b *BasicInfoService) UpdateStudentHere(ctx *rpc.Context, req *UpstateStuHerereq, res *UpstateStuHereres) (err error) {
	var tokenUser auth.TokenUser
	tokenUser, err = auth.ExtractTokenUser(ctx)
	if err != nil {
		res.IsFailed = true
		return err
	}
	tx := b.db.Begin()
	err = models.UpdateStuNum(tx, req.ClassNumber, req.NewStudentNum)
	if err != nil {
		res.IsFailed = true
		return err
	}
	err = tx.Commit().Error
	if err != nil {
		res.IsFailed = true
		return err
	}
	res.IsFailed = false
	return err
}
