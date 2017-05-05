<template>
  <div v-el:reference cid="KsToolTip" style="display: inline-block;position:relative">
    <div style="display: inline-block" @click="handleShowPopper">
        <slot></slot>
    </div>

    <div transition="KsTooltipTransition" :class="className"
         v-el:popper v-show="!disabled && showPopper">
      <div v-text="content"></div>
      <slot name="content"></slot>
      <slot name="btngroup"></slot>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { VuePopper, DomUtil, StringUtil } from '../../utils'

  export default {
    name: 'KsToolTip',

    mixins: [VuePopper],

    data () {
      return {}
    },

    props: {
      className: {type: String, default: 'KsToolTip'},
      arrowClassName: {type: String, default: 'KsToolTip-arrow'},
      openDelay: {type: Number, default: 0},
      closeDelay: {type: Number, default: 0},
      disabled: Boolean,
      content: String,
      visibleArrow: {default: true},
      transition: {type: String, default: 'fade-in-linear'},
      show:Boolean,
      options: {
        default() {
          return {
            boundariesPadding: 10,
            gpuAcceleration: false
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
    watch:{
      show(val){
        this.showPopper = val
      }
    },
    created () {
      // 初始化
      Vue.transition('KsTooltipTransition', {
        afterLeave: this.doDestroy
      })
    }
  }
</script>

<style lang="scss">
  @import "../styles/tip";
</style>
