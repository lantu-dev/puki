import React, { useState } from 'react';
import { Menu, Button } from 'antd';
import { Show } from './SanHuiLiangZhi/Show';
import { PingYi } from './SanHuiLiangZhi/PingYi';
import { Store } from './SanHuiLiangZhi/store';
import 'antd/dist/antd.css';

interface content {
  imgSrc: string;
  textMain: string;
  contentSrc: string;
}

interface contentProps {
  contents: content[];
}

const data: contentProps = {
  contents: [
    {
      imgSrc:
        'http://n.sinaimg.cn/sinacn10116/600/w1920h1080/20190326/adec-hutwezf6832324.jpg',
      textMain: '缩略图',
      contentSrc: 'https://www.baidu.com',
    },
    {
      imgSrc:
        'http://n.sinaimg.cn/sinacn10116/600/w1920h1080/20190326/adec-hutwezf6832324.jpg',
      textMain: '活动描述',
      contentSrc: 'https://www.baidu.com',
    },
    {
      imgSrc:
        'http://n.sinaimg.cn/sinacn10116/600/w1920h1080/20190326/adec-hutwezf6832324.jpg',
      textMain: '活动描述',
      contentSrc: 'https://www.baidu.com',
    },
    {
      imgSrc:
        'http://n.sinaimg.cn/sinacn10116/600/w1920h1080/20190326/adec-hutwezf6832324.jpg',
      textMain: '活动描述',
      contentSrc: 'https://www.baidu.com',
    },
  ],
};

function MainPage(props: any) {
  const [Item, setItem] = useState('Show');

  const componentSwitch = (key: any) => {
    switch (key) {
      case 'Show':
        return <Show {...data}></Show>;
      case 'PingYi':
        return <PingYi />;
      case 'store':
        return <Store />;
      default:
        break;
    }
  };

  return (
    <div>
      <Menu
        onClick={(e) => setItem(e.key.toString())}
        selectedKeys={[Item]}
        mode="horizontal"
      >
        <Menu.Item key="Show">
          <span>活动展示</span>
        </Menu.Item>
        <Menu.Item key="PingYi">
          <span>团员教育评议</span>
        </Menu.Item>
        <Menu.Item key="store">
          <span>团员年度团籍记录</span>
        </Menu.Item>
      </Menu>
      <div>{componentSwitch(Item)}</div>
    </div>
  );
}

export default function () {
  return <MainPage />;
}
