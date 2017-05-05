<template>
  <div class="ks-checkbox-group">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'KsCheckboxGroup',

    props: {
      vModel: {type: Array, towWay: true}
    },

    events: {
      /**
       * @description change 事件处理函数
       * @param value {Boolean} 事件传递的 value
       * @param name {String} 组件的名称
       * @summary 负责处理子组件产生的 change 事件
       */
      CChange (value, name) {
        let model = this.vModel;
        let pos = model.indexOf(name);

        if (pos > -1 && !value) {
          model.splice(pos, 1)
        } else if (pos === -1 && value) {
          model.push(name)
        }

        // TODO: 柱哥说了数据的流向要单向
        this.$emit('model-change', model);
        this.$emit('node-change', name, value);
      }
    },

    watch: {
      /**
       * @description model 监听器
       * @param model {Array} model 属性值
       */
      vModel (model) {
        this.$broadcast('modelChange', model);
      }
    },

    ready () {
      // 通知子组件初始化状态
      this.$broadcast('modelChange', this.vModel);
    }
  }
</script>

<style lang="scss">
  .ks-checkbox-group { font-size: 0 }
</style>
