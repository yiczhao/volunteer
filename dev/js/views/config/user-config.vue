<template>
    <div class="user-config">
        <div class="form-row">
            <a class="btn btn-info" @click="addUser">新增用户</a>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>序号</th>
                    <th>银行名称</th>
                    <th>行政级别</th>
                    <th>用户名</th>
                    <th>手机号</th>
                    <th>创建时间</th>
                    <th>创建人</th>
                    <th>账号状态</th>
                    <th>操作</th>
                </tr>
                <tr v-show="!!userList" v-for="n in userList">
                    <td>{{$index+1}}</td>
                    <td>{{n.bankName}}</td>
                    <td>
                        <template v-if="n.bankLevel==1">一级分行</template>
                        <template v-if="n.bankLevel==2">二级分行</template>
                        <template v-if="n.bankLevel==3">信用卡部</template>
                        <template v-if="n.bankLevel==4">营业部</template>
                    </td>
                    <td>{{n.name}}</td>
                    <td>{{n.phone}}</td>
                    <td>{{n.createTime | datetime}}</td>
                    <td>{{n.createUserName}}
                    </td>
                    <td>
                        <template v-if="n.status">启用</template>
                        <template v-else>禁用</template>
                    </td>
                    <td>
                        <a @click="showInfo(n.id)">详情</a>
                        <template v-if="n.editable">
                            <a @click="showEdit(n.id)">编辑</a>
                        </template>
                        <template v-else>
                            <span class="color999">编辑</span>
                        </template>
                    </td>
                </tr>
            </table>
            <pagegroup
                :total="objectotalNumber"
                :page_size.sync="defaultData.pageSize"
                :page_current.sync="defaultData.pageIndex"
                v-on:current_change="getList"
                v-on:size_change="getList"
            ></pagegroup>
        </div>
        <content-dialog
                :show.sync="addshow" :is-cancel="true" :type.sync="'infos'"
                :title.sync="addTitle" @kok="addBtn" @kcancel="cancelAll"
        >
            <div class="create-user">
                <div class="form-group" v-if="addList.id!=loginUserID">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <select v-model="addList.bankID" class="select">
                        <option :value="" disabled="disabled">选择银行</option>
                        <option v-for="(index,n) in bankLists" :value="n.id">{{n.shortName}}</option>
                    </select>
                </div>
                <div class="form-group confirm-text">
                    <label class="name-left" v-show="checkText.bankName==true">请选择银行</label>
                </div>
                <div class="form-group" v-if="addList.id==loginUserID">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <span class="catch-infor">{{addList.bankName}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>用户名</label>
                    <input type="text" class="input" v-model="addList.name" placeholder=" 请输入用户名">
                    <ks-checkbox :checked.sync="loginAccountType1"  @change="getloginAccountType(loginAccountType1,loginAccountType2)">可作为登录账号</ks-checkbox>
                </div>
                <div class="form-group confirm-text">
                    <label class="name-left" v-show="checkText.name==true">请输入用户名</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>手机号码</label>
                    <input type="text" class="input" v-model="addList.phone" @change="changePassword(false)" v-limitnumber="addList.phone" placeholder="请输入真实手机号码">
                    <ks-checkbox :checked.sync="loginAccountType2"  @change="getloginAccountType(loginAccountType1,loginAccountType2)">可作为登录账号</ks-checkbox>
                </div>
                <div class="form-group confirm-text">
                    <label class="name-left" v-show="checkText.phone==true">请输入真实的手机号码</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>密码</label>
                    <input type="password" class="input" v-model="addList.curPassword" @focus="changecurPassword"  placeholder="填写密码或勾选">
                    <ks-checkbox :checked.sync="passWordCheck" v-show="!!addList.phone" @change="changePassword(passWordCheck)">默认 手机号作为密码</ks-checkbox>
                </div>
                <div class="form-group confirm-text">
                    <label class="name-left" v-show="checkText.curPassword==true">请填写密码或者勾选</label>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>状态</label>
                        <ks-radio :checked.sync="addList.status" :value="'false'" name="TEST1">禁用</ks-radio>
                        <ks-radio :checked.sync="addList.status" :value="'true'" name="TEST1">启用</ks-radio>
                </div>
                <div class="form-group confirm-text">
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>功能级</label>
                    <div class="function-area">
                        <!-- <div class="checkAll" :class="{'checked':checkAll}" @click.stop="checkedAll"><b></b><span>全选</span></div> -->
                        <div class="choose-checkbox">
                            <div class="checkAll" :class="{'checked':checkAll[0]}" @click.stop="checkedAll(1)"><b></b><span>卡类活动</span></div>
                            <template v-for="n in privileges" v-if="n.type==1">
                                <ks-checkbox  @change="getCheckAll" :checked.sync="n.selected" :name="n.name">
                                    <span>卡类{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll" :class="{'checked':checkAll[1]}" @click.stop="checkedAll(2)"><b></b><span>券码活动</span></div>
                            <template v-for="n in privileges" v-if="n.type==2">
                                <ks-checkbox  @change="getCheckAll" :checked.sync="n.selected" :name="n.name">
                                    <span>券码{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll" :class="{'checked':checkAll[2]}" @click.stop="checkedAll(3)"><b></b><span>查询</span></div>
                            <template v-for="n in privileges" v-if="n.type==3">
                                <ks-checkbox  @change="getCheckAll" :checked.sync="n.selected" :name="n.name">
                                    <span>{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll" :class="{'checked':checkAll[3]}" @click.stop="checkedAll(4)"><b></b><span>终端管理</span></div>
                            <template v-for="n in privileges" v-if="n.type==4">
                                <ks-checkbox  @change="getCheckAll" :checked.sync="n.selected" :name="n.name">
                                    <span>{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll" :class="{'checked':checkAll[4]}" @click.stop="checkedAll(5)"><b></b><span>商户管理</span></div>
                            <template v-for="n in privileges" v-if="n.type==5">
                                <ks-checkbox  @change="getCheckAll" :checked.sync="n.selected" :name="n.name">
                                    <span>{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll" :class="{'checked':checkAll[6]}" @click.stop="checkedAll(7)"><b></b><span>设置</span></div>
                            <template v-for="n in privileges" v-if="n.type==7">
                                <ks-checkbox  @change="getCheckAll" :checked.sync="n.selected" :name="n.name">
                                    <span>{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <!-- <div class="choose-checkbox">
                            <template v-for="n in privileges" v-if="n.type==6">
                                <ks-checkbox  @change="checked(!n.selected,n.id)" :checked.sync="n.selected" :name="n.name">
                                    <span>{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div> -->
                    </div>
                </div>
                <div class="form-group confirm-text">
                    <label class="name-left" v-show="checkText.privilegeIDs==true">请至少选择一项功能级</label>
                </div>
            </div>
        </content-dialog>
        <content-dialog
                :show.sync="infoshow" :is-button="false" :type.sync="'infos'"
                :title.sync="'查看详情'"
        >
            <div class="create-user">
                <div class="form-group">
                    <label class="name-left"><i>*</i>银行名称</label>
                    <span class="catch-infor">{{addList.bankName}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>行政级别</label>
                    <span class="catch-infor">
                         <template v-if="addList.bankLevel==1">一级分行</template>
                         <template v-if="addList.bankLevel==2">二级分行</template>
                         <template v-if="addList.bankLevel==3">信用卡部</template>
                         <template v-if="addList.bankLevel==4">营业部</template>
                    </span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>用户名</label>
                    <span class="catch-infor">{{addList.name}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>手机号码</label>
                    <span class="catch-infor">{{addList.phone}}</span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>状态</label>
                    <span class="catch-infor">
                        <template v-if="!addList.status">禁用</template>
                        <template v-if="addList.status">启用</template>
                    </span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>功能级</label>
                    <div class="function-area">
                        <div class="choose-checkbox">
                            <div class="checkAll disable" :class="{'checked':checkAll[0]}"><b></b><span>卡类活动</span></div>
                            <template v-for="n in privileges" v-if="n.type==1">
                                <ks-checkbox  :disable="true" :checked.sync="n.selected" :name="n.name">
                                    <span>卡类{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll disable" :class="{'checked':checkAll[1]}"><b></b><span>券码活动</span></div>
                            <template v-for="n in privileges" v-if="n.type==2">
                                <ks-checkbox  :disable="true" :checked.sync="n.selected" :name="n.name">
                                    <span>券码{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll disable" :class="{'checked':checkAll[2]}"><b></b><span>查询</span></div>
                            <template v-for="n in privileges" v-if="n.type==3">
                                <ks-checkbox  :disable="true" :checked.sync="n.selected" :name="n.name">
                                    <span>{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll disable" :class="{'checked':checkAll[3]}"><b></b><span>终端管理</span></div>
                            <template v-for="n in privileges" v-if="n.type==4">
                                <ks-checkbox  :disable="true" :checked.sync="n.selected" :name="n.name">
                                    <span>{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll disable" :class="{'checked':checkAll[4]}"><b></b><span>商户管理</span></div>
                            <template v-for="n in privileges" v-if="n.type==5">
                                <ks-checkbox  :disable="true" :checked.sync="n.selected" :name="n.name">
                                    <span>{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                        <div class="choose-checkbox">
                            <div class="checkAll disable" :class="{'checked':checkAll[6]}"><b></b><span>设置</span></div>
                            <template v-for="n in privileges" v-if="n.type==7">
                                <ks-checkbox  :disable="true" :checked.sync="n.selected" :name="n.name">
                                    <span>{{n.name}}</span>
                                </ks-checkbox>
                            </template>
                        </div>
                    </div>
                </div>
                <div class="form-group close-center">
                    <a class="btn btn-gray" @click="this.infoshow=false">关闭</a>
                </div>
            </div>
        </content-dialog>
    </div>
</template>
<style lang="scss">
    .user-config{
        .kdialog__btnwrap{
            padding-top:0;padding-bottom:0;height:65px;
        }
        .disable b{
            background: rgba(77, 77, 77, 0.1);
        }
    }
</style>
<script type="text/javascript">
    import model from '../../ajax/config/user_model'
    export default{
        data(){
            this.model=model(this)
            return{
                loginUserID:JSON.parse(sessionStorage.getItem("loginList")).id,
                checkboxList:[],
                objectotalNumber:1,
                defaultData:{
                    pageIndex:1,
                    pageSize:10,
                },
                addTitle:'',
                bankLevelList:[],
                addshow:false,
                infoshow:false,
                loginAccountType1:true,
                loginAccountType2:true,
                passWordCheck:false,
                userList:[],
                checkAll:[false,false,false,false,false,false,false],
                bankLists:[],
                privileges:[],
                addList:{
                    bankID:'',
                    bankLevel:'',
                    bankName:'',
                    name:'',
                    phone:'',
                    curPassword :'',
                    status:'true',
                    loginAccountType:'3',
                    privilegeIDs:[]
                },
                checkText:{
                    bankName:false,
                    name:false,
                    phone:false,
                    curPassword :false,
                    privilegeIDs:false,
                },
            }
        },
        methods:{
            cancelAll(){
                this.addshow=false;
                this.checkAll=[false,false,false,false,false,false,false];
            },
            getCheckAll(){
                let check=[true,true,true,true,true,true,true];
                _.map(this.privileges,(val)=>{
                    if(!val.selected){
                        check[val.type-1]=false;
                    }
                })
                this.checkAll=check;
            },
            checkedAll(type){
                let data=_.cloneDeep(this.privileges);
                let checks=_.cloneDeep(this.checkAll);
                if(!this.checkAll[type-1]){
                    _.map(data,(val)=>{
                        if(val.type===type){
                            val.selected=true;
                        }
                    })
                    checks[type-1]=true;
                }else{
                    _.map(data,(val)=>{
                        if(val.type===type){
                            val.selected=false;
                        }
                    })
                    checks[type-1]=false;
                }
                this.$set('privileges',data);
                this.$set('checkAll',checks);
            },
            getList(){
                this.model.getUserList(this.defaultData).then((res)=>{
                    if(res.data.code===0){
                        this.$set('userList',res.data.dataList);
                        this.$set('objectotalNumber',res.data.objectotalNumber);
                    }
                })
            },
            initList(){
                this.cancelAll();
                this.getList();
            },
            getBankList(){
                this.model.getBanklevelList().then((res)=>{
                    if(res.data.code===0){
                        this.bankLevelList=res.data.dataList;
                        this.addList.bankLevel=''+this.bankLevelList[0];
                    }
                })
                this.model.getPrivilegesList().then((res)=>{
                    if(res.data.code===0){
                        this.$set('privileges',res.data.dataList);
                        _.map(this.privileges,(val)=>{
                            val.selected=false;
                        })
                    }
                })
                let requestParam = {
                    "noPage":1,
                    "status":1,
                    "isEdit":1
                };
                this.model.getBankList(requestParam).then((res)=>{
                    if (res.data.code ===0){
                        this.$set('bankLists', res.data.dataList);
                    }
                })
            },
            addUser(){
                this.addList={
                    bankLevel:'',
                    bankName:'',
                    name:'',
                    phone:'',
                    curPassword :'',
                    status:'true',
                    loginAccountType:'3',
                    privilegeIDs:[]
                }
                this.loginAccountType1=true;
                this.loginAccountType2=true;
                this.addTitle='新增用户';
                this.addshow=true;
                this.clear();
            },
            clear(){
                    this.checkText.bankName=false;
                    this.checkText.name=false;
                    this.checkText.phone=false;
                    this.checkText.curPassword=false;
                    this.checkText.privilegeIDs=false;
            },
            showInfo(_id){
                this.model.getUserInfo(_id).then((res)=>{
                    if(res.data.code===0){
                        this.$set('addList',res.data.data);
                        this.$set('privileges',res.data.data.privilegeList);
                        this.getCheckAll();
                        this.infoshow=true;
                    }
                })
            },
            showEdit(_id){
                this.addTitle='编辑用户';
                this.passWordCheck=false;
                this.getBankList();
                this.model.getUserInfo(_id).then((res)=>{
                    if(res.data.code===0){
                        // console.log(res.data.data);
                        this.$set('addList',res.data.data);
                        this.$set('privileges',res.data.data.privilegeList);
                        this.addList.status=''+this.addList.status;
                        this.addList.curPassword='::::::';
                        this.addList.privilegeIDs=[];
                        _.map(this.privileges,(val)=>{
                            if(val.selected){
                                this.addList.privilegeIDs.push(val.id);
                            }
                        })
                        if(!this.addList.loginAccountType){
                            this.loginAccountType1=false;
                            this.loginAccountType2=false;
                        } 
                        if(this.addList.loginAccountType=='1'){
                            this.loginAccountType1=true;
                            this.loginAccountType2=false;
                        }
                        if(this.addList.loginAccountType=='2'){
                            this.loginAccountType1=false;
                            this.loginAccountType2=true;
                        }
                        if(this.addList.loginAccountType=='3'){
                            this.loginAccountType1=true;
                            this.loginAccountType2=true;
                        }
                        this.getCheckAll();
                        this.addshow=true;
                    }
                })
            },
            addBtn(){
                this.checkText.bankName=false;
                this.checkText.name=false;
                this.checkText.phone=false;
                this.checkText.curPassword=false;
                this.checkText.privilegeIDs=false;
                (this.addTitle=='新增用户')?this.addUserTrue():this.editUserTrue();
            },
            checkedData(){
                this.addList.privilegeIDs=[];
                _.map(this.privileges,(val)=>{
                    if(val.selected){
                        this.addList.privilegeIDs.push(val.id);
                    }
                })
                if(!this.addList.bankID){this.checkText.bankName=true;return false}else{this.checkText.bankName=false};
                if(!this.addList.name){this.checkText.name=true;return false}else{this.checkText.name=false};
                if(!this.addList.phone){this.checkText.phone=true;return false}else{this.checkText.phone=false};
                if(!this.addList.curPassword){this.checkText.curPassword=true;return false}else{this.checkText.curPassword=false};
                if(this.addList.privilegeIDs.length==0){this.checkText.privilegeIDs=true;return false}else{this.checkText.privilegeIDs=false};
                return true;
            },
            addUserTrue(){
                if(this.checkedData()){
                    this.addList.privilegeList=_.cloneDeep(this.privileges);
                    this.model.addUser(this.addList).then((res)=>{
                        if(res.data.code===0){
                            dialog('success',res.data.message)
                            this.initList();
                        }
                    })
                }
            },
            editUserTrue(){
                if(this.checkedData()){
                    this.addList.privilegeList=_.cloneDeep(this.privileges);
                    this.model.editUser(this.addList).then((res)=>{
                        if(res.data.code===0){
                            dialog('success',res.data.message)
                            this.initList();
                        }
                    })
                }
            },
            getloginAccountType(bool1,bool2){
                if(bool1){
                    this.addList.loginAccountType='1';
                }
                if(bool2){
                    this.addList.loginAccountType='2';
                }
                if(bool1&&bool2){
                    this.addList.loginAccountType='3';
                }
                if(!bool1&&!bool2){
                    this.addList.loginAccountType='';
                }
            },
            changePassword(bool){
                if(bool){
                    this.addList.curPassword =this.addList.phone;
                }else{
                    this.addList.curPassword ='';
                    this.passWordCheck=false;
                }
            },
            changecurPassword(){
                this.addList.curPassword=='::::::'?this.addList.curPassword='':null
                this.passWordCheck=false;
            },
        },
        ready(){
            this.getList();
        }
    }
</script>