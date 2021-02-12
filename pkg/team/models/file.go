package models

import "gorm.io/gorm"

//资料,如下方的比赛资料等，文件下载系统与此系统独立，因此只需名称与下载链接
type File struct {
	gorm.Model
	Name string
	Link string
}
