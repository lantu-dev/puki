import fly, { FlyResponse } from 'flyio';

export async function setToken(token: string) {
  localStorage.setItem('token', token);
}

export async function hasLogged() {
  !!localStorage.getItem('token');
}

export interface Endpoint<P, R> extends String {}

async function gw_call<P, R>(
  endpoint: Endpoint<P, R>,
  params: P,
): Promise<{ data: R; headers: any }> {
  let resp: Promise<FlyResponse>;
  const token = localStorage.getItem('token');
  let config: any = { headers: {} };
  if (token) {
    config.headers['Authorization'] = token;
  }

  const [_, mod, ser, method] = endpoint.match(/^(\w*)\/(\w*)\.(\w*)$/)!;
  if (
    method.startsWith('Get') ||
    method.startsWith('Query') ||
    method.startsWith('List')
  ) {
    //TODO: flatten nested objects as path-value pairs
    const query = new URLSearchParams(params as any).toString();
    resp = fly.get(`${mod}/${ser}/${method}?${query}`, null, config);
  } else {
    resp = fly.post(`${mod}/${ser}/${method}`, { data: params }, config);
  }

  return resp!
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
      const { data, error } = resp.data;
      if (error) {
        return Promise.reject({ status: error.code, message: error.message });
      }
      resp.data = data;
      return resp;
    }) as any;
}

async function dev_call<P, R>(
  endpoint: Endpoint<P, R>,
  params: P,
): Promise<{ data: R; headers: any }> {
  const token = localStorage.getItem('token');
  return fly
    .post(
      '/api/',
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
      resp.data = result;
      return resp;
    }) as any;
}

export async function call<P, R>(
  endpoint: Endpoint<P, R>,
  params: P,
): Promise<R> {
  let resp: Promise<{ data: R; headers: any }>;
  //@ts-ignore
  if (ENABLE_GATEWAY) {
    resp = gw_call(endpoint, params);
  } else if (process.env.NODE_ENV !== 'production') {
    resp = dev_call(endpoint, params);
  } else {
    alert('no call adapter');
  }
  try {
    let { data, headers } = await resp!;
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
