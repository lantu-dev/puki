import { LectureInfo } from '@/api-client/events';
import { Avatar, List } from 'antd';

export default function Lecture(props: LectureInfo) {
  return (
    <List
      bordered
      dataSource={props.Schedules}
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
  );
}
