<template>
 <a-tabs>
   <a-tab-pane key="zhiling" tab="内置指令">
     <neizhi />
   </a-tab-pane>
   <a-tab-pane key="zidingyi" tab="自定义指令">
     <zidingyi />
   </a-tab-pane>
 </a-tabs>
</template>

<script>
import neizhi from './neizhizhiling'
import zidingyi from './waizhizhiling'
export default {
  components:{
    neizhi,
    zidingyi
  }
}
</script>