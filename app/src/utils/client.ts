import { CallOptions, Endpoint } from '@/backend';
import { message } from 'antd';

export async function setToken(token: string) {
  localStorage.setItem('token', token);
}

export function hasLogged() {
  return !!localStorage.getItem('token');
}

export function getDeviceId(): number {
  const did = parseInt(localStorage.getItem('did') || '', 10);
  if (!did) {
    localStorage.setItem('did', Math.ceil(Math.random() * 256).toString());
    return getDeviceId();
  }
  return did;
}

let _session_id = 0;

export function getSessionId(): number {
  if (_session_id != 0) {
    return _session_id;
  }
  const did = getDeviceId();
  let sessionCount =
    (parseInt(localStorage.getItem('scnt') || '', 10) || 0) + 1;
  if (sessionCount > 255) {
    sessionCount = 1;
  }
  localStorage.setItem('scnt', sessionCount.toString());
  _session_id = (did << 8) + sessionCount;
  return _session_id;
}

//@ts-ignore
const prefix = typeof PUBLIC_PATH === 'string' ? PUBLIC_PATH + '..' : '/';

let _req_counter = 0;

export async function call<P, R>(
  endpoint: Endpoint<P, R>,
  params: P,
  options: CallOptions = {},
): Promise<R> {
  //@ts-ignore
  const url = new URL(`${prefix}/api/${endpoint}`, document.location);
  const fetchOptions = {
    method: '',
    body: undefined as any,
    headers: {} as Record<string, string>,
  };

  const reqId = (getSessionId() << 8) + _req_counter++;
  fetchOptions.headers['x-request-id'] = reqId.toString();

  if (options.get) {
    fetchOptions.method = 'GET';

    Object.keys(params).forEach((key) =>
      // @ts-ignore
      url.searchParams.append(key, params[key]),
    );
  } else {
    fetchOptions.method = 'POST';
    fetchOptions.headers['content-type'] = 'application/json';
    fetchOptions.body = JSON.stringify(params);
  }

  if (typeof options.credential === 'string') {
    fetchOptions.headers['authorization'] = options?.credential;
  } else {
    const token = localStorage.getItem('token');
    if (token && ('credential' in options ? options.credential : true)) {
      fetchOptions.headers['authorization'] = token;
    }
  }

  let resp = await fetch(url.href, fetchOptions as any);

  if (resp.ok) {
    const XHDR_SET_AUTH = 'x-set-authorization';
    if (fetchOptions.method === 'POST') {
      if (resp.headers.has(XHDR_SET_AUTH)) {
        setToken(resp.headers.get(XHDR_SET_AUTH)!);
      }
    }

    let body: {
      Ok?: boolean;
      ID: string;
      Data?: R;
      Error?: { Kind: string; Message: string };
    } = await resp.json();
    if (!body || !('Ok' in body)) {
      message.error({ content: '服务异常，请稍后重试。' });
    }
    if (body.Ok) {
      console.log(`call(${body.ID}) ${endpoint} ok.`);
      return body.Data!;
    } else {
      console.log(
        `call(${body.ID}) ${endpoint} error. ${body.Error?.Kind}:${body.Error?.Message}`,
      );
      message.error({ content: `${body.Error?.Message}` });
      return Promise.reject(body.Error?.Kind);
    }
  } else {
    message.error({ content: `网络错误: ${resp.statusText}` });
    return Promise.reject(resp.status);
  }
}
