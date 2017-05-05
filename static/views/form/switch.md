## Switch 开关组件

> 表示两种相互对立的状态间的切换，多用于触发「开/关」。

---

### 基础使用

#### 开关组件的基础使用（KsSwitch）

<br>

<ks-switch class="mr20"></ks-switch><ks-switch color="#AABBCC" size="large">
  <span slot="checkedChildren">开</span>
  <span slot="unCheckedChildren">关</span>
</ks-switch>

```html
<ks-switch class="mr20"></ks-switch>
<ks-switch color="#CC00FF" size="large">
  <span slot="checkedChildren">开</span>
  <span slot="unCheckedChildren">关</span>
</ks-switch>
```

#### 开关颜色

> 组件可以通过 `color` 属性来自定义颜色

<br>

<span class="mr20" style="color: #FFDD33">#FFDD33</span> <ks-switch color="#FFDD33"></ks-switch>
<span class="mr20" style="color: #CC00FF">#CC00FF</span> <ks-switch color="#CC00FF"></ks-switch>
<span class="mr20" style="color: #FFBBDD">#FFBBDD</span> <ks-switch color="#FFBBDD"></ks-switch>

```html
<span class="mr20" style="color: #FFDD33">#FFDD33</span> <ks-switch color="#FFDD33"></ks-switch>
<span class="mr20" style="color: #CC00FF">#CC00FF</span> <ks-switch color="#CC00FF"></ks-switch>
<span class="mr20" style="color: #FFBBDD">#FFBBDD</span> <ks-switch color="#FFBBDD"></ks-switch>
```

#### 开关禁用

> 组件可以通过 `disable` 属性来禁用

<br>

<ks-switch class="mr20" :checked.sync="switchDisable">
</ks-switch><ks-switch :disable="switchDisable"></ks-switch>

```html
<ks-switch class="mr20" :checked.sync="switchDisable">
</ks-switch>
<ks-switch :disable="switchDisable"></ks-switch>
```

#### 抽象的 Switch 组件 (AbstractSwitch)

> 高度抽象的 switch 组件

<br>

<ks-abstract-switch :width="120" :height="30"
  :status-mapper="statusMapper" :status.sync="status"></ks-abstract-switch>

```html
<ks-abstract-switch :width="120" :height="30"
  :status-mapper="statusMapper" :status.sync="status">
  <!-- 在此处的内容会在滑动槽中间显示 与 text 属性效果一样, 不过这边定制程度更高一点。 -->
</ks-abstract-switch>
```

> `AbstractSwitch` 组件可以自定义 高度, 宽度, 每个状态下都有对应的 slide 颜色 dot 颜色 font 颜色
> font 大小 以及 text 内容设置

<script>
  let statusMapper = {
     off: {slideColor: '#FFF', dotColor: '#FFF', fontColor: '#E1E1E1', fontSize: '14', text: 'OFF'},
     on: {slideColor: '#55C45A', dotColor: '#FFF', fontColor: '#FFF', fontSize: '16', text: 'ON'}
   };
  
  export default{
    data () {
      return {
        statusMapper,
        status: 'off',
        
        switchDisable: false
      }
    }
  }
</script>

### 脚本

```html
<script>
  let statusMapper = {
     off: {slideColor: '#FFF', dotColor: '#FFF', fontColor: '#E1E1E1', fontSize: '14', text: 'OFF'},
     on: {slideColor: '#55C45A', dotColor: '#FFF', fontColor: '#FFF', fontSize: '16', text: 'ON'}
   };
  
  export default{
    data () {
      return {
        statusMapper,
        status: 'off',
        
        switchDisable: false
      }
    }
  }
</script>
```

### API

<br>

#### KsSwitch

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| color | 用来描述 `KsSwitch` 的颜色, 一个十六进制的数值 | props | String | `false` | 否 | 无 | #04BE02 |
| size | 用来描述当前 `KsSwitch` 大小 | props | String | `false` | 否 | `normal`, `small`, `mini`, `large` | `false` |
| checked | 用来描述当前 `KsSwitch` 是否选中 | props | Boolean | `true`| 否 | 无 | `false` |
| disable | `KsCheckbox` 是否是禁用状态 | props | Boolean | `false` | 否 | 无 | `false` |

#### KsAbstractSwitch

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| statusMapper | 开关状态对应的显示状态 | props | Object | `false` | 是 | 无 | - |
| status | 当前组件的状态 | props | String | `true` | 是 | 无 | - |
| width | 当前组件的宽度 | props | Number | `false` | 是 | 无 | - |
| height | 当前组件的高度 | props | Number | `false`| 是 | 无 | - |

#### statusMapper （KsAbstractSwitch 的 statusMapper 参数）

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| slideColor | 滑槽颜色 | props | String | - | 是 | 无 | - |
| dotColor | 点颜色 | props | String | - | 是 | 无 | - |
| fontColor | 字体颜色 | props | String | - | 是 | 无 | - |
| fontSize | 字体大小 | props | Number | - | 是 | 无 | - |
| text | 显示文字 | props | String | -| 是 | 无 | - |

