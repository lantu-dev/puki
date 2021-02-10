import { Button } from 'antd';
import fly from 'flyio';
import React from 'react';
import { useAsyncFn } from 'react-use';
import { Link } from 'umi';
export default function () {
  const [state, add] = useAsyncFn(async () => {
    await fly.post('/jsonrpc/', {
      jsonrpc: '2.0',
      method: 'Counter.Incr',
      params: { delta: 1 },
      id: 2,
    });
    let resp = await fly.post(    '/jsonrpc/', {
      jsonrpc: '2.0',
      method: 'Counter.Get',
      params: {},
      id: 2,
    });
    return resp.data;
  });
  return (
    <div>
      <Link to="/">back</Link>
      <br />
      <p>{JSON.stringify(state)}</p>
      <Button type="primary" onClick={add}>
        Add
      </Button>
    </div>
  );
}
