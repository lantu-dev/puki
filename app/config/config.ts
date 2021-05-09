import { defineConfig } from 'umi';
import routes from './routes';

const publicPath = (process.env.PUBLIC_PATH || '') + '/';
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
    '/md': {
      target: 'https://cdn-file.blueprint.org.cn/',
      changeOrigin: true,
      pathRewrite: { '^/md': '' },
    }
  },
  publicPath: publicPath,
  routes,
  ssr: {
    devServerRender: false,
  },
  hash: true,
});
