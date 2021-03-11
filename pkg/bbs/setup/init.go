package setup

import (
	"github.com/juju/errors"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/bbs/models"
	"github.com/lantu-dev/puki/pkg/bbs/services"
	"gorm.io/gorm"
)

const MOD_NAME = "bbs"

// 模块初始化
func Setup(reg *rpc.ServiceRegistry, db *gorm.DB) (err error) {
	err = errors.Trace(db.AutoMigrate(&models.Thread{}, &models.Node{}))
	if err != nil {
		return
	}

	err = reg.RegisterService(MOD_NAME, services.NewNodeService(db))
	if err != nil {
		return
	}

	err = reg.RegisterService(MOD_NAME, services.NewThreadService(db))
	if err != nil {
		return
	}
	return
}
