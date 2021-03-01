import lantu from '@/assets/lantu.png';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Col, Image, Input, Row, Space, Switch } from 'antd';
import { Link } from 'umi';
import style from './Login.less';

export default function Login() {
  // TODO 登录

  return (
    <div className={style.login}>
      <Image preview={false} src={lantu}></Image>
      <Space direction="vertical" size="large" style={{ width: '100%' }}>
        <Input
          className={style.input}
          placeholder="用户名"
          prefix={<UserOutlined />}
        ></Input>
        <Input.Password
          className={style.input}
          placeholder="密码"
          prefix={<LockOutlined />}
          visibilityToggle={false}
        ></Input.Password>
        <Button block className={style.button} type="primary">
          登录
        </Button>
        <Row justify="space-between" style={{ fontSize: '0.8em' }}>
          <Col>
            <Space>
              <Switch></Switch>
              <span>记住密码</span>
            </Space>
          </Col>
          <Col>
            <Link to="/">忘记密码</Link>
          </Col>
        </Row>
        <Row justify="space-between">
          <Col>
            <Link to="/">创建账号</Link>
          </Col>
          <Col>
            <Link to="/">其他帮助</Link>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
