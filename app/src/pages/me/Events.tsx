import { call, events } from '@/api-client';
import EventCard from '@/pages/events/components/EventCard';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Empty, List, Typography } from 'antd';
import { useAsync } from 'react-use';
import { history } from 'umi';

const { Title, Text } = Typography;

export default function Events() {
  const { value: userEvents } = useAsync(async () => {
    return await call(events.EventService.GetUserEnrolledEvents, {});
  });

  return userEvents && userEvents?.Events.length ? (
    <List
      dataSource={userEvents.Events}
      renderItem={(item) => (
        <div
          onClick={() => {
            history.push({
              pathname: '/events/more-info',
              query: {
                EventID: item.ID.toString(),
              },
            });
          }}
        >
          <EventCard
            style={{ margin: '1em' }}
            ImageUrl={item.ImageUrl}
            Title={item.Title}
            Description={item.Description}
          />
        </div>
      )}
    />
  ) : (
    <Empty
      imageStyle={{
        height: 312,
      }}
      description={
        <span>
          <Title level={4}>您还没添加任何活动</Title>
          <Text>需要添加活动后才能执行相关操作</Text>
        </span>
      }
    >
      <Button
        type="primary"
        size="large"
        onClick={() => {
          history.push('/events');
        }}
      >
        <DoubleLeftOutlined />
        添加活动
      </Button>
    </Empty>
  );
}
