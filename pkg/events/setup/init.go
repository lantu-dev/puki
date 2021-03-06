// 用于配制和初始化 auth 模块
package setup

import (
	"github.com/juju/errors"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/events/models"
	"github.com/lantu-dev/puki/pkg/events/services"
	"gorm.io/gorm"
)

const ModName = "events"

// 模块初始化
func Setup(reg *rpc.ServiceRegistry, db *gorm.DB) (err error) {
	err = errors.Trace(db.AutoMigrate(&models.Event{}, &models.Schedule{}, &models.Hackathon{}, &models.Attendance{}))
	if err != nil {
		return
	}

	err = reg.RegisterService(ModName, services.NewEventService(db))
	if err != nil {
		return
	}
	// err = reg.RegisterService(ModName, services.NewCreateEventService(db))
	// if err != nil {
	// 	return
	// }

	return
}
