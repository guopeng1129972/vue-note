vue的虚拟DOM是改造了一个库 Snabbdom

什么是vdom?
就是普通的js对象，用来创建真实的DOM，
 为什么要使用vdom？
 创建vdom的开销要比创建真实DOM的开销要大很多，
 可以通过对比前后两次VDOM的差异，来更新真实的DOM

 2 Snabbdom 实践

 md snabbdom-demo
 cd snabbdom-demo
 yarn init -y
 yarn add parcel-bundler

什么是parcel-bundler？
 快速，零配置的 Web 应用程序打包器。
 快速打包:
自动转换: 

var snabbdom = require('snabbdom');