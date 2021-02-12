interface SMSSendCodeReq {
  PhoneNumber: string;
}
interface SMSSendCodeRes {
  err?: { message: string; status: number };
  result?: { Session: string };
}
interface SMSCodeLoginReq {
  PhoneNumber: string;
  Code: string;
  Session: string;
}
interface SMSCodeLoginRes {
  err?: { message: string; status: number };
  result?: { TokenUser: TokenUser; Token: string };
}
interface TokenUser {
  ID?: number;
  ExpiresAt: number;
  IsStaff: boolean;
  IsSuper: boolean;
}

export default {
  SMSSendCode: (param: SMSSendCodeReq) => {
    let reply: SMSSendCodeRes = {
      result: {
        Session: 'cc5ed294-8a88-4ca7-81de-94e0329c85d0',
      },
    };
    return reply;
  },

  SMSCodeLogin: (param: SMSCodeLoginReq) => {
    let reply: SMSCodeLoginRes = {
      result: {
        TokenUser: {
          // ID: 100,
          ExpiresAt: 100,
          IsStaff: false,
          IsSuper: false,
        },
        Token: 'ABCDEFG',
      },
    };
    return reply;
  },
};
