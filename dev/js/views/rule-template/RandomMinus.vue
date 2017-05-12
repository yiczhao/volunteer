<template>
    <div class="rule-input" v-for="(index,n) in submitdata">
        <span>随机立减</span>
        <input class="input padding-input" type="text" v-model="n.amount" v-limitaddprice="n.amount"/>
        <span class="margin-span">元</span>
        <input class="input padding-input" type="text" v-model="n.number" v-limitnumber="n.number"/>
        <span class="margin-span">名</span>
        <i v-if="index===0" class="icon-add" @click="submitdata.push({'amount':'','number':''})">新增一条</i>
        <i v-if="index!==0" class="icon-remove" @click="submitdata.splice(index,1)">删除一条</i>
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
                    {name: '最低消费金额', checked: false, types: 'minimum_consume',keys:'moneys'},
                    {name: '最高优惠金额', checked: false, types: 'max_preferential',keys:'moneys'},
                    {name: '多少元内参与打折', checked: false, types: 'less_than',keys:'moneys'}
                ],
                submitdata: [{
                    amount:'',
                    number:'',
                }]
            }
        },
        methods:{
        },
        events:{
            setData(data){
                let sdata=[];
                _.map(data,(val)=>{
                    sdata.push({
                        number:val.number,
                        amount:val.amount
                    })
                })
                this.$set('submitdata', sdata);
            },
            getData(){
                this.$dispatch('getDatas',  this.submitdata);
            }
        },
        ready (){
            this.$parent.showstep=1;
        },
    }
</script>