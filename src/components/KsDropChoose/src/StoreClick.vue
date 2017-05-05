<template>  
<div class="KsStoreClick"  v-el:name>            
    <div class="radiofir ">
            <i :class="store_list_show ? 'icondown' : 'iconup'"></i>
            <input type="text" class="KsStoreClick-input full" 
                @click="clickinput()" 
                readonly="readonly"
                value="{{store_part | filter_name}}"
                />
                <store class="store_pos"
                    v-show="store_list_show"
                    :store_part.sync = "store_part"
                    :list.sync = "list"
                    :is_havechecked = "is_havechecked"
                    :max_height = "max_height"
                    :min_width = "min_width"></store>
    </div>
</div>
</template>  
  
<script type="text/javascript">  
    import store from './Store.vue'
    export default {  
        components:{
            'store':store
        },
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
            // change后回调钩子
            changeCb:{},
            max_height:{
                type:Number
            },
            min_width:{
                type:Number
            },
            store_list_show:{
                type:Boolean,
                default:false
            },
            list:{
              type:Array,
            }
        },
        data() {  
            return {  
                choose_part:[]
            }  
        },
        filters:{
            filter_name(val){
                var choose_part = []
                if(val.choose_store.length)
                {
                    val.choose_store.forEach((k)=>{
                        choose_part.push(k.name)
                    })
                }
                return choose_part.join(' , ')
            }
        },
        methods:{
            clickinput(){
              //debugger
        this.store_list_show = !this.store_list_show               
            }
        },
        ready(){ 
            window.addEventListener('click',(e)=>{
                if(this.$els.name == null) return
                if(!this.$els.name.contains(e.target))
                {
                    this.store_list_show = false
                }
            })
        }            
    }  
</script>  
<style lang="scss">
  @import "../styles/Store";
</style>
