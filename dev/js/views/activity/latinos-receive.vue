<template>
<activity-main :propclass="'latinos-receive'" :showstep.sync="showstep">
    <div class="rule-row">
        <div class="rule-label"><i>*</i>权益名称</div>
        <div class="rule-input">
            <input class="input" type="text" v-model="latinosData.name" placeholder="请输入权益名称" />
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>领取时间</div>
        <div class="rule-input">
            <ks-date-range-picker placeholder="开始时间,结束时间"
                :range.sync="daterange"
                :readonly="false"
                v-on:change="date_multi_picker_change"></ks-date-range-picker>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>&nbsp;</i>设置定时抢</div>
        <div class="rule-input">
            <ks-switch :color="'#ea6953'" :checked.sync="latinosData.hasWeeksAndTimes" @change="addtimesList"></ks-switch>
        </div>
    </div>
    <div class="rule-row caption" v-show="latinosData.hasWeeksAndTimes"> 
        <div class="rule-input">
            <ks-checkbox v-for="n in weeksList" :checked.sync="n.checked">{{n.name}}</ks-checkbox>
        </div>
        <div class="rule-label"><i>&nbsp;</i>时间段</div>
        <!-- 时间多段设定 -->
        <div class="rule-input">
            <div class="db" v-for="n in timesList.length">
                <select class="select" v-model="timesList[n].start"
                        change="timesList[n].end==null"
                >
                    <option :value="null">请选择时间段</option>
                    <option v-for="i in 24" :value="i + ':' + '00'" v-text="i + ':' + '00'">时间</option>
                </select>
                <span class="mr15">至</span>
                <select class="select" v-model="timesList[n].end">
                    <option :value="null">请选择时间段</option>
                    <option v-for="i in 24 - timesListShadow[n]"
                            :value="i + timesListShadow[n] + 1 + ':' + '00'"
                            v-text="i + timesListShadow[n] + 1 + ':' + '00'"
                            v-if="i + timesListShadow[n] + 1 !== 24"
                    >时间</option>
                    <option v-if="timesList[n]" :value="'23:59'" v-text="'23:59'">时间</option>
                </select>
                <i v-if="n===0" class="icon-add" @click="timesListAdd"></i>
                <i v-if="n!==0" class="icon-remove" @click="timesList.splice(n, 1)"></i>
            </div>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>使用有效期</div>
        <div class="rule-input">
            <select class="select" v-model="latinosData.validPeriod">
                <option :value="-1">与活动时间同步</option>
                <option :value="1">用户得到权益1天内</option>
                <option :value="2">用户得到权益2天内</option>
                <option :value="3">用户得到权益3天内</option>
                <option :value="5">用户得到权益5天内</option>
                <option :value="10">用户得到权益10天内</option>
                <option :value="15">用户得到权益15天内</option>
                <option :value="30">用户得到权益30天内</option>
            </select>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>权益总数量</div>
        <div class="rule-input">
            <input class="input" type="text" v-limitaddprice="latinosData.total" v-model="latinosData.total"/>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>权益每天数量</div>
        <div class="rule-input">
            <input class="input" type="text" v-limitaddprice="latinosData.totalOneDay" v-model="latinosData.totalOneDay"/>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label">规则描述</div>
        <div class="rule-input">
            <textarea class="textarea" v-model="latinosData.description"></textarea>
        </div>
    </div>
    <div class="rule-row tc footer-btns">
        <a class="btn btn-gray" @click="backBasic">上一步</a>
        <a class="btn btn-primary" @click="submitAdd(true)">下一步</a>
        <a @click="submitAdd(false)">保存为草稿</a>
    </div>
</activity-main>
</template>
<style type="text/css">
    .latinos-receive .rule-row .rule-input .KsDaterMultiPicker-input{
        width: 585px !important;
    }
</style>
<script type="text/javascript">
    import activityMain from './activity-main.vue'
    import model from '../../ajax/activity/basic_model'
    export default{
        computed: {
            timesListShadow () {
                let timesList = this.timesList
                return timesList.map(m => m && m.start && m.start.split(':')[0] << 0)
            },
        },
        watch:{
            'daterange'(){
                if(this.daterange.length>1&&this.daterange[1]<this.receiveEndTime){
                    this.latinosData.receiveEndTime=this.daterange[1]+' 23:59:59'
                }else{
                    this.latinosData.receiveEndTime=this.receiveEndTime+' 23:59:59'
                }
                this.latinosData.receiveStartTime=this.daterange[0]+' 00:00:00'
            }
        },
        data(){
            this.model=model(this)
            return{
                timesList:[
                    {start:null,end:null}
                ],
                weeksList:[
                    {name:'周日',checked:true,id:0},
                    {name:'周一',checked:true,id:1},
                    {name:'周二',checked:true,id:2},
                    {name:'周三',checked:true,id:3},
                    {name:'周四',checked:true,id:4},
                    {name:'周五',checked:true,id:5},
                    {name:'周六',checked:true,id:6}
                ],
                daterange:[],
                showstep:2,
                receiveEndTime:'',
                favorList:[],
                latinosData:{
                    favorId:'',
                    step:3,
                    activityId:'',
                    receiveEndTime:'',
                    receiveStartTime:'',
                    validPeriod:-1,
                    name:'',
                    total:'',
                    totalOneDay:'',
                    description:'',
                    smsContent:' ',
                    hasWeeksAndTimes:false,
                },
                addFirst:true
            }
        },
        methods:{
            addtimesList(){
                if(!this.latinosData.hasWeeksAndTimes){
                    this.weeksList=[
                        {name:'周日',checked:true,id:0},
                        {name:'周一',checked:true,id:1},
                        {name:'周二',checked:true,id:2},
                        {name:'周三',checked:true,id:3},
                        {name:'周四',checked:true,id:4},
                        {name:'周五',checked:true,id:5},
                        {name:'周六',checked:true,id:6}
                    ]
                    this.timesList=[{start:null,end:null}]
                }
            },
            timesListAdd(){
                if (this.timesList.length < 9) {
                    this.timesList.push({start: null, end: null})
                }
            },
            gettimesList(data){
                let arr=[];
                _.map(data,(val)=>{
                    arr.push(val.start+' ~ '+val.end);
                })
                return arr;
            },
            getweeks(data){
                let arr=[];
                _.map(data,(val)=>{
                    val.checked?arr.push(val.id):null;
                })
                return arr;
            },
            setweeks(data,weeks){
                let arr=_.cloneDeep(weeks);
                _.map(arr,(val)=>{
                    if(_.difference(data, [''+val.id]).length==data.length){
                        val.checked=false;
                    }
                })
                return arr;
            },
            settimesList(data){
                let times=[];
                if(_.isEmpty(data)){
                    times.push({start:null,end:null})
                    return times;
                }
                data.forEach(m => {
                    let splitedTime = m.split(' ~ ')
                    let time = {
                        start: splitedTime[0] === 'null' ? null : splitedTime[0],
                        end: splitedTime[1] === 'null' ? null : splitedTime[1]
                    }
                    times.push(time)
                })
                return times;
            },
            errHandle (err) {
                dialog('info', err)
            },
            verifyField (data) {
                // 错误名称映射表 表内是需要检测的字段
                let errMapper = {
                    receiveEndTime:'权益领取开始时间',
                    receiveStartTime:'权益领取结束时间',
                    total:'权益总数量',
                    totalOneDay:'权益每天数量',
                    name:'权益名称'
                }
                // 检测是否存在未填写项
                for (let k in data) {
                    let m = data[k]
                    let err = errMapper[k] && new Error(`请检查 ${errMapper[k]} 字段!`)
                    /*global _*/
                    if ((!m && err) || (_.isArray(m) && !m.length && err)) {
                        throw err
                    }
                }
                // 活动时间检查
                if (data.endTime <= data.startTime) {
                    throw new Error('活动开始时间不能大于等于活动结束时间!')
                }
                if (+data.total < +data.totalOneDay) {
                    throw new Error('权益每天数量不能大于权益总数量!')
                }
                if(this.latinosData.hasWeeksAndTimes){
                    // 活动时间段检查
                    let timesList = data.timesList
                    timesList && timesList.forEach(m => {
                        let timesList = m.split(' ~ ')
                        if (timesList[0] === 'null' || timesList[1] === 'null') {
                            throw new Error('可选时间段中的两个选择框都要是必填项!')
                        }
                    })
                }
            },
            date_multi_picker_change(val){
                if(val[0] > this.receiveEndTime){
                    this.daterange[0]= this.receiveEndTime;
                }
                if(val[1] > this.receiveEndTime){
                    this.daterange[1]= this.receiveEndTime;
                    return
                }
                this.latinosData.receiveStartTime=val[0]+' 00:00:00';
                this.latinosData.receiveEndTime=val[1]+' 23:59:59';
            },
            backBasic(){
                this.$router.go({'name':sessionStorage.getItem('rulename'),params:{'ruleId':this.latinosData.activityId}});
            },
            submitAdd(bool){
                let data=_.cloneDeep(this.latinosData);
                data.weeksList=this.getweeks(this.weeksList);
                data.timesList=this.gettimesList(this.timesList);
                data.smsContent=' ';
                data.uuid =JSON.parse(sessionStorage.getItem('loginList')).bankUUID;
                data.organizer =JSON.parse(sessionStorage.getItem('loginList')).organizerID;
                if (true) {
                    try {
                        this.verifyField(data)
                    } catch (e) {
                        this.errHandle(e.message)
                        return
                    }
                }
                _.map(this.favorList,(val)=>{
                    this.addFirst?data.favorId=val.id:data.favorId=data.id=val.id
                    this.model.addReceive(data).then((res)=>{
                        if(res.data.code===0){
                            if (bool) {
                                if(sessionStorage.getItem('rulename')=='Ticket'){
                                    this.$router.go({'name':'ticketbussiness-set','params':{"tactivityId":this.latinosData.activityId}});
                                }else{
                                    this.$router.go({'name':'bussiness-set','params':{"bactivityId":this.latinosData.activityId}});
                                }
                            }else{
                                dialog('successTime','草稿保存成功！')
                            }
                        }
                    })
                })

            },
            getRuleData(data){
                let  ruleTypes={
                    'MeetMinus':['meetMinuses','满多少减多少'],'EveryMeetMinus':['everyMeetMinus','每满多少减多少'],'ImmediatelyMinus':['immediatelyMinus','立减'],'RandomMinus':['randomMinuses','随机立减'],'MeetDiscount':['meetDiscounts','折扣'],'Ticket':['tickets','票务规则'],'SerialDiscount':['serialDiscounts','连环折扣'],'WeekdayDiscount':['weekdayDiscounts','周几几折'],'DateDiscount':['dateDiscounts','几号几折'],'RandomDiscount':['randomDiscounts','随机折扣'],'CouponDiscount':['couponDiscounts','权益打折'],'CouponMinus':['couponMinus','权益金额']
                };
                let datas=_.cloneDeep(data);
                datas.ruleTypes=!data.ruleType?[]:ruleTypes[data.ruleType][0];
                datas.ruleName=!data.ruleType?[]:ruleTypes[data.ruleType][1];
                if(_.isEmpty(datas[datas.ruleTypes])){
                    datas=[];
                    return;
                }
                return datas;
            },
            getRuleString(ruleList,index){
                let ruleString='';
                switch (ruleList.ruleType){
                    case 'MeetMinus':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+= '满'+val.meetMoney+'元，减'+val.minusMoney+'元.';
                        })
                        break;
                    case 'EveryMeetMinus':
                        ruleString+= index+'、每满'+ruleList[ruleList.ruleTypes].meetMoney+'元，减'+ruleList[ruleList.ruleTypes].minusMoney+'元.';
                        break;
                    case 'ImmediatelyMinus':
                        ruleString+= index+'、立减'+ruleList[ruleList.ruleTypes].money+'元.';
                        break;
                    case 'RandomMinus':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+='随机立减'+val.amount+'元，'+val.number+'名.';
                        })
                        break;
                    case 'MeetDiscount':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+='满'+val.meetMoney+'元，打'+val.discount+'折.';
                        })
                        break;
                    case 'Ticket':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+='票务名称'+val.name+'，原价'+val.originalPrice+'元，实付'+val.actualPayment+'元，单次每卡可购'+val.numberLimit+'张.';
                        })
                        break;
                    case 'SerialDiscount':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+='用户刷卡'+val.belowMoney+'，以内，第'+val.time+'次，可享受'+val.discount+'折.';
                        })
                        break;
                    case 'WeekdayDiscount':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+='每周'+val.weekday+'，打'+val.discount+'折.';
                        })
                        break;
                    case 'DateDiscount':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+=val.date+'号,立'+val.discount+'折.';
                        })
                        break;
                    case 'RandomDiscount':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+='随机'+val.discount+'折,'+val.number+'名.';
                        })
                        break;
                    case 'CouponDiscount':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+=val.belowMoney+'元以内, 打'+val.discount+'折优惠.';
                        })
                        break;
                    case 'CouponMinus':
                        ruleString+=index+'、';
                        _.map(ruleList[ruleList.ruleTypes],(val)=>{
                            ruleString+=val.name+':抵扣'+val.deductibleMoney+'元， 每次可使用'+val.number+'张.';
                        })
                        break;
                }
                return ruleString;
            },
            getMoneyString(data){
                let ruleString='';
                _.map(data,(val)=>{
                    if(val.type =='minimum_consume'){
                        ruleString+='最低消费金额:'+val.amount+'元.';
                    }
                    if(val.type =='max_preferential'){
                        ruleString+='最高优惠金额:'+val.amount+'元.';
                    }
                    if(val.type =='less_than'){
                        ruleString+=val.amount+'元内参与打折.';
                    }
                })
                return ruleString;
            },
            getQuantitiesString(data){
                let ruleString='';
                _.map(data,(val)=>{
                    if(val.type =='act_total'){
                        ruleString+='活动总数限制:共'+val.total+'次，每天'+val.totalDay+'次，每周'+val.totalWeek+'次，每月'+val.totalMonth+'次.\n';
                    }
                    if(val.type =='store_card'){
                        ruleString+='商户每卡参与次数:共'+val.total+'次，每天'+val.totalDay+'次，每周'+val.totalWeek+'次，每月'+val.totalMonth+'次.\n';
                    }
                    if(val.type =='store'){
                        ruleString+='每商户参与次数:共'+val.total+'次，每天'+val.totalDay+'次，每周'+val.totalWeek+'次，每月'+val.totalMonth+'次.\n';
                    }
                    if(val.type =='card'){
                        ruleString+='每卡参与次数:共'+val.total+'次，每天'+val.totalDay+'次，每周'+val.totalWeek+'次，每月'+val.totalMonth+'次.\n';
                    }
                    if(val.type =='user'){
                        ruleString+='用户参与次数:共'+val.total+'次，每天'+val.totalDay+'次，每周'+val.totalWeek+'次，每月'+val.totalMonth+'次.\n';
                    }
                })
                return ruleString;
            },
            getRules(data){
                let ruleString,index=1;
                ruleString = index+'、活动名称：'+data.base.name+'\n';index++;
                //活动规则拼接
                let ruleList= this.getRuleData(data.ruleAndLimit);
                if(!_.isEmpty(ruleList)){
                    ruleString+=this.getRuleString(ruleList,index)+'\n';index++;
                }
                //活动时间拼接
                ruleString+= index+'、活动时间：'+data.base.startTime+'至'+data.base.endTime;index++;
                if(!_.isEmpty(data.base.weeksList)){
                    ruleString+=',活动期间:';
                    let weeks=['星期日','星期一','星期二','星期三','星期四','星期五','星期六']
                    _.map(data.base.weeksList,(val,index)=>{
                        index===data.base.weeksList.length-1?ruleString+=weeks[val<<0]:ruleString+=weeks[val<<0]+'、';
                    })
                    ruleString+='使用.\n';
                }
                //金额限制拼接
                if(!_.isEmpty(data.ruleAndLimit.moneys)){
                    ruleString+=index+'、'+this.getMoneyString(data.ruleAndLimit.moneys)+'\n';index++;
                }
                //参与次数限制拼接
                if(!_.isEmpty(data.ruleAndLimit.quantities)){
                    ruleString+=index+'、'+this.getQuantitiesString(data.ruleAndLimit.quantities);index++;
                }
                //活动声明拼接
                ruleString+= index+'、该权益不兑现、不找零。\n';index++;
                ruleString+= index+'、请在权益有效期内到店刷卡使用，并在刷卡前向收银员提供本手机号码。\n';index++;
                ruleString+= index+'、权益发布银行对本权益的最终解释权。'
                return ruleString;
            }
        },
        created(){
            let activityId='';
            !!sessionStorage.getItem('activityId')?activityId=sessionStorage.getItem('activityId'):(activityId=this.$route.params.receiveId << 0 ===0?'':this.$route.params.receiveId << 0 );
            if (activityId) {
                // 获取活动信息
                this.model.geteditList(activityId).then((res)=>{
                    this.latinosData.activityId=activityId;
                    this.$set('favorList',res.data.data.favors);
                    this.latinosData.receiveStartTime=res.data.data.base.startTime;
                    this.latinosData.receiveEndTime=res.data.data.base.endTime;
                    this.receiveEndTime=this.latinosData.receiveEndTime.split(' ')[0];
                    this.daterange=[this.latinosData.receiveStartTime.split(' ')[0],this.latinosData.receiveEndTime.split(' ')[0]]
                    this.latinosData.description=this.getRules(res.data.data);
                    if(!_.isEmpty(res.data.data.favorConfigs)){
                        this.addFirst=false;
                        this.model.searchReceive(res.data.data.favorConfigs[this.favorList.length-1].favorId).then((res)=>{
                            if(res.data.code===0){
                                this.$set('latinosData',res.data.data);
                                this.$set('weeksList',this.setweeks(this.latinosData.weeksList,this.weeksList));
                                this.$set('timesList',this.settimesList(this.latinosData.timesList));
                            }
                        })
                    }else{
                        this.addFirst=true;
                    }
                })
            };
            (this.$route.params.latinosName!=':latinosName')?this.latinosData.name=this.$route.params.latinosName:null;
        },
        components: { activityMain }
    }
</script>