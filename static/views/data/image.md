## ksImage

> 常用的图片显示组件

---


### 如果查看图片后，直接关闭，不需要在关闭时添加操作

<br>

<ks-button @click="imageShow1 = true">呼出 ksImage 组件</ks-button>

<ks-image 
    v-bind:show.sync="imageShow1" 
    v-bind:url="imgUrl"
    ></ks-image>

```html
<ks-button @click="imageShow = true">呼出 ksImage 组件</ks-button>
```

```html
<ks-image 
    v-bind:show.sync="imageShow" 
    v-bind:url="imgUrl"
    ></ks-image>
```

```javascript

    export default{
        data () {
            return {
                imageShow:false,
                imgUrl:" "
            }
        }
    }

```

### API
| 参数 | 说明 | 接口类型  | 可选值 | 默认值 | 是否必须 |
|------|-------|----------|---------|-------|--------|
| show | 用于是否显示查看图片组件 | Boolean | true, false | false | 是 |
| url | 显示图片的url  | String | 无 | 有 |是

<br>

### 如果查看图片后，关闭时需要添加事件

<br>

<ks-button @click="imageShow2 = true">呼出 ksImage 组件</ks-button>

<ks-image 
    v-bind:show="imageShow2" 
    v-bind:url="imgUrl"
    v-on:change="close"
    ></ks-image>

```html
<ks-button @click="imageShow = true">呼出 ksImage 组件</ks-button>
```

```html
<ks-image 
    v-bind:show="imageShow" 
    v-bind:url="imgUrl"
    v-on:change="close"
    ></ks-image>
```


```javascript

    export default{
        data () {
            return {
                imageShow:false,
                imgUrl:" "
            }
        },
        methods: {
            close(staut){
                this.imageShow2 = staut
                ...... 
                添加操作
                ......
            }
        }
    }

```



### API
| 参数 | 说明 | 接口类型  | 可选值 | 默认值 | 是否必须 |
|------|-------|----------|---------|-------|--------|
| show | 用于是否显示查看图片组件 | Boolean | true, false | false | 是 |
| url | 显示图片的url  | String | 无 | 有 |是
| change | 关闭时可添加事件  | Function | 无 | 无 |否 |





<script>
    export default{
        data () {
            return {
                imageShow1:false,
                imageShow2:false,
                imgUrl:"http://img02.tooopen.com/images/20140504/sy_60294738471.jpg"
            }
        },
        methods: {
            close(staut){
                this.imageShow2 = staut
                console.log('close',staut)
            }
        }
    }
</script>