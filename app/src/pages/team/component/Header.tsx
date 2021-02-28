import { Col, Row, Space, Input, Typography } from 'antd';
import logo from '@/assets/team/img/logo.png';
import React, { lazy, Suspense, useState } from 'react';
import { Link } from 'umi';
import { ArrowLeftOutlined, PlusCircleOutlined } from '@ant-design/icons';
const { Paragraph, Text, Title } = Typography;
const { Search } = Input;

const onSearch = (value: string) => {};

interface HeaderProps {
  competitionNames: string[];
  competitionTypes: string[];
  positionNames: string[];
}

export default function Header(props: HeaderProps) {
  let [isHidden, setIsHidden] = useState(true);
  const CreateProjectPage = lazy(
    () => import('@/pages/team/pages/CreateProject'),
  );
  return (
    <div>
      <Row align={'middle'}>
        <Col flex={'50px'}>
          <Link to={'team'}>
            <img alt={logo} width={'50'} src={logo} />
          </Link>
        </Col>
        <Col flex={'auto'}>
          <div style={{ width: '100%', textAlign: 'center' }}>
            <Space direction={'vertical'} style={{ width: '98%' }}>
              <Search
                placeholder="请输入关键词查询"
                onSearch={onSearch}
                size={'large'}
                style={{ width: '100%' }}
              />
            </Space>
          </div>
        </Col>
        <Col flex={'30px'} style={{ textAlign: 'right' }}>
          <div style={{ cursor: 'pointer' }} onClick={() => setIsHidden(false)}>
            <PlusCircleOutlined style={{ fontSize: 30, color: 'black' }} />
          </div>
        </Col>
      </Row>
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
          <div onClick={() => setIsHidden(true)}>
            <ArrowLeftOutlined
              style={{ color: 'black', fontSize: '24px', marginRight: '10px' }}
            />
            快速创建项目
          </div>
        </Title>
        <Suspense fallback={<div>loading</div>}>
          <CreateProjectPage
            competitionNames={props.competitionNames}
            competitionTypes={props.competitionTypes}
            positionNames={props.positionNames}
          />
        </Suspense>
        <div style={{height:"200px"}}> </div>
      </div>
    </div>
  );
}
