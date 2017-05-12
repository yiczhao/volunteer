<template>
    <div class="error-mask" v-if="showFlag">
        <background-mask>
            <div class="error-mask-content" :class="'error'+ imgType">
                <div class="error-mask-box">
                    <div class="error-mask-img"></div>
                    <div class="error-mask-txt">
                        <span>服务器出错，你可以<i @click="reload">刷新</i>页面</span>
                        <span>点击下面链接继续浏览页面</span>
                    </div>
                </div>
                <p><a href="javascript:;" @click="shutPage" class="error-mask-shut">关闭页面</a><a href="javascript:;" @click="backHome" class="error-mask-back">返回首页</a></p>
            </div>
        </background-mask>
    </div>
</template>

<script>
    import backgroundMask from '../dialogs/BackgroundMask.vue'
    import store from '../../vuex/store'
    export default{
        store,
        data () {
            return {

            }
        },
        vuex: {
            getters: {
                showFlag ({ ajax }) { return ajax.showFlag },
                imgType ({ ajax }) {
                   return ajax.imgType
                },
            }
        },
        components:{
            backgroundMask
        },
        methods:{
            shutPage(){
                store.dispatch('AJAX_SUCCESS');
            },
            reload(){
                location.reload()
            },
            backHome(){
                store.dispatch('AJAX_SUCCESS');
                this.$router.go({'name':'home'});
            }
        },

    }
</script>

<style lang="scss">
    @import "../dialogs/style/bootstrap";
    .error-mask{
        .error-mask-content{
            box-sizing: border-box;
            width: 576px;
            height: 300px;
            background-color: #fff;
            padding:58px 48px 38px 48px ;
            border-radius: 7px;
            text-align: center;
            position: fixed;
            left: 50%;
            top: 45%;
            margin-left: -289px;
            margin-top: -150px;
            overflow: hidden;
            z-index: 1060;

            .error-mask-box{
                float:right;
                height: 132px;
                width: 219px;
                text-align: center;
                padding-top: 10px;
                text-align: left;
                .error-mask-img{
                    height: 48px;
                    margin-bottom: 18px;
                    background: url("../../../img/error_sorry.png")  left center no-repeat;
                }
                .error-mask-txt{

                    span{
                        display: block;
                        line-height:25px;
                    }
                    i{
                        color: #0182c4;
                        font-style: normal;
                        cursor: pointer;
                    }
                }
            }

            p{
                clear: both;
                padding:0 80px;
                padding-top:24px;
                display:flex;
                a{
                    flex:1;
                    line-height: 38px;
                }
                .error-mask-back{
                    padding: 0 25px;
                    color: #fff;
                    background-color: #e76b5f;
                    border-radius: 38px;
                }

            }

        }

    }

    .error404{
        background: url("../../../img/error404.png") 58px 48px  no-repeat;
    }
    .error500{
        background: url("../../../img/error500.png") 58px 48px  no-repeat;
    }

</style>