<template>
  <div class="img_box "  v-show="show">
    <i class="icon ic  opc" @click='close'>&#xe60d;</i>
    <div class="box" :style="{transform:'rotate('+(90*rot)+'deg)'+' scale('+(1+sca)+')'}" :class='{tran:!none}'>
      <img v-for="i in src" :src="i"  track-by='$index' v-show="index==$index"  :transition="sta" >
    </div>                  
    <div class="but" v-show='src.length>1'>
      <i class="fa fa-chevron-left  opc l" v-show='index>0' @click="move(0)"></i>
      <i class="fa fa-chevron-right  opc r" @click="move(1)" v-show='index<src.length-1'></i>
    </div>
        <ul>  
          <li class="opc fa fa-repeat fa-2x" @click='rotate'>
            <span>旋转</span>
          </li>
          <li class="opc  fa fa-search fa-2x" @click='scale'>
            <span>放大</span>
          </li>
          <li class="opc fa fa-search-minus fa-2x" @click='sacles'>
            <span>缩小</span>
          </li>
          <li class="opc fa fa-download fa-2x"  v-if="load">
              <a :href="src[index]" download><span>下载</span></a>
          </li>
        </ul>
  </div>
</template>
<script>

    /**
        <ksimg 
            :imgShow.sync="Boolean"  弹出 必填
            :src="Array"  图片数组 必填
            :pindex="Number"   当前要显示 的图片下标
            ></ksimg>
     */

  export default{
    data(){
      return {
        rot:0,
        sca:0,
        none:false,
        sta:'',
        index:0
      }
    }, 
    ready(){
      
    } ,  
    props:{
      show:{type:Boolean,required:true,default:false},
      src:{type:Array,required:true,default:[]},
      pindex:{type:Number,required:false,default:0},
      load:{type:Boolean,required:false,default:true}
      },
    watch:{
      show:function(show){   
        this.index=this.pindex;
        if(show){
          let _this=this;
          _this.src.length==1&&(_this.index=0)
          document.body.classList.add('ovh')
          document.onkeydown=function(e){
            var e = e || window.event
            e.keyCode==27&&_this.close()
          }          
        }else{
          document.body.classList.remove('ovh')
        }
      }
    },
    methods:{
      close(){
        this.rot=0;
        this.sca=0;  
        this.sta=''      
        this.show=false;
      },
      move:function(i){
        this.none=true;
        this.rot=0;
        this.sca=0;
        if(i){
          this.sta='star'
          this.index<this.src.length-1&&(this.index++)
        }else{
          this.sta='stal'
          this.index>0&&(this.index--)
        }     
       
      },
      rotate:function(){
        this.none=false;
        this.rot++;
      },
      scale:function(){
        this.none=false;
        this.sca+=0.2;
      },
      sacles:function(){
        this.none=false;
        this.sca>-0.8&&(this.sca-=0.2)
      }
    }
  }	
</script>
<style lang="sass" scoped>
@import "../styles/Img";
</style>