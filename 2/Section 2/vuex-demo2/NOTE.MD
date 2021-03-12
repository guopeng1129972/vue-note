# 20 | Vuex核心概念及底层原理
## 核心概念
- State
this.$store.state.xxx 取值
- Getters
this.$store.getters.xxx 取值
- Mutation
this.$store.commit("xxx") 赋值
- Actions
this.$store.dispatch("xxx") 赋值
- Module
## 底层原理
- State
提供一个响应式数据
- Getters
借助Vue的计算属性computed来实现缓存
- Mutation
更改state的方法
- Actions
触发Mutation的方法，异步修改state的方法(通过调用Mutation)
- Module
Vue.set 动态添加state到响应式数据中的

## 实现一个简易的vuex核心的内容是什么？
### min-vuex.js 
- 1.解构赋值获取options(state,mutations)
- 2.绑定当前this._vm(实例化一个Vue)
>
```js
 this._vm = new Vue({
    data: {
      $$state: state
    },
  })
  this._mutations = mutations
```
- 3.绑定commit的方法
```js
Store.prototype.commit = function (type, payload) {
  if (this._mutations[type]) {
    this._mutations[type](this.state, payload)
  }
}
```
- 4.代理 Store.prototype.state的get方法，让他指向真实的数据(this._vm._data.$$state)
```js
Object.defineProperties(Store.prototype, {
  state: {
    get: function () {
      return this._vm._data.$$state
    }
  }
})
```
## 问题 扩展简化版的min-vuex,实现getters,并实现vuex的方式注入$store