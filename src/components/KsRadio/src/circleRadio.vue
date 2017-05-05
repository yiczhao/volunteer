<template>
  <div class="KsCircleRadio" :style="{opacity: disabled ? '0.6' : '1'}">
    <abstract :name="name" :value="value" :disabled="disabled"
              :model.sync="model" :def-checked="defChecked"
    >
      <div class="KsCircleRadio__dotContainer" slot="dot">
        <div class="KsCircleRadio__dotInner"
             :style="{backgroundColor: model === value ? color : 'white'}"></div>
      </div>

      <slot slot="label">Label...</slot>
    </abstract>
  </div>
</template>

<script>
  import Abstract from './abstract.vue'
  import baseProps from '../mixins/baseRadioProps'

  export default {
    VERSION: '1.0.0',

    mixins: [baseProps],

    data () {
      return {}
    },

    props: {
      color: {type: String, default: '#00A5E0'}
    },

    components: { Abstract }
  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  $dotSize: 18px;                         // 选择点点大小

  @include b (KsCircleRadio) {
    display: inline-block;

    @include e (dotContainer) {
      @include size (18px);

      position: relative;
      display: inline-block;
      border: 1px solid #D0D0D5;
      border-radius: 50%;
      vertical-align: middle;
    }

    @include e (dotInner) {
      @include size ($dotSize / 1.8);
      @include center-translate();

      border-radius: 50%;
    }
  }
</style>
