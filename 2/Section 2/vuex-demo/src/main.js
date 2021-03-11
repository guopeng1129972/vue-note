import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

Vue.use(Vuex);
Vue.config.productionTip = false

const store = new Vuex.Store({
  state: {
    count: 0,
  },
  mutations: {
    // increment 是形变量，要和commit过来的保持一致
    // state是需要管理的内容 可以是多个
    increment(state) {
      state.count++
    }
  },
  actions: {
    // dispatch 过来不能直接修改，需要commit给mutations
    increment({
      commit
    }) {
      setTimeout(() => {
        // state.count++ 不能再actions阶段直接操作state,应该提交给mutations完成
        commit('increment')
      }, 3000)
    }
  },
  getters:{
    doubleCount(state){
      return state.count * 2
    }
  }
})
new Vue({
  store,
  render: h => h(App),
}).$mount('#app')