import auth from '@/backend/auth';
import { call, setToken } from '@/utils/client';
import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;

interface InputVerifyCodeProps {
  onBack: () => void;
  onLogged: (next: 'register' | 'redirect') => void;
  onResent: (session: string) => void;
  phoneNumber: string;
  session: string;
  tick: number;
}

export default function InputVerifyCode(props: InputVerifyCodeProps) {
  const onFinish = async ({ verifyCode }: any) => {
    console.log(props);
    const { User } = await call(auth.UserService.SMSCodeLogin, {
      PhoneNumber: props.phoneNumber,
      Session: props.session,
      Code: verifyCode,
    });

    if (User.RealName.length > 0) {
      props.onLogged('redirect');
    } else {
      props.onLogged('register');
    }
  };

  const onResend = async () => {
    const { Session } = await call(auth.UserService.SMSSendCode, {
      PhoneNumber: props.phoneNumber,
    });
    props.onResent(Session);
  };

  return (
    <>
      <Title level={3}>蓝图未来</Title>
      <Form onFinish={onFinish}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row justify="center">
            <Col span={20}>
              <Form.Item
                name="verifyCode"
                label="验证码"
                rules={[
                  {
                    message: '请输入验证码',
                    required: true,
                  },
                  {
                    message: '验证码必须为6位数字',
                    type: 'string',
                    len: 6,
                  },
                ]}
              >
                <Input
                  maxLength={6}
                  suffix={
                    <Button
                      type="link"
                      style={{ padding: '0' }}
                      disabled={!!props.tick}
                      onClick={onResend}
                    >
                      {props.tick ? `${props.tick}s` : '重新发送'}
                    </Button>
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" style={{ textAlign: 'center' }}>
            <Col span={8}>
              <Button size="large" onClick={props.onBack}>
                修改手机号
              </Button>
            </Col>
            <Col span={8}>
              <Button type="primary" size="large" htmlType="submit">
                下一步
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>
    </>
  );
}
