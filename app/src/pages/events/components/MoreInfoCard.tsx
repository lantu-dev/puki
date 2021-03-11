import events from '@/backend/events';
import { call, hasLogged } from '@/utils/client';
import { Event } from '@/backend/events';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  QuestionOutlined,
  ShareAltOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  Image,
  message,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
// @ts-ignore
import Jdenticon from 'react-jdenticon';
import { useSetState } from 'react-use';
import { history } from 'umi';
import style from './MoreInfoCard.less';

const { Title, Paragraph, Text } = Typography;

interface MoreInfoProps {
  children?: () => JSX.Element;
  more: string;
  teamed: Boolean;
  time: string;
  label: string;
}

export default function MoreInfo(props: Event & MoreInfoProps) {
  const [state, setState] = useSetState({
    enterFor: false,
  });

  const EnterForModel = () => (
    <Modal
      centered
      visible={state.enterFor}
      onOk={async () => {
        if (!hasLogged()) {
          history.push('/phone-login');
        } else if (props.teamed) {
          history.push('/team');
        } else {
          const { Status } = await call(events.EventService.EnrollForEvent, {
            EventID: props.ID,
          });
          if (Status === 0) {
            setState({ enterFor: false });
            history.push({
              pathname: '/events/enrolled',
              query: {
                EventID: props.ID.toString(),
              },
            });
          } else if (Status === 1) {
            message.warning('您已报名本活动');
          }
        }
      }}
      onCancel={() => {
        setState({
          enterFor: false,
        });
      }}
    >
      <Title level={3}>是否确认报名</Title>
    </Modal>
  );

  const ButtonGroup = () => {
    return (
      <Space
        direction="vertical"
        size="large"
        style={{
          position: 'fixed',
          right: '2em',
          bottom: '5em',
          opacity: 0.7,
        }}
      >
        <Button
          shape="circle"
          size="large"
          type="primary"
          icon={<UserAddOutlined />}
          onClick={() => {
            setState({ enterFor: true });
          }}
        />
        {EnterForModel()}
        <Button
          shape="circle"
          size="large"
          type="primary"
          icon={<QuestionOutlined />}
          onClick={() => {
            history.push({
              pathname: '/events/questions',
              query: {
                ID: props?.ID.toString() || '',
              },
            });
          }}
        />
        <Button
          shape="circle"
          size="large"
          type="primary"
          icon={<ShareAltOutlined />}
        />
      </Space>
    );
  };

  return (
    <div>
      <div className={style.image}>
        {props.ImageUrl ? (
          <Image src={props.ImageUrl}></Image>
        ) : (
          <Jdenticon size="200px" value={props.Description} />
        )}
      </div>
      <Space
        direction="vertical"
        style={{ width: '100%', padding: '0 1em 1em 1em' }}
      >
        <Title level={3}>{props.Title}</Title>
        <Row wrap={false} align="middle">
          <Col span={12}>
            <Row align="middle" wrap={false} gutter={5}>
              <Col>
                <CalendarOutlined style={{ fontSize: '1.5em' }} />
              </Col>
              <Col>{props.time}</Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row align="middle" wrap={false} gutter={5}>
              <Col>
                <EnvironmentOutlined style={{ fontSize: '1.5em' }} />
              </Col>
              <Col>{props.Location}</Col>
            </Row>
          </Col>
        </Row>
        <Text strong style={{ fontSize: '1.2em' }}>
          {props.label}
        </Text>
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: '更多',
          }}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {props.Description.replaceAll('\\n', '\n')}
        </Paragraph>
        <Text strong style={{ fontSize: '1.2em' }}>
          {props.more}
        </Text>
        {props.children && props.children()}
      </Space>
      {ButtonGroup()}
    </div>
  );
}
