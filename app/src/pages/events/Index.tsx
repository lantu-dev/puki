import events from '@/backend/events';
import { call } from '@/utils/client';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Col, Menu, Row, Space, Typography } from 'antd';
// @ts-ignore
import Slider from 'react-slick';
import { useAsync, useSetState } from 'react-use';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { history } from 'umi';
import EventCard from './components/EventCard';

const { Text } = Typography;

export default function () {
  const [state, setState] = useSetState({
    menu: 'recommend',
  });

  const { value: eventsList } = useAsync(async () => {
    return (
      await call(events.EventService.GetEventsList, {
        EventIDs: [],
      })
    ).Events;
  });

  const { value: userEvents } = useAsync(async () => {
    return await call(events.EventService.GetUserEnrolledEvents, {});
  });

  return (
    <>
      <Space
        direction="vertical"
        style={{ width: '100%', backgroundColor: '#F6F6F6', padding: '16px' }}
      >
        <Row align="middle" justify="space-around" gutter={16} wrap={false}>
          <Col flex={1}>
            <Row
              align="middle"
              wrap={false}
              style={{
                padding: '5px 10px',
                backgroundColor: 'white',
                borderRadius: '5px',
              }}
            >
              <Col flex={1} style={{ textAlign: 'center' }}>
                您有{' '}
                <span style={{ color: '#1890FF' }}>
                  {userEvents?.Events.length || 0}
                </span>{' '}
                场正在进行的活动
              </Col>
              <Col>
                <Button
                  size="small"
                  type="primary"
                  style={{ borderRadius: '5px' }}
                  onClick={() => {
                    history.push('/me/events');
                  }}
                >
                  查看
                </Button>
              </Col>
            </Row>
          </Col>
          <Col>
            <Button
              icon={<SearchOutlined />}
              type="primary"
              style={{ borderRadius: '5px' }}
            />
          </Col>
        </Row>
        <div>
          <Text style={{ fontWeight: 'bolder', fontSize: 'x-large' }}>
            科技节
          </Text>
          <Slider
            centerMode
            infinite
            centerPadding="60px"
            style={{ margin: '1em' }}
            autoplay
          >
            {eventsList?.map((v) => {
              return (
                <EventCard
                  key={v.ID}
                  ImageUrl={v.ImageUrl}
                  Title={v.Title}
                  Description={v.Description}
                  onClick={() => {
                    history.push({
                      pathname: '/events/more-info',
                      query: {
                        EventID: v.ID.toString(),
                      },
                    });
                  }}
                />
              );
            })}
          </Slider>
        </div>
        <div>
          <Menu
            onClick={(e) => {
              setState({ menu: e.key as string });
            }}
            selectedKeys={[state.menu]}
            mode="horizontal"
            style={{ width: '204px' }}
          >
            <Menu.Item key="recommend">推荐</Menu.Item>
            <Menu.Item key="salon">沙龙</Menu.Item>
            <Menu.Item key="lecture">讲座</Menu.Item>
          </Menu>
          <Slider
            centerMode
            centerPadding="0"
            infinite={false}
            vertical
            verticalSwiping
          >
            {eventsList?.map((v) => (
              <div
                key={v.ID}
                onClick={() => {
                  history.push({
                    pathname: '/events/more-info',
                    query: {
                      EventID: v.ID.toString(),
                    },
                  });
                }}
              >
                <EventCard
                  ImageUrl={v.ImageUrl}
                  Title={v.Title}
                  Description={v.Description}
                />
              </div>
            ))}
          </Slider>
        </div>
      </Space>
    </>
  );
}
