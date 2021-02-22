import { defineConfig } from 'umi';

//通过umi的defineConfig方法定义配置，可实现写配置时有代码提示
export default defineConfig({
  proxy:{
    '/api': {
      target: 'http://127.0.0.1:8001/api',
      changeOrigin: true,
    },
  },
  //设置node_modules目录下依赖文件的编译方式。
  nodeModulesTransform: {
    //type配置项可选all和none，默认为all，全部编译，然后可以通过exclude忽略不需要编译的依赖库，速度较慢，但可规避常见的兼容性等问题
    //none默认值编译es5-imcompatible-versions里声明的依赖，可通过exclude配置添加额外需要的，速度较快
    type: 'none',
  },
  routes:[
    {
      exact: true,
      path: '/',
      component: '@/pages',
    },
    {
      exact: true,
      path: '/add',
      component: '@/pages/Add',
    },
    {
      exact: true,
      path: '/topic',
      component: '@/pages/bbs',
    },
    {
      exact: true,
      path: '/ProjectDetail',
      component: '@/pages/ProjectDetail',
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
      path: '/team',
      component: '@/pages/team'
    },
  ],
  fastRefresh: {},
  antd: {},
  define: {
    BUNDLE_FLAVOR: 'webapp',
  },
});
