<template>
  <div class="app-container">
    <k-header></k-header>
    <div class="content-container">
      <k-menu></k-menu>
      <div class="work-container" v-el:main-container>
        <k-crumbs></k-crumbs>
        <div class="router-container">
          <div class="router-wrap">
            <router-view class="p20"></router-view>
          </div>
        </div>
        <k-footer></k-footer>
      </div>
    </div>
  </div>
</template>

<script>
  import KHeader from './core/KHeader.vue'
  import KMenu from './core/KMenu.vue'
  import KFooter from './core/KFooter.vue'
  import KCrumbs from './core/KCrumbs.vue'

  export default{
    data () {
      return { }
    },

    components: { KHeader, KMenu, KFooter, KCrumbs }
  }
</script>
