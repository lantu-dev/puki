import { useSetState } from 'react-use';
import { IThread, ThreadService } from '@/backend/bbs';
import { call } from '@/utils/client';
import { Button, List } from 'antd';
import React, { useEffect } from 'react';
import { Preview } from '@/pages/bbs/components/Preview';

import { history } from 'umi';

export interface ThreadListProps {
  nodeId: number;
  id: number;
}

export function ThreadList(props: ThreadListProps) {
  const [state, setState] = useSetState({
    loading: false,
    threads: [] as IThread[],
    updatedBefore: null,
    finish: false,
  });

  const onLoadMore = async () => {
    setState({ loading: true });
    const data = await call(ThreadService.ListThreads, {
      NodeID: props.nodeId,
      ID: props.id,
      Limit: 20,
    });
    setState({
      loading: false,
      threads: [...state.threads, ...data.Threads],
      finish: data.Threads.length < 20,
    });
  };

  useEffect(() => {
    onLoadMore();
  }, []);

  return (
    <List
      locale={{ emptyText: '暂无内容' }}
      className="demo-loadmore-list"
      loading={state.loading}
      itemLayout="horizontal"
      loadMore={
        !state.finish &&
        !state.loading && (
          <div className="flex justify-center">
            <Button type="link" onClick={onLoadMore}>
              加载更多
            </Button>
          </div>
        )
      }
      dataSource={state.threads}
      renderItem={(item) => (
        <div
          key={item.ID}
          onClick={() => {
            history.push({
              pathname: '/bbs/thread',
              query: { id: item.ID, nodeId: item.NodeID },
            } as any);
          }}
        >
          <Preview
            title={item.Title}
            abstract={item.Abstract}
            imageUrls={item.ImagesURL.split(';')}
            displayName={item.UserID.toString()}
            createdAt={item.CreatedAt}
          />
        </div>
      )}
    />
  );
}
