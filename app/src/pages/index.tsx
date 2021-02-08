import { Button, DatePicker } from 'antd';
import React from 'react';
import { Link } from 'umi';

export default function IndexPage() {
  return (
    <div>
      <Link to="add">add</Link>
      <br />
      <Link to="topic">topic</Link>
      <DatePicker />
      <Button type="primary" style={{ marginLeft: 8 }}>
        Primary Button
      </Button>
    </div>
  );
}
