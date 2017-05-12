<template>
    <div class="header">
        <div class="header-logo"></div>
        <div class="header-title">场景全支付增值平台</div>
        <div class="header-infor">
            <div class="function-click" v-link="{name:'login'}"></div>
        </div>
    </div>
    <div class="page-title">{{title}}</div>
    <div class="forgetpassword-config">
        <div class="bg">
            <div class="four-type">
                <div class="pr" :class="{'active':forgetShow=='1'}">
                    <div class="w265" >1.输入账号</div>
                </div>
                <div class="pr" :class="{'active':forgetShow=='2'}">
                    <div class="w265" >2.验证身份</div>
                </div>
                <div class="pr" :class="{'active':forgetShow=='3'}">
                    <div class="w265" >3.验证密保手机</div>
                </div>
                <div class="pr" :class="{'active':forgetShow=='4'}">
                    <div class="w265" >4.设置新密码</div>
                </div>
            </div>
            <div class="forget-1" v-show="forgetShow==1">
                <div class="form-row">
                    <div class="form-input"><input v-model="passwordData.phone" maxlength="11" v-limitnumber="passwordData.phone" type="text" class="input" placeholder="请输入手机号"/></div>
                </div>
                <div class="form-row">
                    <div class="form-input"><input @keyup.enter="savePassword(1)" type="text" v-model="passwordData.usrImgCode" class="input input245" placeholder="请输入图片中的数字或字母"/></div>
                    <div class="img" @click="getusrImgCode"><img :src="sysCodeImg"/></div>
                </div>
                <div class="form-row f11">
                    <a class="btn btn-primary" @click="savePassword(1)">下一步</a>
                </div>
            </div>
            <div class="forget-2" v-show="forgetShow==2">
                <div class="verify-title">您正在为账号{{passwordData.phone}}找回密码，为了保护账号安全，需要身份验证</div>
                <div class="form-row f18">
                    <img src="../../../img/phone.png" alt="">
                    通过密保手机{{passwordData.phone | filter_phone}}验证
                    <a style="width: 70px;float:right;margin-top: 22px;background-color: #e76b5f" class="btn btn-primary" @click="savePassword(2)">立即验证</a>
                </div>
            </div>
            <div class="forget-3" v-show="forgetShow==3">
                <div class="form-row f2">
                    短信验证码已发送至{{passwordData.phone | filter_phone}}
                </div>
                <div class="form-row f18">
                    <div class="form-label">
                        <input type="text" v-model="passwordData.userMessageCode"  @keyup.enter="savePassword(3)" class="input" placeholder="请输入短信验证码"/>
                        <a class="btn btn-gray" v-show="time>0">倒计时{{time}}</a>
                        <a class="btn btn-primary" @click="getUserMessageCode" v-show="time==0">重发验证码</a>
                    </div>
                </div>
                <div class="form-row f11">
                    <a class="btn btn-primary" @click="savePassword(3)">下一步</a>
                </div>
                <div class="form-row f17">
                    如无法接收验证码，请与客服联系。客服电话：400-0192-266
                </div>
            </div>
            <div class="forget-4" v-show="forgetShow==4">
                <div class="form-row f2">
                    密码长度6-20位，建议字母、数字与标点的组合来提高账号安全度
                </div>
                <div class="form-row">
                    <div class="form-input"><input type="password" maxlength="20" v-model="passwordData.newPassword" class="input" placeholder="请输入新密码"/></div>
                </div>
                <div class="form-row">
                    <div class="form-input"><input type="password" maxlength="20" @keyup.enter="savePassword(4)" v-model="passwordData.confirmPassword" class="input" placeholder="请再次输入新密码"/></div>
                </div>
                <div class="form-row f11">
                    <a class="btn btn-primary" @click="savePassword(4)">提交</a>
                </div>
            </div>
        </div>
    </div>
    <div class="footer" style="margin-top: 233px">
        <div class="footer-title" style="margin-left: 0px">
            <div>©2010-2016 kashuo.com</div>
            <div>
                <span>赣ICP备11001642号-1</span>
                <span>赣工商网备第201011300310427299号</span>
                <span>南昌网安备案第36010</span>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
    export default{
        data(){
            return{
                title:'忘记密码设置',
                time:60,
                forgetShow:1,
                id:'',
                sysCodeImg:'',
                usrImgCode:'',
                passwordData:{
                    usrImgCode:'',
                    phone:'',
                    userMessageCode:'',
                    newPassword:'',
                    confirmPassword:''
                }
            }
        },
        methods:{
            times(){
                let t;
                this.time--;
                t = setTimeout(this.times, 1000);
                if ( this.time <= 0 ){
                    clearTimeout(t);
                }
            },
            getusrImgCode(){
                formDataRequest('./verify/create_img_code').get().then((res)=>{
                    if(res.data.code===0){
                        this.sysCodeImg="data:image/png;base64,"+res.data.data.image;
                        this.usrImgCode=res.data.data.sysImgCode;
                        this.id=res.data.data.id;
                    }
                })
            },
            getUserMessageCode(){
                this.$http.post('./verify/send_message_code?id='+this.id).then((res)=>{
                    if(res.data.code===0){
                        this.time=60;
                        this.times();
                    }
                })
            },
            savePassword(_num){
                switch (_num){
                    case 1:
                        if(!this.passwordData.phone){
                            dialog('info','请输入手机号！');
                            return;
                        }
                        if(!this.passwordData.usrImgCode){
                            dialog('info','请输入验证码！');
                            return;
                        }
                        if(_.capitalize(this.usrImgCode)!=_.capitalize(this.passwordData.usrImgCode)){
                            this.getusrImgCode();
                            dialog('info','验证码不正确,请重新输入！');
                            return;
                        }
                        let data0={
                            id:this.id,
                            phone:this.passwordData.phone,
                            usrImgCode:this.passwordData.usrImgCode
                        }
                        this.$http.post('./verify/verify_img_code',data0).then((res)=>{
                            if(res.data.code==0){
                                this.forgetShow=2;
                                sessionStorage.setItem('forgetShow',2);
                                sessionStorage.setItem('forgetid',this.id);
                                sessionStorage.setItem('forgetphone',this.passwordData.phone);
                            }
                        })
                        break;
                    case 2:
                        this.$http.post('./verify/send_message_code?id='+this.id).then((res)=>{
                            if(res.data.code==0){
                                this.forgetShow=3;
                                sessionStorage.setItem('forgetShow',3);
                                this.times();
                            }
                        })
                        break;
                    case 3:
                        if(!this.passwordData.userMessageCode){
                            dialog('info','请输入验证码！');
                            return;
                        }
                        let data1={
                            id:this.id,
                            phone:this.passwordData.phone,
                            userMessageCode:this.passwordData.userMessageCode
                        }
                        this.$http.post('./verify/verify_message_code',data1).then((res)=>{
                            if(res.data.code==0){
                                this.forgetShow=4;
                                sessionStorage.setItem('forgetShow',4);
                            }
                        })
                        break;
                    case 4:
                        if(!this.passwordData.newPassword|| !this.passwordData.confirmPassword){
                            dialog('info','请输入密码！');
                            return;
                        }
                        if(this.passwordData.newPassword!==this.passwordData.confirmPassword){
                            dialog('info','两次密码输入不一致！');
                            return;
                        }
                        if(!this.passwordData.newPassword.replace(/\s/g, "")){
                            dialog('info','密码不能为全部空格！');
                            return;
                        }
                        let data2={
                            id:this.id,
                            phone:this.passwordData.phone,
                            newPassword:this.passwordData.newPassword,
                            confirmPassword:this.passwordData.confirmPassword
                        }
                        this.$http.post('./verify/update_password',data2).then((res)=>{
                            if(res.data.code==0){
                                dialog('successTime',res.data.message)
                                setTimeout(()=>{
                                    this.$router.go({'name':'login'});
                                },2000)
                            }else if(res.data.code===-1){
                                setTimeout(()=>{
                                    this.forgetShow=1;
                                    sessionStorage.setItem('forgetShow',1);
                                },2000)
                                this.getusrImgCode();
                            }
                        })
                        break;
                }
            }
        },
        ready(){
            window.onbeforeunload=()=>{
                sessionStorage.setItem('forgettime',this.time);
            }
            !!sessionStorage.getItem('forgetShow')?this.forgetShow=sessionStorage.getItem('forgetShow')>>0:null;
            !!sessionStorage.getItem('forgetid')?this.id=sessionStorage.getItem('forgetid'):null;
            !!sessionStorage.getItem('forgetphone')?this.passwordData.phone=sessionStorage.getItem('forgetphone'):null;
            this.forgetShow==1?this.getusrImgCode():null;
            if(this.forgetShow==3){
                this.time=sessionStorage.getItem('forgettime')<=0?0:sessionStorage.getItem('forgettime');
                this.time>0?this.times():null;
            }
        }
    }
</script>