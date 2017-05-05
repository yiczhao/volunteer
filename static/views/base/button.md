# Button 按钮

> Button 按钮组件
> 作者: pkeros(张杰)
> 最后修改时间: 2017-04-17

---

### 基础使用

#### Type 属性 （按钮类型）

<br>

> 通过 `type` 属性我们可以设置不同类型的按钮，预置的按钮类型有 `primary`, `success`, `info`, `warn`, `danger`, `other`。

<br>

<select class="mr20" name="btnType" v-model="btnType">
  <option v-for="type in btnTypeMapper" :value="type" v-text="type"></option>
</select><ks-button :type="btnType">按钮类型</ks-button>

```html
<ks-button type="primary">按钮类型</ks-button>
```

#### Size 属性 （按钮尺寸）

<br>

> 通过 `size` 属性我们可以设置不同按钮尺寸，预置的值有 `mini`, `normal`, `middle`, `large`。

<br>

<select class="mr20" name="btnSize" v-model="btnSize">
  <option v-for="size in btnSizeMapper" :value="size" v-text="size"></option>
</select><ks-button :size="btnSize">按钮大小</ks-button>

```html
<ks-button type="normal">按钮类型</ks-button>
```

#### Mode 属性 （正常/幽灵 按钮）

<br>

> 通过 `mode` 设置值为 `ghost` 可以将按钮变成幽灵按钮模式。 

<br>

<ks-button mode="ghost">幽灵按钮</ks-button>

```html
<ks-button mode="ghost">幽灵按钮</ks-button>
```

#### Loading 属性 （按钮是否处于等待状态）

> 通过将 `loading` 设置为 `ture` 我们可以将按钮的状态设置为加载。

<br>

<ks-switch class="mr20" :checked.sync="btnSwitch"></ks-switch><ks-button :loading="btnSwitch">幽灵按钮</ks-button> <ks-button :loading="btnSwitch" mode="ghost">幽灵加载按钮</ks-button>

```html
<ks-button :loading="btnSwitch">加载按钮</ks-button>
<ks-button :loading="btnSwitch" mode="ghost">幽灵加载按钮</ks-button>
```

#### Disabled 属性 （按钮是否处于禁用状态）

> 通过将 `disabled` 设置为 `ture` 我们可以将按钮的状态设置为禁用。

<br>

<ks-switch class="mr20" :checked.sync="btnDisable"></ks-switch><ks-button :disabled="btnDisable">按钮禁用</ks-button> <ks-button :disabled="btnDisable" mode="ghost">幽灵按钮禁用</ks-button>

```html
<ks-button :disabled="btnDisable">按钮禁用</ks-button>
<ks-button :disabled="btnDisable" mode="ghost">幽灵按钮禁用</ks-button>
```

#### 事件绑定 

> 通过 `@click`, `v-on:click` 等 `vue` 支持的事件绑定式就可以绑定处理相关事件。禁用之后不再产生 `click` 事件。

<br>

<ks-switch class="mr20" :checked.sync="btnEventDisable"></ks-switch><ks-button :disabled="btnEventDisable" @click="clickTest">按钮禁用</ks-button>

```html
<ks-button :disabled="btnEventDisable" @click="clickTest">按钮禁用</ks-button>
```

#### 高级使用 使用抽象的按钮组件来实现一个自定义的按钮

> 上面的我们简述了一些 `KsButton` 一些常用的属性。默认按钮的风格样式设计是根据设计原型里的标准。
> 可以满足大部分需求单不排除有一些定制话的需求，亦或我们需要拓展出一些组件。
> 下面介绍如何使用 `ks-button-abstract` 组件自定义实现一个 `button`, `ks-button` 内部也是使用 `ks-button-abstract` 实现的。

<br>

##### 1. 自定义按钮主题颜色

<br>

> 我们可以使用 `ks-button-abstract` 提供的 `width`，`height`， `fontSize`， `colorNormal`， `colorHover`， `colorActive` 接口
> 来自定义按钮的宽度，高度，字体大小，等外观。

<br>

<ks-button-abstract width="66px" height="66px" font-size="22px" 
                    color-normal="#AACD21" color-hover="#A3421A"
                    color-active="#D23D21">TEST</ks-button-abstract>

```html
<ks-button-abstract width="66px" height="66px" font-size="22px" 
                    color-normal="#AACD21" color-hover="#A3421A"
                    color-active="#D23D21">TEST</ks-button-abstract>
```

<br>

> 在上面的代码中我们就通过一些列的属性设置自定义了一个按钮，当然的这是 `mode='normal'` 类型的按钮，如果我们需要一个幽灵按钮
> 只要把 `mode` 属性设置为 `ghost` 就可以了。按钮默认都是有个 `padding: 3px 18px` 的值这是设计规范所规定。

<br>

##### 2. 完全自定义样式

<br>

> 在有的情况下我们可能需要完全自定义样式，那么我们就只能通过重写样式这种方式来实现，比如我们要是一线一个圆形按钮
> 建议有这种需求的时候新增一个组件，继承 `ks-button-abstract` 来实现，一并提交到公共样式库中。

<br>

<style>
  .round-button .KsBtnAbstract { border-radius: 50%; padding: 0 }
</style>

<div class="round-button">
  <ks-button-abstract width="66px" height="66px" font-size="14px" 
                      color-normal="#AACD21" color-hover="#A3421A"
                      color-active="#D23D21">TEST</ks-button-abstract>
</div>

```html
<style>
  .round-button .KsBtnAbstract { border-radius: 50%; padding: 0 }
</style>

<div class="round-button">
  <ks-button-abstract width="66px" height="66px" font-size="14px" 
                      color-normal="#AACD21" color-hover="#A3421A"
                      color-active="#D23D21">TEST</ks-button-abstract>
</div>
```

<script>
  let btnTypeMapper = [
    'primary',
    'success',
    'info',
    'warn',
    'danger',
    'other'
  ];
  
  let btnSizeMapper = [
    'small',
    'normal',
    'middle',
    'large'
  ];

  export default{
    data () {
      return {
        btnTypeMapper,
        btnSizeMapper,
        
        btnSwitch: false,
        btnDisable: false,
        btnEventDisable: false,
        btnType: 'primary',
        btnSize: 'normal'
      }
    },
    
    methods: {
      clickTest () { alert('click me!') }
    }
  }
</script>

### API

#### KsButton

| 参数 | 说明 | 接口类型 | 类型 |  双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|-------|---------|-------|--------|
| mode | 用来描述按钮的模式 正常/幽灵 | props  | String | `false` | 否 | `normal`, `ghost` | `normal` |
| form | 原生属性 `form` | props  | String | `false` | 否 | - | - |
| autoFocus | 原生属性 `autofocus` | props  | Boolean | `false` | 否 | - | `false` |
| name | 原生属性 `name` | props  | String | `false` | 否 | - | `KSButton` |
| nativeType | 用来描述按钮原生类型 | props | String | `false` | 否 | - | `button` |
| disabled | 用来描述按钮是禁用 | props  | Boolean | `false` | 否 | `true`, `false` | `false` |
| type | 用来描述按钮的类型 | props | String | `false` | 否 | `primary`, `success`, `info`, `warn`, `danger`, `other`| `primary` |
| size | 用来描述按钮的大小 | props | String | `false` | 否 | `small`, `normal`, `middle`, `large` | `normal` |
| loading | 同步属性，用来控制按钮是否是加载状态 | props | Boolean | `false` | 否 | - | - |

#### KsButtonAbstract

| 参数 | 说明 | 接口类型 | 类型 |  双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|-------|---------|-------|--------|
| mode | 用来描述按钮的模式 正常/幽灵 | props  | String | `false` | 否 | `normal`, `ghost` | `normal` |
| form | 原生属性 `form` | props  | String | `false` | 否 | - | - |
| autoFocus | 原生属性 `autofocus` | props  | Boolean | `false` | 否 | - | `false` |
| name | 原生属性 `name` | props  | String | `false` | 否 | - | `KSButton` |
| nativeType | 用来描述按钮原生类型 | props | String | `false` | 否 | - | `button` |
| disabled | 用来描述按钮是禁用 | props  | Boolean | `false` | 否 | `true`, `false` | `false` |
| fontSize | 用来描述按钮内文字大小 | props | Number | `false` | 是 | - | - |
| truth | 是否是用 `button` 元素实现按钮，设置为 `false` 使用 `a` 标签实现按钮，原生关于 `button` 的属性不可用 | props | Boolean | `false` | 否 | - | `true` |
| width | 用来描述按钮的宽度 | props | Number | `false` | 是 | - | - |
| height | 用来描述按钮的高度 | props | Number | `false` | 是 | - | - |
| colorNormal | 用来描述按钮 normal （默认） 时的颜色, 十六进制颜色值 | props | String | `false` | 是 | - | - |
| colorHover | 用来描述按钮 hover （鼠标悬浮） 时的颜色, 十六进制颜色值 | props | String | `false` | 是 | - | - |
| colorActive | 用来描述按钮 active （按钮按下） 是的颜色, 十六进制颜色值 | props | String | `false` | 是 | - | - |
