<template>
  <i :class="classes" :style="styles"></i>
</template>

<script>
  // 对应图标库对应 class 的映射
  const libraryMapper = {
    ks: 'icon',
    fa: 'fa'
  };

  export default {
    VERSION: '1.0.0',

    data () {
      return {}
    },

    computed: {
      classes () {
        let prefix = libraryMapper[this.library];

        return `${prefix} ${prefix}-${this.name} fa-${this.size}
                fa-rotate-${this.rotate} fa-${this.animate}`;
      },

      styles () {
        return `font-size: ${this.size}`;
      }
    },

    props: {
      library: {type: String, default: 'ks'},
      name: {type: String, required: true},
      size: {type: String, default: '2x'},
      rotate: {type: String, default: 'normal'},
      animate: {type: String, default: 'stop'}
    }
  }
</script>

<style lang="scss">
  /*@import "../styles/icons";
  @import "../styles/index.css";

  @import "../../foundation/Font-Awesome-master/css/font-awesome.min.css";*/
</style>
