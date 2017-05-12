<template>
    <div class="login login-container" id="test01">
        <div class="container">
            <div class="header">
                <div class="header-left">
                </div>
            </div>
            <div class="section">
                <div class="section-title">高考志愿辅助填报平台后台</div>
                <div class="section-type">
                    <div class="type-title">用户登录</div>
                    <div class="type-into username"><input class="input" type="text" placeholder="手机号/账户名" v-model="loginData.name" @keyup.enter="login"></div>
                    <div class="type-into password"><input class="input" type="password" placeholder="请输入您的密码" v-model="loginData.password" @keyup.enter="login"></div>
                    <div class="save-password">
                        <ks-switch :disable="false" @change="autoType" :def-checked="true" color="#2196F3" size="mini" :checked.sync="checked"></ks-switch><span>记住密码</span>
                    </div>
                </div>
                <div class="section-login"><input class="btn btn-primary" type="button" name="" value="登 录" @click="login"></div>
                <div class="forget-password">
                    <a v-link="{'name':'forget-password'}">忘记密码</a>
                </div>
            </div>
        </div>
        <!-- <div class="login_footer">
            <div class="footer-container">
                <div class="footer-title">xxx</div>
                <div class="footer-infor">
                    <div>
                        <span>xxxx</span>
                        <span>xxxx</span>
                        <span>xxxx</span>
                    </div>
                    <div>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                        <span>©2010-2017</span>
                    </div>
                </div>
            </div>
        </div> -->
    </div>
</template>
<script type="text/javascript">
export default {
        data (){
            return {
                loginData:{
                    name:'',
                    password:'',
                },
                checked:false,
                color:1,
            }
        },
        methods:{
            login(){
                let data={
                    name:this.loginData.name,
                    password:this.loginData.password,
                }
                this.$http.post('./login',data).then((res)=>{
                    if(res.data.code===0){
                        sessionStorage.setItem('loginList',JSON.stringify(res.data.data));
                        if (this.checked) {
                            let data={
                                name:this.loginData.name,
                                password:this.loginData.password,
                            }
                            setCookie('userInfor',JSON.stringify(data),30);
                        }
                        this.$router.go({'name':'home'});
                    }
                });
            },
            autoType(){
                if (!this.checked) {
                    clearCookie('userInfor');
                }
            }
        },
        ready (){
            if (!!getCookie('userInfor')) {
                this.$set('loginData',JSON.parse(getCookie('userInfor')));
                this.checked=true;
            }
            sessionStorage.clear()
        }
    }
</script>