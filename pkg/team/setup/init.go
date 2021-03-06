package setup

import (
	"github.com/juju/errors"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	models "github.com/lantu-dev/puki/pkg/team/models"

	services "github.com/lantu-dev/puki/pkg/team/services"
	"gorm.io/gorm"
)

const MOD_NAME = "team"

func Setup(reg *rpc.ServiceRegistry, db *gorm.DB) (err error) {
	err = errors.Trace(db.AutoMigrate(&models.Project{}, &models.Comment{}, &models.Competition{}, &models.Type{}, &models.Conversation{}, &models.File{},
		&models.PositionTemplate{}, &models.Position{}, &models.CompetitionProject{}, &models.Resume{}))
	if err != nil {
		//return
	}

	err = reg.RegisterService(MOD_NAME, services.NewCommentService(db))
	err = reg.RegisterService(MOD_NAME, services.NewCompetitionService(db))
	err = reg.RegisterService(MOD_NAME, services.NewConversationService(db))
	err = reg.RegisterService(MOD_NAME, services.NewFileService(db))
	err = reg.RegisterService(MOD_NAME, services.NewPositionService(db))
	err = reg.RegisterService(MOD_NAME, services.NewProjectService(db))
	err = reg.RegisterService(MOD_NAME, services.NewResumeService(db))
	if err != nil {
		return
	}

	return
}
