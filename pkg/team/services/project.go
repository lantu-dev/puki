package models

import (
	"github.com/lantu-dev/puki/pkg/auth"
	models2 "github.com/lantu-dev/puki/pkg/auth/models"
	"github.com/lantu-dev/puki/pkg/base/rpc"
	"github.com/lantu-dev/puki/pkg/team/models"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"time"
)

type ProjectService struct {
	db *gorm.DB
}

//返回一个带有保存了数据的数据库实例的服务对象而所有值为默认值的服务实例; 由于RegisterService函数的参数需要是指针，所以本函数返回指针类型
func NewProjectService(db *gorm.DB) *ProjectService {
	return &ProjectService{
		db: db,
	}
}

//----------------------------------------------------------------------------------------------------------------------

//获取项目的简略信息，用于首屏中以卡片的形式展示
//信息包括：项目名称、项目介绍、岗位标签、(创建者头像、创建者姓名)、star数、评论数
//请求，包括比赛名称、比赛类别、岗位名称
type GetProjectSimpleReq struct {
	ProjectID uint
}
type ProjectSimple struct {
	ProjectID          uint
	CreateTime         time.Time
	UpdateTime         time.Time
	ProjectName        string
	ProjectDescription string
	StarNum            int64
	CommentNum         int64
	PositionNames      []string
	CompetitionNames   []string
	TypeName           string

	CreatorName   string
	CreatorSchool string
}

//响应，包括一个项目对象的数组
type GetProjectSimpleRes struct {
	IsFound       bool
	ProjectSimple ProjectSimple
}

type Position struct {
}

func (c *ProjectService) GetProjectSimple(ctx *rpc.Context, req *GetProjectSimpleReq, res *GetProjectSimpleRes) error {
	var project models.Project
	var typeNew models.Type
	var positions []models.Position

	tx := c.db.Begin()
	project = models.FindProjectByID(tx, req.ProjectID)
	typeNew = models.FindTypeByID(tx, project.TypeID)
	positions = models.FindPositionsByProjectID(tx, int64(project.ID))
	err := tx.Commit().Error
	if err != nil {
		res.IsFound = false
		return nil
	}

	var competitionNames []string
	for _, j := range project.Competitions {
		competitionNames = append(competitionNames, j.Name)
	}

	var positionNames []string
	for _, j := range positions {
		var positionTemplate models.PositionTemplate

		tx = c.db.Begin()
		positionTemplate = models.FindPositionTemplateByID(tx, j.PositionTemplateID)
		err = tx.Commit().Error
		if err != nil {
			log.Debug(err)
		}

		positionNames = append(positionNames, positionTemplate.Name)
	}

	tx = c.db.Begin()
	creator := models2.FindUserById(tx, project.CreatorID)
	err = tx.Commit().Error
	if err != nil {
		log.Debug(err)
	}

	tx = c.db.Begin()
	student, err := models2.FindOrCreateStudentFromUser(tx, creator)
	if err != nil {
		log.Debug(err)
	}

	projectSimple := ProjectSimple{
		ProjectID:          project.ID,
		CreateTime:         project.CreatedAt,
		UpdateTime:         project.UpdatedAt,
		ProjectName:        project.Name,
		ProjectDescription: project.DescribeSimple,
		StarNum:            project.StarNum,
		CommentNum:         project.CommentsNum,
		PositionNames:      positionNames,
		CompetitionNames:   competitionNames,
		TypeName:           typeNew.Name,
		CreatorName:        creator.RealName,
		CreatorSchool:      student.School,
	}
	res.ProjectSimple = projectSimple
	res.IsFound = true
	return nil
}

//----------------------------------------------------------------------------------------------------------------------

//添加项目
//请求包括：创建者ID，类别ID，
type AddProjectReq struct {
	TypeName         string
	Name             string
	DescribeSimple   string
	DescribeDetail   string
	LinkURL          string
	EndTime          time.Time
	CompetitionNames []string //传入比赛名称数组
	PositionNames    []string
}

type AddProjectRes struct {
	IsFailed  bool
	ProjectID uint
}

func (c *ProjectService) AddProject(ctx *rpc.Context, req *AddProjectReq, res *AddProjectRes) error {
	//获取创建者信息
	var tokenUser auth.TokenUser
	tokenUser, err := auth.ExtractTokenUser(ctx)
	if err != nil {
		return err
	}

	//根据比赛名称数组获取比赛数组
	var competitions []*models.Competition
	for _, item := range req.CompetitionNames {
		var competition models.Competition

		tx := c.db.Begin()
		competition = models.FindCompetitionByName(tx, item)
		err := tx.Commit().Error
		if err != nil {
			log.Debug(err)
		}

		competitions = append(competitions, &competition)
	}

	tx := c.db.Begin()
	typeID := models.FindTypeIDByName(tx, req.TypeName)
	user := models2.FindUserById(tx, tokenUser.ID)
	err = tx.Commit().Error
	if err != nil {
		log.Debug(err)
	}

	var members []*models2.User
	members = append(members, user)

	//创建Project实例
	project := models.Project{
		Model:          gorm.Model{},
		CreatorID:      tokenUser.ID,
		IsAvailable:    true,
		Competitions:   competitions,
		TypeID:         typeID,
		Name:           req.Name,
		DescribeSimple: req.DescribeSimple,
		DescribeDetail: req.DescribeDetail,
		LinkURL:        req.LinkURL,
		EndTime:        req.EndTime,
		Members:        members,
	}

	//根据岗位名称数组【生成】岗位数组，即根据positionTemplate生成position
	for _, item := range req.PositionNames {
		var positionTemplate models.PositionTemplate

		tx := c.db.Begin()
		//获取岗位模板
		positionTemplate = models.FindPositionTemplateByName(tx, item)
		//生成岗位
		position := models.Position{
			ProjectID:          int64(project.ID),
			PositionTemplateID: int64(positionTemplate.ID),
			Describe:           "",
			NowPeople:          0,
			NeedPeople:         0,
			InterestPeople:     0,
			Conversations:      nil,
		}
		err := tx.Commit().Error
		if err != nil {
			log.Debug(err)
		}

		//project中添加该岗位
		project.Positions = append(project.Positions, position)
	}

	tx = c.db.Begin()
	projectID, err := models.CreateProject(tx, project)
	if err != nil {
		log.Debug()
	}
	err = tx.Commit().Error

	res.ProjectID = projectID
	return err
}

//----------------------------------------------------------------------------------------------------------------------

//获取项目详情，请求项目ID，返回项目详情页所需各项信息
type GetProjectDetailReq struct {
	ProjectID int64
}
type Award struct {
	CompetitionID int64
	//比赛名称
	CompetitionName string
	//奖项名次， 如一等奖/二等奖/特等奖等，内容前端固定，仅可选择
	AwardRanking string
	//奖项证明链接
	ProveImgURL string
}
type PositionSimple struct {
	ID             uint
	Name           string
	NowPeople      int64
	NeedPeople     int64
	InterestPeople int64
	Describe       string
}
type CommentSimple struct {
	CreatorName string
	Content     string
}
type GetProjectDetailRes struct {
	//1.Project本身信息
	DescribeDetail string
	LinkURL        string
	EndTime        string
	ImgURL         string
	//2. 创建者相关信息
	CreatorName      string
	CreatorAvatarURI string
	CreatorSchool    string  //学院
	CreatorGrade     string  //年级
	CreatorAward     []Award //获奖情况
	//3. 招募相关信息
	Positions []PositionSimple //岗位
	//4. 评论相关信息
	Comments []CommentSimple //评论
	//5. 请求者与项目的关系
	IsMember bool
}

func (c *ProjectService) GetProjectDetail(ctx *rpc.Context, req *GetProjectDetailReq, res *GetProjectDetailRes) error {
	var project models.Project
	var positions []models.Position
	var comments []models.Comment
	var competitionProjects []models.CompetitionProject
	var creator models2.User
	var pCreatorStudent *models2.Student

	//获取创建者信息
	var tokenUser auth.TokenUser
	tokenUser, err := auth.ExtractTokenUser(ctx)
	if err != nil {
		return err
	}

	//查询是否已经是项目成员
	tx := c.db.Begin()
	res.IsMember = models.IsInProject(tx, tokenUser.ID, req.ProjectID)
	err = tx.Commit().Error
	if err != nil {
		log.Debug(err)
	}

	tx = c.db.Begin()
	project = models.FindProjectByID(tx, uint(req.ProjectID))
	//招募岗位，查找Position中ProjectID匹配的所有岗位对象
	positions = models.FindPositionsByProjectID(tx, int64(project.ID))
	//评论，查找Comment中ProjectID匹配的所有评论对象
	comments = models.FindCommentsByProjectID(tx, int64(project.ID))
	//根据项目中CreatorID查找用户，并获取用户相关信息
	creator = *models2.FindUserById(tx, project.CreatorID)
	pCreatorStudent, err = models2.FindOrCreateStudentFromUser(tx, &creator)
	//根据项目ID查找所有奖项【CompetitionProject】
	competitionProjects = models.FindCompetitionProjectByProjectID(tx, int64(project.ID))
	err = tx.Commit().Error
	if err != nil {
		log.Debug(err)
	}

	var awards []Award
	for _, item := range competitionProjects {
		tx := c.db.Begin()
		var competitionName = models.FindCompetitionByID(tx, item.CompetitionID).Name
		err = tx.Commit().Error
		if err != nil {
			log.Debug(err)
		}
		awards = append(awards, Award{
			CompetitionID:   item.CompetitionID,
			CompetitionName: competitionName,
			AwardRanking:    item.AwardRanking,
			ProveImgURL:     item.ProveImgURL,
		})
	}

	var positionSimples []PositionSimple
	for _, item := range positions {
		var positionTemplate models.PositionTemplate

		tx = c.db.Begin()
		positionTemplate = models.FindPositionTemplateByID(tx, item.PositionTemplateID)
		err = tx.Commit().Error
		if err != nil {
			log.Debug(err)
		}

		positionSimple := PositionSimple{
			ID:             item.ID,
			Name:           positionTemplate.Name,
			NowPeople:      item.NowPeople,
			NeedPeople:     item.NeedPeople,
			InterestPeople: item.InterestPeople,
			Describe:       item.Describe,
		}
		positionSimples = append(positionSimples, positionSimple)
	}

	var commentSimples []CommentSimple

	for _, item := range comments {
		commentSimple := CommentSimple{
			CreatorName: creator.RealName,
			Content:     item.Content,
		}
		commentSimples = append(commentSimples, commentSimple)
	}

	creatorStudent := *pCreatorStudent

	res.DescribeDetail = project.DescribeDetail
	res.LinkURL = project.LinkURL
	res.ImgURL = project.ImgURL
	res.EndTime = project.EndTime.Format("2006-01-02")
	res.CreatorName = creator.RealName
	res.CreatorAvatarURI = creator.AvatarURI
	res.CreatorSchool = creatorStudent.University
	res.CreatorGrade = creatorStudent.School
	res.CreatorAward = awards
	res.Positions = positionSimples
	res.Comments = commentSimples

	return err
}

//----------------------------------------------------------------------------------------------------------------------

//获取数据库中project的个数
type GetProjectNumReq struct{}
type GetProjectNumRes struct {
	ProjectNum int64
}

func (c *ProjectService) GetProjectNum(ctx *rpc.Context, req *GetProjectNumReq, res *GetProjectNumRes) error {
	tx := c.db.Begin()
	res.ProjectNum = models.GetProjectNum(tx)
	err := tx.Commit().Error
	if err != nil {
		log.Debug(err)
	}
	return err
}

//----------------------------------------------------------------------------------------------------------------------

//获取数据库中project的ID
type GetProjectIDReq struct{}
type GetProjectIDRes struct {
	ProjectID []int64
}

func (c *ProjectService) GetProjectID(ctx *rpc.Context, req *GetProjectIDReq, res *GetProjectIDRes) error {
	var projects []models.Project
	tx := c.db.Begin()
	projects = models.FindAllProjects(tx)
	err := tx.Commit().Error
	if err != nil {
		log.Debug(err)
	}
	for _, item := range projects {
		res.ProjectID = append(res.ProjectID, int64(item.ID))
	}
	return nil
}

//----------------------------------------------------------------------------------------------------------------------

//通过请求中项目ID数组获取项目简介数组
type GetProjectSimplesReq struct {
	ProjectID []int64
}

//响应，包括一个项目对象的数组
type GetProjectSimplesRes struct {
	IsFound        bool
	ProjectSimples []ProjectSimple
}

func (c *ProjectService) GetProjectSimples(ctx *rpc.Context,
	req *GetProjectSimplesReq, res *GetProjectSimplesRes) error {
	var projects []models.Project

	//通过ID数组查找所有项目
	tx := c.db.Begin()
	projects = models.FindProjectByIDs(tx, req.ProjectID)
	err := tx.Commit().Error
	if len(projects) == 0 || err != nil {
		res.IsFound = false
		return err
	}

	var competitionNames []string

	for _, project := range projects {
		if project.IsAvailable {
			for _, j := range project.Competitions {
				competitionNames = append(competitionNames, j.Name)
			}
			var typeNew models.Type
			var positions []models.Position

			tx = c.db.Begin()
			typeNew = models.FindTypeByID(tx, project.TypeID)
			positions = models.FindPositionsByProjectID(tx, int64(project.ID))
			err = tx.Commit().Error
			if err != nil {
				res.IsFound = false
				return err
			}

			var positionNames []string
			for _, j := range positions {
				var positionTemplate models.PositionTemplate

				tx = c.db.Begin()
				positionTemplate = models.FindPositionTemplateByID(tx, j.PositionTemplateID)
				err = tx.Commit().Error
				if err != nil {
					res.IsFound = false
					return err
				}

				positionNames = append(positionNames, positionTemplate.Name)
			}

			tx = c.db.Begin()
			creator := models2.FindUserById(tx, project.CreatorID)
			err = tx.Commit().Error
			if err != nil {
				log.Debug(err)
			}

			tx = c.db.Begin()
			student, err := models2.FindOrCreateStudentFromUser(tx, creator)
			if err != nil {
				log.Debug(err)
			}

			projectSimple := ProjectSimple{
				ProjectID:          project.ID,
				CreateTime:         project.CreatedAt,
				UpdateTime:         project.UpdatedAt,
				ProjectName:        project.Name,
				ProjectDescription: project.DescribeSimple,
				StarNum:            project.StarNum,
				CommentNum:         project.CommentsNum,
				PositionNames:      positionNames,
				CompetitionNames:   competitionNames,
				TypeName:           typeNew.Name,
				CreatorName:        creator.RealName,
				CreatorSchool:      student.School,
			}
			res.ProjectSimples = append(res.ProjectSimples, projectSimple)
		}
	}
	res.IsFound = true
	return nil
}

//编辑项目详情
type EditProjectDetailReq struct {
	ProjectID uint
	Content   string
}
type EditProjectDetailRes struct {
	IsFailed bool
}

func (c *ProjectService) EditProjectDetail(ctx *rpc.Context,
	req *EditProjectDetailReq, res *EditProjectDetailRes) (err error) {

	tx := c.db.Begin()
	err = models.UpdateProjectByID(tx, req.ProjectID, "DescribeDetail", req.Content)
	if err != nil {
		res.IsFailed = true
		return err
	}
	if err = tx.Commit().Error; err != nil {
		res.IsFailed = true
		return err
	}

	return err
}

//编辑获奖情况
type NewAward struct {
	CompetitionNames []string
	AwardRanks       []string
	AwardProves      []string
}
type EditAwardReq struct {
	ProjectID      uint
	CompetitionIDs []uint
	AwardRanks     []string
	AwardProves    []string
	NewAward       NewAward
}
type EditAwardRes struct {
	IsFailed bool
}

func (c *ProjectService) EditAward(ctx *rpc.Context,
	req *EditAwardReq, res *EditAwardRes) (err error) {

	for index, item := range req.CompetitionIDs {
		tx := c.db.Begin()
		err = models.UpdateAwardByProjectIDandCompetitionID(tx, int64(req.ProjectID), int64(item),
			req.AwardRanks[index], req.AwardProves[index])
		if err != nil {
			res.IsFailed = true
			return err
		}
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}
	}

	for index, item := range req.NewAward.CompetitionNames {
		tx := c.db.Begin()
		err = models.CreateAwardByProjectIDandCompetitionID(tx, int64(req.ProjectID), item,
			req.NewAward.AwardRanks[index], req.NewAward.AwardProves[index])
		if err != nil {
			res.IsFailed = true
			return err
		}
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}
	}
	return err
}

//获取自己所拥有的项目【用于项目管理中心】
/*需要：
- OwnProject[] 				拥有的项目
	- ProjectName			项目名称
	- OwnPosition[]			拥有的项目下的岗位
		- PositionMember[]	岗位下的已经录取的人员名单
			- MemberName	人员姓名
			- Tag[]			人员标签【来自于个人信息，如：“19届”， “男”， “大佬”】
		- PositionResume[]	岗位下收到的还未查阅的简历，在查看简历后，可选择录用或是拒绝
			- SenderName	简历投递者姓名
			- Content		简历内容
*/
type PositionResume struct {
	ResumeID   int64
	SenderName string
	Content    string
}
type Tag struct {
	Name string
}
type PositionMember struct {
	MemberName string
	Tags       []Tag
}
type OwnPosition struct {
	PositionName    string
	PositionMembers []PositionMember
	PositionResumes []PositionResume
}
type OwnProject struct {
	ProjectName  string
	ProjectID    int64
	IsAvailable  bool
	OwnPositions []OwnPosition
}
type GetOwnProjectsReq struct {
}
type GetOwnProjectsRes struct {
	OwnProjects []OwnProject
	IsFailed    bool
}

func (c *ProjectService) GetOwnProjects(ctx *rpc.Context,
	req *GetOwnProjectsReq, res *GetOwnProjectsRes) (err error) {
	//获取创建者信息
	var tokenUser auth.TokenUser
	tokenUser, err = auth.ExtractTokenUser(ctx)
	if err != nil {
		return err
	}

	//获取属于该用户的所有项目
	tx := c.db.Begin()
	projects := models.FindOwnProjects(tx, int64(tokenUser.ID))
	err = tx.Commit().Error
	if err != nil {
		res.IsFailed = true
		return err
	}

	var ownProjects []OwnProject
	for _, project := range projects {
		var ownProject OwnProject
		ownProject.ProjectName = project.Name
		ownProject.ProjectID = int64(project.ID)
		ownProject.IsAvailable = project.IsAvailable

		//获取该项目下的所有岗位
		tx := c.db.Begin()
		positions := models.FindPositionsByProjectID(tx, int64(project.ID))
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}

		var ownPositions []OwnPosition
		for _, position := range positions {
			var ownPosition OwnPosition

			//获取岗位名称
			tx := c.db.Begin()
			ownPosition.PositionName = models.FindPositionTemplateByID(tx, models.FindPositionByID(tx, int64(position.ID)).PositionTemplateID).Name
			err = tx.Commit().Error
			if err != nil {
				res.IsFailed = true
				return err
			}

			//获取所有属于该岗位的成员
			var positionMembers []PositionMember
			tx = c.db.Begin()
			users := models.FindMembersByPositionID(tx, int64(position.ID))
			err = tx.Commit().Error
			if err != nil {
				res.IsFailed = true
				return err
			}

			//获取岗位下所有已录取的人员信息
			for _, user := range users {
				var tags []Tag
				tx := c.db.Begin()
				student, err := models2.FindOrCreateStudentFromUser(tx, &user)
				if err != nil {
					res.IsFailed = true
					return err
				}
				tags = append(tags, Tag{Name: student.School})
				positionMember := PositionMember{
					MemberName: user.RealName,
					Tags:       tags,
				}
				positionMembers = append(positionMembers, positionMember)
			}
			ownPosition.PositionMembers = positionMembers

			//获取所有投递给该岗位的简历
			var positionResumes []PositionResume
			tx = c.db.Begin()
			resumes := models.FindResumesByPositionID(tx, int64(position.ID))
			err = tx.Commit().Error
			if err != nil {
				res.IsFailed = true
				return err
			}
			for _, resume := range resumes {
				tx = c.db.Begin()
				sender := models2.FindUserById(tx, resume.SenderID)
				err = tx.Commit().Error
				if err != nil {
					res.IsFailed = true
					return err
				}
				positionResume := PositionResume{
					ResumeID:   int64(resume.ID),
					SenderName: sender.RealName,
					Content:    resume.Content,
				}
				positionResumes = append(positionResumes, positionResume)
			}
			ownPosition.PositionResumes = positionResumes

			ownPositions = append(ownPositions, ownPosition)
		}

		ownProject.OwnPositions = ownPositions

		ownProjects = append(ownProjects, ownProject)
	}

	res.OwnProjects = ownProjects
	return err
}

//获取本人项目，用于管理

func (c *ProjectService) GetOwnProject() {

}

type SwitchProjectStateReq struct {
	ProjectID int64
}

type SwitchProjectStateRes struct {
	IsFailed bool
}

// SwitchProjectState 操作项目上线/下线
func (c *ProjectService) SwitchProjectState(ctx *rpc.Context,
	req *SwitchProjectStateReq, res *SwitchProjectStateRes) (err error) {

	//获取创建者信息
	var tokenUser auth.TokenUser
	tokenUser, err = auth.ExtractTokenUser(ctx)
	if err != nil {
		return err
	}

	tx := c.db.Begin()
	project := models.FindProjectByID(tx, uint(req.ProjectID))
	err = tx.Commit().Error
	if err != nil {
		res.IsFailed = true
		return err
	}

	if project.CreatorID != tokenUser.ID {
		res.IsFailed = true
		return err
	} else {
		tx := c.db.Begin()
		err = models.SwitchProjectState(tx, int64(project.ID))
		err = tx.Commit().Error
		if err != nil {
			res.IsFailed = true
			return err
		}
	}

	return err
}
