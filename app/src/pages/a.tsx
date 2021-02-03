import React from 'react';
import {Button} from 'antd';
import {useAsyncFn} from 'react-use'
import fly from "flyio";


export default function() {
  const [state, add] = useAsyncFn(async () => {
    await fly.post('/jsonrpc/',
      {"jsonrpc":"2.0","method":"Counter.Incr","params": {"delta":1},"id":2}
    )
    let resp = await fly.post('/jsonrpc/',
      {"jsonrpc":"2.0","method":"Counter.Get","params": {},"id":2}
    )
    return resp.data
  }, );
  return (
    <div>
      {JSON.stringify(state)}
      <Button type="primary" onClick={add}>Add</Button>
    </div>
  );}
