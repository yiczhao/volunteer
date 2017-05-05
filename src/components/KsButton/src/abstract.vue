<template>
  <span :class="'KsBtnAbstract--UID-' + _uid">

    <!-- 普通按钮 -->
    <template v-if="mode === 'normal'">
      <style type="text/css">#normalStyle{}</style>
    </template>
    <!-- 幽灵按钮 -->
    <template v-if="mode === 'ghost'">
      <style type="text/css">#ghostStyle{}</style>
    </template>

    <button :type="nativeType" :autofocus="autoFocus" :name="name" v-if="truth"
            :disabled="disabled" :form="form" :style="style"
            class="KsBtnAbstract" :class="{'KsBtnAbstract--disabled': disabled}"
            :id="'KsBtnAbstract--UID-' + _uid"
    >
      <slot></slot>
    </button>

    <a :disabled="disabled" :style="style" v-if="!truth"
       class="KsBtnAbstract" :class="{'KsBtnAbstract--disabled': disabled}"
       :id="'KsBtnAbstract--UID-' + _uid"
    >
      <slot></slot>
    </a>
  </span>
</template>

<script>
  import baseBtnProps from '../mixins/baseBtnProps'
  import * as styles from '../data/styles'

  export default {
    VERSION: '1.0.0',

    mixins: [baseBtnProps],

    data () {
      return {}
    },

    props: {
      width: {type: String, require: true},
      height: {type: String, require: true},
      fontSize: {type: String, default: '14px'},
      truth: {type: Boolean, default: true},
      colorNormal: { type: String, require: true },
      colorHover: { type: String, require: true },
      colorActive: { type: String, require: true }
    },

    init () {
      // TODO 在编译之前插入样式，webpack -p 的时候会压缩样式，将差值表达式取消
      this.$options.template = this.$options.template.replace('#normalStyle{}', styles.normal)
                                                      .replace('#ghostStyle{}', styles.ghost);
    },

    computed: {
      style () {return `min-width: ${this.width}; height: ${this.height};
     font-size: ${this.fontSize}; line-height: ${!this.truth && this.height}`}
    }

  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  @include b (KsBtnAbstract) {
    min-width: 90px; outline: none;
    border: 1px solid transparent; border-radius: 3px;
    padding: 3px 18px; display: inline-block;
    white-space: nowrap; text-align: center;
    cursor: pointer; -webkit-user-drag: none;
    touch-action: manipulation; user-select: none;

    // 禁用状态
    @include m (disabled) {
      opacity: .6; cursor: not-allowed;
    }
  }
</style>
