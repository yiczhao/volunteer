<template>
<div class="rule-input DateDiscount" v-for="(index,n) in submitdata">
    <span style="position:relative" class="daters" @mouseleave="close(index)">
        <input class="input padding-input" @click="showDater(index)" v-model="n.date" readonly/>
        <div class="days" v-show="n.show">
            <div v-for="n in days" :class="{checked:n.select}" @click="setDate(n,index)">{{n.date}}</div>
        </div>
    </span> 
    <span>号</span>
    <input class="input padding-input" type="text" v-model="n.discount" v-limitdiscount="n.discount"/>
    <span class="margin-span">折</span>
    <i v-if="index===0" class="icon-add" @click="addLine">新增一条</i>
    <i v-if="index!==0" class="icon-remove" @click="submitdata.splice(index, 1)">删除一条</i>
</div>
</template>
<style lang="scss">
.DateDiscount{
    .DateDiscount{
        .KsDatePicker{
            position: absolute;
            top: 0;
            .KsDatePicker-input{
                opacity: 0;
            }
        }
    }
    .days{
        width: 320px;
        position: absolute;
        background: #fff;
        border: 1px solid #dadada;
        padding: 10px;
        z-index: 999;
        div{
            float: left;
            width: 35px;
            height: 35px;
            text-align: center;
            line-height: 35px;
            margin: 5px;
            cursor: pointer;
        }
        .checked{
            background: #2196F3;
            color: #fff;
            border-radius: 5px;
        }
    }
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
}
</style>
<script type="text/javascript">
    export default{
        data(){
            return{
                dateval: stringify(new Date()),
                indexs:0,
                show:false,
                showval:'',
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
                    date:'',
                    discount :'',
                    show:false,
                }],
                days:[]
            }
        },
        methods:{
            close(index){
                this.submitdata[index].show=false;
            },
            setDate(n,index){
                if(!n.select){
                    n.select=true;
                    !this.submitdata[index].date?this.submitdata[index].date=n.date:this.submitdata[index].date=this.submitdata[index].date+","+n.date
                }else{
                    let data=this.submitdata[index].date.split(',');
                    _.remove(data,(val)=>{
                        return n.date==val;
                    })
                    this.submitdata[index].date=_.join(data,',');
                    n.select=false;
                }
            },
            showDater(index){
                this.submitdata[index].show=true;
                let data=this.submitdata[index].date.split(',');
                _.map(this.days,(val)=>{
                    val.select=false;
                    _.map(data,(value)=>{
                        if(val.date==value){
                            val.select=true;
                        }
                    })
                })
            },
            getDays(){
                var date = new Date();
                var year = date.getFullYear();
                var mouth = date.getMonth() + 1;
                var days ;
                if(mouth == 2){
                    days= year % 4 == 0 ? 29 : 28;
                }
                else if(mouth == 1 || mouth == 3 || mouth == 5 || mouth == 7 || mouth == 8 || mouth == 10 || mouth == 12){
                    days= 31;
                }
                else{
                    days= 30;
                }
                for(let i=0;i<days;i++){
                    this.days.push({date:i+1,select:false})
                }
                console.log(this.days);
            },
            current_change(val){
                let data=val.split(',');
                let time=[];
                if(!!data.length&&!!data[0]){
                    _.map(data,(value)=>{
                        time.push(value.split('-')[2]>>0)
                    })
                }
                if(!!time.length){
                    this.submitdata[this.indexs].date=_.join(time, ',');
                }else{
                    this.submitdata[this.indexs].date=''
                }
            },
            addLine(){
                this.submitdata.push({'date':'','discount':'','show':false})
            },
        },
        events:{
            getData(){
                let data=[];
                _.map(this.submitdata,(val)=>{
                    data.push({'date':val.date,'discount':val.discount})
                })
                this.$dispatch('getDatas',  data);
            },
            setData(data){
                let sdata=[];
                _.map(data,(val)=>{
                    sdata.push({
                        date:val.date,
                        discount:val.discount,
                        show:false
                    })
                })
                this.$set('submitdata', sdata);
            },
        },
        ready (){
            this.$parent.showstep=1;
            this.getDays();
        },
    }
</script>