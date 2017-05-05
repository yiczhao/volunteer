<template>  
<div class="KsDialogChoose">            
    <div class="radiofir ">
        <input type="text" class="KsDialogChoose-input full" 
            @click="clickinput()" 
            readonly="readonly"
            v-model="showtxt"
            />
    </div>
    <ks-dialog-program  
        :title="'请选择交易门店'" 
        :show="is_show" 
        :cb-close="close_dialog"
        :width = "width" >
        <div class="trade_store">
            <list-store
                :list = "list"
                :sid.sync = "sid"
                :type-mate = "typeMate"
                :name-mate = "nameMate">
                <!-- @change = getsid -->
            </list-store>
            <div class="txtr btngroup">
                <span class="errortxt" v-show = "errorshow">{{errorInfo}}</span>
                <span class="reset" @click="reset()">重选</span>
                <span class="checkall" @click="checkall()">全选</span>
                <ks-button :ghost="true" type="other" style="margin-right: 10px"
                    @click="close_dialog">取消</ks-button>
                <ks-button :type="'primary'"
                    @click="save()">确认</ks-button>
            </div>
        </div>
    </ks-dialog-program>
</div>
</template>  
  
<script type="text/javascript">  
import ListStore from './ListStore.vue'
import KsButton from '../../KsButton'
import KsDialogProgram from '../../KsDialogProgram'
  export default {  
    props:{
        list:{
            type:Array
        },
        sid:{
            type:Array
        },
        errorInfo:{
            type:String,
            default:'*您尚未选择门店'
        },
        typeMate:{
            type:String,
            default:'id'
        },
        nameMate:{
            type:String,
            default:'name'
        }
    },
    components:{
        KsDialogProgram:KsDialogProgram,
        KsButton:KsButton,
        ListStore:ListStore
    },
    data() {  
        return {  
            is_show:false,
            width:600,
            total:0,
            showtxt:'',
            onestorename:'',
            listparse:[],
            errorshow:false,
        }  
    },
    methods:{
        //关闭弹出层
        close_dialog(){
            //debugger
            this.total = 0
            this.is_show = false
            this.list = [].concat(JSON.parse(JSON.stringify(this.listparse)));
            //console.log("close")
            var sid  = this.getId()

            if(sid.length != 0){
                this.sid = sid
            }else{
                this.sid = []
            }
            //console.log(this.sid)
            this.$emit('change',this.sid)

        },
        //点击input框
        clickinput(){
            this.is_show = true
        },
        //获取子传给父的sid,onchange事件
        getsid(val){
            this.sid = val;
            (this.sid.length == 0) ? (this.errorshow = true) :  (this.errorshow = false)
        },
        // 点击保存粗发外部事件获取已经选中的sid
        save(){
            //this.look()
            if(this.total == 0){
                this.errorshow = true
            }else{
                this.errorshow = false
                this.is_show = false
                this.listparse = [].concat(JSON.parse(JSON.stringify(this.list)));
            }  
            this.$emit('change',this.getId())
        },
        //获取已经选中id
        getId(){
            var listarr = []
            this.list.forEach(t=>{
                if(t.ischecked)
                {
                   listarr.push(t[this.nameMate]) 
                }
            })

            return listarr;
        },
        // 点击重置
        reset(){
            this.total = 0
            this.list.forEach(t=>{
                t.ischecked = false
            })
            this.sid = []
        },
        // 点击全选
        checkall(){
            this.total = this.list.length
            this.list.forEach(t=>{
                t.ischecked = true
            })
            this.sid = this.getId()
            this.errorshow = false
        },
        //input显示内容
        inputShowTxt(){
            // switch(this.total){
            //     0: this.showtxt = '';break;
            //     1: this.showtxt = this.onestorename;break;
            //     this.list.length: this.showtxt = '全部门店';break;
            //     default:this.showtxt = '共有'+ this.total +'家门店';break;
            // }
            var total = ''
            if(this.total == 1)
            {
                total = this.onestorename 
            }else if(this.total == 0){
                total = ''
            }else if(this.total == this.list.length){
                total = '全部门店'
            }else{
                total = '共有'+ this.total +'家门店'
            }

            this.showtxt = total ; 

        }
    },
    watch:{
        sid(val){
            //console.log("sid")
            
            this.total = 0
            this.list.forEach(t=>{
                if(t.ischecked)
                {
                    this.total ++;
                    this.onestorename = t[this.typeMate]
                }
            })
            
            this.inputShowTxt();
              
            (this.total == 0) ? (this.errorshow = true) :  (this.errorshow = false)
        },
        list(val){
            //console.log('list')
            //var total = ''
            
            this.total = 0

            if(this.sid){
                val.forEach(t=>{
                    this.sid.forEach(item=>{

                        if(t[this.typeMate] == item)
                        {
                            t.ischecked = true
                            this.total ++;
                            this.onestorename = t.name
                        }
                    })
                    
                })
            }
            //console.log(this.typeMate)

            //this.sidchange = this.sid
            //this.look()
            this.inputShowTxt();
            //console.log(this.total)
            this.errorshow = false
            this.listparse = [].concat(JSON.parse(JSON.stringify(val)));

            
        }
    },
    ready(){  
        //console.log(this.typeMate)
    }
            
  }  
</script>  
<style lang="scss">
  @import "../styles/KsDialogChoose";
</style>
