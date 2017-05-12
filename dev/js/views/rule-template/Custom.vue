<template>
    <div class="custom" >
        <div><span></span></div>
        <div class="custom-section">
            <div class="type-text">
            <span class="title">活动描述</span><!-- 旧版样式 -->
            <textarea class="textarea" v-model="upCheck.textarea" placeholder="如所给模板没有能满足您的活动需求时，请您将您的问题在此进行描述。尽量将您的需求描述完整，方便我们为您提供更好的服务。"></textarea>
            </div>
            <div class="upload-file">
                <div class="file">
                    <upload
                        :src.sync="upCheck.upload_src"
                        :size="1048576"  
                        :exts="['xlsx','doc','docx','xls']"
                        :url="'./upload/file'"></upload>
                </div>
                <div class="info">仅支持Word、Excel文档</div>
            </div>
        </div>
        <div class="up-type">
            <a class="btn btn-primary" @click="submit">确定</a>
        </div>
    </div>
</template>
<style type="text/css">
    .upload-input{
        width: 360px;
    }
    .upload-text{
            overflow: hidden;
    }
    .custom-section{
        padding:20px;
    }
</style>
<script type="text/javascript">
    export default{
        data(){
            return{
                upCheck:{
                    upload_src:'',
                    textarea:'',
                }
            }
        },
        methods:{
            submit(){
                if(!this.upCheck.textarea && !this.upCheck.id){
                   dialog('info','请完善信息或请上传文件！');
                    return
                }
                let data={
                    description:this.upCheck.textarea,
                    id:this.upCheck.id
                }
                this.$http({
                    url: './activity/activity_info',
                    method: 'POST',
                    data: data
                }).then((res)=>{
                    if(res.data.code===0){
                        dialog('successTime','已保存！');
                        setTimeout(()=>{
                            this.$router.go({'name':'create-acitvity'})
                        },2000)
                    }
                })
            }
        },
        events:{
            uploadSuccess(data){
                this.upCheck.id=data;
            }
        },
        ready (){
        },
    }
</script>