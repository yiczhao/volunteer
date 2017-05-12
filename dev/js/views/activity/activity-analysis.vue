<template>
	<div class="activity-data-overview">
		<div class="search-bg">
			<div class="search-show">
				<input type="text" class="input" placeholder="请输入活动名称" v-model="searchData.activityName"
				@keyup="getActivity($event)" @keyup.enter="searchList"
                @keyup.up="changeLiIndex('up')" @keyup.down="changeLiIndex('down')"/>
				<input type="button" class="btn btn-primary searchBtn" @click="searchList" value="搜 索">
				<div class="showList showLi" v-show="showList">
	                <ul class="showLi">
	                    <li class="showLi" v-for="n in activityList" :class="{'checked':liIndex==$index}" @click="getId(n)">{{n.name}}</li>
	                    <li class="showLi" v-if="!activityList.length">未查询到{{searchData.activityName}}活动</li>
	                </ul>
	            </div>
			</div>
			<span>展示活动的交易数据、微信关注量数据、现金红包发放量等数据<i>/</i>活动进行中，数据截止到16:00，2016-06-16</span>
		</div>
		<div class="chart-show">
			<div class="flex border">
				<div class="left" v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':1}}">
					<h4>交易区域</h4>
					<div class="echart-div" id="trade-area"></div>
				</div>
				<div class="center" v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':0}}">
					<h4>交易数据</h4>
					<div class="echart-div" id="trade-data"></div>
				</div>
				<div class="right" v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':2}}">
					<h4>交易时段</h4>
					<div class="echart-div" id="trade-time"></div>
				</div>
			</div>
			<div class="flex short">
				<div class="left" v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':3}}">
					<h4>商户数据</h4>
					<div class="echart-div">
						<table>
							<tr>
								<td>{{merchant.averageTradeNumbers}}</td>
								<td>{{merchant.averageTradeAmount[0]}}
									<i class="float-num" v-if="!merchant.averageTradeAmount[1]"><span>.</span>00</i>
									<i class="float-num" v-else><span>.</span>{{merchant.averageTradeAmount[1]}}</i></td>
							</tr>
							<tr>
								<td>店均交易笔数</td>
								<td>店均交易金额</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="center" v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':4}}">
					<h4>卡BIN数据</h4>
					<div class="echart-div">
						<table>
							<tr>
								<td>{{cardBin.averageTradeNum}}</td>
								<td>{{cardBin.averageTradeAmount[0]}}
									<i class="float-num" v-if="!cardBin.averageTradeAmount[1]"><span>.</span>00</i>
									<i class="float-num" v-else><span>.</span>{{cardBin.averageTradeAmount[1]}}</i>
								</td>
							</tr>
							<tr>
								<td>卡BIN交易笔数</td>
								<td>卡BIN交易金额</td>
							</tr>
						</table>
					</div>
				</div>
				<div class="right" v-link="{name:'activity-data-overview',params:{'adoActivityIds':!searchData.id?':adoActivityIds':searchData.id,'adoActivityId':!searchData.activityID?':adoActivityId':searchData.activityID,'mainStepChance':5}}">
					<h4>单卡交易</h4>
					<div class="echart-div">
						<table>
							<tr>
								<td>{{oneCard.cardNumbers}}</td>
								<td>{{oneCard.averageCardNumbers}}</td>
							</tr>
							<tr>
								<td>参与卡数量</td>
								<td>卡均参与数量</td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<style type="text/css">
	.float-num{
		font-style: normal;
		font-size: 14px;
	}
	.float-num span{
		font-size:22px;
	}
	.activity-data-overview td{
		border-width: 0px !important;
	}
	.searchBtn:hover{
		background-color: #e74c39!important;
	}
</style>
<script>
	import model from '../../ajax/activity/activity-analysis'
	export default{
		data(){
			this.model=model(this)
			return{
				mainStep:0,
				searchData:{
				    id:'',
					activityName:'',
					activityID:'',
					compareFlag:true,
					bankUuidString:sessionStorage.getItem('uuids'),
				},
				compareFlag:true,
				times:{//时间初始化数据
                    today:getDates().today,
                    aweekAgo:getDates().aweekAgo,
                    amonthAgo:getDates().amonthAgo
				},
				tradeArea:'',
				tradeData:{
					today:'',
					total:'',
				},
				tradeTime:[],
				merchant:{
					averageTradeNumbers:[],
					averageTradeAmount:[],
				},
				cardBin:{
					averageTradeNum:[],
					averageTradeAmount:[],
				},
				oneCard:{},
                activityList:[],
                liIndex:0,
                showList:false,
			}
		},
		methods:{
			searchList(){
                if(this.showList){
					this.searchData.activityName=this.activityList[this.liIndex].name;
					this.searchData.activityID=this.activityList[this.liIndex].uniqueId;
					this.searchData.id=this.activityList[this.liIndex].id;
				}
                this.showList=false;
				this.initList();
            },
            getActivity: _.debounce(function(e){
                if(e.keyCode == 38 || e.keyCode == 40|| e.keyCode == 13){  //向上向下
                    return ;
                }
                let vm=this;
                vm.replaceName=(vm.searchData.activityName).replace(/(^\s+)|(\s+$)/g, "");
                let data={
                    name:vm.replaceName,
                    maxResult:10,
                    uuids:_.split(sessionStorage.getItem('uuids'), ',')
                }
                if(!vm.replaceName){
                    vm.searchData.activityID="";
                    vm.searchData.id="";
                    vm.showList=false;
                    return;
                }else{
                    vm.$common_model.getActivityList(data).then((res)=>{
                        if(res.data.code===0&&res.data.data!=vm.searchData.activityName){
                            this.liIndex=0;
                            vm.$set('activityList',res.data.data);
                            vm.showList=true;
                        }
                    })
                }
            },300),
            changeLiIndex(type){
                if(!this.activityList.length)return;
                switch (type){
                    case 'up':
                        this.liIndex==0?this.liIndex=this.activityList.length-1:this.liIndex--;
                        break;
                    case 'down':
                        this.liIndex==this.activityList.length-1?this.liIndex=0:this.liIndex++;
                        break;
                    default:
                        break;
                }
            },
            getId({uniqueId,name,id}){
                this.showList=false;
                this.searchData.activityName=name;
                this.searchData.activityID=uniqueId;
                this.searchData.id=id;
                this.searchData.bankUuidString='';
            },
			initList(){
				this.echartRadar();
				this.tradeDataGet();
				this.tradeTimeGet();
				this.tradeAreaData();
				this.dataGet();
			},
			tradeAreaData(){
			(!this.searchData.activityID)?this.searchData.bankUuidString=this.searchData.bankUuidString : this.searchData.activityID=this.searchData.activityID;
				this.model.getTradeAreaTotal(this.searchData).then((res)=>{
					if(res.data.code===0){
						// this.echartRadar();
					}
				})
			},
			echartRadar(){
				let option = {
					title: {text: '',textStyle:{fontSize:12,color:"#fff"},},
					tooltip: {},
				    radar: {
				        indicator: [{ name: '产生交易区域', },{ name: '区域平均交易笔数', },{ name: '最高交易区域', },{ name: '最高交易区域交易笔数', },{ name: '最高交易区域交易额'}],
				        name:{textStyle:{color:'#fff'}},axisTick:{show:false},axisLabel:{show:false},splitArea:{show:false},splitLine:{show:false},axisLine:{show:false}},
				    series: [{
				        type: 'radar',
				        data : [{value : [1, 51,51,70,50], name : '交易区域'}],
				        areaStyle: {normal: {color:'#10b283'}},lineStyle: {normal: {color:'#b9babd'}},itemStyle:{normal:{color:'#3ba686'}}
				    }]
				};
				let id=document.getElementById('trade-area');
				var resizeWorldMapContainer = function () {
					    id.style.width = id.parentNode.style.width+'px';
					    id.style.height = id.parentNode.style.height+'px';
					};
				resizeWorldMapContainer();
				let myChart=echarts.init(document.getElementById('trade-area'))
				myChart.setOption(option);
				window.onresize = function () {
				    resizeWorldMapContainer();
				    myChart.resize();
				};
			},
			tradeDataGet(){
				(!this.searchData.activityID)?this.searchData.bankUuidString=this.searchData.bankUuidString : this.searchData.activityID=this.searchData.activityID;
				this.model.getTradeDataTotal(this.searchData).then((res)=>{
					if(res.data.code===0){
						this.tradeData.today=res.data.data.tradeAmount;
						this.model.getTradeDataTotalAll(this.searchData).then((res)=>{
							if(res.data.code===0){
								this.tradeData.total=res.data.data.tradeAmount;
								this.echartBar([this.tradeData.today,this.tradeData.total]);
							}
						})
					}
				});
			},
			echartBar(data){
				let option = {
				    tooltip : {trigger: 'axis',axisPointer : {type : 'shadow'}},
				    grid: {left: '0',right: '4%',top:'20px',bottom: '3%',containLabel: true},
				    xAxis : [{type : 'category',data : [{value:'今日交易总金额',textStyle:{color:'#fff'}},{value:'累计交易总金额',textStyle:{color:'#fff'}}],splitLine:{show:false},axisLine:{show:false},axisTick:{show:false}}],
				    yAxis : [{type : 'value',axisLine:{show:false},axisLabel:{show:false},splitLine:{show:false},axisTick:{lineStyle:{color:'#777778',width:2,}}}],
				    series : [{name:'交易金额（元）',type:'bar',data:data,barWidth:80,itemStyle:{normal:{color:'#3ba686'}}}]
				};
				let id=document.getElementById('trade-data');
				let resizeIdContainer = function () {
				    id.style.width = id.parentNode.style.width+'px';
				    id.style.height = id.parentNode.style.height+'px';
				};
				resizeIdContainer();
				window.onresize = function () {
				    resizeIdContainer();
				    myChart.resize();
				};
				let myChart=echarts.init(document.getElementById('trade-data'))
				myChart.setOption(option);
			},
			tradeTimeGet(){
				(!this.searchData.activityID)?this.searchData.bankUuidString=this.searchData.bankUuidString : this.searchData.activityID=this.searchData.activityID;
				this.model.getTradePeriodTotal(this.searchData).then((res)=>{
					if(res.data.code===0){
						this.tradeTime=res.data.data.series
						this.echartLine(this.tradeTime);
					}
				})
			},
			echartLine(data){
				let hours=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
				let option = {
					    tooltip : {trigger: 'axis'},
					    grid: {left: '0px',right: '4%',top:'20px',bottom: '3%',containLabel: true},
					    xAxis : [{type:'category',boundaryGap:false,data:hours,axisLabel:{textStyle:{color:'#fff'}},}],
					    yAxis : [{type : 'value', axisLine:{show:false}, axisLabel:{show:false}, splitLine:{show:false}, axisTick:{lineStyle:{color:'#777778',width:2,}}} ],
					    series : [
					        {name:'交易笔数',type:'line',areaStyle: {normal: {color:'#10b283'}},lineStyle: {normal: {color:'#b9babd'}},itemStyle:{normal:{color:'#10b283'}},
					            data:data},
					    ],
					};
				let myChart = echarts.init(document.getElementById('trade-time'));
				myChart.setOption(option);
				let id=document.getElementById('trade-time');
				let resizeIdContainer = function () {
				    id.style.width = id.parentNode.style.width+'px';
				    id.style.height = id.parentNode.style.height+'px';
				};
				resizeIdContainer();
				window.onresize = function () {
				    resizeIdContainer();
				    myChart.resize();
				};
			},
			dataGet(){
				this.model.getMerchantTradeTotal(this.searchData).then((res)=>{if(res.data.code===0){
					let Amount=String(res.data.data.averageTradeAmount);
					this.merchant.averageTradeAmount=Amount.split('.');
					this.merchant.averageTradeNumbers=res.data.data.averageTradeNumbers;
				}})
				this.model.getCardBINTotal(this.searchData).then((res)=>{if(res.data.code===0){
					this.cardBin.averageTradeNum=res.data.data.averageTradeNum;
					let Amount=String(res.data.data.averageTradeAmount);
					this.cardBin.averageTradeAmount=Amount.split('.');
				}})
				this.model.getOneCardTotal(this.searchData).then((res)=>{if(res.data.code===0){this.oneCard=res.data.data;}})
			},
		},
		ready(){
			this.initList();
			this.echartRadar();
		},
	}
</script>