import React from 'react';
import {Col, Row, Select} from "antd";
import {call} from "@/api-client";

const { Option } = Select;

//比赛名称
interface GetCompetitionNameReq {
}
interface GetCompetitionNameRes {
  result:{
    CompetitionNames:string[]
  }
}

//比赛类型
interface GetCompetitionTypeReq {
}
interface GetCompetitionTypeRes {
  result:{
    CompetitionNames:string[]
  }
}

//比赛(如互联网+，挑战杯等)
function onChangeCompetition(value:string) {
  console.log("onSearchCompetition"+value)
}
function onBlurCompetition() {
}
function onFocusCompetition() {
}
//搜索
function onSearchCompetition(val:string) {

}


//----------------------------------------------------------------------------------------

//比赛类别（如导师科研，学生自研等）
function onChangeType(value:string) {
  console.log("onChangeType"+value)
}
function onBlurType() {
}
function onFocusType() {
}
//搜索
function onSearchType(val:string) {

}

//----------------------------------------------------------------------------------------

//招募岗位
function onChangePosition(value:string) {
  console.log("onChangePosition"+value)
}
function onBlurPosition() {
}
function onFocusPosition() {
}
//搜索
function onSearchPosition(val:string) {

}


//----------------------------------------------------------------------------------------

interface FilterState{
  isFinished:boolean
  competitionNames:string[]
}

export default class Filter extends React.Component {
  state:FilterState = {isFinished:false, competitionNames:[]}
  render(){
    let ColWidth = "auto"
    call<GetCompetitionNameReq, GetCompetitionNameRes>
    ("CompetitionService.GetCompetitionName", {}).then(r => {
      if (!this.state.isFinished) {
        this.setState({
          isFinished: true,
          competitionNames: r.result.CompetitionNames
        })
      }
    })
    return (
      <Row style={{marginTop: "7px"}}>
        <Col flex={ColWidth}>
          <Select
            showSearch
            style={{width: "95%"}}
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
            {this.state.competitionNames.map(value => (
              <Option value={value}>{value}</Option>
            ))}
          </Select>
        </Col>
        <Col flex={ColWidth}>
          <Select
            showSearch
            style={{width: "95%"}}
            placeholder="按类别"
            optionFilterProp="children"
            onChange={onChangeType}
            onFocus={onFocusType}
            onBlur={onBlurType}
            onSearch={onSearchType}
            filterOption={(input, option: any) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="jack">Jack</Option>
            <Option value="lucy">Lucy</Option>
            <Option value="tom">Tom</Option>
          </Select>
        </Col>
        <Col flex={ColWidth}>
          <Select
            showSearch
            style={{width: "95%"}}
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

