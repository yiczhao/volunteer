
// initial state
const state = {
  menuShow: [
    {isshow:true},
    {isshow:false},
    {isshow:true},
    {isshow:false},
    {isshow:false},
    {isshow:false},
    {isshow:true}
  ]
}

export const mutations = {
  ['SHOW_MENU'] (state,index) {
    state.menuShow[index].isshow = !state.menuShow[index].isshow
  },
}

export default {
  state,
  mutations
}
