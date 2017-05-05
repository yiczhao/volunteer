<template>  
    <div class="ks-image-box" v-show="show">
        <div class="image-content">
            <img :src="url">
            <i class="icon" @click="close">&#xe60d;</i>
        </div>
    </div>
</template>   


<script type="text/javascript">
    export default{
        props:{
            show: { type:Boolean, default:false },
            url:{ type:String,default:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1490777740832&di=29af36b1dddd1d1a6cf8848d27049175&imgtype=0&src=http%3A%2F%2Fimg5.duitang.com%2Fuploads%2Fitem%2F201510%2F03%2F20151003150321_EuYFh.jpeg" }
        },
        data(){
            return{

            }
        },
        methods:{
            close(){
                this.show = false;
                this.$emit('change',this.show)
            }
        }
    }
</script>

<style lang="scss">
    @import "../styles/Image";
</style>
