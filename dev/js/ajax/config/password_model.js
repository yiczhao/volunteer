/**
 * @description 密码修改接口
 * @author 郑杰
 * @date 2016.12.21
 */
function model(_this) {
    return {
        /**
         * @description 图片验证码短信等
         * @param id
         * @returns {*}
         */
         getBankVerify(){
            return formDataRequest('./bank/verify_img').get()
         },
        /**
         * @description 查看详情
         * @param id
         * @returns {*}
         */
        getUserInfo(id) {
            return formDataRequest('./user/info/'+id).get()
        },
        /**
         * @description 查看详情
         * @param id
         * @returns {*}
         */
        sendMessage() {
            return _this.$http.post('./user/send_message_code')
        },
        /**
         * @description 查看详情
         * @param id
         * @returns {*}
         */
        verifyMessage(data) {
            return _this.$http.post('./user/verify_message_code',data)
        },
        /**
         * @description 查看详情
         * @param id
         * @returns {*}
         */
        updatePassword(data) {
            return _this.$http.post('./user/update_password',data)
        }
    }
}
module.exports = model