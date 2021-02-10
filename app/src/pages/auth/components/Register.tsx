import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  Row,
  Typography,
  Space,
} from 'antd';
import React, { useState } from 'react';
const { Title } = Typography;

const DEBUG = true;

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

const labelCol = 4;
const wrapperCol = 18;
const checkoutOffset = 4;

export default function Register(props: RegisterProps) {
  const [useID, setUseID] = useState(true);
  const [useName, setUseName] = useState(true);
  const [usePassword, setUsePassword] = useState(true);

  const onFieldsChange = (changedFields: any, allFields: any) => {
    DEBUG && console.log('onFieldsChange:', changedFields, allFields);
  };

  const onValuesChange = (changedValues: any, allValues: any) => {
    DEBUG && console.log('onValuesChange:', changedValues, allValues);
  };

  const onFinish = (values: UserInfo) => {
    DEBUG && console.log('onFinish:', values);
    props.onConfirm(values);
  };

  const onFinishFailed = (errorInfo: any) => {
    DEBUG && console.log('onFinishFailed:', errorInfo);
  };

  return (
    <>
      <Title level={3}>用户注册</Title>
      <br />
      <Form
        name="register"
        initialValues={{
          remember: true,
        }}
        onFieldsChange={onFieldsChange}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        onValuesChange={onValuesChange}
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Row>
            <Col span={labelCol} style={{ textAlign: 'right' }}>
              <span style={{ lineHeight: '31.6px' }}>手机号：</span>
            </Col>
            <Col span={wrapperCol}>
              <Form.Item
                name="PhoneNumber"
                initialValue={props.PhoneNumber}
                rules={[{}]}
              >
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
                initialValue=""
                rules={[
                  {
                    required: true,
                    message: '请填写姓名',
                    // TODO 姓名校验
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
              <Form.Item name="Nickname" initialValue="" rules={[{}]}>
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
          {useID ? (
            <>
              <Row>
                <Col span={labelCol} style={{ textAlign: 'right' }}>
                  <span style={{ color: 'red' }}>*</span>
                  <span style={{ lineHeight: '31.6px' }}>学号：</span>
                </Col>
                <Col span={wrapperCol}>
                  <Form.Item
                    name="ID"
                    initialValue=""
                    rules={[
                      {
                        required: true,
                        message: '请填写学号',
                        // TODO 学号校验
                      },
                    ]}
                  >
                    <Input placeholder="请输入" />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={labelCol} style={{ textAlign: 'right' }}>
                  <span style={{ lineHeight: '31.6px' }}>学院：</span>
                </Col>
                <Col span={wrapperCol}>
                  <Form.Item name="School" initialValue="" rules={[{}]}>
                    <Input disabled placeholder="计算机学院" />
                  </Form.Item>
                </Col>
              </Row>
            </>
          ) : null}

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
          {useName ? (
            <Row>
              <Col span={labelCol} style={{ textAlign: 'right' }}>
                <span style={{ color: 'red' }}>*</span>
                <span style={{ lineHeight: '31.6px' }}>用户名：</span>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item
                  name="Name"
                  initialValue=""
                  rules={[
                    {
                      required: true,
                      message: '请填写用户名',
                      // TODO 学号校验
                    },
                  ]}
                >
                  <Input placeholder="请输入" />
                </Form.Item>
              </Col>
            </Row>
          ) : null}

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
          {usePassword ? (
            <Row>
              <Col span={labelCol} style={{ textAlign: 'right' }}>
                <span style={{ color: 'red' }}>*</span>
                <span style={{ lineHeight: '31.6px' }}>密码：</span>
              </Col>
              <Col span={wrapperCol}>
                <Form.Item
                  name="Password"
                  initialValue=""
                  rules={[
                    {
                      required: true,
                      message: '请填写密码',
                      // TODO 学号校验
                    },
                  ]}
                >
                  <Input.Password placeholder="请输入" />
                </Form.Item>
              </Col>
            </Row>
          ) : null}

          <Row>
            <Col offset={checkoutOffset}>
              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    required: true,
                    message: '请阅读并同意《用户服务协议》',
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
