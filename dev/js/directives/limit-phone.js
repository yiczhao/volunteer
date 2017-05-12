/**
 * author zjh
 *
 */
export default {
	twoWay: true,
	bind: function () {
		this.handler = function () {
			// 将数据写回 vm
			// 如果指令这样绑定 v-example="a.b.c"
			// 它将用给定值设置 `vm.a.b.c`
			let num=this.el.value.replace(/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,'');
			this.el.value = num;
			this.set(num)
		}.bind(this)
		this.el.addEventListener('keyup', this.handler)
	}
}