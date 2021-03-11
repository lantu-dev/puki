import events from '@/backend/events';
import { call } from '@/utils/client';
import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Empty, List, message, Typography } from 'antd';
import { useAsyncRetry } from 'react-use';
import { history } from 'umi';
import EventCard from './components/EventCard';

const { Title, Text } = Typography;

export default function Events() {
  const { value: userEvents, retry } = useAsyncRetry(async () => {
    return await call(events.EventService.GetUserEnrolledEvents, {});
  });

  return userEvents && userEvents?.Events.length ? (
    <List
      dataSource={userEvents.Events}
      renderItem={(item) => (
        <EventCard
          style={{ margin: '1em' }}
          ImageUrl={item.ImageUrl}
          Title={item.Title}
          Description={item.Description}
          onClickCard={() => {
            history.push({
              pathname: '/events/more-info',
              query: {
                EventID: item.ID.toString(),
              },
            });
          }}
          onClickDelete={async () => {
            console.log(history);
            const { Status } = await call(events.EventService.QuitEvent, {
              EventID: item.ID,
            });
            switch (Status) {
              case 0:
                retry();
                break;
              case 1:
                message.warning('已删除活动');
              case 2:
                message.warning('该活动不存在');
                break;
            }
          }}
        />
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
          history.replace('/events');
        }}
      >
        <DoubleLeftOutlined />
        添加活动
      </Button>
    </Empty>
  );
}
