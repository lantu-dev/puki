package models

import (
	"github.com/lantu-dev/puki/pkg/auth/models"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"time"
)

//项目Project; 由招募者创建，并可进行二次编辑、选择封存、删除等
type Project struct {
	gorm.Model
	//是否可用，初始值为false，若项目已招募够需要的人数、或由招募者手动操作后，进入true状态；招募者可重新开启招募
	//解释：变量用途：1.用于展示优先度的计算；2.封存阶段仅可浏览、不可与招募者联系，可选择当招募再次开启时提醒
	IsAvailable bool `gorm:"default:true"`

	//创建者ID
	CreatorID int64

	//队员：项目与比赛为多对多关系，且比赛名次以项目为单位
	//获奖逻辑：
	//A项目获奖 - A项目关联比赛 - A项目在该比赛中名次；【项目创建者操作】
	//查看成员 - 获取成员关联项目 - 获取项目获奖情况；
	//查看项目 - 查看该项目的获奖情况
	//查看比赛 - 查看所有项目获奖情况；
	//查看competition_projects连接表 - 查看使用组队系统的所有项目的获奖情况
	Members []*models.User `gorm:"many2many:user_projects"`

	//比赛/活动：【在此系统中，比赛与活动视作一个类，下方将仅用“比赛”词代替“比赛/活动”】
	//注意此处功能设计上需要有：点击项目卡片上的比赛标签 => 进入带有设置了该比赛筛选的首屏
	Competitions []*Competition `gorm:"many2many:competition_projects"`

	//类别:
	//注意：此类别区别于”比赛“属性，其内容为：如：“校企合作”，“导师科研”，“学生自研”等
	//“比赛”为多选，”类别“为单选
	//类别ID，由于一个项目仅能对应一个类别，所以使用int64类型
	TypeID int64

	//项目介绍：
	//项目名称; 要求：不允许出现两个项目名称相同
	Name string `gorm:"unique"`
	//简短的文字介绍，用3~5句话讲清是做什么，用于首屏中卡片中简单介绍项目，以及详情页中的”简介“
	DescribeSimple string
	//详细的文字介绍，详细介绍项目是做什么，包括项目背景、目标、成果等等信息，用于详情页中的详细介绍项目
	DescribeDetail string
	//介绍链接URL，类似于微信”阅读原文“功能，如有交互式展示、图文消息等复杂形式的介绍，目前不做集成仅作跳转
	LinkURL string
	//项目招募结束时间，可作为首屏项目卡片排序的参照属性之一
	EndTime time.Time

	//项目需要的岗位，一对多关系
	Positions []Position
	//项目评论，一个项目可以有多个评论
	Comments []Comment

	//项目评论数
	CommentsNum int64 `gorm:"default:0"`
	//项目Star数
	StarNum int64 `gorm:"default:0"`
}

//通过项目ID查找项目
func FindProjectByID(tx *gorm.DB, projectID uint) Project {
	var project Project
	result := tx.Preload("Competitions").First(&project, projectID)
	if result.Error != nil {
		log.Debug(result.Error)
		tx.Rollback()
	}
	return project
}

//通过项目ID数组查找项目
func FindProjectByIDs(tx *gorm.DB, projectID []int64) []Project {
	var projects []Project
	result := tx.Preload("Competitions").Where(projectID).Find(&projects)
	if result.Error != nil {
		log.Debug(result.Error)
		tx.Rollback()
	}
	return projects
}

//创建项目
func CreateProject(tx *gorm.DB, project Project) (projectID uint, err error) {
	result := tx.Create(&project)
	if result.Error != nil {
		tx.Rollback()
	}
	return project.ID, result.Error
}

//获取项目的个数
func GetProjectNum(tx *gorm.DB) int64 {
	var projectNum int64
	result := tx.Model(&Project{}).Count(&projectNum)
	if result.Error != nil {
		tx.Rollback()
		log.Debug(result.Error)
	}
	return projectNum
}

//获取所有项目
func FindAllProjects(tx *gorm.DB) []Project {
	var projects []Project
	result := tx.Find(&projects)
	if result.Error != nil {
		log.Debug(result.Error)
		tx.Rollback()
	}
	return projects
}

//通过ID更新岗位
func UpdateProjectByID(tx *gorm.DB, projectID uint, key string, value string) (err error) {
	err = tx.Model(&Project{}).Where(projectID).Update(key, value).Error
	if err != nil {
		log.Debug(err)
		tx.Rollback()
	}
	return err
}
