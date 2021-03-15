import auth from '@/backend/auth';
import { call } from '@/utils/client';
import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';

const { Title } = Typography;

interface PhoneProps {
  currentCodeSentPhoneNumber?: string;
  onNothingChanged: () => void;
  onVerifyCodeSent: (phoneNumber: string, session: string) => void;
}

export default function InputPhoneNumber(props: PhoneProps) {
  const onFinish = async (values: { prefix: string; phoneNumber: string }) => {
    const { prefix, phoneNumber } = values;
    const phoneNumberWithPrefix = prefix + phoneNumber;
    if (
      props.currentCodeSentPhoneNumber &&
      phoneNumberWithPrefix == props.currentCodeSentPhoneNumber
    ) {
      return props.onNothingChanged();
    }
    const { Session } = await call(auth.UserService.SMSSendCode, {
      PhoneNumber: phoneNumberWithPrefix,
    });
    props.onVerifyCodeSent(phoneNumberWithPrefix, Session);
  };

  return (
    <>
      <Title level={3}>注册或登录</Title>
      <Form onFinish={onFinish} initialValues={{ prefix: '+86' }}>
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row justify="center">
            <Col span={20}>
              <Form.Item
                name="phoneNumber"
                label="手机号"
                validateFirst
                hasFeedback
                rules={[
                  {
                    message: '请输入手机号',
                    required: true,
                    validator: (_, value) =>
                      /^(13[0-9]|14[5|7]|15[0|1|2|3|4|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(
                        value,
                      )
                        ? Promise.resolve()
                        : Promise.reject('手机号格式错误'),
                  },
                ]}
              >
                <Input
                  size="large"
                  addonBefore={
                    <Form.Item name="prefix" noStyle>
                      <Select style={{ width: 90 }}>
                        <Select.Option value="+86">+86</Select.Option>
                        <Select.Option value="+87">+87</Select.Option>
                      </Select>
                    </Form.Item>
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row justify="center">
            <Col>
              <Button type="primary" size="large" htmlType="submit">
                发送验证码
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>
    </>
  );
}
