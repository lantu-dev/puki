import React, { useState } from 'react';
import { history } from 'umi';
import Captcha from './components/Captcha';
import Phone from './components/Phone';
import Register from './components/Register';

const DEBUG = true;

interface UserInfo {
  nickname: string;
  password: string;
  phoneNumber: string;
  school: string;
  studentNumber: string;
  userName: string;
  userID: string;
}

enum STEP {
  phoneNumberInput,
  captchaInput,
  registerInput,
}

export default function PhoneLogin() {
  const [step, setStep] = useState(STEP.phoneNumberInput);
  const [phoneNumber, setPhoneNumber] = useState('');

  function phoneNumberConfirmed(phoneNumber: string) {
    DEBUG && console.log(phoneNumber);

    setPhoneNumber(phoneNumber);
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

  function registerConfirmed(values: UserInfo) {
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
            return <Captcha onConfirm={captchaConfirmed}></Captcha>;
          case STEP.registerInput:
            return (
              <Register
                onConfirm={registerConfirmed}
                phoneNumber={phoneNumber}
              ></Register>
            );
        }
      })()}
    </>
  );
}
