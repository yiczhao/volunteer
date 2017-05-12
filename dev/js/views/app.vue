<template>
    <header-component></header-component>
    <div class="content">
        <div class="content-main">
            <div class="content-left">
                <menu-component></menu-component>
            </div>
            <div class="content-right">
                <title-component></title-component>
                <div :class="hasPadding?'main-content':'has-crumbs'">
                    <div v-show="crumbsList.length>1" class="crumbs">
                        <span v-for="n in crumbsList"
                           v-link="{name:n.link}"
                           v-text="n.text"
                        ></span>
                    </div>
                    <router-view></router-view>
                </div>
                <loading></loading>
                <error-diloag></error-diloag>
            </div>
        </div>
    </div>
    <footer-component></footer-component>
</template>
<script type="text/javascript">
    import HeaderComponent from './base/header.vue'
    import MenuComponent from './base/menu.vue'
    import store from '../vuex/store'
    import FooterComponent from './base/footer.vue'
    import TitleComponent from './base/titles.vue'
    export default{
        data(){
            return{
            }
        },
        store,
        vuex: {
            getters: {
                crumbsList ({ titles }) {
                    return titles.crumbsList;
                }
            }
        },
        components:{
            HeaderComponent,MenuComponent,FooterComponent,TitleComponent
        },
        created(){
        }
    }
</script>