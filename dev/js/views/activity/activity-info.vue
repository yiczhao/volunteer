<template>
    <div class="activity-info">
        <div class="activity-head">
            <div class="activity-name">{{basicData.name}}</div>
            <div class="mian-row activity-createtime">
                <div class="activity-type">创建时间 / {{basicData.createdAt}}</div>
            </div>
        </div>
        <div class="activity-title">
            <div class="mian-row">
                <div class="activity-type">活动种类 /</div>
                <div class="activity-val" v-if="!!basicData.ruleType">{{ruleTypes[basicData.ruleType][1]}}</div>
            </div>
            <div class="mian-row">
                <div class="activity-type">活动形式 /</div>
                <div class="activity-val">{{(basicData.propes=='online')?'线上活动':'线下活动'}}</div>
            </div>
            <div class="mian-row">
                <div class="activity-type">所属银行 /</div>
                <div class="activity-val">{{basicData.uuid | get_bank uuidsList}}</div>
            </div>
        </div>
        <div class="info-title">
            <ul class="tab-bor">
                <li @click="step=1" :class="{'active':step===1}">活动基本信息</li>
                <li v-show="!!ruleList.ruleType" @click="step=2" :class="{'active':step===2}">规则设置</li>
                <li @click="step=4" :class="{'active':step===4}" v-show="!!equityData">权益信息</li>
                <li v-show="!!storeList.length" @click="step=3" :class="{'active':step===3}">商户信息</li>
            </ul>
        </div>
        <div class="info-main">
            <div v-show="step===1" class="info-basic">
                <div class="main-row">
                    <div class="row-right">
                        <span class="activity-type">活动名称 /</span>
                        <span class="activity-val">{{basicData.name}}</span>
                    </div>
                    <div class="row-right">
                        <span class="activity-type">活动预算 /</span>
                        <span class="activity-val"> {{basicData.budget | currency ''}}元</span>
                    </div>
                    <div class="row-right">
                        <span class="activity-type">活动时间 /</span>
                        <span class="activity-val"> {{basicData.startTime}} ~ {{basicData.endTime}}</span>
                    </div>
                </div>
                <div class="main-row">
                    <div class="row-right">
                        <span class="activity-type">参与时间段 /</span>
                        <span class="activity-val">每天参与时间段<template v-for="n in basicData.timesList">【{{n}}】</template></span>
                    </div>
                    <div class="row-right">
                        <span class="activity-type">所属银行 /</span>
                        <span class="activity-val">{{basicData.uuid | get_bank uuidsList}}</span>
                    </div>
                    <div class="row-right">
                        <span class="activity-type">活动主办方 /</span>
                        <span class="activity-val">{{basicData.uuid | get_bank uuidsList}}</span>
                    </div>
                </div>
                <div class="main-row table-row">
                    <span class="w85 activity-type">活动主题 /</span>
                    <span class="activity-val">{{basicData.subject}}</span>
                </div>
                <div class="main-row table-row">
                    <span class="w85 activity-type">活动细则 /</span>
                    <span class="activity-val">{{basicData.detail}}</span>
                </div>
                <div class="main-row table-row">
                    <span class="w140 activity-type">POS小票内容设置 /</span>
                    <span class="activity-val">{{basicData.posPrint | pos_print}}</span>
                </div>
            </div>
            <div v-show="step===2" class="info-rule">
                <div class="main-row table-row">
                    <span class="w140 activity-type">{{ruleList.ruleName}} /</span>
                    <template v-if="ruleList.ruleType=='MeetMinus'">
                    <span class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    满{{n.meetMoney}}元，减{{n.minusMoney}}元.
                    </span>
                    </template>
                    <template v-if="ruleList.ruleType=='EveryMeetMinus'">
                        <span class="activity-val">每满{{ruleList[ruleList.ruleTypes].meetMoney}}元，减{{ruleList[ruleList.ruleTypes].minusMoney}}元.</span>
                    </template>
                    <template v-if="ruleList.ruleType=='ImmediatelyMinus'">
                        <span class="activity-val">立减{{ruleList[ruleList.ruleTypes].money}}元.</span>
                    </template>
                    <template v-if="ruleList.ruleType=='RandomMinus'">
                    <span class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    随机立减{{n.amount}}元，{{n.number}}名.
                    </span>
                    </template>
                    <template v-if="ruleList.ruleType=='MeetDiscount'">
                    <span class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    满{{n.meetMoney}}元，打{{n.discount}}折.
                    </span>
                    </template>
                    <template v-if="ruleList.ruleType=='Ticket'">
                    <span class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    票务名称{{n.name}}，原价{{n.originalPrice}}元，实付{{n.actualPayment}}元.
                    单次每卡可购{{n.numberLimit}}张
                    </span>
                    </template>
                    <template v-if="ruleList.ruleType=='SerialDiscount'">
                    <span class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    用户刷卡{{n.belowMoney}}以内，第{{n.time}}次，可享受{{n.discount}}折.
                    </span>
                    </template>
                    <template v-if="ruleList.ruleType=='WeekdayDiscount'">
                    <span class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    每周{{n.weekday}}，打{{n.discount }}折.
                    </span>
                    </template>
                    <template v-if="ruleList.ruleType=='DateDiscount'">
                    <span class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    {{n.date}}号，立减{{n.discount}}折.
                    </span>
                    </template>
                    <template v-if="ruleList.ruleType=='RandomDiscount'">
                    <span class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    随机{{n.discount}}折，{{n.number}}名.
                    </span>
                    </template>
                    <template v-if="ruleList.ruleType=='CouponDiscount'">
                    <span class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    {{n.belowMoney}}元以内, 打{{n.discount}}折优惠.
                    </span>
                    </template>
                    <template v-if="ruleList.ruleType=='CouponMinus'">
                    <span class="activity-val" class="activity-val" v-for="n in ruleList[ruleList.ruleTypes]">
                    优惠劵名称:{{n.name}}，抵扣{{n.deductibleMoney}}元， 每次可使用{{n.number}}张.
                    </span>
                    </template>
                </div>
                <div v-show="!!ruleList.moneys.length" class="main-row table-row">
                    <span class="activity-type">金额限制 /</span>
                    <span class="activity-val" v-for="n in ruleList.moneys">
                    <template v-if="n.type =='minimum_consume'">
                    最低消费金额:{{n.amount}}元.
                    </template>
                    <template v-if="n.type =='max_preferential'">
                    最高优惠金额:{{n.amount}}元.
                    </template>
                    <template v-if="n.type =='less_than'">
                    多少元内参与打折:{{n.amount}}元.
                    </template>
                </span>
                </div>
                <div v-show="!!ruleList.quantities.length" class="main-row table-row">
                    <span class="activity-type">参与次数限制 /</span>
                    <span class="activity-val" v-for="n in ruleList.quantities">
                        <template v-if="n.type =='act_total'">
                        活动总数限制:共{{n.total}}次，每天{{n.totalDay }}次，每周{{n.totalWeek }}次，每月{{n.totalMonth }}次.
                        </template>
                        <template v-if="n.type =='store_card'">
                        商户每卡参与次数:共{{n.total}}次，每天{{n.totalDay}}次，每周{{n.totalWeek}}次，每月{{n.totalMonth}}次.
                        </template>
                        <template v-if="n.type =='store'">
                        每商户参与次数:共{{n.total}}次，每天{{n.totalDay}}次，每周{{n.totalWeek}}次，每月{{n.totalMonth}}次.
                        </template>
                        <template v-if="n.type =='card'">
                        每卡参与次数:共{{n.total}}次，每天{{n.totalDay}}次，每周{{n.totalWeek}}次，每月{{n.totalMonth}}次.
                        </template>
                        <template v-if="n.type =='user'">
                        用户参与次数:共{{n.total}}次，每天{{n.totalDay}}次，每周{{n.totalWeek}}次，每月{{n.totalMonth}}次.
                        </template>
                    </span>
                </div>
            </div>
            <div v-show="step===3" class="info-store">
                <div class="store-title">共{{storeList.length}}家商户</div>
                <table class="table">
                    <tr>
                        <th>商户ID</th>
                        <th>商户名称</th>
                        <th>地区</th>
                    </tr>
                    <tr v-for="n in storeList">
                        <td>{{n.storeId}}</td>
                        <td>{{n.storeName}}</td>
                        <td>{{n.industry}}</td>
                    </tr>
                </table>
            </div>
            <div v-show="step===4" class="info-quanyi">
                <div class="main-row">
                    <div class="row-right">
                        <span class="activity-type">权益名称 /</span>
                        <span class="activity-val" v-if="!!equityData">{{equityData.name}}</span>
                    </div>
                    <div class="row-right">
                        <span class="activity-type">权益时间 /</span>
                        <span class="activity-val" v-if="!!equityData"> {{equityData.receiveStartTime|datetime}} ~ {{equityData.receiveEndTime|datetime}}</span>
                    </div>
                    <div class="row-right">
                        <span class="activity-type">使用时间 /</span>
                        <span class="activity-val" v-if="!!validPeriod"> {{validPeriod}}</span>
                    </div>
                </div>
                <div class="main-row">
                    <div class="row-right">
                        <span class="activity-type">权益总数量 /</span>
                        <span class="activity-val" v-if="!!equityData"> {{equityData.total}}</span>
                    </div>
                    <div :class="['row-right',isFlex ? 'divFlex' : '']">
                        <span class="activity-type">权益每天数量 /</span>
                        <span class="activity-val" v-if="!!equityData"> {{equityData.totalOneDay}}</span>
                    </div>
                    <div class="row-right" v-if="!!equityData">
                        <template v-if="!!equityData.times">
                            <span class="activity-type">活动定时抢 /</span>
                            <span class="activity-val" v-if="!!equityData">{{equityTimeStr}}</span>
                        </template>
                    </div>
                </div>
                <div class="main-row table-row">
                    <div class="row-right">
                        <span class="activity-type">规则描述 /</span>
                        <textarea v-if="!!equityData" class="textarea-val" readonly="readonly" v-model="equityData.description">
                        </textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
    import model from '../../ajax/activity/info_model'
    export default{
        data(){
            this.model=model(this)
            return{
                step:1,
                uuidsList:JSON.parse(sessionStorage.getItem('bankNames')),
                basicData:{},
                ruleList:{
                    moneys:[],
                    quantities:[]
                },
                storeList:[],
                ruleTypes: {
                    'MeetMinus':['meetMinuses','满多少减多少'],// 满多少减多少与活动时间同步
                    'EveryMeetMinus':['everyMeetMinus','每满多少减多少'],// 满多少减多少
                    'ImmediatelyMinus':['immediatelyMinus','立减'],// 立减
                    'RandomMinus':['randomMinuses','随机立减'],// 随机立减
                    'MeetDiscount':['meetDiscounts','折扣'],// 折扣
                    'Ticket':['tickets','票务规则'],// 票务规则
                    'SerialDiscount':['serialDiscounts','连环折扣'],// 连环折扣
                    'WeekdayDiscount':['weekdayDiscounts','周几几折'],// 周几几折
                    'DateDiscount':['dateDiscounts','几号几折'],// 几号几折
                    'RandomDiscount':['randomDiscounts','随机折扣'],// 随机折扣
                    'CouponDiscount':['couponDiscounts','权益打折'],//权益打折
                    'CouponMinus':['couponMinus','权益金额']//权益金额
                },
                posInvoice:{
                    '%DISRATE%':'用户折扣',
                    '%FAVORAMT%':'%优惠金额',
                    '%DAYLEFT%':'当天剩余名额',
                    '%TOTALLEFT%':'总剩余名额'
                },
                validPeriod:'',
                equityData:{},
                equityTimeStr:'',
                ruleStr:'',
                isFlex:true,
                equityName:''
            }
        },
        methods:{
            getRules(data){
                let datas=_.cloneDeep(data);
                datas.ruleTypes=!data.ruleType?[]:this.ruleTypes[data.ruleType][0];
                datas.ruleName=!data.ruleType?[]:this.ruleTypes[data.ruleType][1];
                if(_.isEmpty(datas[datas.ruleTypes])){
                    return;
                }
                this.$set('ruleList',datas);
                if(this.equityData!=null)
                {
                    let validPeriod='';
                    if(this.equityData.validPeriod!=null)
                    {
                        validPeriod=this.equityData.validPeriod;
                        if(validPeriod==-1)
                        {
                            this.validPeriod='与活动时间同步';
                        }
                        else
                        {
                            this.validPeriod='用户得到权益'+validPeriod+'天内';
                        }
                    }
                    if(this.equityData.times!=null&&this.equityData.weeks!=null)
                    {
                        let equityTimeStr='';
                        let weeks=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
                        var weekList=this.equityData.weeks.split(',');
                        _.map(weekList,(val,index)=>{
                            index===weekList.length-1?equityTimeStr+=weeks[val<<0]:equityTimeStr+=weeks[val<<0]+'、';
                        })
                        equityTimeStr+=this.equityData.times;
                        this.equityTimeStr=equityTimeStr;
                        this.isFlex=false;
                    }
                }
            },
            getActInfo(favorId){
                this.model.searchReceive(favorId).then((res)=>{
                    if(res.data.code===0){
                        this.equityName=res.data.data.favorName;
                    }
                })
            }
        },
        created(){
            let activityId=this.$route.params.infoId;
            this.model.getinfoList(activityId).then((res)=>{
                if(res.data.code===0){
                    console.log(res.data.data);
                    this.$set('basicData',res.data.data.base);
                    this.$set('storeList',res.data.data.store.bankMarketingStores);
                    this.$set('equityData',res.data.data.favorConfigs[res.data.data.favorConfigs.length-1]);
                    this.getRules(res.data.data.ruleAndLimit);
                }
            });
        },
    }
</script>