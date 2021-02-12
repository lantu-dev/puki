import { Button, Col, Form, Input, Row, Space, Typography } from 'antd';
import React from 'react';
const { Title } = Typography;

interface CaptchaProps {
  onConfirm: (Captcha: string) => void;
  goback: () => void;
  reCaptcha: () => void;
  tick: number;
}

export default function Captcha(props: CaptchaProps) {
  return (
    <>
      <Title level={3}>蓝图未来</Title>
      <Form
        name="Captcha"
        onFinish={({ Captcha }) => {
          console.log(Captcha);
          props.onConfirm(Captcha);
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row justify="center">
            <Col span={20}>
              <Form.Item
                name="Captcha"
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
                      onClick={props.reCaptcha}
                    >
                      {props.tick || '重新发送'}
                    </Button>
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center" style={{ textAlign: 'center' }}>
            <Col span={8}>
              <Button size="large" onClick={props.goback}>
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
