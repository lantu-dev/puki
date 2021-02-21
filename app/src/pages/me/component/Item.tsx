import { RightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { history } from 'umi';
import style from './Item.less';

interface ItemProps {
  children?: any;
  label?: string;
  route?: string;
}

export default function Item(props: ItemProps) {
  return (
    <div
      onClick={() => {
        props.route && history.push(props.route);
      }}
      className={style.myButton}
    >
      <Row justify="space-between">
        <Col offset={1}>
          <span>{props.label}</span>
        </Col>
        <Col>
          <span style={{ height: '100%' }}>
            {props.children}
            <RightOutlined
              style={{
                fontSize: '0.8em',
                color: '#bbb',
                transform: 'translateX(0.5em)',
              }}
            />
          </span>
        </Col>
      </Row>
    </div>
  );
}
