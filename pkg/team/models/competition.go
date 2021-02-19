package models

import (
	"gorm.io/gorm"
)

//比赛Competition; 由管理员创建，使用者仅可从已有比赛中进行勾选
type Competition struct {
	gorm.Model
	//比赛名称;
	Name string
	//比赛介绍
	Description string
	//比赛图片, 一般为比赛的宣传海报；填写该图片的URL
	ImageURL string
	//比赛官网链接
	HomePageURL string
	//比赛时间,若有下一次比赛的具体时间，则更新为具体时间，否则为上一届的时间
	//这里用字符串而非time.Time的原因是比赛时间可能是较为复杂的多个时间点，如：提交立项申请书：6月10日~7月15日；初审答辩：7月中旬
	Time string
	//相关资料下载; 填写File的ID; 若有多个资料则用英文分号隔开
	//注意：由于无需通过文件查找有关比赛，因此不用定义反向引用
	Files []File
}
