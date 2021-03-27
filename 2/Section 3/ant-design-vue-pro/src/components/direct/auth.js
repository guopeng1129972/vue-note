import { check } from "../../utils/auth";
// vue注册全局组件
function install(Vue, options = {}) {
  // <a-icon
  // v-auth="['admin']" 调用方式
  Vue.directive(options.name || "auth", {
    inserted(el, binding) {
      if (!check(binding.value)) {
        // 如果不是admin,就删除当前组件，在 parentNode 上找 el
        el.parentNode && el.parentNode.removeChild(el);
      }
    },
  });
}

export default { install };
