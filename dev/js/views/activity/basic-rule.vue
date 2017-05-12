<template>
<activity-main :propclass="'basic-rule'" :showstep.sync="showstep">
    <div class="rule-row m40">
        活动基本信息
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动名称</div>
        <div class="rule-input">
            <input class="input" type="text" v-model="addData.name" placeholder="请输入活动名称" />
        </div>
    </div>
    <!-- <div class="rule-row">
        <div class="rule-label"><i>*</i>所在地区</div>
        <div class="rule-input">
            <select class="select" v-model="addData.province" @change="getCity">
                <option value="">请选择省份</option>
                <option v-for="n in provinceList" :value="n.id">{{n.name}}</option>
            </select>
            <select class="select" v-model="addData.city">
                <option value="">请选择城市</option>
                <option v-for="n in cityList" :value="n.id">{{n.name}}</option>
            </select>
        </div>
    </div> -->
    <div class="rule-row">
        <div class="rule-label"><i>&nbsp;</i>活动预算</div>
        <div class="rule-input">
            <input class="input" maxlength="8" type="text" v-model="addData.budget" v-limitaddprice="addData.budget" placeholder="请输入预算" />
            <span>元</span>
        </div>
    </div>
    <div class="dashed"></div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动持续时间</div>
        <div class="rule-input">
            <div class="inline">
                <ks-date-picker @change="setincludeTimes" type="datetime" time="00:00:00" placeholder="活动时间" :value.sync="addData.startTime"></ks-date-picker>
                <div class="m20">---</div>
                <ks-date-picker @change="setincludeTimes" type="datetime" time="23:59:59" placeholder="活动时间" :value.sync="addData.endTime"></ks-date-picker>
                <span class="all-time">活动持续<i>{{includeTimes.split(',').length}}</i>天/<i>{{Math.ceil(includeTimes.split(',').length / 7)}}</i>周</span>
            </div>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>可选时间段</div>
        <div class="rule-input">
            <ks-checkbox v-for="n in weeksList" @change="removeIncludeTimes(n.checked,$index)" :checked.sync="n.checked">{{n.name}}</ks-checkbox>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>&nbsp;</i>全天</div>
        <div class="rule-input">
            <ks-switch :color="'#ea6953'" :checked.sync="switch" @change="addtimesList"></ks-switch>
        </div>
    </div>
    <div class="rule-row" v-show="!switch">
        <div class="rule-label"><i>&nbsp;</i>可选时间段</div>
        <!-- 时间多段设定 -->
        <div class="rule-input">
            <div class="db" v-for="n in timesList.length">
                <select class="select" v-model="timesList[n].start" @change="timesList[n].end==''">
                    <option v-for="i in 24" :value="i + ':' + '00'" v-text="i + ':' + '00'">时间</option>
                </select>
                <span class="mr15">至</span>
                <select class="select" v-model="timesList[n].end">
                    <option v-for="i in 23 - timesListShadow[n]"
                            :value="i + timesListShadow[n] + 1 + ':' + '00'"
                            v-text="i + timesListShadow[n] + 1 + ':' + '00'"
                    >时间</option>
                    <option :value="'23:59'" v-text="'23:59'">时间</option>
                </select>
                <i v-if="n===0" class="icon-add" @click="timesList.push({'start':'0:00','end':'23:59'})"></i>
                <i v-if="n!==0" class="icon-remove" @click="timesList.splice(n, 1)"></i>
            </div>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label">    删选时间</div>
        <div class="rule-input" style="position:relative;" v-ks-click-outside="close">
            <a @click="dater.show = true" class="btn btn-primary">删选时间</a>
            <div style="position:absolute;width: 233px;left: 0;top: 40px;">
                <ks-dater style="position: relative; z-index: 9" v-show="dater.show"  type="datemulti"
                          :value.sync="includeTimes" @change="removeDate"
                          placeholder="删选时间"></ks-dater>
            </div>
        </div>
    </div>
    <div class="dashed"></div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动主题</div>
        <div class="rule-input"> 
            <textarea class="input textarea theme"
                      placeholder="最多可输入200个字符"
                      maxlength="200"
                      v-model="addData.subject" ></textarea>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>活动细则</div>
        <div class="rule-input">
            <textarea class="input textarea rule"
                      placeholder="最多可输入500个字符"
                      maxlength="500"
                      v-model="addData.detail"></textarea>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"></div>
        <div class="rule-input">
            <div class="bg-gray">
                <div class="rule-input">
                    <span><i>&nbsp;</i>消费短信提醒</span>
                    <ks-switch :color="'#ea6953'" :checked.sync="smsContentswitch"></ks-switch>
                </div>
                <div class="rule-input">
                    <textarea v-show="smsContentswitch" class="input textarea" v-model="addData.smsContent"
                              maxlength="56"
                              placeholder="请输入发送内容：含标点符号56个汉字加上签名括号，签名必须前置。如【建设银行】尽享5折活动,单笔消费最高可优惠200元"></textarea>
                </div>
            </div>
        </div>
    </div>
    <div class="dashed"></div>
    <div class="rule-row">
        <div class="rule-label"><i>*</i>POS小票内容设置</div>
        <div class="rule-input pos-div">
            <div>
                <div class="pos-span">
                    <!--<span @click="insertPosTicketWildcard('%DISRATE%')">用户折扣</span>-->
                    <!--<span @click="insertPosTicketWildcard('%FAVORAMT%')">优惠金额</span>-->
                    <!--<span @click="insertPosTicketWildcard('%DAYLEFT%')">当天剩余名额</span>-->
                    <!--<span @click="insertPosTicketWildcard('%TOTALLEFT%')">总剩余名额</span>-->
                    <span :class="{'tab-active':addData.posPrint.indexOf('%用户折扣%')>=0}" @click="insertPosTicketWildcard('%用户折扣%')">用户折扣<b v-show="(addData.posPrint.split('%用户折扣%').length-1) >0">*{{addData.posPrint.split('%用户折扣%').length-1}}</b></span>
                    <span :class="{'tab-active':addData.posPrint.indexOf('%优惠金额%')>=0}" @click="insertPosTicketWildcard('%优惠金额%')">优惠金额<b v-show="addData.posPrint.split('%优惠金额%').length-1 >0">*{{addData.posPrint.split('%优惠金额%').length-1}}</b></span>
                    <span :class="{'tab-active':addData.posPrint.indexOf('%当天剩余名额%')>=0}" @click="insertPosTicketWildcard('%当天剩余名额%')">当天剩余名额<b v-show="addData.posPrint.split('%当天剩余名额%').length-1 >0">*{{addData.posPrint.split('%当天剩余名额%').length-1}}</b></span>
                    <span :class="{'tab-active':addData.posPrint.indexOf('%总剩余名额%')>=0}" @click="insertPosTicketWildcard('%总剩余名额%')">总剩余名额<b v-show="addData.posPrint.split('%总剩余名额%').length-1 >0">*{{addData.posPrint.split('%总剩余名额%').length-1}}</b></span>
                </div>
                <div>
                    <textarea  v-el:pos-print  class="input textarea"
                               v-model="addData.posPrint"
                               :maxlength="77"
                               placeholder="恭喜您，总共优惠了n（n=优惠金额）元"></textarea>
                </div>
                <div class="red">
                    注：插入“当天剩余名额”必须设置“限制条件：活动总次数中的“每天次数”。
                    插入“总剩余名额”必须设置“限制条件：活动总次数中的“总次数”。
                </div>
            </div>
        </div>
    </div>
    <div class="rule-row">
        <div class="rule-label"><i>&nbsp;</i>二维码</div>
        <div class="rule-input">
            <input class="input" type="text" v-model="addData.qrcodeUrl" placeholder="请输入POS小票上需要打印的二维码链接" />
        </div>
    </div>
    <div class="rule-row tc footer-btns">
        <a class="btn btn-primary" @click="submitAdd(true)">下一步</a>
        <a @click="submitAdd(false)">保存为草稿</a>
    </div>
</activity-main>
</template>
<script type="text/javascript">
    import activityMain from './activity-main.vue'
    import model from '../../ajax/activity/basic_model'
    export default{
        computed: {
            /**
             * @description 可选时间段的映射
             * @summary 用来实现可选时间段后者大于前者
             */
            timesListShadow () {
                let timesList = this.timesList

                return timesList.map(m => m && m.start && m.start.split(':')[0] << 0)
            },
        },
        data(){
            this.model=model(this)
            return{
                showstep:0,
                // provinceList:[],
                // cityList:[],
                addData:{
                    // province:'',
                    id:'',
                    name:'',
                    // city:'',
                    budget:'',
                    startTime:stringify(new Date()),
                    endTime:stringify(new Date()),
                    actType:'common_act',
                    subject:'',
                    detail:'',
                    propes :sessionStorage.getItem('props'),
                    smsContent:'',
                    posPrint:'',
                    qrcodeUrl:'',
                },
                timesList:[
                    {start:'0:00',end:'23:59'}
                ],
                includeTimes: '',
                dater:{
                    show: false,
                    excludeTimes: [],
                    prevStartTime: '',
                    prevEndTime: ''
                },
                weeksList:[
                    {name:'周日',checked:true,id:0},
                    {name:'周一',checked:true,id:1},
                    {name:'周二',checked:true,id:2},
                    {name:'周三',checked:true,id:3},
                    {name:'周四',checked:true,id:4},
                    {name:'周五',checked:true,id:5},
                    {name:'周六',checked:true,id:6}
                ],
                switch:true,
                smsContentswitch:true,
            }
        },
        methods:{
            initIncludeTimes(val){
                if(!val){
                    this.$nextTick(()=>{
                        this.addData.endTime=this.addData.startTime.split(' ')[0]+' 23:59:59';
                        this.includeTimes=this.addData.startTime.split(' ')[0];
                    })
                }
            },
            getIncludeTimeData(startDate,endDate){
                let newIncludeTimes='';
                for(let i=Date.parse(startDate);i<=Date.parse(endDate);i+=86400000){
                    newIncludeTimes+=stringify(new Date(i))+',';
                }
                newIncludeTimes=newIncludeTimes.substring(0,newIncludeTimes.length-1).split(',');
                _.map(this.weeksList,(val)=>{
                    if(!val.checked){
                        _.remove(newIncludeTimes,(value)=>{
                            let _index=new Date(value).getDay();
                            return _index==val.id;
                        })
                    }
                })
                return newIncludeTimes;
            },
            setincludeTimes(val){
                if(!this.addData.startTime||!this.addData.endTime){
                    this.includeTimes=this.addData.startTime||this.addData.endTime;
                    return;
                }
                if(this.addData.startTime>this.addData.endTime){
                    this.addData.endTime=this.addData.startTime;
                }
                this.$nextTick(()=>{
                    let newIncludeTimes=this.getIncludeTimeData(this.addData.startTime,this.addData.endTime);
                    this.includeTimes=_.join(newIncludeTimes,',');
                    this.initIncludeTimes(this.includeTimes);
                })
            },
            removeIncludeTimes(check,i){
                let data=this.includeTimes.split(',');
                if(check){
                    let newIncludeTimes=this.getIncludeTimeData(this.addData.startTime,this.addData.endTime);
                    this.includeTimes=_.join(newIncludeTimes,',');
                }else{
                    _.remove(data,(val)=>{
                        let _index=new Date(val).getDay();
                        return _index==i;
                    })
                    this.includeTimes=_.join(data,',');
                }
                this.initIncludeTimes(this.includeTimes);
            },
            removeDate(val){
                let data=val.split(',');
                _.remove(data,(val)=>{
                    return _.isEmpty(val);
                })
                if(data.length<1||!val){
                    this.includeTimes='';
                    this.initIncludeTimes(val);
                    return;
                }
//                if(_.min(data)<this.addData.startTime.split(' ')[0]||this.addData.endTime.split(' ')[0]<_.max(data)){
//                    let newIncludeTimes=this.getIncludeTimeData(this.addData.startTime,this.addData.endTime);
//                    this.$nextTick(()=>{
//                        this.includeTimes=_.join(newIncludeTimes,',');
//                    })
//                    return;
//                }
                this.addData.startTime=_.min(data)+' 00:00:00';
                this.addData.endTime=_.max(data)+' 23:59:59';
                this.$nextTick(()=>{
                    this.includeTimes=val;
                })
            },
            addtimesList(){
                this.switch? this.timesList=[{start:'0:00',end:'23:59'}]:null;
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
                // 解析 req 数据
                let times=[];
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
            verifyField (data) {
                // 错误名称映射表 表内是需要检测的字段
                let errMapper = {
                    name: '活动名称',
//                    city: '所在地区',
                    actType: '活动类型',
//                    budget: '活动预算',
                    propes: '活动性质',
                    startTime:'活动开始时间',
                    endTime:'活动结束时间',
                    weeksList: '可选时间段',
                    subject: '活动主题',
                    posPrint:'POS小票内容设置',
                    detail: '活动细则'
                }
                if(this.smsContentswitch){
                    errMapper['smsContent']='消费短信提醒';
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

                // 活动时间段检查
                let timesList = data.timesList
                timesList && timesList.forEach(m => {
                    let timesList = m.split(' ~ ')
                    if (timesList[0] === 'null' || timesList[1] === 'null') {
                        throw new Error('可选时间段中的两个选择框都要是必填项!')
                    }
                })
            },
            submitAdd(bool){
                let data=_.cloneDeep(this.addData);
                data.weeksList=this.getweeks(this.weeksList);
                data.systemId='yhhd';
                data.step =this.showstep+1;
                data.ruleType =this.$route.params.rulename;
                data.timesList=this.gettimesList(this.timesList);
                data.uuid =JSON.parse(sessionStorage.getItem('loginList')).bankUUID;
                data.organizer =JSON.parse(sessionStorage.getItem('loginList')).organizerID;
                data.posPrint=data.posPrint.replace(new RegExp(/(用户折扣)/g),'DISRATE');
                data.posPrint=data.posPrint.replace(new RegExp(/(优惠金额)/g),'FAVORAMT');
                data.posPrint=data.posPrint.replace(new RegExp(/(当天剩余名额)/g),'DAYLEFT');
                data.posPrint=data.posPrint.replace(new RegExp(/(总剩余名额)/g),'TOTALLEFT');
                data.smsContent=!this.smsContentswitch?'':data.smsContent;
                if (true) {
                    try {
                        this.verifyField(data)
                    } catch (e) {
                        this.errHandle(e.message)
                        return
                    }
                }
                !!sessionStorage.getItem('activityId')?data.id=sessionStorage.getItem('activityId'):(data.id=this.$route.params.activityId << 0 ===0?'':this.$route.params.activityId << 0 );
                data.includeTimesList=this.includeTimes.split(',');
                (this.$route.params.rulename==='Ticket')?data.actType='ticket_act':data.actType='common_act';
                this.model.addBasic(data).then((res)=>{
                    if(res.data.code===0){
                        let activityId = this.$route.params.activityId << 0;
                        sessionStorage.setItem('activityId',res.data.data);
                        sessionStorage.setItem('rulename',this.$route.params.rulename);
                        if (bool) {
                            this.$router.go({'name':this.$route.params.rulename});
                        }else{
                            dialog('successTime','草稿保存成功！')
                        }
                    }
                })
            },
            /**
             * @description 错误处理
             * @summary 只是简单的提示用处错误信息
             */
            errHandle (err) {
                dialog('info', err)
            },
            close(){
                this.dater.show=false;
            },
            insertPosTicketWildcard (wildcard) {
                let posPrintTextarea = this.$els.posPrint
                let ABM = this.addData
                if (typeof posPrintTextarea.selectionStart === 'number' &&
                        typeof posPrintTextarea.selectionEnd === 'number') {
                    let startPos = posPrintTextarea.selectionStart
                    let endPos = posPrintTextarea.selectionEnd
                    let cursorPos = startPos
                    let tStr = posPrintTextarea.value

                    // 将字符插入到当前光标位置
                    let resultStr = tStr.substring(0, startPos) + wildcard + tStr.substring(endPos, tStr.length)
                    posPrintTextarea.value = resultStr
                    ABM.posPrint = resultStr

                    // 将光标移动到文本段末尾
                    cursorPos += resultStr.length
                    posPrintTextarea.selectionStart = posPrintTextarea.selectionEnd = cursorPos
                } else {
                    ABM.posPrint += wildcard
                }
            }
        },
        created(){
            // this.getProvince();
            let activityId='';
            !!sessionStorage.getItem('activityId')?activityId=sessionStorage.getItem('activityId'):(activityId=this.$route.params.activityId << 0 ===0?'':this.$route.params.activityId << 0 );
            this.removeDate(this.addData.startTime)
            if (activityId) {
                // 获取活动信息
                this.model.getAddList(activityId).then((res)=>{
                    res.data.data.posPrint=res.data.data.posPrint.replace(new RegExp(/(DISRATE)/g),'用户折扣');
                    res.data.data.posPrint=res.data.data.posPrint.replace(new RegExp(/(FAVORAMT)/g),'优惠金额');
                    res.data.data.posPrint=res.data.data.posPrint.replace(new RegExp(/(DAYLEFT)/g),'当天剩余名额');
                    res.data.data.posPrint=res.data.data.posPrint.replace(new RegExp(/(TOTALLEFT)/g),'总剩余名额');
                    this.smsContentswitch=!res.data.data.smsContent?false:true;
                    this.$set('addData',res.data.data);
                    this.$set('weeksList',this.setweeks(res.data.data.weeksList,this.weeksList));
                    this.$set('timesList',this.settimesList(res.data.data.timesList));
                    res.data.data.timesList.length==1&&res.data.data.timesList[0]==='0:00 ~ 23:59'?this.$set('switch',true):this.$set('switch',false);
                    this.includeTimes=_.join(res.data.data.includeTimesList,',');
                })
            }
        },
        components: { activityMain }
    }
</script>