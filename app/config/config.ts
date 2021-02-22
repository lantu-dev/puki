import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  base: process.env.PUBLIC_PATH || '/',
  define: {
    BUNDLE_FLAVOR: 'webapp',
  },
  dynamicImport: {},
  exportStatic: {},
  fastRefresh: {},
  // mock: {},
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8001/api',
      changeOrigin: true,
    },
    '/puki/dev/api': {
      target: 'http://127.0.0.1:3000/puki/dev/api',
      changeOrigin: true,
    },
  },
  publicPath: process.env.PUBLIC_PATH || '/',
  routes,
  ssr: {},
});
