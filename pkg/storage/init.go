package storage

import (
	"fmt"
	"github.com/google/uuid"
	"github.com/lantu-dev/puki/pkg/base"
	log "github.com/sirupsen/logrus"
	"io/ioutil"
	"net/http"
	"os"
	"path"
)

func Setup() {

	if base.IsDev {
		// All storage stuff is done by a gateway. Here's some simulation code.
		location := "./storage"
		if _, err := os.Stat(location); os.IsNotExist(err) {
			if err := os.Mkdir(location, 0700); err != nil {
				log.Fatal(err)
			}
		}
		imageLocation := "./storage/images"
		if _, err := os.Stat(imageLocation); os.IsNotExist(err) {
			if err := os.Mkdir(imageLocation, 0700); err != nil {
				log.Fatal(err)
			}
		}

		fs := http.FileServer(http.Dir(location))
		http.Handle("/storage/", http.StripPrefix("/storage", fs))
		http.HandleFunc("/storage/image", func(w http.ResponseWriter, r *http.Request) {
			file, _, err := r.FormFile("file")
			if err != nil {
				log.Error(err)
				w.WriteHeader(http.StatusBadRequest)
				return
			}
			defer file.Close()

			content, err := ioutil.ReadAll(file)
			if err != nil {
				log.Error(err)
				w.WriteHeader(http.StatusBadRequest)
				return
			}

			filePath := path.Join(imageLocation, uuid.NewString())

			err = ioutil.WriteFile(filePath, content, 0700)
			if err != nil {
				log.Error(err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			err = ioutil.WriteFile(filePath+"-origin", content, 0700)
			if err != nil {
				log.Error(err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			err = ioutil.WriteFile(filePath+"-thumbnail", content, 0700)
			if err != nil {
				log.Error(err)
				w.WriteHeader(http.StatusInternalServerError)
				return
			}

			w.Header().Set("Content-Type", "application/json")
			_, err = w.Write([]byte(fmt.Sprintf("{\"url\":\"%s\"}", filePath)))
			if err != nil {
				log.Error(err)
			}
		})
	}
}
