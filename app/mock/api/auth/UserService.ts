import {
  RegisterReq,
  RegisterRes,
  SMSCodeLoginReq,
  SMSCodeLoginRes,
  SMSSendCodeReq,
  SMSSendCodeRes,
  GetProfileRes,
} from '@/api-client/auth';
// @ts-ignore
import Mock from 'mockjs';

export default {
  SMSSendCode: (param: SMSSendCodeReq): SMSSendCodeRes =>
    Mock.mock({
      Session: /[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}/,
    }),

  SMSCodeLogin: (param: SMSCodeLoginReq): SMSCodeLoginRes =>
    Mock.mock({
      User: {
        RealName: '@cname',
      },
      Token: 'ABCDEFG',
    }),
  GetProfile: (param: {}): GetProfileRes =>
    Mock.mock({
      User: {
        PhoneNumber: /^86(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/,
        RealName: '@cname',
      },
    }),
  Register: (param: RegisterReq): RegisterRes =>
    Mock.mock({
      'Registered|1': true,
    }),
};
