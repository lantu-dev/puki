import React, { useState, Suspense, lazy } from 'react';
import { Col, Row, Typography, Tag } from 'antd';
import style from '@/assets/team/css/expand.css';
import { ArrowLeftOutlined, MoreOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Paragraph, Text } = Typography;

interface ProjectCardProps {
  ProjectID: number;
  ProjectName: string;
  ProjectDescribeSimple: string;
  PositionNames: string[];
}

//需要补充：点赞数、评论数

export default function ProjectCard(props: ProjectCardProps) {
  const Para = () => {
    const [ellipsis, setEllipsis] = React.useState(true);
    return (
      <>
        <Text strong>项目介绍：</Text>
        <Paragraph
          ellipsis={
            ellipsis ? { rows: 2, expandable: true, symbol: '查看更多' } : false
          }
        >
          {props.ProjectDescribeSimple}
        </Paragraph>
      </>
    );
  };
  const ProjectDetailPage = lazy(
    () => import('@/pages/team/pages/ProjectDetail'),
  );
  let [isHidden, setIsHidden] = useState(true);
  return (
    <div>
      <div
        hidden={isHidden}
        style={{
          backgroundColor: 'white',
          margin: '0px',
          height: '1000px',
          position: 'fixed',
          width: '100%',
          top: '0px',
          zIndex: 50,
          overflow: 'scroll',
          paddingTop: '10px',
        }}
      >
        <Title level={3}>
          <div style={{ cursor: 'pointer' }} onClick={() => setIsHidden(true)}>
            <ArrowLeftOutlined
              style={{ color: 'black', fontSize: '24px', marginRight: '10px' }}
            />
            {props.ProjectName}
          </div>
        </Title>
        <Suspense fallback={<div>loading</div>}>
          <ProjectDetailPage
            ProjectDescribeSimple={props.ProjectDescribeSimple}
            ProjectID={props.ProjectID}
            ProjectName={props.ProjectName}
          />
        </Suspense>
      </div>

      <div
        style={{
          marginTop: '15px',
          border: '1px solid #d9d9d9',
          padding: '10px',
          paddingRight: '5px',
        }}
      >
        <Row wrap={false}>
          <Col
            flex={'auto'}
            style={{
              borderRight: '2px solid #d9d9d9',
              marginRight: '10px',
              paddingRight: '5px',
            }}
          >
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setIsHidden(false);
              }}
            >
              <Title level={4}>{props.ProjectName}</Title>
            </div>
            <Para />
          </Col>
          <Col flex={'80px'} className={style.ProjectDetailTag}>
            <div
              style={{ height: '90%', position: 'absolute' }}
              className={style.PartialScrollVertical}
            >
              {props.PositionNames.map((value, index) => (
                <div key={index}>
                  <Tag color={'red'}>{value}</Tag>
                </div>
              ))}
            </div>
          </Col>
          <Col flex={'15px'}>
            <MoreOutlined style={{ fontSize: '20px', fontWeight: 'bold' }} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
