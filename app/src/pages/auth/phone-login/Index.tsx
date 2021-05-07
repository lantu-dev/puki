import React, { useEffect } from 'react';
import { useSetState } from 'react-use';
import { history } from 'umi';
import InputPhoneNumber from './components/InputPhoneNumber';
import InputVerifyCode from './components/InputVerifyCode';
import { call, hasLogged } from '@/utils/client';
import { Button, Col, Divider, Form, Input, Row, Select, Space } from 'antd';
import auth from '@/backend/auth';

enum Step {
  inputPhoneNumber,
  inputVerifyCode,
}

export default function Index() {
  const [state, setState] = useSetState({
    phoneNumber: '',
    session: '',
    step: Step.inputPhoneNumber,
    phoneNumberFinished: false,
    couldGetVerifyCode: false,
    verifyCode: '',
    prefix: '+86',
    tick: 0,
  });

  const onLogged = (next: 'redirect' | 'register') => {
    if (next === 'register') {
      history.push({
        pathname: '/auth/register',
      });
    } else {
      history.push({
        pathname: '/team',
      });
    }
  };

  if (hasLogged()) {
    onLogged('redirect');
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      if (state.tick > 0) {
        setState({ tick: state.tick - 1 });
      }
    }, 1000);
    return () => clearTimeout(timer);
  });

  // 获取验证码按钮
  const getVerifyCode = () => {
    setState({
      couldGetVerifyCode: !state.couldGetVerifyCode,
      tick: 60,
    });
    call(auth.UserService.SMSSendCode, {
      PhoneNumber: state.prefix + state.phoneNumber,
    }).then((r) => {
      setState({ session: r.Session });
    });
  };

  const login = ({ verifyCode }: any) => {
    console.log(verifyCode);
    setState({ verifyCode: verifyCode });
    call(auth.UserService.SMSCodeLogin, {
      PhoneNumber: state.prefix + state.phoneNumber,
      Session: state.session,
      Code: verifyCode,
    }).then((r) => {
      if (r.User.RealName.length > 0) {
        onLogged('redirect');
      } else {
        onLogged('register');
      }
    });
  };

  return (
    <div style={{ padding: '20px' }}>
      <div
        style={{
          fontSize: '24px',
          textAlign: 'center',
          marginTop: '150px',
          marginBottom: '100px',
        }}
      >
        手机验证码登录
      </div>
      <Form
        onChange={(v) => {
          console.log(v);
        }}
        onFinish={(v) => {
          setState({ verifyCode: v.verifyCode });
          console.log(v);
          login(v);
        }}
        initialValues={{ prefix: '+86' }}
      >
        <Space direction="vertical" size="large" style={{ width: '100%' }}>
          <Row justify="center" style={{ marginBottom: '-20px' }}>
            <Col span={20}>
              <Form.Item
                name="phoneNumber"
                validateFirst
                hasFeedback
                rules={[
                  {
                    message: '请输入手机号',
                    required: true,
                    validator: (_, value) =>
                      /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
                        value,
                      )
                        ? Promise.resolve().then(() => {
                            setState({
                              phoneNumberFinished: true,
                              phoneNumber: value,
                            });
                          })
                        : Promise.reject('手机号格式错误').then(() => {
                            setState({ phoneNumberFinished: false });
                          }),
                  },
                ]}
              >
                <Input
                  size="large"
                  placeholder={'请输入手机号'}
                  addonBefore={
                    <Form.Item name="prefix" noStyle>
                      <Select
                        style={{ width: 70 }}
                        onChange={(value: string) =>
                          setState({ prefix: value })
                        }
                      >
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
            <Col span={20}>
              <Form.Item
                name="verifyCode"
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
                  style={{ marginTop: '-50px' }}
                  maxLength={6}
                  placeholder={'请输入验证码'}
                  suffix={
                    state.couldGetVerifyCode ? (
                      <Button
                        type="link"
                        style={{ padding: '0' }}
                        disabled={!!state.tick}
                        onClick={getVerifyCode}
                      >
                        {state.tick ? `${state.tick}s` : '重新发送'}
                      </Button>
                    ) : (
                      <Button
                        type="link"
                        style={{ padding: '0' }}
                        disabled={!state.phoneNumberFinished}
                        onClick={getVerifyCode}
                      >
                        获取验证码
                      </Button>
                    )
                  }
                />
              </Form.Item>
            </Col>
          </Row>
          <Row
            justify="center"
            style={{ textAlign: 'center', marginTop: '20px' }}
          >
            <Col span={20}>
              <Button
                type="primary"
                block={true}
                size="large"
                htmlType="submit"
              >
                登录/注册
              </Button>
            </Col>
          </Row>
        </Space>
      </Form>
      <br />
      <br />
      <Divider plain>蓝图统一认证平台</Divider>
    </div>
  );
}
