import { call, events } from '@/api-client';
import { EventType } from '@/api-client/events';
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
  Spin,
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

export default function MoreInfo() {
  const [state, setState] = useSetState({
    enterFor: false,
    enterForSteps: EnterForSteps.Confirm,
  });

  const [form] = Form.useForm();

  const { value = null } = useAsync(async () => {
    const EventID = Number(history.location.query?.EventID);
    if (Number.isNaN(EventID)) {
      return;
    }
    let eventInfo = (
      await call(events.EventService.GetEventsList, {
        EventIDs: [EventID],
      })
    )[0];
    let eventMoreInfo = await call(events.EventService.GetEventMoreInfo, {
      EventID,
    });
    let res = {
      ...eventInfo,
      ...eventMoreInfo,
    };
    console.log(res);
    return res;
  });

  const EnterForModel = () => (
    <Modal
      centered
      visible={state.enterFor}
      onOk={async () => {
        if (state.enterForSteps === EnterForSteps.Confirm) {
          // TODO 检查登录状态/是否已经报名
          if (value!.EventType !== EventType.EventTypeHackathon) {
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
      {
        [<Title level={3}>是否确认报名</Title>, <TeamUpForm form={form} />][
          state.enterForSteps
        ]
      }
    </Modal>
  );

  return value ? (
    <div>
      <div className={style.image}>
        <Image src={value.ImageUrl}></Image>
      </div>
      <Space
        direction="vertical"
        style={{ width: '100%', padding: '0 1em 1em 1em' }}
      >
        <Title level={3}>{value.Title}</Title>
        <Row wrap={false} align="middle">
          <Col span={12}>
            <Row align="middle" wrap={false} gutter={5}>
              <Col>
                <CalendarOutlined style={{ fontSize: '1.5em' }} />
              </Col>
              <Col>
                {value.EventType === EventType.EventTypeHackathon
                  ? `${moment(value.StartedAt).format(
                      'HH:mm A(DD号)',
                    )}-${moment(value.EndedAt).format('HH:mm A(DD号)')}`
                  : moment(value.StartedAt).format('HH:mm A')}
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Row align="middle" wrap={false} gutter={5}>
              <Col>
                <EnvironmentOutlined style={{ fontSize: '1.5em' }} />
              </Col>
              <Col>{value.Location}</Col>
            </Row>
          </Col>
        </Row>
        <Text strong style={{ fontSize: '1.2em' }}>
          {value.EventType === EventType.EventTypeLecture && '具体信息'}
          {value.EventType === EventType.EventTypeSalon && '沙龙核心议题'}
          {value.EventType === EventType.EventTypeHackathon && '活动介绍'}
        </Text>
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: '更多',
          }}
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {value.Description.replaceAll('\\n', '\n')}
        </Paragraph>
        <Text strong style={{ fontSize: '1.2em' }}>
          {value.EventType === EventType.EventTypeLecture && '主讲人'}
          {value.EventType === EventType.EventTypeSalon && '具体安排'}
          {value.EventType === EventType.EventTypeHackathon && '活动流程'}
        </Text>
        {value.EventType === EventType.EventTypeLecture && (
          <List
            bordered
            dataSource={value.Schedules}
            itemLayout="horizontal"
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={item.TalkerAvatarURL} />}
                  title={item.TalkerName}
                  description={item.TalkerDescription}
                />
              </List.Item>
            )}
          />
        )}
        {value.EventType === EventType.EventTypeSalon && (
          <Carousel autoplay>
            {value.Schedules.map((v) => (
              <Card
                extra={moment(v.StartedAt).format('HH:mm A')}
                key={v.TalkerName}
                style={{ width: 300 }}
                title={`${v.TalkerName} ${v.TalkerTitle}`}
              >
                <Paragraph
                  ellipsis={{
                    rows: 2,
                    expandable: true,
                    symbol: '更多',
                  }}
                  style={{ whiteSpace: 'pre-wrap' }}
                >
                  {v.TalkerDescription.replaceAll('\\n', '\n')}
                </Paragraph>
              </Card>
            ))}
          </Carousel>
        )}
        {value.EventType === EventType.EventTypeHackathon && (
          <Paragraph
            ellipsis={{
              rows: 2,
              expandable: true,
              symbol: '更多',
            }}
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {value.Hackathon.Steps.replaceAll('\\n', '\n')}
          </Paragraph>
        )}
      </Space>
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
                ID: value?.ID.toString() || '0',
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
    </div>
  ) : (
    <Spin
      size="large"
      style={{
        position: 'absolute',
        width: '100%',
        margin: 'auto',
        top: '50%',
      }}
    />
  );
}

function TeamUpForm(props: { form: ReturnType<typeof Form.useForm>[0] }) {
  return (
    <Form name="team" form={props.form} scrollToFirstError>
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
                      />
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
}
