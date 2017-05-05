/**
 * @description mask 遮罩
 * @author: pkeros.
 * @date: 2016/10/21.
 */

import Mask from './main.vue'
import ObjectUtil from '../../utils/ObjectUtil'

let KsMask, instance, currentMask, _uid = 0;
let maskQueue = [];

let defaults = {
  backgroundColor: 'rgba(0, 0, 0, .3)'
};

const install = function (Vue) {
  if (install.installed) return;

  // 实例化通知中心
  let initInstance = function () {
    let constructor = Vue.extend(Mask);

    instance = new constructor({ el: document.createElement('div') });
    instance.show = false;
  };

  // 显示对话框队列中的下一个对话框
  let showNextMask = function () {
    if (!instance) initInstance();

    // 是否阻塞
    if (instance.show || currentMask || !maskQueue.length) return;

    // 应用相关配置
    currentMask = maskQueue.shift();
    ObjectUtil.merge(instance, currentMask.options);


    document.body.appendChild(instance.$el);
    Vue.nextTick(() => instance.show = true);
  };

  /**
   * @description 构造函数
   * @param options {Object} 配置项
   * @return {Object} mask 配置项
   *
   * @constructor
   */
  KsMask = function (options) {
    let _config = {
      id: _uid++,
      options: ObjectUtil.merge({}, defaults, KsMask.defaults || {}, options)
    };

    maskQueue.push(_config);
    showNextMask();
    return _config
  };

  /**
   * @description 显示一个对话框
   * @param options {Object} 配置项
   * @return {Object} mask 配置项
   */
  KsMask.show = function (options) {
    return KsMask(options);
  };

  /**
   * @description 获取实例
   * @return {Object} mask 实例
   */
  KsMask.getInstance = function () {
    return instance;
  };

  /**
   * @description 关闭 mask
   */
  KsMask.close = function () {
    instance.show = false;
    currentMask = null;

    showNextMask();
  };

  Vue.prototype.$KsMask = KsMask;
};

// automation register components.
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install }
