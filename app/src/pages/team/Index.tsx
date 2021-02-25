//定义首屏为项目列表，供浏览正在招募中的项目
import React from 'react';
import Header from './component/Header';
import Filter from './component/Filter';

const CompetitionContext = React.createContext('');

export default function () {
  return (
    <div style={{ width: '95%', margin: 'auto', marginTop: '5px' }}>
      <Header />
      <Filter />
    </div>
  );
}
