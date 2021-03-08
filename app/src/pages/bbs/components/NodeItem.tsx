import { INode } from '@/api-client/bbs';
import { Typography } from 'antd';
import React from 'react';

export default function NodeItem(props: INode) {
  return (
    <>
      <Typography.Text>{props.Title}</Typography.Text>
    </>
  );
}
