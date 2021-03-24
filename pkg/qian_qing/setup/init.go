package setup

import (
	"github.com/juju/errors"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	models "github.com/lantu-dev/puki/pkg/qian_qing/models"

	services "github.com/lantu-dev/puki/pkg/qian_qing/services"
	"gorm.io/gorm"
)

const MOD_NAME = "qian_qing"

func Setup(reg *rpc.ServiceRegistry, db *gorm.DB) (err error) {
	err = errors.Trace(db.AutoMigrate(&models.BasicInfo{}, &models.ClassBuild{}, models.User{}))
	if err != nil {
		return
	}

	err = reg.RegisterService(MOD_NAME, services.NewBasicInfoService(db))
	err = reg.RegisterService(MOD_NAME, services.NewClassBuildService(db))
	if err != nil {
		return
	}

	return
}
