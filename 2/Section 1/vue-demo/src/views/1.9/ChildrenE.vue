<template>
<div class="border2">
  <h3 v-ant-ref="c =>setChildrenRef('childrenE',c)">E节点</h3>
  
</div>
</template>

<script>
export default {
  components: {},
  inject: {
    setChildrenRef: {
      default: () => {}
    }
  }
}
</script>
