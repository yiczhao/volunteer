<template>
	<div class="crumbs">
		<span class="link-active">信用卡部</span>
	</div>
	<div class="create-title">
		<span class="title-1">活卡促刷</span>
		<span class="title-2">Living card promotion brush</span>
		<span class="title-3">提供银行信用卡部营销的解决方案 </span>
	</div>
	<div class="create-activity">
		<div class="activity-list">
			<template v-for="(index,value) in activityName">
				<div v-if="value.type!='quanyi' && value.type!='zidingyi'" class="show-activity">
					<div class="bg-show" :class="value.type" @mouseleave="value.show=false">
						<div class="hover-div">
							<div class="hover-bg"></div>
							<a v-show="!value.show" class="btn btn-primary"  @click="setProp('online')" v-link="{'name':'basic-rule',params:{'rulename':value.link}}">创建线上活动</a>
							<a v-show="!value.show" class="btn btn-danger" @click="setProp('offline')" v-link="{'name':'basic-rule',params:{'rulename':value.link}}">创建线下活动</a>
						</div>
						<div class="activity-name">
							<h4><a>{{value.name}}</a></h4>
						</div>
						<div class="activity-intru">{{value.text}}</div>
					</div>
				</div>
				<div v-if="value.type=='quanyi'" class="show-activity">
					<div class="bg-show" :class="value.type">
						<div class="hover-div">
							<div class="hover-bg"></div>
							<a v-show="!value.show" class="btn btn-primary"  @click="setProp('online')" v-link="{'name':'basic-rule',params:{'rulename':'CouponMinus'}}">优惠金额券</a>
							<a v-show="!value.show" class="btn btn-danger" @click="setProp('online')" v-link="{'name':'basic-rule',params:{'rulename':'CouponDiscount'}}">优惠打折券</a>
						</div>
						<div class="activity-name">
							<h4><a>优惠券</a></h4>
						</div>
						<div class="activity-intru">创建优惠券或优惠金额优惠。</div>
					</div>

				</div>
				<div v-if="value.type=='zidingyi'" class="show-activity">
					<div class="bg-show" :class="value.type" v-link="{'name':'Custom'}">
						<div class="activity-name">
							<h4><a>自定义</a></h4>
						</div>
						<div class="activity-intru">无需模板可将所需活动进行描述</div>
					</div>
				</div>
			</template>
		</div>
	</div>
</template>
<style lang="scss" scope>
	.crumbs{
		padding: 5px 20px!important;margin: 0!important;
		span.link-active{
			background: #e76b5f;color:#fff;
		}
	}
</style>
<script>
	export default{
		data(){
			return{
				activityName:
				[{
					'name':'满减',
					'text':'特定持卡人享受消费满减优惠。',
					'link':'MeetMinus',
					'show':false,
					'type':'manjian'
				},{
					'name':'每满减',
					'text':'特定持卡人享受消费每满减优惠',
					'link':'EveryMeetMinus',
					'show':false,
					'type':'meimanjian'
				},{
					'name':'立减',
					'text':'特定持卡人享受消费立减优惠。',
					'link':'ImmediatelyMinus',
					'show':false,
					'type':'lijian'
				},{
					'name':'随机立减',
					'text':'特定持卡人享有每单消费随机立减的优惠资格',
					'link':'RandomMinus',
					'show':false,
					'type':'suijilijian'
				},{
					'name':'折扣',
					'text':'特定持卡人享有每单消费打折优惠',
					'link':'MeetDiscount',
					'show':false,
					'type':'zhekou'
				},{
					'name':'随机折扣',
					'text':'特定持卡人享有每单消费随机折扣的优惠资格',
					'link':'RandomDiscount',
					'show':false,
					'type':'suijizhekou'
				},{
					'name':'连环折扣',
					'text':'特定持卡人享有多次消费连环折扣的优惠资格',
					'link':'SerialDiscount',
					'show':false,
					'type':'lianhuanzhekou'
				},{
					'name':'周几几折',
					'text':'特定持卡人享有根据消费的周尾数打的优惠资格。',
					'link':'WeekdayDiscount',
					'show':false,
					'type':'zhoujijizhe'
				},{
					'name':'几号几折',
					'text':'特定持卡人享有根据消费日期尾数打折的优惠资格。',
					'link':'DateDiscount',
					'show':false,
					'type':'jihaojizhe'
				},{
					'show':false,
					'type':'quanyi'
				},{
					'name':'票务类活动',
					'text':'特定持卡人享有以优惠价购票的资格',
					'link':'Ticket',
					'show':false,
					'type':'piaowu'
				},{
					'link':'Custom',
					'show':false,
					'type':'zidingyi',
				}]
			}
		},
		methods:{
			setProp(val){
				sessionStorage.setItem('props',val);
			}
		},
		ready(){
			sessionStorage.removeItem('activityId');
		}
	}
</script>
