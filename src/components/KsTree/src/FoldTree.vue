<template>
  <div class="fold-tree" cid="foldTree">

    <ul class="_ul">
      <li class="_li" @click="nodeClicked(node)" :_PUid="node._PUid" :PDeep="node._PDeep">
        <span class="operation" @click="open = !open" slot="item">
          <slot name="shut" v-if="!decorate && open && node[config['children']]['length']">[-]</slot>
          <slot name="open" v-if="!decorate && !open && node[config['children']]['length']">[+]</slot>
          <slot name="end" v-if="!decorate && !node[config['children']]['length']">[=]</slot>
        </span>
        <strong class="_text" v-text="node[config['text']]"></strong>
      </li>

      <fold-tree :node="n" :config="config" v-show="open"
                 v-for="n in node[config['children']]"
                 @node-clicked="nodeClicked"
      >
        <slot name="shut" slot="shut">[-]</slot>
        <slot name="open" slot="open">[+]</slot>
        <slot name="end" slot="end">[=]</slot>
      </fold-tree>
    </ul>

  </div>
</template>

<script>
  import FoldTree from './FoldTree.vue'
  import TreeMixin from '../mixins/treeMinxi'

  export default{
    name: 'FoldTree',

    data () {
      return {
        open: true,                                // 是否展开子组件
      }
    },

    mixins: [TreeMixin],

    components: { FoldTree }
  }
</script>

<style lang="scss">
  .foldTree {
    _ul {
      margin-left: 20px;
      _li {
        cursor: pointer;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
    }
  }
</style>
