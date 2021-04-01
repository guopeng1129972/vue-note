import Vue from "vue";
import Antd from "ant-design-vue";
import Icon from "ant-design-vue/lib/icon";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "ant-design-vue/dist/antd.less";
// import "ant-design-vue/lib/button/style"
import Authorized from "./components/Authorized";
import Auth from "./components/direct/auth";
Vue.config.productionTip = false;
// 全局注册 Antd
Vue.use(Antd);
Vue.use(Icon);
Vue.use(Auth);
Vue.component("Authorized", Authorized);

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2458558_7itrbjh30kn.js", // 在 iconfont.cn 上生成
});

Vue.component("IconFont", IconFont);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
