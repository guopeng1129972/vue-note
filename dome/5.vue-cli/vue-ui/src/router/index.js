import Vue from 'vue';
import VueRouter from 'vue-router';
import Add from '../views/Add.vue';
import Info from '../views/Info.vue';

Vue.use(VueRouter);
const routes = [
  {
    path: '/add',
    name: 'add',
    component: Add,
  },
  {
    path: '/info',
    name: 'info',
    component: Info,
  },
  {
    path: '/',
    name: 'login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
  },
  {
    path: '/home',
    name: 'home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    children: [
      {
        path: 'list',
        name: 'list',
        component: () => import(/* webpackChunkName: "user" */ '../views/List.vue'),
      },
      {
        path: 'user',
        name: 'user',
        component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  routes,
});

export default router;
