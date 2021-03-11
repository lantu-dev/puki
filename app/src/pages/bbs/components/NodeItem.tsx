import { INode } from '@/backend/bbs';
import { Typography } from 'antd';
import React from 'react';

export default function NodeItem(props: INode) {
  return (
    <>
      <Typography.Text>{props.Title}</Typography.Text>
    </>
  );
}
