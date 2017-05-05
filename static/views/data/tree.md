# 树

---
<fold-tree :node="company" :config="{text: 'channelName', children: 'nodes'}" @node-clicked="console">
</fold-tree>

---
<abstract-tree :node="company" :config="{text: 'channelName', children: 'nodes'}" @node-clicked="console"></abstract-tree>

---
<checked-tree :node="company" :config="{text: 'channelName', children: 'nodes'}" @node-clicked="console"></checked-tree>

___

<script>
  import { company } from 'Data/tree-data'
  import { AbstractTree } from 'KsComponents/KsTree'
  import { FoldTree } from 'KsComponents/KsTree'
  import { CheckedTree } from 'KsComponents/KsTree'
  
  export default{
    data () {
      return {
        company
      }
    },
    
    methods: {
      console () { console.log(arguments) }
    },
    
    components: { 
      FoldTree,
      CheckedTree,
      AbstractTree   
    }
  }
</script>

### 脚本

```html
<script>
  import { company } from 'Data/tree-data'
  import { AbstractTree } from 'KsComponents/KsTree'
  import { FoldTree } from 'KsComponents/KsTree'
  import { CheckedTree } from 'KsComponents/KsTree'
  
  export default{
    data () {
      return {
        company
      }
    },
    
    methods: {
      console () { console.log(arguments) }
    },
    
    components: { 
      FoldTree,
      CheckedTree,
      AbstractTree   
    }
  }
</script>
```
