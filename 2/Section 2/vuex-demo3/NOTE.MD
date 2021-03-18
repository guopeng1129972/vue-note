# 第二章：生态篇 (13讲)

# 21 | Vuex最佳实践
## 核心概念
- State
this.$store.state.xxx  mapState取值
- Getters
this.$store.getters.xxx mapGetters取值®
- Mutation
this.$store.commit("xxx") mapMutations赋值
- Actions
this.$store.dispatch("xxx") mapActions赋值
- Module
## 使用常量代替Mutation事件类型

- api/shop.js
模仿后台请求到数据
- components/ProductList.vue
- components/ShoppingCart.vue
两个自定义组件
使用mapState,mapGetters的方式获取绑定数据事件
使用mapState 获取state中的内容，以此类推
```js
    ...mapState({
      checkoutStatus:state=>state.cart.checkoutStatus
    }),
    ...mapGetters('cart',{
      products:"cartProducts",
      total:"cartTotalPrice"
    })
```
- store/index.js
store的入口文件，引入两个组件的store文件
- store/modules/cart.js
- store/modules/products.js
两个组件的store, export  state,getters,actions,mutations 的方法
```js
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
```
- store/mutation-types.js
定义了一些mutation的变量，这样的好处在于比较规范
## 问题：扩展购物车示例，提供单次添加1-N的数量到购物车的功能


