<template>
    <div class="password-config">
        <div class="bg">
            <div class="four-type">
                <div class="pr" :class="{'active':passwordShow=='1'}">
                    <div class="w265">1.验证身份</div>
                </div>
                <div class="pr" :class="{'active':passwordShow=='2'}">
                    <div class="w265">2.验证密保手机</div>
                </div>
                <div class="pr" :class="{'active':passwordShow=='3'}">
                    <div class="w265">3.设置新密码</div>
                </div>
            </div>
            <div class="verify-1" v-show="passwordShow==1">
                <div class="verify-title">您正在为账号{{phone}}找回密码，为了保护账号安全，需要身份验证</div>
                <div class="form-row f18">
                    <img src="../../../img/phone.png" alt="">
                    通过密保手机{{phone | filter_phone}}验证
                    <a style="width: 70px;float:right;margin-top: 22px;background-color: #e76b5f" class="btn btn-primary" @click="verifyIdentity">立即验证</a>
                </div>
            </div>
            <div class="verify-2" v-show="passwordShow==2">
                <div class="verify-title form-row f2">短信验证码已发送至{{phone | filter_phone}}</div>
                <div class="form-row f18">
                    <div class="form-label">
                        <input type="text" @keyup.enter="verifyPhone" v-model="passwordData.userMessageCode" class="input" placeholder="请输入短信验证码"/>
                        <a class="btn btn-gray" v-show="time>0">倒计时{{time}}</a>
                        <a class="btn btn-primary" @click="resendMessage" v-show="time==0">重发验证码</a>
                    </div>
                </div>
                <div class="form-row f11">
                    <a class="btn btn-primary" @click="verifyPhone">下一步</a>
                </div>
                <div class="form-row f17">
                        如无法接收验证码，请与客服联系。客服电话：400-0192-266
                </div>
            </div>
            <div class="verify-3" v-show="passwordShow==3">
                <div class="newpassword-title form-row">密码长度6-20位，建议字母、数字与标点的组合来提高帐号安全度</div>
                <div class="form-row">
                    <div class="form-input"><input type="password" maxlength="20" v-model="passwordData.newPassword" class="input" placeholder="请输入新密码"/></div>
                </div>
                <div class="form-row">
                    <div class="form-input"><input type="password" maxlength="20" @keyup.enter="settingPassword" v-model="passwordData.confirmPassword" class="input" placeholder="请再次输入新密码"/></div>
                </div>
                <div class="form-row f11">
                    <a class="btn btn-primary" @click="settingPassword">提交</a>
                </div>
            </div>
        </div>
    </div>
</template>
<style>
    .f17{
        color: red;
    }
</style>
<script type="text/javascript">
    import model from '../../ajax/config/password_model'
    export default{
        data(){
            this.model=model(this)
            return{
                time:60,
                passwordShow:1,
                phone:'',
                passwordData:{
                    userMessageCode:'',
                    newPassword:'',
                    confirmPassword:'',
                    id:''
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
            verifyIdentity(){
                this.model.sendMessage().then((res)=>{
                    if(res.data.code==0){
                        this.times();
                        this.passwordShow=2;
                        this.passwordData.id=res.data.data;
                        sessionStorage.setItem('forgetShow',2);
                        sessionStorage.setItem('forgetid',this.passwordData.id);
                    }
                })
            },
            resendMessage(){
                this.model.sendMessage().then((res)=>{
                    if (res.data.code==0) {
                        this.passwordData.id=res.data.data;
                        this.time=60;
                        this.times();
                    }
                });

            },
            verifyPhone(){
                let data={
                    id:this.passwordData.id,
                    userMessageCode:this.passwordData.userMessageCode
                }
                this.model.verifyMessage(data).then((res)=>{
                    if (res.data.code==0) {
                        this.passwordShow=3;
                        this.passwordData.id=res.data.data;
                        sessionStorage.setItem('forgetShow',3);
                        sessionStorage.setItem('forgetid',this.passwordData.id);
                    }
                })
            },
            settingPassword(){
                if(!this.passwordData.newPassword || !this.passwordData.confirmPassword){
                    dialog('info','请输入密码！');
                    return;
                }
                if(this.passwordData.setPassword != this.passwordData.newSetPassword){
                    dialog('info','新密码与确认密码不一致！');
                    return
                }
                if(!this.passwordData.newPassword.replace(/\s/g, "")){
                    dialog('info','密码不能为全部空格！');
                    return;
                }
                let data={
                    id:this.passwordData.id,
                    newPassword:this.passwordData.newPassword,
                    confirmPassword:this.passwordData.confirmPassword
                }
                this.model.updatePassword(data).then((res)=>{
                    if (res.data.code==0) {
                        dialog('successTime','密码修改成功！');
                        setTimeout(()=>{
                            this.$router.go({'name':'login'});
                        },2000);
                    }else if(res.data.code==-1){
                        this.passwordShow=1;
                        this.passwordData.id="";
                    }
                    sessionStorage.removeItem('forgetShow');
                    sessionStorage.removeItem('forgetid');
                })

            }
        },
        ready(){
            window.onbeforeunload=()=>{
                sessionStorage.setItem('forgettime',this.time);
            }
            !!sessionStorage.getItem('forgetShow')?this.passwordShow=sessionStorage.getItem('forgetShow')>>0:null;
            !!sessionStorage.getItem('forgetid')?this.passwordData.id=sessionStorage.getItem('forgetid'):null;
            if(this.passwordShow==2){
                this.time=sessionStorage.getItem('forgettime')<=0?0:sessionStorage.getItem('forgettime');
                this.time>0?this.times():null;
            }
            (!!JSON.parse(sessionStorage.getItem('loginList')).phone)?this.phone=JSON.parse(sessionStorage.getItem('loginList')).phone:null;
        }
    }
</script>