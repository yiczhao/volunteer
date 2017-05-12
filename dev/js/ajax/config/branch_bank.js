/**
 * Created by Administrator on 17/01/03.
 */

function model(_this){
	return {
		/**
		 * @description 分支行列表
		 * @param
		 * @returns {*}
		 */
		getBranchBankList(data){
			return formDataRequest('./bank/bank_list').get(data)
		},
		getBankLevelList() {
			return formDataRequest('./bank/sub_bank_level_list').get()
		},
		addSubmit(data){
			return _this.$http.post('./bank/add',data);
		},
		editSubmit(data){
			return _this.$http.post('./bank/edit',data);
		}

	}
}
module.exports = model;
