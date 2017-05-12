<style>
.form-hor .control-group .upload-input{
  vertical-align: bottom;
}
.upload-img{
    width: 170px;
}
  .upload-style{
    border: 1px solid #ccc;
    border-radius: 3px;
    height: 38px;
    line-height: 34px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }
  
  .upload-style input{
    width: 100%;
    height: 34px;
    position: absolute;top: 0;left:0;
    opacity: 0;
  }
  .upload-text {
        position: absolute;
    left: -1px;
    width: 80px;
    top: 1px;
    content: "选择文件";
        background-color: #f5f5f5;
        display: inline-block;
        width:80px;
        text-align: center;
  }
  
</style>

<template>

  <div class="col upload">

    <style>
      .upload-text:before{
        content: "上传需求文档";
        background-color: #f5f5f5;
        display: inline-block;
        width:80px;
        text-align: center;
        position: absolute;
        right: 0;
      }
    </style>
    <div class="row">
      <span class="upload-img col"  v-if="hasimg">
          <img :src="src" width="150px" height="150px">
      </span>
      <div class="upload-input col">
        <p v-if="hasimg">
          1.上传图片支持jpg、jpeg、png格式。<br>
          2.200*200，大小不超过200k。<br>
        </p>
        <div class="rol upload-style">
          &emsp;<span class="upload-text">上传需求文档</span>
          {{src}}
          <input type="file" :accept="hasimg && 'image/gif, image/jpeg, image/png'" @change="change($event)">
        </div>
      </div>
     </div>
  </div>
</template>

<script type="text/javascript">
 import i18n from './i18n.js'

    export default {
        locales:i18n,
        props:{
            src:{type:String,required: false},
            // 上传接口中应用 public 、 private, 图片 public;
            scope:{type:String,default:'public'},
            // 格式
            exts:{type:Array,default:[]},
            // 大小 默认1M
            size:{type:Number,default:1048576},
            // 接口地址
            url:{type:String,default:''},
        },
        data(){
            return {}
        },  
        computed:{
            hasimg(){
                return this.exts.indexOf('jpg')!=-1
            }
        },
        methods:{
            // 上传
            upload(url,fd) {
                return this.$http({
                    url: url,
                    method: 'POST',
                    data: fd
                })    
            },
            // 类型检查
            check_type(input){
                var error_message = []
                if(!~this.exts.indexOf(input.name.split('.')[1])){
                    error_message.push( '文件格式不正确' )
                }else if(input.size > this.size){
                    error_message.push('大小不超过' +this.size/1024+'k')
                }    
                if(error_message.length){
                    dialog('error',error_message.join(' , '))
                    return false
                }
                return true
            },
            
            /**
             * @description 上传图片逻辑
             * @param e {Object} 事件event对象
             */
            change(e) {
                var fd = new FormData(),
                    input = e.target.files[0]
                fd.append('file', input)
                e.target.value = ''
                if(!this.check_type(input)) return;
                this.src = input.name;
                var reader = new FileReader();
                reader.readAsDataURL(input);
                let vm=this;
                reader.onload = function(e){
                  let datas={
                    name:input.name,
                    data:this.result.split(',')[1]
                  }
                  vm.upload(vm.url,datas).then(res=> {
                    vm.MultipartFile = res.data.data;
                    vm.$dispatch('uploadSuccess',vm.MultipartFile);
                  })
                }
            }
        },
        ready(){
        }
    }
</script>
