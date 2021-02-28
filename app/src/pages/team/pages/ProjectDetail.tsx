import React, { useEffect, useState } from 'react';
import { Link, history } from 'umi';
import { Button, Row, Col, Image, Anchor, Avatar } from 'antd';
import { Typography, Progress } from 'antd';
import {
  ArrowLeftOutlined,
  FileTextOutlined,
  LikeOutlined,
  MessageOutlined,
  LikeFilled,
} from '@ant-design/icons';
import style from '../../../assets/team/css/expand.css';
import { call, team } from '@/api-client';

const { Title, Paragraph, Text } = Typography;
//来自ProjectCard的项目简略信息，这部分信息不需要再从数据库重新获取
interface ProjectDetailProps {
  ProjectID: number;
  ProjectName: string;
  ProjectDescribeSimple: string;
}

export default function ProjectDetail(props: ProjectDetailProps) {
  const [ellipsis, setEllipsis1] = useState(true);
  const [likeNum, setLikeNum] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  //基于ProjectDetailProps中的ProjectID，从数据库获取数据
  const [DescribeDetail, setDescribeDetail] = useState('');
  const [LinkURL, setLinkURL] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [CreatorName, setCreatorName] = useState('');
  const [CreatorSchool, setCreatorSchool] = useState('');
  const [CreatorGrade, setCreatorGrade] = useState('');
  const [Awards, setAwards] = useState([{ Name: '' }]);
  const [Comments, setComments] = useState([{ CreatorName: '', Content: '' }]);
  const [Positions, setPositions] = useState([
    {
      Name: '',
      NowPeople: 0,
      NeedPeople: 0,
      InterestPeople: 0,
      Describe: '',
    },
  ]);

  useEffect(() => {
    call(team.ProjectService.GetProjectDetail, {
      ProjectID: props.ProjectID,
    }).then((r) => {
      setDescribeDetail(r.DescribeDetail);
      setLinkURL(r.LinkURL);
      setEndTime(r.EndTime);
      setCreatorName(r.CreatorName);
      setCreatorSchool(r.CreatorSchool);
      setCreatorGrade(r.CreatorGrade);
      setAwards(r.CreatorAward);
      setPositions(r.Positions);
      setComments(r.Comments);
    });
  }, [Comments]);

  return (
    <div style={{ marginRight: '10px', width: '95%' }}>
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
              ellipsis ? { rows: 4, expandable: true, symbol: '展开' } : false
            }
          >
            {props.ProjectDescribeSimple}
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
              <Text>{EndTime}</Text>
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
                <Title level={5}>{CreatorName}</Title>
                <div style={{ marginTop: '-10px' }}>
                  <Text>
                    {CreatorSchool} {CreatorGrade}
                  </Text>
                </div>
              </Col>
            </Row>
          </Col>
          <Col flex={'40%'} style={{ marginTop: '10px' }}>
            <Paragraph
              style={{ fontSize: '16px', color: 'gray' }}
              ellipsis={
                ellipsis ? { rows: 2, expandable: true, symbol: '展开' } : false
              }
            >
              {Awards.map((value, index) => (
                <div key={index}>
                  {value.Name}
                  <br />
                </div>
              ))}
            </Paragraph>
          </Col>
        </Row>
      </div>
      <div className={style.Box} style={{ marginTop: '-1px' }}>
        <div style={{ margin: '10px' }}>
          <div>招募</div>
          {Positions
            ? Positions.map((value, index) => (
                <div key={index} style={{ marginTop: '10px' }}>
                  <Row wrap={false}>
                    <Col flex={'25%'}>
                      <Text strong>{value.Name}</Text>
                    </Col>
                    <Col flex={'42%'}>
                      <Progress
                        percent={(value.NowPeople / value.NeedPeople) * 100}
                        steps={value.NeedPeople}
                        showInfo={false}
                      />
                    </Col>
                    <Col flex={'15%'}>录用：{value.NowPeople}</Col>
                    <Col flex={'3%'}> </Col>
                    <Col flex={'15%'}>投递：{value.InterestPeople}</Col>
                  </Row>
                  <Paragraph
                    style={{ fontSize: '16px', color: 'gray' }}
                    ellipsis={
                      ellipsis
                        ? { rows: 1, expandable: true, symbol: '展开' }
                        : false
                    }
                  >
                    岗位需求: {value.Describe}
                  </Paragraph>
                </div>
              ))
            : false}
        </div>
      </div>
      <div id="detail" className={style.Box} style={{ marginTop: '-1px' }}>
        <div style={{ margin: '10px' }}>
          <div>详情</div>
          <div>{DescribeDetail ? DescribeDetail : false}</div>
        </div>
      </div>
      <div id="comment" className={style.Box} style={{ marginTop: '-1px' }}>
        <div style={{ margin: '10px' }}>
          <div>评论</div>
          <div>
            {Comments
              ? Comments.map((value, index) => (
                  <Row key={index}>
                    <Col flex={'35px'}>
                      <Avatar style={{ margin: '10px' }} size={35}>
                        {' '}
                      </Avatar>
                    </Col>
                    <Col flex={'auto'}>
                      <Title level={5}>{value.CreatorName}</Title>
                      <div style={{ marginTop: '-10px' }}>{value.Content}</div>
                    </Col>
                  </Row>
                ))
              : false}
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
      <div style={{ height: '200px' }}> </div>
    </div>
  );
}
