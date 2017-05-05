<template>
  <div class="abstract-tree" cid="abstractTree">

    <ul class="_ul">
      <li class="_li" @click="nodeClicked(node)" :_PUid="node._PUid" :PDeep="node._PDeep">
        <slot name="before"></slot>
        <strong class="_text" v-text="node[config['text']]"></strong>
        <slot name="after"></slot>
      </li>

      <abstract-tree :node="n" :config="config" @node-clicked="nodeClicked"
                     v-for="n in node[config['children']]"
      >
        <slot name="before" slot="before"></slot>
        <slot name="after" slot="after"></slot>
      </abstract-tree>
    </ul>

  </div>
</template>

<script>
  import AbstractTree from './AbstractTree.vue'
  import TreeMixin from '../mixins/treeMinxi'

  export default{
    name: 'AbstractTree',

    data () {
      return {}
    },

    mixins: [TreeMixin],

    components: { AbstractTree }
  }
</script>

<style lang="scss">
  .abstractTree {
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
