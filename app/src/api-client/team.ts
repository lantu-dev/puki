import { Endpoint } from '@/api-client/client';

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
  CreatorID: number;
  TypeID: number;
  Name: string;
  DescribeSimple: string;
  DescribeDetail: string;
  LinkURL: string;
  EndTime: string;
  CompetitionsID: number[]; //传入ID数组，在创建Project后依据ID创建一系列中间表
  Positions: Position[];
}
export interface AddProjectRes {}

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

export default {
  CommentService: {},
  CompetitionService: {
    GetCompetitionName: 'CompetitionService.GetCompetitionName' as Endpoint<
      GetCompetitionNameReq,
      GetCompetitionNameRes
    >,
    GetCompetitionType: 'CompetitionService.GetCompetitionType' as Endpoint<
      GetCompetitionTypeReq,
      GetCompetitionTypeRes
    >,
  },
  ConversationService: {},
  FileService: {},
  PositionService: {
    GetPositionNames: 'PositionService.GetPositionNames' as Endpoint<
      GetPositionNamesReq,
      GetPositionNamesRes
    >,
  },
  ProjectService: {
    GetProjectSimple: 'ProjectService.GetProjectSimple' as Endpoint<
      GetProjectSimpleReq,
      GetProjectSimpleRes
    >,
    GetProjectSimples: 'ProjectService.GetProjectSimples' as Endpoint<
      GetProjectSimplesReq,
      GetProjectSimplesRes
    >,
    AddProject: 'ProjectService.AddProject' as Endpoint<
      AddProjectReq,
      AddProjectRes
    >,
    GetProjectDetail: 'ProjectService.GetProjectDetail' as Endpoint<
      GetProjectDetailReq,
      GetProjectDetailRes
    >,
    GetProjectNum: 'ProjectService.GetProjectNum' as Endpoint<
      GetProjectNumReq,
      GetProjectNumRes
    >,
    GetProjectID: 'ProjectService.GetProjectID' as Endpoint<
      GetProjectIDReq,
      GetProjectIDRes
    >,
  },
};
