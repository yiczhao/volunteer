/**
 * @description 操作对象的工具方法.
 * @author pkeros
 * @data 2017/3/31
 * @email pkeros@vip.qq.com
 */

/**
 * @description 合并选项
 * @param target 需要合并的目标
 * @return {*} 目标
 */
let merge = function(target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i];
    for (let prop in source) {
      if (source.hasOwnProperty(prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value
        }
      }
    }
  }

  return target;
};

export default {
  merge
}
