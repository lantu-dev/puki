package rpc

import (
	"encoding/json"
	"fmt"
	qs "github.com/gorilla/schema"
	//jsoniter "github.com/json-iterator/go"
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/pkg/errors"
	log "github.com/sirupsen/logrus"
	"net/http"
	"reflect"
	"strings"
	"sync"
)

//var json = jsoniter.ConfigCompatibleWithStandardLibrary

var (
	// Precompute the reflect.Type of error and http.Request
	typeOfError   = reflect.TypeOf((*error)(nil)).Elem()
	typeOfRequest = reflect.TypeOf((*http.Request)(nil)).Elem()
	typeOfContext = reflect.TypeOf((*Context)(nil)).Elem()
	typeOfEmpty   = reflect.TypeOf((*Empty)(nil)).Elem()
)
var nilErrorValue = reflect.Zero(reflect.TypeOf((*error)(nil)).Elem())

type serviceMethod struct {
	method  reflect.Method
	reqType reflect.Type
	resType reflect.Type
}

type service struct {
	name     string
	rcvr     reflect.Value
	rcvrType reflect.Type
	methods  map[string]*serviceMethod
}

// ServiceRegistry 服务注册表：对内提供服务注册机制，对外提供 HTTP 接口调用。
//
// 调用点 ( Endpoint )：接口的名字，格式如下："<mod>/<service>.<method>"，如 `auth/UserService.Login`。
// 其中， <mod> 为模块名称，约定名称与 '/pkg/<mod>' 保持一直，如 `auth`。
// <service> 为服务名称，通常命名为 `XXXXService` ，如 `UserService`。
// <method> 为方法名称，如 `Login`
type ServiceRegistry struct {
	prefixLength int
	mutex        sync.Mutex
	services     map[string]*service
}

func NewServiceRegistry(prefix string) *ServiceRegistry {
	prefixLength := len(prefix)
	if !strings.HasPrefix(prefix, "/") {
		prefixLength += 1
	}
	if !strings.HasSuffix(prefix, "/") {
		prefixLength += 1
	}
	return &ServiceRegistry{
		prefixLength: prefixLength,
		services:     make(map[string]*service),
	}
}

//func NewServiceRegistry() (r *ServiceRegistry) {
//  r = &ServiceRegistry{
//    s: rpc.NewServer(),
//  }
//
//  return
//}

// RegisterService 注册服务
//
// modName 模块名称
//
// service 服务实例
func (rg *ServiceRegistry) RegisterService(modName string, ser interface{}) error {
	sname := reflect.Indirect(reflect.ValueOf(ser)).Type().Name()
	if !isExported(sname) {
		return errors.Wrapf(ErrNotExported, "rpc: service name = %s", sname)
	}

	if modName != "" {
		sname = fmt.Sprintf("%s/%s", modName, sname)
	}

	log.Infof("register service: %s", sname)
	s := &service{
		name:     sname,
		rcvr:     reflect.ValueOf(ser),
		rcvrType: reflect.TypeOf(ser),
		methods:  make(map[string]*serviceMethod),
	}

	for i := 0; i < s.rcvrType.NumMethod(); i++ {
		method := s.rcvrType.Method(i)
		mname := method.Name
		mtype := method.Type

		if !isExported(mname) {
			continue
		}

		if mtype.NumIn() != 4 || mtype.NumOut() != 1 {
			log.Debugf("ignore method %s on %s because its signature should be (*XXService) XXX(context.Context, req *XXReq, res *XXRes) error", mname, sname)
			continue
		}

		arg1Type := mtype.In(1)
		if arg1Type.Kind() != reflect.Ptr || arg1Type.Elem() != typeOfContext {
			log.Debugf("ignore method %s on %s because its first argument isn't *rpc.Context", mname, sname)
			continue
		}

		arg2Type := mtype.In(2)
		if arg2Type.Kind() != reflect.Ptr || !typeIsExported(arg2Type) {
			log.Debugf("ignore method %s on %s because its second argument is not a pointer or unexported", mname, sname)
			continue
		}

		arg3Type := mtype.In(3)
		if arg2Type.Kind() != reflect.Ptr || !typeIsExported(arg3Type) {
			log.Debugf("ignore method %s on %s because its 3rd argument is not a pointer or unexported", mname, sname)
			continue
		}

		if returnType := mtype.Out(0); returnType != typeOfError {
			log.Debugf("ignore method %s on %s because its return type is not an error", mname, sname)
			continue
		}

		s.methods[mname] = &serviceMethod{
			method:  method,
			reqType: arg2Type.Elem(),
			resType: arg3Type.Elem(),
		}
		log.Debugf("Endpoint %s.%s registered", sname, mname)
	}

	rg.mutex.Lock()
	defer rg.mutex.Unlock()
	if _, ok := rg.services[s.name]; ok {
		return errors.Wrapf(ErrAlreadyDefined, "service %s", sname)
	}
	rg.services[s.name] = s
	return nil
}

func (rg *ServiceRegistry) get(endpoint string) (ser *service, method *serviceMethod, err error) {
	parts := strings.Split(endpoint, ".")
	if len(parts) != 2 {
		err = errors.WithMessagef(ErrEndpointNotFound, "rpc: %s", endpoint)
		return
	}
	rg.mutex.Lock()
	ser = rg.services[parts[0]]
	rg.mutex.Unlock()
	if ser == nil {
		err = errors.WithMessagef(ErrEndpointNotFound, "rpc: service %s", endpoint)
		return
	}
	method = ser.methods[parts[1]]
	if method == nil {
		err = errors.WithMessagef(ErrEndpointNotFound, "rpc: method %s", endpoint)
		return
	}
	return
}

type errorResponse struct {
	Kind    string
	Message string
}

type ResBody struct {
	ID    string
	Ok    bool
	Error json.RawMessage
	Data  json.RawMessage
}

func (rb *ResBody) WriteResponse(code int, w http.ResponseWriter) {
	w.WriteHeader(code)
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	if err := json.NewEncoder(w).Encode(rb); err != nil {
		log.Errorf("WriteResponse error %+v", err)
	}
}
func NewDataResBody(v interface{}) (body *ResBody, err error) {
	var data json.RawMessage
	data, err = json.Marshal(v)
	if err == nil {
		return &ResBody{
			Ok:    true,
			Error: nil,
			Data:  data,
		}, nil
	} else {
		return nil, err
	}
}

func NewErrorResBody(err error) *ResBody {
	var data json.RawMessage
	var errResp errorResponse
	var userErr *base.UserError

	var causeErrMsg string
	cause := errors.Cause(err)
	if cause != nil {
		causeErrMsg = cause.Error()
	} else {
		causeErrMsg = err.Error()
	}
	causeErrMsgParts := strings.SplitN(causeErrMsg, ":", 2)
	errResp.Kind = causeErrMsgParts[0]

	if errors.As(err, &userErr) {
		errResp.Message = userErr.Message()
	} else {
		errResp.Message = fmt.Sprintf("%v", err)
	}

	data, err = json.Marshal(errResp)

	if err != nil {
		log.Panicf("%+v", err)
	}

	return &ResBody{
		Ok:    false,
		Error: data,
	}
}

func (rg *ServiceRegistry) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	var err error
	if rg.prefixLength > len(r.URL.Path) {
		http.NotFound(w, r)
		return
	}
	if r.Method == "POST" {
		contentType := r.Header.Get("Content-Type")
		if !strings.HasPrefix(contentType, "application/json") {
			http.Error(w, "", http.StatusUnsupportedMediaType)
			return
		}
	}

	var ser *service
	var serMethod *serviceMethod

	endpoint := r.URL.Path[rg.prefixLength:]
	ser, serMethod, err = rg.get(endpoint)
	if err != nil {
		NewErrorResBody(err).WriteResponse(http.StatusNotFound, w)
		return
	}

	rID := ReqIDFromRequest(r).String()
	reqVal := reflect.New(serMethod.reqType)
	resVal := reflect.New(serMethod.resType)
	errVal := []reflect.Value{nilErrorValue}

	if r.Method == "GET" {

		err = qs.NewDecoder().Decode(reqVal, r.URL.Query())
		if err != nil {
			if base.IsDev {
				NewErrorResBody(err).WriteResponse(http.StatusBadRequest, w)
			} else {
				http.Error(w, "", http.StatusBadRequest)
			}
			return
		}

	}

	if r.Method == "POST" {
		defer r.Body.Close()

		err = json.NewDecoder(http.MaxBytesReader(w, r.Body, 4096)).Decode(reqVal.Interface())
		if err != nil {
			NewErrorResBody(err).WriteResponse(http.StatusBadRequest, w)
			return
		}

		err = base.Validator.Struct(reqVal)
		if err != nil {
			NewErrorResBody(err).WriteResponse(http.StatusOK, w)
			return
		}

	}

	ctx := Context{
		ID:       rID,
		Endpoint: endpoint,
		Request:  r,
		Writer:   w,
	}
	log.WithField("ReqID", rID).WithField("Endpoint", endpoint).Info("call-service start")

	errVal = serMethod.method.Func.Call([]reflect.Value{
		ser.rcvr,
		reflect.ValueOf(&ctx),
		reqVal,
		resVal,
	})

	errIface := errVal[0].Interface()
	if errIface != nil {
		err = errIface.(error)
		log.WithField("ReqID", rID).WithField("Error", err).Warn("call-service error")
	}

	var body *ResBody
	if err != nil {
		body = NewErrorResBody(err)
	} else if serMethod.resType != typeOfEmpty {
		body, err = NewDataResBody(resVal.Interface())
		if err != nil {
			log.WithField("ReqID", rID).WithField("Error", err).Error("gateway error")
			body = NewErrorResBody(err)
		}
	} else {
		// body is handle by service method block
		return
	}

	if err == nil {
		log.WithField("ReqID", rID).Info("call-service ok")
	}
	body.ID = rID
	body.WriteResponse(http.StatusOK, w)
}
