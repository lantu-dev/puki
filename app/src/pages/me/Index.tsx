import { Avatar, Col, Row, Space, Badge, Drawer, Button } from 'antd';
import Item from './component/Item';
import { RightOutlined } from '@ant-design/icons';
import { useState } from 'react';

let SvgMale = (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="4924"
    width="16"
    height="16"
  >
    <path
      d="M926.56 120.8c-0.224-1.344-0.32-2.72-0.8-4.032l-0.032-0.032c-0.8-2.176-2.112-3.968-3.36-5.888-0.032-0.064-0.064-0.096-0.096-0.16-0.832-1.28-1.216-2.688-2.24-3.872-0.224-0.256-0.544-0.352-0.768-0.608-1.6-1.728-3.584-2.88-5.568-4.224 0-0.032-0.032-0.032-0.064-0.064-1.504-1.024-2.848-2.272-4.48-3.008h-0.032C905.088 97.12 900.672 96 896 96H672c-17.696 0-32 14.336-32 32s14.304 32 32 32h139.328L658.624 294.656C599.808 250.496 527.04 224 448 224 253.92 224 96 381.92 96 576s157.92 352 352 352 352-157.92 352-352c0-91.904-35.68-175.424-93.6-238.176L864 198.88V320c0 17.664 14.304 32 32 32s32-14.336 32-32V128c0-2.56-0.864-4.8-1.44-7.2zM736 576c0 158.816-129.184 288-288 288-158.784 0-288-129.184-288-288 0-158.784 129.216-288 288-288 158.816 0 288 129.216 288 288z"
      fill="#1296db"
      p-id="4925"
    ></path>
  </svg>
);

let SvgFemale = (
  <svg
    viewBox="0 0 1024 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="1169"
    width="16"
    height="16"
  >
    <path
      d="M832 384c0-176.73-143.27-320-320-320S192 207.27 192 384c0 165.92 126.3 302.32 288 318.39V768H352a32 32 0 0 0 0 64h128v96a32 32 0 0 0 64 0v-96h128a32 32 0 0 0 0-64H544v-65.6C705.7 686.33 832 549.93 832 384z m-576 0c0-141.16 114.84-256 256-256s256 114.85 256 256-114.82 256-256 256-256-114.85-256-256z"
      p-id="1170"
      fill="#d81e06"
    ></path>
  </svg>
);

let QRCode = (
  <svg
    viewBox="0 0 1041 1024"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    p-id="2216"
    width="20"
    height="20"
  >
    <path
      d="M948.906667 931.84h92.16V1024h-92.16zM948.906667 559.786667v184.32H853.333333v-184.32H576.853333V1024h92.16V651.946667h92.16v184.32h279.893334v-276.48z"
      p-id="2217"
      fill="#1296db"
    ></path>
    <path
      d="M761.173333 931.84H853.333333V1024h-92.16zM187.733333 187.733333h92.16v92.16H187.733333z"
      p-id="2218"
      fill="#1296db"
    ></path>
    <path
      d="M0 464.213333h464.213333V0H0v464.213333zM92.16 92.16h279.893333v279.893333H92.16V92.16zM187.733333 744.106667h92.16v92.16H187.733333z"
      p-id="2219"
      fill="#1296db"
    ></path>
    <path
      d="M0 1024h464.213333V559.786667H0V1024z m92.16-372.053333h279.893333v279.893333H92.16v-279.893333zM761.173333 187.733333H853.333333v92.16h-92.16z"
      p-id="2220"
      fill="#1296db"
    ></path>
    <path
      d="M1041.066667 0H576.853333v464.213333h464.213334V0z m-92.16 372.053333h-279.893334V92.16h279.893334v279.893333z"
      p-id="2221"
      fill="#1296db"
    ></path>
  </svg>
);

enum Gender {
  Male,
  Female,
}

export default function Me() {
  const [gender, setGender] = useState(Gender.Male);
  const [quiting, setQuiting] = useState(false);
  const [logined, setLogined] = useState(true);

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
          <Avatar size={64}></Avatar>
        </Col>
        <Col>
          <span style={{ fontSize: '1.5em', padding: '0.1em' }}>
            Future_000
          </span>
          {gender === Gender.Male ? SvgMale : SvgFemale}
        </Col>
        <Col style={{ marginLeft: 'auto', transform: 'translateY(0.3em)' }}>
          {QRCode}
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
          {logined ? (
            <>
              <Item label="姓名">宝蕴</Item>
              <Item label="学校">北京邮电大学</Item>
              <Item label="学院">计算机学院</Item>
              <Item label="学号">2019123456</Item>
            </>
          ) : (
            <>
              <Item label="学生身份">未认证</Item>
            </>
          )}
          <Item label="联系方式">12345678912</Item>
        </div>
        <Item label="我的活动">
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
        <Item label="设置" route="setting">
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
