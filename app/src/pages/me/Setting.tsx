import { Space } from 'antd';
import Item from './components/Item';

export default function Setting() {
  return (
    <>
      <Space direction="vertical" style={{ width: '100%' }} size="small">
        <div>
          <Item label="修改密码"></Item>
          <Item label="修改认证信息"></Item>
        </div>
        <div>
          <Item label="新消息提醒"></Item>
          <Item label="隐私"></Item>
          <Item label="通用"></Item>
        </div>
        <div>
          <Item label="关于蓝图宝蕴"></Item>
          <Item label="帮助与反馈"></Item>
        </div>
      </Space>
    </>
  );
}
