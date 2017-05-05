## ksStore

> Author:左晶晶
> 常用的列表选择组件

---

<ks-store
    :store_part.sync = "store_part0"
    :list.sync = "list"
    :is_havechecked = "is_havechecked">
</ks-store>

<br/>

<span style="color:red;font-size:18px">已经选择：{{store_part0 | filter_name}}</span>

-----

<br/>


```html
<ks-store
    :store_part.sync = "store_part"
    :list.sync = "list"
    :is_havechecked = "is_havechecked">
</ks-store>
```
### API
| 参数 | 说明 | 接口类型  | 可选值 | 默认值 | 是否必须 |
|------|-------|----------|---------|-------|--------|
| is_havechecked | 包括是否显示全选  | Boolean | true, false | false  | 否 |
| store_part | 用于显示已选中的门店id  | Object | 无 | 无 |是 |
| list | 用于获取门店列表  | Array | 无 | 无 |是 |
| store_list_show | 用于是否显示门店列表 | Boolean | true, false | false | 否 |
| max_height | 显示下拉内容的最大高度  | String | 无 | 无 |是 |
| min_width | 显示下拉内容的最小宽度  | String | 无 | 无 |是 |


```javascript
<script lang="babel">

import list from 'SRC/doc/views/data/data.js'

export default {
    data(){
        return {  
            store_part:{
                choose_store : []
            },
            is_havechecked:true,
            list:list
        }  
    },
    methods:{},
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
    }
}
</script>
```


------

<br/>

### KsStoreClick
> 常用的列表选择扩展组件

-----

<ks-store-click
        :store_part.sync = "store_part1"
        :list.sync = "list">
</ks-store-click>

```html
<ks-store-click
        :store_part.sync = "store_part"
        :list.sync = "list">
</ks-store-click>
```
### API
| 参数 | 说明 | 接口类型  | 可选值 | 默认值 | 是否必须 |
|------|-------|----------|---------|-------|--------|
| is_havechecked | 包括是否显示全选  | Boolean | true, false | false  | 否 |
| store_part | 用于显示已选中的门店id  | Object | 无 | 无 |是 |
| list | 用于获取门店列表  | Array | 无 | 无 |是 |
| store_list_show | 用于是否显示门店列表 | Boolean | true, false | false | 否 |
| max_height | 显示下拉内容的最大高度  | String | 无 | 无 |是 |
| min_width | 显示下拉内容的最小宽度  | String | 无 | 无 |是 |

<br/>

### ksStoreClick案例其他参数展示

<br/>

#### 1.加上全选按钮
<div>
<ks-store-click
        :store_part.sync = "store_part2"
        :list.sync = "list"
        :is_havechecked = "is_havechecked">
</ks-store-click>
</div>

```javascript
<ks-store-click
        :store_part.sync = "store_part"
        :list.sync = "list"
        :is_havechecked = "is_havechecked">
</ks-store-click>
```

#### 2.加上宽高
<div>
<ks-store-click
        :store_part.sync = "store_part3"
        :list.sync = "list"
        :max_height = "max_height"
        :min_width = "min_width">
</ks-store-click>
</div>

```javascript
<ks-store-click
        :store_part.sync = "store_part"
        :list.sync = "list"
        :max_height = "max_height"
        :min_width = "min_width">
</ks-store-click>
```

#### 3.代码如下

```javascript
<script>
import list from 'SRC/doc/views/data/data.js'
export default {
    data(){
        return {  
            store_part:{
                choose_store : []
            },
            is_havechecked:true,
            max_height:300,
            min_width:400,
            list:list
        }  
    },
    methods:{}
}
</script>
```
<script>
import list from 'SRC/doc/views/data/data.js'
export default {
    data(){
        return {  
            store_part1:{
                choose_store : []
            },
            store_part2:{
                choose_store : []
            },
            store_part3:{
                choose_store : []
            },
            store_part0:{
                choose_store : []
            },
            is_havechecked:true,
            max_height:300,
            min_width:400,
            list:list
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
    methods:{},
    ready(){
    }
}
</script>

