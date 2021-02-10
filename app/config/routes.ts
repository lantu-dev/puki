export default [
  {
    exact: true,
    path: '/',
    component: '@/pages/index',
  },
  {
    exact: true,
    path: '/add',
    component: '@/pages/add',
  },
  {
    exact: true,
    path: '/topic',
    component: '@/pages/bbs/Index',
  },
  {
    exact: true,
    path: '/login',
    component: '@/pages/auth/PhoneLogin',
  },
];
