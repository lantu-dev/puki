import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  define: {
    BUNDLE_FLAVOR: 'webapp',
  },
  publicPath: process.env.PUBLIC_PATH || '/',
  base: process.env.PUBLIC_PATH || '/',
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
    '/puki/dev/api': {
      target: 'http://127.0.0.1:3000/puki/dev/api',
      changeOrigin: true,
    },
  },
  routes,
  ssr: {},
});
