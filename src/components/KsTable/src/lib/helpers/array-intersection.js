/**
 * [exports 获取数组中的相同项]
 *   1. 利用
 * @param  {[type]} a [description]
 * @param  {[type]} b [description]
 * @return {[type]}   [description]
 */
module.exports = function(a, b) {
   var ai=0, bi=0
  var result = []

  while( ai < a.length && bi < b.length )
  {
     if      (a[ai] < b[bi] ){ ai++ }
     else if (a[ai] > b[bi] ){ bi++ }
     else {
       result.push(a[ai])
       ai++
       bi++
     }
  }

  return result

}
