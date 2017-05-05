<template>
  <div class="KsDialog">
    <abstract v-if="show">
      <aside class="KsDialog__icon" slot="icon" :style="{color: typeMapper[type].hue}">
        <ks-icon :name="typeMapper[type].icon"></ks-icon>
      </aside>

      <aside class="KsDialog__article" slot="article">
        <h3 class="KsDialog__title" v-text="title"></h3>
        <p class="KsDialog__content" v-text="content"></p>
      </aside>

      <aside class="KsDialog__operation" slot="operation">
        <ks-button type="other" mode="ghost" style="margin-right: 12px"
                   v-if="showCancelBtn" @click="$emit('cancel')"
        >
          {{cancelBtnText}}
        </ks-button>
        <ks-button :type="type" @click="$emit('confirm')">
          {{confirmBtnText}}
        </ks-button>
      </aside>
    </abstract>
  </div>
</template>

<script>
  import typeMapper from '../data/typeMapper'
  import Abstract from './abstract.vue'
  import KsIcon from '../../KsIcon'
  import { KsButton } from '../../KsButton'

  export default {
    VERSION: '1.0.1',

    data () {
      return {
        typeMapper
      }
    },

    props: {
      show: {type: Boolean, default: false},
      showCancelBtn: {type: Boolean, default: false},
      cancelBtnText: {type: String, default: '取消'},
      confirmBtnText: {type: String, default: '确定'},
      title: {type: String, default: 'Title'},
      content: {type: String, default: 'Content...'},
      type: {type: String, default: 'success'}
    },

    components: { Abstract, KsButton, KsIcon }

  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  $icon-size: 88px;                                                       // 图标大小

  @include b (KsDialog) {

    // 标题部分
    @include e (title) {
      margin: 0; padding: 20px;
      font-size: 20px;
      word-wrap: break-word;
    }

    // 图标部分
    @include e (icon) {
      @include size($icon-size);

      padding: 20px; border: 5px solid;
      text-align: center; line-height: $icon-size;
      border-radius: 50%; margin: auto;

      .icon { font-size: $icon-size / 2; line-height: inherit }
    }

    // 内容块
    @include e (article) {
      text-align: center;
    }
    @include e (content) {
      color: #444; font-size: 13px;
      line-height: 22px; padding: 0 20px;
      word-wrap: break-word;
    }

    // 操作区域
    @include e (operation) {
      overflow: hidden; padding: 20px 0;
      text-align: center;
    }

  }
</style>
