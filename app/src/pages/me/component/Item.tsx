import { RightOutlined } from '@ant-design/icons';
import { Col, Row, Typography } from 'antd';
import { history } from 'umi';
import style from './Item.less';

const { Text } = Typography;
interface ItemProps {
  children?: JSX.Element | string;
  label?: JSX.Element | string;
  route?: string;
  editable?: {
    editing?: boolean;
    icon?: React.ReactNode;
    tooltip?: boolean | React.ReactNode;
    onStart?: () => void;
    onChange?: (value: string) => void;
    maxLength?: number;
    autoSize?:
      | boolean
      | {
          minRows?: number;
          maxRows?: number;
        };
  };
}

export default function Item(props: ItemProps) {
  return (
    <div
      onClick={() => {
        props.route && history.push(props.route);
      }}
      className={style.myButton}
    >
      <Row justify="space-between" align="middle">
        <Col offset={1} style={{ display: 'flex', alignItems: 'center' }}>
          <Text>{props.label}</Text>
        </Col>
        <Col>
          <Text editable={props.editable} style={{ margin: '0', left: '0' }}>
            {props.children}
          </Text>
          <Text>
            {props.route && (
              <RightOutlined
                style={{
                  fontSize: '0.8em',
                  color: '#bbb',
                  transform: 'translateX(0.5em)',
                }}
              />
            )}
          </Text>
        </Col>
      </Row>
    </div>
  );
}
