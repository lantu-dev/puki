import { Button, Col, Form, Input, Row, Select, Space, Typography } from 'antd';
import React, { useState } from 'react';

const { Title } = Typography;
const { Option } = Select;

interface PhoneProps {
  onConfirm: (phoneNumber: string) => void;
}

export default function Phone(props: PhoneProps) {
  const [Suffix, setSuffix] = useState('+86');

  return (
    <>
      <Title level={3}>蓝图未来</Title>
      <Form
        name="Phone"
        onFinish={({ PhoneNumber }) => {
          props.onConfirm(Suffix + PhoneNumber);
        }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row justify="center">
            <Col span={20}>
              <Form.Item
                name="PhoneNumber"
                label="手机号"
                validateFirst
                hasFeedback
                rules={[
                  {
                    message: '请输入手机号',
                    required: true,
                  },
                  {
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
                    <Select value={Suffix} onChange={setSuffix}>
                      <Option value="+86">+86</Option>
                      <Option value="+87">+87</Option>
                    </Select>
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
