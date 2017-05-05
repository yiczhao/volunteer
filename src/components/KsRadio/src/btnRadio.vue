<template>
  <div :class="'KsBtnRadio KsBtnRadio--UID-' + _uid">
    <abstract :name="name" :value="value" :disabled="disabled"
              :model.sync="model" :def-checked="defChecked"
    >
      <ks-button-abstract slot="label" :truth="false"
                          :width="width" :height="height"
                          :disabled="disabled"
                          :color-hover="color"
                          :color-normal="color"
                          :color-active="color"
                          :mode="model === value ? 'normal' : 'ghost'">
        <slot></slot>
      </ks-button-abstract>
    </abstract>
  </div>
</template>

<script>
  import Abstract from './abstract.vue'
  import { KsButtonAbstract } from '../../KsButton'
  import baseProps from '../mixins/baseRadioProps'

  export default {
    VERSION: '1.0.0',

    mixins: [baseProps],

    data () {
      return {}
    },

    props: {
      color: {type: String, default: '#008FE1'},
      width: {type: String, default: '26px'},
      height: {type: String, default: '27PX'}
    },

    components: { Abstract, KsButtonAbstract }
  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  @include b (KsBtnRadio) {
    display: inline-block;

    @include e (text) {
      position: relative; display: inline-block;
      min-width: 42px;
      padding: 8px 10px; border: 1px solid #D0D0D5;
      text-align: center;
      user-select: none; cursor: pointer;
    }
  }
</style>
