<template>
  <div v-el:reference style="display: inline-block">
    <!-- 内容 -->
    <slot></slot>
    <div :class="className" v-el:popper v-show="!disabled && showPopper">
          <strong v-text="content"></strong>
          <slot name="content"></slot>
          <div class="txtr mb-20">
              <input type="button" class="btn-dark-light mr-10" value="取消">
              <input type="button" class="btn-primary" value="完成">             
          </div>
    </div>
  </div>
</template>

<script>
  import VuePopper from '../../utils/Popper'

  export default {
    VERSION: '1.0.0',

    name: 'KsPopupAbstract',

    mixins: [VuePopper],

    data () {
      return {}
    },

    props: {
      className: {type: String, default: 'KsPopupAbstract'},
      arrowClassName: {type: String, default: 'KsPopupAbstract-arrow'},
      disabled: Boolean,
      content: String,
      visibleArrow: {default: true},
      transition: {type: String, default: 'fade-in-linear'},
      options: {
        default() {
          return {
            boundariesPadding: 10,
            gpuAcceleration: false
          }
        }
      }
    }

  }
</script>
