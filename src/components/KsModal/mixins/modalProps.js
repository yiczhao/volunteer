/**
 * @description modal 的复合
 * @author: pkeros.
 * @date: 2016/10/18.
 */

export default {
  props: {
    showConfirmBtn: {type: Boolean, default: true},
    showCancelBtn: {type: Boolean, default: true},
    showCloseBtn: {type: Boolean, default: true},
    cancelBtnText: {type: String, default: '取消'},
    confirmBtnText: {type: String, default: '确定'},
    title: {type: String, default: ''},
    content: {type: String, default: ''},
    type: {type: String, default: 'normal'},
    width: {type: String, default: '504'},
    mask: {type: Boolean, default: true},
    show: {type: Boolean, default: true, towWay: true}
  }
}
