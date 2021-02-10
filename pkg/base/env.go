package base

import (
  "os"
  "strings"
)

var appEnv = strings.ToUpper(os.Getenv("APP_ENV"))

// 是否处于开发环境
func IsDev() bool {
  return strings.HasPrefix(appEnv, "DEV") || appEnv == ""
}

// 是否处于生产环境
func IsProd() bool {
  return strings.HasPrefix(appEnv, "PROD")
}
