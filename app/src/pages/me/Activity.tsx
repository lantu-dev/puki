import { DoubleLeftOutlined } from '@ant-design/icons';
import { Button, Empty, Typography } from 'antd';
const { Title, Text } = Typography;

export default function Activity() {
  return (
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
      <Button type="primary" size="large">
        <DoubleLeftOutlined />
        添加活动
      </Button>
    </Empty>
  );
}
