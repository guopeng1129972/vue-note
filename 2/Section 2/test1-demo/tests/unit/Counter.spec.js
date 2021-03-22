import { mount } from '@vue/test-utils';
import Counter from '@/components/Counter.vue';
import sinon from 'sinon'
describe('Counter.vue', () => {
  // 引入sinon的一个定义
  let change = sinon.spy();
  // wrapper 用到很多的时候 提出去写
  const wrapper = mount(Counter, {
    // listeners: 官方示例. 多了的话用sinon
    listeners: {
      change
    }
  });
  //测试是否被渲染
  it('renders counter html', () => {
    // toMatchSnapshot对应生成快照
    expect(wrapper.html()).toMatchSnapshot();
  });
  // 测试是单击 成功
  it('count++', () => {
    const button = wrapper.find('button');
    button.trigger('click');
    expect(wrapper.vm.count).toBe(1);
    // expect(isCalled).toBe(true);
    expect(change.called).toBe(true);
    button.trigger('click');
    expect(change.callCount).toBe(2);
  });
});
