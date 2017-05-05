## Checkbox 复选框

> Checkbox 复选框组件
> 作者: pkeros(张杰)
> 最后修改时间: 2017-04-18

---

### 基础使用

#### 复选框的使用（KsCheckbox）

> 单选在使用时与原生 `Radio` 一样必须设置 `name` 属性, 只有相同名称的 `Radio` 才能形成单选

<br>

<ks-checkbox>备选项1</ks-checkbox>
<ks-checkbox>备选项2</ks-checkbox>
<ks-checkbox>备选项3</ks-checkbox>

```html
<ks-checkbox>备选项1</ks-checkbox>
<ks-checkbox>备选项2</ks-checkbox>
<ks-checkbox>备选项3</ks-checkbox>
```

#### 复选颜色

> 组件可以通过 `color` 属性来自定义颜色

<br>

<span class="mr20" style="color: #FFDD33">#FFDD33</span> <ks-checkbox color="#FFDD33">备选项1</ks-checkbox>
<span class="mr20" style="color: #CC00FF">#CC00FF</span> <ks-checkbox color="#CC00FF">备选项2</ks-checkbox>
<span class="mr20" style="color: #FFBBDD">#FFBBDD</span> <ks-checkbox color="#FFBBDD">备选项3</ks-checkbox>

```html
<span class="mr20" style="color: #FFDD33">#FFDD33</span> <ks-checkbox color="#FFDD33">备选项1</ks-checkbox>
<span class="mr20" style="color: #CC00FF">#CC00FF</span> <ks-checkbox color="#CC00FF">备选项2</ks-checkbox>
<span class="mr20" style="color: #FFBBDD">#FFBBDD</span> <ks-checkbox color="#FFBBDD">备选项3</ks-checkbox>
```

#### 复选禁用

> 组件可以通过 `disable` 属性来禁用

<br>

<ks-switch class="mr20" :checked.sync="checkboxDisable">
</ks-switch><ks-checkbox :disable="checkboxDisable">备选项</ks-checkbox>

```html
<ks-switch class="mr20" :checked.sync="checkboxDisable">
</ks-switch>
<ks-checkbox :disable="checkboxDisable">备选项</ks-checkbox>
```

#### 获取 Checkbox 的选中值 （KsRadioGroup）

> 如何获取 Checkbox 的选中值

<br>

<ks-checkbox-group :v-model.sync="checkboxGroup1">
  <ks-checkbox name="zhangSan">张三</ks-checkbox>
  <ks-checkbox name="liSi">李四</ks-checkbox>
  <ks-checkbox name="wangWu">王五</ks-checkbox>
</ks-checkbox-group>

<br>

<label v-text="checkboxGroup1 | json 4"></label>

<br>

> 通过外部包裹一个 `ks-checkbox-group` 绑定其 `vModel` 属性就可以监听到复选框组内部选中内容的变化。
> 同样的我们队 `vModel` 属性进行操作也会影响到内容 `ks-checkbox` 的选中状态。

```html
<ks-checkbox-group :v-model.sync="checkboxGroup1">
  <ks-checkbox name="zhangSan">张三</ks-checkbox>
  <ks-checkbox name="liSi">李四</ks-checkbox>
  <ks-checkbox name="wangWu">王五</ks-checkbox>
</ks-checkbox-group>

<label v-text="checkboxGroup1 | json 4"></label>
```

<ks-checkbox-group :v-model.sync="checkboxGroup2">
  <ks-checkbox name="zhangSan">张三</ks-checkbox>
  <ks-checkbox name="liSi">李四</ks-checkbox>
  <ks-checkbox name="wangWu">王五</ks-checkbox>
</ks-checkbox-group>

<br>

<button @click="checkboxGroup2.push('zhangSan')">checkboxGroup2.push('zhangSan')</button>
<button @click="checkboxGroup2.pop()">checkboxGroup2.pop()</button>

<br>

<label v-text="checkboxGroup2 | json 4"></label>

<br>

```html
<ks-checkbox-group :v-model.sync="checkboxGroup12">
  <ks-checkbox name="zhangSan">张三</ks-checkbox>
  <ks-checkbox name="liSi">李四</ks-checkbox>
  <ks-checkbox name="wangWu">王五</ks-checkbox>
</ks-checkbox-group>

<ks-button @click="checkboxGroup2.push('zhangSan')">checkboxGroup2.push('zhangSan')</ks-button>
<ks-button @click="checkboxGroup2.pop()">checkboxGroup2.pop()</ks-button>

<label v-text="checkboxGroup2 | json 4"></label>
```

<script>
  export default{
    data () {
      return {
        checkboxGroup1: [],
        checkboxGroup2: [],
        checkboxDisable: false
      }
    }
  }
</script>

### API

#### KsCheckbox

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| name | 用来标记当前 `KsCheckbox` 的名称作用和原生 `KsCheckbox` 一样 | props | String | `false` | 否 | 无 | '' |
| color | 用来描述 `KsCheckbox` 的颜色, 一个十六进制的数值 | props | String | `false` | 否 | 无 | #00A5E0 |
| checked | 用来描述当前 `KsCheckbox` 是否选中 | props | Boolean | `true` | 否 | `true`, `false` | `false` |
| disable | 用来描述当前 `KsCheckbox` 是否是禁用状态 | props | Boolean | `false`| `true`, `false` | 无 | `false` |
| @change | `KsCheckbox` change 事件 | event | - | - | 否 | - | - |
| @label-click | `KsCheckbox` 点击文字部分所发出的事件 | event | - | - | 否 | - | - |

<br>

#### KsRadioGroup

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| vModel | 存储了当前 `KsRadioGroup` 组中选中的值 | props | Any | `true` | 否 | 无 | '' |
| @change | `KsRadioGroup` change 事件 | event | - | - | 否 | - | - |
