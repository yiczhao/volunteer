<template>
<div class="rule-input" v-for="(index,n) in submitdata">
    <span>满</span>
    <input class="input padding-input" type="text" v-model="n.meetMoney" v-limitaddprice="n.meetMoney"/>
    <span class="margin-span">元</span>
    <span>，立减</span>
    <input class="input padding-input" type="text" v-model="n.minusMoney" v-limitaddprice="n.minusMoney"/>
    <span class="margin-span">元</span>
    <i v-if="index===0" class="icon-add" @click="submitdata.push({'meetMoney':'','minusMoney':''})">新增一条</i>
    <i v-if="index!==0" class="icon-remove" @click="submitdata.splice(index, 1)">删除一条</i>
</div>
</template>
<style type="text/css" scoped>
    input{
        width: 90px!important;
        padding-right: 28px!important;
    }
    .margin-span{
        margin-left: -35px !important;
    }
    .padding-input{
        padding-right: 30px !important;
        /*width: 160px !important;*/
    }
    .icon-add,.icon-remove{
        margin-top: 24px!important;
        font-size: 15px!important;
        color: #159ff7!important;
    }
    .icon-add:before,.icon-remove:before{
        content:'';
        padding-right: 5px!important;
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
                submitdata: [{
                    meetMoney:'',
                    minusMoney:'',
                }]
            }
        },
        methods:{
        },
        events:{
            getData(){
                let isTrue=false;
                _.map(this.submitdata,(val)=>{
                    if((val.meetMoney<<0) <(val.minusMoney<<0)){
                        isTrue=true;
                    }
                })
                if(isTrue){
                    dialog('info','立减金额不得大于消费金额！');
                    return;
                }
                this.$dispatch('getDatas',  this.submitdata);
            },
            setData(data){
                let sdata=[];
                _.map(data,(val)=>{
                    sdata.push({
                        meetMoney:val.meetMoney,
                        minusMoney:val.minusMoney,
                    })
                })
                this.$set('submitdata', sdata);
            },
        },
        ready (){
            this.$parent.showstep=1;
        },
    }
</script>