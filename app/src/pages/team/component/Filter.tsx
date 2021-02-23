import React from 'react';
import { Col, Row, Select } from 'antd';
import { call } from '@/api-client';

const { Option } = Select;

//比赛名称
interface GetCompetitionNameReq {}
interface GetCompetitionNameRes {
  CompetitionNames: string[];
}

//比赛类型
interface GetCompetitionTypeReq {}
interface GetCompetitionTypeRes {
  CompetitionTypes: string[];
}

//比赛(如互联网+，挑战杯等)
function onChangeCompetition(value: string) {
  console.log('onSearchCompetition' + value);
}
function onBlurCompetition() {}
function onFocusCompetition() {}
//搜索
function onSearchCompetition(val: string) {
  console.log(val);
}

//----------------------------------------------------------------------------------------

//比赛类别（如导师科研，学生自研等）
function onChangeCompetitionType(value: string) {
  console.log('onChangeType' + value);
}
function onBlurCompetitionType() {}
function onFocusCompetitionType() {}
//搜索
function onSearchCompetitionType(val: string) {
  console.log(val);
}

//----------------------------------------------------------------------------------------

//招募岗位
function onChangePosition(value: string) {
  console.log('onChangePosition' + value);
}
function onBlurPosition() {}
function onFocusPosition() {}
//搜索
function onSearchPosition(val: string) {
  console.log(val);
}

//----------------------------------------------------------------------------------------

interface FilterState {
  isCompetitionNamesFinished: boolean;
  competitionNames: string[];
  isCompetitionTypesFinished: boolean;
  competitionTypes: string[];
}

export default class Filter extends React.Component {
  state: FilterState = {
    isCompetitionNamesFinished: false,
    competitionNames: [],
    isCompetitionTypesFinished: false,
    competitionTypes: [],
  };
  render() {
    let ColWidth = 'auto';
    //比赛名称
    call<GetCompetitionNameReq, GetCompetitionNameRes>(
      'CompetitionService.GetCompetitionName',
      {},
    ).then((r) => {
      if (!this.state.isCompetitionNamesFinished) {
        this.setState({
          isCompetitionNamesFinished: true,
          competitionNames: r.CompetitionNames,
        });
      }
    });
    //比赛类别
    call<GetCompetitionTypeReq, GetCompetitionTypeRes>(
      'CompetitionService.GetCompetitionType',
      {},
    ).then((r) => {
      if (!this.state.isCompetitionTypesFinished) {
        this.setState({
          isCompetitionTypesFinished: true,
          competitionTypes: r.CompetitionTypes,
        });
      }
    });
    return (
      <Row style={{ marginTop: '7px' }}>
        {/*按比赛/活动筛选*/}
        <Col flex={ColWidth}>
          <Select
            showSearch
            style={{ width: '95%' }}
            placeholder="按比赛/活动"
            optionFilterProp="children"
            onChange={onChangeCompetition}
            onFocus={onFocusCompetition}
            onBlur={onBlurCompetition}
            onSearch={onSearchCompetition}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.competitionNames.map((value, index) => (
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
            onFocus={onFocusCompetitionType}
            onBlur={onBlurCompetitionType}
            onSearch={onSearchCompetitionType}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.competitionTypes.map((value, index) => (
              <Option key={index + 10000} value={value}>
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
            onChange={onChangePosition}
            onFocus={onFocusPosition}
            onBlur={onBlurPosition}
            onSearch={onSearchPosition}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
      </Row>
    );
  }
}
