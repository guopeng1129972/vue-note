import functions from "../src/function";
describe("functions.js test", () => {
  test("sum(2 + 2) 等于 4", () => {
    expect(functions.sum(2, 2)).toBe(4);
  });

  test("getAuthor()返回的对象深度相等", () => {
    expect(functions.getAuthor()).toEqual(functions.getAuthor());
  });

  test("getAuthor()返回的对象内存地址不同", () => {
    expect(functions.getAuthor()).not.toBe(functions.getAuthor());
  });

  // .toEqual匹配器会递归的检查对象所有属性和属性值是否相等，
  // 所以如果要进行应用类型的比较时，请使用.toEqual匹配器而不是.toBe。

  test("getIntArray(3)返回的数组长度应该为3", () => {
    expect(functions.getIntArray(3)).toHaveLength(3);
  });
  // .toHaveLength可以很方便的用来测试字符串和数组类型的长度是否满足预期。

  test("getIntArray(3.3)应该抛出错误", () => {
    function getIntArrayWrapFn() {
      functions.getIntArray(3.3);
    }
    expect(getIntArrayWrapFn).toThrow('"getIntArray"只接受整数类型的参数');
  });

  // .toThorw可能够让我们测试被测试方法是否按照预期抛出异常，
  // 但是在使用时需要注意的是：我们必须使用一个函数将将被测试的函数做一个包装，
  // 正如上面getIntArrayWrapFn所做的那样，否则会因为函数抛出导致该断言失败。

  test('getAuthor().name应该包含"li"这个姓氏', () => {
    expect(functions.getAuthor().name).toMatch(/li/i);
  });

  // .toMatch传入一个正则表达式，它允许我们用来进行字符串类型的正则匹配。

  test("fetchUser() 可以请求到一个含有name属性值为Leanne Graham的对象", () => {
    expect.assertions(1);
    return functions.fetchUser().then((data) => {
      expect(data.name).toBe("Leanne Graham");
    });
  });

  // 上面我们调用了expect.assertions(1)，
  // 它能确保在异步的测试用例中，有一个断言会在回调函数中被执行。
  // 这在进行异步代码的测试中十分有效。

  test("fetchUser() 可以请求到一个用户名字为Leanne Graham", async () => {
    expect.assertions(1);
    const data = await functions.fetchUser();
    expect(data.name).toBe("Leanne Graham");
  });
  // 当然我们既然安装了Babel，为何不使用async和await的语法来精简我们的异步测试代码呢?
  // 但是别忘记都需要调用expect.assertions方法
});

