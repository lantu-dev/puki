import { Divider } from 'antd';
import React from 'react';
import { Link } from 'umi';

export default function IndexPage() {
  return (
    <div>
      <Link to="/auth/phone-login">login</Link>
      <Divider />
      <Link to="/auth/register">register</Link>
      <Divider />
      <Link to="/me">me</Link>
      <Divider />
      <Link to="/test">test</Link>
      <Divider />
      <Link to="/topic">topic</Link>
    </div>
  );
}
