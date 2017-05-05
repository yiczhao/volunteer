<template>
  <div :class="classes">
    <style type="text/css">
      {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__slide {
        {{ slideStyles }}
      }
      {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__dot {
        {{ dotStyles }}
      }
      {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__slide--selected {
        {{ selectedSlide }}
      }
      {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__text {
        {{ textStyles }}
      }
      {{ '.KSAbstractSwitch__UID--' + _uid }} .KSAbstractSwitch__dot--selected {
        {{ selectedDot }}
      }
    </style>
    <div class="KSAbstractSwitch__slide" @click="slideClickHandle"
         :class="{'KSAbstractSwitch__slide--selected': count % 2}"
    >
      <span class="KSAbstractSwitch__text" :class="{'KSAbstractSwitch__text--selected': count % 2}">
        <slot></slot> {{statusMapper[status].text}}
      </span>
      <div class="KSAbstractSwitch__dot" :class="{'KSAbstractSwitch__dot--selected': count % 2}"></div>
    </div>
  </div>
</template>

<script>
  export default{
    VERSION: '1.0.0',

    data () {
      return {
        count: 0
      }
    },

    props: {
      statusMapper: {type: Object, required: true},
      status: {type: String, required: true, towWay: true},
      width: {type: Number, required: true},
      height: {type: Number, required: true}
    },

    methods: {
      /**
       * @description 开关点击事件处理函数
       * @param e {Event} 事件对象
       */
      slideClickHandle (e) {
        let statusArr = Object.keys(this.statusMapper);

        this.count = (this.count < statusArr.length - 1) ? (this.count + 1) : 0;
        this.status = statusArr[this.count];
      }
    },

    computed: {
      /**
       * @description 开关开启状态滑动槽样式
       * @summary 开关开启状态滑动槽样式
       * @return {string}
       */
      selectedSlide () {
        let currentStatus = this.statusMapper[this.status];

        return `box-shadow: ${currentStatus.slideColor} 0 0 0 16.667px inset;
                border: 1px solid ${currentStatus.slideColor};`
      },

      /**
       * @description 开关开启状态点样式
       * @summary 开关开启状态点样式
       * @return {string}
       */
      selectedDot () {
        return `transform: translate(${this.width - this.height}px, 0);`
      },

      /**
       * @description 组件根元素的 class
       * @summary 标识组件
       * @return {string}
       */
      classes () { return `KSAbstractSwitch KSAbstractSwitch__UID--${this._uid}` },

      /**
       * @description 开关中心文字样式
       * @summary 开关中心文字样式
       * @return {string}
       */
      textStyles () {
        let currentStatus = this.statusMapper[this.status];

        return `font-size: ${currentStatus.fontSize}px;color: ${currentStatus.fontColor}`;
      },

      /**
       * @description 滑动槽的样式
       * @summary 滑动槽的样式
       * @return {string}
       */
      slideStyles () {
        let currentStatus = this.statusMapper[this.status];

        return `height: ${this.height}px;width: ${this.width}px;line-height: ${this.height}px;
                border-radius: ${this.height}px;background: ${currentStatus.slideColor}`;
      },

      /**
       * @description 开关小点点的样式
       * @summary switch 开关小点点的样式
       * @return {string}
       */
      dotStyles () {
        let currentStatus = this.statusMapper[this.status];

        return `height: ${this.height}px;width: ${this.height}px;background: ${currentStatus.dotColor}`;
      }
    }
  }
</script>

<style lang="scss">
  @import "../styles/AbstractSwitch";
</style>
