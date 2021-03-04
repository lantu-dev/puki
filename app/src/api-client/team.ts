import {Endpoint} from '@/api-client/client';

//模型
export interface Position {
}

export interface Award {
}

//获取所有比赛名称
export interface GetCompetitionNamesReq {
}

interface GetCompetitionNamesRes {
  CompetitionNames: string[];
}

//获取所有比赛类型
export interface GetCompetitionTypesReq {
}

export interface GetCompetitionTypesRes {
  CompetitionTypes: string[];
}

//获取所有岗位名称
export interface GetPositionNamesReq {
}

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
  Name: string;
  NowPeople: number;
  NeedPeople: number;
  InterestPeople: number;
  Describe: string;
}

export interface AwardSimple {
  Name: string;
}

export interface Comment {
  CreatorName: string;
  Content: string;
}

export interface GetProjectDetailReq {
  ProjectID: number;
}

export interface GetProjectDetailRes {
  DescribeDetail: string;
  LinkURL: string;
  EndTime: string;
  CreatorName: string;
  CreatorSchool: string;
  CreatorGrade: string;
  CreatorAward: AwardSimple[];
  Positions: PositionSimple[];
  Comments: Comment[];
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
  PositionNames: string[]; //传入岗位名称输入
}

export interface AddProjectRes {
  IsFailed: boolean;
  ProjectID: number;
}

//获取所有岗位的名称
export interface GetPositionNamesReq {
}

export interface GetPositionNamesRes {
  PositionNames: string[];
}

//获取项目个数
export interface GetProjectNumReq {
}

export interface GetProjectNumRes {
  ProjectNum: number;
}

//获取项目ID
export interface GetProjectIDReq {
}

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

export default {
  CommentService: {},
  CompetitionService: {
    GetCompetitionNames: 'team/CompetitionService.GetCompetitionNames' as Endpoint<GetCompetitionNamesReq,
      GetCompetitionNamesRes>,
    GetCompetitionTypes: 'team/CompetitionService.GetCompetitionTypes' as Endpoint<GetCompetitionTypesReq,
      GetCompetitionTypesRes>,
  },
  ConversationService: {},
  FileService: {},
  PositionService: {
    GetPositionNames: 'team/PositionService.GetPositionNames' as Endpoint<GetPositionNamesReq,
      GetPositionNamesRes>,
  },
  ProjectService: {
    GetProjectSimple: 'team/ProjectService.GetProjectSimple' as Endpoint<GetProjectSimpleReq,
      GetProjectSimpleRes>,
    GetProjectSimples: 'team/ProjectService.GetProjectSimples' as Endpoint<GetProjectSimplesReq,
      GetProjectSimplesRes>,
    AddProject: 'team/ProjectService.AddProject' as Endpoint<AddProjectReq,
      AddProjectRes>,
    GetProjectDetail: 'team/ProjectService.GetProjectDetail' as Endpoint<GetProjectDetailReq,
      GetProjectDetailRes>,
    GetProjectNum: 'team/ProjectService.GetProjectNum' as Endpoint<GetProjectNumReq,
      GetProjectNumRes>,
    GetProjectID: 'team/ProjectService.GetProjectID' as Endpoint<GetProjectIDReq,
      GetProjectIDRes>,
  },
};
