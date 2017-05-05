/**
 * @description dialog 对话框.
 * @author pkeros
 * @data 2017/4/20
 * @email pkeros@vip.qq.com
 */

import Dialog from './main.vue'
import ObjectUtil from '../../utils/ObjectUtil'

let KsDialog, instance, maskInstance, currentMsg, _uid = 0;
let dialogQueue = [];
let type2TitleMapper = { success: '成功', info: '信息', warn: '警告', danger: '危险' };

// 默认配置参数
let defaults = {
  showCancelBtn: false,
  cancelBtnText: '取消',
  confirmBtnText: '确定',
  container: 'body',
  mask: true,
  title: 'Title',
  content: 'Content...',
  type: 'success'
};

const install = function (Vue) {
  if (install.installed) return;

  // 实例化通知中心
  let initInstance = function () {
    let constructor = Vue.extend(Dialog);

    instance = new constructor({ el: document.createElement('div') });
    instance.show = false;
  };

  // 显示对话框队列中的下一个对话框
  let showNextDialog = function () {
    if (!instance) initInstance();

    // 是否阻塞
    if (instance.show || currentMsg || !dialogQueue.length) return;

    // 应用相关配置
    currentMsg = dialogQueue.shift();
    ObjectUtil.merge(instance, currentMsg.options);

    // 事件处理
    let { confirmCb, cancelCb } = currentMsg;
    instance.$off('confirm');
    instance.$off('cancel');
    instance.$on('confirm', function (...args) {
      let reject = confirmCb && confirmCb.apply(this, args);

      if (!reject) KsDialog.close();
    });
    instance.$on('cancel', function (...args) {
      let reject = cancelCb && cancelCb.apply(this, args);

      if (!reject) KsDialog.close();
    });

    // 创建遮罩 并 获取挂载点
    Vue.prototype.$KsMask.show(currentMsg.options);
    maskInstance = Vue.prototype.$KsMask.getInstance();

    // 要等待组件 Ready 才能获取到容器
    setTimeout(() => {
      maskInstance.$els.container.appendChild(instance.$el);

      // 在遮罩中创建对话框
      Vue.nextTick(() => { instance.show = true });
    }, 0);
  };

  /**
   * @description KsDialog 构造函数
   * @param options {Object} 配置项
   * @param confirmCb {Function} 确定回调函数
   * @param cancelCb {Function} 取消回调函数
   * @return {Object} 含有 then 方法的对象
   *
   * @constructor
   */
  KsDialog = function (options, confirmCb, cancelCb) {
    let _config = {
      id: _uid++,
      options: ObjectUtil.merge({}, defaults, KsDialog.defaults || {}, options),
      confirmCb: confirmCb,
      cancelCb: cancelCb
    };

    // 是否是直接调用
    if (!_config.options.showCancelBtn) {
      dialogQueue.push(_config);
      showNextDialog();

      return {};
    }

    const handler = function (confirmCb, cancelCb) {
      if (confirmCb && typeof confirmCb !== 'function')
        throw new TypeError('KsDialog: `confirmCb` 参数必须为一个函数!');
      if (cancelCb && typeof cancelCb !== 'function')
        throw new TypeError('KsDialog: `cancelCb` 参数必须为一个函数!');

      _config.confirmCb = confirmCb;
      _config.cancelCb = cancelCb;

      dialogQueue.push(_config);
      showNextDialog();
    };

    return { then: handler }
  };

  /**
   * @description 显示一个对话框
   * @param content {String} 显示的内容
   * @param title {String} 标题
   * @param type {String} 类型
   * @param cancel {Boolean/Function} 是否显示取消按钮, cancelCallback.
   * @param confirmCb {Function} 确定回调函数
   * @param cancelCb {Function} 取消回调函数
   * @return {Object} dialog 配置项
   */
  KsDialog.show = function (content, title, type,
                            cancel = false, confirmCb = null, cancelCb = null) {
    return KsDialog({
      content: content,
      title: title,
      type: type,
      showCancelBtn: cancel
    }, confirmCb, cancelCb);
  };

  /**
   * @description 关闭 Dialog
   */
  KsDialog.close = function () {
    instance.show = false;
    currentMsg = null;
    Vue.prototype.$KsMask.close();

    showNextDialog();
  };

  /**
   * @description 设置默认配置项
   * @param options 配置项
   */
  KsDialog.setDefaults = function (options) {
    KsDialog.defaults = ObjectUtil.merge(defaults, options);
  };

  //
  // 注册不同类型的对话框
  //
  ['success', 'info', 'warn', 'danger'].forEach(type => {
    /**
     * @description 弹出一个指定类型的对话框
     * @param content {String} 内容
     * @param title {String} 标题
     * @param cancel {Boolean/Function} 是否显示取消按钮, cancelCallback.
     * @return {Object} 含有 then 方法的对象
     */
    KsDialog[type] = function (content, title, cancel = false) {
      let _cancelIsFunc = typeof cancel === 'function';
      let _titleIsFunc = typeof title === 'function';

      let _cancel = _cancelIsFunc ? false : cancel;
      let _title = !_titleIsFunc ? title ? title : type2TitleMapper[type] : type2TitleMapper[type];
      let _confirmCb = _cancelIsFunc ? cancel : _titleIsFunc ? title : null;

      return KsDialog.show(content, _title, type, _cancel, _confirmCb, null);
    }
  });

  Vue.prototype.$KsDialog = KsDialog;
};

// automation register components.
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default { install };
