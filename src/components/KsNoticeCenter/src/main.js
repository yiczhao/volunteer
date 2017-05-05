/**
 * @description notice center component.
 * @author pkeros
 * @data 2017/3/31
 * @email pkeros@vip.qq.com
 */

import NoticeCenter from './container.vue'
import ObjectUtil from '../../utils/ObjectUtil'

let KsNoticeCenter, noticeCenter, _uid = 0;

// 默认配置参数
let defaults = {
  closeBtn: true,
  title: 'Title',
  content: 'Content...',
  hue: 'success'
};

const install = function (Vue) {
  if (install.installed) return;

  // 实例化通知中心
  let initNoticeCenter = function () {
    let constructor = Vue.extend(NoticeCenter);

    noticeCenter = new constructor({ el: document.createElement('div') });
    noticeCenter.show = false;
    noticeCenter.$on('empty', KsNoticeCenter.clear)
  };

  /**
   * @description 通知中心构造函数
   * @param options {Object} 配置项
   * @param closeCb {Function} close 回调
   * @constructor
   */
  KsNoticeCenter = function (options, closeCb) {
    if (closeCb && typeof closeCb !== 'function')
      throw new TypeError('KsNoticeCenter: `closeCb` 参数必须为一个函数!');

    if (!noticeCenter) initNoticeCenter();
    document.body.appendChild(noticeCenter.$el);
    Vue.nextTick(() => noticeCenter.show = true);

    return {
      _uid: _uid++,
      options: ObjectUtil.merge({}, defaults, options),
      closeCb: closeCb ? closeCb : () => {}
    };
  };

  /**
   * @description 关闭当前通知中心
   */
  KsNoticeCenter.clear = function () {
    noticeCenter.show = false;
    noticeCenter.queue = [];
  };

  /**
   * @description 向通知中心投递一个信息
   * @param title {String} 标题
   * @param content {String} 内容
   * @param hue {String} 色调
   * @param delay {Number} 超时时间 单位毫秒 默认 4.5s
   * @param closeCb {Function} close 回调
   */
  KsNoticeCenter.post = function (title, content, hue, delay, closeCb) {
    // 如果没有设置 delay 参数, delay 参数位置为 closeCb 回调
    let _closeCb = null, _delay = 4500;
    if (delay && typeof delay === 'function') {
      _closeCb = delay;
    } else {
      _closeCb = closeCb;
      _delay = delay ? delay : _delay;
    }

    let msg = KsNoticeCenter({
      hue: hue ? hue : 'primary',
      title: title,
      content: content,
      delay: _delay
    }, _closeCb);

    noticeCenter.queue.push(msg);
  };

  //
  // 注册不同类型的通知函数
  //
  ['danger', 'warn', 'primary', 'success', 'info'].forEach(type => {
    /**
     * @description 向通知中心投递一个指定类型的信息
     * @param title {String} 标题
     * @param content {String} 内容
     * @param delay {Number} 超时时间 单位毫秒 默认 4.5s
     * @param closeCb {Function} close 回调
     */
    KsNoticeCenter[type] = function (title, content, delay, closeCb) {
      KsNoticeCenter.post(title, content, type, delay, closeCb)
    }
  });

  Vue.prototype.$KsNotice = KsNoticeCenter;
};

// automation register components.
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install };
