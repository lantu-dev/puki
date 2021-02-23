import React from 'react';
import { Col, Row, Typography, Tag } from 'antd';
import { Link } from 'umi';
import style from '../wwwroot/css/expand.css';
import { MoreOutlined } from '@ant-design/icons';
const { Title } = Typography;
const { Paragraph, Text } = Typography;

interface ProjectCardProps {
  ProjectName: string;
  ProjectDescribeSimple: string;
}

export default class ProjectCard extends React.Component {
  props: ProjectCardProps = {
    ProjectName: this.props.ProjectName,
    ProjectDescribeSimple: this.props.ProjectDescribeSimple,
  };
  render() {
    const Para = () => {
      const [ellipsis] = React.useState(true);
      return (
        <Paragraph
          ellipsis={
            ellipsis ? { rows: 2, expandable: true, symbol: '查看更多' } : false
          }
        >
          <Text strong>项目介绍：</Text>
          {this.props.ProjectDescribeSimple}
        </Paragraph>
      );
    };
    return (
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
            <Link
              to={{
                pathname: '/team/ProjectDetail',
                state: { ProjectID: 1 },
              }}
            >
              <Title level={4}>{this.props.ProjectName}</Title>
            </Link>
            <Para />
          </Col>
          <Col flex={'80px'} className={style.ProjectDetailTag}>
            <div
              style={{ height: '90%', position: 'absolute' }}
              className={style.PartialScrollVertical}
            >
              <div>
                <Tag color={'red'}>安卓开发是</Tag>
              </div>
              <div>
                <Tag color={'red'}>安卓开发是</Tag>
              </div>
              <div>
                <Tag color={'red'}>安卓开发是</Tag>
              </div>
              <div>
                <Tag color={'red'}>安卓开发是</Tag>
              </div>
              <div>
                <Tag color={'red'}>web后端是</Tag>
              </div>
              <div>
                <Tag color={'red'}>web前端</Tag>
              </div>
            </div>
          </Col>
          <Col flex={'15px'}>
            <MoreOutlined style={{ fontSize: '20px', fontWeight: 'bold' }} />
          </Col>
        </Row>
      </div>
    );
  }
}
