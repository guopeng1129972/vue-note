<template>
<div class="border">
  <h1>A节点</h1>
  <button @click="getEle">获取E节点 h3 ref</button>
  <ChildrenB />
  <ChildrenC />
  <ChildrenD />
</div>
</template>

<script>
import ChildrenB from './ChildrenB'
import ChildrenC from './ChildrenC'
import ChildrenD from './ChildrenD'
export default {
  components: {
    ChildrenB,
    ChildrenC,
    ChildrenD
  },
  provide() {
    return {
      setChildrenRef:(name,ref)=>{
        this[name]=ref;
      },
      getChildrenRef:name=>{
        return this[name];
      },
      getRef:()=>{
        return this;
      }
    }
  },
  data() {
    return {
     color:'blue'
    }
  },
  methods: {
    getEle() {
     console.log(this.childrenE)
    }
  }
}
</script>
