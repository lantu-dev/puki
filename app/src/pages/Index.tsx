import { Button, DatePicker, Typography, Space, Layout} from 'antd';
import React from 'react';
import { Link } from 'umi';

const { Title } = Typography;
const { Header, Footer, Sider, Content } = Layout;


export default function IndexPage() {
  return (
    <div>
      <Title level={3}>目前已做页面</Title>
      <Space direction={"vertical"}>
        <Button type={"default"}><Link to="add">add</Link></Button>
        <Button type={"default"}><Link to="bbs">bbs</Link></Button>
        <Button type={"default"}><Link to="team">team</Link></Button>
      </Space>
    </div>
  );
}
