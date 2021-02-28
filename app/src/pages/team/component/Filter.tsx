import React, { useEffect, useState } from 'react';
import { Col, Row, Select } from 'antd';
import { call, team } from '@/api-client';
import ProjectGather from '@/pages/team/component/ProjectGather';
const { Option } = Select;

//----------------------------------------------------------------------------------------

interface FilterProps {
  competitionNames: string[];
  competitionTypes: string[];
  positionNames: string[];
}

export default function Filter(props: FilterProps) {
  let ColWidth = 'auto';

  let [competitionName, setCompetitionName] = useState('');
  let [competitionType, setCompetitionType] = useState('');
  let [positionName, setPositionName] = useState('');

  function onChangeCompetitionName(value: string) {
    setCompetitionName(value);
  }
  function onChangeCompetitionType(value: string) {
    setCompetitionType(value);
  }
  function onChangePositionName(value: string) {
    setPositionName(value);
  }

  return (
    <div>
      <Row style={{ marginTop: '7px' }}>
        {/*按比赛/活动筛选*/}
        <Col flex={ColWidth}>
          <Select
            showSearch
            style={{ width: '95%' }}
            placeholder="按比赛/活动"
            optionFilterProp="children"
            onChange={onChangeCompetitionName}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {props.competitionNames.map((value, index) => (
              <Option key={index} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Col>
        {/*按比赛/活动类别筛选*/}
        <Col flex={ColWidth}>
          <Select
            showSearch
            style={{ width: '95%' }}
            placeholder="按类别"
            optionFilterProp="children"
            onChange={onChangeCompetitionType}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {props.competitionTypes.map((value, index) => (
              <Option key={index} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Col>
        {/*按岗位筛选*/}
        <Col flex={ColWidth}>
          <Select
            showSearch
            style={{ width: '95%' }}
            placeholder="按岗位"
            optionFilterProp="children"
            onChange={onChangePositionName}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {props.positionNames.map((value, index) => (
              <Option key={index} value={value}>
                {value}
              </Option>
            ))}
          </Select>
        </Col>
      </Row>
      <ProjectGather
        competitionName={competitionName}
        competitionType={competitionType}
        positionName={positionName}
      />
    </div>
  );
}
