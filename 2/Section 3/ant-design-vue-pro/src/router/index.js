import Vue from "vue";
import VueRouter from "vue-router";
import Nprogress from "nprogress";
import "nprogress/nprogress.css"
import NotFound from "../views/404.vue";



Vue.use(VueRouter);

const routes = [
  {
    path: '/user',
    component: () => import(/* webpackChunkName: "layout" */  "../layouts/UserLayout.vue"),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */  "../views/User/Login.vue")
      },
      {
        path: '/user/register',
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue"),
      }
    ]
  },
  {
    path: '/',
    component: () => import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      //dashboard
      {
        path: "/",
        redirect: '/dashboard/analysis'
      },
      {
        path: '/dashboard',
        name: "dashboard",
        component: { render: h => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            component: () => import(/* webpackChunkName: "Dashboard" */ "../views/Dashboard/Analysis.vue"),
          }
        ]
      },
      // form
      {
        path: '/form',
        name: "form",
        component: { render: h => h("router-view") },
        children: [
          {
            path: '/form',
            redirect: '/form/basic-form',
          },
          {
            path: "/form/basic-form",
            name: "basicform",
            component: () => import(/* webpackChunkName: "Froms" */ "../views/Froms/BasicForm.vue"),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            component: () => import(/* webpackChunkName: "Froms" */ "../views/Froms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info"
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () => import(/* webpackChunkName: "Froms" */ "../views/Froms/StepForm/Step1.vue"),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () => import(/* webpackChunkName: "Froms" */ "../views/Froms/StepForm/Step2.vue"),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () => import(/* webpackChunkName: "Froms" */ "../views/Froms/StepForm/Step3.vue"),
              }
            ]
          }
        ]
      },
    ]
  },
  {
    path: "*",
    name: "404",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});
router.beforeEach((to, from, next) => {
  // 添加判断，如果是当前页面的路由修改，不触发进度条
  if(to.path!=from.path){
    Nprogress.start()
  }
  next()
});
router.afterEach(() => {
  Nprogress.done()
})

export default router;
