<script>
import { check } from "../utils/auth";
export default {
  functional: true,
  props: {
    authority: {
      type: Array,
      required: true,
    },
  },
  render(h, context) {
    // 解构 context 提取 props, scopedSlots
    const { props, scopedSlots } = context;
    // 返回当前check的结果，如果为true 则渲染 scopedSlots.default() 否则 不动
    return check(props.authority) ? scopedSlots.default() : null;
  },
};
</script>

<style></style>
