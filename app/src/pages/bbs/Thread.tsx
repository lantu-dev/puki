import { useLocation } from 'umi';
import { Button, Col, Menu, Typography } from 'antd';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import { UserInfo } from '@/pages/bbs/components/Preview';
import { ThreadList } from '@/pages/bbs/components/ThreadList';
import { useAsync } from 'react-use';
import { call } from '@/utils/client';
import { ThreadService } from '@/backend/bbs';
import { CommentOutlined, PlusOutlined } from '@ant-design/icons';
import { CreateThread } from '@/pages/bbs/components/CreateThread';

export default function Thread() {
  const location = useLocation();
  //@ts-ignore
  const id = parseInt(location.query.id, 10);
  //@ts-ignore
  const nodeId = parseInt(location.query.nodeId, 10);

  const state = useAsync(async () => {
    let data = await call(ThreadService.GetThread, { NodeID: nodeId, ID: id });
    return data.Thread;
  });

  return (
    <Col>
      {state.value && (
        <Col>
          <Typography.Title level={2}>{state.value.Title}</Typography.Title>
          <UserInfo
            displayName={state.value.UserID.toString()}
            id={state.value.UserID.toString()}
            createdAt={state.value.CreatedAt}
          />
          <ReactMarkdown className="mt1 px2 mb3">
            {state.value.Content}
          </ReactMarkdown>
        </Col>
      )}
      <Menu mode="horizontal">
        <Menu.Item key="comments" icon={<CommentOutlined />}>
          评论
        </Menu.Item>
        <div className="inline-block right mr2">
          <CreateThread nodeID={nodeId} replyFor={id} modalTitle="回复">
            <Button shape="circle" icon={<PlusOutlined />}></Button>
          </CreateThread>
        </div>
      </Menu>
      <ThreadList nodeId={nodeId} id={id} />
    </Col>
  );
}
