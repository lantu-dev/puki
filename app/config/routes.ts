export default [
  {
    exact: true,
    path: '/',
    component: '@/pages/Index',
  },
  {
    exact: true,
    path: '/add',
    component: '@/pages/Add',
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
];
