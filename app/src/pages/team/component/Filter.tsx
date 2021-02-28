import { call, team } from '@/api-client';
import { Col, Row, Select } from 'antd';
import React from 'react';
import { useAsync } from 'react-use';

interface FilterProps {
  onChangeFilter: (filter: (v: any) => boolean) => void;
}

export default function Filter(props: FilterProps) {
  const typeListState = useAsync(async () => {
    return {
      competitionNames: (
        await call(team.CompetitionService.GetCompetitionName, {})
      ).CompetitionNames,
      competitionTypes: (
        await call(team.CompetitionService.GetCompetitionType, {})
      ).CompetitionTypes,
      positionNames: (await call(team.PositionService.GetPositionNames, {}))
        .PositionNames,
    };
  });

  const {
    value: { competitionNames, competitionTypes, positionNames } = {
      competitionNames: [''],
      competitionTypes: [''],
      positionNames: [''],
    },
  } = typeListState;

  function onCompetitionNameChange(value: string) {
    console.log(value);
  }
  function onCompetitionTypeChange(value: string) {
    console.log(value);
  }
  function onPositionNameChange(value: string) {
    console.log(value);
  }

  return (
    <div>
      <Row justify="space-around" style={{ marginTop: '7px' }} wrap={false}>
        {/*按比赛/活动筛选*/}
        <Col span={7}>
          <Select
            style={{ width: '100%' }}
            dropdownMatchSelectWidth={false}
            defaultValue={'所有比赛/活动'}
            loading={typeListState.loading}
            onChange={onCompetitionNameChange}
            options={competitionNames.map((v) => ({
              label: v,
              value: v,
            }))}
            placeholder="按比赛"
          />
        </Col>
        {/*按比赛/活动类别筛选*/}
        <Col span={7}>
          <Select
            style={{ width: '100%' }}
            dropdownMatchSelectWidth={false}
            defaultValue={'所有类别'}
            loading={typeListState.loading}
            onChange={onCompetitionTypeChange}
            options={competitionTypes.map((v) => ({
              label: v,
              value: v,
            }))}
            placeholder="按类别"
          />
        </Col>
        {/*按岗位筛选*/}
        <Col span={7}>
          <Select
            style={{ width: '100%' }}
            dropdownMatchSelectWidth={false}
            defaultValue={'所有岗位'}
            loading={typeListState.loading}
            onChange={onPositionNameChange}
            options={positionNames.map((v) => ({
              label: v,
              value: v,
            }))}
            placeholder="按岗位"
          />
        </Col>
      </Row>
    </div>
  );
}
