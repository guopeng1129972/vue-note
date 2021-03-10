<template>
<div id="nav">
  <template v-for="{key,name} in list">
    <div :key="key" style="paddind:10px 0">
      <router-link :to="`/${key}`">{{name}}章节</router-link>
    </div>
  </template>
</div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      list: [{
          key: "1.7",
          name: '指令的本质是什么？',
        }, {
          key: "1.8",
          name: 'provie/inject',
        },
        {
          key: "1.9",
          name: '如何优雅的获取跨层级组件实例',
        },
        {
          key: "1.10",
          name: 'template 和 JSX 对比及其他们的本质',
        }
      ]
    }
  }
}
</script>

<style lang="less">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
