import { Button } from 'antd';
import React from 'react';

interface RegisterProps {
  onConfirm: (captcha: string) => void;
}

export default function Register(props: RegisterProps) {
  return (
    <>
      <div>注册</div>
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
