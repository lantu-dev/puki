import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  antd: {},
  define: {
    BUNDLE_FLAVOR: 'webapp',
  },
  dynamicImport: {},
  exportStatic: {},
  fastRefresh: {},
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8001/api',
      changeOrigin: true,
    },
  },
  routes,
  ssr: {},
});
