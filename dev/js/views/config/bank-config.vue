<template>
    <div class="bank-config">
        <div class="form-row">
            <div class="form-label"><i>*</i>银行简称</div>
            <div class="form-input"><input v-model="bankList.shortName" type="text" class="input" placeholder="请输入银行的简称 南昌银行信用卡部"/></div>
        </div>
        <div class="form-row">
            <div class="form-label">银行全称</div>
            <div class="form-input">
                <input type="text" class="input" v-model="bankList.fullName" placeholder=" 请输入银行的全称"/>
            </div>
        </div>
        <div class="form-row">
            <div class="form-label"><i>*</i>负责人</div>
            <div class="form-input"><input type="text" v-model="bankList.chargePerson" class="input" readonly/></div>
        </div>
        <div class="form-row">
            <div class="form-label"><i>*</i>手机号码</div>
            <div class="form-input"><input type="text" v-model="bankList.phone" class="input" readonly/></div>
        </div>
        <div class="form-row">
            <div class="form-label">邮箱</div>
            <div class="form-input">
                <input type="text" class="input" v-model="bankList.email" placeholder=" 请输入邮箱"/>
            </div>
        </div>
        <div class="form-row">
            <div class="form-label">地址</div>
            <div class="form-input">
                <input type="text" class="input" v-model="bankList.address" placeholder=" 请输入银行的详细地址"/>
            </div>
        </div>
        <div class="form-row">
            <div class="form-label">银行简介</div>
            <div class="form-input">
                <textarea class="textarea" v-model="bankList.briefIntroduction"></textarea>
            </div>
        </div>
        <div class="form-row height-div">
            <div class="form-label"><i>*</i>银行logo</div>
            <div class="form-input about-uploader">
                <div class="explain">
                    <span>图片说明：</span>
                    <span>1.上传图片支持jpg、jpeg、png格式； </span>
                    <span>2.图片尺寸200*200，大小不超过200k；</span>
                </div>
                <uploader server="./upload/orderImage" :src.sync="bankList.bankLogo" :imgshow="!!bankList.bankLogo"></uploader>
            </div>
        </div>
        <div class="form-row">
            <a class="btn btn-primary" @click="saveBank">确认</a>
        </div>
    </div>
</template>
<script type="text/javascript">
    import model from '../../ajax/config/bank_model'
    export default{
        data(){
            this.model=model(this)
            return{
                bankList:{}
            }
        },
        methods:{
            getList(){
                this.model.getBankList().then((res)=>{
                    if(res.data.code===0){
                        this.$set('bankList',res.data.data);
                        (!!this.bankList.bankLogo)?this.bankList.bankLogo="data:image/png;base64,"+this.bankList.bankLogo:null;
                    }
                })
            },
            saveBank(){
                if(this.bankList.shortName==''){
                    dialog('info','请填写银行简称！');
                    return;
                }
                if(this.bankList.bankLogo==''){
                    dialog('info','请上传银行logo！');
                    return;
                }
                let data=_.cloneDeep(this.bankList);
                data.bankLogo=data.bankLogo.split(',')[1];
                this.model.saveBank(data).then((res)=>{
                    if(res.data.code===0){
                        document.querySelector('.logo-img').src="data:image/png;base64,"+data.bankLogo;
                        let datas=JSON.parse(sessionStorage.getItem('loginList'))
                        datas.bankLogo=data.bankLogo;
                        sessionStorage.setItem('loginList',JSON.stringify(datas));
                        dialog('success',res.data.message);
                    }
                })
            }
        },
        ready(){
            this.getList();
        }
    }
</script>