<template>
    <div class="branch-bank">
        <div class="form-row">
            <a class="btn btn-info" @click="addBank" v-if="currentLevel != 3 && currentLevel != 4">新增分支行</a>
        </div>
        <div class="table">
            <table>
                <tr>
                    <th>序号</th>
                    <th>分支行名称</th>
                    <th>行政级别</th>
                    <th>创建时间</th>
                    <th>创建人</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                <tr v-show="!!bankList" v-for="n in bankList">
                    <td>{{$index+1}}</td>
                    <td>{{n.shortName }}</td>
                    <td>
                        <template v-if="n.level ==1">一级分行</template>
                        <template v-if="n.level ==2">二级分行</template>
                        <template v-if="n.level ==3">信用卡部</template>
                        <template v-if="n.level ==4">营业部</template>
                    </td>
                    <td>{{n.createTime | datetime}}</td>
                    <td>{{n.createName}}
                    </td>
                    <td>
                        <template v-if="n.status">启用</template>
                        <template v-else>禁用</template>
                    </td>
                    <td>
                        <template v-if="n.editable && currentLevel != n.level">
                            <a @click="editBank(n)">编辑</a>
                        </template>
                        <template v-else>
                            <span class="color999">编辑</span>
                        </template>
                    </td>
                </tr>
            </table>
            <pagegroup
                    :total="objectTotalNumber"
                    :page_size.sync="defaultData.pageSize"
                    :page_current.sync="defaultData.pageIndex"
                    v-on:current_change="getList"
                    v-on:size_change="getList"
            ></pagegroup>
        </div>
        <content-dialog :is-cancel="true"
                :show.sync="show" :type.sync="'infos'"
                :title.sync="title" :is-button="false"
        >
            <div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>上级名称</label>
                    <span class="span" v-text="addList.currentName"></span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>分支行名称</label>
                    <input type="text" class="input" v-model="addList.shortName" placeholder=" 请输入银行名称">
                </div>
                <div class="form-group" v-if="title == '新增分支行'">
                    <label class="name-left"><i>*</i>行政级别</label>
                    <select v-model="addList.level" class="select">
                        <option v-for="(index,n) in bankLevelList" :value="n">
                            <template v-if="n==1">一级分行</template>
                            <template v-if="n==2">二级分行</template>
                            <template v-if="n==3">信用卡部</template>
                            <template v-if="n==4">营业部</template>
                        </option>
                    </select>
                </div>
                <div class="form-group" v-else>
                    <label class="name-left"><i>*</i>行政级别</label>
                    <span class="span">
                        <template v-if="addList.level==1">一级分行</template>
                        <template v-if="addList.level==2">二级分行</template>
                        <template v-if="addList.level==3">信用卡部</template>
                        <template v-if="addList.level==4">营业部</template>
                    </span>
                </div>
                <div class="form-group">
                    <label class="name-left"><i>*</i>状态</label>
                    <ks-radio :checked.sync="addList.status" :value="'false'" name="TEST1">禁用</ks-radio>
                    <ks-radio :checked.sync="addList.status" :value="'true'" name="TEST1">启用</ks-radio>
                </div>
	            <div class="kdialog__btnwrap">
			        <div class="kbutton kbutton-container r" style="width: 90px;margin-left: 5px;">
						<button class="kbutton-entity primary input-size-xl" type="button" @click="addSubmit" v-if="title=='新增分支行'">提交</button>
						<button class="kbutton-entity primary input-size-xl" type="button" @click="editSubmit" v-if="title=='编辑分支行'">提交</button>
					</div>
			        <div class="kbutton kbutton-container r" style="width: 90px;">
						<button class="kbutton-entity dark-ghost input-size-xl" type="button" @click="cancel">取消</button>
					</div>
			    </div>
            </div>
        </content-dialog>
    </div>
</template>
<script>
	import model from '../../ajax/config/branch_bank'
	export default{
		data(){
			this.model = model(this);
			return {
				defaultData: {
					pageIndex: 1,
					pageSize: 10,
				},
				title: '',
				bankList: [],
				bankLevelList: [],
				objectTotalNumber: 1,
				show: false,
				currentLevel: '',
				addList: {
					shortName: '',
					status: 'true',
					parentID: '',
					currentName: '',
					level: '',
					id: ''
				}
			}
		},
		methods: {
			getList(){
				this.model.getBranchBankList(this.defaultData).then((res) => {
					if (res.data.code === 0) {
						this.$set('bankList', res.data.dataList);
						this.$set('objectTotalNumber', res.data.objectotalNumber);
					}
				})
			},
			getBankLevelList(){
				this.model.getBankLevelList().then((res) => {
					if (res.data.code === 0) {
						this.$set('bankLevelList', res.data.dataList);
						if (!this.bankLevelList[0]) {
							this.addList.level = null;
						}
						this.addList.level = '' + this.bankLevelList[0];
					}
				});
			},
			addBank(){
				this.addList = {
					parentID: JSON.parse(sessionStorage.getItem('loginList')).bamsBankId,
					currentName: JSON.parse(sessionStorage.getItem('loginList')).bankName,
					shortName: '',
					status: 'true'
				};
				this.getBankLevelList();
//                this.parentID: JSON.parse(sessionStorage.getItem('loginList')).bamsBankId;
//                this.currentName: JSON.parse(sessionStorage.getItem('loginList')).bankName;
				this.title = '新增分支行';
				this.show = true;
			},
			editBank(n){
				this.addList = {
					parentID: JSON.parse(sessionStorage.getItem('loginList')).bamsBankId,
					currentName: JSON.parse(sessionStorage.getItem('loginList')).bankName,
					shortName: n.shortName,
					status: '' + n.status,
                    level:n.level,
					id: n.id
				};
				this.title = '编辑分支行';
				this.show = true;
			},
			cancel(){
				this.show = false;
			},
			addSubmit(){
				this.model.addSubmit(this.addList).then((res) => {
					if (res.data.code === 0) {
						dialog('success', res.data.message);
						this.initList();
					}
				})
			},
			editSubmit(){
				this.model.editSubmit(this.addList).then((res) => {
					if (res.data.code === 0) {
						dialog('success', res.data.message);
						this.initList();
					}
				})
			},
			initList(){
				this.show = false;
				this.getList();
			},
		},
		ready(){
			this.getList();
			this.currentLevel = JSON.parse(sessionStorage.getItem('loginList')).bankLevel;
		}
	}
</script>
