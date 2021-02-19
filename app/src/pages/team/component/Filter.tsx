import React from 'react';
import { Menu, Dropdown, Button, message, Space, Tooltip } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {Col, Row, Select} from "antd";
const { Option } = Select;

//比赛(如互联网+，挑战杯等)
function onChangeCompetition(value:string) {
}
function onBlurCompetition() {
}
function onFocusCompetition() {
}
//搜索
function onSearchCompetition(val:string) {

}
const optionCompetition:string[] = ["111", "222"]

//----------------------------------------------------------------------------------------

//比赛类别（如导师科研，学生自研等）
function onChangeType(value:string) {
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
}
function onBlurPosition() {
}
function onFocusPosition() {
}
//搜索
function onSearchPosition(val:string) {

}

//----------------------------------------------------------------------------------------

export default function (){
  let ColWidth = "auto"
  // @ts-ignore
  return (
    <Row style={{marginTop: "7px"}}>
      <Col flex={ColWidth}>
        <Select
          showSearch
          style={{ width: "95%" }}
          placeholder="按比赛/活动"
          optionFilterProp="children"
          onChange={onChangeCompetition}
          onFocus={onFocusCompetition}
          onBlur={onBlurCompetition}
          onSearch={onSearchCompetition}
          filterOption={(input, option:any) =>
            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
          }
        >
          {optionCompetition.map(value => (
            <Option value={value}>{value}</Option>)
          )}
        </Select>
      </Col>
      <Col flex={ColWidth}>
        <Select
          showSearch
          style={{ width: "95%" }}
          placeholder="按类别"
          optionFilterProp="children"
          onChange={onChangeType}
          onFocus={onFocusType}
          onBlur={onBlurType}
          onSearch={onSearchType}
          filterOption={(input, option:any) =>
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
          style={{ width: "95%" }}
          placeholder="按岗位"
          optionFilterProp="children"
          onChange={onChangePosition}
          onFocus={onFocusPosition}
          onBlur={onBlurPosition}
          onSearch={onSearchPosition}
          filterOption={(input, option:any) =>
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
