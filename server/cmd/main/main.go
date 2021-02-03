package main

import (
	"flag"
	"log"
	"net/http"

	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
)

type Counter struct {
	Count int
}

type IncrReq struct {
	Delta int
}

// Notification.
func (c *Counter) Incr(r *http.Request, req *IncrReq, res *json2.EmptyResponse) error {
	log.Printf("<- Incr %+v", *req)
	c.Count += req.Delta
	return nil
}

type GetReq struct {
}

func (c *Counter) Get(r *http.Request, req *GetReq, res *Counter) error {
	log.Printf("<- Get %+v", *req)
	*res = *c
	log.Printf("-> %v", *res)
	return nil
}

func main() {
	address := flag.String("address", ":8001", "")
	s := rpc.NewServer()
	s.RegisterCodec(json2.NewCustomCodec(&rpc.CompressionSelector{}), "application/json")
	s.RegisterService(new(Counter), "")
	http.Handle("/", http.StripPrefix("/", http.FileServer(http.Dir("./"))))
	http.Handle("/jsonrpc/", s)
	log.Fatal(http.ListenAndServe(*address, nil))
}