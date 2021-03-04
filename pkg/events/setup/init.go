// 用于配制和初始化 auth 模块
package setup

import (
	"github.com/juju/errors"
	models2 "github.com/lantu-dev/puki/pkg/auth/models"
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/events/models"
	"github.com/lantu-dev/puki/pkg/events/services"
	"gorm.io/gorm"
)

const ModName = "events"

// 模块初始化
func Setup(reg *base.ServiceRegistry, db *gorm.DB) (err error) {
	err = errors.Trace(db.AutoMigrate(&models.Event{}, &models.Schedule{}, &models.Hackathon{}, &models.UserEvent{}))
	if err != nil {
		return
	}
	err = db.SetupJoinTable(models2.User{}, "Events", &models.UserEvent{})
	if err != nil {
		return
	}

	err = reg.RegisterService(ModName, services.NewEventService(db))
	if err != nil {
		return
	}

	return
}
