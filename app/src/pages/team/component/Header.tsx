import {Avatar, Col, Image, Row, Space, Input} from "antd";
import logo from "@/pages/team/wwwroot/img/logo.png";
import React from "react";
import {Link} from "umi";
import {PlusCircleOutlined} from "@ant-design/icons";
import style from '../wwwroot/css/expand.css';
const { Search } = Input;


const onSearch = (value:string) => console.log(value);


export default function Header() {
  return (
    <Row align={"middle"}>
      <Col flex={"50px"}>
        <Link to={"team"}><img width={"50"} src={logo}/></Link>
      </Col>
      <Col flex={"auto"} >
        <div style={{width:"100%", textAlign:"center", }}>
          <Space direction={"vertical"} style={{ width:"98%"}} >
            <Search placeholder="请输入关键词查询"
                    onSearch={onSearch}
                    size={"large"}
                    style={{ width: "100%" }}
            />
          </Space>
        </div>
      </Col>
      <Col flex={"30px"} style={{textAlign:"right"}}>
        <Link to={"team"}><PlusCircleOutlined style={{fontSize:30, color:"black"}}/></Link>
      </Col>
    </Row>

  );
}
