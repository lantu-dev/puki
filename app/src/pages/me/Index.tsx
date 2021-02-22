import SvgFemale from '@/assets/female.svg';
import Identification from '@/assets/identification.svg';
import SvgMale from '@/assets/male.svg';
import SvgQRCode from '@/assets/QRCode.svg';
import { RightOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Drawer, Row, Space } from 'antd';
import { useState } from 'react';
import { history } from 'umi';
import Item from './component/Item';

enum Gender {
  Male,
  Female,
}

export default function Me() {
  const [gender, setGender] = useState(Gender.Male);
  const [quiting, setQuiting] = useState(false);
  const [identified, setIdentified] = useState(false);
  // TODO WhoAmI 接口

  return (
    <>
      <Row
        align="middle"
        style={{
          padding: '2em 0.9375em 2em 2em',
          fontSize: '16px',
          borderTop: '1px solid #f5f5f5',
          borderBottom: '1px solid #f5f5f5',
        }}
        wrap={false}
      >
        <Col>
          <Row
            align="middle"
            onClick={() => {
              history.push('/me/account');
            }}
          >
            <Col>
              <Avatar size={64}></Avatar>
            </Col>
            <Col>
              <span style={{ fontSize: '1.5em', padding: '0.1em' }}>
                Future_000
              </span>
              {gender === Gender.Male ? (
                <img src={SvgMale} alt="male" />
              ) : (
                <img src={SvgFemale} alt="female" />
              )}
            </Col>
          </Row>
        </Col>
        <Col style={{ marginLeft: 'auto', transform: 'translateY(0.3em)' }}>
          <img src={SvgQRCode} alt="QRCode" />
        </Col>
        <Col>
          <RightOutlined
            style={{
              fontSize: '0.8em',
              color: '#bbb',
              transform: 'translateX(0.5em)',
            }}
          />
        </Col>
      </Row>
      <Space
        direction="vertical"
        size="middle"
        style={{ width: '100%', marginTop: '2em' }}
      >
        <div>
          {identified ? (
            <>
              <Item label="姓名">宝蕴</Item>
              <Item label="学校">北京邮电大学</Item>
              <Item label="学院">计算机学院</Item>
              <Item label="学号">2019123456</Item>
            </>
          ) : (
            <>
              <Item label="学生身份" route="/me/identify">
                <img src={Identification} alt="未认证" />
              </Item>
            </>
          )}
          <Item label="联系方式" route="/me/contact">
            12345678912
          </Item>
        </div>
        <Item label="我的活动" route="/me/activity">
          <span
            style={{
              backgroundColor: 'red',
              color: 'white',
              borderRadius: '1em',
              padding: '0.02em 0.5em 0.2em 0.5em',
              fontSize: '0.8em',
            }}
          >
            new
          </span>
        </Item>
        <Item label="设置" route="/me/setting">
          <Badge dot offset={[-5, 3]}></Badge>
        </Item>
      </Space>
      <div
        style={{
          padding: '2em',
        }}
      >
        <Button
          block
          size="large"
          type="primary"
          onClick={() => {
            setQuiting(true);
          }}
        >
          退出账户
        </Button>
      </div>
      <Drawer
        bodyStyle={{
          textAlign: 'center',
          padding: '0',
        }}
        closable={false}
        drawerStyle={{
          height: 'auto',
        }}
        onClose={() => {
          setQuiting(false);
        }}
        placement="bottom"
        title={
          <div
            style={{
              textAlign: 'center',
            }}
          >
            确定要退出当前帐号？
          </div>
        }
        footer={
          <div
            style={{
              color: '#0079FE',
              textAlign: 'center',
            }}
            onClick={() => {
              setQuiting(false);
            }}
          >
            取消
          </div>
        }
        visible={quiting}
      >
        <div
          style={{ color: 'red', padding: '1em' }}
          onClick={() => {
            setQuiting(false);
          }}
        >
          退出登录
        </div>
      </Drawer>
    </>
  );
}
