<template>
<div id="app">
  {{count}}
  <br />
  {{count2}}
  <button @click="countAdd">count++</button>
  <button @click="countAdd2">count++</button>
</div>
</template>

<script>
export default {
  name: 'App',
  computed: {
    count() {
      return this.$store.state.count
    },
    count2() {
      return this.$store.getters.doubleCount
    }

  },
  methods: {
    countAdd() {
      // commit increment 到 Vuex.Store.mutations 
      return this.$store.commit('increment')
    },
    countAdd2() {
      // dispatch increment 到 Vuex.Store.actions 
      return this.$store.dispatch('increment')
    }
  }
}
</script>

<style>

</style>
