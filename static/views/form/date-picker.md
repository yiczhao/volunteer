## DatePicker 
> **Author:张大柱**
> 常用的日期组件

---

### 基础使用 （分类）

> ####  **KsDateMonth => {{datemonth}}**

<ks-date-month v-bind:value.sync="datemonth"></ks-date-month>
```html
<ks-date-month v-bind:value.sync="datemonth"></ks-date-month>
```

>> ####  **KsDatePicker  => {{datemonth2}}**

<ks-date-picker  placeholder="aaa" type="datemonth" 
    v-bind:value.sync="datemonth2"></ks-date-picker>
```html
<ks-date-picker type="datemonth" 
    v-bind:value.sync="datemonth2"></ks-date-picker>
```

>> ####  **KsDatePicker V1.0.0 【min、max】=> {{datemonth3}}**

<ks-date-picker type="datemonth" min="2017-11" max="2018-09"
    v-bind:value.sync="datemonth3"></ks-date-picker>
```html
<ks-date-picker type="datemonth" min="2017-09" max="2018-09"
    v-bind:value.sync="datemonth3"></ks-date-picker>
```


> #### **date => {{date}}**

<ks-dater type="date"
    v-bind:value.sync="date" 
    v-on:change="date_change"></ks-dater>
```html
<ks-dater type="date"
    v-bind:value.sync="date" 
    v-on:change="date_change"></ks-dater>
```

>> #### **date on KsDatePicker V1.0.0 【min、max】=> {{date}}**

<ks-date-picker type="date" min="2016-10-12" max="2017-10-17"
    v-bind:value.sync="date" 
    v-on:change="date_change"></ks-date-picker>

```html
<ks-date-picker type="date" min="2016-10-12" max="2017-10-17"
    v-bind:value.sync="date" 
    v-on:change="date_change"></ks-date-picker>
```

> #### **datetime on KsDatePicker => {{datetime}}**


<ks-date-picker type="datetime" 
    v-bind:value.sync="datetime" 
    v-on:change="datetime_change"></ks-date-picker> 
```html
<ks-date-picker type="datetime" 
    v-bind:value.sync="datetime" 
    v-on:change="datetime_change"></ks-date-picker> 
```


> #### **datemulti on KsDater => {{dateMultiPure}}**


<ks-dater type="datemulti" 
    v-bind:value.sync="dateMultiPure" 
    v-on:change="dateMultiPureChange"></ks-dater>
```html
<ks-dater type="datemulti" 
    v-bind:value.sync="dateMultiPure" 
    v-on:change="dateMultiPureChange"></ks-dater>
```
> #### **datemulti on KsDatePicker => {{datemulti}}**

<ks-date-picker type="datemulti" 
    v-bind:value.sync="datemulti" 
    v-on:change="datemulti_change"></ks-date-picker>
```html
<ks-date-picker type="datemulti" 
    v-bind:value.sync="datemulti" 
    v-on:change="datemulti_change"></ks-date-picker>
```



> #### **daterange**


<ks-dater-range 
    v-bind:range.sync="['','']" 
    v-on:change="daterange_change"></ks-dater-range>
```html
<ks-dater-range 
    v-bind:range.sync="['','']" 
    v-on:change="daterange_change"></ks-dater-range>
```


> #### **daterange picker => {{dateRangePicker}}**


<ks-date-range-picker placeholder="开始,结束" 
        v-bind:range.sync="dateRangePicker"
        v-bind:readonly="false"
        v-on:change="daterange_picker_change"></ks-date-range-picker>
```html
<ks-date-range-picker placeholder="开始,结束" 
        v-bind:range.sync="dateRangePicker"
        v-bind:readonly="false"
        v-on:change="daterange_picker_change"></ks-date-range-picker>
```
<ks-date-range-picker placeholder="开始,结束" 
        v-bind:range.sync="dateRangePicker2"
        v-bind:readonly="true"
        v-on:change="daterange_picker_change"></ks-date-range-picker>
```html
<ks-date-range-picker placeholder="开始,结束" 
        v-bind:range.sync="dateRangePicker2"
        v-bind:readonly="true"
        v-on:change="daterange_picker_change"></ks-date-range-picker>
```





### 非范围日期组件API
| 参数 | 版本 | 说明 | 接口类型 | 类型 | 可选值 | 默认值 |
|------|-------|-------|----------|---------|-------|--------|
| type || dater类型 | props | String | **date**, **datetime**,**datemonth**, **datemulti**| date |
| value || 数据中绑定的值（可sync） | props | String | **date=>'2016-11-09'**，**datemonth=>'2016-09'**，**datetime=>'2016-11-09 03:04:20'**，**datemulti=>'2016-11-09,2016-11-10'** | 无 |
| min | V1.0.0 |最小范围 | props | String | **date=>'2016-11-09'**，**datemonth=>'2016-09'** | 无 |
| max | V1.0.0 |最大范围 | props | String | **date=>'2016-11-09'**，**datemonth=>'2016-09'** | 无 |
| placeholder || 提示 | props | String | 无 | 无 |
| readonly || 是否只读 | props | Boolean | `true`, `false` | `false` |
| change || 组件中日期时间改变复值 | props | Event | `可不设置change` | 无 |

### 范围日期组件API（区别部分如下）
| 参数 | 说明 | 接口类型 | 类型 | 可选值 | 默认值 |
|------|-------|----------|---------|-------|--------|
| type | 无type类型 | null | null | null| null |
| range | 数据中绑定的值（可sync） | props | Array | **[]**|**[]** |


```javascript
<script>
    export default {
        data(){
            return {
                datemonth:'2016-10',
                datemonth2:'2016-10',
                datemonth3:'2016-10',
                datetime:'2016-10-12 03:04:20',
                date:'',
                datemulti:'',
                dateMultiPure:'',
                date_base:'2016-10-12 03:04:20',
                dateRangePicker:[],
                dateRangePicker2:['','']
            }
        },
        methods:{
            current_change(val){
                this.date_base = val
            },
            datetime_change(val){},
            date_change(val){
                // console.log('parent catch change value',val)
            },
            datemulti_change(val){
                // console.log('筛选 picker',val)
                if(!val){
                    // setTimeout(()=>{
                        // this.datemulti = '2016-11-02'            
                    // })
                }
                
            },
            dateMultiPureChange(){

            },
            daterange_change(val){
                console.log(val)
            },
            daterange_picker_change(val){
                console.log('多选 picker',val)
            }
        },
        ready(){
            this.date1 = '2016-09-21 03:02:24'

            setTimeout(()=>{
                this.dateRangePicker = ['2016-09-21','2016-10-29']
            },1000)

            setTimeout(()=>{
                this.dateRangePicker2 = ['','']
            },10000)

            setTimeout(()=>{
                this.datemonth2 = '2016-09'
            },1000)
        }

    }
</script>
```



<script>
    export default {
        data(){
            return {
                datemonth:'2016-10',
                datemonth2:'2016-10',
                datemonth3:'2016-10',
                datetime:'2016-10-12 03:04:20',
                date:'',
                datemulti:'',
                dateMultiPure:'',
                date_base:'2016-10-12 03:04:20',
                dateRangePicker:[],
                dateRangePicker2:['','']
            }
        },
        methods:{
            current_change(val){
                this.date_base = val
            },
            datetime_change(val){},
            date_change(val){
                // console.log('parent catch change value',val)
            },
            datemulti_change(val){
                // console.log('筛选 picker',val)
                // if(!val){
                //     // setTimeout(()=>{
                //         this.datemulti = '2016-11-02'            
                //     // })
                // }
                
            },
            dateMultiPureChange(){

            },
            daterange_change(val){
                console.log(val)
            },
            daterange_picker_change(val){
                console.log('多选 picker',val)
            }
        },
        ready(){
            this.date1 = '2016-09-21 03:02:24'

            setTimeout(()=>{
                this.dateRangePicker = ['2016-09-21','2016-10-29']
            },1000)

            setTimeout(()=>{
                this.dateRangePicker2 = ['','']
            },10000)

            setTimeout(()=>{
                this.datemonth2 = '2016-09'
            },1000)
        }

    }
</script>


