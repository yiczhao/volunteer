/**
 * [phone格式 过滤]
 * @param  {[type]} input     [输入值]
 */
export default function (str){
	if (!str) {
		return ''
	}
	var reg = /^(\d{4})\d+(\d{4})$/;
		str = str.replace(reg, "$1****$2");
	return  str
}
