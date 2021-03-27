import Vue from "vue";
import VueRouter from "vue-router";
import findLast from "lodash/findLast";
import { notification } from "ant-design-vue";
import Nprogress from "nprogress";
import "nprogress/nprogress.css";
import NotFound from "../views/403.vue";
import Forbidden from "../views/404.vue";
import { check, isLogin } from "../utils/auth";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err);
};

const routes = [
  {
    path: "/user",
    hideInMenu: true,
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/UserLayout.vue"),
    children: [
      {
        path: "/user",
        redirect: "/user/login",
      },
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login.vue"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register.vue"),
      },
    ],
  },
  {
    path: "/",
    meta: { authority: ["user", "admin"] },
    component: () =>
      import(/* webpackChunkName: "layout" */ "../layouts/BasicLayout.vue"),
    children: [
      //dashboard
      {
        path: "/",
        redirect: "/dashboard/analysis",
      },
      {
        path: "/dashboard",
        name: "dashboard",
        meta: { icon: "dashboard", title: "仪表盘" },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/dashboard/analysis",
            name: "analysis",
            meta: { title: "分析页" },
            component: () =>
              import(
                /* webpackChunkName: "Dashboard" */ "../views/Dashboard/Analysis.vue"
              ),
          },
        ],
      },
      // form
      {
        path: "/form",
        name: "form",
        meta: { icon: "form", title: "表单", authority: ["admin"] },
        component: { render: (h) => h("router-view") },
        children: [
          {
            path: "/form",
            redirect: "/form/basic-form",
          },
          {
            path: "/form/basic-form",
            name: "basicform",
            meta: { title: "基础表单" },
            component: () =>
              import(
                /* webpackChunkName: "Forms" */ "../views/Forms/BasicForm.vue"
              ),
          },
          {
            path: "/form/step-form",
            name: "stepform",
            hideChildrenMenu: true,
            meta: { title: "分布表单" },
            component: () =>
              import(/* webpackChunkName: "Forms" */ "../views/Forms/StepForm"),
            children: [
              {
                path: "/form/step-form",
                redirect: "/form/step-form/info",
              },
              {
                path: "/form/step-form/info",
                name: "info",
                component: () =>
                  import(
                    /* webpackChunkName: "Forms" */ "../views/Forms/StepForm/Step1.vue"
                  ),
              },
              {
                path: "/form/step-form/confirm",
                name: "confirm",
                component: () =>
                  import(
                    /* webpackChunkName: "Forms" */ "../views/Forms/StepForm/Step2.vue"
                  ),
              },
              {
                path: "/form/step-form/result",
                name: "result",
                component: () =>
                  import(
                    /* webpackChunkName: "Forms" */ "../views/Forms/StepForm/Step3.vue"
                  ),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "、403",
    name: "403",
    hideInMenu: true,
    component: Forbidden,
  },
  {
    path: "*",
    name: "404",
    hideInMenu: true,
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
  if (to.path !== from.path) {
    Nprogress.start();
  }
  const record = findLast(to.matched, (record) => record.meta.authority);
  if (record && !check(record.meta.authority)) {
    if (!isLogin && to.path !== "/user/login") {
      next({ path: "/user/login" });
    } else if (to.path !== "/403") {
      notification.error({
        message: "403",
        description: "没有权限，请联系管理员",
      });
      next({ path: "/403" });
    }
    Nprogress.done();
  }
  next();
});
router.afterEach(() => {
  Nprogress.done();
});

export default router;
