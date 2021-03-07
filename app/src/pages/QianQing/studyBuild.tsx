import React, { useState } from 'react';
import { Avatar, Typography, Divider } from 'antd';

//先绘制这个页面特殊的部分
//班级基本信息的模块
interface classInformation {
  classSymbol: string;
  className: number;
  school: string;
  gradeRank: number;
  passPercent: number;
}

const { Title } = Typography;

const data: classInformation = {
  classSymbol: 'https://sm.ms/image/LIFJubHziN23Pko',
  className: 2019211307,
  school: '计算机学院',
  gradeRank: 7,
  passPercent: 0.95,
};

export default function Page() {
  const { classSymbol, className, school, gradeRank, passPercent } = data;
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
            src={classSymbol}
            style={{
              marginRight: '30px',
            }}
          ></Avatar>
          <Title level={4}></Title>
          <Title level={4}>{data.className}</Title>
          <Title level={4}>{data.school}</Title>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            flexDirection: 'column',
          }}
        >
          <Title></Title>
          <Title></Title>
          <Title level={4}>年级排名：{data.gradeRank}</Title>
          <Title level={4}>及格率：{data.passPercent}</Title>
        </div>
      </div>
    </div>
  );
}
