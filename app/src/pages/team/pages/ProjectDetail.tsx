import React, { useState } from 'react';
import { Button, Row, Col, Image, Anchor, Avatar } from 'antd';
const { Link } = Anchor;
import { Typography, Progress } from 'antd';
import {
  ArrowLeftOutlined,
  FileTextOutlined,
  LikeOutlined,
  MessageOutlined,
  LikeFilled,
} from '@ant-design/icons';
import style from '../wwwroot/css/expand.css';

const { Title, Paragraph, Text } = Typography;
//来自ProjectCard的项目简略信息，这部分信息不需要再从数据库重新获取
interface ProjectDetailProps {
  location: {
    state: {
      ProjectID: number;
      ProjectName: string;
      ProjectDescribeSimple: string;
    };
  };
}

export default function ProjectDetail(props: ProjectDetailProps) {
  const [ellipsis1, setEllipsis1] = React.useState(true);
  const [ellipsis2, setEllipsis2] = React.useState(true);
  const [likeNum, setLikeNum] = React.useState(0);
  const [isLike, setIsLike] = React.useState(false);
  //基于ProjectDetailProps中的ProjectID，从数据库获取数据
  //1. 发起人相关信息，包括姓名、头像、专业、年级、获奖情况
  //2. 项目相关信息，包括项目图片、项目详细介绍
  //3. 招募情况
  //4. 评论条目
  return (
    <div style={{ marginLeft: '10px', marginRight: '10px', marginTop: '10px' }}>
      <Title level={3}>
        <div
          style={{ cursor: 'pointer' }}
          onClick={() => {
            history.back();
          }}
        >
          <ArrowLeftOutlined
            style={{ color: 'black', fontSize: '24px', marginRight: '10px' }}
          />
          {props.location.state.ProjectName}
        </div>
      </Title>
      <Row wrap={false}>
        <Col flex={'10px'}> </Col>
        <Col flex={'30%'}>
          <Image
            width={'100%'}
            src={`https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1870521716,857441283&fm=26&gp=0.jpg`}
          />
        </Col>
        <Col flex={'10px'}> </Col>
        <Col flex={'auto'}>
          <Paragraph
            style={{ fontSize: '16px' }}
            ellipsis={
              ellipsis1 ? { rows: 4, expandable: true, symbol: '展开' } : false
            }
          >
            {props.location.state.ProjectDescribeSimple}
          </Paragraph>
        </Col>
      </Row>
      <Row wrap={false}>
        <Col flex={'2%'}> </Col>
        <Col flex={'30%'} style={{ height: '60px' }}>
          <div style={{ marginTop: '10px' }}>
            <div>
              <Text>截止日期</Text>
            </div>
            <div>
              <Text>2020-11-12</Text>
            </div>
          </div>
        </Col>
        <Col flex={'2%'}> </Col>
        <Col flex={'22%'}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              let aim = document.getElementById('detail');
              if (aim != null) {
                window.scrollTo({
                  top: aim.offsetTop,
                  behavior: 'smooth',
                });
              }
            }}
          >
            <div
              style={{
                marginLeft: '10px',
                marginRight: '10px',
                width: '60px',
                height: '60px',
              }}
              className={style.Box}
            >
              <div style={{ textAlign: 'center', fontSize: '18px' }}>
                <FileTextOutlined />
              </div>
              <div style={{ textAlign: 'center' }}>详情</div>
            </div>
          </div>
        </Col>
        <Col flex={'22%'}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              if (isLike) {
                setLikeNum(likeNum - 1);
                setIsLike(false);
              } else {
                setLikeNum(likeNum + 1);
                setIsLike(true);
              }
            }}
          >
            <div
              style={{
                marginLeft: '10px',
                marginRight: '10px',
                width: '60px',
                height: '60px',
              }}
              className={style.Box}
            >
              <div style={{ textAlign: 'center', fontSize: '18px' }}>
                {isLike ? <LikeFilled /> : <LikeOutlined />}
              </div>
              <div style={{ textAlign: 'center' }}>很赞</div>
            </div>
          </div>
        </Col>
        <Col flex={'22%'}>
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              let aim = document.getElementById('comment');
              if (aim != null) {
                window.scrollTo({
                  top: aim.offsetTop,
                  behavior: 'smooth',
                });
              }
            }}
          >
            <div
              style={{
                marginLeft: '10px',
                marginRight: '10px',
                width: '60px',
                height: '60px',
              }}
              className={style.Box}
            >
              <div style={{ textAlign: 'center', fontSize: '18px' }}>
                <MessageOutlined />
              </div>
              <div style={{ textAlign: 'center' }}>评论</div>
            </div>
          </div>
        </Col>
      </Row>
      <div className={style.Box} style={{ marginTop: '15px' }}>
        <Row style={{ margin: '10px' }}>
          <Col flex={'60%'}>
            <Text>发起人</Text>
            <Row style={{ marginTop: '10px' }}>
              <Col flex={'50px'}>
                <Avatar style={{ marginTop: '5px' }} size={35}></Avatar>
              </Col>
              <Col flex={'auto'}>
                <Title level={5}>姓名</Title>
                <div style={{ marginTop: '-15px' }}>
                  <Text>xxxxxxxx</Text>
                </div>
              </Col>
            </Row>
          </Col>
          <Col flex={'40%'} style={{ marginTop: '10px' }}>
            <div>ccc奖</div>
            <div>ccc奖</div>
            <div>ccc奖</div>
          </Col>
        </Row>
      </div>
      <div className={style.Box} style={{ marginTop: '-1px' }}>
        <div style={{ margin: '10px' }}>
          <div>招募</div>
          <div style={{ marginTop: '10px' }}>
            <Row wrap={false}>
              <Col flex={'25%'}>
                <Text>前端开发</Text>
              </Col>
              <Col flex={'42%'}>
                <Progress percent={50} steps={3} showInfo={false} />
              </Col>
              <Col flex={'15%'}>录用：2</Col>
              <Col flex={'3%'}> </Col>
              <Col flex={'15%'}>投递：3</Col>
            </Row>
            <Paragraph
              style={{ fontSize: '16px' }}
              ellipsis={
                ellipsis1
                  ? { rows: 1, expandable: true, symbol: '展开' }
                  : false
              }
            >
              岗位需求:
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </Paragraph>
          </div>
          <div style={{ marginTop: '10px' }}>
            <Row wrap={false}>
              <Col flex={'25%'}>
                <Text>后端开发</Text>
              </Col>
              <Col flex={'42%'}>
                <Progress percent={25} steps={4} showInfo={false} />
              </Col>
              <Col flex={'15%'}>录用：1</Col>
              <Col flex={'3%'}> </Col>
              <Col flex={'15%'}>投递：4</Col>
            </Row>
            <Paragraph
              style={{ fontSize: '16px' }}
              ellipsis={
                ellipsis1
                  ? { rows: 1, expandable: true, symbol: '展开' }
                  : false
              }
            >
              岗位需求:
              xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
            </Paragraph>
          </div>
        </div>
      </div>
      <div id="detail" className={style.Box} style={{ marginTop: '-1px' }}>
        <div style={{ margin: '10px' }}>
          <div>详情</div>
          <div>
            adsdasdo joaisdasodj sahdsuoadh aisudhsad isjnd saiudh jsasknd
            biisahd saoudhsiu
          </div>
        </div>
      </div>
      <div id="comment" className={style.Box} style={{ marginTop: '-1px' }}>
        <div style={{ margin: '10px' }}>
          <div>评论</div>
          <div>
            <Row>
              <Col flex={'35px'}>
                <Avatar style={{ margin: '10px' }} size={35}></Avatar>
              </Col>
              <Col flex={'auto'}>
                <Title level={5}>xxx</Title>
                <div style={{ marginTop: '-10px' }}>asdsadadwds sdasd</div>
              </Col>
            </Row>
          </div>
        </div>
      </div>
      <div className={style.Box} style={{ marginTop: '-1px' }}>
        <Row style={{ margin: '10px' }}>
          <Col flex={'35px'}>
            <Button type={'default'}>分享</Button>
          </Col>
          <Col flex={'2%'}> </Col>
          <Col flex={'105px'}>
            <Button type={'default'}>联系发起人</Button>
          </Col>
          <Col flex={'auto'}> </Col>
          <Col flex={'20px'}>
            <Button type={'primary'}>报名</Button>
          </Col>
        </Row>
      </div>
      <div style={{ height: '20px' }}> </div>
    </div>
  );
}
