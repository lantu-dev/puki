import { Col } from 'antd';
import React from 'react';
import { useAsync } from 'react-use';
import { call } from '@/utils/client';
import { NodeService } from '@/backend/bbs';
import NodeItem from '@/pages/bbs/components/NodeItem';

export default function Nodes() {
  const state = useAsync(async () => {
    let data = await call(NodeService.GetNode, { ID: 0 });
    return data;
  });

  return (
    <Col>
      {state.value &&
        state.value.Children.map((node) => (
          <NodeItem key={node.ID} {...node} />
        ))}
    </Col>
  );
}
