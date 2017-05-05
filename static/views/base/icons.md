## Icon 图标 [卡说图标库](#!/base/icons-list)


> Icon 图标组件
> 作者: pkeros(张杰)
> 最后修改时间: 2017-04-12

---

### 基础使用

#### - 图标的使用
<br>


<ks-icon name="camera-retro" library="fa"></ks-icon> <ks-icon name="bandcamp" library="fa"></ks-icon> <ks-icon name="circle-o" library="fa"></ks-icon>

```html
<ks-icon name="camera-retro" library="fa"></ks-icon>
<ks-icon name="bandcamp" library="fa"></ks-icon>
<ks-icon name="circle-o" library="fa"></ks-icon>

```

上面列举了几种图标，`library="fa"` 模式采用的 `font-awesome` 的图标字体库。
[font-awesome 图标列表](http://fontawesome.io/icons/), 此处的链接就是 `font-asesome`。

![name 参数对应在图标列表中的位置](http://chuantu.biz/t5/63/1491985624x2890174454.png)

图中红色框框所标出的就是需要填入 `name` 属性名字。

<br>

#### - 设置图标的颜色
<br>


<ks-icon name="camera-retro" style="color: #FF00FF" library="fa"></ks-icon>

```html
<ks-icon name="camera-retro" style="color: #FF00FF" library="fa"></ks-icon>
```

直接使用设置文字的方式就可以了设置颜色了。

<br>

<span style="color: #FF00FF">
  <ks-icon name="camera-retro" library="fa"></ks-icon>
</span>
<span style="color: #00FF00">
  <ks-icon name="bandcamp" library="fa"></ks-icon>
</span>
<span style="color: #FFAA11">
  <ks-icon name="circle-o" library="fa"></ks-icon>
</span>

```html
<span style="color: #FF00FF">
  <ks-icon name="camera-retro" library="fa"></ks-icon>
</span>
<span style="color: #00FF00">
  <ks-icon name="bandcamp" library="fa"></ks-icon>
</span>
<span style="color: #FFAA11">
  <ks-icon name="circle-o" library="fa"></ks-icon>
</span>
```

直接使用 `color` 参数就可以设置图标的颜色了。
 
<br>

#### - 设置图标大小
<br>


<ks-icon name="camera-retro" size="2x" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="3x" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="4x" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="5x" library="fa"></ks-icon>

<ks-icon name="bandcamp" size="20px" library="fa"></ks-icon>
<ks-icon name="circle-o" size="4em" library="fa"></ks-icon>

```html
<ks-icon name="camera-retro" size="2x" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="3x" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="4x" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="5x" library="fa"></ks-icon>

<ks-icon name="bandcamp" size="20px" library="fa"></ks-icon>
<ks-icon name="circle-o" size="4em" library="fa"></ks-icon>

```

`size` 参数就除了可以设置 `2x`, `3x`, `4x`, `5x` 还可以设置任何有效的 css 单位。

<br>

#### - 设置旋转角度
<br>


<ks-icon name="camera-retro" size="4x" rotate="90" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="4x" rotate="180" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="4x" rotate="270" library="fa"></ks-icon>

```html
<ks-icon name="camera-retro" size="4x" rotate="90" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="4x" rotate="180" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="4x" rotate="270" library="fa"></ks-icon>

```

可以通过 `rotate` 来设置图标的旋转角度，预置的有 `90`, `180`, `270` 几个值。

#### - 图标旋转动画


<ks-icon name="camera-retro" size="4x" animate="spin" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="4x" animate="pulse" library="fa"></ks-icon>

```html
<ks-icon name="camera-retro" size="4x" animate="spin" library="fa"></ks-icon>
<ks-icon name="camera-retro" size="4x" animate="pulse" library="fa"></ks-icon>

```

可以通过 `animate` 来设置图标的旋转动画，预置的 `spin`, `pulse` 两个值。

### API

#### Icon (图标组件)

| 参数 | 说明 | 接口类型 | 类型 |  双向（twoWay） | 是否必须 | 可选值 | 默认值 |
|------|-------|----------|---------|-------|---------|-------|--------|
| library | 需要引用的图标库 | props | String | `false` | 否 | `ks`, `fd` | **ks** |
| name | 需要引用的图标 | props | String | `false` | 是 |  - | - |
| size | 图标大小 | props | String | `false` | 否 | `2x`, `3x`, `4x`, `5x` | `13px` |
| rotate | 图标旋转角度 | props  | String | `false` | 否 | `90`, `180`, `270` | `0` | 
| animate | 图标动画类型 | props | String | `false` | 否 | `spin`, `pulse` | `stop` |
