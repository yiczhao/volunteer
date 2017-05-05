## Radio 单选框

> Checkbox 复选框组件
> 作者: pkeros(张杰)
> 最后修改时间: 2017-04-20

---

### 基础使用

#### 单选使用

<br>

> 组件使用方式和原生 `radio` 方式差不多，在使用时 `name` `model` `value` **必填属性**。

<br>

<ks-radio name="base-use" :model.sync="baseUse" value="bxx1">备选项1</ks-radio>
<ks-radio name="base-use" :model.sync="baseUse" value="bxx2">备选项2</ks-radio>
<ks-radio name="base-use" :model.sync="baseUse" value="bxx3">备选项3</ks-radio>

```html
<ks-radio name="base-use" :model.sync="baseUse" value="bxx1">备选项1</ks-radio>
<ks-radio name="base-use" :model.sync="baseUse" value="bxx2">备选项2</ks-radio>
<ks-radio name="base-use" :model.sync="baseUse" value="bxx3">备选项3</ks-radio>
```

#### Color 属性 （单选按钮颜色）

<br>

> 组件可以通过 `color` 属性来自定义单选按钮的颜色

<br>

<span class="mr20" style="color: #FFDD33">#FFDD33</span> <ks-radio color="#FFDD33" :model.sync="propsColor" value="bxx1" name="base-color">备选项1</ks-radio>
<span class="mr20" style="color: #CC00FF">#CC00FF</span> <ks-radio color="#CC00FF" :model.sync="propsColor" value="bxx2" name="base-color">备选项2</ks-radio>
<span class="mr20" style="color: #FFBBDD">#FFBBDD</span> <ks-radio color="#FFBBDD" :model.sync="propsColor" value="bxx3" name="base-color">备选项3</ks-radio>

```html
<ks-radio color="#FFDD33" :model.sync="propsColor" value="bxx1" name="base-color">备选项1</ks-radio>
<ks-radio color="#CC00FF" :model.sync="propsColor" value="bxx2" name="base-color">备选项2</ks-radio>
<ks-radio color="#FFBBDD" :model.sync="propsColor" value="bxx3" name="base-color">备选项3</ks-radio>
```

#### Disabled 属性 （禁用单选）

<br>

> 组件可以通过 `disable` 属性来禁用

<br>

<ks-switch class="mr20" :checked.sync="radioDisabled">
</ks-switch><ks-radio :disabled="radioDisabled" :model.sync="radioDisable" value="ghostBtn">幽灵按钮</ks-radio>

```html
<ks-switch class="mr20" :checked.sync="radioDisabled"></ks-switch>
<ks-radio :disabled="radioDisabled" :model.sync="radioDisable" value="ghostBtn">幽灵按钮</ks-radio>
```

#### DefChecked 属性 （默认选中）

<br>

> 组件可以通过 `defChecked` 属性来让某个 `radio` 默认选中

<br>

<ks-radio :model.sync="defC" :def-checked="true" value="defChecked">默认选中</ks-radio>

```html
<ks-radio :model.sync="defC" :def-checked="true" value="defChecked">默认选中</ks-radio>
```

#### 按钮形态的单选 （KsBtnRadio）

<br>

> 使用 `color` 属性可以设置 `radio` 颜色

<br>

<ks-btn-radio name="base-btn" color="#FFDD33" :model.sync="btnUse1" value="ZhangSan">张三</ks-btn-radio> <ks-btn-radio name="base-btn" color="#CC00FF" :model.sync="btnUse1" value="LiSi">李四</ks-btn-radio> <ks-btn-radio name="base-btn" color="#FFBBDD" :model.sync="btnUse1" value="WangWu">王五</ks-btn-radio>

<br>

```html
<!-- 通常使用 -->
<ks-btn-radio name="base-btn" color="#FFDD33" :model.sync="btnUse1" value="ZhangSan">张三</ks-btn-radio>
<ks-btn-radio name="base-btn" color="#CC00FF" :model.sync="btnUse1" value="LiSi">李四</ks-btn-radio>
<ks-btn-radio name="base-btn" color="#FFBBDD" :model.sync="btnUse1" value="WangWu">王五</ks-btn-radio>
```

<br>

> 使用 `defChecked` 可以默认选中张三

<br>

<ks-btn-radio name="base-btn" :model.sync="btnUse2" :def-checked="true" value="ZhangSan">张三</ks-btn-radio> <ks-btn-radio name="base-btn" :model.sync="btnUse2" value="LiSi">李四</ks-btn-radio> <ks-btn-radio name="base-btn" :model.sync="btnUse2" value="WangWu">王五</ks-btn-radio>

<br>

```html
<!-- 默认选中张三 -->
<ks-btn-radio name="base-btn" :model.sync="btnUse2" :def-checked="true" value="ZhangSan">张三</ks-btn-radio>
<ks-btn-radio name="base-btn" :model.sync="btnUse2" value="LiSi">李四</ks-btn-radio>
<ks-btn-radio name="base-btn" :model.sync="btnUse2" value="WangWu">王五</ks-btn-radio>
```

<br>

> 使用 `disabled` 属性可以警用某个单选

<br>

<ks-btn-radio name="base-btn" :model.sync="btnUse3" :disabled="true" value="ZhangSan">张三</ks-btn-radio> <ks-btn-radio name="base-btn" :model.sync="btnUse3" value="LiSi">李四</ks-btn-radio> <ks-btn-radio name="base-btn" :model.sync="btnUse3" value="WangWu">王五</ks-btn-radio>

<br>

```html
<!-- 禁用 -->
<ks-btn-radio name="base-btn" :model.sync="btnUse3" :disabled="true" value="ZhangSan">张三</ks-btn-radio>
<ks-btn-radio name="base-btn" :model.sync="btnUse3" value="LiSi">李四</ks-btn-radio>
<ks-btn-radio name="base-btn" :model.sync="btnUse3" value="WangWu">王五</ks-btn-radio>
```

#### 单选组 （KsRadioGroup）

<br>

> 在 `KsBtn-Radio` 组件外部包裹一个 `KsRadioGroup` 就可以形成一个按钮组

<br>

<ks-radio-group>
  <ks-btn-radio name="base-btn" :model.sync="group" value="ZhangSan">张三</ks-btn-radio>
  <ks-btn-radio name="base-btn" :model.sync="group" value="LiSi">李四</ks-btn-radio>
  <ks-btn-radio name="base-btn" :model.sync="group" value="WangWu">王五</ks-btn-radio>
</ks-radio-group>

<br>

```html
<!-- 单选组 -->
<ks-radio-group>
  <ks-btn-radio name="base-btn" :model.sync="group" value="ZhangSan">张三</ks-btn-radio>
  <ks-btn-radio name="base-btn" :model.sync="group" value="LiSi">李四</ks-btn-radio>
  <ks-btn-radio name="base-btn" :model.sync="group" value="WangWu">王五</ks-btn-radio>
</ks-radio-group>
```

<script>
  export default{
    data () {
      return {
        baseUse: '',
        propsColor: '',
        
        radioDisabled: false,
        radioDisable: '',
        
        defC: '',
        btnUse1: '',
        btnUse2: '',
        btnUse3: '',

        group: ''
      }
    }
  }
</script>

#### 高级使用

<br>

> 一样的 `KsRadio` 也有一个高度抽象的行为的组件 `KsRadioAbstract`。
> `KsCircleRadio` 也就我们使用时候的 `KsRadio` 是基于 `KsRadioAbstract` 来实现的。
> `KsBtnRadio` 也是基于 `KsRadioAbstract` 加上 `KsButtonAbstract` 组件来实现的。
> 🔘 **欢迎也鼓励你们通过继承封装行为的组件来实现千变万化的 `类 Radio` 组件。**

<br>


### API

#### KsRadio 与 KsBtnRadio

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| name | 用来标记当前 `radio` 的名称作用和原生 `radio` 一样 | props | String | `false` | 否 | 无 | '' |
| color | 用来描述 `radio` 的颜色, 一个十六进制的数值 | props | String | `false` | 否 | 无 | #00A5E0 |
| value | 保留 | props | Any | `false` | 否 | 无 | '' |
| defChecked | 用来描述当前 `radio` 默认是否选中 | props  | Boolean | `false` | 否 | `true`, `false` | `false` |
| disabled | 用来描述当前 `radio` 是否是禁用状态 | props | Boolean | `false`| `true`, `false` | 无 | `false` |
| model | 存储了当前 `radio` 组中选中的值 | props | Any | `true` | 否 | 无 | '' |

<br>

#### KsRadioGroup

| 参数 | 说明 | 接口类型 | 类型 | 双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|---------|---------|-------|--------|
| - | - | - | - | - | - | - | - |
