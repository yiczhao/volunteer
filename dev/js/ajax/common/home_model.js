/**
 * @description 活动分析接口
 * @author 郑杰
 * @date 2016.12.29
 */
function model(_this) {
 	return {
 		/**
         * @description 交易数据分析获取某个时间段的交易总金额集合
         * @param id
         * @returns {*}
         */
         getUserTotal(){
         	return formDataRequest('./userTotal').get()
         },
          /**
         * @description 获取商户交易笔数排行
         * @param id
         * @returns {*}
         */
         getUserTop(){
         	return formDataRequest('./userTop').get()
         }
	}
}
 module.exports = model