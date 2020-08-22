commit 1
vuex 状态管理
view->Actions->State
如何使用vuex?
1.定义Store文件
2.引用vuex
Vue.use(Vuex)
3.定义
state 就是状态
mutations 就是改变状态的函数 方法
store.commit('aaa') 就可以理解为给store说这块有一个状态需要改变
