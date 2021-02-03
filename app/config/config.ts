import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  proxy: {
    '/jsonrpc': {
      target: 'http://127.0.0.1:8001/jsonrpc/',
      changeOrigin: true,
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  antd: {},
});
