import { defineConfig } from 'umi';

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
  routes:[
    {
      exact: true,
      path: '/',
      component: '@/pages/Index',
    },
    {
      exact: true,
      path: '/account',
      component: '@/pages/me/Account',
    },
    {
      exact: true,
      path: '/activity',
      component: '@/pages/me/Activity',
    },
    {
      exact: true,
      path: '/add',
      component: '@/pages/Add',
    },
    {
      exact: true,
      path: '/contact',
      component: '@/pages/me/Contact',
    },
    {
      exact: true,
      path: '/identify',
      component: '@/pages/me/Identify',
    },
    {
      exact: true,
      path: '/info',
      component: '@/pages/me/Index',
    },
    {
      exact: true,
      path: '/auth/phone-login',
      component: '@/pages/auth/phone-login',
    },
    {
      exact: true,
      path: '/auth/register',
      component: '@/pages/auth/register',
    },
    {
      exact: true,
      path: '/setting',
      component: '@/pages/me/Setting',
    },
    {
      exact: true,
      path: '/test',
      component: '@/pages/Test',
    },
    {
      exact: true,
      path: '/topic',
      component: '@/pages/bbs/Index',
    },
    {
      exact: true,
      path: '/team',
      component: '@/pages/team',
    },
    {
      exact: true,
      path: '/team/CreateCompetition',
      component: '@/pages/team/pages/CreateCompetition',
    },
    {
      exact: true,
      path: '/team/CreateCompetitionType',
      component: '@/pages/team/pages/CreateCompetitionType',
    },
    {
      exact: true,
      path: '/team/ProjectDetail',
      component: '@/pages/team/pages/ProjectDetail',
    },
  ],
  ssr: {},
});
