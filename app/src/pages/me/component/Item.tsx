import { Row, Col, Typography, Button } from 'antd';
import { RightOutlined } from '@ant-design/icons';
import { history } from 'umi';

const { Text } = Typography;

interface ItemProps {
  label: string;
  value: string;
  route: string;
}

export default function Item(props: ItemProps) {
  return (
    <Button
      onClick={() => {
        history.push(props.route);
      }}
      block
      size="large"
      style={{ borderLeft: '0', borderRight: '0', margin: '0.1em 0' }}
    >
      <Row justify="space-between">
        <Col offset={1}>
          <Text>{props.label + ' '}</Text>
          {/* Button内为两个汉字时, Button的content会有一个负右边距, 影响icon的显示 */}
        </Col>
        <Col>
          <Text>{props.value}</Text>
          <RightOutlined />
        </Col>
      </Row>
    </Button>
  );
}
