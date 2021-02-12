package models

import (
	"gorm.io/gorm"
	"time"
)

//项目Project; 由招募者创建，并可进行二次编辑、选择封存、删除等
type Project struct {
	gorm.Model
	//是否可用，初始值为false，若项目已招募够需要的人数、或由招募者手动操作后，进入true状态；招募者可重新开启招募
	//解释：变量用途：1.用于展示优先度的计算；2.封存阶段仅可浏览、不可与招募者联系，可选择当招募再次开启时提醒
	IsAvailable bool

	//创建者ID
	CreatorID int64

	//比赛/活动：【在此系统中，比赛与活动视作一个类，下方将仅用“比赛”词代替“比赛/活动”】
	//注意此处功能设计上需要有：点击项目卡片上的比赛标签 => 进入带有设置了该比赛筛选的首屏
	Competitions []Competition `gorm:"many2many:competition_projects"`

	//类别:
	//注意：此类别区别于”比赛“属性，其内容为：如：“校企合作”，“导师科研”，“学生自研”等
	//“比赛”为多选，”类别“为单选
	//类别ID，由于一个项目仅能对应一个类别，所以使用int64类型
	TypeID int64

	//项目介绍：
	//项目名称; 要求：不允许出现两个项目名称相同
	Name string
	//简短的文字介绍，用3~5句话讲清是做什么，用于首屏中卡片中简单介绍项目，以及详情页中的”简介“
	DescribeSimple string
	//详细的文字介绍，详细介绍项目是做什么，包括项目背景、目标、成果等等信息，用于详情页中的详细介绍项目
	DescribeDetail string
	//介绍链接URL，类似于微信”阅读原文“功能，如有交互式展示、图文消息等复杂形式的介绍，目前不做集成仅作跳转
	LinkURL string
	//项目招募信息创建(最后一次编辑)时间，可作为首屏项目卡片排序的参照属性之一
	EditTime time.Time
	//项目招募结束时间，可作为首屏项目卡片排序的参照属性之一
	EndTime time.Time

	//项目需要的岗位
	Posts []Post
	//项目评论
	Comments []Comment

	//项目Star数
	StarNum int64
}

//比赛类型，此类别区别于”比赛“属性，其内容为：如：“校企合作”，“导师科研”，“学生自研”等
type Type struct {
	gorm.Model
	//类别名称
	Name string
	//类别介绍
	Describe string
}
