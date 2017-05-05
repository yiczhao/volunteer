/**
 * @description 单选按钮基础属性.
 * @author pkeros
 * @data 2017/4/18
 * @email pkeros@vip.qq.com
 */

export default {

  props: {
    value: {required: true},
    disabled: {type: Boolean, default: false},
    defChecked: {type: Boolean, default: false},
    model: {toWay: true, required: true},
    name: {default: 'KsRadioAbstract'}
  }

}
