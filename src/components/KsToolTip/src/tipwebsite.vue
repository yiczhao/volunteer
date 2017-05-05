<template>
<div v-ks-click-outside = "hide">
   <ks-tool-tip-content  
       :placement = "placement"
       :show.sync = "show">
        <slot></slot>
        <div :style="{width:width + 'px'}" slot="content">
            <slot name="content" ></slot>
        </div>
        <slot name="content"  slot="content"></slot>
        <slot name="btngroup" slot="btngroup">
            <p>sssss</p>
            <div class="txtr mt-30 mb-20 btngroup">
                <span class="reset" @click = "reset()">重选</span>
                <span class="checkall" @click = "checkall()">全选</span>
                <input type="button" class="btn-dark-light mr-10" value="取消">
                <input type="button" class="btn-primary" value="完成"
                    @click = "save()">             
            </div>
        </slot>
    </ks-tool-tip-content>
</div>
</template>
<script type="text/javascript">
import KsToolTipContent from './tip.vue'
export default {
    components:{
        ksToolTipContent:KsToolTipContent
    },
    props: {
      show: {type: Boolean, default: false},
      width:{type:Number,default:500},
      placement: {type: String, default: 'bottom'},

    },
    methods:{
      hide(){
        console.log('1')
        this.show = false
      }
    },
    data() {
        return {
            
        }
    },


}
</script>
