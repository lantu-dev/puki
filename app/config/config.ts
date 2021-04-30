import { defineConfig } from 'umi';
import routes from './routes';

const publicPath = './';
export default defineConfig({
  base: publicPath,
  define: {
    PUBLIC_PATH: publicPath,
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
      pathRewrite: { '^/api': '' },
    },
    '/puki/dev/api': {
      target: 'http://127.0.0.1:3000/',
      changeOrigin: true,
    },
  },
  history: { type: 'hash' },
  publicPath: publicPath,
  routes,
  // ssr: {
  //   devServerRender: false,
  // },
  hash: true,
});
