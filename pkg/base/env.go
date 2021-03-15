package base

import (
	"os"
	"strings"
)

var IsProd = strings.HasPrefix(strings.ToUpper(os.Getenv("APP_ENV")), "PROD")
var IsDev = !IsProd
