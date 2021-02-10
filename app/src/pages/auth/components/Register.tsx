import { Button, Checkbox, Col, Form, Input, Row, Typography } from 'antd';
import React, { useState } from 'react';
const { Title } = Typography;
interface RegisterProps {
  onConfirm: (values: any) => void;
  phoneNumber: string;
}
interface UserInfo {
  nickname: string;
  password: string;
  phoneNumber: string;
  school: string;
  studentNumber: string;
  userName: string;
  userID: string;
}

interface InputInfo {
  name: string;
  initialValue: string;
  label: string;
  required?: boolean;
  disabled?: boolean;
  rules?: [
    {
      required?: boolean;
      message?: string;
    },
  ];
  isPassword?: boolean;
}

const labelCol = 4;
const wrapperCol = 18;
const checkoutOffset = 4;

export default function Register(props: RegisterProps) {
  const [useStuInfo, setUseStuInfo] = useState(true);
  const [useUserID, setUseUserID] = useState(true);
  const [usePassword, setUsePassword] = useState(true);

  const basicInfo: InputInfo[] = [
    {
      name: 'phoneNumber',
      initialValue: props.phoneNumber,
      label: '手机号',
      disabled: true,
    },
    {
      name: 'userName',
      initialValue: '',
      label: '姓名',
      required: true,
      rules: [
        {
          required: true,
          message: '请填写姓名',
          // TODO 姓名校验
        },
      ],
    },
    {
      name: 'nickname',
      initialValue: '',
      label: '昵称',
      rules: [
        {
          // TODO 昵称校验
        },
      ],
    },
  ];

  const stuInfo: InputInfo[] = [
    {
      name: 'studentNumber',
      initialValue: '',
      label: '学号',
      required: true,
      rules: [
        {
          required: true,
          message: '请填写学号',
          // TODO 学号校验
        },
      ],
    },
    {
      name: 'school',
      initialValue: '',
      label: '学院',
      disabled: true,
    },
  ];

  const userID: InputInfo = {
    label: '用户名',
    required: true,
    name: 'userid',
    initialValue: '',
    rules: [
      {
        required: true,
        message: '请填写用户名',
        // TODO 用户名校验
      },
    ],
  };

  const password: InputInfo = {
    label: '密码',
    required: true,
    name: 'password',
    initialValue: '',
    rules: [
      {
        required: true,
        message: '请填写密码',
        // TODO 密码校验
      },
    ],
    isPassword: true,
  };

  function onFieldsChange(changedFields: any, allFields: any) {
    console.log('onFieldsChange:', changedFields, allFields);
  }

  function onValuesChange(changedValues: any, allValues: any) {
    console.log('onValuesChange:', changedValues, allValues);
    setUseStuInfo(allValues.useStuInfo);
    setUseUserID(allValues.useUserID);
    setUsePassword(allValues.usePassword);
  }

  function onFinish(values: UserInfo) {
    console.log('onFinish:', values);
    props.onConfirm(values);
  }

  function onFinishFailed(errorInfo: any) {
    console.log('onFinishFailed:', errorInfo);
  }

  function renderInput(inputInfo: InputInfo) {
    return (
      <Row key={inputInfo.name}>
        <Col span={labelCol} style={{ textAlign: 'right' }}>
          {inputInfo.required ? <span style={{ color: 'red' }}>*</span> : null}
          <span style={{ lineHeight: '31.6px' }}>{inputInfo.label}：</span>
        </Col>
        <Col span={wrapperCol}>
          <Form.Item
            name={inputInfo.name}
            initialValue={inputInfo.initialValue}
            rules={inputInfo.rules}
          >
            {inputInfo.isPassword ? (
              <Input.Password disabled={inputInfo.disabled} />
            ) : (
              <Input disabled={inputInfo.disabled} />
            )}
          </Form.Item>
        </Col>
      </Row>
    );
  }

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
        {basicInfo.map((v) => renderInput(v))}

        <Row>
          <Col offset={checkoutOffset}>
            <Form.Item
              name="useStuInfo"
              valuePropName="checked"
              initialValue={useStuInfo}
            >
              <Checkbox>完善学生信息</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        {useStuInfo ? stuInfo.map((v) => renderInput(v)) : null}

        <Row>
          <Col offset={checkoutOffset}>
            <Form.Item
              name="useUserID"
              valuePropName="checked"
              initialValue={useUserID}
            >
              <Checkbox>设置用户名</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        {useUserID ? renderInput(userID) : null}

        <Row>
          <Col offset={checkoutOffset}>
            <Form.Item
              name="usePassword"
              valuePropName="checked"
              initialValue={usePassword}
            >
              <Checkbox>设置密码</Checkbox>
            </Form.Item>
          </Col>
        </Row>
        {usePassword ? renderInput(password) : null}

        <Row>
          <Col offset={checkoutOffset}>
            {' '}
            <Form.Item
              name="agreement"
              valuePropName="checked"
              rules={[
                {
                  required: true,
                  message: '请同意《用户服务协议》',
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
      </Form>
    </>
  );
}
