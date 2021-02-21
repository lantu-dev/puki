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
    path: '/login',
    component: '@/pages/auth/PhoneLogin',
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
