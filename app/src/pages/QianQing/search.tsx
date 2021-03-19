import React, { useState } from 'react';
import { Card, Input, Tabs } from 'antd';
import {
  UpOutlined,
  DownOutlined,
  LineHeightOutlined,
} from '@ant-design/icons';

const { Search } = Input;
const { TabPane } = Tabs;

export default function search(props: any) {
  const [placeholder, setPlaceholder] = useState('请输入2020211xxx');
  const [tab, setTab] = useState('1');

  function callback(key: string) {
    setTab(key);
    switch (key) {
      case '1':
        setPlaceholder('请输入2020211xxx');
        break;
      case '2':
        setPlaceholder('输入思想成长');
        break;
      case '3':
        setPlaceholder('');
        break;
    }
  }

  return (
    <div>
      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="学号" key="1"></TabPane>
        <TabPane tab="标签" key="2"></TabPane>
        <TabPane tab="关键字" key="3"></TabPane>
      </Tabs>
      <Search placeholder={placeholder} enterButton style={{ width: 200 }} />
      {tab == '2' && (
        <div style={{ fontWeight: 600, position: 'absolute', margin: 10 }}>
          <div>思想成长 | 社会工作</div>
          <div>志愿公益 | 学术创新</div>
          <div>文化活动 | 实践学习</div>
        </div>
      )}
    </div>
  );
}
