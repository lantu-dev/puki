package main

import (
	"flag"
	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	models "github.com/lantu-dev/puki/pkg/team/models"
	services "github.com/lantu-dev/puki/pkg/team/services"
	"gorm.io/driver/sqlserver"
	"gorm.io/gorm"
	"log"
	"net/http"
)

func main() {
	//gorm
	dsn := "sqlserver://sa:YourPassword@YourIP/instance?database=YourDatabaseName&port=1433"
	db, err := gorm.Open(sqlserver.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	// 迁移 schema, 需要添加所有model
	err = db.AutoMigrate(&models.Comment{}, &models.Competition{}, &models.Type{}, &models.Conversation{}, &models.File{},
		&models.Position{}, &models.PositionTemplate{}, &models.Project{}, &models.CompetitionProject{})
	if err != nil {
		panic(err)
	}
	//jsonrpc
	address := flag.String("address", ":8001", "")
	s := rpc.NewServer()
	s.RegisterCodec(json2.NewCustomCodec(&rpc.CompressionSelector{}), "application/json")
	//注册服务，需要添加所有服务
	s.RegisterService(services.NewCommentService(db), "CommentService") //注册服务，需要添加所有服务
	s.RegisterService(services.NewCompetitionService(db), "CompetitionService")
	s.RegisterService(services.NewConversationService(db), "ConversationService")
	s.RegisterService(services.NewFileService(db), "FileService")
	s.RegisterService(services.NewPositionService(db), "PositionService")
	s.RegisterService(services.NewProjectService(db), "ProjectService")
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./"))))
	http.Handle("/api/", s)
	log.Fatal(http.ListenAndServe(*address, nil))
}
