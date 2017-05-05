<template>
    <div class="KsPageGroup" cid="KsPageGroup">
        <div class="_statistical">共<span>{{total}}</span>条</div>
        <div class="ks-col">
            每页
            <select class="input" v-on:change.stop v-model="size">
                <option 
                    v-for="i in sizes" 
                    v-bind:value="i">{{i}}</option>
            </select>
            条
        </div>
        <page 
            class="ks-col-auto"
            v-bind:current.sync="current" 
            v-bind:length="length"
            v-bind:total="total"
            v-bind:size="size"
            v-on:change="currentChange"></page>    
    </div>
</template>
<script type="text/javascript">
    import props from './mixins'
    import page from './page.vue'
    export default {
        VERSION:'1.1.0',
        components:{
            'page':page
        },
        mixins:[props],
        props: {
            // 每页可能展示条数
            sizes :{ type:Array, default(){ return[10,20,100] } }
        },
        data() {
            return {}
        },
        methods: {
            init (){
                var size = this.size
                if(!~this.sizes.indexOf(size)){
                    size = this.sizes[0]
                }
                this.size = size
            },
            currentChange(val){
                this.$emit('change',this.size,this.current)
            }
        },
        created (){
            this.init()
        },
        watch:{
            size(val,oldVal){
                this.current = 1
                this.$emit('change',this.size,this.current)

            }
        }
    }
</script>
<style lang="scss">
    /*@import '../styles/input.scss';*/
</style>