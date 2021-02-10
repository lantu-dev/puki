package main

import (
	"flag"
	"github.com/alicebob/miniredis/v2"
	"github.com/davecgh/go-spew/spew"
	"github.com/go-redis/redis/v8"
	"github.com/lantu-dev/puki/pkg/auth"
	authsetup "github.com/lantu-dev/puki/pkg/auth/setup"
	"github.com/lantu-dev/puki/pkg/base"
	log "github.com/sirupsen/logrus"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"net/http"
)

func main() {
	address := flag.String("address", ":8001", "")

	mrds, err := miniredis.Run()
	if err != nil {
		panic(err)
	}
	defer mrds.Close()

	rds := redis.NewClient(&redis.Options{Addr: mrds.Addr()})

	db, err := gorm.Open(sqlite.Open("dev.db"),     &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	}

	reg := base.NewServiceRegistry()

	// 每新增一个模块 ( mod ) , 在这里新增一个 Setup 。
	if err := authsetup.Setup(reg, db); err != nil {
		log.Fatal(err)
	}
	auth.SetupSMSLogin(func(phoneNumber int64, code string) error {
		spew.Dump(phoneNumber, code)
		return nil
	}, rds)

	http.Handle("/api/", reg)
	log.Infof("server listen @ %s", *address)
	log.Fatal(http.ListenAndServe(*address, nil))
}
