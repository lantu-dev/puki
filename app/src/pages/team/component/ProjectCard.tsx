import { MoreOutlined } from '@ant-design/icons';
import { Col, Row, Tag, Typography } from 'antd';

const { Title, Paragraph, Text } = Typography;

interface CardProps {
  ProjectName: string;
  ProjectDescription: string;
  PositionNames: string[];
}

export default function Card(props: CardProps) {
  return (
    <Row wrap={false}>
      <Col
        flex={'auto'}
        style={{
          borderRight: '2px solid #d9d9d9',
          marginRight: '10px',
          paddingRight: '5px',
        }}
      >
        <Title level={4}>{props.ProjectName}</Title>
        <Text strong>项目介绍：</Text>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: '查看更多' }}>
          {props.ProjectDescription}
        </Paragraph>
      </Col>
      <Col flex={'80px'}>
        <div
          style={{
            height: '90%',
            position: 'absolute',
            overflowY: 'scroll',
          }}
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
  );
}
