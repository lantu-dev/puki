import { Endpoint } from './client';

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
  Token: string;
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

export default {
  UserService: {
    SMSSendCode: 'auth/UserService.SMSSendCode' as Endpoint<
      SMSSendCodeReq,
      SMSSendCodeRes
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
