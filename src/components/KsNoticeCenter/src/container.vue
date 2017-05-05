<template>
  <div class="notice-center-container">
    <ul class="noticeCenterContainer" v-if="show">
      <li class="noticeCenterContainer__li" v-for="msg in queue">
        <notice-center-item :id="msg._uid"
                            :hue="msg['options'].hue"
                            :title="msg['options'].title"
                            :content="msg['options'].content"
                            :delay="msg['options'].delay"
                            :close-btn="msg['options'].closeBtn"
                            @close="closeHandle(msg._uid)"
        ></notice-center-item>
      </li>
    </ul>
  </div>
</template>

<script>
  import NoticeCenterItem from './item.vue'

  export default {
    VERSION: '1.0.0',

    data () {
      return {
        show: false
      }
    },

    props: {
      queue: {type: Array, default() { return [] }}
    },

    methods: {
      /**
       * @description 关闭消息处理函数
       * @param i {Number} 消息 ID
       */
      closeHandle (i) {
        let _queue = this.queue;

        this.queue = _queue.filter(function (msg) {
          if (i === msg._uid) msg.closeCb(msg);

          return i !== msg._uid
        });
        if (!this.queue.length) this.$emit('empty');
      }
    },

    components: { NoticeCenterItem }
  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  $width: 300px;                                 // 提示信息框的长度

  @include b (noticeCenterContainer) {
    z-index: 19941026;
    position: fixed; top: 0; right: 0;
    overflow: scroll;
    width: $width; min-height: 32px;
    padding: 6px 12px;

    @include e (li) { margin-top: 6px }
  }
</style>
