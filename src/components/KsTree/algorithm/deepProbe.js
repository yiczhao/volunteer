/**
 * @description 探测树的深度.
 * @author pkeros
 * @data 2017/3/30
 * @email pkeros@vip.qq.com
 */

let _deepMax = 0;
let _count = 0;

export default function deepProbe (tree, childrenField, deep = 0, path = '') {
  let _path = `${path}-${deep++}|${_count++}`;

  tree['_PDeep'] = deep;
  tree['_PUid'] = _count;
  tree['_PPath'] = _path;
  []['concat'](tree[childrenField])['forEach'](node => {
    deepProbe(node, childrenField, deep, _path)
  });
  _deepMax = _deepMax < deep ? deep : _deepMax;
}
