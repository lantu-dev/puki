package rpc

import (
	"errors"
)

var ErrNotExported = errors.New("NotExported")
var ErrAlreadyDefined = errors.New("AlreadyDefined")
var ErrEndpointNotFound = errors.New("EndpointNotFound")
