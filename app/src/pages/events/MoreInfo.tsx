import { call, events } from '@/api-client';
import {
  CalendarOutlined,
  EnvironmentOutlined,
  MinusOutlined,
  QuestionOutlined,
  ShareAltOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Carousel,
  Col,
  Form,
  Image,
  Input,
  List,
  Modal,
  Row,
  Space,
  Typography,
} from 'antd';
import moment from 'moment';
import { useAsync, useSetState } from 'react-use';
import { history } from 'umi';
import style from './MoreInfo.less';

const { Title, Paragraph, Text } = Typography;

enum EnterForSteps {
  Confirm,
  TeamUp,
}

export default function () {
  const [state, setState] = useSetState({
    enterFor: false,
    enterForSteps: EnterForSteps.Confirm,
  });

  const [form] = Form.useForm();

  const eventState = useAsync(async () => {
    const res = await call(events.Info.GetEventInfo, { EventID: 1 });
    console.log(res);
    return res;
  });

  const teamUpForm = (
    <Form name="team" form={form} scrollToFirstError>
      <Title level={4}>组队报名</Title>
      <Form.Item
        label="队长"
        name="Leader"
        validateFirst
        hasFeedback
        rules={[
          {
            message: '请填写学号',
            required: true,
          },
          {
            validator(_, value) {
              if (value.length === 10) {
                return Promise.resolve();
              }
              return Promise.reject('例: 2019123456');
            },
          },
        ]}
      >
        <Input placeholder="请输入学号" type="number"></Input>
      </Form.Item>
      <Form.List
        name="members"
        rules={[
          {
            validator: async (_, members) => {
              if (!members || members.length < 1) {
                return Promise.reject('至少一个队员');
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => {
          return (
            <>
              {fields.map((field, index) => (
                <Row key={field.key} style={{ width: '100%' }} align="middle">
                  <Col flex={1}>
                    <Form.Item
                      {...field}
                      label={'队员' + (index + 1)}
                      validateFirst
                      hasFeedback
                      rules={[
                        {
                          message: '请填写学号',
                          required: true,
                        },
                        {
                          validator(_, value) {
                            if (value.length === 10) {
                              return Promise.resolve();
                            }
                            return Promise.reject('例: 2019123456');
                          },
                        },
                      ]}
                    >
                      <Input placeholder="请输入学号" type="number"></Input>
                    </Form.Item>
                  </Col>
                  <Col>
                    {fields.length > 1 && (
                      <Button
                        danger
                        icon={<MinusOutlined />}
                        shape="circle"
                        type="primary"
                        onClick={() => {
                          remove(field.name);
                        }}
                        style={{ transform: 'translate(5px,7px)' }}
                      ></Button>
                    )}
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  block
                  type="dashed"
                  onClick={add}
                  disabled={fields.length > 3}
                >
                  添加成员
                </Button>
                <Form.ErrorList errors={errors} />
              </Form.Item>
            </>
          );
        }}
      </Form.List>
    </Form>
  );

  const EnterForModel = (
    <Modal
      centered
      visible={state.enterFor}
      onOk={async () => {
        if (state.enterForSteps === EnterForSteps.Confirm) {
          // TODO 检查登录状态/是否已经报名
          if (eventState.value!.more.type !== 'h') {
            // TODO 发送报名请求
            setState({ enterFor: false });
            history.push('/events/entered-for');
          } else {
            setState({ enterForSteps: EnterForSteps.TeamUp });
          }
        } else {
          // hackathon组队报名
          try {
            const fieldsValue = await form.validateFields();
            console.log(fieldsValue);
            setState({
              enterFor: false,
              enterForSteps: EnterForSteps.Confirm,
            });
            history.push('/events/entered-for');
          } catch (err) {
            console.log(err);
          }
        }
      }}
      onCancel={() => {
        setState({
          enterFor: false,
          enterForSteps: EnterForSteps.Confirm,
        });
      }}
    >
      {[<Title level={3}>是否确认报名</Title>, teamUpForm][state.enterForSteps]}
    </Modal>
  );

  return (
    <>
      <div className={style.image}>
        <Image src={eventState.value?.imageUrl}></Image>
      </div>
      <Space
        direction="vertical"
        style={{ width: '100%', padding: '0 1em 1em 1em' }}
      >
        <Title level={3}>{eventState.value?.title}</Title>
        <Row wrap={false} align="middle">
          <Col span={12}>
            <Row align="middle" wrap={false} gutter={5}>
              <Col>
                <CalendarOutlined style={{ fontSize: '1.5em' }} />
              </Col>
              <Col>
                {eventState.value?.more.type === 'h'
                  ? `${moment(eventState.value?.startTime).format(
                      'HH:mm A(DD号)',
                    )}-${moment(eventState.value?.endTime).format(
                      'HH:mm A(DD号)',
                    )}`
                  : moment(eventState.value?.startTime).format('HH:mm A')}
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row align="middle" wrap={false} gutter={5}>
              <Col>
                <EnvironmentOutlined style={{ fontSize: '1.5em' }} />
              </Col>
              <Col>{eventState.value?.location}</Col>
            </Row>
          </Col>
        </Row>
        <Text strong style={{ fontSize: '1.2em' }}>
          {eventState.value?.more.type === 'l' && '具体信息'}
          {eventState.value?.more.type === 's' && '沙龙核心议题'}
          {eventState.value?.more.type === 'h' && '活动介绍'}
        </Text>
        <Paragraph>{eventState.value?.description}</Paragraph>
        <Text strong style={{ fontSize: '1.2em' }}>
          {eventState.value?.more.type === 'l' && '主讲人'}
          {eventState.value?.more.type === 's' && '具体安排'}
          {eventState.value?.more.type === 'h' && '活动流程'}
        </Text>
        {eventState.value?.more.type === 'l' && (
          <List
            bordered
            dataSource={eventState.value?.more.lecturers}
            itemLayout="horizontal"
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.photoUrl} />}
                  title={item.personName}
                  description={item.description}
                />
              </List.Item>
            )}
          />
        )}
        {eventState.value?.more.type === 's' && (
          <Carousel autoplay>
            {eventState.value?.more.schedules.map((v) => (
              <Card
                extra={moment(v.startTime).format('HH:mm A')}
                key={v.personName}
                style={{ width: 300 }}
                title={`${v.personName} ${v.title}`}
              >
                <Paragraph>{v.description}</Paragraph>
              </Card>
            ))}
          </Carousel>
        )}
        {eventState.value?.more.type === 'h' &&
          eventState.value?.more.description}
      </Space>
      {eventState.value && (
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
          ></Button>
          {EnterForModel}
          <Button
            shape="circle"
            size="large"
            type="primary"
            icon={<QuestionOutlined />}
          ></Button>
          <Button
            shape="circle"
            size="large"
            type="primary"
            icon={<ShareAltOutlined />}
          ></Button>
        </Space>
      )}
    </>
  );
}
