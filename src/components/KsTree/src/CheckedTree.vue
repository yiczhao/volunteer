<template>
  <div class="checked-tree" cid="checkedTree">

    {{vModel | json}}

    <ks-checkbox-group :v-model="model" @node-change="treeChangeHandle">
      <checked-tree :node="node" :config="config"></checked-tree>
    </ks-checkbox-group>

  </div>
</template>

<script>
  import CheckedTree from './_CheckedTree.vue'
  import TreeMixin from '../mixins/treeMinxi'
  import { flatTree, deepProbe } from '../algorithm'

  let selectMode = [
    'normal',                           // 不进行快捷选中
    'toUp',                             // 向上选中
    'toDown',                           // 向下选中
    'toWay',                            // 双向选中
    'level'                             // 同层级选中
  ];

  export default{

    data () {
      return {
        model: [],
        flat: [],
        flatObj: []
      }
    },

    props: {
      mode: {type: String, default: 'normal'},
      vModel: {type: Object, required: true, toWay: true}
    },

    mixins: [TreeMixin],

    methods: {
      /**
       * @description 树选中改变事件处理函数
       * @param name {String} 节点名
       * @param value {Boolean} 选中还是取消
       */
      treeChangeHandle (name, value) {
        let result = this.mode === 'normal' ? [] : this[`${this.mode}Select`](name, value);

        this.vModel = this.flatObj.filter(({ _PPath: path }) => ~this.model.indexOf(path));
        this.model = result.filter(id => ~result.indexOf(id)).concat(value ? this.model : []);
      },

      /**
       * @description 同等级选中
       * @param name {String} 当前发生改变的节点
       * @param value {Boolean} 当前节点选中还是取消
       */
      levelSelect (name, value) {
        return (value ? this.flat : this.model).filter(id => {
          return value ? (id.split('|').length === name.split('|').length)
            : (id.split('|').length !== name.split('|').length);
        });
      },

      /**
       * @description 向下选中
       * @param name {String} 当前发生改变的节点
       * @param value {Boolean} 当前节点选中还是取消
       */
      toDownSelect (name, value) {
        return (value ? this.flat : this.model).filter(id => {
          return value ? (~id.indexOf(name)) : (!~id.indexOf(name));
        });
      },

      /**
       * @description 向上选中
       * @param name {String} 当前发生改变的节点
       * @param value {Boolean} 当前节点选中还是取消
       */
      toUpSelect (name, value) {
        return (value ? this.flat : this.model).filter(id => {
          return value ? (~name.indexOf(id)) : (!~name.indexOf(id));
        });
      },

      /**
       * @description 双向选中
       * @param name {String} 当前发生改变的节点
       * @param value {Boolean} 当前节点选中还是取消
       */
      toWaySelect (name, value) {
        return this.toDownSelect(name, value).concat(this.toUpSelect(name, value));
      },
    },

    created () {
      deepProbe(this.node, this.config['children']);
      this.flatObj = flatTree(this.node, this.config['children']);
      this.flat = this.flatObj.map(({_PPath}) => _PPath);
    },

    components: { CheckedTree }
  }
</script>

<style lang="scss">
  .checkedTree {

  }
</style>
