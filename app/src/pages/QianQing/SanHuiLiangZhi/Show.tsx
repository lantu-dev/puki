import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { Page, contentProps } from '../QingNianDaXueXi';
import { Link } from 'umi';
import 'antd/dist/antd.css';

export function Show(props: contentProps) {
  const [key, setKey] = useState('TuanYuan');

  return (
    <div>
      <div>
        <Menu
          onClick={() => {
            setKey(key);
          }}
          defaultSelectedKeys={['TuanYuan']}
          mode="horizontal"
        >
          <Menu.Item key="TuanYuan">
            <span>支部团员大会</span>
          </Menu.Item>
          <Menu.Item key="WeiYuan">
            <span>支部委员会</span>
          </Menu.Item>
          <Menu.Item key="XiaoZu">
            <span>团小组会</span>
          </Menu.Item>
          <Menu.Item key="TuanKe">
            <span>团课</span>
          </Menu.Item>
        </Menu>
      </div>
      <div>
        <Page {...props}></Page>
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          right: 20,
        }}
      >
        <Button style={{ background: 'green' }} href="" /*添加活动的跳转*/>
          添加新活动
        </Button>
      </div>
    </div>
  );
}
