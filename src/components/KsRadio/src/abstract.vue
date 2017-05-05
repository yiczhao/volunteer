<template>
  <div :class="'KsRadioAbstract KsRadioAbstract--UID-' + _uid">
    <input type="radio" class="KsRadioAbstract__entity" :id="Id" :name="name"
           :checked="defChecked" :value="value" :disabled="disabled"
           v-model="model"
    >

    <label class="KsRadioAbstract__dot" :for="Id">
      <slot name="dot"></slot>
    </label>

    <label class="KsRadioAbstract__label" :for="Id">
      <slot name="label"></slot>
    </label>
  </div>
</template>

<script>
  import baseProps from '../mixins/baseRadioProps'

  export default {
    VERSION: '1.0.0',

    mixins: [baseProps],

    data () {
      return {}
    },

    computed: {
      /**
       * @return {string}
       */
      Id () { return `KsRadioAbstract__entity--UID-${this._uid}` }
    }
  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  @include b (KsRadioAbstract) {
    vertical-align: middle;

    & > label { display: inline-block }

    @include e (label) {
      vertical-align: middle;
      font-size: 13px;
    }

    @include e (entity) {
      @include size (0);

      display: none;
      opacity: 0;
    }
  }
</style>
