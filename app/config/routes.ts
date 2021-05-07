import { Component } from 'react';
export default [
  {
    exact: true,
    path: '/',
    component: '@/pages/Index',
  },
  {
    exact: true,
    path: '/auth/phone-login',
    component: '@/pages/auth/phone-login/Index',
  },
  {
    exact: true,
    wrappers: ['@/wrappers/EnsureLogged'],
    path: '/auth/register',
    component: '@/pages/auth/Register',
  },
  {
    exact: true,
    path: '/events',
    component: '@/pages/events/Index',
  },
  {
    exact: true,
    path: '/events/enrolled',
    component: '@/pages/events/Enrolled',
  },
  {
    exact: true,
    path: '/events/more-info',
    component: '@/pages/events/MoreInfo',
  },
  {
    exact: true,
    path: '/events/questions',
    component: '@/pages/events/Questions',
  },
  {
    exact: true,
    path: '/me',
    component: '@/pages/me/Index',
  },
  {
    exact: true,
    path: '/me/account',
    component: '@/pages/me/Account',
  },
  {
    exact: true,
    path: '/me/events',
    component: '@/pages/me/Events',
  },
  {
    exact: true,
    path: '/me/identify',
    wrappers: ['@/wrappers/EnsureLogged'],
    component: '@/pages/me/Identify',
  },
  {
    exact: true,
    path: '/me/setting',
    component: '@/pages/me/Setting',
  },
  {
    exact: true,
    path: '/test',
    component: '@/pages/Test',
  },
  {
    exact: true,
    path: '/team',
    component: '@/pages/team/Index',
  },
  {
    exact: true,
    path: '/team/ProjectDetail',
    component: '@/pages/team/component/ProjectDetail',
  },
  {
    exact: true,
    path: '/team/CreateCompetition',
    component: '@/pages/team/pages/CreateCompetition',
  },
  {
    exact: true,
    path: '/team/ManageProject',
    component: '@/pages/team/pages/ManageProject',
  },
  {
    exact: true,
    path: '/team/CreatePositionTemplate',
    component: '@/pages/team/pages/CreatePositionTemplate',
  },
  {
    exact: true,
    path: '/team/CreateCompetitionType',
    component: '@/pages/team/pages/CreateCompetitionType',
  },
  {
    exact: true,
    path: '/bbs',
    wrappers: ['@/wrappers/EnsureLogged'],
    component: '@/pages/bbs/Nodes',
  },
  {
    exact: true,
    path: '/bbs/node',
    component: '@/pages/bbs/Node',
  },
  {
    exact: true,
    path: '/bbs/thread',
    component: '@/pages/bbs/Thread',
  },
  {
    exact: true,
    path: '/QingNianDaXueXi',
    component: '@/pages/QianQing/QingNianDaXueXi',
  },
  {
    exact: true,
    path: '/SanHuiLiangZhi',
    component: '@/pages/QianQing/SanHuiLiangZhi',
  },
  {
    exact: true,
    path: '/community/Community',
    component: '@/pages/community/Community',
  },
  {
    exact: true,
    path: '/homepage/Login',
    component: '@/pages/homepage/Login',
  },
  {
    exact: true,
    path: '/homepage/AboutUs',
    component: '@/pages/homepage/AboutUs',
  },
  {
    exact: true,
    path: '/homepage/index',
    component: '@/pages/homepage/Main',
  },
  {
    exact: true,
    path: '/homepage/pagelist',
    component: '@/pages/homepage/pagelist',
  },
  {
    exact: true,
    path: '/homepage/:name',
    component: '@/pages/MarkDownPages/[MarkDownPages]',
  },
  {
    exact: true,
    path: '/studyBuild',
    component: '@/pages/QianQing/studyBuild',
  },
  {
    exact: true,
    path: '/classBuild',
    component: '@/pages/QianQing/classBuild',
  },
  {
    exact: true,
    path: '/BasicInfo',
    component: '@/pages/QianQing/BasicInfo',
  },
  {
    exact: true,
    path: '/LeagueConstruction',
    component: '@/pages/QianQing/LeagueConstruction',
  },
  {
    exact: true,
    path: '/PublishNewActivity',
    component: '@/pages/QianQing/PublishNewActivity',
  },
  {
    path: '/qian-qing',
    component: '@/pages/QianQing/_layout',
    routes: [
      {
        path: '/qian-qing/notification',
        component: '@/pages/QianQing/QingNian',
        name: '通知',
      },
      {
        path: '/qian-qing/class',
        name: '班级建设',
        routes: [
          {
            path: '/qian-qing/class/basic',
            name: '团支部基本信息',
            routes: [
              {
                path: '/qian-qing/class/basic/info',
                component: '@/pages/QianQing/BasicInfo',
                name: '基本信息',
              },
              {
                path: '/qian-qing/class/basic/LeagueConstruction',
                component: '@/pages/QianQing/LeagueConstruction',
                name: '党团建设',
              },
              {
                path: '/qian-qing/class/basic/classConstruction',
                component: '@/pages/QianQing/classBuild',
                name: '班级建设',
              },
              {
                path: '/qian-qing/class/basic/studyConstruction',
                component: '@/pages/QianQing/studyBuild',
                name: '学风建设',
              },
              {
                path: '/qian-qing/class/basic/studyConstruction',
                component: '@/pages/QianQing/tuanyuanInfo',
                name: '团员基本信息',
              },
            ],
          },
          {
            path: '/qian-qing/class/workLog',
            name: '团支部工作记录',
            routes: [
              {
                path: '/qian-qing/class/workLog/big-study',
                component: '@/pages/QianQing/QingNianDaXueXi',
                name: '青年大学习',
              },
              {
                path: '/qian-qing/class/workLog/3m2s1l',
                component: '@/pages/QianQing/SanHuiLiangZhi',
                name: '三会两制一课',
              },
            ],
          },
        ],
      },
      {
        path: '/qian-qing/search',
        component: '@/pages/QianQing/search',
        name: '搜索',
      },
    ],
  },
];
