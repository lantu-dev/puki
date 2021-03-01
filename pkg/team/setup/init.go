package setup

import (
	"github.com/juju/errors"
	"github.com/lantu-dev/puki/pkg/base"
	models "github.com/lantu-dev/puki/pkg/team/models"

	services "github.com/lantu-dev/puki/pkg/team/services"
	"gorm.io/gorm"
)

const MOD_NAME = "team"

func Setup(reg *base.ServiceRegistry, db *gorm.DB) (err error) {
	err = errors.Trace(db.AutoMigrate(&models.Comment{}, &models.Competition{}, &models.Type{}, &models.Conversation{}, &models.File{},
		&models.Position{}, &models.PositionTemplate{}, &models.Project{}, &models.CompetitionProject{}))
	if err != nil {
		return
	}

	err = reg.RegisterService(MOD_NAME, services.NewCompetitionService(db))
	err = reg.RegisterService(MOD_NAME, services.NewCompetitionService(db))
	err = reg.RegisterService(MOD_NAME, services.NewConversationService(db))
	err = reg.RegisterService(MOD_NAME, services.NewFileService(db))
	err = reg.RegisterService(MOD_NAME, services.NewPositionService(db))
	err = reg.RegisterService(MOD_NAME, services.NewProjectService(db))
	if err != nil {
		return
	}

	return
}
