# 目录结构

> 简单描述，了解项目结构、关系

-------------

#### 组件目录结构
> 为了单独导出组件，要遵循一定的目录结构（方便在编译配置的时候找到相关目录）

> ##### 具体结构如下
```markdown
KsButton
  |—src
  |-style
  |-index.js
```
> 每个组件为一个文件夹(已Ks开头驼峰命名)
> 组件文件夹要有一个index.js 文件作为对外输出
```js
import KsButton from './src/Button.vue'
import KsNrButton from './src/NrButton.vue'
import KsGhostButton from './src/GhostButton.vue'

export {
  KsButton,
  KsNrButton,
  KsGhostButton
}
```

> src目录下 中为具体组件
> styles目录下 中为组件具体样式【引入公共样式方式如下，别忘了sass下的引入要加@哦】
> 组件中的css要加上组件前缀【例：KsPager 组件 css中的前缀为 .KsPager 。落实到具体节点css为 .KsPager-btn】
> 当然你也可以用 <a target="_blank" href="https://github.com/KS-FED/ks-autobem-loader">ks-autobem-loader</a> 去简化css和html模板书写


```scss
  @import '../../styles/base/creater/index';
  @import '../../styles/base/ref/index';
  @import '../../styles/common/icon-input';
```
>  组件文件夹下的index.js要导入到外层index.js 文件中，加以自测并完成文档
