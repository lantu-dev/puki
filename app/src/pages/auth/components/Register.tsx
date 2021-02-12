import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Space,
  Typography,
} from 'antd';
import React, { useState } from 'react';
const { Title } = Typography;

interface RegisterProps {
  onConfirm: (values: any) => void;
  PhoneNumber: string;
}
interface UserInfo {
  Nickname: string;
  Password: string;
  PhoneNumber: string;
  ID: string;
  RealName: string;
  Name: string;
}

const labelCol = 5;
const wrapperCol = 16;
const checkoutOffset = 5;

export default function Register(props: RegisterProps) {
  const [useID, setUseID] = useState(true);
  const [useName, setUseName] = useState(true);
  const [usePassword, setUsePassword] = useState(true);

  const onFieldsChange = (changedFields: any, allFields: any) => {
    console.log('onFieldsChange:', changedFields, allFields);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    console.log('onValuesChange:', changedValues, allValues);
  };

  const onFinish = (values: UserInfo) => {
    console.log('onFinish:', values);
    props.onConfirm(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('onFinishFailed:', errorInfo);
  };

  return (
    <>
      <Title level={3}>用户注册</Title>
      <br />
      <Form
        name="Register"
        scrollToFirstError
        initialValues={{
          PhoneNumber: props.PhoneNumber,
        }}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row>
            <Col span={labelCol} style={{ textAlign: 'right' }}>
              <span style={{ lineHeight: '31.6px' }}>手机号：</span>
            </Col>
            <Col span={wrapperCol}>
              <Form.Item name="PhoneNumber">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={labelCol} style={{ textAlign: 'right' }}>
              <span style={{ color: 'red' }}>*</span>
              <span style={{ lineHeight: '31.6px' }}>姓名：</span>
            </Col>
            <Col span={wrapperCol}>
              <Form.Item
                name="RealName"
                validateFirst
                hasFeedback
                rules={[
                  {
                    message: '请填写姓名',
                    required: true,
                  },
                  {
                    validator: (_, value) =>
                      /^[\u4E00-\u9FA5\·]+$/.test(value)
                        ? Promise.resolve()
                        : Promise.reject(
                            '请填写真实姓名(如有问题请联系管理员)',
                          ),
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={labelCol} style={{ textAlign: 'right' }}>
              <span style={{ lineHeight: '31.6px' }}>昵称：</span>
            </Col>
            <Col span={wrapperCol}>
              <Form.Item
                name="Nickname"
                validateFirst
                hasFeedback
                rules={[
                  {
                    validator: (_, value) =>
                      /^[0-9a-zA-Z\u4e00-\u9fa5]*$/.test(value)
                        ? Promise.resolve()
                        : Promise.reject('昵称仅支持中英文与数字'),
                  },
                  {
                    message: '昵称长度在2-10位之间',
                    type: 'string',
                    min: 2,
                    max: 10,
                  },
                ]}
              >
                <Input placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col offset={checkoutOffset}>
              <Checkbox
                defaultChecked={true}
                checked={useID}
                onChange={(e: any) => {
                  setUseID(e.target.checked);
                }}
              >
                完善学生信息
              </Checkbox>
            </Col>
          </Row>
          {useID && (
            <>
              <Row>
                <Col span={labelCol} style={{ textAlign: 'right' }}>
                  <span style={{ color: 'red' }}>*</span>
                  <span style={{ lineHeight: '31.6px' }}>学号：</span>
                </Col>
                <Col span={wrapperCol}>
                  <Form.Item
                    name="ID"
                    validateFirst
                    hasFeedback
                    rules={[
                      {
                        message: '请填写学号',
                        required: true,
                      },
                      ({ setFieldsValue }) => ({
                        validator(_, value) {
                          if (value.length === 10) {
                            // TODO 查找学院
                            setFieldsValue({ School: '计算机学院' });
                            return Promise.resolve();
                          }
                          return Promise.reject('例: 2019123456');
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="请输入" type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={labelCol} style={{ textAlign: 'right' }}>
                  <span style={{ lineHeight: '31.6px' }}>学院：</span>
                </Col>
                <Col span={wrapperCol}>
                  <Form.Item name="School">
                    <Input disabled />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}

          <Row>
            <Col offset={checkoutOffset}>
              <Checkbox
                defaultChecked={true}
                checked={useName}
                onChange={(e: any) => {
                  setUseName(e.target.checked);
                }}
              >
                设置用户名
              </Checkbox>
            </Col>
          </Row>
          {useName && (
            <Row>
              <Col span={labelCol} style={{ textAlign: 'right' }}>
                <span style={{ color: 'red' }}>*</span>
                <span style={{ lineHeight: '31.6px' }}>用户名：</span>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item
                  name="Name"
                  validateFirst
                  hasFeedback
                  rules={[
                    {
                      message: '请填写用户名',
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        /^[0-9a-zA-Z\u4e00-\u9fa5]*$/.test(value)
                          ? Promise.resolve()
                          : Promise.reject('用户名仅支持中英文与数字'),
                    },
                    {
                      message: '用户名长度在6-12位之间',
                      type: 'string',
                      min: 6,
                      max: 12,
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row>
            <Col offset={checkoutOffset}>
              <Checkbox
                defaultChecked={true}
                checked={usePassword}
                onChange={(e: any) => {
                  setUsePassword(e.target.checked);
                }}
              >
                设置密码
              </Checkbox>
            </Col>
          </Row>
          {usePassword && (
            <Row>
              <Col span={labelCol} style={{ textAlign: 'right' }}>
                <span style={{ color: 'red' }}>*</span>
                <span style={{ lineHeight: '31.6px' }}>密码：</span>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item
                  name="Password"
                  validateFirst
                  hasFeedback
                  rules={[
                    {
                      message: '请填写密码',
                      required: true,
                    },
                    {
                      validator: (_, value) =>
                        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[\s\S]*$/.test(value)
                          ? Promise.resolve()
                          : Promise.reject('密码必须包含大小写字母和数字'),
                    },
                    {
                      message: '密码长度在8-20位之间',
                      type: 'string',
                      min: 8,
                      max: 20,
                    },
                  ]}
                >
                  <Input.Password placeholder="请输入" />
                </Form.Item>
              </Col>
            </Row>
          )}

          <Row>
            <Col offset={checkoutOffset}>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    message: '请阅读并同意《用户服务协议》',
                    required: true,
                  },
                ]}
              >
                <Checkbox>同意《用户服务协议》</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Row justify="center">
            <Col>
              <Form.Item>
                <Button type="primary" size="large" htmlType="submit">
                  注册
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Space>
      </Form>
    </>
  );
}
