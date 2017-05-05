<template>
  <div class="noticeCenterItem" :style="{background: hueMapper[hue]['background'], color: hueMapper[hue]['fontColor']}">
    <h3 class="noticeCenterItem__title">
      <strong>{{{title}}}</strong>
      <i class="noticeCenterItem__close" @click="$emit('close')" v-if="closeBtn">
        <!-- close 图标 -->
        <ks-icon name="cuowutubiao" size="13px"></ks-icon>
      </i>
    </h3>
    <p class="noticeCenterItem__content">{{{content}}}</p>
  </div>
</template>

<script>
  /**
   * @description 色调映射
   * @type {{}}
   */
  let hueMapper = {
    danger: { background: '#EF5350', fontColor: '#FFF' },
    warn: { background: '#FF7043', fontColor: '#FFF' },
    primary: { background: '#2196f3', fontColor: '#FFF' },
    success: { background: '#66BB6A', fontColor: '#FFF' },
    info: { background: '#26C6DA', fontColor: '#FFF' }
  };

  export default{
    VERSION: '1.0.0',

    data () {
      return {
        hueMapper
      }
    },

    props: {
      id: {type: Number, default: -1},
      closeBtn: {type: Boolean, default: true},
      delay: {type: Number, default: 4500},
      hue: {type: String, default: 'primary'},
      title: {type: String, default: 'title'},
      content: {type: String, default: 'content...'}
    },

    created () {
      setTimeout(() => this.$emit('close', this.id), this.delay);
    }
  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  $width: 300px;                                 // 提示信息框的长度

  @include b (noticeCenterItem) {
    position: relative; width: $width; min-height: 80px;
    box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
    border-radius: 3px; padding: 6px;
    box-sizing: border-box;
    word-wrap: break-word;

    // 标题
    @include e (title) { padding-right: 18px }

    // close 按钮
    @include e (close) {
      position: absolute; right: 6px; top: 6px;
      text-align: center; line-height: 13px;
      cursor: pointer;
    }
  }
</style>
