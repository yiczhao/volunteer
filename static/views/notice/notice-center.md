## NoticeCenter 通知中心

> 通知中心
> 作者: pkeros(张杰)
> 最后修改时间: 2017-04-10

---

### 基础使用
<label for="type">类型：</label><select name="type" id="type" v-model="type"><option value="primary">默认 --- 主色调</option><option value="warn">警告 --- 警告色</option><option value="danger">危险 --- 危险色</option><option value="success">成功 --- 成功色</option><option value="info">信息 --- 信息色</option></select>

<label for="title">标题：</label>
<input type="text" id="title" v-model="title">

<label for="title">内容：</label>
<textarea id="title" v-model="content"></textarea>

<label for="timeout">超时时间：</label>
<input type="number" id="timeout" v-model="timeout">
<br>
<ks-button @click="postOneMsg2NoticeCenter">将消息投递到通知中心</ks-button>

<script>
  export default{
    data () {
      return { 
        title: 'title',
        content: 'content...',
        type: 'primary',
        timeout: 4500
      }
    },
    
    methods: {
      postOneMsg2NoticeCenter () {
        this.$KsNotice.post(this.title, this.content, this.type, this.timeout << 0, (msg) => console.log(msg));
      }
    }
  }
</script>

```javascript
//                 通知标题  通知内容 通知类型 自动销毁时间   关闭之后的回调
//                    V       V       V        V              V
this.$KsNotice.post(title, content, type,    delay, o => console.log(o));
```
> 回调函数中接受的 `o` 对象是当前关闭信息的详细配置信息，具体内容如下:
```javascript
{
  closeCb: Function,                  // 关闭当前信息的回调函数，也就传入的回调函数
  options: {                          // 生成的配置对象
    closeBtn: Boolean,                // 当前信息是否显示了关闭按钮
    content: String,                  // 当前信息内容
    delay: Number,                    // 当前信息关闭的延迟
    hue: String,                      // 当前信息的色调，也就是类型
    title: String                     // 当前信息的标题
  },
  _uid: Number                        // 当前信息的 UID
}
```
> 当前不需要传入 delay 参数是该参数可以省去，该参数默认值为 `4500`，如果不要传入 delay 参数那么 close 的回调可以提前。
```javascript
//                 通知标题  通知内容 通知类型  关闭之后的回调
//                    V       V       V          V
this.$KsNotice.post(title, content, type, o => console.log(o));
```

### 其他使用方式
> noticeCenter 组件还支持通过类型快捷调用， KsNotice对象上含有 `primary`, `danger`, `warn`, `success`, `info` 对应的方法。
> 同样样式 delay 参数和关闭的回调都可以不传，也可以传任意一个。
```javascript
//              类型 通知标题  通知内容 自动销毁时间   关闭之后的回调
//               V     V        V         V             V
this.$KsNotice.info(title, content,     delay, o => console.log(o));
```

### API

#### KsModal / KsModalEntity

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| title | 通知内容的标题 | param | String | - | 否 | - | `'title'` |
| content | 通知内容的主体 | param | String | - | 否 | - | `'content...'` |
| type | 通知内容的类型 | param | String | - | 否 | `primary`, `danger`, `warn`, `success`, `info` | `primary` |
| timeout | 通知消息销毁的时间 | param | Number | - | 否 | - | `4500` |
| closeCallback | 当前通知消息销毁时的回调 | param | Function | - | 否 | - | - |
