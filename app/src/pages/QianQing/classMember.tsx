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
interface memberList {
  name: string;
  stuNum: number;
}

const { Title } = Typography;

const data_class: classInformation = {
  classSymbol: 'https://sm.ms/image/LIFJubHziN23Pko',
  className: 2019211307,
  school: '计算机学院',
};

const data_stu: memberList[] = [
  { name: '李明', stuNum: 2020211000 },
  { name: '李明', stuNum: 2020211000 },
  { name: '李明', stuNum: 2020211000 },
  { name: '李明', stuNum: 2020211000 },
  { name: '李明', stuNum: 2020211000 },
  { name: '李明', stuNum: 2020211000 },
  { name: '李明', stuNum: 2020211000 },
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
            班级成员名单
          </Button>
          <Space size="large">
            <Button type="text">1</Button>
            <Button type="text">{data_stu[0].name}</Button>
            <Button type="text">{data_stu[0].stuNum} - 今</Button>
            <Button type="link">个人主页 →</Button>
          </Space>
          <Space size="large">
            <Button type="text">2</Button>
            <Button type="text">{data_stu[1].name}</Button>
            <Button type="text">{data_stu[1].stuNum} - 今</Button>
            <Button type="link">个人主页 →</Button>
          </Space>
          <Space size="large">
            <Button type="text">3</Button>
            <Button type="text">{data_stu[2].name}</Button>
            <Button type="text">{data_stu[2].stuNum} - 今</Button>
            <Button type="link">个人主页 →</Button>
          </Space>
          <Space size="large">
            <Button type="text">4</Button>
            <Button type="text">{data_stu[3].name}</Button>
            <Button type="text">{data_stu[3].stuNum} - 今</Button>
            <Button type="link">个人主页 →</Button>
          </Space>
          <Space size="large">
            <Button type="text">5</Button>
            <Button type="text">{data_stu[4].name}</Button>
            <Button type="text">{data_stu[4].stuNum} - 今</Button>
            <Button type="link">个人主页 →</Button>
          </Space>
          <Space size="large">
            <Button type="text">6</Button>
            <Button type="text">{data_stu[5].name}</Button>
            <Button type="text">{data_stu[5].stuNum} - 今</Button>
            <Button type="link">个人主页 →</Button>
          </Space>
          <Space size="large">
            <Button type="text">7</Button>
            <Button type="text">{data_stu[6].name}</Button>
            <Button type="text">{data_stu[6].stuNum} - 今</Button>
            <Button type="link">个人主页 →</Button>
          </Space>
        </div>
      </div>
    </div>
  );
}
