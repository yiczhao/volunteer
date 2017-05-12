<template>
<activity-main :propclass="'activity-rule'" :datas="datas" :showstep.sync="showstep">
    <div class="rule-row rule-span">
        <h3><i>*</i>活动规则</h3>
        <router-view></router-view> 
    </div>
    <div class="dashed"></div>
    <div class="rule-row reset">
        <h3>活动条件设置</h3>
        <div class="rule-input">
            <!-- <ks-checkbox v-for="n in ruleLists" :checked.sync="n.checked">{{n.name}}</ks-checkbox> -->
            <span v-for="n in ruleLists" class="span" :class="{checked:n.checked}" @click="n.checked=!n.checked">{{n.name}}</span>
        </div>
    </div>
    <div class="rule-row rechoose" v-for="n in ruleLists.length" v-show="ruleLists[n].checked">
        <h3><i>*</i>{{ruleLists[n].name}}</h3>
        <div class="rule-input" v-if="ruleLists[n].types=='CardBin'">
            <div class="db" v-for="(index,n) in ruleDatas.CardBin">
                <span>卡BIN</span>
                <select class="select" v-model="n.data">
                    <option value="">请选择卡片种类</option>
                    <option v-for="n in cardBinLists" :value="n.id">{{n.name}}</option>
                </select>
                <input class="input" type="text" v-model="n.extData" v-limitids="n.extData"/>
                <i v-if="index===0" class="icon-add" @click="ruleDatas.CardBin.push({data :'',extData :''})">新增一条</i>
                <i v-if="index!==0" class="icon-remove" @click="ruleDatas.CardBin.splice(index, 1)">删除一条</i>
            </div>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='act_total'">
            <span>总次数</span>
            <input class="input" type="text" v-model="ruleDatas.act_total.total"  v-limitaddprice="ruleDatas.act_total.total"/>
            <span>每月次数</span>
            <input class="input" type="text" v-model="ruleDatas.act_total.totalMonth"  v-limitaddprice="ruleDatas.act_total.totalMonth"/>
            <span>每周次数</span>
            <input class="input" type="text" v-model="ruleDatas.act_total.totalWeek"  v-limitaddprice="ruleDatas.act_total.totalWeek"/>
            <span>每天次数</span>
            <input class="input" type="text" v-model="ruleDatas.act_total.totalDay"  v-limitaddprice="ruleDatas.act_total.totalDay"/>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='store_card'">
            <span>总次数</span>
            <input class="input" type="text" v-model="ruleDatas.store_card.total"  v-limitaddprice="ruleDatas.store_card.total"/>
            <span>每月次数</span>
            <input class="input" type="text" v-model="ruleDatas.store_card.totalMonth"  v-limitaddprice="ruleDatas.store_card.totalMonth"/>
            <span>每周次数</span>
            <input class="input" type="text" v-model="ruleDatas.store_card.totalWeek"  v-limitaddprice="ruleDatas.store_card.totalWeek"/>
            <span>每天次数</span>
            <input class="input" type="text" v-model="ruleDatas.store_card.totalDay"  v-limitaddprice="ruleDatas.store_card.totalDay"/>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='store'">
            <span>总次数</span>
            <input class="input" type="text" v-model="ruleDatas.store.total"  v-limitaddprice="ruleDatas.store.total"/>
            <span>每月次数</span>
            <input class="input" type="text" v-model="ruleDatas.store.totalMonth"  v-limitaddprice="ruleDatas.store.totalMonth"/>
            <span>每周次数</span>
            <input class="input" type="text" v-model="ruleDatas.store.totalWeek"  v-limitaddprice="ruleDatas.store.totalWeek"/>
            <span>每天次数</span>
            <input class="input" type="text" v-model="ruleDatas.store.totalDay"  v-limitaddprice="ruleDatas.store.totalDay"/>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='card'">
            <span>总次数</span>
            <input class="input" type="text" v-model="ruleDatas.card.total"  v-limitaddprice="ruleDatas.card.total"/>
            <span>每月次数</span>
            <input class="input" type="text" v-model="ruleDatas.card.totalMonth"  v-limitaddprice="ruleDatas.card.totalMonth"/>
            <span>每周次数</span>
            <input class="input" type="text" v-model="ruleDatas.card.totalWeek"  v-limitaddprice="ruleDatas.card.totalWeek"/>
            <span>每天次数</span>
            <input class="input" type="text" v-model="ruleDatas.card.totalDay"  v-limitaddprice="ruleDatas.card.totalDay"/>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='minimum_consume'">
            <span>最低消费</span>
            <input class="input" type="text" v-model="ruleDatas.minimum_consume.amount"  v-limitaddprice="ruleDatas.minimum_consume.amount"/>
            <span>元</span>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='max_preferential'">
            <span>最高优惠额</span>
            <input class="input" type="text" v-model="ruleDatas.max_preferential.amount"  v-limitaddprice="ruleDatas.max_preferential.amount"/>
            <span>元</span>
        </div>
        <div class="rule-input" v-if="ruleLists[n].types=='less_than'">
            <input class="input" type="text" v-model="ruleDatas.less_than.amount"  v-limitaddprice="ruleDatas.less_than.amount"/>
            <span>元内，参与打折</span>
        </div>
    </div>
    <div class="dashed"></div>
    <div class="rule-row tc footer-btns">
        <a class="btn btn-gray" @click="backBasic">上一步</a>
        <a class="btn btn-primary" @click="submitAdd(true)">下一步</a>
        <a @click="submitAdd(false)">保存为草稿</a>
    </div>
</activity-main>
</template>
<style lang="scss">
.activity-rule .rule-row .rule-input .checked{
    background-color: #ea6953!important;color: #fff!important;
}
.activity-rule .rule-row .rule-input .span{
    padding: 0 20px;margin-top: 0;
    color: #777777;background-color: #ededed;cursor: pointer;
}
.activity-rule{
    .KSNRCheckbox__skin{
            opacity: 0;
        }
        .reset h3{
            float: left;
            width: 110px !important;
        }
        .reset .rule-input{
            float: left;
            line-height: 30px !important;font-size: 14px;
        }
        .rechoose{
            padding-left: 160px !important;
        }
        .reset + .rechoose input{
            width: 190px !important;
        }
        .rechoose:not(:first-child) input{
            width: 90px ;
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
}
</style>
<script type="text/javascript">
    import activityMain from './activity-main.vue'
    import model from '../../ajax/activity/rule_model'
    export default{
        computed: {
        },
        data(){
            this.model=model(this)
            return {
                showstep: 1,
                nextBool:true,
                cardBinLists:[],
                ruleLists: [
//                    {name: '卡BIN限制', checked: false, types: 'CardBin',keys:'cardBins'},
//                    {name: '活动总数限制', checked: false, types: 'act_total',keys:'quantities'},
//                    {name: '商户每卡参与次数', checked: false, types: 'store_card',keys:'quantities'},
//                    {name: '每商户参与次数', checked: false, types: 'store',keys:'quantities'},
//                    {name: '每卡参与次数', checked: false, types: 'card',keys:'moneys'},
//                    {name: '最低消费金额', checked: false, types: 'minimum_consume',keys:'moneys'},
//                    {name: '最高优惠金额', checked: false, types: 'max_preferential',keys:'moneys'},
//                    {name: '多少元内参与打折', checked: false, types: 'less_than',keys:'moneys'}
                ],
                ruleDatas:{
                    CardBin: [{data:'',extData :''}],
                    act_total:{total : '' , totalDay : '' , totalMonth : '' , totalWeek : '',type:'act_total',keys:'quantities'},
                    store_card:{total : '' , totalDay : '' , totalMonth : '' , totalWeek : '',type:'store_card',keys:'quantities'},
                    store:{total : '' , totalDay : '' , totalMonth : '' , totalWeek : '',type:'store',keys:'quantities'},
                    card:{total : '' , totalDay : '' , totalMonth : '' , totalWeek : '',type:'card',keys:'quantities'},
                    minimum_consume:{amount : '' ,type:'minimum_consume',keys:'moneys'},
                    max_preferential:{amount : '',type:'max_preferential',keys:'moneys'},
                    less_than:{less_than : '',type:'less_than',keys:'moneys'},
                },
                ruleNames: {
                    'MeetMinus':'meetMinuses',// 满多少减多少
                    'EveryMeetMinus':'everyMeetMinus',// 每满多少减多少
                    'ImmediatelyMinus':'immediatelyMinus',//  立减
                    'RandomMinus':'randomMinuses',// 随机立减
                    'ImmediatelyDiscount':'immediatelyDiscount',//折扣
                    'Ticket':'tickets',// 票务规则
                    'SerialDiscount':'serialDiscounts',//连环折扣
                    'WeekdayDiscount':'weekdayDiscounts',//周几几折
                    'MeetDiscount':'meetDiscounts',// 满多少打几折
                    'DateDiscount':'dateDiscounts',//几号几折
                    'RandomDiscount':'randomDiscounts',//随机折扣
                    'CouponDiscount':'couponDiscounts',//权益打折
                    'CouponMinus':'couponMinus',//权益金额
                }
            }
        },
        methods:{
            getCardBin(){
                this.model.getcardBin().then((res)=>{
                    if(res.data.code===0){
                        this.$set('cardBinLists',res.data.data);
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
            backBasic(){
                let activityId='';
                let rulename=!!sessionStorage.getItem('rulename')?sessionStorage.getItem('rulename'):this.$route.name;
                !!sessionStorage.getItem('activityId')?activityId=sessionStorage.getItem('activityId'):(activityId=this.$route.params.ruleId << 0 ===0?'':this.$route.params.ruleId << 0 );
                this.$router.go({'name':'basic-rule',params:{'activityId':activityId,'rulename':rulename}});
            },
            getNextData(){
                let moneydata={
                    moneys:[],
                    quantities:[]
                };
                _.map(this.ruleLists,(val)=>{
                    if(val.checked&&val.types!='CardBin'){
                        moneydata[val.keys].push(this.ruleDatas[val.types])
                    }
                    if(val.checked&&val.types=='CardBin'){
                        moneydata[val.keys]=this.ruleDatas[val.types];
                    }
                })
                return moneydata;
            },
            submitAdd(bool){
                this.nextBool=bool;
                this.$broadcast('getData');
            },
            getRuleDatas(quantities,moneys){
                _.map(quantities,(val)=>{
                    _.map(this.ruleDatas,(value)=>{
                        if(val.type==value.type){
                            this.ruleDatas[val.type]=val;
                            this.ruleDatas[val.type].type=val.type;
                            this.ruleDatas[val.type].keys='quantities';
                            _.map(this.ruleLists,(vals)=>{
                                if(vals.types==value.type){
                                    vals.checked=true;
                                }
                            })
                        }
                    })
                });
                _.map(moneys,(val)=>{
                    _.map(this.ruleDatas,(value)=>{
                        if(val.type==value.type){
                            this.ruleDatas[val.type]=val;
                            this.ruleDatas[val.type].type=val.type;
                            this.ruleDatas[val.type].keys='moneys';
                            _.map(this.ruleLists,(vals)=>{
                                if(vals.types==value.type){
                                    vals.checked=true;
                                }
                            })
                        }
                    })
                });
            },
            checkRule(data){
                _.map(data,(val)=>{
                    if(!val){
                        throw new Error()
                    }
                })
            },
            verifyField (data) {
                let errMapper = {}
                let checkData=[]
                _.map(data,(val)=>{
                    if(val.checked){
                        checkData.push(this.ruleDatas[val.types])
                        errMapper[val.types]=val.name;
                    }
                })
                for (let k in checkData) {
                    let m = checkData[k];
                    let keys=checkData[k].keys;
                    let err = new Error(`请检查 ${errMapper[checkData[k].type]} 字段!`)
                    if(keys==='quantities'){
                        /*global _*/
                        if (!m.total ||!m.totalDay ||!m.totalMonth ||!m.totalWeek) {
                            err = new Error(`请检查 ${errMapper[checkData[k].type]} 字段!`)
                            throw err
                        }
                        if (m.total<<0 <= 0||m.totalWeek<<0 <= 0||m.totalMonth<<0 <= 0||m.totalWeek<<0 <= 0) {
                            err = new Error(`次数不得为0!`)
                            throw err
                        }
                        if (m.total<<0 < m.totalMonth<<0||m.total<<0 < m.totalWeek<<0||m.total<<0 < m.totalDay<<0) {
                            err = new Error(`总次数不得小于每月、每周、每天次数!`)
                            throw err
                        }
                        if (m.totalMonth<<0 < m.totalWeek<<0||m.totalMonth<<0 < m.totalDay<<0) {
                            err = new Error(`每月次数不得小于每周、每天次数!`)
                            throw err
                        }
                        if (m.totalWeek<<0 < m.totalDay<<0) {
                            err = new Error(`每周次数不得小于每天次数!`)
                            throw err
                        }
                    }
                    else if(keys==='moneys'){
                        if(checkData[k].type=='less_than'){
                            if (!m.less_than) {
                                err = new Error(`请检查 ${errMapper[checkData[k].type]} 字段!`)
                                throw err
                            }
                            if (m.less_than <<0 ===0) {
                                err = new Error(`${errMapper[checkData[k].type]} 不能为0!`)
                                throw err
                            }
                        }else{
                            if (!m.amount) {
                                err = new Error(`请检查 ${errMapper[checkData[k].type]} 字段!`)
                                throw err
                            }
                            if (m.amount <<0 ===0) {
                                err = new Error(`${errMapper[checkData[k].type]} 不能为0!`)
                                throw err
                            }
                        }
                    }
                    else{
                        if (!m[0].data||!m[0].extData) {
                            err = new Error(`请检查卡BIN限制字段!`)
                            throw err
                        }
                    }
                }
            },
        },
        ready(){
            this.$set('ruleLists',this.$children[0].$children[1].ruleLists);
            let activityId = this.$route.params.ruleId << 0||sessionStorage.getItem('activityId');
            if (activityId) {
                this.model.geteditList(activityId).then((res)=>{
                    let rulename=res.data.data.ruleAndLimit.ruleType;
                    let ruleData=res.data.data.ruleAndLimit[this.ruleNames[rulename]];
                    let checked=_.isArray(ruleData)?(!!ruleData&&!!ruleData.length):!!ruleData;
                    if(res.data.code===0&&checked){
                        this.$broadcast('setData',ruleData);
                        if(!!res.data.data.ruleAndLimit.cardBins.length){
                            this.ruleDatas.CardBin=res.data.data.ruleAndLimit.cardBins;
                            this.ruleLists[0].checked=true;
                        }
                        let quantities=res.data.data.ruleAndLimit.quantities;
                        let moneys=res.data.data.ruleAndLimit.moneys;
                        this.getRuleDatas(quantities,moneys);
                    }
                })
            }
        },
        events:{
          getDatas(datas){
              if (true) {
                  let mesa='';
                  try {
                      if(_.isArray(datas)){
                          mesa='请填写完整的规则信息';
                          _.map(datas,(val)=>{
                              this.checkRule(val);
                          });
                      }else{
                          mesa='请填写规则信息';
                          this.checkRule(datas);
                      }
                  } catch (e) {
                      this.errHandle(mesa)
                      return
                  }
                  try {
                      this.verifyField(this.ruleLists)
                  } catch (e) {
                      this.errHandle(e.message)
                      return
                  }
              }
              let sumitdata1=this.getNextData();
              let sumitdata2={};
              let rulename=!!sessionStorage.getItem('rulename')?sessionStorage.getItem('rulename'):this.$route.name;
              sumitdata2[this.ruleNames[rulename]]=datas;
              let submitData=_.assign(sumitdata1, sumitdata2);
              submitData.step=this.showstep+1;
              submitData.ruleType=rulename;
              submitData.id = this.$route.params.ruleId << 0||sessionStorage.getItem('activityId');
              this.model.addRule(submitData).then((res)=>{
                  if(res.data.code===0){
                      if (this.nextBool) {
                          if(rulename=='Ticket'){
                              let ticketData=[]
                              _.map(res.data.data.tickets,(val)=>{
                                  ticketData.push({'ticketId':val.id,'ticketName':val.name});
                              })
                              sessionStorage.setItem('ticketData',JSON.stringify(ticketData));
                              (sessionStorage.getItem('props')==='online')?this.$router.go({'name':'latinos-receive',params:{'receiveId':submitData.id}}):this.$router.go({'name':'ticketbussiness-set','params':{"bactivityId":submitData.id }});
                          }else{
                              (sessionStorage.getItem('props')==='online')?this.$router.go({'name':'latinos-receive',params:{'receiveId':submitData.id}}):this.$router.go({'name':'bussiness-set','params':{"bactivityId":submitData.id }});
                          }
                      }else{
                          dialog('successTime','草稿保存成功！')
                      }
                  }
              })
          }
        },
        created(){
            sessionStorage.removeItem('ticketData');
            this.getCardBin();
        },
        components: { activityMain }
    }
</script>