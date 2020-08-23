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

commit 2
调试方法
1 vue Chrome插件
2 console.log()/error() alert() debuger
3 引用cdn 绑定this 就可以在console下访问了
比如 var app=new Vue()
或者在组件中
  mounted(){
    window.vue=this;
  },
commit 3
集成vue
1.下载git 一些git命令，先不看了

单页面demo1

安装调试
yarn global add @vue/cli-service-global
vue serve Hello.vue

点击列表内容 然后添加到一个新的列表中去


