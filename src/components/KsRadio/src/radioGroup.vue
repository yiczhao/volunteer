<template>
  <div class="KsRadioGroup">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    VERSION: '1.0.0',

    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  @include b (KsRadioGroup) {
    font-size: 0;

    @include b (KsBtnRadio) {
      // 中间的去除圆角
      .KsBtnAbstract {
        border-radius: 0;
      }
      // 第一个 radio button 样式
      &:first-child .KsBtnAbstract {
        border-radius: 4px 0 0 4px;
      }
      // 最后一个 radio button 样式
      &:last-child .KsBtnAbstract {
        border-radius: 0 4px 4px 0;
      }
      // 去除间隔线
      &:not(:last-child) .KsBtnAbstract {
        margin-right: -1px;
      }
    }
  }
</style>
