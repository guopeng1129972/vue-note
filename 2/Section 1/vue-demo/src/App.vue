<template>
<div id="app">
  <input v-model="message">
  <input :value="message" @input="handleChange">
  {{message}}
  <div :id="message"></div>
  <todo-list>
    <todo-item @delete="handleDelete" v-for="item in list" :key='item.title' :title="item.title" :del="item.del">
      <template v-slot:pre-icon="{value}">
        <span>前置标签{{value}}</span>
      </template>
      <!-- <template v-slot:suf-icon>
          <span>后置标签</span>
        </template> -->
    </todo-item>
  </todo-list>
</div>
</template>

<script>
import TodoList from "./components/TodoList";
import TodoItem from "./components/TodoItem";

export default {
  name: "App",
  components: {
    TodoItem,
    TodoList
  },
  data() {
    return {
      message: "hello vue",
      list: [{
          title: "课程1",
          del: false,
        },
        {
          title: "课程2",
          del: true,
        },
      ],
    };
  },
  methods: {
    handleDelete(value) {
      this.$emit('update:title')
      console.log('handleDelete', value)
    },
    handleChange(e) {
      this.message = e.target.value;
    }
  }
};
</script>
