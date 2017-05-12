<template>
<div class="activity-manage">
    <div class="activity-row activity-title">
        <div class="search-div search-table">
            <div class="conditions-list">
                <span>活动名称</span>
                <input class="input" type="text" v-model="replaceName" placeholder="输入活动名称" @keyup.enter="doSearch"/>
                <span>活动时间</span>
                <ks-date-range-picker placeholder="开始时间,结束时间"
                                      :range.sync="daterange"
                                      :readonly="false"
                                      v-on:change="date_multi_picker_change"></ks-date-range-picker>
                <span>活动性质</span>
                <select class="select" v-model="actPropes" @change="getactPropes">
                    <option value="">全部性质</option>
                    <option value="online">线上活动</option>
                    <option value="offline">线下活动</option>
                </select>
            </div>
            <div class="do-search">
                <a class="btn btn-primary" @click="doSearch">搜索</a>
            </div>
        </div>
        <div class="search-div search-float">
            <span>活动状态</span>
            <ks-checkbox @change="checked(['draft_other'],checkedBox[0])" :checked.sync="checkedBox[0]">草稿</ks-checkbox>
            <ks-checkbox @change="checked(['draft','check_fail','wait_check'],checkedBox[1])" :checked.sync="checkedBox[1]">待审核</ks-checkbox>
            <ks-checkbox @change="checked(['online'],checkedBox[2])" :checked.sync="checkedBox[2]">运行中</ks-checkbox>
            <ks-checkbox @change="checked(['early_offline','finish'],checkedBox[3])" :checked.sync="checkedBox[3]">已结束</ks-checkbox>
        </div>
    </div>
    <div class="table-row">
        <div class="overFlow">
            <table class="table">
                <tr>
                    <th>活动名称</th>
                    <th>活动开始时间</th>
                    <th>活动结束时间</th>
                    <th>线上&线下</th>
                    <th>活动创建时间</th>
                    <th>所属银行</th>
                    <th>活动状态</th>
                    <th>活动详情</th>
                    <th>交易</th>
                    <th>权益</th>
                    <th>操作</th>
                </tr>
                <tr v-show="!!searchList" v-for="n in searchList">
                    <td>{{n.name}}</td>
                    <td>{{n.startTime | datetime}}</td>
                    <td>{{n.endTime | datetime}}</td>
                    <td>
                        <template v-if="n.propes=='online'">线上</template>
                        <template v-else>线下</template>
                    </td>
                    <td>{{n.createdAt | datetime}}</td>
                    <td>{{n.uuid | get_bank uuidsList}}</td>
                    <td>
                        <template v-if="n.status=='draft_other'">草稿</template>
                        <template v-if="n.status=='draft'">待审核</template>
                        <template v-if="n.status=='check_fail'">审核失败</template>
                        <template v-if="n.status=='wait_check'&&n.auditStatus!='wait_early_offline'">待审核</template>
                        <template v-if="n.status=='early_offline'">已结束</template>
                        <template v-if="n.status=='finish'">已结束</template>
                        <template v-if="n.status=='online'">运行中</template>
                        <template v-if="n.status=='wait_early_offline'">运行中</template>
                        <template v-if="n.status=='wait_check'&&n.auditStatus=='wait_early_offline'">运行中</template>
                    </td>
                    <td><a v-link="{name:'activity-info',params:{'infoId':n.id}}">查看</a></td>
                    <td>
                        <!-- <a v-if="n.status!='draft_other'&&n.status!='draft'&&n.status!='wait_check'" v-link="{name:'transaction-detail',params:{'transactionName':n.name,'transactionId':n.uniqueId}}">查看</a> -->
                        <a v-if="n.status!='draft_other'&&n.status!='draft'&&n.status!='check_fail'&&n.auditStatus!='wait_online'" v-link="{name:'transaction-detail',params:{'transactionName':n.name,'transactionId':n.uniqueId}}">查看</a>
                        <span class="color999" v-else>查看</span>
                    </td>
                    <td>
                        <!-- <a v-if="n.propes==='online'&&(n.status!=='draft_other'&&n.status!=='draft'&&n.status!=='check_fail')&&(n.status!=='wait_check'&&n.auditStatus!=='wait_early_offline')"
                           v-link="{name:'atl-search',params:{atlId:n.id}}">查看</a> -->
                           <a v-if="n.propes==='online'&&(n.status!='draft_other'&&n.status!='draft'&&n.status!='check_fail'&&n.auditStatus!='wait_online')" v-link="{name:'atl-search',params:{atlId:n.id}}">查看</a>
                        <span class="color999" v-else>查看</span>
                    </td>
                    <td>
                        <a v-if="n.step==1&&n.status=='draft_other'" @click="setProp(n.propes,n.ruleType)" v-link="{name:'basic-rule',params:{'activityId':n.id,'rulename':n.ruleType}}">编辑</a>
                        <a v-if="n.step==2&&n.status=='draft_other'" @click="setProp(n.propes,n.ruleType)" v-link="{name:n.ruleType,params:{'ruleId':n.id}}">编辑</a>
                        <a v-if="n.step==3&&n.status=='draft_other'" @click="setProp(n.propes,n.ruleType)" v-link="{name:'latinos-receive',params:{'receiveId':n.id}}">编辑</a>
                        <a v-if="n.step==4&&n.status=='draft_other'&&n.ruleType!='Ticket'" @click="setProp(n.propes,n.ruleType)" v-link="{name:'bussiness-set',params:{'bactivityId':n.id}}">编辑</a>
                        <a v-if="n.step==4&&n.status=='draft_other'&&n.ruleType=='Ticket'" @click="setProp(n.propes,n.ruleType)" v-link="{name:'ticketbussiness-set',params:{'tactivityId':n.id}}">编辑</a>
                        <span class="color999" v-if="n.status!='draft_other'">编辑</span>
                        <a v-if="n.status=='draft_other'" @click="deleteID(n.id)">删除</a>
                        <span class="color999" v-else>删除</span>
                    </td>
                </tr>
                <tr v-show="!searchList.length">
                    <td colspan="11">未查询到数据</td>
                </tr>
            </table>
        </div>
        <div v-show="!!searchList">
            <pagegroup
                    :total="searchData.total"
                    :page_size.sync="searchData.maxResult"
                    :page_current.sync="searchData.page"
                    v-on:current_change="getfirstResult"
                    v-on:size_change="getfirstResult"
            ></pagegroup>
        </div>
        <content-dialog
                :show.sync="chooseShow" :is-cancel="true" :type.sync="'infos'"
                :title.sync="contentTitle" @kcancel="chooseShow=false" @kok="deleteActivity">
        </content-dialog>
    </div>
</div>
</template>
<style type="text/css">
    .activity-manage .kdialog__header--infos{
        border-width: 0;
    }
    .activity-manage .kdialog__header--infos .title{
        padding-left: 100px;
    }
    .activity-manage .kdialog{
        min-width: 400px;
    }
    .activity-manage .kdialog__btnwrap{
        width: 260px;
        margin: auto;
    }
    .activity-manage .kbutton:first-child{
        width: 90px;
        margin-left: 5px;
        float: right;
    }
    .activity-manage .kbutton:last-child{
        width: 90px;
        float: left;
    }
    .activity-manage .activity-title .search-div .do-search .btn-primary{
        float: none !important;
    }
</style>
<script type="text/javascript">
    import model from '../../ajax/activity/activity_manage_model'
    export default{
        watch:{
            'daterange'(){
                if(this.daterange.length>1){
                    this.searchData.endTime=this.daterange[1]+' 23:59:59'
                }else{
                    this.searchData.startTime=this.daterange[0]+' 00:00:00'
                    this.searchData.endTime=''
                }
            }
        },
        data(){
            this.model=model(this)
            return{
                searchList:[],
                actPropes:'',
                uuidsList:JSON.parse(sessionStorage.getItem('bankNames')),
                searchData:{
                    sorts:'createdAt|desc',
                    name:'',
                    actPropes:null,
                    startTime:'',
                    endTime:'',
                    statuses:['online','draft_other','draft','wait_check','check_fail','early_offline','finish'],
                    page:1,
                    firstResult:0,
                    maxResult:10,
                    uuids:_.split(sessionStorage.getItem('uuids'), ','),
                    systemId:'yhhd',
                    total:0,
                },
                checkedBox:[true,true,true,true],
                replaceName:'',
                daterange:[],
                chooseShow:false,
                contentTitle:'删除此条活动？',
                deleteId:'',
            }
        },
        methods:{
            date_multi_picker_change(val){
                this.searchData.startTime=val[0]+' 00:00:00';
                this.searchData.endTime=val[1]+' 23:59:59';
            },
            doSearch(){
                this.searchData.page=1;
                this.searchData.name=(this.replaceName).replace(/(^\s+)|(\s+$)/g, "");
                this.searchData.firstResult=(this.searchData.page-1)*this.searchData.maxResult;
                this.getList();
            },
            getfirstResult(){
                let page=this.searchData.page;
                let firstResult=(page-1)*this.searchData.maxResult;
                this.searchData.page=page;
                this.searchData.firstResult=firstResult;
                this.getList();
            },
            setProp(val,val1){
                sessionStorage.setItem('props',val)
                sessionStorage.setItem('rulename',val1)
            },
            getactPropes(){
                (!this.actPropes)?this.searchData.actPropes=null:this.searchData.actPropes= this.actPropes;
            },
            checked(type,bool){
                if(bool){
                    this.searchData.statuses=_.concat(this.searchData.statuses,type);
                }else{
                    _.pullAll(this.searchData.statuses,type);
                }
                if(!this.searchData.statuses.length){
                    this.$set('searchList',[]);
                    this.searchData.total=0;
                }else{
                    this.doSearch();
                }
            },
            getList(){
                if(!this.searchData.statuses.length){
                    this.$set('searchList',[]);
                    this.searchData.total=0;
                    return;
                }
                back_json.saveArray(this.$route.path,this.searchData);
                this.model.getList(this.searchData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('searchList',res.data.data);
                        this.searchData.total=res.data.total;
                    }
                });
                this.chooseShow=false;
            },
            deleteActivity(){
                this.model.deleteActivity(this.deleteId).then((res)=>{
                    if(res.data.code===0){
                        dialog('successTime','已删除')
                        this.getList();
                    }
                })
            },
            deleteID(_id){
                this.deleteId=_id;
                this.chooseShow=true;
            },
            getHistoryData(){
                this.$set('searchData',back_json.fetchArray(this.$route.path));
                this.searchData.statuses=['online','draft_other','draft','wait_check','check_fail','early_offline','finish'];
                (!this.searchData.actPropes)?this.actPropes='':this.actPropes= this.searchData.actPropes;
            }
        },
        ready(){
            sessionStorage.removeItem('activityId');
            this.$nextTick(()=>{
                (back_json.isback&&back_json.fetchArray(this.$route.path))?this.getHistoryData():null;
                this.getList();
            })
        },
        created(){
        }
    }
</script>