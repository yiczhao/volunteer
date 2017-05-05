/**
 * @description 扁平化树.
 * @author pkeros
 * @data 2017/3/30
 * @email pkeros@vip.qq.com
 */

let array = [];

export default function flatTree (tree, childrenField) {
  array.push(tree);
  []['concat'](tree[childrenField])['forEach'](node => flatTree(node, childrenField));
  return array;
}
