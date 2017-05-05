<template>
  <div class="KsDialogAbstract">
    <div class="KsDialogAbstract__wrapper">
      <aside class="KsDialogAbstract__icon">
        <slot name="icon"></slot>
      </aside>

      <article class="KsDialogAbstract__article">
        <slot name="article"></slot>
      </article>

      <footer class="KsDialogAbstract__operation">
        <slot name="operation"></slot>
      </footer>
    </div>
  </div>
</template>

<script>
  import dialogBaseProps from '../mixins/dialogBaseProps'

  export default {
    VERSION: '1.0.0',

    mixins: [dialogBaseProps],

    data () {
      return {}
    }
  }
</script>

<style lang="scss">
  @import "../../foundation/SassMagic-master/src/sassMagic";

  $width: 420px;                                                          // 模态宽度

  @include b(KsDialogAbstract) {

    @include e (wrapper) {
      @include center-translate();

      margin: 6px auto; width: $width;
      box-shadow: 0 0 7px rgba(0, 0, 0, 0.2);
      border-radius: 3px; background: #FFF; padding-top: 30px;
    }

  }
</style>
