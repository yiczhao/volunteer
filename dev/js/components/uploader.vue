<style>
    .form-hor .control-group .upload-input{
        vertical-align: bottom;
    }
    .upload-img{
        width: 170px;
    }
    .upload-img img{
        margin-right: 5px;
    }
    .upload-input{
        margin: 3px auto;
        width: 80px;
        text-align: center;
        cursor: pointer;
    }
    .upload-style{
        border: 1px solid #ccc;
        border-radius: 3px;
        height: 34px;
        line-height: 34px;
        box-sizing: border-box;
        position: relative;
        overflow: hidden;
    }

    .upload-style input{
        width: 100%;
        height: 34px;
        position: absolute;
        top: 0;
        opacity: 0;
        left: 0;
        cursor: pointer;
    }
    .upload-text {}
    .upload-text:before{
        background-color: #f5f5f5;
        display: inline-block;
        width:80px;
        text-align: center;
        position: absolute;
        right: 0;
    }
</style>

<template>

    <div class="col upload">
        <div class="row">
      <div v-if="imgshow" class="upload-img col">
            <img :src="src" width="100px" height="100px">
      </div>
            <div class="upload-input col">
                <div class="rol upload-style">
                    <span class="upload-text">浏览</span>
                    <input type="file" :multiple="multiple" accept="image/gif, image/jpeg, image/png" @change="upload_picture($event)">
                </div>
            </div>
        </div>
    </div>

</template>

<script type="text/javascript">

    export default {
        props:{
            src:{type:String,required: false},
            name:{type:String,required:false},
            server:{type:String,required: false},
            multiple:{type:String,required:false},
            imgshow:{type:Boolean,required:false,default:true},
            limit:{type:Number,required:false,default:null}
        },

        methods:{

            showMessage(message){
                dialog('info', message);
            },
            /**
             * @description 上传图片逻辑
             * @param e {Object} 事件event对象
             */
            upload_picture(e) {
                let _this = this,
                        formdata = new FormData(),
                        exts = ['jpg','png','jpeg'],
                        files = e.target.files;

                if(this.limit&&files.length >this.limit){
                    this.showMessage("单次图片最多仅允许"+this.limit+"张")
                    return ;
                }

                for(let i = 0; i < files.length ; i ++){
                    if(files[i].size > 0.2 * 1024 * 1024){
                        this.showMessage("文件大小不能超过200KB");
                        return ;
                    }
                    formdata.append('upload', files[i]);
                }
                let file=e.target.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(){
                    _this.src=this.result
                }
            }
        }
    }

</script>
