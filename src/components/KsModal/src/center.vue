<template>
  <div class="ks-modal-center" v-if="show">
    <ks-mask-entity :fill-mode="'full'"
                    :show.sync="show"
    >
      <ks-modal-entity
        class="ks-modal-center"
        :show-confirm-btn="showConfirmBtn"
        :show-cancel-btn="showCancelBtn"
        :show-close-btn="showCloseBtn"
        :confirm-btn-text="confirmBtnText"
        :title="title"
        :content="content"
        :type="type"
        :width="width"
        :mask="mask"
        :show.sync="show"
        @cancel="$emit('cancel')"
        @confirm="$emit('confirm')"
        @close="$emit('close')"
      >
        <slot name="content" slot="content"></slot>
      </ks-modal-entity>
    </ks-mask-entity>
  </div>
</template>

<script>
  import {KsMaskEntity} from '../../KsMask';
  import KsModalEntity from './main.vue';
  import modalProps from '../mixins/modalProps'

  export default{
    data () {
      return {
      }
    },

    mixins: [modalProps],

    components: { KsMaskEntity, KsModalEntity }
  }
</script>

<style lang="scss">
  .ks-modal-center {
    .KSModal {
      position: static;
      top: inherit;
      left: inherit;
      transform: inherit;
    }

    .KSMask__container {
      overflow: scroll;
      overflow-x: hidden;
    }
  }
</style>
