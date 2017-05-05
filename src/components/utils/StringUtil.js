/**
 * @description 操作字符串的工具方法.
 * @author pkeros
 * @data 2017/3/31
 * @email pkeros@vip.qq.com
 */

/**
 * @description 字符串首字母大写
 * @param str 字符串
 * @return {string} 首字母大写的字符串
 */
let firstUpperCase = function (str) {
  return str.replace(/\b(\w)(\w*)/g, function($0, $1, $2) {
    return $1.toUpperCase() + $2.toLowerCase()
  })
};

export default {
  firstUpperCase
}
