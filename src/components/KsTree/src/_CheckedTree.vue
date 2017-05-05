<template>
  <div class="checked-tree-inner" cid="checkedTreeInner">

    <ul class="_ul">
      <li class="_li" @click="nodeClicked(node)"
          :_PUid="node._PUid" :PDeep="node._PDeep" :_PPath="node._PPath">
        <span class="operation" @click="open = !open">
          <slot name="shut" v-if="!decorate && open && node[config['children']]['length']">[-]</slot>
          <slot name="open" v-if="!decorate && !open && node[config['children']]['length']">[+]</slot>
          <slot name="end" v-if="!decorate && !node[config['children']]['length']">[=]</slot>
        </span>
        <ks-checkbox :name="node._PPath">{{node[config['text']]}}</ks-checkbox>
      </li>

      <checked-tree :node="n" :config="config" v-show="open"
                    v-for="n in node[config['children']]"
                    @node-clicked="nodeClicked"
      >
        <slot name="shut" slot="shut">[-]</slot>
        <slot name="open" slot="open">[+]</slot>
        <slot name="end" slot="end">[=]</slot>
      </checked-tree>
    </ul>

  </div>
</template>

<script>
  import CheckedTree from './_CheckedTree.vue'
  import TreeMixin from '../mixins/treeMinxi'

  export default{
    name: 'CheckedTree',

    data () {
      return {
        open: true,
      }
    },

    props: {
      decorate: {type: Boolean, default: 'false'}
    },

    mixins: [TreeMixin],

    components: { CheckedTree }
  }
</script>

<style lang="scss">
  .checkedTreeInner {
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
