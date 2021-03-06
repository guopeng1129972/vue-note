const currentAuth = ["admin"];
export { currentAuth };
export function getCurrentAuthority() {
  // 模拟获取当前用户
  return currentAuth;
}
export function check(authority) {
  // 检查当前用户是否有权限
  const current = getCurrentAuthority();
  return current.some((item) => authority.includes(item));
}

export function isLogin() {
  // 检查当前用户是否登录
  const current = getCurrentAuthority();
  console.log(current);
  return current && current[0] !== "guest";
}
