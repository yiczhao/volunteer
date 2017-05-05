<template>  
    <div class="KsStore" 
        :style="max_height | filter_style min_width">
        <div class="perstore ">
            <div v-if="is_havechecked" class="checkboxall">
                     <input type="checkbox" 
                     @change = "checkAll()"
                     v-model = "allchecked">
                     <span>全选</span>
            </div>
            <div class="checkboxwhole">
                <div class="whole" v-show="!list.length && list.xhr">
                    您还未配置门店~
                </div>
          
                <div class="checkbox1 whole" v-for="t in list">
                  <label>
                    <!-- <input type="checkbox" name="" :value="3" v-model="[3,4]"> -->
                    <!-- {{checkeds}} -->
                    <input type="checkbox" :value="t.id" v-model="checkeds">
                    <span class="wholetext" v-text="t.name"></span>
                    <span class="wholeaddress" v-text="t.addr"></span>
                  </label>
                </div>

            </div>
        </div>
    </div>
</template>  
  
<script type="text/javascript">  

  export default {  
    props:{
        store_part: {
                // toWay:true,
                type: Object,
                coerce(val){
                    if(!val){
                        val = {
                            choose_store:[]
                        }
                    }
                    return val
                }
            },
        is_havechecked:{
            type:Boolean,
            default:false
        },
        verify:{
            type:Boolean,
            default:false
        },
        // change后回调钩子
        changeCb:{},
        max_height:{
            type:Number
        },
        min_width:{
            type:Number
        },
        list:{
          type:Array,
        }
    },
    data() {  
        return {  
            checkeds:[],
            allchecked:false
        }  
    },
    filters:{
        filter_style(height,width){

            if(height && !width)
            {
                return  { 
                            'max-height' : this.max_height + 'px'
                        }
            }else if(!height && width)
            {
                return  { 
                            'min-width' : this.min_width + 'px'
                        }
            }else if(height && width){
                return  { 
                            'max-height' : this.max_height + 'px',
                            'min-width' : this.min_width + 'px'
                        }
            }else{
                return
            }
        }
    },
    watch:{
        checkeds(val){
            this.watch_checkeds(val)
            this.verify = !!val.length
        },
        store_part(val){
            this.checkeds = val.choose_store
        },
        list(list){
          this.list = list
            var val = this.store_part
            //直接输数组
            if(typeof val.choose_store[0] != 'object'){
                this.checkeds = val.choose_store
            }else{
                this.checkeds = val.choose_store.map(t=>{
                    return t.id
                })
            }
        }
    },
    methods:{
        watch_checkeds(val){
            if(val.length == this.list.length){
                this.allchecked = true
            }else{
                this.allchecked = false
            }

            var list = this.list.filter((t)=>{
                if(~val.indexOf(t.id))
                {
                    return true
                }
            })
            .map((arr)=>{
                    return {
                        name : arr.name,
                        id : arr.id
                    }
                })
            if(this.list.length && val){
                this.store_part.choose_store = list
            }

            if(typeof this.changeCb == 'function') {
                //console.log(this.$parse(this.list))
                var index = this.$parse(this.list).map((item)=>{
                    return item.id
                }).indexOf(val[val.length-1])
                
                this.changeCb(index)      
            }
                
            
        },
        checkAll(){
            var allstore = this.list.map((t)=>{
                return t.id
            })

            this.allchecked ? (this.checkeds = allstore) : (this.checkeds = [])

            
        },

    },
    ready(){  
       //console.log(this.list)
            //this.list = list
    }
            
  }  
</script>  
<style lang="scss">
  @import "../styles/Store";
</style>