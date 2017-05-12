/**
 * [phone格式 过滤]
 * @param  {[type]} input     [输入值]
 */
export default function (str){
	if (!str||str.length<8) {
		return str
	}
	// return  val.replace(/(\d{3})\d{4}(\d{4})/,"$1*****$3")
	// return  val.replace(/(\d{3})(\d{5})(\d{3})/,"$1*****$3")
	var reg = /^(\d{4})\d+(\d{4})$/;
		str = str.replace(reg, "$1****$2");
	return  str
}
