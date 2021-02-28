//定义首屏为项目列表，供浏览正在招募中的项目
import React, { useEffect, useState } from 'react';
import Header from './component/Header';
import Filter from './component/Filter';
import { call, team } from '@/api-client';
import { useAsync } from 'react-use';
import CreatePosition from '@/pages/team/component/CreatePosition';

const CompetitionContext = React.createContext('');

export default function () {
  //比赛名称
  let [competitionNames, setCompetitionNames] = useState(['']);
  //比赛类别
  let [competitionTypes, setCompetitionTypes] = useState(['']);
  //岗位
  let [positionNames, setPositionNames] = useState(['']);

  useEffect(() => {
    call(team.CompetitionService.GetCompetitionName, {})
      .then((r) => {
        setCompetitionNames(r.CompetitionNames);
      })
      .then((r) => {
        call(team.CompetitionService.GetCompetitionType, {}).then((r) => {
          setCompetitionTypes(r.CompetitionTypes);
        });
      })
      .then((r) => {
        call(team.PositionService.GetPositionNames, {}).then((r) => {
          setPositionNames(r.PositionNames);
        });
      });
  }, [
    competitionNames.length && competitionTypes.length && positionNames.length,
  ]);

  return (
    <div>
      <div style={{ width: '95%', margin: 'auto', marginTop: '5px' }}>
        <Header
          competitionNames={competitionNames}
          competitionTypes={competitionTypes}
          positionNames={positionNames}
        />
        <Filter
          competitionNames={competitionNames}
          competitionTypes={competitionTypes}
          positionNames={positionNames}
        />
      </div>
    </div>
  );
}
