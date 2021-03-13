package services

import (
	"context"
	"github.com/lantu-dev/puki/pkg/auth"
	"github.com/lantu-dev/puki/pkg/auth/models"
	"github.com/lantu-dev/puki/pkg/base"
	"github.com/lantu-dev/puki/pkg/base/null"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	models2 "github.com/lantu-dev/puki/pkg/team/models"
	"gorm.io/gorm"
	"log"
	"strconv"
	"strings"
)

type UserService struct {
	db *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
	return &UserService{db: db}
}

type UserLoginReq struct {
	UserName string
	Password string
}

type UserLoginRes struct {
	Token string
}

// 用户名、密码组合登陆
func (s *UserService) Login(ctx context.Context, req *UserLoginReq, res *UserLoginRes) (err error) {

	return
}

type SMSSendCodeReq struct {
	PhoneNumber string `validate:"required,e164"` // like +86xxxxxx
}
type SMSSendCodeRes struct {
	Session string
}

// 手机号验证码登陆/发送验证码
func (s *UserService) SMSSendCode(ctx *rpc.Context, req *SMSSendCodeReq, res *SMSSendCodeRes) (err error) {
	if !strings.HasPrefix(req.PhoneNumber, "+86") {
		return base.UserErrorf(nil, "目前仅支持中国大陆地区(+86)手机号登陆")
	}
	phoneNumber, err := strconv.ParseInt(req.PhoneNumber[1:], 10, 64)
	if err != nil {
		log.Fatal(err)
	}
	res.Session, err = auth.SMSLogin.SendCode(context.TODO(), phoneNumber)
	return
}

type SMSCodeLoginReq struct {
	PhoneNumber string `validate:"required,e164"` // like +86xxxxxx
	Code        string `validate:"required,numeric,len=6"`
	Session     string `validate:"required"`
}
type SMSCodeLoginRes struct {
	TokenUser *auth.TokenUser
	User      *models.User
}

// 手机号验证码登陆
func (s *UserService) SMSCodeLogin(ctx *rpc.Context, req *SMSCodeLoginReq, res *SMSCodeLoginRes) (err error) {
	if !strings.HasPrefix(req.PhoneNumber, "+86") {
		return base.UserErrorf(nil, "目前仅支持中国大陆地区(+86)手机号登陆") // 用户造成的错误，前端会弹窗报错
	}
	phoneNumber, err := strconv.ParseInt(req.PhoneNumber[1:], 10, 64)
	if err != nil {
		log.Fatal(err) // 认为是不可能出现的错误
	}
	err = auth.SMSLogin.Verify(context.TODO(), req.Session, phoneNumber, req.Code)
	if err != nil {
		return err
	}

	tx := s.db.Begin() // 数据库事务，要求所有数据库操作都在数据库事务的包裹中操作

	user := models.FindOrCreateUserByPhoneNumber(tx, phoneNumber)
	res.TokenUser, err = auth.NewTokenUser(user)
	if err != nil {
		return err
	}

	ctx.Writer.Header().Set("x-set-authorization", res.TokenUser.Encode())
	res.User = user

	err = tx.Commit().Error // 数据库事务
	return
}

type GetProfileReq struct {
}
type GetProfileRes struct {
	User    models.User
	Student models.Student
}

func (s *UserService) GetProfile(ctx *rpc.Context, req *GetProfileReq, res *GetProfileRes) (err error) {
	tu, err := auth.ExtractTokenUser(ctx)
	if err != nil {
		return base.UserErrorf(nil, "请通过手机号登录账户")
	}

	tx := s.db.Begin()

	if !tu.IsAnon() {
		res.User = *tu.User(tx)
		tx.First(&res.Student, tu.ID)
	}

	err = tx.Commit().Error
	return
}

type PatchProfileReq struct {
	Gender      null.Bool
	NickName    string
	Password    string
	RealName    string
	University  string
	School      string
	UntrustedID string
	TrustedID   string
	UserName    string
}
type PatchProfileRes struct {
	Completed bool
}

func (s *UserService) PatchProfile(ctx *rpc.Context, req *PatchProfileReq, res *PatchProfileRes) error {
	// 检查用户登录
	tu, err := auth.ExtractTokenUser(ctx)
	if err != nil {
		// 用户请求头没有Token字段
		return base.UserErrorf(nil, "请登录/注册账户")
	}

	// 以后的游客权限
	if tu.IsAnon() {
		return base.UserErrorf(nil, "login required")
	}

	if err = s.db.Transaction(func(tx *gorm.DB) (err error) {
		user := tu.User(tx)
		stu, err := models.FindOrCreateStudentFromUser(tx, user)
		if err != nil {
			return err
		}

		// 如果请求修改性别
		if !req.Gender.Equal(null.NewBool(false, false)) {
			// 校验并设置性别
			if err = user.SetGender(req.Gender); err != nil {
				return err
			}
		}

		if req.NickName != "" {
			if err = user.SetNickName(req.NickName); err != nil {
				return err
			}
		}

		if req.Password != "" {
			if err = user.SetPassword(req.Password); err != nil {
				return err
			}
		}

		if req.RealName != "" {
			if err = user.SetRealName(req.RealName); err != nil {
				return err
			}
		}

		if req.University != "" {
			// TODO 校验学校
			stu.University = req.University
		}

		if req.School != "" {
			// TODO 校验学院
			stu.School = req.School
		}

		if req.UntrustedID != "" {
			// TODO 校验学号
			stu.UntrustedID = req.UntrustedID
		}

		if req.UserName != "" {
			if err = user.SetUserName(tx, req.UserName); err != nil {
				return err
			}
		}

		if err = tx.Save(stu).Error; err != nil {
			return err
		}
		if err = tx.Save(user).Error; err != nil {
			return err
		}

		res.Completed = true

		return nil
	}); err != nil {
		return err
	}

	return nil
}

//组队系统中查找用户，需要信息包括：头像、真实姓名、昵称、学院、获奖情况等
type AwardSimple struct {
	AwardRanking string
	ProveImgURL  string
}
type FindUserInTeamReq struct {
	ProjectID uint
}
type FindUserInTeamRes struct {
	AvatarURI    string
	RealName     string
	NickName     string
	School       string //通过Student
	AwardSimples []AwardSimple
}

func (s *UserService) FindUserInTeam(ctx *rpc.Context, req *FindUserInTeamReq, res *FindUserInTeamRes) (err error) {
	//1. 获取User信息
	var user *models.User
	var student *models.Student
	var competitionProjects []models2.CompetitionProject

	//获取创建者信息
	var tokenUser auth.TokenUser
	tokenUser, err = auth.ExtractTokenUser(ctx)
	if err != nil {
		return err
	}

	tx := s.db.Begin()
	user = models.FindUserById(tx, tokenUser.ID)
	//2. 获取Student信息
	student, err = models.FindOrCreateStudentFromUser(tx, user)
	if err != nil {
		return err
	}
	//3. 获取比赛获奖情况【目前逻辑是在项目详情页中，仅展示该项目的获奖情况】
	competitionProjects = models2.FindCompetitionProjectByProjectID(tx, int64(req.ProjectID))
	err = tx.Commit().Error
	if err != nil {
		return err
	}

	var awardSimples []AwardSimple
	for _, item := range competitionProjects {
		awardSimples = append(awardSimples, AwardSimple{
			AwardRanking: item.AwardRanking,
			ProveImgURL:  item.ProveImgURL,
		})
	}

	res.AvatarURI = user.AvatarURI
	res.AwardSimples = awardSimples
	res.NickName = user.NickName
	res.RealName = user.RealName
	res.School = student.School
	return
}
