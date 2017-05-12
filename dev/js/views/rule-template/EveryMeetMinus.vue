<template>
<div class="rule-input">
    <span>每满</span>
    <input class="input padding-input" type="text" v-model="submitdata.meetMoney" v-limitaddprice="submitdata.meetMoney"/>
    <span class="margin-span">元</span>
    <span>，立减</span>
    <input class="input padding-input" type="text" v-model="submitdata.minusMoney" v-limitaddprice="submitdata.minusMoney"/>
    <span class="margin-span">元</span>
</div>
</template>
<style type="text/css" scoped>
    .margin-span{
        margin-left: -35px !important;
    }
    .padding-input{
        width: 90px !important;
        padding-right: 28px !important;
    }
</style>
<script type="text/javascript">
    export default{
        data(){
            return{
                ruleLists:[
                    {name: '卡BIN限制', checked: false, types: 'CardBin',keys:'cardBins'},
                    {name: '活动总数限制', checked: false, types: 'act_total',keys:'quantities'},
                    {name: '商户每卡参与次数', checked: false, types: 'store_card',keys:'quantities'},
                    {name: '每商户参与次数', checked: false, types: 'store',keys:'quantities'},
                    {name: '每卡参与次数', checked: false, types: 'card',keys:'quantities'},
                ],
                submitdata: {
                    meetMoney:'',
                    minusMoney:'',
                }
            }
        },
        methods:{
        },
        events:{
            getData(){
                if((this.submitdata.meetMoney<<0) <(this.submitdata.minusMoney<<0)){
                    dialog('info','满减金额不得大于消费金额！');
                    return;
                }
                this.$dispatch('getDatas',  this.submitdata);
            },
            setData(data){
                let sdata={
                    meetMoney:data.meetMoney,
                    minusMoney:data.minusMoney,
                };
                this.$set('submitdata', sdata);
            },
        },
        ready (){
            this.$parent.showstep=1;
        },
    }
</script>