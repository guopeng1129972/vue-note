<template>
<li>
  <slot name='pre-icon' :value=value></slot>
  <span class="red" v-if="!del">{{title}}</span>
  <span v-else style='text-decoration:line-through;'>{{title}}</span>
  <slot name='suf-icon'>😊</slot>
  <button v-show="!del" @click.stop="handleClick">删除</button>
</li>
</template>

<script>
export default {
  props: {
    title: String,
    del: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      value: Math.random()
    }
  },
  methods: {
    handleClick() {
      console.log('click del button')
      this.$emit('delete', this.title)
    }
  },
}
</script>
<style scoped>
.red{
  color: red;
}
</style>
