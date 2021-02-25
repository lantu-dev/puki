import { Endpoint } from './client';

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
  User: { RealName: string };
}

export interface GetProfileRes {
  User: { PhoneNumber: string; RealName: string };
}

export interface RegisterReq {
  RealName: string;
  NickName: string;

  UserName: string;
  Password: string;

  StudentID: string;
  School: string;
}

export interface RegisterRes {
  Registered: boolean;
}

export const auth = {
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
    Register: 'auth/UserService.Register' as Endpoint<RegisterReq, RegisterRes>,
  },
};
