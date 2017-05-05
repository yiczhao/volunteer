<template>
  <span class="KsButton">
    <abstract :form="form" :disabled="disable" :auto-focus="autoFocus"
              :name="name" :native-type="nativeType" :mode="mode"
              :width="sizeMapper[size].width"
              :height="sizeMapper[size].height"
              :font-size="sizeMapper[size].fontSize"
              :color-normal="hueMapper[type].normal"
              :color-hover="hueMapper[type].hover"
              :color-active="hueMapper[type].active"
    >
      <ks-icon name="circle-o-notch" animate="spin" library="fa"
               :size="sizeMapper[size].fontSize" v-if="loading"
      ></ks-icon>
      <slot></slot>
    </abstract>
  </span>
</template>

<script>
  import KsIcon from '../../KsIcon'
  import Abstract from './abstract.vue'
  import baseBtnProps from '../mixins/baseBtnProps'
  import sizeMapper from '../data/sizeMapper'
  import hueMapper from '../data/hueMapper'

  export default {
    VERSION: '1.0.0',

    mixins: [baseBtnProps],

    data () {
      return {
        sizeMapper,
        hueMapper,
      }
    },

    props: {
      loading: {type: Boolean, default: false},
      type: {type: String, default: 'primary'},
      size: {type: String, default: 'normal'}
    },

    computed: {
      disable () {return this.disabled || this.loading}
    },

    components: { Abstract, KsIcon }
  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  @include b(KsButton) {
    display: inline-block;
  }
</style>
