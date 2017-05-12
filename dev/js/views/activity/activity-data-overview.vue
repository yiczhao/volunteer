<template>
	<div class="activity-analysis"> 
		<div class="analysis-title">
			<h1>
				<span><i>/</i>活动分析数据总览</span>
				<a class="btn btn-primary" v-link="{name:'activity-pdfout',params:{'pdfActivityIds':!searchData.id?':pdfActivityIds':searchData.id,'pdfActivityId':!searchData.activityID?':pdfActivityId':searchData.activityID}}">查看分析报告</a>
			</h1>
			<h3>Activity analysis report</h3>
		</div>
		<div class="analysis-data">
			<div class="data-title">
                <span v-for="n in getTradeInit" :class="{'active':mainStep==$index+1}" @click="initStep(n.url,$index+1)">{{n.names}}</span>
			</div>
			<div class="data-labels" v-if="mainStep!=3">
				<div class="labels-title">
					<span v-if="mainStep==1" @click="changeTradeTotal(0)" :class="{'active':!tradeTotal}" class="btn">今日关键数据</span>
					<span v-if="mainStep==1" @click="changeTradeTotal(1)" :class="{'active':!!tradeTotal}" class="btn">累计关键数据</span>
					<span v-else class="btn active">关键数据</span>
				</div>
				<div v-if="mainStep==1" class="labels-lists">
					<div>
						<p>{{totalData.tradeAmount | currency '''2'}}</p>
						<p>交易总金额（元）</p>
					</div><div>
						<p>{{totalData.subsidyAmount | currency '''2'}}</p>
						<p>补贴总金额（元）</p>
					</div><div>
						<p>{{totalData.tradeNum}}</p>
						<p>交易总笔数（笔）</p>
					</div><div>
						<p>{{totalData.tradeCardNum}}</p>
						<p>参与活动卡数量（个）</p>
					</div><div>
						<p>{{totalData.averageTradeAmount | currency '''2'}}</p>
						<p>单笔平均交易金额（元）</p>
					</div><div>
						<p>{{totalData.averageSubsidyAmount | currency '''2'}}</p>
						<p>单笔平均补贴金额（元）</p>
					</div>
				</div>
				<div v-if="mainStep==2" class="labels-lists">
					<div>
						<p>{{totalData.tradeAreaNum}}</p>
						<p>产生交易区域（个）</p>
					</div><div>
						<p>{{totalData.averageTradeNum}}</p>
						<p>区域平均交易笔数(笔)</p>
					</div><div>
						<p>{{totalData.maxTradeArea}}</p>
						<p>最高交易区域</p>
					</div><div>
						<p>{{totalData.maxTradeAreaTradeNum}}</p>
						<p>最高交易区域交易笔数(笔)</p>
					</div><div>
						<p>{{totalData.maxTradeAreaTradeAmount | currency '''2'}}</p>
						<p>最高交易区域交易额（元）</p>
					</div>
				</div>
				<div v-if="mainStep==4" class="labels-lists">
					<div>
						<p>{{totalData.storeNumbers}}</p>
						<p>参与门店数（个）</p>
					</div><div>
						<p>{{totalData.generateTradeStoreNumbers}}</p>
						<p>产生交易门店数(个)</p>
					</div><div>
						<p>{{totalData.averageTradeNumbers}}</p>
						<p>店均交易笔数(个)</p>
					</div><div>
						<p>{{totalData.averageSubsidyAmount | currency '''2'}}</p>
						<p>店均补贴金额(元)</p>
					</div><div>
						<p>{{totalData.averageTradeAmount | currency '''2'}}</p>
						<p>店均交易金额（元）</p>
					</div>
				</div>
				<div v-if="mainStep==5" class="labels-lists">
					<div>
						<p>{{totalData.cardBinNum}}</p>
						<p>卡BIN个数（个）</p>
					</div><div>
						<p>{{totalData.averageTradeNum}}</p>
						<p>卡BIN平均交易笔数(个)</p>
					</div><div>
						<p>{{totalData.averageTradeAmount | currency '''2'}}</p>
						<p>卡BIN平均交易金额（元）</p>
					</div><div>
						<p>{{totalData.averageSubsidyAmount | currency '''2'}}</p>
						<p>卡BIN平均补贴金额(元)</p>
					</div>
				</div>
				<div v-if="mainStep==6" class="labels-lists">
					<div>
						<p>{{totalData.cardNumbers}}</p>
						<p>参与卡数量（个）</p>
					</div><div>
						<p>{{totalData.averageCardNumbers}}</p>
						<p>卡均参与次数(次)</p>
					</div><div>
						<p>{{totalData.maxSwipedCardNumbers}}</p>
						<p>单卡最高参与次数（次）</p>
					</div>
				</div>
			</div>
			<div class="data-table">
				<template v-if="mainStep==1">
					<h3>7日/30日关键数据详解</h3>
					<div class="table-btns">
						<span :class="{'active':tradeIndex==0}" class="btn" @click="changeTradeIndex(0)">交易总金额</span>
						<span :class="{'active':tradeIndex==1}" class="btn" @click="changeTradeIndex(1)">补贴总金额</span>
						<span :class="{'active':tradeIndex==2}" class="btn" @click="changeTradeIndex(2)">交易总笔数</span>
						<div>
							<span :class="{'active':tradeTime==0}" @click="changeTradeTime(0)">7日</span>
							<span>|</span>
							<span :class="{'active':tradeTime==1}" @click="changeTradeTime(1)">30日</span>
							<span :class="{'active':compareFlag}" @click="compareFlagChange">按时间对比</span>
						</div>
					</div>
				</template>
                <template v-if="mainStep==2">
                    <h3>交易区域关键数据排行</h3>
                    <div class="table-btns">
                        <span :class="{'active':areaIndex==0}" class="btn" @click="changeAreaIndex(0)">交易金额</span>
                        <span :class="{'active':areaIndex==1}" class="btn" @click="changeAreaIndex(1)">交易笔数</span>
                    </div>
                </template>
                <template v-if="mainStep==4">
                    <h3>商户数据分析</h3>
                    <div class="table-btns">
                        <span :class="{'active':merchantIndex==0}" class="btn" @click="changeMerchantIndex(0)">交易金额</span>
                        <span :class="{'active':merchantIndex==1}" class="btn" @click="changeMerchantIndex(1)">交易笔数</span>
                    </div>
                </template>
                <template v-if="mainStep==5">
                    <h3>卡BIN数据分析</h3>
                    <div class="table-btns">
                        <span :class="{'active':carBinIndex==0}" class="btn" @click="changeCardBinIndex(0)">交易金额</span>
                        <span :class="{'active':carBinIndex==1}" class="btn" @click="changeCardBinIndex(1)">交易笔数</span>
                    </div>
                </template>
				<div v-el:table-init  class="table-init">
				</div>
			</div>
		</div>
	</div>
</template>
<style type="text/css" scoped>
	.content .content-main .content-right .has-crumbs > div:nth-child(2){
		padding:0 !important;
	}
</style>
<script type="text/javascript">
	import model from '../../ajax/activity/activity-analysis';
	export default{
		data(){
			this.model=model(this)
			return{
				mainStep:null,
                tradeTime:0,
                tradeTotal:0,
                tradeIndex:0,
                areaIndex:0,
                merchantIndex:0,
                carBinIndex:0,
				compareFlag:true,
				times:{//时间初始化数据
                    today:getDates().today,
                    aweekAgo:getDates().aweekAgo,
                    amonthAgo:getDates().amonthAgo
				},
				uuids:sessionStorage.getItem('loginList').bankUUID,
				searchData:{
				    id:'',
					activityID:'',
					activityName:'',
				},
                getTradeInit:[
                    {url:['getTradeDataTotal','getTradeAmount'],names:'交易数据分析'},
                    {url:['getTradeAreaTotal','getTradeAreaTotalAmountList'],names:'交易区域分析'},
                    {url:['getTradePeriodTotal'],names:'交易时段分析'},
                    {url:['getMerchantTradeTotal','getMerchantTradeAmount'],names:'商户数据分析'},
                    {url:['getCardBINTotal','getCardBINTradeAmountList'],names:'卡BIN数据分析'},
                    {url:['getOneCardTotal','getOneCardSwipedCount'],names:'单卡交易分析'}
                ],
                getTrade:[
                    ['getTradeAmount'],//交易总金额
                    ['getSubsidyAmount'],//补贴总金额
                    ['getTradeNum'],//交易总笔数
                ],
                getArea:[
                    ['getTradeAreaTotalAmountList'],//交易区域获取交易金额排行
                    ['getTradeAreaNumList']//交易区域获取交易笔数排行
                ],
                getMerchant:[
                    ['getMerchantTradeAmount'],//商户数据获取交易金额排行
                    ['getMerchantTradeCount']//商户数据获取交易笔数排行
                ],
                getCardBIN:[
                    ['getCardBINTradeAmountList'],//CardBIN获取交易金额排行
                    ['getCardBINTradeNumList']//CardBIN获取交易笔数排行
                ],
				tableText:'交易金额（元）',
				totalData:''
			}
		},
		methods:{
// 		    initChart(data){
//                 var hours = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
// //                var data = [1,2,3,4,5,6,7,8,9,12,12,11,11,11,11,11,22,33,22,44,22,33,22,11]
//                 let option ={
//                     tooltip: {
//                         position: 'top',
//                         formatter: function (params) {
//                             return  ' 交易笔数:' + params.value+'笔';
//                         }
//                     },
//                     height:300,
//                     grid:{y2:180},
//                     xAxis: {type: 'category', data: hours, boundaryGap: false, splitLine: {show: false}, axisLine: {show: false }},
//                     yAxis: {type: 'category', data: ["交易笔数（笔）"], splitLine: {show: false }, axisLine: {show: false}},
//                     series: [{
//                         type: 'scatter', itemStyle:{normal:{color:'#11b183', lineStyle:{color:'#11b183'}}},
//                         symbolSize: function (val) {
//                             return val * 2;
//                         },
//                         data: data
//                     }]
//                 };
//                 let myChart = echarts.init(this.$els.tableInit);
//                 myChart.setOption(option);
//             },
			initTable(xData,yData,ydata2){
				let axisData = xData;
				let data = yData;
				let data2 = ydata2;
				let option = {
					title: {text: this.tableText, textStyle:{color:'#666', fontSize:12}, right:35, top:15},
					tooltip:{},
					grid:{x:100},
					xAxis: {type : 'category', boundaryGap : false,
						data : axisData,
                        nameTextStyle:{nameRotate:90}
					},
					yAxis: {type : 'value', axisLine:{show:false}},
					series: [{name:'',type: 'line', symbolSize:10, symbol: 'circle', itemStyle:{normal:{color:'#11b183', lineStyle:{color:'#11b183'}}}, label: {normal: {show: false}}, lineStyle: {normal: {color: '#11b183'}},
						data: data
					}]
				};
				if(!!data2&&this.compareFlag){
					option.tooltip={trigger: 'axis'};
					option.series.push({name:'对比数据',type: 'line', symbolSize:10, symbol: 'circle', itemStyle:{normal:{color:'#ea6953', lineStyle:{color:'#ea6953'}}}, label: {normal: {show: false}}, lineStyle: {normal: {color: '#ea6953'}},
						data: data2
					});
				}
				// let id=this.$els.tableInit;
				// let resizeIdContainer = function () {
				//     id.style.width = id.parentNode.style.width+'px';
				//     id.style.height = id.parentNode.style.height+'px';
				// };
				// resizeIdContainer();
				let myChart = echarts.init(this.$els.tableInit);
				myChart.setOption(option);
				// window.onresize = function () {
				//     resizeIdContainer();
				//     myChart.resize();
				// };
			},
			initBar(xData,yData,barColor){
				let axisData = xData;
				let data = yData;
				let color = barColor;
				let option = {
					title: {text: this.tableText, textStyle:{color:'#666', fontSize:12}, right:35, top:15},
				    tooltip : {trigger: 'axis',axisPointer : {type : 'shadow'}},
				    grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
				    xAxis : [{type : 'category',data : axisData,
				    	// axisLabel:{  interval:0,rotate:2, margin:5,  textStyle:{ fontWeight:"bolder", color:"#000000"}},    
					}],
				    yAxis : [{type : 'value'}],
				    series : [{name:'',type:'bar',data:data,barWidth:50,itemStyle:{normal:{color:color}}}]
				};
				// let id=this.$els.tableInit;
				// let resizeIdContainer = function () {
				//     id.style.width = id.parentNode.style.width+'px';
				//     id.style.height = id.parentNode.style.height+'px';
				// };
				// resizeIdContainer();
				let myChart = echarts.init(this.$els.tableInit);
				myChart.setOption(option);
				// window.onresize = function () {
				//     resizeIdContainer();
				//     myChart.resize();
				// };
			},
            initStep(ajaxArr,steps){
			    if(this.mainStep==steps)return;
                this.tradeTime=0;this.tradeTotal=0;this.tradeIndex=0;this.compareFlag=true;
                this.changeStep(ajaxArr,steps);
            },
            changeStep(ajaxArr,steps){
                let data={};
                if(steps==1){
                    if(!this.tradeTime){
                        data={
                            startDate:this.times.aweekAgo,
                            endDate:this.times.today,
                            compareFlag:true,
                            activityID:this.searchData.activityID,
                        }
                    }else{
                        data={
                            startDate:this.times.amonthAgo,
                            endDate:this.times.today,
                            compareFlag:true,
                            activityID:this.searchData.activityID,
                        }
                    }
                }else{
                    data={
                        activityID:this.searchData.activityID,
                    }
                }
                (!this.searchData.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
                _.map(ajaxArr,(val)=>{
                    this.model[val](data).then((res)=>{
                        if(res.data.code===0){
                            if(!res.data.data.series){
                                this.$set('totalData',res.data.data);
                            }else{
                                this.getName(steps,res.data.data);
                            }
                        }
                    })
                })
            },
			getName(steps,data){
				switch (steps){
					case 1:
						this.tableText='交易金额（元）'
                        if(this.tradeIndex==2){
                            this.tableText='交易笔数（笔）'
                            this.initTable(data.category,data.series[0].dataLong,data.series[1].dataLong);
                        }else{
                            this.initTable(data.category,data.series[0].dataDecimal,data.series[1].dataDecimal);
                        }
                        this.mainStep=1;
						break
					case 2:
						this.tableText='刷卡金额（元）'
                        if(this.areaIndex==1){
                            this.tableText='刷卡笔数（笔）'
                            this.initTable(data.category,data.series[0].dataLong);
                        }else{
                            this.initTable(data.category,data.series[0].dataDecimal);
                        }
                        this.mainStep=2;
						break
					case 3:
						this.tableText='累计交易笔数（笔）';
						let hours = ["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
						this.initTable(hours,data.series);
                        this.mainStep=3;
						break
					case 4:
						this.tableText='商户刷卡金额（元）'
                        if(this.merchantIndex==1){
                            this.tableText='商户刷卡笔数（笔）'
                            this.initBar(data.series[0].storeAndMerchantName,data.series[0].dataLong,'#3ba686')
                        }else{
                            this.initBar(data.series[0].storeAndMerchantName,data.series[0].dataDecimal,'#3ba686')
                        }
                        this.mainStep=4;
						break
					case 5:
						this.tableText='卡BIN刷卡金额（元）';
                        if(this.carBinIndex==1){
							this.tableText='卡BIN刷卡笔数（笔）';
							this.initBar(data.category,data.series[0].dataLong,'#3ba686');
                        }else{
							this.initBar(data.category,data.series[0].dataDecimal,'#3ba686');
                        }
                        this.mainStep=5;
						break
					case 6:
						this.tableText='卡数量（张）';
						this.initBar(data.series[0].data,data.series[0].dataLong,'#3ba686');
                        this.mainStep=6;
						break
				}
			},
			compareFlagChange(){
				this.compareFlag=!this.compareFlag;
                this.changeStep(this.getTrade[this.tradeIndex],1)
			},
            changeTradeIndex(index){
                this.tradeIndex=index;
                this.changeStep(this.getTrade[this.tradeIndex],1)
            },
            changeTradeTime(index){
                this.tradeTime=index;
                this.changeStep(this.getTrade[this.tradeIndex],1)
            },
            changeTradeTotal(index){
                this.tradeTotal=index;
                let data=['getTradeDataTotal'];
                if(index==1){
                    data=['getTradeDataTotalAll'];
                }
                this.changeStep(data,1)
            },
            changeAreaIndex(index){
                this.areaIndex=index;
                this.changeStep(this.getArea[this.areaIndex],2)
            },
            changeMerchantIndex(index){
            	this.merchantIndex=index;
            	this.changeStep(this.getMerchant[this.merchantIndex],4)
            },
            changeCardBinIndex(index){
            	this.carBinIndex=index;
            	this.changeStep(this.getCardBIN[this.carBinIndex],5)
            }
		},
		ready(){
			(this.$route.params.adoActivityId!=':adoActivityId')?this.searchData.activityID=this.$route.params.adoActivityId:null;
			(this.$route.params.adoActivityIds!=':adoActivityIds')?this.searchData.id=this.$route.params.adoActivityIds:null;
			(this.$route.params.mainStepChance!=':mainStepChance')?this.mainStep=this.$route.params.mainStepChance>>0:null;
			this.initStep(this.getTradeInit[this.mainStep].url,this.mainStep+1);
		}
	}
</script>