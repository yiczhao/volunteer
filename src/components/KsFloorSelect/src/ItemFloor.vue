<template>
    <div class="KsItemFloor ks-row">
        <item
            :floor_value.sync = "floor_begin"
            :limit_before.sync = "limit_before"></item>
        <div class="ks-col turnright">
            <span class="iconright"></span>
            <span class="iconarrow"></span>
        </div>
        
        <item
            :floor_value.sync = "floor_end"
            :limit_after.sync = "limit_after"
            :isdisabled.sync = "isdisabled"></item>
    </div>
</template>
<script type="text/javascript">
import item from './Item.vue'
    export default {
        props:{
            floor_begin:{
                type:String,
                default:'',
            },
            floor_end:{
                type:String,
                default:'',
            },
            isdisabled:{
                type:Boolean,
                default:false,
            }
        },
        components:{
            item:item
        },
        data(){
            return {
                limit_before:this.floor_end,
                limit_after:this.floor_begin
            }
        },
        watch:{
            floor_begin(val){
                this.limit_after = val
            },
            floor_end(val){
                this.limit_before = val
            },
            limit_before(val){
                //debugger
                this.floor_end = val
            },
            limit_after(val){
                this.floor_begin = val
            }
        },
        methods:{

        },
        ready(){

                 
        }
    }
</script>
<style lang="scss">
  @import "../styles/Floor";
</style>
