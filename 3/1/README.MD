# 1 vue.js的vdom是如何实现的

## 什么是VDOM？
虚拟的dom，不是真实的dom由js对象来描述的dom对象,
使用VDOM会比操作真实的DOM快很多，
创建VDM的开销比创建真实的DOM要小好多
- 真实的dom
```js
let element=document.querySelector('#app')
let s=''
for(var key in element){
  s +=key+','
}
console.log(s)
```
- VDOM
```js
{
  sel:"div",
  data:{},
  text:"VDOM",
  ...
}
```
## 为什么要使用VDOM？
- 当数据发生变换时，操作真实的dom没有解决，元素变化发生闪烁的问题
- VDOM的优点在于数据发生变化时，根据内部的diff算法，只改变数据发生变化的部分

### 总结 为什么要使用VDOM？
- 虚拟DOM可以维护程序的状态，跟踪上一次的状态
- 通过比较前后两次状态的差异更新真实的DOM

# snabbdom的基本使用
## 创建项目
- 打包工具为了方便使用parcel
- 创建项目，并安装parcel
```bash
mkdir snabbdom-demo
cd snabbdom-demo
yarn init -y
yarn add parcel-bundler
```
## 导入Snabbdom
VDOM库
### 安装Snabbdom
```bash
yarn add snabbdom
```
### 导入Snabbdom
```js
import {init,h,thunk} from 'snabbdom'
```

