package base

import "fmt"

// 用户错误，将该错误返回给前端，前端会显示一个错误弹窗
type UserError struct {
	cause error
	msg   string
}

func (w *UserError) Message() string { return w.msg }
func (w *UserError) Error() string {
	if w.cause != nil {
		return w.msg + ": " + w.cause.Error()
	} else {
		return w.msg
	}

}
func (w *UserError) Cause() error  { return w.cause }
func (w *UserError) Unwrap() error { return w.cause }

// 创建一个用户操作导致的错误，将该错误返回给前端，前端会显示一个弹窗
func UserErrorf(err error, format string, args ...interface{}) error {
	return &UserError{
		cause: err,
		msg:   fmt.Sprintf(format, args...),
	}
}
