package models

import (
	"github.com/lantu-dev/puki/pkg/auth"
	"github.com/lantu-dev/puki/pkg/team/models"
	"gorm.io/gorm"
	"net/http"
)

type CommentService struct {
	db *gorm.DB
}

//返回一个带有保存了数据的数据库实例的服务对象而所有值为默认值的服务实例; 由于RegisterService函数的参数需要是指针，所以本函数返回指针类型
func NewCommentService(db *gorm.DB) *CommentService {
	return &CommentService{
		db: db,
	}
}

//----------------------------------------------------------------------------------------------------------------------

//创建评论
type CreateCommentReq struct {
	//项目ID
	ProjectID int64
	//评论内容
	Content string
}
type CreateCommentRes struct {
	IsFailed bool
}

func (c *CommentService) CreateComment(r *http.Request, req *CreateCommentReq, res *CreateCommentRes) (err error) {
	var tokenUser auth.TokenUser
	tokenUser, err = auth.ExtractTokenUser(r)
	if err != nil {
		res.IsFailed = true
		return err
	}
	comment := models.Comment{
		UserID:    tokenUser.ID,
		ProjectID: req.ProjectID,
		Content:   req.Content,
		LinkNum:   0,
	}

	tx := c.db.Begin()
	err = models.CreateComment(tx, comment)
	if err != nil {
		res.IsFailed = true
		return err
	}
	err = tx.Commit().Error
	if err != nil {
		res.IsFailed = true
		return err
	}
	res.IsFailed = false
	return err
}
