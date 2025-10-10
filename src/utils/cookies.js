import Cookies from "js-cookie";
// options 对象可以包含以下属性：
// {
//   expires: 7,           // 过期时间（天数）
//   path: '/',            // cookie 路径
//   domain: '.example.com', // 域名
//   secure: false,         // 是否只在 HTTPS 下传输
//   sameSite: 'strict'    // SameSite 策略
// }
// 获取 cookie
export function getCookie(name) {
  return Cookies.get(name);
}

// 设置 cookie
export function setCookie(name, value, options = {}) {
  return Cookies.set(name, value, options);
}

// 删除 cookie
export function removeCookie(name, options = {}) {
  return Cookies.remove(name, options);
}

// 检查 cookie 是否存在
export function hasCookie(name) {
  return Cookies.get(name) !== undefined;
}