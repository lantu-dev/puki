import React from 'react';
import { Col, Row, Select } from 'antd';
import { call } from '@/api-client';
import ProjectGather from '@/pages/team/component/ProjectGather';
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

//岗位
interface GetPositionNamesReq {}
interface GetPositionNamesRes {
  PositionNames: string[];
}

//----------------------------------------------------------------------------------------

interface FilterState {
  isCompetitionNamesFinished: boolean;
  competitionNames: string[];
  isCompetitionTypesFinished: boolean;
  competitionTypes: string[];
  isPositionNamesFinished: false;
  positionNames: [];
  CompetitionName: string;
}

export default class Filter extends React.Component {
  state: FilterState = {
    isCompetitionNamesFinished: false,
    competitionNames: [],
    isCompetitionTypesFinished: false,
    competitionTypes: [],
    isPositionNamesFinished: false,
    positionNames: [],
    CompetitionName: '',
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
    //岗位
    call<GetPositionNamesReq, GetPositionNamesRes>(
      'PositionService.GetPositionNames',
      {},
    ).then((r) => {
      if (!this.state.isPositionNamesFinished) {
        this.setState({
          isPositionNamesFinished: true,
          positionNames: r.PositionNames,
        });
      }
    });
    let CompetitionName: string = '所有比赛/活动';
    let CompetitionType: string = '所有比赛/活动';
    let PositionName: string = '所有比赛/活动';
    let divs1 = (document.getElementsByClassName(
      '所有比赛/活动',
    ) as unknown) as NodeListOf<HTMLElement>;
    function onChangeCompetitionName(value: string) {
      CompetitionName = value;
      onChangeFilter();
    }
    function onChangeCompetitionType(value: string) {
      CompetitionType = value;
      onChangeFilter();
    }
    function onChangePositionName(value: string) {
      PositionName = value;
      onChangeFilter();
    }
    function onChangeFilter() {
      for (let i = 0; i < divs1.length; i++) {
        let classNames = divs1[i].className.split(' ');
        if (
          classNames.includes(CompetitionName) &&
          (classNames.includes(CompetitionType) ||
            CompetitionType === '所有类别') &&
          classNames.includes(PositionName)
        ) {
          divs1[i].style.display = 'block';
        } else {
          divs1[i].style.display = 'none';
        }
      }
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
              onChange={onChangePositionName}
              filterOption={(input, option: any) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.state.positionNames.map((value) => (
                <Option value={value}>{value}</Option>
              ))}
            </Select>
          </Col>
        </Row>
        <ProjectGather CompetitionName={this.state.CompetitionName} />
      </div>
    );
  }
}
