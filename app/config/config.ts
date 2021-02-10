import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8001/api',
      changeOrigin: true,
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes,
  fastRefresh: {},
  antd: {},
  define: {
    BUNDLE_FLAVOR: 'webapp',
  },
  ssr: {},
  exportStatic: {},
  dynamicImport: {},
});
