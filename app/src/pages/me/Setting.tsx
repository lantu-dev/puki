import Item from './component/Item';
import { Space } from 'antd';

export default function Setting() {
  return (
    <>
      <Space direction={'vertical'} style={{ width: '100%' }} size={'small'}>
        <div>
          <Item label="修改密码" value="" route="/"></Item>
          <Item label="修改认证信息" value="" route="/"></Item>
        </div>
        <div>
          <Item label="新消息提醒" value="" route="/"></Item>
          <Item label="隐私" value="" route="/"></Item>
          <Item label="通用" value="" route=""></Item>
        </div>
        <div>
          <Item label="关于蓝图宝蕴" value="" route="/"></Item>
          <Item label="帮助与反馈" value="" route="/"></Item>
        </div>
      </Space>
    </>
  );
}
