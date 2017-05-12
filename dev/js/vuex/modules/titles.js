/**
 * @author: zjh.
 * @date: 2017/3/14.
 */
import { CHANGE_TITLE } from '../title-types'
// initial state
const state = {
  titles: '',
  crumbsList:[]
}

export const mutations = {
  [CHANGE_TITLE] (state,{router_tile,router_type}) {
    state.titles = router_tile;
    state.crumbsList=router_type;
  },
}

export default {
  state,mutations
}
