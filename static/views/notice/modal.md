## Modal 弹窗面板

> 在保留当前页面状态的情况下，告知用户并承载相关操作。

---

### 基础使用

#### 弹窗组件的基础使用（KsModalEntity）

<br>

<ks-switch :checked.sync="modalShow"></ks-switch>
<ks-modal-entity :show.sync="modalShow" title="通过 Slot 自定义标题" content="通过 Slot 自定义内容">
</ks-modal-entity>

```html
<ks-switch :checked.sync="modalShow"></ks-switch>
<ks-modal-entity :show.sync="modalShow">
  <!-- ! 注意: 作为 slot 的包裹元素最好使用行内元素 -->
  <span slot="title">通过 Slot 自定义标题</span>
  <span slot="content">通过 Slot 自定义内容</span>
</ks-modal-entity>
```

> `KsModal` 组件和 `KsDialog` 组件的 API 使用方法差不多，所以在此我就不再多赘述了。

<br>

#### 通过方法调用组件（KsModal）

<br>

<ks-button @click="showModal">呼出 KsModal 组件</ks-button>

```html
<ks-button @click="showModal">呼出 KsModal 组件</ks-button>
```

```javascript
/**
 * @description info, warn, success, primary, normal 这几个原型上的方法都是都是对应风格的 modal 组件
 * 显示的 modal  showConfirmBtn: true, 有取消, 有关闭, 有确定按钮。
                showCancelBtn: true,
                showCloseBtn: true,
                
 * @param content {String} 显示的内容
 * @param title {String} 显示的标题
 */
$KsModal.info (content, title);            // info 风格的 modal
$KsModal.warn (content, title);            // warn 风格的 modal
$KsModal.success (content, title);         // success 风格的 modal
$KsModal.primary (content, title);         // primary 风格的 modal
$KsModal.normal (content, title);          // normal 风格的 modal


/**
 * @description prompt 类型模态
 * @summary
 *  提示类型也是默认的类型, 拥有确定取消并且有关闭按钮.
 * @param content {String} 显示的内容
 * @param title {String} 标题
 * @param hue {String} 色调
 * @param options {Object} 附加配置项
 */
$KsModal.prompt (content, title, hue, options);

/**
 * @description confirm 类型模态
 * @summary
 *  这是一种只有确定和取消的模态, 用户必须做出选择.
 * @param content {String} 显示的内容
 * @param title {String} 标题
 * @param hue {String} 色调
 * @param options {Object} 附加配置项
 */
$KsModal.confirm (content, title, hue, options);

/**
 * @description 警告类型模态
 * @summary
 *  这是一种没有取消和确定的的模态类型, 我们称它为警告类型
 *  一般警告类型的运用场景就是弹出一些信息展示给用户, 没有相关后续操作.
 *  @param content {String} 显示的内容
 *  @param title {String} 标题
 *  @param hue {String} 色调
 *  @param options {Object} 附加配置项
 */
$KsModal.alert (content, title, hue, options);

// options 默认配置和配置内容
let defaults = {
  showConfirmBtn: true,
  showCancelBtn: true,
  showCloseBtn: true,
  cancelBtnText: '取消',
  confirmBtnText: '确定',
  mask: true,
  title: 'Title',
  content: 'Content...',
  type: 'normal'
}
```

> 上面就是 `KsModal` 对象上的一些方法，以及区别于 `KsDialog` 的部分。其他的使用方法与技巧与 `KsDialog` 相同。

<br>

#### 全屏模态承载大量业务逻辑 （KsModalCenter）

<br>

<ks-button @click="showModalCenter">呼出 KsModalCenter 组件</ks-button>
<ks-modal-center :show.sync="modalShowCenter" width="1000" title="呼出 KsModalCenter 组件">
  <template slot="content"><div style="width: 100%; height: 1000px;background: #f59f00"></div></template>
</ks-modal-center>

```html
<ks-button @click="showModalCenter">呼出 KsModalCenter 组件</ks-button>
<ks-modal-center :show.sync="modalShowCenter" width="1000" title="呼出 KsModalCenter 组件">
  <template slot="title">呼出 KsModalCenter 组件</template>
  <template slot="content">
    <div style="width: 100%; height: 1000px;background: #f59f00"></div>
  </template>
</ks-modal-center>
```

### 脚本

<script>
  export default{
    data () {
      return {
        modalShow: false,
        modalShowCenter: false,
      }
    },
    
    methods: {
      showModal () {
        this.$KsModal.info('1', '2', '3')();
      },
      
      showModalCenter () {
        this.modalShowCenter = true;
      }
    }
  }
</script>

```html
<script>
  export default{
    data () {
      return {
        modalShow: false,
        modalShowCenter: false,
      }
    },
    
    methods: {
      showModal () {
        this.$KsModal.info('1', '2', '3')();
      },
      
      showModalCenter () {
        this.modalShowCenter = true;
      }
    }
  }
</script>
```

### API

#### KsModal / KsModalEntity

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| showCloseBtn | 用来描述 `KsModal` 是否显示关闭按钮 | props | Boolean | `false` | 否 | 无 | `true` |
| showConfirmBtn | 用来描述 `KsModal` 是否显示确定按钮 | props | Boolean | `false` | 否 | 无 | `true` |
| showCancelBtn | 用来描述 `KsModal` 是否显示取消按钮 | props | Boolean | `false` | 否 | 无 | `true` |
| cancelBtnText | 用来描述当前 `KsModal` 取消按钮的文字 | props | String | `false` | 否 | 无 | 取消 |
| confirmBtnText | 用来描述当前 `KsModal` 确定按钮的文字 | props | String | `false`| 否 | 无 | 确定 |
| title | 用来描述当前 `KsModal` 标题的文字 | props | String | `false` | 否 | 无 | 无 |
| content | 用来描述当前 `KsModal` 内容的文字 | props | String | `false` | 否 | 无 | 无 |
| type | 用来描述当前 `KsModal` 的类型 | props | String | `false` | 否 | `success`, `info`, `warn`, `danger`, `primary`, `normal` | `normal` |
| show | 用来描述当前 `KsModal` 是否显示 | props | Boolean | `true` | 是 | 无 | 无 |
| @confirm | `KsModal` 确定按钮点击 事件 | event | - | - | 否 | - | - |
| @cancel | `KsModal` 取消按钮点击 事件 | event | - | - | 否 | - | - |
| @close | `KsModal` 关闭按钮点击 事件 | event | - | - | 否 | - | - |

#### KsModalCenter

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| showCloseBtn | 用来描述 `KsModal` 是否显示关闭按钮 | props | Boolean | `false` | 否 | 无 | `true` |
| showConfirmBtn | 用来描述 `KsModal` 是否显示确定按钮 | props | Boolean | `false` | 否 | 无 | `true` |
| showCancelBtn | 用来描述 `KsModal` 是否显示取消按钮 | props | Boolean | `false` | 否 | 无 | `true` |
| cancelBtnText | 用来描述当前 `KsModal` 取消按钮的文字 | props | String | `false` | 否 | 无 | 取消 |
| confirmBtnText | 用来描述当前 `KsModal` 确定按钮的文字 | props | String | `false`| 否 | 无 | 确定 |
| mask | 用来描述当前 `KsModal` 是否含有背景遮罩 | props | Boolean | `false` | 否 | 无 | `true` |
| title | 用来描述当前 `KsModal` 标题的文字 | props | String | `false` | 否 | 无 | 无 |
| content | 用来描述当前 `KsModal` 内容的文字 | props | String | `false` | 否 | 无 | 无 |
| type | 用来描述当前 `KsModal` 的类型 | props | String | `false` | 否 | `success`, `info`, `warn`, `danger`, `primary`, `normal` | `normal` |
| show | 用来描述当前 `KsModal` 是否显示 | props | Boolean | `true` | 是 | 无 | 无 |
| @confirm | `KsModal` 确定按钮点击 事件 | event | - | - | 否 | - | - |
| @cancel | `KsModal` 取消按钮点击 事件 | event | - | - | 否 | - | - |
| @close | `KsModal` 关闭按钮点击 事件 | event | - | - | 否 | - | - |
