<template>
<div class="rule-input" v-for="(index,n) in submitdata">
    <input class="input padding-input" type="text" v-model="n.belowMoney" v-limitaddprice="n.belowMoney"/>
    <span class="margin-span">元</span><span>以内, 打</span>
    <input class="input padding-input" type="text" v-model="n.discount" v-limitaddprice="n.discount"/>
    <span class="margin-span">折</span><span>优惠</span>
    <i v-if="index===0" class="icon-add" @click="submitdata.push({'belowMoney':'','discount':''})">新增一条</i>
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
                    {name: '最低消费金额', checked: false, types: 'minimum_consume',keys:'moneys'},
                    {name: '最高优惠金额', checked: false, types: 'max_preferential',keys:'moneys'}
                ],
                submitdata: [{
                    belowMoney:'',
                    discount:''
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
                let sdata=[];
                _.map(data,(val)=>{
                    sdata.push({
                        belowMoney:val.belowMoney,
                        discount:val.discount
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