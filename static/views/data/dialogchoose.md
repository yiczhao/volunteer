## KsList

> 常用的弹出框列表选择组件

---

<ks-list 
        :list.sync = list3
        :sid.sync = sid3
        :type-mate = "typemate"
        :name-mate = "namemate"></ks-list><br/>
<div>
    <span style="color:red;font-size:15px">已选门店id:{{sid3}}</span><br/>
</div>  


<br/>

---


```javascript
<!-- sid双向绑定,返回已经选中的门店id -->
<ks-list 
        :list.sync = list3
        :sid.sync = sid3></ks-list><br/>
<div>
    <span style="color:red;font-size:15px">已选门店id:{{sid3}}</span><br/>
</div>  
```

---

<ks-list 
        :list.sync = list4
        :sid = sid4
        @change = "getSidList"></ks-list><br/>
<div>
    <span style="color:red;font-size:15px">已选门店id:{{sid4}}</span><br/>
</div>  


<br/>

---


```javascript
<!-- sid单向绑定,提供了一个onchange事件,返回已经选中的门店id -->
<ks-list 
        :list.sync = list4
        :sid = sid4
        @change = "getSidList"></ks-list><br/>
<div>
    <span style="color:red;font-size:15px">已选门店id:{{sid3}}</span><br/>
</div>  
```


-------



## ksDialogChoose



---

<ks-dialog-choose 
        :list.sync = list1
        :sid.sync = sid1></ks-dialog-choose ><br/>
<div>
    <span>已选门店id:{{sid1}}</span><br/>
</div>  

---- 


```js
<!-- sid双向绑定,返回已经选中的门店id -->
<ks-dialog-choose 
        :list.sync = list1
        :sid.sync = sid1></ks-dialog-choose ><br/>
<div>
    <span>已选门店id:{{sid1}}</span><br/>
</div>  
```


<ks-dialog-choose 
        :list.sync = list2
        :sid = sid2
        @change = getSid ></ks-dialog-choose ><br/>
<div>
    <span>已选门店id:{{sid2}}</span><br/>
</div>  

----


```js
<!-- sid单向绑定,提供了一个onchange事件,返回已经选中的门店id -->
<ks-dialog-choose 
        :list.sync = list2
        :sid = sid2
        @change = getSid ></ks-dialog-choose ><br/>
<div>
    <span>已选门店id:{{sid2}}</span><br/>
</div>  
```

### API
| 参数 | 说明 | 接口类型  | 可选值 | 默认值 | 是否必须 |
|------|-------|----------|---------|-------|--------|
| list | 门店列表  | Array | 无 | 无 |是 |
| sid | 用于显示已选中的门店id  | Array | 无 | 无 |否 |
| is_storetype | 用于判断弹出层类型(true是table类型,false是基本弹出层样式)  |  Boolean | true,false | false | 否 |
| errorinfo | 用于显示一个没选中的错误信息  | String | 无 | *您尚未选择门店 |否 |
| type-mate | 用于显示一个没选中的错误信息  | String | 无 | id |否 |
| name-mate | 用于显示一个没选中的错误信息  | String | 无 | name |否 |

<br/>

#### 代码如下

```javascript


<script lang="babel">
import listdata from 'SRC/doc/views/data/data.js'

export default {
    data(){
        return {  
            list1:[],
            list2:[],
            list3:[],
            list4:[],
            sex:[{'level':'0',levelname:'男'},{'level':'1',levelname:'女'}],
            sid1:['086021000000006'],
            sid2:[],
            sid3:['086021000000006'],
            sid4:['086021000000006'],
        }  
    },
    methods:{
        getSid(val){
            this.sid2 = val
        },
        getSidList(val){
            this.sid4 = val;
        }
    },
    ready(){
        listdata.forEach(item=>{
            item.ischecked = false
        })
        this.sex.forEach(item=>{
            item.ischecked = false
        })

        this.list1 = JSON.parse(JSON.stringify(listdata))
        this.list2 = JSON.parse(JSON.stringify(listdata))
        this.list3 = JSON.parse(JSON.stringify(listdata))
        this.list4 = JSON.parse(JSON.stringify(this.sex))
    }
}
</script>
```



<script lang="babel">
import listdata from 'SRC/doc/views/data/data.js'

export default {
    data(){
        return {  
            list1:[],
            list2:[],
            list3:[],
            list4:[],
            sex:[{'level':'0',levelname:'男'},{'level':'1',levelname:'女'}],
            sid1:['086021000000006'],
            sid2:[],
            sid4:['086021000000006'],
            sid3:['0'],
            typemate:'level',
            namemate:'levelname'
        }  
    },
    methods:{
        getSid(val){
            this.sid2 = val
        },
        getSidList(val){
            this.sid4 = val;
        }
    },
    ready(){
        listdata.forEach(item=>{
            item.ischecked = false
        })
        this.sex.forEach(item=>{
            item.ischecked = false
        })

        this.list1 = JSON.parse(JSON.stringify(listdata))
        this.list2 = JSON.parse(JSON.stringify(listdata))
        this.list4 = JSON.parse(JSON.stringify(listdata))
        this.list3 = JSON.parse(JSON.stringify(this.sex))
    }
}
</script>




