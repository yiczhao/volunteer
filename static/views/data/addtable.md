## ksAddTableItem

> Author:左晶晶
> 常用的添加表格控件

---

<ks-button :type="'primary'" @click="show_dialog(-1)">表格项设置</ks-button>
<br/>
<ks-button :type="'primary'" @click="show_dialog(0)">获取默认表的内容</ks-button>
<ks-add-table-item
    :is_storetype = is_storetype
    :width = width
    :datasource = datasource
    :list.sync = list
    :checkalllist = checkalllist
    :prefix = prefix 
    @save = save></ks-add-table-item>

----


```js
<ks-button :type="'primary'" @click="show_dialog(-1)">表格项设置</ks-button>
<br/>
<ks-button :type="'primary'" @click="show_dialog(0)">获取默认表的内容</ks-button>
<ks-add-table-item
    :is_storetype = is_storetype
    :width = width
    :datasource = datasource
    :list.sync = list
    :checkalllist = checkalllist
    :prefix = prefix 
    @save = save></ks-add-table-item>
```
### API
| 参数 | 说明 | 接口类型  | 可选值 | 默认值 | 是否必须 |
|------|-------|----------|---------|-------|--------|
| is_show | 弹出层是否显示  | Boolean | true,false | false | 否 |
| width | 弹出层width  | Number | 无 | 400 |否 |
| is_storetype | 用于判断弹出层类型(true是table类型,false是基本弹出层样式)  |  Boolean | true,false | false | 否 |
| datasource | 数据源，表格当中必选的字段集合  | Object | 无 | 无 | 是 |
| list | 数据源，表格当中所有的字段集合  | Array | 无 | 无 | 无 | 是 |
| checkalllist | 数据源，表格当中未选的字段集合  | Array | 无 | 无 | 无 | 是 |
| prefix | 存在本地的名字前缀  | String | 无 | 无 | 无 | 是 |
<br/>

#### 代码如下

```javascript

<script lang="babel">
import listdata from 'SRC/doc/views/data/tabledata.js'
export default {
    data(){
        return {  
            datasource:listdata.datasource,
            width:800,
            is_storetype:true,
            list:[],
            checkalllist:listdata.checkalllist,
            prefix:'managetrade'
        }  
    },
    methods:{
       show_dialog(index){
            this.$broadcast('show_dialog',index)
       },
       save(){
            console("2")
       }
    },
    ready(){
        var listitem = []
        var prefix = this.prefix + '_list'
        if(localStorage.getItem(prefix))
        {
            listitem =  JSON.parse(localStorage.getItem(prefix))
            this.list = listitem
        }else{
            listitem =  JSON.parse(JSON.stringify(listdata.list))
            this.list = listitem
        }
    }

}
</script>
```


<script lang="babel">
import listdata from 'SRC/doc/views/data/tabledata.js'
export default {
    data(){
        return {  
            datasource:listdata.datasource,
            is_show:false,
            width:800,
            is_storetype:true,
            list:[],
            checkalllist:listdata.checkalllist,
            prefix:'managetrade'
        }  
    },
    methods:{
       show_dialog(index){
            this.$broadcast('show_dialog',index)
       },
       save(){
            console("2")
       }
    },
    ready(){
        var listitem = []
        var prefix = this.prefix + '_list'
        if(localStorage.getItem(prefix))
        {
            listitem =  JSON.parse(localStorage.getItem(prefix))
            this.list = listitem
        }else{dialogchoose
            listitem =  JSON.parse(JSON.stringify(listdata.list))
            this.list = listitem
        }
    }

}
</script>




