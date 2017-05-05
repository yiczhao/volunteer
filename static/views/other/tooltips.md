### ToolTips

> 一个悬浮的弹出提示


<ks-tool-tips content="我是内容哈哈哈哈哈哈哈">
  <h3 style="text-align: center">测试</h3>
</ks-tool-tips>

<ks-tips
    placement="bottom-start" 
    :show.sync = "show">
    <span  class="tiptxt">性别</span>
    <div slot="content" >
        <div :style="{width:width + 'px'}">
            <h3>请选择性别</h3>
        </div>
    </div>
</ks-tips>

```html
<ks-tool-tips content="我是内容哈哈哈哈哈哈哈">
  <h3>测试</h3>
</ks-tool-tips>

```

<script>
  export default{
    data () {

      return {
        show:false,
        width:500
      }

    }    
  }
</script>
