## table组件
> **Author:张大柱**
> 支持新增数据、排序、自定义操作等功能。

------

<br/>

<p v-for="item in tableData">
    <span style="display:inline-block;width:160px;"  v-for="(key,val) in item">{{key+':'+val}}</span>
</p>
<br/>

<ks-table
    v-bind:columns="columns"
    v-bind:data="tableData"
    v-on:change-sort="sortChange"
    v-on:change-checked="checkedChange"></ks-table>

<ks-button v-on:click="addOneData">添加一条</ks-button>


```html
<ks-table
    v-bind:columns="columns"
    v-bind:data="tableData"
    v-on:change-sort="sortChange"
    v-on:change-checked="checkedChange"></ks-table>
```
### API

| 参数 | 说明 | 接口类型 | 类型 | 可选值 | 默认值 |
|------|-------|----------|---------|-------|--------|
| columns | 设置表格的表头 | props | Array | `必填` | 无 |
| columns -> table-idx | 序号 |  | Boolean |  | false |
| columns -> sortable | 排序 |  | Boolean |  | false |
| columns -> checked | 全选功能 |  | Boolean |  | false |
| data | 表格的数据 | props | Array | `必填` | 无 |
| change-sort | 对表格每列数据进行排序后出发 | props  | Event | `非必填` | 降序 |
| change-checked | checkbox更改触发 | props  | Event | `非必填` |  |

<br/>

### 基础功能

<br/>

#### 自定义列模板

<br/>

通过columns添加自定义列，每项的key与列表数据data的字段一一对应，title为表头的每列的名称，设置sortable为true即可对该列进行排序，默认为降序，template为该列数据的模板。


<br/>

<script type="text/javascript">
    
    export default {
        data(){
            this.checkeds = []
            return {
                
                columns:[
                    {
                        key:'checked',
                        title:'全选',
                        checked:true
                    },
                    {
                        key:'table-idx',
                        title:'序号',
                        width:'60px'
                    },
                    {key:'id',title:'下标值'},
                    {key:'name',title:'名字',sortable:true,
                        template(val,index){
                            return val.name+'==='
                        }
                    },
                    {key:'age',title:'年龄',sortable:'asc'},
                    {
                        key:'operator',
                        title:'操作',
                        template(val,index){
                            return `<a href="javascript:;" v-on:click.stop="output('${index}')" >操作</a><span>|</span><a href="javascript:;" v-on:click.stop="remove('${index}')" >删除</a>`
                        }
                    }
                ],
                tableData: [
                    {checked:true,id:1, name:"John",name1:"John",age:"sss"},
                    {checked:true,id:333, name:"John",age:"sss"},
                    {checked:true,id:55, name:"John",age:"sss"},
                    {checked:true,id:133, name:"John",age:"sss"},
                    {checked:true,id:1111, name:"John",age:"sss"},
                    {checked:true,id:155, name:"John",age:"sss"},
                    {checked:true,id:1777, name:"John",age:"sss"}
                ],
                
            }
        },
        methods:{
            addOneData(val){
                this.tableData.push({checked:false,id:1, name:"John--",age:"sss",work:'IT',work2:'IT2',operator:''})   
            },
            output(val){
                this.$KsNotice.info('内容',`点击序列为：${val}`)
            },
            remove(index){
                // alert('delete: '+index)
                this.tableData.splice(index,1)
            },
            sortChange(key,val){
                this.$KsNotice.info('内容',`排序的字段为：${key}，顺序为：${val}`)
                
            },
            // checkbox 变化触发
            checkedChange(data,index){
                console.log(data,index)
            }
            
        },
        created(){
        }
    }
</script>
### 脚本

```javascript
<script type="text/javascript">
    
    export default {
        data(){
            this.checkeds = []
            return {
                
                columns:[
                    {
                        key:'checked',
                        title:'全选',
                        checked:true
                    },
                    {
                        key:'table-idx',
                        title:'序号',
                        width:'60px'
                    },
                    {key:'id',title:'下标值'},
                    {key:'name',title:'名字',sortable:true,
                        template(val,index){
                            return val.name+'==='
                        }
                    },
                    {key:'age',title:'年龄',sortable:'asc'},
                    {
                        key:'operator',
                        title:'操作',
                        template(val,index){
                            return `<a href="javascript:;" v-on:click.stop="output('${index}')" >操作</a><span>|</span><a href="javascript:;" v-on:click.stop="remove('${index}')" >删除</a>`
                        }
                    }
                ],
                tableData: [
                    {checked:true,id:1, name:"John",age:"sss"},
                    {checked:true,id:333, name:"John",age:"sss"},
                    {checked:true,id:55, name:"John",age:"sss"},
                    {checked:true,id:133, name:"John",age:"sss"},
                    {checked:true,id:1111, name:"John",age:"sss"},
                    {checked:true,id:155, name:"John",age:"sss"},
                    {checked:true,id:1777, name:"John",age:"sss"}
                ],
                
            }
        },
        methods:{
            addOneData(val){
                this.tableData.push({checked:false,id:1, name:"John--",age:"sss",work:'IT',work2:'IT2',operator:''})   
            },
            output(val){
                this.$KsNotice.info('内容',`点击序列为：${val}`)
            },
            remove(index){
                // alert('delete: '+index)
                this.tableData.splice(index,1)
            },
            sortChange(key,val){
                this.$KsNotice.info('内容',`排序的字段为：${key}，顺序为：${val}`)
                
            },
            // checkbox 变化触发
            checkedChange(data,index){
                console.log(data,index)
            }
            
        },
        created(){
        }
    }
</script>
```





<div class="table-wrapper">
    <div class="table-box table-striped">
        <div class="table-body">
            <table>
                <tr>
                    <th class="table-hidden">姓名</th>
                    <th>年龄</th>
                    <th>省份</th>
                    <th>市区</th>
                    <th>地址</th>
                    <th>邮编</th>
                    <th class="table-hidden">操作</th>
                </tr>
                <tr>
                    <td class="table-hidden">王小明</td>
                    <td>18</td>
                    <td>北京市</td>
                    <td>朝阳区</td>
                    <td>北京市朝阳区芍药居</td>
                    <td>100000</td>
                    <td class="table-hidden">查看</td>
                </tr>
                <tr>
                    <td class="table-hidden">张小刚</td>
                    <td>25</td>
                    <td>北京市</td>
                    <td>海淀区</td>
                    <td>北京市海淀区西二旗</td>
                    <td>100000</td>
                    <td class="table-hidden">查看</td>
                </tr>
                <tr>
                    <td class="table-hidden">李小红</td>
                    <td>30</td>
                    <td>上海市</td>
                    <td>浦东新区</td>
                    <td>上海市浦东新区世纪大道</td>
                    <td>100000</td>
                    <td class="table-hidden">查看</td>
                </tr>
                <tr>
                    <td class="table-hidden">周小伟</td>
                    <td>26</td>
                    <td>广东</td>
                    <td>南山区</td>
                    <td>深圳市南山区深南大道</td>
                    <td>100000</td>
                    <td class="table-hidden">查看</td>
                </tr>
            </table>
        </div>
        <div class="table-fixed-left" style="width: 79px;">
            <table>
                <tr>
                    <th>姓名</th>
                    <th class="table-hidden">年龄</th>
                    <th class="table-hidden">省份</th>
                    <th class="table-hidden">市区</th>
                    <th class="table-hidden">地址</th>
                    <th class="table-hidden">邮编</th>
                    <th class="table-hidden">操作</th>
                </tr>
                <tr>
                    <td>王小明</td>
                    <td class="table-hidden">18</td>
                    <td class="table-hidden">北京市</td>
                    <td class="table-hidden">朝阳区</td>
                    <td class="table-hidden">北京市朝阳区芍药居</td>
                    <td class="table-hidden">100000</td>
                    <td class="table-hidden">查看</td>
                </tr>
                <tr>
                    <td>张小刚</td>
                    <td class="table-hidden">25</td>
                    <td class="table-hidden">北京市</td>
                    <td class="table-hidden">海淀区</td>
                    <td class="table-hidden">北京市海淀区西二旗</td>
                    <td class="table-hidden">100000</td>
                    <td class="table-hidden">查看</td>
                </tr>
                <tr>
                    <td>李小红</td>
                    <td class="table-hidden">30</td>
                    <td class="table-hidden">上海市</td>
                    <td class="table-hidden">浦东新区</td>
                    <td class="table-hidden">上海市浦东新区世纪大道</td>
                    <td class="table-hidden">100000</td>
                    <td class="table-hidden">查看</td>
                </tr>
                <tr>
                    <td>周小伟</td>
                    <td class="table-hidden">26</td>
                    <td class="table-hidden">广东</td>
                    <td class="table-hidden">南山区</td>
                    <td class="table-hidden">深圳市南山区深南大道</td>
                    <td class="table-hidden">100000</td>
                    <td class="table-hidden">查看</td>
                </tr>
            </table>
        </div>
        <div class="table-fixed-right" style="width: 66px;">
            <table>
                <tr>
                    <th>操作</th>
                    <th class="table-hidden">姓名</th>
                    <th class="table-hidden">年龄</th>
                    <th class="table-hidden">省份</th>
                    <th class="table-hidden">市区</th>
                    <th class="table-hidden">地址</th>
                    <th class="table-hidden">邮编</th>
                </tr>
                <tr>
                    <td>查看</td>
                    <td class="table-hidden">王小明</td>
                    <td class="table-hidden">18</td>
                    <td class="table-hidden">北京市</td>
                    <td class="table-hidden">朝阳区</td>
                    <td class="table-hidden">北京市朝阳区芍药居</td>
                    <td class="table-hidden">100000</td>
                </tr>
                <tr>
                    <td>查看</td>
                    <td class="table-hidden">张小刚</td>
                    <td class="table-hidden">25</td>
                    <td class="table-hidden">北京市</td>
                    <td class="table-hidden">海淀区</td>
                    <td class="table-hidden">北京市海淀区西二旗</td>
                    <td class="table-hidden">100000</td>
                </tr>
                <tr>
                    <td>查看</td>
                    <td class="table-hidden">李小红</td>
                    <td class="table-hidden">30</td>
                    <td class="table-hidden">上海市</td>
                    <td class="table-hidden">浦东新区</td>
                    <td class="table-hidden">上海市浦东新区世纪大道</td>
                    <td class="table-hidden">100000</td>
                </tr>
                <tr>
                    <td>查看</td>
                    <td class="table-hidden">周小伟</td>
                    <td class="table-hidden">26</td>
                    <td class="table-hidden">广东</td>
                    <td class="table-hidden">南山区</td>
                    <td class="table-hidden">深圳市南山区深南大道</td>
                    <td class="table-hidden">100000</td>
                </tr>
            </table>
        </div>
    </div>
</div>

<style lang="sass">
    .table-wrapper{
        width: 550px;
        border: 1px solid #e5e5e5;
        position: relative;

        .table-hidden{
            visibility: hidden;
        }
        .table-fixed-left{
            box-shadow: 2px 0 6px -2px rgba(0,0,0,.2);
            position: absolute;
            left: 0;
            top: 0;
            overflow: hidden;
        }
        .table-fixed-right{
            box-shadow: -2px 0 6px -2px rgba(0,0,0,.2);
            position: absolute;
            top: 0;
            left: auto;
            right: 0;
            overflow: hidden;
        }
    }

    /* table基础样式 */
    .table-striped {
        overflow-y: hidden;
        /*margin: 0 -20px;*/
        /*margin-bottom: 20px;*/
        table { 
            width: 100%;
            white-space: nowrap;
            background: #fff;
            th{
               padding: 10px 20px;
                border: 0;
                line-height: 1.7em;
                border-bottom: 1px solid #999;
                /*border-top:1px solid #e9e9e9;*/
                font-weight: bold;
                text-align: left;
            }
            td{ 
                padding: 10px 20px;
                border: 0;
                line-height: 1.7em;
                border-bottom: 1px solid #e9e9e9;
                vertical-align:top;
                a{
                    color: #2196F3;
                    cursor: pointer;
                }
                i{ 
                    padding-right: 10px; 
                }
            }
        }
        & tbody tr:nth-of-type(odd) { 
            background-color: #fcfcfc; 
        }
    } 
</style>



















<!-- ####  基础样式 -->



<br>

<!-- 
rowspan="2"  意思是向下合并两个单元格
colspan="2"  意思是向右合并两个单元格
<div class="multiple-table">
    <table>  
        <thead>    
            <tr>      
                <th rowspan="2">表头一</th>      
                <th rowspan="2">表头二</th>      
                <th colspan="2"><div>表头三</div></th>      
                <th colspan="3"><div>表头四</div></th>
                <th rowspan="2">表头五</th>     
            </tr>    
            <tr>      
                <th>当月</th>      
                <th>上月</th>      
                <th>当月</th>      
                <th>上月</th>      
                <th>其他</th>      
            </tr>  
        </thead>  
        <tbody>    
            <tr>      
                <td v-for="1 in 8">第1行,第{{$index+1}}列</td> 
            </tr>    
            <tr> 
                <td v-for="1 in 8">第2行,第{{$index+1}}列</td> 
            </tr>    
            <tr>      
                <td v-for="1 in 8">第3行,第{{$index+1}}列</td>   
            </tr> 
        </tbody>
    </table>
</div> -->








