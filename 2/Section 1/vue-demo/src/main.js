import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import TodoItem from "./components/TodoItem";
Vue.component('todoItem',TodoItem);
new Vue({
  render: h => h(App),
}).$mount('#app')
