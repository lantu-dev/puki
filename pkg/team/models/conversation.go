package models

import "gorm.io/gorm"

//聊天逻辑：对于一个项目来说，每有一个“求募者”与“招募者”进行沟通，就会产生一个Conversation，每个Conversation对应若干个message
//在Conversation模型中，加入IntentionPosts表示意向岗位
type Conversation struct {
	gorm.Model

	ProjectId int64
	//招募者ID
	RecruiterID int64
	//寻募者ID
	JobSeeker int64

	Messages       []Message
	IntentionPosts []Post
}

//一次Conversation的“元”，在前端以左右气泡的形式，以时间顺序排列
type Message struct {
	gorm.Model

	//消息类型，约定如下：0-文字消息，1-图片消息，。。。
	MessageType int64
	//消息内容，如果是文字消息，则为消息内容，若为图片消息则为图片地址URL
	Content string
}
