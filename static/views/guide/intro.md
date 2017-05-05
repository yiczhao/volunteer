# 简介

> 文档列出了KS前端常用`公共组件`
> 项目中内置的git`子模块`在min目录中，`npm run min`命令导出压缩的组件模块，供后台直出（前端非编译开发）模式使用

-------------

### 组件编写注意事项

> **为了完成增量更新，开发时要注意添加VERSION属性**
> 打包后会输出相应版本的文件，如果打包⬇️

```js
export default {
    VERSION:'1.0.0',
    data(){

    }
    [,...]

}
```


### 组件输出打包

```js
// 全量打包
npm run min 

// 指定组件打包
npm run min -a KsDatePicker

// 指定多个组件打包
npm run min -a KsDatePicker KsPage
```



> #### 在min目录下生成ks目录 ,此目录下会生成相应独立的组件、指令、过滤器
> 【以上单独导出组件要符合一定的目录结构，具体在 <a v-link="{name:'dir'}" title="">目录结构</a> 查看】

<br>

### 组件使用（全局注册）

```javascript
import { myModule } from './modulePath';

Vue.component('myModule', myModule);
```

### 组件使用（局部注册）
```javascript
import { myModule } from './modulePath';

export default {
  ...
  components:{
      myModule
  }    
  ...
}
```
