import { Button } from 'antd';
import React from 'react';

interface PhoneProps {
  onConfirm: (phoneNumber: string) => void;
}

export default function Phone(props: PhoneProps) {
  return (
    <>
      <div>填写手机号</div>
      <Button
        onClick={() => {
          props.onConfirm('+8612345678912');
        }}
      >
        确认
      </Button>
    </>
  );
}
