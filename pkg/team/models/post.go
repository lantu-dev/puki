package models

import "gorm.io/gorm"

//模型间逻辑说明：通过项目找到对应的Post => 通过Post找到对应的PostTemplate => 通过PostTemplate找到其他项目

//岗位Post，即招募需求中，需要具有哪些方面能力的人才；举例：前端开发、后端开发、UI设计、UX设计等
type Post struct {
	gorm.Model

	//岗位介绍
	//岗位名称ID
	PostTemplateID int64
	//岗位简介，若未空则显示对应PostTemplate中的DefaultDescribe
	Describe string

	//目前该岗位已招募的人数（录用人数）
	NowPeople int64
	//需要招募的人数（需求人数）
	NeedPeople int64
	//对该岗位感兴趣的人数
	InterestPeople int64
}

//岗位模板，这里把岗位名称单拎出来是为了让岗位名称仅来自于从已有岗位名称中挑选，以方便首屏中依据岗位的筛选
//附有默认的岗位描述，该内容可自定义，若用户未编写则未默认内容
//同时Post未定死的原因是同一个岗位比如后端开发，在不同项目中的实际需求可能是不一样的
type PostTemplate struct {
	gorm.Model
	//岗位名称
	Name string
	//岗位对象，用于通过岗位名称查找相对应的岗位
	Posts []Post
	//默认岗位描述
	DefaultDescribe string
}
