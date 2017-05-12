<template>
    <div class="rule-input" v-for="(index,n) in submitdata">
        <span>优惠劵名称</span>
        <input class="input padding-input" type="text" v-model="n.name"/>
        <span>抵扣</span>
        <input class="input padding-input" type="text" v-model="n.deductibleMoney" v-limitaddprice="n.deductibleMoney"/>
        <span class="margin-span">元</span>
        <i v-if="index===0" class="icon-add" @click="submitdata.push({'deductibleMoney':'','name':''})">新增一条</i>
        <i v-if="index!==0" class="icon-remove" @click="submitdata.splice(index, 1)">删除一条</i>
    </div>
    <div class="rule-input">
        <span>每次可使用</span>
        <input class="input padding-input" type="text" v-model="snumber" v-limitaddprice="snumber"/>
        <span class="margin-span">张</span>
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
        margin-top: 24px !important;
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
                    name:'',
                    deductibleMoney:'',
                    number:'',
                }],
                snumber:''
            }
        },
        methods:{
        },
        events:{
            getData(){
                let data=_.cloneDeep(this.submitdata);
                for(let i = 0;i<data.length;i++){
                    data[i].number=this.snumber;
                }
                this.$dispatch('getDatas',data);
            },
            setData(data){
                let sdata=[];
                _.map(data,(val)=>{
                    sdata.push({
                        name:val.name,
                        deductibleMoney:val.deductibleMoney,
                    })
                })
                this.snumber=data[0].number;
                this.$set('submitdata', sdata);
            },
        },
        ready (){
            this.$parent.showstep=1;
        },
    }
</script>