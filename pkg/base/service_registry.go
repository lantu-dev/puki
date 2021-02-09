package base

import (
	"fmt"
	"github.com/gorilla/rpc/v2"
	"github.com/gorilla/rpc/v2/json2"
	log "github.com/sirupsen/logrus"
	"net/http"
	"reflect"
)

// 服务注册表：对内提供服务注册机制，对外提供 HTTP 接口调用。
//
// 调用点 ( Endpoint )：接口的名字，格式如下："<mod>/<service>.<method>"，如 `auth/UserService.Login`。
// 其中， <mod> 为模块名称，约定名称与 '/pkg/<mod>' 保持一直，如 `auth`。
// <service> 为服务名称，通常命名为 `XXXXService` ，如 `UserService`。
// <method> 为方法名称，如 `Login`。
type ServiceRegistry struct {
	s *rpc.Server
}

func NewServiceRegistry() (r *ServiceRegistry) {
	r = &ServiceRegistry{
		s: rpc.NewServer(),
	}
	r.s.RegisterCodec(json2.NewCustomCodec(&rpc.CompressionSelector{}), "application/json")
	r.s.RegisterValidateRequestFunc(func(r *rpc.RequestInfo, i interface{}) error {
		return Validator.Struct(i)
	})
	return
}

// 注册服务
//
// modName 模块名称
//
// service 服务实例
func (r *ServiceRegistry) RegisterService(modName string, service interface{}) error {
	endpoint := fmt.Sprintf("%s/%s", modName, reflect.Indirect(reflect.ValueOf(service)).Type().Name())
	log.Infof("service registered: %s", endpoint)
	return r.s.RegisterService(service, endpoint)
}

func (r *ServiceRegistry) ServeHTTP(writer http.ResponseWriter, request *http.Request) {
	r.s.ServeHTTP(writer, request)
}
