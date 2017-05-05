/**
 * @description 按钮基本属性.
 * @author pkeros
 * @data 2017/4/6
 * @email pkeros@vip.qq.com
 */

export default {

  props: {
    mode: {type: String, default: 'normal'},
    form: {type: String, default: ''},
    disabled: {type: Boolean, default: false},
    autoFocus: {type: Boolean, default: false},
    name: {type: String, default: 'KSButton'},
    nativeType: {type: String, default: 'button'}
  }

}
