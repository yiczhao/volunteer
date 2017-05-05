## ksImgs
> Author:王明
> 常用的多图预览轮播组件

---

### 基础使用 

<br>
<img v-on:click="put(url,$index)" :src="i" v-for='i in url' style="width: 50px;height: 50px;cursor: pointer;" >



<ks-imgs 
      v-bind:show.sync="imageShow"  
      v-bind:src="src"  
      v-bind:pindex="index"    
      ></ks-imgs>

```html
<img v-on:click="put(url,$index)" :src="i" v-for='i in url' style="width: 50px;height: 50px;cursor: pointer;" >
 呼出 KsImgs 组件

```

```html
<ks-imgs 
      v-bind:show.sync="imageShow"  
      v-bind:src="src"  
      v-bind:pindex="index"      
      ></ks-imgs>
```
#### 脚本
```javascript
<script>
    export default{
        data () {
            return {
                imageShow:false,
                index:0,
                src:[],
                url:["http://img02.tooopen.com/images/20140504/sy_60294738471.jpg",'http://joymepic.joyme.com/article/uploads/20172/211490080221647281.jpeg','http://www.40407.com/uploads/allimg/170309/1817755_170309170502_1.jpg','http://pic7.nipic.com/20100522/1263764_002013845527_2.jpg']
            }
        },
        methods: {
            put(src,index){
                this.src=src;
                this.index=index;
                this.imageShow=true;
            }
        }
    }
</script>
```

### API
| 参数 | 说明 | 接口类型  | 可选值 | 默认值 | 是否必须 |
|------|-------|----------|---------|-------|--------|
| show | 用于是否显示查看图片组件 | Boolean | true, false | false | 是 |
| src | 显示图片的url数组 | Array |   无 | 无 |是
| index | 当前要显示的图片的索引  | Number | 无 | 0 |否
| load | 是否需要下载功能  | Boolean | true, false | true | 否   |

<br>










<script>
    export default{
        data () {
            return {
                imageShow:false,
                index:0,
                src:[],
                url:["http://img02.tooopen.com/images/20140504/sy_60294738471.jpg",'http://joymepic.joyme.com/article/uploads/20172/211490080221647281.jpeg','http://www.40407.com/uploads/allimg/170309/1817755_170309170502_1.jpg','http://pic7.nipic.com/20100522/1263764_002013845527_2.jpg']
            }
        },
        methods: {
            put(src,index){
                this.src=src;
                this.index=index;
                this.imageShow=true;
            }
        }
    }
</script>