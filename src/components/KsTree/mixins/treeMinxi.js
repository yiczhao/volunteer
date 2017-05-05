/**
 * @description 树的复合.
 * @author pkeros
 * @data 2017/3/30
 * @email pkeros@vip.qq.com
 */

export default {
  methods: {
    /**
     * @description 节点被点击
     * @param node {Object} 当前节点对象
     */
    nodeClicked (node) { this.$emit('node-clicked', node) }
  },

  props: {
    node: {type: Object, required: true},
    config: {type: Object, default() { return {text: 'name', children: 'children'} }}
  }
}
