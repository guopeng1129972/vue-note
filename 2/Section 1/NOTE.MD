笔记
1 先写一个组件
vue 中
```html
    <ul>
      <li v-for="item in list">
        <span v-if="!item.del">{{item.title}}</span>
        <span v-else style='text-decoration:line-through;'>{{item.title}}</span>
        <button v-show="!item.del">删除</button>
      </li>
    </ul>
```
2 将写死的组件转换成独立的组件
如果传入的属性没有指定挂载在谁上，会默认挂载到temple的根节点上(试了一下 报错了)
```html
  <ul>
      <todo-list v-for="item in list" :title="item.title" :del="item.del" :data-someth="a"></todo-list>
    </ul>
```
通过 Vue.component 注册事件 绑定的名字是不能重复
```js
 Vue.component('todo-list', {
    props: {
      title: String,
      del: {
        type: Boolean,
        default: false
      }
    },
    template: `
    <li>
        <span v-if="!del">{{title}}</span>
        <span v-else style='text-decoration:line-through;'>{{title}}</span>
        <button v-show="!del">删除</button>
      </li>
      `
  })
```