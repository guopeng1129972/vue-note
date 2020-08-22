<template>
<div class="home">
  <p>this is page info</p>
  <button type="button" @click="add()">点击添加</button>
  <p>{{msg}}</p>
</div>
</template>

<script>
// @ is an alias to /src
// import Hello from '@/components/Hello.vue';
import store from '@/store'

export default {
  name:'Info',
  data(){
    return{
    msg:store.state.count
  }},
  methods:{
    add(){
      console.log('add Event from info!')
      store.commit('addCount')
    }
  }
};
</script>
