package base

import "github.com/juju/errors"

// 用户错误，将该错误返回给前端，前端会显示一个错误弹窗
type UserError struct {
	errors.Err
}

// 创建一个用户操作导致的错误，将该错误返回给前端，前端会显示一个弹窗
func UserErrorf(format string, args ...interface{}) error {
	return &UserError{errors.NewErr(format, args...)}
}
