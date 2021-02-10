import { Button } from 'antd';
import {Space, Alert, Row, Button, Typography,Input,Select,Col} from 'antd';
import React from 'react';

const {Title,Paragraph } = Typography;
const {Option} = Select;
interface PhoneProps {
  onConfirm: (phoneNumber: string) => void;
}


// BUG  居中问题


export default function Phone(props: PhoneProps) {
  return (
    <>
      <div>填写手机号</div>
      <Button
        onClick={() => {
          props.onConfirm('8612345678912');
        }}
      >
        确认
      </Button>
    </>
    <div>
      <Space direction = {"vertical"} size = {[100,0]} >
        <Row >
          <Col offset = {1}>
            <Title level={3}>蓝图未来</Title>
          </Col>
        </Row>  
        <Space direction = {'vertical'} size = {[10,0]}>
          <Row>
            <Col offset = {1}>
              <Paragraph>手机号：</Paragraph>
            </Col> 
          </Row>  
          <Row justify = {'center'}>
            <Col>
              <Input 
                addonBefore={<Select defaultValue="86" className="select-before"><Option value="86">+86</Option></Select>} 
                defaultValue=""
                bordered = {true}/>
            </Col>
          </Row>
        </Space>
        <Row justify = {'center'}>
          <Col>
            <Button>发送验证码</Button> 
          </Col>
        </Row>  
      </Space>
    </div>
  );
}
