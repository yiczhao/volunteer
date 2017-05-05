## Dialog 对话框

> Dialog 对话框
> 作者: pkeros(张杰)
> 最后修改时间: 2017-04-21
---

### 基础使用

#### 对话框的基础使用

<br>

> 亦可赛艇，只需要填入一个参数就可以调起一个 `KsDialog` 对话框

<br>

<ks-button @click="$KsDialog.success('我是测试内容!')">Click me</ks-button>

```html
<ks-button @click="$KsDialog.success('我是测试内容!')">Click me</ks-button>
```

#### 不同类型的对话框

<br>

> 英吹斯汀，如视觉规范所定义，一共有四种对话框，一样简单的可以呼出它们

<br>

<ks-button type="success" @click="$KsDialog.success('成功!')">成功</ks-button>  <ks-button type="info" @click="$KsDialog.info('信息!')">信息</ks-button> <ks-button type="warn" @click="$KsDialog.warn('警告!')">警告</ks-button>  <ks-button type="danger" @click="$KsDialog.danger('危险!')">危险</ks-button>

```html
<ks-button type="success" @click="$KsDialog.success('成功!')">成功</ks-button> 
<ks-button type="info" @click="$KsDialog.info('信息!')">信息</ks-button> 
<ks-button type="warn" @click="$KsDialog.warn('警告!')">警告</ks-button> 
<ks-button type="danger" @click="$KsDialog.danger('危险!')">危险</ks-button>
```

#### 自定义标题

<br>

> 默认在只传入一个 内容参数的 时候标题都是内置的
> success 默认标题为 成功
> info 默认标题为 信息
> warn 默认标题为 警告
> danger 默认标题为 危险

<br>

<ks-button type="success" @click="$KsDialog.success('成功!', '自定义的成功')">成功</ks-button>

```html
<!-- 在我们需要自定义标题的时候可以传入第二个参数 -->
<ks-button type="success" @click="$KsDialog.success('成功!', '自定义的成功')">成功</ks-button>
```

#### 处理用户点击确定按钮事件

<br>

> 有时候我们可能需要在用户点击确定之后做一些其他的工作，这时候我们就可以将响应函数传入第二个参数来处理用户点击 `confirm` 按钮的事件

<br>

<ks-button type="success" @click="handleConfirmEvent">成功</ks-button>

```javascript
this.$KsDialog.success('响应用户点击 `confirm` 按钮事件!', function () {
  alert('clicked confirm!')
})
```
<br>

> 在响应 `confirm` 事件时候自定义标题

<br>

<ks-button type="success" @click="handleConfirmEvent1">自定义标题</ks-button>

```javascript
this.$KsDialog.success('响应用户点击 `confirm` 按钮事件!', '自定义标题', function () {
  alert('clicked confirm!')
})
```

#### 带有取消操作的对话框

<br>

> 使用对话框是可能是询问用户一个操作是否继续这样我们就需要一个取消按钮来让用户可以中断操作

<br>

<ks-button type="success" @click="handleCancelEvent">成功</ks-button>

```javascript
this.$KsDialog.success('成功!', null, true).then(function () {
  alert('clicked confirm!')
}, function () {
  alert('clicked canceled!')
})
```
<br>

> 在设置了第三位参数为 `true` 的时候对话框就进入了 `对话` 模式，这时候必须使用 `then` 才能呼起对话框
> `then(confirmCallback, cancelCallback)` 第一位参数是 `confirm` 回调，第二位参数是 `cancel` 回调
> 在不想使用的时候传入 `null` 占位就可以了。

<br>

<ks-button type="success" @click="handleCancelEvent1">不对 confirm 进行处理</ks-button>

```javascript
this.$KsDialog.success('成功!', null, true).then(null, function () {
  alert('clicked canceled!')
})
```

### 高级用法

#### 阻止对话框关闭

<br>

> 默认情况下载点击确认或者取消按钮对话框都会关闭，如果需要组织对话框的关闭，那么在响应函数中返回 `true` 就行。

<br>

<ks-button type="success" @click="handleCancelEventReject">阻止对框关闭</ks-button>

```javascript
this.$KsDialog.success('成功!', null, true).then(function () {
  alert('clicked confirm!')
  
}, function () {
  alert('clicked canceled!')
  
  // 阻止了取消按钮关闭对话框会关闭对话框的行为
  return true;
})
```

#### 自定义 `confirm` `cancel` 按钮文字

<br>

> 组件提供了一个设置默认参数的方法 `setDefaults` 可以设置默认的 `confirm` `cancel` 文字。
> `cancelBtnText`: 取消按钮显示提示文字, `confirmBtnText`: 确定按钮显示的提示文字
> **点击之后它会修改整个 组件 的行为**

<br>

<ks-button type="success" @click="handleCancelEventCustomBtnText">修改按钮提示文字</ks-button>

```javascript
this.$KsDialog.setDefaults({ cancelBtnText: '自定义取消', confirmBtnText: '自定义确定' })
this.$KsDialog.success('成功!', null, true).then(function () {
  alert('clicked confirm!');
}, function () {
  alert('clicked canceled!');
})
```

#### 自定义 遮罩 颜色

<br>

> `backgroundColor` 字段可以提供修改遮罩颜色的能力。

<br>

<ks-button type="success" @click="handleCancelEventCustomMaskBackground">修改遮罩颜色</ks-button>

```javascript
this.$KsDialog.setDefaults({ backgroundColor: 'rgba(44, 11, 187, .3)' })
this.$KsDialog.success('成功!', null, true).then(function () {
  alert('clicked confirm!');
}, function () {
  alert('clicked canceled!');
})
```

#### 自定义 偏移

<br>

> `containerStyle` 字段就是应用在遮罩容器上的样式，理论上可以设置任何样式不过建议只使用 `margin, top, left, right, bottom`
> 来设置对话框的便宜，**就比如文档左侧菜单宽度是 `180px` 那么我们就可以设置 `margin-left: 180px` 来是对话框在文档中居中，而不是页面居中。**

<br>

<ks-button type="success" @click="handleCancelEventCustomMaskOffset">设置偏移</ks-button>

```javascript
this.$KsDialog.setDefaults({ containerStyle: 'margin-bottom: 500px' })
this.$KsDialog.success('成功!', null, true).then(function () {
  alert('clicked confirm!');
}, function () {
  alert('clicked canceled!');
})
```

<script>
  export default{
    data () {
      return {
        dialogShow: false
      }
    },
    
    methods: {
      handleConfirmEvent () {
        this.$KsDialog.success('成功!', function () {
          alert('clicked confirm!');
        })
      },
      
      handleConfirmEvent1 () {
        this.$KsDialog.success('成功!', '自定义标题', function () {
          alert('clicked confirm!');
        })
      },
      
      handleCancelEvent () {
        this.$KsDialog.success('成功!', null, true).then(function () {
          alert('clicked confirm!');
        }, function () {
          alert('clicked canceled!');
        })
      },
      
      handleCancelEventReject () {
        this.$KsDialog.success('成功!', null, true).then(function () {
          alert('clicked confirm!');
        }, function () {
          alert('clicked canceled!');
          
          return true;
        })
      },
      
      handleCancelEventCustomBtnText () {
        this.$KsDialog.setDefaults({ cancelBtnText: '自定义取消', confirmBtnText: '自定义确定' })
        this.$KsDialog.success('成功!', null, true).then(function () {
          alert('clicked confirm!');
        }, function () {
          alert('clicked canceled!');
        })
      },
      
      handleCancelEventCustomMaskBackground () {
        this.$KsDialog.setDefaults({ backgroundColor: 'rgba(44, 11, 187, .3)' })
        this.$KsDialog.success('成功!', null, true).then(function () {
          alert('clicked confirm!');
        }, function () {
          alert('clicked canceled!');
        })
      },
      
      handleCancelEventCustomMaskOffset () {
        this.$KsDialog.setDefaults({ containerStyle: 'margin-bottom: 500px' })
        this.$KsDialog.success('成功!', null, true).then(function () {
          alert('clicked confirm!');
        }, function () {
          alert('clicked canceled!');
        })
      },
      
      handleCancelEvent1 () {
        this.$KsDialog.success('成功!', null, true).then(null, function () {
          alert('clicked canceled!');
        })
      }
    }
  }
</script>

### API

#### KsDialogEntity

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| showCancelBtn | 用来描述 `KsDialog` 是否显示取消按钮 | props | Boolean | `false` | 否 | 无 | `false` |
| cancelBtnText | 用来描述当前 `KsDialog` 取消按钮的文字 | props | String | `false` | 否 | 无 | 取消 |
| confirmBtnText | 用来描述当前 `KsDialog` 确定按钮的文字 | props | String | `false`| 否 | 无 | 确定 |
| title | 用来描述当前 `KsDialog` 标题的文字 | props | String | `false` | 否 | 无 | 无 |
| text | 用来描述当前 `KsDialog` 内容的文字 | props | String | `false` | 否 | 无 | 无 |
| type | 用来描述当前 `KsDialog` 的类型 | props | String | `false` | 否 | `success`, `info`, `warn`, `danger` | `success` |
| show | 用来描述当前 `KsDialog` 是否显示 | props | Boolean | `true` | 是 | 无 | 无 |
| @confirm | `KsDialog` 确定按钮点击 事件 | event | - | - | 否 | - | - |
| @cancel | `KsDialog` 取消按钮点击 事件 | event | - | - | 否 | - | - |

#### $KsDialog (通过原型方法调用)

| 函数名 | 函数签名 | 函数描述 |
|------|-------|--------|
| success| `function success (text, title, cancel = false)` | 创建一个 `success` 类型的对话框 |
| info | `function info (text, title, cancel = false)` | 创建一个 `info` 类型的对话框 | 
| warn | `function warn (text, title, cancel = false)` | 创建一个 `warn` 类型的对话框 | 
| danger | `function danger (text, title, cancel = false)` | 创建一个 `danger` 类型的对话框 | 
| show | `function show (content, title, type, cancel = false, confirmCb = null, cancelCb = null)` | 显示一个对话框可以做更多的自定义 |
| setDefaults | `function setDefaults (options)` | 设置默认参数 |
| close | `function close ()` | 关闭当前显示的对话框并且显示下一个对话框，如果当前没有对话框那么就是显示对话框 |
