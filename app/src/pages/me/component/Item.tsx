import { RightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { history } from 'umi';
import style from './Item.less';

interface ItemProps {
  children?: JSX.Element | string;
  label?: JSX.Element | string;
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
      <Row justify="space-between" align="middle">
        <Col offset={1} style={{ display: 'flex', alignItems: 'center' }}>
          {props.label}
        </Col>
        <Col>
          {props.children}
          {props.route && (
            <RightOutlined
              style={{
                fontSize: '0.8em',
                color: '#bbb',
                transform: 'translateX(0.5em)',
              }}
            />
          )}
        </Col>
      </Row>
    </div>
  );
}
