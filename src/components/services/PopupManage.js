/**
 * @description 弹窗控制服务.
 * @summary
 *  1. 负责维护管理组件中所有弹出组件的层叠顺序
 * @author pkeros
 * @data 2017/4/20
 * @email pkeros@vip.qq.com
 */

let hasPopup = false;
let popupStack = [];
let instances = {};

const _getPopup = function () {
  let popupDom = PopupManager.popup;
  hasPopup = false;

  if (popupDom) return popupDom;

  popupDom = document.createElement('DIV');
  PopupManager.popup = popupDom;

  popupDom.addEventListener('click', function (e) {
    e.preventDefault();
    e.stopPropagation();

    PopupManager.doOnPopupClick && PopupManager.doOnPopupClick.call(this, e);
  })
};

const PopupManager = {
  popup: null,
  zIndex: 19941026,

  doOnPopupClick: function () {
    throw new TypeError('modal click handled is no defined!');
  }
};

export default class {

  static getInstance (id) {
    return instances[id];
  }

  static register (id, instance) {
    if (!id && !instances) return;

    instances[id] = instance;
  }

  static deregister (id) {
    if (!id) return;

    delete instances[id];
  }

  static nextZIndex () {
    return PopupManager.zIndex++;
  }

  static open () {

  }

  static close () {

  }

}
