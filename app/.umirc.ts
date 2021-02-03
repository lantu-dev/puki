// @ts-ignore
import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig =  {
  proxy: {
    '/jsonrpc': {
      'target': 'http://127.0.0.1:8001/jsonrpc/',
      'changeOrigin': true,
    },
  },
  treeShaking: true,
  routes: [
    {
      path: '/',
      component: '../layouts/index',
      routes: [
        { path: '/', component: '../pages/index' },
        { path: '/a', component: '../pages/a' },
      ]
    }
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: false,
      dva: false,
      dynamicImport: false,
      title: 'puki',
      dll: false,

      routes: {
        exclude: [
          /components\//,
        ],
      },
    }],
  ],
}

export default config;
