import React from 'react';
import { Input, Button, Switch } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
// import Markdown from 'react-markdown'

export default function Login() {
  return (
    <>
      <div style={{ backgroundColor: '#3A62D7' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '182px',
          }}
        >
          <img src="https://i.loli.net/2021/02/27/lNTx5VL7RQjBXzr.png"></img>
          <Input
            size="large"
            style={{ width: 300 }}
            placeholder="用户名"
            prefix={<UserOutlined />}
          />
          <br />
          <br />
          <Input.Password
            size="large"
            style={{ width: 300 }}
            placeholder="密码"
            prefix={<LockOutlined />}
          />
          <br />
          <br />
          <Button type="primary" shape="round" size="large">
            登录
          </Button>
        </div>
        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginLeft: '560px',
            marginRight: '550px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
            }}
          >
            <div>
              <Switch defaultChecked />
            </div>
            <div
              style={{
                marginLeft: '15px',
                color: 'white',
              }}
            >
              <text>记住密码</text>
            </div>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <text>忘记密码</text>
          </div>
        </div>

        <br />
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginLeft: '530px',
            marginRight: '530px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <text>创建账号</text>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              alignItems: 'center',
              color: 'white',
            }}
          >
            <text>其他帮助</text>
          </div>
        </div>
      </div>
    </>
  );
}
