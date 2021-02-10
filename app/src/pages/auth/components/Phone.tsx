import {
  Space,
  Alert,
  Row,
  Button,
  Typography,
  Input,
  Select,
  Col,
} from 'antd';
import React from 'react';

const { Title, Paragraph } = Typography;
const { Option } = Select;

interface PhoneProps {
  onConfirm: (phoneNumber: string) => void;
}

export default function Phone(props: PhoneProps) {
  //获取选择的前缀
  let suffix: string = '+86';
  let handleSuffixChange = (value: string) => {
    suffix = value;
  };
  //Button onClick 属性
  let phoneCheck = () => {
    let phoneInput = document.getElementById('PhoneInput');
    // @ts-ignore
    let phoneNumber = phoneInput.value;
    if (/^1[3456789]\d{9}$/.test(phoneNumber)) {
      props.onConfirm(suffix + phoneNumber);
    }
  };

  return (
    <div>
      <Space style={{ width: '100%' }} direction={'vertical'} size={[100, 0]}>
        <Row>
          <Col offset={1}>
            <Title level={3}>蓝图未来</Title>
          </Col>
        </Row>
        <Space style={{ width: '100%' }} direction={'vertical'} size={[10, 0]}>
          <Row>
            <Col offset={4}>
              <Paragraph>手机号：</Paragraph>
            </Col>
          </Row>
          <Row justify={'center'}>
            <Col>
              <Input
                id={'PhoneInput'}
                addonBefore={
                  <Select defaultValue="+86" onChange={handleSuffixChange}>
                    <Option value={'+86'}>+86</Option>
                  </Select>
                }
                defaultValue=""
                bordered={true}
              />
            </Col>
          </Row>
        </Space>
        <Row justify={'center'}>
          <Col>
            <Button onClick={phoneCheck}>发送验证码</Button>
          </Col>
        </Row>
      </Space>
    </div>
  );
}
