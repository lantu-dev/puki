import { Button, Col, Row } from 'antd';
import { Link } from 'umi';
import { PubSub } from 'pubsub-ts';
import { useState } from 'react';

interface MyHeaderProps {
  nowPage: number;
}

export default function HomePageheader(props: MyHeaderProps) {
  console.log(props.nowPage);
  return (
    <>
      <Row style={{ backgroundColor: '#3B43F2', padding: '5px' }}>
        <Col flex={'10%'} />
        <Col flex={'auto'}>
          <img
            height={'50px'}
            src={
              'https://puki.obs.cn-north-4.myhuaweicloud.com/lantu_white.png'
            }
          />
        </Col>
        <Col flex={'90px'}>
          <div
            style={{
              paddingTop: '5px',
              color: 'white',
              fontSize: '16px',
            }}
          >
            <Button
              className="top-button"
              style={{
                fontWeight: props.nowPage === 1 ? 600 : 400,
              }}
            >
              <Link to="/">首页</Link>
            </Button>
          </div>
        </Col>
        <Col flex={'120px'}>
          <div
            style={{
              color: 'white',
              paddingTop: 5,
              fontSize: '16px',
            }}
          >
            <Button
              className="top-button"
              style={{
                fontWeight: props.nowPage === 2 ? 600 : 400,
              }}
            >
              功能模块
            </Button>
          </div>
        </Col>
        <Col flex={'120px'}>
          <div
            style={{
              color: 'white',
              paddingTop: '5px',
              fontSize: '16px',
            }}
          >
            <Button
              className="top-button"
              style={{
                fontWeight: props.nowPage === 3 ? 600 : 400,
              }}
            >
              <Link to="/Homepage/AboutUs">关于我们</Link>
            </Button>
          </div>
        </Col>
        <Col flex={'90px'}>
          <div
            style={{
              color: 'white',
              paddingTop: '5px',
              fontSize: '16px',
            }}
          >
            <Button
              className="top-button"
              style={{
                fontWeight: props.nowPage === 4 ? 600 : 400,
              }}
            >
              <Link to="/Homepage/pagelist">文章</Link>
            </Button>
          </div>
        </Col>
        {/*<Col flex={'100px'}>*/}
        {/*  <div*/}
        {/*    style={{*/}
        {/*      paddingTop: '12px',*/}
        {/*      fontSize: '16px',*/}
        {/*    }}*/}
        {/*  >*/}
        {/*    <div*/}
        {/*      style={{*/}
        {/*        backgroundColor: 'white',*/}
        {/*        textAlign: 'center',*/}
        {/*        margin: '-5px',*/}
        {/*        paddingTop: '3px',*/}
        {/*        borderRadius: '20px',*/}
        {/*        height: '35px',*/}
        {/*      }}*/}
        {/*    >*/}
        {/*      注册/登录*/}
        {/*    </div>*/}
        {/*  </div>*/}
        {/*</Col>*/}
        <Col flex={'10%'} />
      </Row>
    </>
  );
}
