import {Space, Alert, Row, Button, Typography,Input,Select,Col} from 'antd';
import React from 'react';

const {Title,Paragraph } = Typography;
const {Option} = Select;

interface PhoneProps {
  onConfirm: (phoneNumber: string) => void;
}

let phoneProps : PhoneProps;

function phoneCheck(){
    let phoneInput = document.getElementById("PhoneInput");
    let suffixselect = document.getElementById("selectBefore");
    // @ts-ignore
    let phoneNumber = phoneInput.value;
    // @ts-ignore
    let suffix = suffixselect.value;
    if((/^1[3456789]\d{9}$/.test(phoneNumber))) {
      phoneProps.onConfirm(suffix + phoneNumber);
    }
}

export default function Phone(props: PhoneProps) {
  phoneProps = props;
  return (
    <div>
      <Space style = {{width:"100%"}} direction = {"vertical"} size = {[100,0]} >
        <Row >
          <Col offset = {1}>
            <Title level={3}>蓝图未来</Title>
          </Col>
        </Row>
        <Space style = {{width:"100%"}} direction = {'vertical'} size = {[10,0]}>
          <Row>
            <Col offset = {4}>
              <Paragraph>手机号：</Paragraph>
            </Col>
          </Row>
          <Row justify = {'center'}>
            <Col>
              <Input
                id = {"PhoneInput"}
                addonBefore={
                  <Select
                    defaultValue="+86"
                    id ="selectBefore">
                    <Option value="+86">+86</Option>
                  </Select>}
                defaultValue=""
                bordered = {true}/>
            </Col>
          </Row>
        </Space>
        <Row justify = {'center'}>
          <Col>
            <Button onClick={phoneCheck}>发送验证码</Button>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
