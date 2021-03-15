import { Endpoint } from '.';

interface User {
  ID: number;
  UserName: string;
  PhoneNumber: number;
  RealName: string;
  AvatarURI: string;
  NickName: string;
  Password: string;
  Gender: boolean | null;
  IsStaff: boolean;
  IsSuper: boolean;
  IsDisabled: boolean;
  UpdatedAt: string;
  CreatedAt: string;
}

interface Student {
  UserID: number;
  University: string;
  School: string;
  ClassID: string;
  UntrustedID: string;
  TrustedID: string;
  VerifyImageURL: string;
}

export interface SMSSendCodeReq {
  PhoneNumber: string;
}

export interface SMSSendCodeRes {
  Session: string;
}

export interface SMSCodeLoginReq {
  PhoneNumber: string;
  Code: string;
  Session: string;
}

export interface SMSCodeLoginRes {
  User: User;
}

export interface GetProfileRes {
  User: User;
  Student: Student;
}

type PatchProfileReq = {
  [key in keyof User]?: User[key];
} &
  {
    [key in keyof Student]?: Student[key];
  };
export interface PatchProfileRes {
  Completed: boolean;
}

//组队系统中查找用户，需要信息包括：头像、真实姓名、昵称、学院、获奖情况等
export interface AwardSimple {
  AwardRanking: string;
  ProveImgURL: string;
}
export interface FindUserInTeamReq {
  ProjectID: number;
}
export interface FindUserInTeamRes {
  AvatarURI: string;
  RealName: string;
  NickName: string;
  School: string; //通过Student
  AwardSimples: AwardSimple[];
}

export default {
  UserService: {
    SMSSendCode: 'auth/UserService.SMSSendCode' as Endpoint<
      SMSSendCodeReq,
      SMSSendCodeRes
    >,
    FindUserInTeam: 'auth/UserService.FindUserInTeam' as Endpoint<
      FindUserInTeamReq,
      FindUserInTeamRes
    >,
    SMSCodeLogin: 'auth/UserService.SMSCodeLogin' as Endpoint<
      SMSCodeLoginReq,
      SMSCodeLoginRes
    >,
    GetProfile: 'auth/UserService.GetProfile' as Endpoint<{}, GetProfileRes>,
    PatchProfile: 'auth/UserService.PatchProfile' as Endpoint<
      PatchProfileReq,
      PatchProfileRes
    >,
  },
};
