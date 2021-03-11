package rpc

import "net/http"

type Context struct {
	ID       string
	Endpoint string
	Request  *http.Request
	Writer   http.ResponseWriter
}
