import auth from '@/backend/auth';
import { call } from '@/utils/client';
import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Row,
  Space,
  Typography,
} from 'antd';
import React from 'react';
import { useAsync, useSetState } from 'react-use';
import { history } from 'umi';

const { Title } = Typography;

interface IForm {
  phoneNumber: string;
  realName: string;
  nickName: string;
  fillStudentInfo: boolean;
  untrustedID?: string;
  school?: string;
  fillUserName: boolean;
  userName?: string;
  fillPassword: boolean;
  password?: string;
  agreement: boolean;
}

export default function Register() {
  const [state, setState] = useSetState({ registered: false });
  const [form] = Form.useForm<IForm>();

  const phoneNumberState = useAsync(async () => {
    const { User } = await call(auth.UserService.GetProfile, {});
    if (User.RealName && User.RealName.length > 0) {
      message.error({ content: '用户已完成注册' });
      setState({ registered: true });
    }
    form.setFieldsValue({ phoneNumber: '+' + User.PhoneNumber });
    return User.PhoneNumber;
  });

  const onFinish = async (values: IForm) => {
    const { Completed } = await call(auth.UserService.PatchProfile, {
      RealName: values.realName,
      NickName: values.nickName || '',
      UserName: values.userName || '',
      Password: values.password || '',
      UntrustedID: values.untrustedID || '',
      School: values.school || '',
    });

    if (Completed) {
      message.success({ content: '注册成功！' });

      history.goBack();
    }
  };

  return (
    <>
      <Title level={3}>用户注册</Title>
      <Form
        form={form}
        scrollToFirstError
        onFinish={onFinish}
        initialValues={{
          fillPassword: true,
          fillStudentInfo: true,
          fillUserName: true,
        }}
      >
        <Space direction="vertical" style={{ width: '100%', padding: '25px' }}>
          <Form.Item name="phoneNumber" label="手机号">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="realName"
            label="姓名"
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
                    : Promise.reject('请填写真实姓名(如有问题请联系管理员)'),
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item
            label="昵称"
            name="nickName"
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
                message: '昵称长度在2-8位之间',
                type: 'string',
                min: 2,
                max: 8,
              },
            ]}
          >
            <Input placeholder="请输入" />
          </Form.Item>

          <Form.Item name="fillStudentInfo" valuePropName="checked" noStyle>
            <Checkbox>完善学生信息</Checkbox>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(before, after) =>
              before.fillStudentInfo !== after.fillStudentInfo
            }
          >
            {() =>
              form.getFieldValue('fillStudentInfo') && (
                <>
                  <Form.Item
                    label="学号"
                    name="untrustedID"
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
                            let school = '计算机学院';
                            if (school) {
                              setFieldsValue({ school });
                              return Promise.resolve();
                            } else {
                              return Promise.reject('该学号不存在');
                            }
                          }
                          return Promise.reject('例: 2019123456');
                        },
                      }),
                    ]}
                  >
                    <Input placeholder="请输入" type="number" />
                  </Form.Item>

                  <Form.Item name="school" label="学院">
                    <Input disabled />
                  </Form.Item>
                </>
              )
            }
          </Form.Item>

          <Form.Item name="fillUserName" valuePropName="checked" noStyle>
            <Checkbox>设置用户名</Checkbox>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(before, after) =>
              before.fillUserName !== after.fillUserName
            }
          >
            {() =>
              form.getFieldValue('fillUserName') && (
                <Form.Item
                  name="userName"
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
                  <Input
                    hidden={!form.getFieldValue('fillUserName')}
                    placeholder="请输入"
                  />
                </Form.Item>
              )
            }
          </Form.Item>

          <Form.Item name="fillPassword" valuePropName="checked" noStyle>
            <Checkbox>设置密码</Checkbox>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(before, after) =>
              before.fillPassword !== after.fillPassword
            }
          >
            {() =>
              form.getFieldValue('fillPassword') && (
                <Form.Item
                  name="password"
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
              )
            }
          </Form.Item>

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

          <Row justify="center">
            <Col>
              <Form.Item>
                <Button
                  disabled={state.registered}
                  type="primary"
                  size="large"
                  htmlType="submit"
                >
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
