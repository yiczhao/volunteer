## Fuzzy Search

> 模糊搜索

---
>> 调用模糊搜索组件的文件内部信息显示：
>> 当前结果集查询的关键词 -- {{keywords}}
>> 提交选中item的名称 -- {{dataName}}
>> 提交选中item的id -- {{dataId}}
---
{{keywords}}{{keywords}}
<ks-search 
	:fuzzydata.sync="dataList"
	:resultattr="'id'"
	@actionSearch="actionSearch"
	@actionSelect="actionSelect">
</ks-search>


```html
<ks-search 
	:fuzzydata.sync="dataList"
	:resultattr="'id'"
	@actionSearch="actionSearch"
	@actionSelect="actionSelect">
</ks-search>
```

### API
| 参数 | 说明 | 接口类型 | 类型 | 可选值 | 默认值 |
|------|-------|----------|---------|-------|--------|
| disabled | 禁用搜索框 | props | Boolean | `非必填` | `false`  |
| placeholder | input placeholder | props | String | `非必填` | `输入关键词搜索` |
| fuzzydata | 搜索结果集 | props | Array | `必填` | 无 |
| resultattr | 提交后台字段 | props  | String | `非必填` | `key` |
| datalabel | 显示名称字段 | props  | String | `非必填` | `label` |
| debounce | 重新调用接口间隔 | props  | Number | `非必填` | `500` |
| actionSearch | 查找结果集 | props  | Function | `必填` | 无 |
| actionSelect | 选择某个搜索结果 | props  | Function | `必填` | 无 |


<script>
	export default {
		data () {
			return {
				dataList: [],
				keywords: '',
				dataName: '', // 名称
				dataId: ''  // 该字段提交给后台
			}
		},
		methods: {
			actionSearch (keywords) {

				// keywords为带入后台查询的参数
				this.keywords = keywords

				// 实际场景中在这里调用接口 动态改变dataList
				this.dataList =  [
			        {id: 1, label: 'aaaa'},
			        {id: 2, label: 'bbbb'},
			        {id: 3, label: 'cccc'},
			        {id: 4, label: 'dddd'},
			        {id: 5, label: 'eeee'},
			        {id: 6, label: 'ffff'},
			        {id: 7, label: 'gggg'},
			        {id: 5, label: 'hhhh'},
			        {id: 8, label: 'iiii'},
			        {id: 9, label: 'jjjj'},
			        {id: 10, label: 'kkkk'},
			        {id: 11, label: 'llll'},
			        {id: 12, label: 'mmmm'},
			        {id: 13, label: 'nnnn'},
			        {id: 14, label: 'oooo'}
			    ]
			},
			actionSelect (dataId, dataName) {

				// dataId是选中项的关键属性，与resultattr有关
				// 传入的resultattr是'id'时，dataId就是对应选中项的id属性
				// dataName是选中项的名称
				this.dataId = dataId
				this.dataName = dataName
			}
		}
	}
</script>


```javascript
<script>
	export default {
		data () {
			return {
				dataList: [],
				keywords: '',
				dataName: '', // 名称
				dataId: ''  // 该字段提交给后台
			}
		},
		methods: {
			actionSearch (keywords) {

				// keywords为带入后台查询的参数
				this.keywords = keywords

				// 实际场景中在这里调用接口 动态改变dataList
				this.dataList =  [
			        {id: 1, label: 'aaaa'},
			        {id: 2, label: 'bbbb'},
			        {id: 3, label: 'cccc'},
			        {id: 4, label: 'dddd'},
			        {id: 5, label: 'eeee'},
			        {id: 6, label: 'ffff'},
			        {id: 7, label: 'gggg'},
			        {id: 5, label: 'hhhh'},
			        {id: 8, label: 'iiii'},
			        {id: 9, label: 'jjjj'},
			        {id: 10, label: 'kkkk'},
			        {id: 11, label: 'llll'},
			        {id: 12, label: 'mmmm'},
			        {id: 13, label: 'nnnn'},
			        {id: 14, label: 'oooo'}
			    ]
			},
			actionSelect (dataId, dataName) {

				// dataId是选中项的关键属性，与resultattr有关
				// 传入的resultattr是'id'时，dataId就是对应选中项的id属性
				// dataName是选中项的名称
				this.dataId = dataId
				this.dataName = dataName
			}
		}
	}
</script>
```