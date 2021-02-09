import fly, { FlyResponse } from 'flyio';

export interface Endpoint<P, R> extends String {}

export async function call<P, R>(
  endpoint: Endpoint<P, R>,
  params: P,
): Promise<R> {
  let resp: FlyResponse;
  if (process.env.NODE_ENV !== 'production') {
    const token = localStorage.getItem('token');
    resp = fly
      .post(
        'api',
        {
          jsonrpc: '2.0',
          method: endpoint,
          params: params,
          id: Math.floor(Math.random() * 99999999),
        },
        {
          headers: { Authorization: token || undefined },
        },
      )
      .catch((err) => {
        if (err.status >= 200) {
          err.message = null;
          err.message = err.response.data?.error?.message;
        }
        return Promise.reject(err);
      })
      .then((resp) => {
        if (!resp.data) {
          return;
        }
        const { result, error } = resp.data;
        if (error) {
          return Promise.reject({ status: error.code, message: error.message });
        }
        return resp;
      }) as any;
  }
  try {
    let { data, headers }: { data: R; headers: any } = await resp!;
    const sa = headers['Set-Authorization'];
    if (sa) {
      if (sa.length > 0) {
        localStorage.setItem('token', sa);
      } else {
        localStorage.removeItem('token');
      }
    }
    return data;
  } catch (err) {
    let title = '错误';
    const status: number = err.status;
    let msg: string = err.message;
    if (status === 0) {
      title = '网络错误';
    } else if (status === 1) {
      title = '网络超时';
    } else if (msg) {
      const parts = msg.split(':');
      if (parts.length > 1) {
        title = parts[0];
        msg = parts.slice(1).join(':');
      }
    }
    //@ts-ignore
    if (BUNDLE_FLAVOR && BUNDLE_FLAVOR === 'webapp') {
      const { default: message } = require('antd/lib/message');
      message.error({ content: title + ':' + msg });
    }
    throw err;
  }
}
