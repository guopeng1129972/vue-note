<template>
<div class="hello">
  <ul>
    <li v-for="(item,index) in lists" :key="index" @click="conData(index)" :class="{active:index==current&&current!==''}">
      {{item}}
    </li>
  </ul>
  <button type="button" @click="add(target)">add</button>
  <ul>
    <li v-for="(item,index) in target" :key="index">
      {{item}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: 'Hello',
  color: '',
  data() {
    return {
      current: '',
      target: [],
      lists: [1, 2, 3, 4, 5, 6]
    }
  },
  methods: {
    conData(index) {
      this.current = index
    },
    add() {
      if (!this.current) {
        return
      }
      this.target.push(this.lists[this.current])
      this.current = ''
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style lang="scss" scoped>
li.active {
  background-color: green;
}

a {
  color: #42b983;
}
</style>
