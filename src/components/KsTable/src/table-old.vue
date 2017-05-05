<template>
<div class="KsTable-multiple">
    <table>  
        <thead>    
            <tr> 
                <th v-for="key in columns" v-text="key"></th>      
            </tr>  
        </thead>  
        <tbody v-el:tbody>    
            <tr v-for="(index, item) in data" v-on:click="output">      
                <td v-for="(key, val) in item" v-html="val | render key item index"></td>      
            </tr>
            
            <!-- ...... 添加多行     -->
        </tbody>
    </table>
</div>
</template>
<script type="text/javascript">
    export default {
        props:{
            columns:{
                type:Array,
                default(){
                    return []
                }
            },
            data:{
                type:Array,
                default(){
                    return []
                }
            },
            options:{
                type:Object,
                default(){
                    return {}
                }
            }
        },
        
        data(){
            this._ksparent = this.$parent
            return {
                // tempData : this.data
            }
        },
        computed:{
            // data:{
            //     get(){
            //         return this.tempData
            //     },
            //     set(val){
            //         console.log(val)
            //         this.tempData = val 
            //         this.$nextTick(()=>{
            //             this.$parent.$compile(this.$els.tbody)    
            //             // console.log(val);
            //         })
                    
            //     }
            // }
        },
        watch:{
            data(){
                this.$nextTick(()=>{
                    this.$parent.$compile(this.$els.tbody)    
                    // console.log(val);
                })
            }
        },
        filters:{
            render(val,key,item,index){

                var operator = (this.options.templates || {})[key]
                if('function' == typeof operator){

                    return operator.call(this._ksparent,item,index)
                }else{
                    return val
                }

            }
        },
        methods:{
            output(val){
                console.log('output',this)
            }
        },
        created(){
            console.log(this)
            this.$nextTick(()=>{

                // this.$parent.$compile(this.$parent.$el)
                // this.$parent.$destroy()
                this.$parent.$compile(this.$els.tbody)
                // this.$compile(this.$els.tbody)
            })
        }
    }
</script>
<style lang="scss">
    @import '../styles/table.scss'
</style>