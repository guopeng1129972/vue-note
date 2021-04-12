# Vue 从无到有的思想精髓

## keep-alive

### 1. keep-alive 的作用

缓存组件，缓存路由

### 2. keep-alive 如何缓存？

以队列的形式缓存在内存之中

### 3. keep-alive 缓存的是什么？

缓存的是 vnode =>就是虚拟DOM

### 4. keep-alive 有什么注意点？

因为在内存中缓存，所以如果过大就会导致内存泄漏，所以`需要有缓存数量的限制`

### 5. keep-alive 使用什么机制缓存?
LRU

# 第一节课 
## 1. vue runtime + complier
## 2. vue 在浏览器渲染一帧的解析机制
## 3. vue 的首屏优化
# 第二节课
## 1. vue到小程序端的渲染
## 2. vue数据绑定的理解
# 第三节课
## 1. vue3 数据双向绑定
## 2. vue dom diff 的优化