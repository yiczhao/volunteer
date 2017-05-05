## KsPager 
> **Author:张大柱**
> 常用的日期组件

---

### 基础使用 （分类）

### page
page_current:{{page_current}}
<ks-page 
    v-bind:current.sync="page_current" 
    v-bind:length="7"
    v-bind:total="10000"
    v-bind:size="13"
    v-on:change="change"></ks-page>



```html
<ks-page 
    v-bind:current.sync="page_current" 
    v-bind:length="7"
    v-bind:total="100"
    v-bind:size="13"
    v-on:change="change"></ks-page>

// 新版本1.1.0 去除了老API v-bind:on-change 回掉方法 

```
### API
| 参数 | 版本 | 说明 | 接口类型 | 类型 | 可选值 | 默认值 |
|------|-------|-------|----------|---------|-------|--------|
| current || 当前选中的页数 | props | Number | 无 |无  |
| length || 展示的页数长度（`奇数`） | props | Number | `非必填` | 7 |
| total || 总条数 | props | Number | 无 | 无 |
| size || 每页展示条数 | props | Number | `非必填` | 10 |
| on-change |V1.1.0移除| 分页改变时调用 | props  | Function | `非必填` | 无 |
| v-on:change |V1.1.0添加| 分页改变时调用 | props  | Event | `非必填` | 无 |


### pageGroup
current:{{page_current2}}<br>
size:{{size}}
<ks-page-group
    v-bind:current.sync="page_current2" 
    v-bind:size.sync = 'size'
    v-bind:length="7"
    v-bind:total="100"
    v-bind:sizes="[10,17,30]"
    v-on:change="change2"></ks-page-group>

```html
<ks-page-group
    v-bind:current.sync="page_current2" 
    v-bind:size = 'size'
    v-bind:length="7"
    v-bind:total="100"
    v-bind:sizes="[10,17,30]"
    v-on:change="change2"></ks-page-group>
```
`比 ks-page 组件多的接口`
| 参数 | 版本 | 说明 | 接口类型 | 类型 | 可选值 | 默认值 |
|------|-------|-------|----------|---------|-------|--------|
| sizes || 页面展示的数据条数 | props | Array | `非必填` | [10,20,100] |
| on-change |V1.1.0移除| 分页改变时调用（val,type`sizes变化输出SIZE-CHANGE`） | props  | Function | `非必填` | 无 |
| v-on:change |V1.1.0添加| 分页改变时调用（val,type`sizes变化输出SIZE-CHANGE`） | props  | Event | `非必填` | 无 |

```javascript
<script>
    export default {
        data(){
            return {
                page_current:24,
                page_current2:4,
                size:''
            }
        },
        methods:{
            change(val){
                console.log(val);
            },
            change2(val,type){
                console.log(val,type);
            }
            
           
        }

    }
</script>
```
<script>
    export default {
        data(){
            return {
                page_current:24,
                page_current2:4,
                size:10
            }
        },
        methods:{
            change(val){
                console.log(val);
            },
            change2(val,type){
                console.log(val,type);
            }
            
           
        }

    }
</script>

