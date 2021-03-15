import { useLocation } from 'umi';
import { Button, Col, Menu, Typography } from 'antd';
import {
  PlusOutlined,
  CommentOutlined,
  NodeIndexOutlined,
} from '@ant-design/icons';
import React from 'react';
import { ThreadList } from '@/pages/bbs/components/ThreadList';
import { useAsync } from 'react-use';
import { call } from '@/utils/client';
import { NodeService } from '@/backend/bbs';
import { CreateThread } from '@/pages/bbs/components/CreateThread';
import ReactMarkdown from 'react-markdown';

export default function Node() {
  const location = useLocation();
  //@ts-ignore
  const id = parseInt(location.query.id, 10);

  const state = useAsync(async () => {
    let data = await call(NodeService.GetNode, { ID: id });
    return data;
  });

  return (
    <Col>
      {state.value && (
        <Col>
          <Typography.Title level={2}>
            {state.value.Node!.Title}
          </Typography.Title>
          <ReactMarkdown>{state.value.Node?.Description}</ReactMarkdown>
        </Col>
      )}
      <Menu mode="horizontal">
        <Menu.Item key="threads" icon={<CommentOutlined />}>
          帖子
        </Menu.Item>
        <Menu.Item key="nodes" icon={<NodeIndexOutlined />}>
          子节点
        </Menu.Item>
        <div className="inline-block right mr2">
          <CreateThread nodeID={id} replyFor={0} modalTitle="发表">
            <Button shape="circle" icon={<PlusOutlined />}></Button>
          </CreateThread>
        </div>
      </Menu>
      <ThreadList nodeId={id} id={0} />
    </Col>
  );
}
