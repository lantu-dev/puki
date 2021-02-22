//定义首屏为项目列表，供浏览正在招募中的项目
import React from 'react';
import Header from './component/Header';
import Filter from './component/Filter';
import ProjectCard from '@/pages/team/component/ProjectCard';

export default function () {
  return (
    <div style={{ width: '95%', margin: 'auto', marginTop: '5px' }}>
      <Header />
      <Filter />
      <ProjectCard />
    </div>
  );
}
