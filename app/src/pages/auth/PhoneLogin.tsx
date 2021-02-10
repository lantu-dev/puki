import React, { useState } from 'react';
import { history } from 'umi';
import Captcha from './components/Captcha';
import Phone from './components/Phone';
import Register from './components/Register';

const DEBUG = true;

interface UserInfo {
  Nickname: string;
  Password: string;
  PhoneNumber: string;
  ID: string;
  RealName: string;
  Name: string;
}

enum STEP {
  phoneNumberInput,
  captchaInput,
  registerInput,
}

export default function PhoneLogin() {
  const [step, setStep] = useState(STEP.phoneNumberInput);
  const [PhoneNumber, setPhoneNumber] = useState('');

  async function phoneNumberConfirmed(PhoneNumber: string) {
    DEBUG && console.log(PhoneNumber);

    setPhoneNumber(PhoneNumber);
    setStep(STEP.captchaInput);
  }

  async function captchaConfirmed(captcha: string) {
    DEBUG && console.log(captcha);

    // TODO 确认验证码, 验证手机号是否注册
    let valid = true;
    let registered = false;

    if (valid && registered) {
      history.replace('./topic');
    } else if (valid) {
      setStep(STEP.registerInput);
    } else {
      // TODO 验证码错误, 出现弹窗
    }
  }

  async function registerConfirmed(values: UserInfo) {
    DEBUG && console.log(values);
    history.replace('./topic');
  }

  return (
    <>
      {(() => {
        switch (step) {
          case STEP.phoneNumberInput:
            return <Phone onConfirm={phoneNumberConfirmed}></Phone>;
          case STEP.captchaInput:
            return (
              <Captcha
                onConfirm={captchaConfirmed}
                goback={() => {
                  setStep(STEP.phoneNumberInput);
                }}
              ></Captcha>
            );
          case STEP.registerInput:
            return (
              <Register
                onConfirm={registerConfirmed}
                PhoneNumber={PhoneNumber}
              ></Register>
            );
        }
      })()}
    </>
  );
}
