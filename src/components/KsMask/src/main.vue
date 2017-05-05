<template>
  <div class="KsMask">
    <div class="KsMask__wrapper" :style="maskStyle" v-if="show">
      <div class="KsMask__container" :style="containerStyle"
           v-el:container @click="$emit('spaceClick')"
      >
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    VERSION: '1.0.0',

    data () {
      return {
        zIndex: 19940921
      }
    },

    props: {
      fillMode: {type: String, default: 'full'},
      show: {type: Boolean, default: false},
      containerStyle: {type: String, default: ''},
      backgroundColor: {type: String, default: 'rgba(0, 0, 0, .3)'}
    },

    computed: {
      /**
       * @description mask sytles.
       */
      maskStyle () {
        return `background: ${ this.backgroundColor };
        z-index: ${ ++this.zIndex };
        position: ${ this.fillMode === 'full' ? 'fixed' : 'absolute' }`
      }
    }
  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  @include b (KsMask) {

    @include e (wrapper) {
      top: 0; right: 0; bottom: 0; left: 0;
    }

    @include e (container) {
      position: absolute;
      top: 0; right: 0; bottom: 0; left: 0;
    }
  }
</style>
