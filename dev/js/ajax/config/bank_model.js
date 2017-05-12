/**
 * @description 银行基本设置接口
 * @author 赵俊涵
 * @date 2016.12.16
 */
function model(_this) {
    return {
        /**
         * @description 查询基本数据
         * @param data
         * @returns {*}
         */
        getBankList () {
            return formDataRequest('./bank/info').get()
        },
        /**
         * @description 保存基本设置
         * @param data
         * @returns {*}
         */
        saveBank (data) {
            return _this.$http.post('./bank/save',data)
        },
    }
}
module.exports = model