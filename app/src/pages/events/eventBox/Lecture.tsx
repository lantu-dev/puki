import { LectureInfo } from '@/backend/events';
import { List } from 'antd';
import Avatar from '@/components/Avatar';

export default function Lecture(props: LectureInfo) {
  return (
    <List
      bordered
      dataSource={props.Schedules}
      itemLayout="horizontal"
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            avatar={
              <Avatar src={item.TalkerAvatarURL} head={item.TalkerName} />
            }
            title={item.TalkerName}
            description={item.TalkerDescription}
          />
        </List.Item>
      )}
    />
  );
}
