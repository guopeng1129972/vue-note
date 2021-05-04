let foo = function (...args) {
  const target = (...arg1s) => foo(...[...args, ...arg1s]);
  target.getValue = () => args.reduce((n, p) => n + p, 0);
  return target;
};

var f1 = foo(1, 2, 3);
f1.getValue(); //6
var f2 = foo(1)(2, 3);
f2.getValue(); //6
var f3 = foo(1)(2)(3)(4);
f3.getValue(); //10

// 实现对象的 Map 函数类似 Array.prototype.map

function foo(args) {
  let sum = 0;
  if (args.length > 1) {
    for (let i = 0; i < args.length; i++) {
      sum += i;
    }
    return foo();
  }
}
