## KsItem

> Author:左晶晶
> 常用的楼层选择单组件

---

### 单组件展示

<br/>

<ks-item
    :floor_value.sync = "floor_begin1"></item>
</ks-item>
<span style="color:red;font-size:15px">已选中楼层:{{floor_begin1}}</span>

-----

```javascript
<ks-item
    :floor_value.sync = "floor_begin"></item>
</ks-item>
```

### API
| 参数 | 说明 | 接口类型  | 可选值 | 默认值 | 是否必须 |
|------|-------|----------|---------|-------|--------|
| floor_value | 用于显示默认楼层  | String | 无 | B1  | 是 |


<br/>

```javascript
<script lang="babel">
export default {
    data(){
        return {
            floor_begin:'B1'
        }
    },
    ready(){
    }
}
</script>
```
<br/>

## KsItemFloor

> 常用的楼层选择组件

<br/>

### API
| 参数 | 说明 | 接口类型  | 可选值 | 默认值 | 是否必须 |
|------|-------|----------|---------|-------|--------|
| floor_begin | 用于显示开始楼层  | String | 无 | B1  | 是 |
| floor_end | 用于显示结束楼层  |  String | 无 | F1  | 是 |
| isdisabled | 用于显示两种类型（true表示显示不可用楼层，false表示不显示不可用楼层）  | Boolean | true, false | false | 否 |

<br/>


### 案例展示

<br/>

#### 1.直接截取楼层(不显示不可用楼层)

<br/>

<ks-item-floor
    :floor_begin.sync = "floor_begin1"
    :floor_end.sync = "floor_end1">
</ks-item-floor>

```javascript
<ks-item-floor
    :floor_begin = "floor_begin1"
    :floor_end = "floor_end1">
</ks-item-floor>
```

#### 2.禁用楼层(显示不可用楼层)

<br/>

<ks-item-floor
    :floor_begin.sync = "floor_begin2"
    :floor_end.sync = "floor_end2"
    :isdisabled.sync = "isdisabled">
</ks-item-floor>

```javascript
<ks-item-floor
    :floor_begin.sync = "floor_begin2"
    :floor_end.sync = "floor_end2"
    :isdisabled.sync = "isdisabled">
</ks-item-floor>
```

#### 3.代码如下

```javascript
<script>
export default {
    data(){
        return {
            floor_begin1:'B1',
            floor_end1:'F1',
            floor_begin2:'B1',
            floor_end2:'F1',
            isdisabled:true
        }
    },
    ready(){
    }
}
</script>
```
<script>
export default {
    data(){
        return {
            floor_begin1:'B1',
            floor_end1:'F1',
            floor_begin2:'B1',
            floor_end2:'F1',
            isdisabled:true
        }
    },
    ready(){
    }
}
</script>

