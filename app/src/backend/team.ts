import { Endpoint } from '.';

//模型
export interface Position {}
export interface Award {}

//获取所有比赛名称
export interface GetCompetitionNameReq {}
interface GetCompetitionNameRes {
  CompetitionNames: string[];
}

//获取所有比赛类型
export interface GetCompetitionTypeReq {}
export interface GetCompetitionTypeRes {
  CompetitionTypes: string[];
}

//获取所有岗位名称
export interface GetPositionNamesReq {}
export interface GetPositionNamesRes {
  PositionNames: string[];
}

//获取简略项目信息，包含了首屏中项目卡片所需的信息
export interface ProjectSimple {
  ProjectID: number;
  CreateTime: string;
  UpdateTime: string;
  ProjectName: string;
  ProjectDescription: string;
  StarNum: number;
  CommentNum: number;
  CompetitionNames: string[];
  TypeName: string;
  PositionNames: string[];

  CreatorName: string;
  CreatorSchool: string;
}
export interface GetProjectSimpleReq {
  ProjectID: number;
}
export interface GetProjectSimpleRes {
  IsFound: boolean;
  ProjectSimple: ProjectSimple;
}

//获取项目详细信息
export interface PositionSimple {
  ID: number;
  Name: string;
  NowPeople: number;
  NeedPeople: number;
  InterestPeople: number;
  Describe: string;
}
export interface AwardSimple {
  CompetitionID: number;
  //比赛名称
  CompetitionName: string;
  //奖项名次， 如一等奖/二等奖/特等奖等，内容前端固定，仅可选择
  AwardRanking: string;
  //奖项证明链接
  ProveImgURL: string;
}
export interface Comment {
  CreatorName: string;
  Content: string;
  AvatarURI: string;
}
export interface GetProjectDetailReq {
  ProjectID: number;
}
export interface GetProjectDetailRes {
  //1.Project本身信息
  DescribeDetail: string;
  LinkURL: string;
  ImgURL: string;
  EndTime: string;
  //2. 创建者相关信息
  CreatorName: string;
  CreatorAvatarURI: string;
  CreatorSchool: string; //学院
  CreatorGrade: string; //年级
  CreatorAward: AwardSimple[]; //获奖情况
  //3. 招募相关信息
  Positions: PositionSimple[]; //岗位
  //4. 评论相关信息
  Comments: Comment[]; //评论
  //5. 请求者与项目的关系
  IsMember: boolean;
}

//添加新的项目【创建项目】
export interface AddProjectReq {
  TypeName: string;
  Name: string;
  DescribeSimple: string;
  DescribeDetail: string;
  LinkURL: string;
  EndTime: string;
  CompetitionNames: string[]; //传入ID数组，在创建Project后依据ID创建一系列中间表
  PositionNames: string[];
}
export interface AddProjectRes {
  IsFailed: boolean;
  ProjectID: number;
}

//获取所有岗位的名称
export interface GetPositionNamesReq {}
export interface GetPositionNamesRes {
  PositionNames: string[];
}

//获取项目个数
export interface GetProjectNumReq {}
export interface GetProjectNumRes {
  ProjectNum: number;
}

//获取项目ID
export interface GetProjectIDReq {}
export interface GetProjectIDRes {
  ProjectID: number[];
}

//获取项目简介列表
export interface GetProjectSimplesReq {
  ProjectID: number[];
}
export interface GetProjectSimplesRes {
  IsFound: boolean;
  ProjectSimples: ProjectSimple[];
}

//创建评论
export interface CreateCommentReq {
  //项目ID
  ProjectID: number;
  //评论内容
  Content: string;
}
export interface CreateCommentRes {
  IsFailed: boolean;
}

//添加比赛
//返回的json中的信息仅需包含在首屏中展示的简略信息
//请求，包括比赛信息
export interface AddCompetitionReq {
  Name: string;
  Description: string;
}

//响应，返回一个字符串，说明成功或失败
export interface AddCompetitionRes {
  Result: string;
}

//仅获取比赛类型,用于首屏中filter中比赛类型列表的获取；
//请求
export interface GetCompetitionTypesReq {}

//添加比赛类型
//请求，包括比赛类型名称和介绍
export interface AddCompetitionTypeReq {
  Name: string;
  Description: string;
}

//响应，返回一个字符串，说明成功或失败
export interface AddCompetitionTypeRes {
  Result: string;
}

//响应
export interface GetCompetitionTypesRes {
  CompetitionTypes: string[];
}

//编辑项目岗位
export interface NewPosition {
  Names: string[];
  NeedNums: number[];
  Requirements: string[];
}
export interface EditPositionReq {
  ProjectID: number;
  PositionIDs: number[];
  PositionNames: string[];
  PositionNeedNums: number[];
  PositionRequirements: string[];
  NewPosition: NewPosition;
}
export interface EditPositionRes {
  IsFailed: boolean;
}

//编辑项目详情
export interface EditProjectDetailReq {
  ProjectID: number;
  Content: string;
}
export interface EditProjectDetailRes {
  IsFailed: boolean;
}

//编辑获奖情况
export interface NewAward {
  CompetitionNames: string[];
  AwardRanks: string[];
  AwardProves: string[];
}
export interface EditAwardReq {
  ProjectID: number;
  CompetitionIDs: number[];
  AwardRanks: string[];
  AwardProves: string[];
  NewAward: NewAward;
}
export interface EditAwardRes {
  IsFailed: boolean;
}

//获取简历信息，通过userID和projectID
export interface ResumeSimple {
  PositionID: number;
  PositionName: string;
  Content: string;
}
export interface GetResumesReq {
  ProjectID: number;
}
export interface GetResumesRes {
  IsFailed: boolean;
  ResumeSimples: ResumeSimple[];
}

//编辑简历
export interface NewResume {
  PositionNames: string[];
  Contents: string[];
}
export interface EditResumeReq {
  ProjectID: number;
  PositionIDs: number[];
  Contents: string[];
  NewResume: NewResume;
}
export interface EditResumeRes {
  IsFailed: boolean;
}

//仅获取比赛名称,用于首屏中filter中比赛列表的获取；
//请求
export interface GetCompetitionNamesReq {}
//响应
export interface GetCompetitionNamesRes {
  CompetitionNames: string[];
}

//创建岗位模板
export interface CreatePositionTemplateReq {
  Name: string;
  DefaultDescribe: string;
}
export interface CreatePositionTemplateRes {
  IsFailed: boolean;
}

// LookUpResumeReq
// 查阅简历，需要信息：ResumeID, IsAccepted
export interface LookUpResumeReq {
  ResumeID: number;
  IsEnrolled: boolean;
}
export interface LookUpResumeRes {
  IsFailed: boolean;
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
export interface PositionResume {
  ResumeID: number;
  SenderName: string;
  Content: string;
}
export interface Tag {
  Name: string;
}
export interface PositionMember {
  MemberName: string;
  Tags: Tag[];
}
export interface OwnPosition {
  PositionName: string;
  PositionMembers: PositionMember[];
  PositionResumes: PositionResume[];
}
export interface OwnProject {
  ProjectName: string;
  IsAvailable: boolean;
  ProjectID: number;
  OwnPositions: OwnPosition[];
}
export interface GetOwnProjectsReq {}
export interface GetOwnProjectsRes {
  OwnProjects: OwnProject[];
  IsFailed: boolean;
}

export interface SwitchProjectStateReq {
  ProjectID: number;
}

export interface SwitchProjectStateRes {
  IsFailed: boolean;
}

export interface UpdateProjectImgReq {
  ProjectID: number;
  ImgURL: string;
}
export interface UpdateProjectImgRes {
  IsFailed: boolean;
}

export default {
  CommentService: {
    CreateComment: 'team/CommentService.CreateComment' as Endpoint<
      CreateCommentReq,
      CreateCommentRes
    >,
  },
  CompetitionService: {
    GetCompetitionName: 'team/CompetitionService.GetCompetitionName' as Endpoint<
      GetCompetitionNameReq,
      GetCompetitionNameRes
    >,
    GetCompetitionNames: 'team/CompetitionService.GetCompetitionNames' as Endpoint<
      GetCompetitionNamesReq,
      GetCompetitionNamesRes
    >,
    GetCompetitionType: 'team/CompetitionService.GetCompetitionType' as Endpoint<
      GetCompetitionTypeReq,
      GetCompetitionTypeRes
    >,
    AddCompetition: 'team/CompetitionService.AddCompetition' as Endpoint<
      AddCompetitionReq,
      AddCompetitionRes
    >,
    AddCompetitionType: 'team/CompetitionService.AddCompetitionType' as Endpoint<
      AddCompetitionTypeReq,
      AddCompetitionTypeRes
    >,
    GetCompetitionTypes: 'team/CompetitionService.GetCompetitionTypes' as Endpoint<
      GetCompetitionTypesReq,
      GetCompetitionTypesRes
    >,
  },
  ConversationService: {},
  ResumeService: {
    GetResumes: 'team/ResumeService.GetResumes' as Endpoint<
      GetResumesReq,
      GetResumesRes
    >,
    EditResume: 'team/ResumeService.EditResume' as Endpoint<
      EditResumeReq,
      EditResumeRes
    >,
    LookUpResume: 'team/ResumeService.LookUpResume' as Endpoint<
      LookUpResumeReq,
      LookUpResumeRes
    >,
  },
  FileService: {},
  PositionService: {
    GetPositionNames: 'team/PositionService.GetPositionNames' as Endpoint<
      GetPositionNamesReq,
      GetPositionNamesRes
    >,
    EditPosition: 'team/PositionService.EditPosition' as Endpoint<
      EditPositionReq,
      EditPositionRes
    >,
    CreatePositionTemplate: 'team/PositionService.CreatePositionTemplate' as Endpoint<
      CreatePositionTemplateReq,
      CreatePositionTemplateRes
    >,
  },
  ProjectService: {
    GetProjectSimple: 'team/ProjectService.GetProjectSimple' as Endpoint<
      GetProjectSimpleReq,
      GetProjectSimpleRes
    >,
    EditAward: 'team/ProjectService.EditAward' as Endpoint<
      EditAwardReq,
      EditAwardRes
    >,
    GetOwnProjects: 'team/ProjectService.GetOwnProjects' as Endpoint<
      GetOwnProjectsReq,
      GetOwnProjectsRes
    >,
    SwitchProjectState: 'team/ProjectService.SwitchProjectState' as Endpoint<
      SwitchProjectStateReq,
      SwitchProjectStateRes
    >,
    EditProjectDetail: 'team/ProjectService.EditProjectDetail' as Endpoint<
      EditProjectDetailReq,
      EditProjectDetailRes
    >,
    GetProjectSimples: 'team/ProjectService.GetProjectSimples' as Endpoint<
      GetProjectSimplesReq,
      GetProjectSimplesRes
    >,
    AddProject: 'team/ProjectService.AddProject' as Endpoint<
      AddProjectReq,
      AddProjectRes
    >,
    GetProjectDetail: 'team/ProjectService.GetProjectDetail' as Endpoint<
      GetProjectDetailReq,
      GetProjectDetailRes
    >,
    GetProjectNum: 'team/ProjectService.GetProjectNum' as Endpoint<
      GetProjectNumReq,
      GetProjectNumRes
    >,
    GetProjectID: 'team/ProjectService.GetProjectID' as Endpoint<
      GetProjectIDReq,
      GetProjectIDRes
    >,
    UpdateProjectImg: 'team/ProjectService.UpdateProjectImg' as Endpoint<
      UpdateProjectImgReq,
      UpdateProjectImgRes
    >,
  },
};
