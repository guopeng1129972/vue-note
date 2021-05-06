import { effect } from "./index";
// rootComponent ==>App
export default function createApp(rootComponent) {
  // 需要返回的就是app实例，就是之前const 的App实例内容
  return {
    mount(rootContainer) {
      const content = rootComponent.setup();
      // reset
      rootContainer.textContent = "";
      // effect
      effect(() => {
        const view = rootComponent.render(content);
        rootContainer.append(view);
      });
    },
  };
}
