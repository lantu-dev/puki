import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  base: process.env.PUBLIC_PATH || '/',
  define: {
    BUNDLE_FLAVOR: 'webapp',
    ENABLE_GATEWAY: process.env.ENABLE_GATEWAY || false,
  },
  dynamicImport: {},
  exportStatic: {},
  fastRefresh: {},
  mock: false,
  nodeModulesTransform: {
    type: 'none',
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:8001/api',
      changeOrigin: true,
    },
    '/puki/dev/api': {
      target: 'http://127.0.0.1:3000/',
      changeOrigin: true,
    },
  },
  publicPath: (process.env.PUBLIC_PATH || '') + '/',
  routes,
  ssr: {},
});
