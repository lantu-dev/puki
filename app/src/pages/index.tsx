import React from 'react';
import { Link, withRouter } from 'umi';
import { List } from 'antd';

const IndexPage = withRouter((props: any) => {
  const routes = props.routes;

  return (
    <div style={{ padding: '10px' }}>
      <h1>devbox</h1>
      <List
        dataSource={routes}
        renderItem={(item: { path: string }) => (
          <List.Item>
            <Link to={item.path}>{item.path}</Link>
          </List.Item>
        )}
      />
    </div>
  );
});

export default IndexPage;
