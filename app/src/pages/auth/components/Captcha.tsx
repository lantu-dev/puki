import { Button } from 'antd';
import React from 'react';

interface CaptchaProps {
  onConfirm: (captcha: string) => void;
  goback: () => void;
}

export default function Captcha(props: CaptchaProps) {
  return (
    <>
      <div>填写验证码</div>
      <Button onClick={props.goback}>返回</Button>
      <Button
        onClick={() => {
          props.onConfirm('1234');
        }}
      >
        确认
      </Button>
    </>
  );
}
