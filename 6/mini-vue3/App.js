import { reactive } from "./core/index";
export default {
  //template->render
  render(context) {
    // reset操作 不要，让组件来做
    // document.querySelector("#app").textContent = "";
    const div = document.createElement("div");
    div.textContent = context.state.count;
    // p1 p2 的例子start
    const p = document.createElement("p");
    p.textContent = "p1";
    div.append(p);
    const p2 = document.createElement("p");
    p2.textContent = "p2 -------" + context.state.count;
    div.append(p2);
    // p1 p2 的例子end

    return div;
    // 让组件来做  append
    // document.querySelector("#app").append(div);
  },
  setup() {
    const state = reactive({
      count: 1,
    });
    window.state = state;
    return {
      state,
    };
  },
};
