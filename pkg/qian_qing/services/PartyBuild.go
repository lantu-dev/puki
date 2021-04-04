package services

import (
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/qian_qing/models"
	"gorm.io/gorm"
)

type PartyBuildService struct {
	db *gorm.DB
}

func NewPartyService(db *gorm.DB) *PartyBuildService {
	return &PartyBuildService{
		db: db,
	}
}

//文件部分还未实现
//________________________
type PartyBuildReq struct {
	ClassNumber int16
}
type PartyBuildRes struct {
	NumberInParty     int
	NumberWillInParty int
}

func (p *PartyBuildService) FindPartyNum(ctx *rpc.Context, req *PartyBuildReq, res *PartyBuildRes) error {
	tx := p.db.Begin()
	res.NumberInParty, res.NumberWillInParty = models.FindPartyBuild(tx, req.ClassNumber)
	err := tx.Commit().Error
	return err
}

type UpdatePartyNumreq struct {
	ClassNumber int16
	NewPartyNum int
}
type UpdatePartyNumres struct {
	Isfailed bool
}

func (p *PartyBuildService) UpdatePartyNum(ctx *rpc.Context, req *UpdatePartyNumreq, res *UpdatePartyNumres) error {
	tx := p.db.Begin()
	err := models.UpdatePartyNumber(tx, req.ClassNumber, req.NewPartyNum)
	if err != nil {
		res.Isfailed = true
	}
	err1 := tx.Commit().Error
	return err1
}

type UpdateWillPartyNumreq struct {
	ClassNumber     int16
	NewWillPartyNum int
}
type UpdateWillPartyNumres struct {
	Isfailed bool
}

func (p *PartyBuildService) UpdateWillPartyNum(ctx *rpc.Context, req *UpdateWillPartyNumreq, res *UpdateWillPartyNumres) error {
	tx := p.db.Begin()
	err := models.UpdateWillPartyNumber(tx, req.ClassNumber, req.NewWillPartyNum)
	if err != nil {
		res.Isfailed = true
	}
	err1 := tx.Commit().Error
	return err1
}
