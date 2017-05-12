/**
 * @author: pkeros.
 * @date: 2016/6/6.
 * @mail: pkeros@vip.qq.com
 * @see: https://www.github.com/pkeros/
 */

import Vue from 'vue'
import Vuex from 'vuex'
import ajax from './modules/ajax'
import titles from './modules/titles'
import showMenu from './modules/show-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: Vue.config.debug,
  modules: {
    ajax,titles,showMenu
  }
})
