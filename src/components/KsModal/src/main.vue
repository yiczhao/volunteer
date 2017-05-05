<template>
  <div class="KSModal__wrapper">
    <div class="KSModal" v-if="show" :style="modalWidth">
      <header class="KSModal__header" :style="modalHeaderStyle">
        <div class="innerWrap">
          <h3 class="KSModal__title">
            {{ title }} <slot name="title"></slot>
          </h3>

          <i class="KSModal__close" v-if="showCloseBtn"
             @click="$emit('close') && (show = false)">
            <!-- close 图标 -->
            <svg class="icon" width="24" height="24" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <g transform="scale(0.03125, 0.03125)">
                <path
                  d="M557.312 513.248l265.28-263.904c12.544-12.48 12.608-32.704 0.128-45.248-12.512-12.576-32.704-12.608-45.248-0.128l-265.344 263.936-263.04-263.84C236.64 191.584 216.384 191.52 203.84 204 191.328 216.48 191.296 236.736 203.776 249.28l262.976 263.776L201.6 776.8c-12.544 12.48-12.608 32.704-0.128 45.248 6.24 6.272 14.464 9.44 22.688 9.44 8.16 0 16.32-3.104 22.56-9.312l265.216-263.808 265.44 266.24c6.24 6.272 14.432 9.408 22.656 9.408 8.192 0 16.352-3.136 22.592-9.344 12.512-12.48 12.544-32.704 0.064-45.248L557.312 513.248z">
                </path>
              </g>
            </svg>
          </i>

          <!-- 神奇的分隔线 -->
          <div class="KSModal__separation" v-if="type === 'normal'"></div>
        </div>
      </header>
      <article class="KSModal__content">
        {{ content }} <slot name="content"></slot>
      </article>
      <footer class="KSModal__footer" :style="type !== 'normal' && 'padding-top: 0'">
        <aside class="KSModal__btnWarp">
          <ks-button mode="ghost" type="other" @click="$emit('cancel')"
                     v-if="showCancelBtn" style="margin-right: 10px"
          >{{ cancelBtnText }}</ks-button>
          <ks-button :type="type === 'normal' ? 'primary' : type" @click="$emit('confirm')"
                     v-if="showConfirmBtn"
          >{{ confirmBtnText }}</ks-button>
        </aside>
      </footer>
    </div>
  </div>
</template>

<script>
  import { KsButton } from '../../KsButton'
  import modalProps from '../mixins/modalProps'

  // 类型对色调映射
  const colorMapper = {
    primary: { hue: '#2196F3', font: '#FFF' },
    success: { hue: '#4CAF50', font: '#FFF' },
    info: { hue: '#00BCD4', font: '#FFF' },
    warn: { hue: '#FF5722', font: '#FFF' },
    danger: { hue: '#F44336', font: '#FFF' },
    normal: { hue: '#FFF', font: '#444' }
  }

  export default {
    name: 'KsModal',

    data () {
      return { }
    },

    mixins: [modalProps],

    computed: {
      /**
       * @description 当前模态的主色调
       * @return {*} color
       */
      hue () { return colorMapper[this.type] },

      /**
       * @description 模态的宽度样式
       * @returns {string}
       */
      modalWidth () { return `width: ${this.width}px` },

      /**
       * @description 模态的 header 部分样式
       * @returns {string}
       */
      modalHeaderStyle () { return `background: ${this.hue.hue};color: ${this.hue.font}`}
    },

    watch: {
      show (show) {
        let maskConfig = this.maskConfig

        if (!show && maskConfig) {
          KsMask.close()
        }
      }
    },

    components: { KsButton }
  }
</script>

<style lang="scss">
  @import "../styles/modal";
</style>
