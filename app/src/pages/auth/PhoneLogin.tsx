import { call } from '@/api-client/index';
import { Button, Divider } from 'antd';
import React, { useState } from 'react';
import { history } from 'umi';
import Captcha from './components/Captcha';
import Phone from './components/Phone';
import Register from './components/Register';

interface UserInfo {
  Nickname: string;
  Password: string;
  PhoneNumber: string;
  ID: string;
  RealName: string;
  Name: string;
}

interface SMSSendCodeReq {
  PhoneNumber: string;
}
interface SMSSendCodeRes {
  err: { message: string; status: number };
  result: { Session: string };
}
interface SMSCodeLoginReq {
  PhoneNumber: string;
  Code: string;
  Session: string;
}
interface SMSCodeLoginRes {
  err: { message: string; status: number };
  result: { TokenUser: TokenUser; Token: string };
}
interface TokenUser {
  ID: number;
  // Token 失效时间
  ExpiresAt: number;
  // 用户角色
  // Roles     []int64
  IsStaff: boolean;
  IsSuper: boolean;
}

enum STEP {
  phoneNumberInput,
  CaptchaInput,
  registerInput,
}

export default function PhoneLogin() {
  const [step, setStep] = useState(STEP.phoneNumberInput);
  const [PhoneNumber, setPhoneNumber] = useState('');
  const [Session, setSession] = useState('');

  async function phoneNumberConfirmed(PhoneNumber: string) {
    console.group('phoneNumberConfirmed');

    console.log('PhoneNumber: ', PhoneNumber);
    setPhoneNumber(PhoneNumber);

    try {
      let res = await call<SMSSendCodeReq, SMSSendCodeRes>(
        'auth/UserService.SMSSendCode',
        {
          PhoneNumber,
        },
      );
      console.log('res: ', res);
      setSession(res.result.Session);
      setStep(STEP.CaptchaInput);
    } catch (err) {
      console.log('err: ', err);
    }

    console.groupEnd();
  }

  async function CaptchaConfirmed(Captcha: string) {
    console.group('CaptchaConfirmed');

    console.log('Captcha: ', Captcha);

    try {
      let res = await call<SMSCodeLoginReq, SMSCodeLoginRes>(
        'auth/UserService.SMSCodeLogin',
        {
          PhoneNumber,
          Code: Captcha,
          Session,
        },
      );

      // TODO 等后端重构

      const { Token, TokenUser } = res.result;

      if (!TokenUser.ID) {
        setStep(STEP.registerInput);
      } else {
        history.replace('./topic');
      }
    } catch (err) {
      console.log('err: ', err);
    }

    console.groupEnd();
  }

  async function registerConfirmed(values: UserInfo) {
    console.group('registerConfirmed');

    // TODO 注册

    console.groupEnd();
  }

  return (
    <>
      {
        [
          <Phone onConfirm={phoneNumberConfirmed}></Phone>,
          <Captcha
            onConfirm={CaptchaConfirmed}
            goback={() => {
              setStep(STEP.phoneNumberInput);
            }}
          ></Captcha>,
          <Register
            onConfirm={registerConfirmed}
            PhoneNumber={PhoneNumber}
          ></Register>,
        ][step]
      }

      {/* 调试 */}
      <>
        <Divider></Divider>
        <Button
          onClick={() => {
            setStep(step > 0 ? step - 1 : step);
          }}
        >
          上一页
        </Button>
        <Button
          onClick={() => {
            setStep(step < 2 ? step + 1 : step);
          }}
        >
          下一页
        </Button>
      </>
    </>
  );
}
