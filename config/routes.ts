/*
 * @Author: li
 * @Date: 2022-01-13 15:47:16
 * @LastEditors: li
 * @LastEditTime: 2022-01-14 09:28:38
 * @Description:
 */
export default [
  {
    path: '/',
    component: '@/pages/layouts/index',
    routes: [
      { path: '/', redirect: '/accountStatement' },
      { path: '/home', title: '首页', component: '@/pages/home' }, // 首页
      {
        path: '/accountStatement',
        title: '对账单',
        component: '@/pages/AccountStatement/AccountStatement',
      },
      {
        path: '/accountStatementIno',
        title: '对账单详情',
        component: '@/pages/AccountStatement/AccountStatementIno',
      },
      {
        path: '/accountDetail',
        title: '交易详情',
        component: '@/pages/AccountStatement/AccountStatementInoDetail',
      },
      { component: '@/pages/404' },
    ],
  },
  { component: '@/pages/404' },
];
