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
    path: '/topic',
    component: '@/pages/bbs/Index',
  },
  {
    exact: true,
    path: '/login',
    component: '@/pages/auth/PhoneLogin',
  },
];
