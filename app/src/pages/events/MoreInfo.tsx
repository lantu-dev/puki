import events from '@/backend/events';
import { call } from '@/utils/client';
import {
  EventType,
  HackathonInfo,
  LectureInfo,
  SalonInfo,
} from '@/backend/events';
import { Spin } from 'antd';
import dayjs from 'dayjs';
import { useAsync } from 'react-use';
import { history } from 'umi';
import MoreInfoCard from './components/MoreInfoCard';
import Hackathon from './eventBox/Hackathon';
import Lecture from './eventBox/Lecture';
import Salon from './eventBox/Salon';

export default function MoreInfo() {
  const { value = null } = useAsync(async () => {
    const EventID = Number(history.location.query?.EventID);
    if (Number.isNaN(EventID)) {
      return;
    }
    let eventInfo = (
      await call(events.EventService.GetEventsList, {
        EventIDs: [EventID],
      })
    ).Events[0];
    let eventMoreInfo = await call(events.EventService.GetEventMoreInfo, {
      EventID,
    });
    return {
      eventInfo,
      eventMoreInfo,
    };
  });

  let info = {
    more: '',
    teamed: false,
    time: '',
    label: '',
  };
  let children = () => <div></div>;
  if (value) {
    switch (value.eventInfo.EventType) {
      case EventType.EventTypeLecture:
        children = () => <Lecture {...(value.eventMoreInfo as LectureInfo)} />;
        info.time = dayjs(value.eventInfo.StartedAt).format('HH:mm A');
        info.label = '具体信息';
        info.more = '主讲人';
        break;
      case EventType.EventTypeSalon:
        children = () => <Salon {...(value.eventMoreInfo as SalonInfo)} />;
        info.time = dayjs(value.eventInfo.StartedAt).format('HH:mm A');
        info.label = '沙龙核心议题';
        info.more = '具体安排';
        break;
      case EventType.EventTypeHackathon:
        children = () => (
          <Hackathon {...(value.eventMoreInfo as HackathonInfo)} />
        );
        info.teamed = true;
        info.time = `${dayjs(value.eventInfo.StartedAt).format(
          'HH:mm A(DD号)',
        )}-${dayjs(value.eventInfo.EndedAt).format('HH:mm A(DD号)')}`;
        info.label = '活动介绍';
        info.more = '活动流程';
        break;
    }
  }

  return value ? (
    <MoreInfoCard {...info} {...value.eventInfo}>
      {children}
    </MoreInfoCard>
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
