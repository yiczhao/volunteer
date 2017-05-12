/**
 * @author: pkeros.
 * @date: 2016/6/7.
 * @mail: pkeros@vip.qq.com
 * @see: https://www.github.com/pkeros/
 */

import { AJAX_REQUEST, AJAX_RESPONSE,AJAX_ERROR,AJAX_SUCCESS } from '../mutation-types'

// initial state
const state = {
  waitRequest: 0,
  showFlag:false,
  imgType:500
}

export const mutations = {
  [AJAX_ERROR] (state,imgType) { state.showFlag = true;state.imgType = imgType  },
  [AJAX_SUCCESS] (state) {state.showFlag = false },
  [AJAX_REQUEST] (state) { state.waitRequest += 1 },
  [AJAX_RESPONSE] (state) { state.waitRequest -= 1 }
}

export default {
  state,
  mutations
}
