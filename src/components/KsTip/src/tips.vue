<template>
  <div cid="KsToolTip" style="display: inline-block;position:relative">
    <ks-popup-abstract :class-name="className" :arrow-class-name="arrowClassName"
                           :disabled="disable" :content="content"
                           :visible-arrow="visibleArrow" :transition="transition"
                           :options="options" :show-popper.sync="showPopper"
    >
      <!-- 弹出依靠 -->
      <div class="container" @click="handleShowPopper">
        <slot></slot>
      </div>
      <!-- 弹出内容部分 -->
      <slot name="content" slot="content"></slot>
    </ks-popup-abstract>
  </div>
</template>

<script>
  import KsPopupAbstract from './abstract.vue'

  export default {
    VERSION: '1.0.0',

    name: 'KsToolTip',

    data () {
      return {
        showPopper: false
      }
    },

    props: {
      className: {type: String, default: 'KsToolTip'},
      arrowClassName: {type: String, default: 'KsToolTip-arrow'},
      openDelay: {type: Number, default: 0},
      closeDelay: {type: Number, default: 0},
      disabled: Boolean,
      content: String,
      show:Boolean,
      visibleArrow: {default: true},
      transition: {type: String, default: 'fade-in-linear'},
      options: {
        default() {
          return {
            boundariesPadding: 10,
            gpuAcceleration: true
          }
        }
      }
    },

    methods: {
      handleShowPopper() {
        this.timeout = setTimeout(() => {
          this.showPopper = !this.showPopper;
          this.show =  this.showPopper
          this.$emit('change',this.show)
        }, this.openDelay);
      },
    },

    components: { KsPopupAbstract }

  }
</script>

<style lang="scss">
  @import "../styles/index";
</style>
