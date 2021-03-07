import { MoreOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd';

const { Paragraph, Text } = Typography;

interface CardProps {
  ProjectName: string;
  ProjectDescription: string;
  PositionNames: string[];
  onClick: () => void;
}

export default function ProjectCard(props: CardProps) {
  return (
    <Card hoverable style={{ margin: '5px' }}>
      <Row wrap={false}>
        <Col
          flex="auto"
          style={{
            borderRight: '2px solid #d9d9d9',
            marginRight: '10px',
            paddingRight: '5px',
          }}
        >
          <Space direction="vertical" style={{ width: '100%' }}>
            <div>
              <Button
                type="dashed"
                size="large"
                onClick={props.onClick}
                style={{ fontWeight: 'bolder' }}
              >
                {props.ProjectName}
              </Button>
            </div>
            <Text strong>项目介绍：</Text>
            <Paragraph
              ellipsis={{ rows: 2, expandable: true, symbol: '查看更多' }}
            >
              {props.ProjectDescription}
            </Paragraph>
          </Space>
        </Col>
        <Col flex="80px">
          <div
            style={{
              height: '100%',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              style={{
                height: '100%',
                position: 'absolute',
                overflowY: 'scroll',
              }}
            >
              {props.PositionNames.map((value, index) => (
                <Tag key={index} color="red">
                  {value}
                </Tag>
              ))}
            </div>
          </div>
        </Col>
        <Col flex="15px">
          <MoreOutlined style={{ fontSize: '20px', fontWeight: 'bold' }} />
        </Col>
      </Row>
    </Card>
  );
}
