import { Divider } from 'antd';
import React from 'react';
import { Link } from 'umi';

export default function IndexPage() {
  return (
    <div>
      <Link to="add">add</Link>
      <Divider />
      <Link to="topic">topic</Link>
      <Divider />
      <Link to="login">login</Link>
      <Divider />
      <Link to="test">test</Link>
      <Divider />
      <Link to="info">info</Link>
    </div>
  );
}
