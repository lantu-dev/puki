import { MoreOutlined } from '@ant-design/icons';
import { Col, Row, Space, Tag, Typography } from 'antd';
import style from '@/assets/team/css/expand.css';

const { Title, Paragraph, Text } = Typography;

interface CardProps {
  ProjectName: string;
  ProjectDescription: string;
  PositionNames: string[];
  onClick: () => void;
}

export default function ProjectCard(props: CardProps) {
  return (
    <div className={style.Card}>
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
            <div onClick={props.onClick}>
              <Title level={4} style={{ marginBottom: '-5px' }}>
                {props.ProjectName}
              </Title>
            </div>
            <Paragraph
              ellipsis={{ rows: 1, expandable: true, symbol: '查看更多' }}
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
              onClick={props.onClick}
              style={{
                height: '100%',
                position: 'absolute',
                overflowY: 'scroll',
              }}
            >
              {props.PositionNames.map((value, index) => (
                <Tag key={index} color="blue">
                  {value}
                </Tag>
              ))}
            </div>
          </div>
        </Col>
        <MoreOutlined
          style={{
            fontSize: '20px',
            fontWeight: 'bold',
            position: 'absolute',
            right: '5px',
          }}
        />
      </Row>
    </div>
  );
}
