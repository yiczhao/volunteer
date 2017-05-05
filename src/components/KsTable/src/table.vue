<template>
<div class="KsTable-striped">
    <table v-on:change="change">  
        <thead v-el:thead>    
            <tr> 
                <th v-for="item in columns">
                    <ks-icon v-bind:name="item.sortable | getIcon" 
                        v-if="item.sortable"
                        size="1x"
                        v-on:click="sort($index)"></ks-icon>
                    <input type="checkbox" name="ks-table-allchecked"
                        v-model="allchecked"
                        v-if="item.checked"/>
                    <div v-text="item.title" 
                        style="display: inline-block;" 
                         v-bind:style="{'width':item.width}"></div>
                </th>      
            </tr>  
        </thead>  
        <tbody v-el:tbody>    
            <tr v-for="(index, item) in data">      
                <td v-for="(key, val) in item" >
                    <input type="checkbox" id="KsTable_{{_uid}}_{{index}}"
                           v-if="key=='checked'"
                           v-model="item.checked"/>
                    <div v-if="key!='checked'" v-html="val | render key item index">
                    </div>        
                </td>      
            </tr>
            
        </tbody>
    </table>
</div>
</template>
<script type="text/javascript">
    /**
     * 1. 制定基本API columns、data、icon 图标接口
     * 2. 数据从父级流入处理columns
     *     get 和 set
     *     set 处理: 
     *     i.  map columns 数据填充 this._options
     *         _options: {
     *             //  储存了要重新渲染的模板内容，
     *             //  作用：用于filters的render输出页面
     *             templates:{},
     *             //  获取定义的columns中的key值，
     *             //  作用：用于 filterData 过滤源数据获取 columnkeys 中需要显示的数据
     *             columnkeys:[] 
     *         }
     * 
     * 
     */
    
    import KsIcon from '../../KsIcon/src/icon.vue'
    export default {
        components:{
            'ks-icon':KsIcon
        },
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
            icons:{
                type:Object,
                default(){
                    return {
                        desc:'xiangxiajiantou',
                        asc:'xiangshangjiantou'
                    }
                }
            }
        },
        
        data(){
            this._ksparent = this.$parent
            this._options = {
                templates:{},
                columnkeys:[]
            }

            return {
                tempData : this.data,
                tempColumns: this.columns,
                allchecked:false
            }
        },
        computed:{
            
            columns:{
                get(){
                    return this.tempColumns
                },
                set(val){
                    this._options.columnkeys = this.columns.map((item)=>{
                        
                        item.template 
                        && (this._options['templates'][item.key] = item.template)

                        return item.key
                    })

                    
                }
            },
            data:{
                get(){
                    return this.tempData
                },
                set(val){
                    
                    this.tempData = this.filterData(val,this._options.columnkeys)
                    this.allchecked = this.isAllChecked(this.tempData)
                    this.$nextTick(()=>{
                        this.$parent.$compile(this.$els.tbody)    
                    })
                    
                }
            }
        },
        watch:{},
        filters:{
            // 图标名
            getIcon(val){

                var temp = this.icons.desc
                
                if('asc' == val) temp = this.icons.asc
                return temp
            },
            render(val,key,item,index){

                var template = (this._options.templates || {})[key]
                if('function' == typeof template){

                    return template.call(this._ksparent,item,index)
                }else{
                    return val
                }

            }
        },
        methods:{
            // 排序
            sort(index){
                var column = this.columns[index]
                var direction = column.sortable == 'asc'
                                ? 'desc'
                                : 'asc'
                    
                this.columns[index].sortable = direction
                this.$emit('change-sort',column.key, direction)
            },
            
            // 
            /**
             * [customSchema 获取自定义的 Schema column]
             * @param  {[Array]} schema [columns模式]
             * @param  {[Array]} real   [真实数据]
             * @return {[Array]}        []
             */
            customSchema(schema = [],real = []){
                return schema.filter((key)=>{
                    return !~real.indexOf(key)
                })
            },
            /**
             * [filterData 根据自定义]
             * @param  {[Array]} data       [原始数据]
             * @param  {[Array]} columnkeys [定义的 Schema]
             * @return {[Array]}            []
             */
            filterData(data,columnkeys){
                // this.customSchema(columnkeys,Object.keys(data[0]||[]))

                return data.map((item,index)=>{
                    var temp = {}

                    columnkeys.forEach((key)=>{

                        switch(key){
                            case 'table-idx':
                                temp[key] = index+1
                            break;

                            case 'operator':
                                temp[key] = ''
                            break;

                            default:
                                item.hasOwnProperty(key)
                                && (temp[key] = item[key])
                                
                            break;
                        }
                        
                        
                    })
                    return temp
                })
            },
            /**
             * [change DOM change]
             * @return {[type]} []
             */
            change(event){
                var index
                if('ks-table-allchecked' == event.target.name){
                    var allchecked = false
                    if(this.allchecked){
                        allchecked = true
                    }else{
                        index = -1
                    }
                    this.tempData = this.tempData.map((item)=>{
                        item.checked = allchecked
                        return item
                    })

                    

                }else{

                    this.allchecked = this.isAllChecked(this.tempData)
                    index = event.target.id.split('_')[2]
                }


                // console.log(event.target)
                this.$emit('change-checked',this.data,index)

                // console.log(this.data)
            },
            /**
             * [isAllChecked 是否全选]
             * @param  {[type]}  data [源数据]
             * @return {Boolean}      []
             */
            isAllChecked(data){
                var noCheckeds = data.filter((item)=>{
                    if(!item.checked){
                        return true
                    }
                })
                return noCheckeds.length ? false : true 
            }

        },
        created(){
            this.columns = this.columns
            this.data = this.data
            this.$nextTick(()=>{
                // this.$parent.$compile(this.$parent.$el)
                // this.$parent.$destroy()
                this.$parent.$compile(this.$els.tbody)
            })
        }
    }
</script>
<style lang="scss">
    @import '../styles/table.scss'
</style>