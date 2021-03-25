import Vue from "vue";
import Antd from "ant-design-vue"
// import Button from "ant-design-vue/lib/button"
import App from "./App.vue";
import router from "./router";
import store from "./store";
import 'ant-design-vue/dist/antd.less'
// import "ant-design-vue/lib/button/style"

Vue.config.productionTip = false;
// 全局注册 Antd
Vue.use(Antd);
// Vue.use(Button);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
