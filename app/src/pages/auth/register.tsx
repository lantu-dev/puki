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
import { useAsync } from 'react-use';
import { auth, call } from '@/api-client';

const { Title } = Typography;

interface IForm {
  phoneNumber: string;
  realName: string;
  nickName: string;
  fillStudentInfo: boolean;
  studentId?: string;
  school?: string;
  fillUserName: boolean;
  userName?: string;
  fillPassword: boolean;
  password?: string;
  agreement: boolean;
}

const labelCol = 5;
const wrapperCol = 16;
const checkoutOffset = 5;

export default function Register() {
  const [form] = Form.useForm<IForm>();
  const phoneNumberState = useAsync(async () => {
    const { User } = await call(auth.UserService.WhoAmI, {});
    if (User.RealName && User.RealName.length > 0) {
      message.error({ content: '用户已完成注册' });
    }
    form.setFieldsValue({ phoneNumber: '+' + User.PhoneNumber });
    return User.PhoneNumber;
  });

  const onFinish = async (values: IForm) => {
    const { Registered } = await call(auth.UserService.Register, {
      RealName: values.realName,
      NickName: values.nickName || '',
      UserName: values.userName || '',
      Password: values.password || '',
      StudentID: values.studentId || '',
      School: values.school || '',
    });

    if (Registered) {
      message.success({ content: '注册成功！' });
    }
  };
  return (
    <>
      <Title level={3}>用户注册</Title>
      <br />
      <Form
        form={form}
        scrollToFirstError
        onFinish={onFinish}
        initialValues={{
          fillStudentInfo: true,
          fillPassword: true,
        }}
      >
        <Space direction="vertical" style={{ width: '100%', padding: '25px' }}>
          <Form.Item name="phoneNumber" label="手机号">
            <Input disabled />
          </Form.Item>

          <Form.Item
            name="RealName"
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
                message: '昵称长度在2-10位之间',
                type: 'string',
                min: 2,
                max: 10,
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
              form.getFieldValue('fillStudentInfo') == true && (
                <>
                  <Form.Item
                    shouldUpdate
                    label="学号"
                    name="studentId"
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
                            setFieldsValue({ school: '计算机学院' });
                            return Promise.resolve();
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
              form.getFieldValue('fillUserName') == true && (
                <Form.Item
                  shouldUpdate
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
              form.getFieldValue('fillPassword') == true && (
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
