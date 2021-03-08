import React, { useState } from 'react';
import { Avatar, Typography, Button, Space } from 'antd';

//先绘制这个页面特殊的部分
//班级基本信息的模块
interface classInformation {
  classSymbol: string;
  className: number;
  school: string;
}

//班干部名单信息部分
//position:职务名称；dateBegin:担任职位时间
interface leaderList {
  position: string;
  name: string;
  dateBegin: string;
}

const { Title } = Typography;

const data_class: classInformation = {
  classSymbol: 'https://sm.ms/image/LIFJubHziN23Pko',
  className: 2019211307,
  school: '计算机学院',
};

const data_leader: leaderList[] = [
  { position: '团支书', name: '李明', dateBegin: '2020.9' },
  { position: '班长', name: '李明', dateBegin: '2020.9' },
  { position: '组织委员', name: '李明', dateBegin: '2020.9' },
  { position: '劳动委员', name: '李明', dateBegin: '2020.9' },
  { position: '生活委员（男）', name: '李明', dateBegin: '2020.9' },
  { position: '生活委员（女）', name: '李明', dateBegin: '2020.9' },
  { position: '文艺委员', name: '李明', dateBegin: '2020.9' },
  { position: '学习委员', name: '李明', dateBegin: '2020.9' },
  { position: '体育委员', name: '李明', dateBegin: '2020.9' },
];

export default function Page() {
  return (
    <div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            flexDirection: 'column',
          }}
        >
          <Avatar
            size={128}
            shape="circle"
            src={data_class.classSymbol}
            style={{
              marginRight: '30px',
            }}
          ></Avatar>
          <Title level={4}></Title>
          <Title level={4}>{data_class.className}</Title>
          <Title level={4}>{data_class.school}</Title>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            flexDirection: 'column',
          }}
        >
          <Button type="text" size="large">
            班干部名单
          </Button>
          <Space size="large">
            <Button type="text">{data_leader[0].position}</Button>
            <Button type="text">{data_leader[0].name}</Button>
            <Button type="text">{data_leader[0].dateBegin} - 今</Button>
            <Button type="link">修改</Button>
          </Space>
          <Space size="large">
            <Button type="text">{data_leader[1].position}</Button>
            <Button type="text">{data_leader[1].name}</Button>
            <Button type="text">{data_leader[1].dateBegin} - 今</Button>
            <Button type="link">修改</Button>
          </Space>
          <Space size="large">
            <Button type="text">{data_leader[2].position}</Button>
            <Button type="text">{data_leader[2].name}</Button>
            <Button type="text">{data_leader[2].dateBegin} - 今</Button>
            <Button type="link">修改</Button>
          </Space>
          <Space size="large">
            <Button type="text">{data_leader[3].position}</Button>
            <Button type="text">{data_leader[3].name}</Button>
            <Button type="text">{data_leader[3].dateBegin} - 今</Button>
            <Button type="link">修改</Button>
          </Space>
          <Space size="large">
            <Button type="text">{data_leader[4].position}</Button>
            <Button type="text">{data_leader[4].name}</Button>
            <Button type="text">{data_leader[4].dateBegin} - 今</Button>
            <Button type="link">修改</Button>
          </Space>
          <Space size="large">
            <Button type="text">{data_leader[5].position}</Button>
            <Button type="text">{data_leader[5].name}</Button>
            <Button type="text">{data_leader[5].dateBegin} - 今</Button>
            <Button type="link">修改</Button>
          </Space>
          <Space size="large">
            <Button type="text">{data_leader[6].position}</Button>
            <Button type="text">{data_leader[6].name}</Button>
            <Button type="text">{data_leader[6].dateBegin} - 今</Button>
            <Button type="link">修改</Button>
          </Space>
          <Space size="large">
            <Button type="text">{data_leader[7].position}</Button>
            <Button type="text">{data_leader[7].name}</Button>
            <Button type="text">{data_leader[7].dateBegin} - 今</Button>
            <Button type="link">修改</Button>
          </Space>
          <Space size="large">
            <Button type="text">{data_leader[8].position}</Button>
            <Button type="text">{data_leader[8].name}</Button>
            <Button type="text">{data_leader[8].dateBegin} - 今</Button>
            <Button type="link">修改</Button>
          </Space>
          <Title level={4}></Title>
        </div>
      </div>
    </div>
  );
}
