<template>
    <div  v-show="show">
    <div class="dialog" :style="{width:width+'px'}">
        <div class="dialog-hd dialog-primary-title" v-show="!is_storetype">
            <h2 v-text="title"></h2>
            <a href="javascript:;" class="icon-clear" @click="_close()"><i class="icon">&#xe611;</i></a>
        </div>


        <div class="dialog-bd"  :class="{'dialog-bd':!is_storetype}">
            <slot></slot>
        </div>
        
    </div>
    <div class="dialog-mask"></div>
</div>
</template>
<script type="text/javascript">
    export default {
        props:{
            title:{type:String},
            show:{type:Boolean,default:false},
            width:{type:Number},
            is_storetype:{type:Boolean,default:false},
            cbClose:{}
        },
        data() {
            return {
                align: {
                    points: ['cc', 'cc']
                },
                monitor: true
            }
        },
        methods :{
            _close() {
                if(this.cbClose){
                    this.cbClose('cancel')
                }
                this.show = false
            }   
        },
        created(){
            this.title=this.title||'标题'
        },
        ready(){
            
        }

    }
</script>
<style lang="scss">
  @import "../styles/Dialog";
</style>
