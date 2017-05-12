<template>
<div class="rule-input" v-for="(index,n) in submitdata">
    <span>满</span>
    <input class="input padding-input" type="text" v-model="n.meetMoney" v-limitaddprice="n.meetMoney"/>
    <span class="margin-span">元</span><span>，立减</span>
    <input class="input padding-input" type="text" v-model="n.minusMoney" v-limitaddprice="n.minusMoney"/>
    <span class="margin-span">元</span>
    <i v-if="index===0" class="icon-add" @click="submitdata.push({'meetMoney':'','minusMoney':''})">新增一条</i>
    <i v-if="index!==0" class="icon-remove" @click="submitdata.splice(index, 1)">删除一条</i>
</div>
</template>
<style type="text/css" scoped>
    .padding-input{
        width:90px !important ;
        padding-right: 28px !important;
    }
    .margin-span{
        margin-left: -35px !important;
    }
    .icon-add,.icon-remove{
        font-size: 15px !important;
        margin-top: 24px!important;
    }
    .icon-add:before,.icon-remove:before{
        padding-right: 5px !important;
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
                    'meetMoney':'',
                    'minusMoney ':'',
                }]
            }
        },
        methods:{
        },
        events:{
            getData(){
                this.$dispatch('getDatas',  this.submitdata);
            },
            setData(data){
                this.$set('submitdata', data);
            },
        },
        ready (){
            this.$parent.showstep=1;
        },
    }
</script>