<template>
  <h3> 点击图标复制图标名称 ！！！</h3>
  <ul class="ks-font-library">
    <li v-for="(key, icon) in KsFonts" class="copy" @click="currentIcon = icon.des"
        data-clipboard-action="copy" :data-clipboard-target="'#iconName' + $index">
      <ks-icon :name="key" library="ks"></ks-icon>
      <h6 v-text="icon.des"></h6>
      <input type="text" :value="key" :id="'iconName' + $index" style="opacity: 0; position: absolute">
    </li>
  </ul>
</template>

<script>
  import Clipboard from 'clipboard'
  import KsFonts from '../../data/icon2ClassMapper'

  export default{
    data () {
      return {
        KsFonts,
        currentIcon: '',
        clipborad: null,
      }
    },

    ready () {
      // 实现复制功能
      this.clipboard = new Clipboard('.copy');
      this.clipboard.on('success', () => {
        this.$KsNotice.success('复制成功', `恭喜你成功复制了 ${this.currentIcon} 图标`);
      });
    },

    destroy () {
      // 销毁 Clipboard
      this.clipboard.destroy();
    }
  }
</script>

<style lang="scss">
  .ks-font-library li {
    display: inline-block;
    width: 80px; padding: 12px 6px;
    margin: 12px 0;
    vertical-align: middle;
    text-align: center;
    border-radius: 2px;
    cursor: pointer;

    &:hover {
      background: #42A5F5;
      color: white;
    }
  }
</style>
