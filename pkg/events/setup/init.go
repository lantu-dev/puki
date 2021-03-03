// 用于配制和初始化 auth 模块
package setup

import (
	"github.com/juju/errors"
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/events/models"
	"github.com/lantu-dev/puki/pkg/events/services"
	"gorm.io/gorm"
)

const ModName = "events"

// 模块初始化
func Setup(reg *base.ServiceRegistry, db *gorm.DB) (err error) {
	err = errors.Trace(db.AutoMigrate(&models.Event{}, &models.Schedule{}, &models.Hackathon{}))
	if err != nil {
		return
	}

	err = reg.RegisterService(ModName, services.NewEventService(db))
	if err != nil {
		return
	}

	return
}
