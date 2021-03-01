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
    path: '/events/entered-for',
    component: '@/pages/events/EnteredFor',
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
    path: '/me/contact',
    component: '@/pages/me/Contact',
  },
  {
    exact: true,
    path: '/me/identify',
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
    path: '/topic',
    component: '@/pages/bbs/Index',
  },
  {
    exact: true,
    path: '/login',
    component: '@/pages/home/Login',
  },
  {
    exact: true,
    path: '/community',
    component: '@/pages/community/Community',
  },
];
