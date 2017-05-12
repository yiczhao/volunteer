/**
 * @description 用户设置接口
 * @author 赵俊涵
 * @date 2016.12.16
 */
function model(_this) {
    return {
        /**
         * @description 查询权限列表数据
         * @param
         * @returns {*}
         */
        getUserList (data) {
            return formDataRequest('./user/list').get(data)
        },
        /**
         * @description 查询添加的银行数据
         * @param
         * @returns {*}
         */
        getBankList (data) {
            return formDataRequest('./bank/bank_list').get(data)
        },
        /**
         * @description 查询添加的等级数据
         * @param
         * @returns {*}
         */
        getBanklevelList() {
            return formDataRequest('./bank/sub_bank_level_list').get()
        },
        /**
         * @description 查询添加的权限数据
         * @param
         * @returns {*}
         */
        getPrivilegesList() {
            return formDataRequest('./privilege/list').get()
        },
        /**
         * @description 确认添加
         * @param data
         * @returns {*}
         */
        addUser(data){
            return _this.$http.post('./user/add',data)
        },
        /**
         * @description 确认编辑
         * @param data
         * @returns {*}
         */
        editUser(data){
            return _this.$http.post('./user/edit',data)
        },
        /**
         * @description 查看详情
         * @param id
         * @returns {*}
         */
        getUserInfo(id) {
            return formDataRequest('./user/info/'+id).get()
        }
    }
}
module.exports = model