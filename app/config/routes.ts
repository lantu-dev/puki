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
    path: '/team/CreateCompetition',
    component: '@/pages/team/pages/CreateCompetition',
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
    path: '/homepage/Homepage',
    component: '@/pages/homepage/Homepage',
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
];
