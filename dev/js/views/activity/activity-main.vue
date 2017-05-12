<template>
    <div class="activity-main">
        <activity-step :datas="datas" :showstep.sync="showstep"></activity-step>
        <div class="rule-main" :class="propclass">
            <slot></slot>
        </div>
    </div>
</template>
<script type="text/javascript">
    import activityStep from '../../components/activity-step.vue'
    export default{
        props:{
            propclass:{type:String},
            showstep:{type:Number,default:1}
        },
        data(){
            return{
                datas:[ '活动基本设置', '活动规则设置', '活动商户设置']
            }
        },
        methods:{
        },
        ready(){
//            let ruleName=this.$route.params.rulename||this.$route.name;
//            (ruleName=='CouponMinus'||ruleName=='CouponDiscount')?this.datas=[ '基本设置', '规则设置', '商户设置']:null;
//            (sessionStorage.getItem('props')=='online')?this.datas=[ '活动基本设置', '活动规则设置','权益领取设置', '活动商户设置']: this.datas=[ '活动基本设置', '活动规则设置', '活动商户设置']
            (sessionStorage.getItem('props')=='online')?this.datas=[ '基本设置', '规则设置','权益设置', '商户设置']: this.datas=[ '基本设置', '规则设置', '商户设置'];
        },
        components: { activityStep }
    }
</script>