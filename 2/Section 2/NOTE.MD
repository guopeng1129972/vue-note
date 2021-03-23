@@ -1,46 +0,0 @@
# 第二章：生态篇 (13讲)

# 18 | 为什么需要Vuex
## 什么是Vuex？
vue的状态管理机制
>Vuex原理 也是一个单向的一个数据流：
Vuex 提供数据 `State` 来驱动我们的视图（`Vue Components`）的渲染（`Render`），
然后再通过视图派发（ `Dispatch` ）我们的 `Action` ，
我们在 `Action` 中可以进一步的进行一些异步的操作，譬如我们通过 `Ajax` 
去后端去获取一些我们想要的一些后端的一些数据。
然后我们通过 `commit` 的形式将 `Action` 提交给我们的 `Mutations` ，
最后由 `Mutations` 处理完毕后，再来最终更改我们的 `State`中的数据，如此循环。

![Vuex运行机制](/img/2.jpg)
## 为什么需要状态管理？
项目中在很多地方需要一份数据的时候，需要同步更新
## vue有哪些状态管理机制可以实现？
- 在共同的父组件上提供公用数据
层层传递，这样不行的，项目非常脆弱
- provide/inject 
在顶层 provide 在子组件inject，这样避免了层层传递,不是动态绑定
- Vuex 比较全面
  - 动态注册响应式数据
  - 命名空间管理数据
  - 通过插件记录数据的修改 方便调试
![Vuex运行机制](/img/1.jpg)
## 问题
### Vuex是通过什么方式提供响应式数据的？


# 20 | Vuex核心概念及底层原理

* [Vuex核心概念及底层原理](/vuex-demo2/NOTE.MD)
# 21 | Vuex最佳实践
## 核心概念
- State
this.$store.state.xxx  mapState取值
- Getters
this.$store.getters.xxx mapGetters取值
- Mutation
this.$store.commit("xxx") mapMutations赋值
- Actions
this.$store.dispatch("xxx") mapActions赋值
- Module
## 使用常量代替Mutation事件类型
![使用常量代替Mutation事件类型](/img/3.jpg)

# 26 | UI组件库对比：Element UI、Ant Design Vue、iView
![常用的组件库](/img/4.jpg)

# 27 | 提升开发效率和体验的常用工具：ESLint、Prettier、vue-devtools
## 1.Vetur
>- 语法高亮
>- 标签补全、模板生成
>- Lint 检查
>- 格式化
## 2.ESlint
>- 代码规范
>- 错误检查
## Prettier 
>- 代码美化
## 3.vue-devtools
>- 集成Vuex
>- 可远程调试
>- 性能分析

# 28 | 单元测试的重要性及其使用
## 重要性
>- 保证研发质量
>- 提高项目的稳定性
>- 提高开发速度
## 使用方式(用的jest)
>- jest 或mocha 
>- @vue/test-utils
>- sinon


# 29 | 生态篇习题解答（上）

## 1.Vuex是通过什么方式提供响应式数据的？
>- 创建了一个Vue实例来动态
new Vue({})
## 2.扩展简化版的min-vuex,实现getters,并实现vuex的方式注入$store
>- 计算属性computed实现getters缓存
>- beforeCreate 中混入$Store的获取方式
```js
// for [key,fn] of  Object.entries(getters) 遍历标准用法 Object.entries() 将对象中的键值对返回成一个数组；
for (let [key, fn] of Object.entries(getters)) {
  computed[key] = function () { return fn(store.state, store.getters); };
  // defineProperties 方法直接在一个对象上定义 一个或多个 新的属性或修改现有属性
  Object.defineProperties(store.getters, key, {
    get: function () { return store._vm[key]; },
  });
}
```
>- install是use之后会触发的内容
## 3. 扩展购物车示例，提供单次添加1-N的数量到购物车的功能
## 4. SPA 的缺点有哪些，如何解决？
>- 不利于SEO（在一个页面上跳转）
>- 首屏渲染时间长(做成强制刷新)
## 5. 对于动态内容，如果不使用SSR,如何做SEO?
>- 使用无头浏览器，渲染数据