<template>
	<div class="activity-pdfout" id="pdf-area"> 
		<div class="analysis-title">
			<h1>
				<span><i>/</i>活动分析报告</span>
				<!-- <a class="btn btn-primary" @click="outPDF">导出PDF报告</a> -->
				<a class="btn btn-primary" @click="choosePDFOut">导出PDF报告</a>
			</h1>
		</div>
		<div class="activityBaseInfo" v-show="!!this.id.pdfMap.activityBaseInfo &&!!this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id">
			<span class="activity-title">活动基本信息</span>
			<div class="activity-flex">
				<div>活动名称:<span>{{basicData.name}}</span></div>
				<div>活动预算:<span>{{basicData.budget}}</span></div>
				<div>所属银行:</div>
			</div>
			<div class="activity-flex">
				<div>活动时间:<span>{{basicData.startTime}} 	 {{basicData.endTime}}</span></div>
				<div>参与时间段:<span v-for="n in basicData.timesList">【{{n}}】</span></div>
			</div>
			<div class="activity-flex">活动主题:<span>{{basicData.subject}}</span></div>
			<div class="activity-flex">活动细则:<span>{{basicData.detail}}</span></div>
			<div class="activity-flex">POS小票内容设置:<span>{{basicData.posPrint}}</span></div>
		</div>
		<div class="analysis-data">
			<div class="data-title">
                <span class="active">交易数据分析</span>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">今日关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>{{transactionDataShow.tradeDataToday.tradeAmount}}</p>
						<p>交易总金额（元）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataToday.subsidyAmount}}</p>
						<p>补贴总金额（元）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataToday.tradeNum}}</p>
						<p>交易总笔数（笔）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataToday.tradeCardNum}}</p>
						<p>参与活动卡数量（个）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataToday.averageTradeAmount}}</p>
						<p>单笔平均交易金额（元）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataToday.averageSubsidyAmount}}</p>
						<p>单笔平均补贴金额（元）</p>
					</div>
				</div>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">累计关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>{{transactionDataShow.tradeDataTotail.tradeAmount}}</p>
						<p>交易总金额（元）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataTotail.subsidyAmount}}</p>
						<p>补贴总金额（元）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataTotail.tradeNum}}</p>
						<p>交易总笔数（笔）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataTotail.tradeCardNum}}</p>
						<p>参与活动卡数量（个）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataTotail.averageTradeAmount}}</p>
						<p>单笔平均交易金额（元）</p>
					</div><div>
						<p>{{transactionDataShow.tradeDataTotail.averageSubsidyAmount}}</p>
						<p>单笔平均补贴金额（元）</p>
					</div>
				</div>
			</div>
			<div class="data-table">
				<h3>7日/30日交易总金额数据详解对比图</h3>
				<div class="data-echart echart-line" id="trade-data-week"></div>
				<div class="data-echart echart-line" id="trade-data-month"></div>
			</div>
			<div class="data-table">
				<h3>7日/30日补贴总金额数据详解对比图</h3>
				<div class="data-echart echart-line" id="subsidy-data-week"></div>
				<div class="data-echart echart-line" id="subsidy-data-month"></div>
			</div>
			<div class="data-table">
				<h3>7日/30日交易总笔数数据详解对比图</h3>
				<div class="data-echart echart-line" id="number-data-week"></div>
				<div class="data-echart echart-line" id="number-data-month"></div>
			</div>
		</div>
		<div class="analysis-data">
			<div class="data-title">
                <span class="active">交易区域分析</span>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>{{transactionRegion.tradeAreaModel.tradeAreaNum}}</p>
						<p>产生交易区域（个）</p>
					</div><div>
						<p>{{transactionRegion.tradeAreaModel.averageTradeNum}}</p>
						<p>区域平均交易笔数(笔)</p>
					</div><div>
						<p>{{transactionRegion.tradeAreaModel.maxTradeArea}}</p>
						<p>最高交易区域</p>
					</div><div>
						<p>{{transactionRegion.tradeAreaModel.maxTradeAreaTradeNum}}</p>
						<p>最高交易区域交易笔数(笔)</p>
					</div><div>
						<p>{{transactionRegion.tradeAreaModel.maxTradeAreaTradeAmount}}</p>
						<p>最高交易区域交易额（元）</p>
					</div>
				</div>
			</div>
			<div class="data-table">
				<h3>交易区域交易金额排行</h3>
				<div class="data-echart echart-line" id="trade-area-week"></div>
				<h3>交易区域交易笔数排行</h3>
				<div class="data-echart echart-line" id="trade-area-month"></div>
			</div>
		</div>
		<div class="analysis-data">
			<div class="data-title">
                <span class="active">交易时段分析</span>
			</div>
			<div class="data-table">
				<div class="data-echart echart-line" id="time-echart"></div>
			</div>
		</div>
		<div class="analysis-data">
			<div class="data-title">
                <span class="active">商户数据分析</span>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>{{merchantDataArea.merchantDataTotal.storeNumbers}}</p>
						<p>参与门店数（个）</p>
					</div><div>
						<p>{{merchantDataArea.merchantDataTotal.generateTradeStoreNumbers}}</p>
						<p>产生交易门店数(个)</p>
					</div><div>
						<p>{{merchantDataArea.merchantDataTotal.averageTradeNumbers}}</p>
						<p>店均交易笔数(个)</p>
					</div><div>
						<p>{{merchantDataArea.merchantDataTotal.averageSubsidyAmount}}</p>
						<p>店均补贴金额(元)</p>
					</div><div>
						<p>{{merchantDataArea.merchantDataTotal.averageTradeAmount}}</p>
						<p>店均交易金额（元）</p>
					</div>
				</div>
			</div>
			<div class="data-table">
				<h3>商户刷卡金额排行</h3>
				<div class="data-echart merchant-echart echart-bar" id="merchant-echart-amount"></div>
				<h3>商户刷卡笔数排行</h3>
				<div class="data-echart merchant-echart echart-bar" id="merchant-echart-num"></div>
			</div>
		</div>
		<div class="analysis-data">
			<div class="data-title">
                <span class="active">卡BIN数据分析</span>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>{{cardBINDataArea.CardBinModel.cardBinNum}}</p>
						<p>卡BIN个数（个）</p>
					</div><div>
						<p>{{cardBINDataArea.CardBinModel.averageTradeNum}}</p>
						<p>卡BIN平均交易笔数(个)</p>
					</div><div>
						<p>{{cardBINDataArea.CardBinModel.averageTradeAmount}}</p>
						<p>卡BIN平均交易金额（元）</p>
					</div><div>
						<p>{{cardBINDataArea.CardBinModel.averageSubsidyAmount}}</p>
						<p>卡BIN平均补贴金额(元)</p>
					</div>
				</div>
			</div>
			<div class="data-table">
				<h3>卡BIN刷卡金额排行</h3>
				<div class="data-echart cardBIN-echart echart-bar" id="cardBIN-echart-amount"></div>
				<h3>卡BIN刷卡笔数排行</h3>
				<div class="data-echart cardBIN-echart echart-bar" id="cardBIN-echart-num"></div>
			</div>
		</div>
		<div class="analysis-data">
			<div class="data-title">
                <span class="active">单卡交易分析</span>
			</div>
			<div class="data-labels">
				<div class="labels-title">
					<span class="btn active">关键数据</span>
				</div>
				<div class="labels-lists">
					<div>
						<p>{{oneCardArea.oneCardModel.cardNumbers}}</p>
						<p>参与卡数量（个）</p>
					</div><div>
						<p>{{oneCardArea.oneCardModel.averageCardNumbers}}</p>
						<p>卡均参与次数(次)</p>
					</div><div>
						<p>{{oneCardArea.oneCardModel.maxSwipedCardNumbers}}</p>
						<p>单卡最高参与次数（次）</p>
					</div>
				</div>
			</div>
			<div class="data-table">
				<h3>单卡参与次数（次）</h3>
				<div class="data-echart one-echart echart-bar" id="one-echart-times"></div>
			</div>
		</div>
		<span class="content_dialog" id="content_dialog">
		    <content-dialog
                :show.sync="chooseShow" :is-cancel="true" :type.sync="'infos'"
                :title.sync="chooseTitle" @kcancel="chooseShow=false" @kok="kok(this.exportPdfData,'choose')">
                <a class="btn btn-primary bottom" @click="kok(this.id,'all')">全部导出</a>
                <span v-show="!!this.id.pdfMap.activityBaseInfo &&!!this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id">
		            <div class="analysis-data dialog_data">
						<div class="data-title dialog_data_title"><span class="active border">活动基本信息</span></div>
					</div>
					<div class="form-group">
					    <div class="function-area">
					    	<span class="checke-span" v-for="m in privileges" v-if="m.judge=='base_info'">
								<ks-checkbox @change="checked(m)" :checked.sync="m.select">{{m.name}}</ks-checkbox>
					    	</span>
						</div>
					</div>
				</span>
				<div class="analysis-data dialog_data">
					<div class="data-title dialog_data_title"><span class="active border">交易数据分析</span></div>
				</div>
				<div class="form-group">
				    <div class="function-area">
				    	<span class="checke-span" v-for="m in privileges" v-if="m.judge=='trade_1'">
							<ks-checkbox @change="checked(m)" :checked.sync="m.select">{{m.name}}</ks-checkbox>
				    	</span>
					</div>
					<div class="function-area">
				    	<span class="checke-span" v-for="m in privileges" v-if="m.judge=='trade_2'">
							<ks-checkbox @change="checked(m)" :checked.sync="m.select">{{m.name}}</ks-checkbox>
				    	</span>
					</div>
				</div>
				<div class="analysis-data dialog_data">
					<div class="data-title dialog_data_title"><span class="active border">交易区域分析</span></div>
				</div>
				<div class="form-group">
				    <div class="function-area">
				    	<span class="checke-span" v-for="m in privileges" v-if="m.judge=='area'">
							<ks-checkbox @change="checked(m)" :checked.sync="m.select">{{m.name}}</ks-checkbox>
				    	</span>
					</div>
				</div>
				<div class="analysis-data dialog_data">
					<div class="data-title dialog_data_title"><span class="active border">交易时段分析</span></div>
				</div>
				<div class="form-group">
				    <div class="function-area">
				    	<span class="checke-span" v-for="m in privileges" v-if="m.judge=='time'">
							<ks-checkbox @change="checked(m)" :checked.sync="m.select">{{m.name}}</ks-checkbox>
				    	</span>
					</div>
				</div>
				<div class="analysis-data dialog_data">
					<div class="data-title dialog_data_title"><span class="active border">商户数据分析</span></div>
				</div>
				<div class="form-group">
				    <div class="function-area">
				    	<span class="checke-span" v-for="m in privileges" v-if="m.judge=='merchant'">
							<ks-checkbox @change="checked(m)" :checked.sync="m.select">{{m.name}}</ks-checkbox>
				    	</span>
					</div>
				</div>
				<div class="analysis-data dialog_data">
					<div class="data-title dialog_data_title"><span class="active border">卡BIN数据分析</span></div>
				</div>
				<div class="form-group">
				    <div class="function-area">
				    	<span class="checke-span" v-for="m in privileges" v-if="m.judge=='cardBIND'">
							<ks-checkbox @change="checked(m)" :checked.sync="m.select">{{m.name}}</ks-checkbox>
				    	</span>
					</div>
				</div>
				<div class="analysis-data dialog_data">
					<div class="data-title dialog_data_title"><span class="active border">单卡交易分析</span></div>
				</div>
				<div class="form-group">
				    <div class="function-area">
				    	<span class="checke-span" v-for="m in privileges" v-if="m.judge=='oneCard'">
							<ks-checkbox @change="checked(m)" :checked.sync="m.select">{{m.name}}</ks-checkbox>
				    	</span>
					</div>
				</div>
        	</content-dialog>
	    </span>
	</div>
</template>
<style type="text/css" scoped>
	.content .content-main .content-right .has-crumbs > div:nth-child(2){
		padding:0 !important;
	}
	.data-title>.active{
		text-align: left !important;
	}
	.activity-analysis .analysis-data .data-title span, .activity-pdfout .analysis-data .data-title span,.analysis-data .btn{
		cursor:auto !important;
	}
	.echart-line{
		height: 300px !important;
	}
	.echart-bar{
		height: 350px !important;
	}
	.data-table>.echart-line{
		margin-top: 20px;
	}
	.dialog_data{
		padding:0 !important;
	}
	.dialog_data_title{
		margin-bottom: 5px !important;
	}
	.form-group{
		margin-bottom: 15px !important;
	}
	.bottom{
		margin-bottom: 15px !important;
	}
	.border{
		border-color: #e0e0e0!important;
	}
</style>
<script type="text/javascript">
    import model from '../../ajax/activity/activity-analysis'
	export default{
		data(){
			this.model=model(this)
			return{
				origin:window.origin,
				addTitle:'',
				addshow:true,
				base64:{
					trade_all_amount_7:'',//交易总金额7日
					trade_all_amount_30:'',//交易总金额30日
					subsidy_all_amount_7:'',//补贴总金额7日
					subsidy_all_amount_30:'',//补贴总金额30日
					trade_all_num_7:'',//交易总笔数7日
					trade_all_num_30:'',//交易总笔数30日
					trade_area_amount:'',//交易区域交易金额
					trade_area_num:'',//交易区域交易笔数
					trade_time:'',//交易时段
					merchant_trade_amount:'',//商户交易金额
					merchant_trade_num:'',//商户交易笔数
					cardBIN_trade_amount:'',//卡bin交易金额
					cardBIN_trade_num:'',//卡bin交易笔数
					oneCard_num:'',//单卡参与次数
				},
				tableTitleChoose:{
					title:'',
					sevenAmount:'7日交易总金额数据展示图',
					sevenSubsidy:'7日补贴总金额数据展示图',
					sevenCount:'7日交易总笔数数据展示图',
					monthAmount:'30日交易总金额数据展示图',
					monthSubsidy:'30日补贴总金额数据展示图',
					monthCount:'30日交易总笔数数据展示图',
				},
				times:{//时间初始化数据
					todayDate:'',
					lastWeek:'',
					monthAgo:''
				},
				tradeSearchData:{
					xAxisData:[],
					weekThis:[],
					weekLast:[],
				},
				transactionDataShow:{//交易数据分析
					tradeDataToday:{},//交易数据今日累计关键数据
					tradeDataTotail:{},//交易数据累计关键数据
					tradeDataWeekAmount:{},
					tradeDataMonthAmount:{},
					tradeDataWeekSubsidy:{},
					tradeDataMonthSubsidy:{},
					tradeDataWeekNum:{},
					tradeDataMonthNum:{},
					XData:[],
					PData:[],
					Ldata:[],
					tableTitle:'',
				},
				transactionRegion:{//交易区域数据
					tradeAreaModel:{},//交易区域累计的关键数据
					tradeArea:[],
					tradeAreaAmount:[],//交易区域交易金额排行数据
					tradeAreaNum:[],//交易区域交易笔数排行数据
				},
				transactionTime:{//交易时段分析数据
					timeData:[],
					timePoint:[],
				},
				merchantDataArea:{//商户数据分析
					merchantDataTotal:[],//商户数据关键数据
					storeName:[],
					tradeAmount:[],
				},
				cardBINDataArea:{//卡BIN数据分析
					CardBinModel:[],
					averageSubsidyAmount:'',//卡BIN平均补贴金额
					averageTradeAmount:'',//卡BIN平均交易金额
					averageTradeNum :'',//卡BIN平均交易笔数
					binType:'',//卡BIN种类
					cardBinNum:'',//卡BIN个数
					subsidyAmount:'',//补贴金额（单位，元）
					tradeAmount:'',//交易金额（单位，元）
					tradeNum:'',//交易笔数
					binStartNumber:'',//卡BIN开头数字
					tradeAmountCardBINChange:'',//交易金额排行change
					tradeNumCardBINChange:'',//交易笔数排行change
				},
				oneCardArea:{//单卡数据
					oneCardModel:[],
				},
				uuids:[JSON.parse(sessionStorage.getItem('loginList')).bankUUID],
				activityList:[],
				tradeDataEchart:{
					echartDivID:'data-echart-weekmonth',
					now:'当前数据(元)',
					contrast:'对比数据(元)',
				},
				echartID:{
					tradeAmount_7:'trade-area-week',
					tradeAmount_30:'trade-area-month',
					subsidyAmoun_7:'subsidy-area-week',
					subsidyAmoun_30:'subsidy-area-month',
					tradeNum_7:'number-area-week',
					tradeNum_30:'number-area-month',
				},
				activityInfo:0,
				basicData:{
					name:'',
					budget:'',
					startTime:'',
					endTime:'',
					subject:'',
					detail:'',
					posPrint:'',
					timesList:[]
				},
				shortName:'',
				id:{
					activityID:'',
					bankUuidString:'',
					pdfMap:{
						activityBaseInfo:{
							"activityBaseInfo":[{'id':'','uri':''}],
						},
						tradeDataAnalysis:{
							'today':[{'startDate':'','endDate':'','uri':''}],
							'total':[{'startDate':'','endDate':'','uri':''}],
							'tradeAmount_7':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'tradeAmount_30':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'subsidyAmount_7':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'subsidyAmount_30':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'tradeNum_7':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
							'tradeNum_30':[{'startDate':'','endDate':'','base64IMG':'','uri':''}],
						},
						tradeAreaAnalysis:{
							'keyData':[{'uri':''}],
							'tradeAmountTop':[{'base64IMG':'','uri':''}],
							'tradeNumTop':[{'base64IMG':'','uri':''}],
						},
						tradePeriodAnalysis:{
							'tradeNum':[{'base64IMG':'','uri':''}],
						},
						merchantDataAnalysis:{
							'keyData':[{'uri':''}],
							'amountTop':[{'base64IMG':'','uri':''}],
							'numTop':[{'base64IMG':'','uri':''}],
						},
						cardBINDataAnalysis:{
							'keyData':[{'uri':''}],
							'amountTop':[{'base64IMG':'','uri':''}],
							'numTop':[{'base64IMG':'','uri':''}],
						},
						oneCardTradeAnalysis:{
							'keyData':[{'uri':''}],
							'participateNum':[{'base64IMG':'','uri':''}],
						},
					},
				},
				fileName:'',
				chooseShow:false,
				chooseTitle:'选择导出',
				title:{
					activity:'活动分析报告',
					tradeOut:'交易数据分析',
					tradeAreaOut:'交易区域分析',
					tradeTimeOut:'交易时段分析',
					merchantOut:'商户数据分析',
					cardBINOut:'卡BIN数据分析',
					oneCardOut:'单卡交易分析',
				},
				privileges:[],
				dialogTitle:[{name:'活动基本信息'},{name:'交易数据分析'},{name:'交易区域分析'},{name:'交易时段分析'},{name:'商户数据分析'},{name:'卡BIN数据分析'},{name:'单卡交易分析'}],
				saveID:{
					statuses:[],
				},
				saveArray:'',
				exportPdfData:{
					activityID:'',
					bankUuidString:'',
					pdfMap:{},
				},
				searchData:{
					startDate:'',
					endDate:'',
					compareFlag:true,
					activityID:'',
					bankUuidString:'',
				},
				tableText:'',
				compareFlag:true,
			}
		},
		methods:{
			dateGetShow(){
				var date = new Date(),lyear = date.getFullYear(),lmonth = date.getMonth() + 1,agoMonth = lmonth-1,lday = date.getDate(),pdate = new Date(date.getTime() - 7 * 24 * 3600 * 1000),pyear = pdate.getFullYear(),pmonth = pdate.getMonth() + 1,pday = pdate.getDate(),locakDate=lyear + '-' + lmonth + '-' + lday,pastDate=pyear + '-' + pmonth + '-' + pday,agoMonthDate=lyear+'-'+agoMonth+'-'+lday;
				this.times.lastWeek=pastDate;
				this.times.todayDate=locakDate;
				this.times.monthAgo=agoMonthDate;
			},
			// =================================================================================================
			initTable(div_ID,xData,data,type,ydata2){
				let divID=div_ID;
				let axisData=xData;
				let Data=data;
				let data2 = ydata2;
				let option = {
					title: {text: this.tableText, textStyle:{color:'#666', fontSize:12}, right:35, top:15},
					tooltip:{},
					backgroundColor:'#fff',
					grid:{x:100},
					xAxis: {type : 'category', boundaryGap : false,data : axisData,nameTextStyle:{nameRotate:90}},
					yAxis: {type : 'value', axisLine:{show:false}},
					series: [
					{	name:'',
						type: 'line', 
						symbolSize:10, 
						symbol: 'circle', 
						itemStyle:{normal:{color:'#11b183', lineStyle:{color:'#11b183'}}}, 
						label: {normal: {show: false}}, 
						lineStyle: {normal: {color: '#11b183'}},
						data: Data
					}],
					animation:false,
				};
				if(!!data2 && this.compareFlag){
					option.tooltip={trigger: 'axis'};
					option.series.push({name:'对比数据',type: 'line', symbolSize:10, symbol: 'circle', itemStyle:{normal:{color:'#ea6953', lineStyle:{color:'#ea6953'}}}, label: {normal: {show: false}}, lineStyle: {normal: {color: '#ea6953'}},
						data: data2
					});
				}
				let myChart = echarts.init(document.getElementById(divID));
				myChart.setOption(option);
        		this.base64[type] = myChart.getDataURL({type:'jpeg',});//获取base64编码
			},
			initBar(id,xData,yData,type){
				let divID=id;
				let axisData = xData;
				let data = yData;
				let option = {
					title: {text: this.tableText, textStyle:{color:'#666', fontSize:12}, right:35, top:15},
				    tooltip : {trigger: 'axis',axisPointer : {type : 'shadow'}},
				    backgroundColor:'#fff',
				    grid: {left: '3%',right: '4%',bottom: '3%',containLabel: true},
				    xAxis : [{type : 'category',data : axisData,
					}],
				    yAxis : [{type : 'value'}],
				    series : [{name:'',type:'bar',data:data,barWidth:50,itemStyle:{normal:{color:'#ffcf7a'}}}],
				    animation:false,
				};
				let myChart = echarts.init(document.getElementById(divID));
				myChart.setOption(option);
				this.base64[type]= myChart.getDataURL({type:'jpeg'});//获取base64编码
			},
			// =================================================================================================
			//交易数据分析
			tradeAnalysis(){
				this.tradeDataModelTodayTotal();
				this.tradeAmountEchart_week();
				this.tradeAmountEchart_month();
			},
			tradeDataModelTodayTotal(){//获取今日\累计关键数据
				this.searchData.activityID=this.id.activityID;
                (!this.id.activityID)? this.searchData.bankUuidString=sessionStorage.getItem('uuids'):this.searchData.bankUuidString='';
        		this.model.getTradeDataTotal(this.searchData).then((res)=>{
        			if (res.data.code==0){
        				this.$set('transactionDataShow.tradeDataToday',res.data.data);
        			}
        		})
        		this.model.getTradeDataTotalAll(this.searchData).then((res)=>{
        			if (res.data.code==0){
        				this.$set('transactionDataShow.tradeDataTotail',res.data.data);
        			}
        		})
			},
			tradeAmountEchart_week(){
				let data_7={
					compareFlag:true,
					startDate:this.times.lastWeek,
					endDate:this.times.todayDate,
					activityID:this.id.activityID
				};
                (!this.id.activityID)? data_7.bankUuidString=sessionStorage.getItem('uuids'):data_7.bankUuidString='';
                //7日交易金额
				this.model.getTradeAmount(data_7).then((res)=>{
	        		if (res.data.code==0){
	        			this.tableText='7日交易总金额（元）';
	        			this.initTable('trade-data-week',res.data.data.category,res.data.data.series[0].dataDecimal,'trade_all_amount_7',res.data.data.series[1].dataDecimal)
	        		};
	        	});
                //7日补贴金额
				this.model.getSubsidyAmount(data_7).then((res)=>{
	        		if (res.data.code==0){
	        			this.tableText='7日补贴总金额（元）';
	        			this.initTable('subsidy-data-week',res.data.data.category,res.data.data.series[0].dataDecimal,'subsidy_all_amount_7',res.data.data.series[1].dataDecimal)
	        		};
	        	});
                //7日交易总笔数
				this.model.getTradeNum(data_7).then((res)=>{
	        		if (res.data.code==0){
					this.tableText='7日交易总笔数（笔）';
	        			this.initTable('number-data-week',res.data.data.category,res.data.data.series[0].dataLong,'trade_all_num_7',res.data.data.series[1].dataLong)
	        		};
	        	});
			},
			tradeAmountEchart_month(){
				let data_30={
					compareFlag:true,
					startDate:this.times.monthAgo,
					endDate:this.times.todayDate,
					activityID:this.id.activityID
				};
				 //7日交易金额
                (!this.id.activityID)? data_30.bankUuidString=sessionStorage.getItem('uuids'):data_30.bankUuidString='';
				this.model.getTradeAmount(data_30).then((res)=>{
	        		if (res.data.code==0){
	        			this.tableText='30日交易总金额（元）';
	        			this.initTable('trade-data-month',res.data.data.category,res.data.data.series[0].dataDecimal,'trade_all_amount_30',res.data.data.series[1].dataDecimal)
	        			};
	        		});
				 //7日补贴金额
				this.model.getSubsidyAmount(data_30).then((res)=>{
	        		if (res.data.code==0){
	        			this.tableText='30日补贴总金额（元）';
	        			this.initTable('subsidy-data-month',res.data.data.category,res.data.data.series[0].dataDecimal,'subsidy_all_amount_30',res.data.data.series[1].dataDecimal)
	        			};
	        		});
				 //7日交易总笔数
				this.model.getTradeNum(data_30).then((res)=>{
	        		if (res.data.code==0){
						this.tableText='30日交易总笔数（笔）';
	        			this.initTable('number-data-month',res.data.data.category,res.data.data.series[0].dataLong,'trade_all_num_30',res.data.data.series[1].dataLong)

	        			};
	        		});
			},
			// =================================================================================================
        	//交易区域 sucess
        	regionDetail(){
        		this.regionDetailReady();
        		this.regionDetailAmount();
        		this.regionDetailNumber();
        	},
        	regionDetailReady(){//交易区域数据获取
        		let data={
        			activityID:this.id.activityID
        		};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
        		this.model.getTradeAreaTotal(data).then((res)=>{
        			if (res.data.code==0){
        				this.$set('transactionRegion.tradeAreaModel',res.data.data);
        			}
        		});
        	},
        	regionDetailAmount(){//交易区域交易金额
        		this.regionDetailJudgeChoose='amount';
        		let data={
        			activityID:this.id.activityID
        		};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
        		this.model.getTradeAreaTotalAmountList(data).then((res)=>{
        			if (res.data.code==0){
        				this.transactionRegion.tradeArea=!res.data.data.category?this.transactionRegion.tradeArea=['0']:res.data.data.category;
        				this.transactionRegion.tradeAreaAmount=!res.data.data.series[0].dataDecimal?this.transactionRegion.tradeAreaAmount=['0']:res.data.data.series[0].dataDecimal;
        				this.tableText='交易区域交易金额（元）';
	        			this.initTable('trade-area-week',this.transactionRegion.tradeArea,res.data.data.series[0].dataDecimal,'trade_area_amount')
        			}
        		})

        	},
			regionDetailNumber(){//交易区域交易笔数
				this.regionDetailJudgeChoose='num';
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getTradeAreaNumList(data).then((res)=>{
        			if (res.data.code==0){
        				this.tableText='交易区域交易笔数（笔）';
	        			this.initTable('trade-area-month',res.data.data.category,res.data.data.series[0].dataLong,'trade_area_num')
        			}
        		})
			},
			// =================================================================================================
			//交易时段分析 sucess
			transactionTimeReady(){//交易时段加载数据
				let data={
        			activityID:this.id.activityID
				};
				let hours=["00:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00"];
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getTradePeriodTotal(data).then((res)=>{
					if (res.data.code==0){
						this.tableText='累计交易笔数（笔）';
						this.$set('transactionTime.timePoint',res.data.data.series);
						this.initTable('time-echart',hours,res.data.data.series,'trade_time')

        			}
				})
			},
			// =================================================================================================
			//商户数据分析
			merchantData(){
				this.merchantDataAreaReady();
				this.merchantDataTradeAmountChange();
				this.merchantDataTradeCountChange();
			},
			merchantDataAreaReady(){//商户关键数据
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getMerchantTradeTotal(data).then((res)=>{
					if (res.data.code==0){
						this.$set('merchantDataArea.merchantDataTotal',res.data.data);
					}
				})
			},
			merchantDataTradeAmountChange(){//商户数据交易金额
				this.merchantDataDetailJudgeName='amount';
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getMerchantTradeAmount(data).then((res)=>{
					if (res.data.code==0){
						this.merchantDataArea.storeName=!res.data.data.series[0].storeAndMerchantName?this.merchantDataArea.storeName=['0']:res.data.data.series[0].storeAndMerchantName;//商户数据名称
						this.merchantDataArea.tradeAmount=!res.data.data.series[0].dataDecimal?this.merchantDataArea.tradeAmount=['0']:res.data.data.series[0].dataDecimal;//商户数据刷卡金额
						this.tableText='商户数据交易金额（元）';
						this.initBar('merchant-echart-amount',this.merchantDataArea.storeName,this.merchantDataArea.tradeAmount,'merchant_trade_amount');
					}
				})
			},
			merchantDataTradeCountChange(){//商户数据交易笔数
				this.merchantDataDetailJudgeName='num';
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';

				this.model.getMerchantTradeCount(data).then((res)=>{
					if (res.data.code==0){
						this.merchantDataArea.storeName=!res.data.data.series[0].storeAndMerchantName?this.merchantDataArea.storeName=['0']:res.data.data.series[0].storeAndMerchantName;//商户数据名称
						this.merchantDataArea.tradeCount=!res.data.data.series[0].dataLong?this.merchantDataArea.tradeCount=['0']:res.data.data.series[0].dataLong;//商户数据刷卡笔数
						this.tableText='商户数据交易笔数（笔）';
						this.initBar('merchant-echart-num',this.merchantDataArea.storeName,this.merchantDataArea.tradeCount,'merchant_trade_num')
					}

				})
			},
			// =================================================================================================
			//卡BIN数据分析 success
			cardBINData(){
				this.cardBINDataAreaReady();
				this.cardBINDetailAmount();
				this.cardBINDetailNumber();
			},
			cardBINDataAreaReady(){//卡BIN数据分析获取数据
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getCardBINTotal(data).then((res)=>{
					if (res.data.code==0){
						this.$set('cardBINDataArea.CardBinModel',res.data.data);
        			}
				})
			},
			cardBINDetailAmount(){//卡BIN交易金额chenge
				this.cardBINDetailJudgeChoose='amount';
				let data={
        			activityID:this.id.activityID

				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getCardBINTradeAmountList(data).then((res)=>{
					if (res.data.code==0) {
						this.cardBINDataArea.tradeAmountCardBINChange=!res.data.data.series[0].dataDecimal[0]?this.cardBINDataArea.tradeAmountCardBINChange=['0']:res.data.data.series[0].dataDecimal;
						this.cardBINDataArea.binStartNumber=!res.data.data.series[0].storeAndMerchantName?this.cardBINDataArea.binStartNumber=['0']:res.data.data.series[0].storeAndMerchantName;
						this.tableText='卡BIN交易金额（元）';
						this.initBar('cardBIN-echart-amount',this.cardBINDataArea.binStartNumber,this.cardBINDataArea.tradeAmountCardBINChange,'cardBIN_trade_amount')
					}
				});
			},
			cardBINDetailNumber(){//卡BIN交易笔数change
				this.cardBINDetailJudgeChoose='num';
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getCardBINTradeNumList(data).then((res)=>{
					if (res.data.code==0) {
						this.cardBINDataArea.binStartNumber=!res.data.data.series[0].storeAndMerchantName?this.cardBINDataArea.binStartNumber=['0']:res.data.data.series[0].storeAndMerchantName;
						this.cardBINDataArea.tradeNumCardBINChange=!res.data.data.series[0].dataLong?this.cardBINDataArea.tradeNumCardBINChange=['0']:res.data.data.series[0].dataLong;
						this.tableText='卡BIN交易笔数（笔）';
						this.initBar('cardBIN-echart-num',this.cardBINDataArea.binStartNumber,this.cardBINDataArea.tradeNumCardBINChange,'cardBIN_trade_num')
					}

				});
				//cardBIN-echart
			},
			// =================================================================================================
			oneCard(){
				this.oneCardDataReady();
				this.oneCardDataOnceData();
			},
			oneCardDataReady(){//单卡获取total
				let data={
        			activityID:this.id.activityID
				};
				(!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getOneCardTotal(data).then((res)=>{
					if (res.data.code==0) {
						this.$set('oneCardArea.oneCardModel',res.data.data);
					}
				});
			},
			oneCardDataOnceData(){//获取单卡参与次数数据
				let data={
        			activityID:this.id.activityID
				};
                (!this.id.activityID)? data.bankUuidString=sessionStorage.getItem('uuids'):data.bankUuidString='';
				this.model.getOneCardSwipedCount(data).then((res)=>{
					if (res.data.code==0) {
						this.oneCardArea.oneCardNum=!res.data.data.series[0].dataLong?this.oneCardArea.oneCardNum=[0]:res.data.data.series[0].dataLong;//x轴
						this.oneCardArea.oneCardChance=!res.data.data.series[0].data?this.oneCardArea.oneCardChance=[0]:res.data.data.series[0].data;//y轴
						this.tableText='单卡参与次数（次）';
						this.initBar('one-echart-times',this.oneCardArea.oneCardChance,this.oneCardArea.oneCardNum,'oneCard_num')
					}
				})
			},
			outPDF(){
          		this.upID();
				let formdata = {};
	            _.map(this.id,(val,key)=>{
	            	formdata[key]=val;
	            })
	            this.$http.post(origin+'/pdf/analysis',formdata).then((res)=>{
	            		if(res.data.code==0){
	            			window.open(origin+'/pdf/downLoad?fileName='+res.data.data)
	            			
	            		}
	            })
				// window.open(+formdata)
			},
			upID(){
				//activityBaseInfo
				//tradeDataAnalysis
				(!this.id.activityID)?this.id.bankUuidString=sessionStorage.getItem('uuids'):null;
				var dataAnalysis=this.id.pdfMap.tradeDataAnalysis;
				dataAnalysis.today[0].startDate=this.times.todayDate;
				dataAnalysis.today[0].endDate=this.times.todayDate;
				dataAnalysis.today[0].uri=this.$API.getTradeDataTotal;
				dataAnalysis.total[0].uri=this.$API.getTradeDataTotal;
				dataAnalysis.tradeAmount_7[0].startDate=this.times.lastWeek;
				dataAnalysis.tradeAmount_7[0].endDate=this.times.todayDate;
				dataAnalysis.tradeAmount_7[0].base64IMG=this.base64.trade_all_amount_7;
				dataAnalysis.tradeAmount_7[0].uri=this.$API.getTradeAmount;
				dataAnalysis.tradeAmount_30[0].startDate=this.times.monthAgo;
				dataAnalysis.tradeAmount_30[0].endDate=this.times.todayDate;
				dataAnalysis.tradeAmount_30[0].base64IMG=this.base64.trade_all_amount_30;
				dataAnalysis.tradeAmount_30[0].uri=this.$API.getTradeAmount;
				dataAnalysis.subsidyAmount_7[0].startDate=this.times.lastWeek;
				dataAnalysis.subsidyAmount_7[0].endDate=this.times.todayDate;
				dataAnalysis.subsidyAmount_7[0].base64IMG=this.base64.subsidy_all_amount_7;
				dataAnalysis.subsidyAmount_7[0].uri=this.$API.getSubsidyAmount;
				dataAnalysis.subsidyAmount_30[0].startDate=this.times.monthAgo;
				dataAnalysis.subsidyAmount_30[0].endDate=this.times.todayDate;
				dataAnalysis.subsidyAmount_30[0].base64IMG=this.base64.subsidy_all_amount_30;
				dataAnalysis.subsidyAmount_30[0].uri=this.$API.getSubsidyAmount;
				dataAnalysis.tradeNum_7[0].startDate=this.times.lastWeek;
				dataAnalysis.tradeNum_7[0].endDate=this.times.todayDate;
				dataAnalysis.tradeNum_7[0].base64IMG=this.base64.trade_all_num_7;
				dataAnalysis.tradeNum_7[0].uri=this.$API.getTradeNum;
				dataAnalysis.tradeNum_30[0].startDate=this.times.monthAgo;
				dataAnalysis.tradeNum_30[0].endDate=this.times.todayDate;
				dataAnalysis.tradeNum_30[0].base64IMG=this.base64.trade_all_num_30;
				dataAnalysis.tradeNum_30[0].uri=this.$API.getTradeNum;
				// //tradeAreaAnalysis
				var areaAnalysis=this.id.pdfMap.tradeAreaAnalysis;
				areaAnalysis.keyData[0].uri=this.$API.getTradeAreaTotal;
				areaAnalysis.tradeAmountTop[0].base64IMG=this.base64.trade_area_amount;
				areaAnalysis.tradeAmountTop[0].uri=this.$API.getTradeAreaTotalAmountList;
				areaAnalysis.tradeNumTop[0].base64IMG=this.base64.trade_area_num;
				areaAnalysis.tradeNumTop[0].uri=this.$API.getTradeAreaNumList;
				// //tradePeriodAnalysis
				this.id.pdfMap.tradePeriodAnalysis.tradeNum[0].base64IMG=this.base64.trade_time;
				this.id.pdfMap.tradePeriodAnalysis.tradeNum[0].uri=this.$API.getTradeAreaNumList;
				// //merchantDataAnalysis
				var merchant=this.id.pdfMap.merchantDataAnalysis;
				merchant.keyData[0].uri=this.$API.getMerchantTradeTotal;
				merchant.amountTop[0].base64IMG=this.base64.merchant_trade_amount;
				merchant.amountTop[0].uri=this.$API.getMerchantTradeAmount;
				merchant.numTop[0].base64IMG=this.base64.merchant_trade_num;
				merchant.numTop[0].uri=this.$API.getMerchantTradeCount;
				// //cardBINDataAnalysis
				var cardBIN=this.id.pdfMap.cardBINDataAnalysis;
				cardBIN.keyData[0].uri=this.$API.getCardBINTotal;
				cardBIN.amountTop[0].base64IMG=this.base64.cardBIN_trade_amount;
				cardBIN.amountTop[0].uri=this.$API.getCardBINTradeAmountList;
				cardBIN.numTop[0].base64IMG=this.base64.cardBIN_trade_num;
				cardBIN.numTop[0].uri=this.$API.getCardBINTradeNumList;
				// //oneCardTradeAnalysis
				var oneCard=this.id.pdfMap.oneCardTradeAnalysis;
				oneCard.keyData[0].uri=this.$API.getOneCardTotal;
				oneCard.participateNum[0].base64IMG=this.base64.oneCard_num;
				oneCard.participateNum[0].uri=this.$API.getOneCardSwipedCount;
			},
			choosePDFOut(){
          		this.upID();
          		this.exportPdfData.pdfMap={};
				this.privileges=[
					{name:'活动基本信息',key:'activityBaseInfo',select:false,type:'activityBaseInfo',judge:'base_info'},
					{name:this.tableTitleChoose.sevenAmount,key:'tradeAmount_7',select:false,type:'tradeDataAnalysis',judge:'trade_1'},
					{name:this.tableTitleChoose.monthAmount,key:'tradeAmount_30',select:false,type:'tradeDataAnalysis',judge:'trade_1'},
					{name:this.tableTitleChoose.sevenSubsidy,key:'subsidyAmount_7',select:false,type:'tradeDataAnalysis',judge:'trade_1'},
					{name:this.tableTitleChoose.monthSubsidy,key:'subsidyAmount_30',select:false,type:'tradeDataAnalysis',judge:'trade_2'},
					{name:this.tableTitleChoose.sevenCount,key:'tradeNum_7',select:false,type:'tradeDataAnalysis',judge:'trade_2'},
					{name:this.tableTitleChoose.monthCount,key:'tradeNum_30',select:false,type:'tradeDataAnalysis',judge:'trade_2'},
					{name:'交易时段',key:'tradeNum',select:false,type:'tradePeriodAnalysis',judge:'time'},
					{name:'交易区域交易金额排行',key:'tradeAmountTop',select:false,type:'tradeAreaAnalysis',judge:'area'},
					{name:'交易区域交易笔数排行',key:'tradeNumTop',select:false,type:'tradeAreaAnalysis',judge:'area'},
					{name:'商户刷卡金额排行',key:'amountTop',select:false,type:'merchantDataAnalysis',judge:'merchant'},
					{name:'商户刷卡笔数排行',key:'numTop',select:false,type:'merchantDataAnalysis',judge:'merchant'},
					{name:'卡BIN刷卡金额排行',key:'amountTop',select:false,type:'cardBINDataAnalysis',judge:'cardBIND'},
					{name:'卡BIN刷卡笔数排行',key:'numTop',select:false,type:'cardBINDataAnalysis',judge:'cardBIND'},
					{name:'单卡参与次数',key:'participateNum',select:false,type:'oneCardTradeAnalysis',judge:'oneCard'},
				];
				this.chooseShow=true;
			},
			// kok(){
			// 	if(_.isEmpty(this.exportPdfData.pdfMap)){
			// 		this.chooseShow=false;				
			// 		return;
			// 	};
			// 	this.exportPdfData.activityID=this.id.activityID;
			// 	this.exportPdfData.bankUuidString=this.id.bankUuidString;
			// 	let formdata = {};
	  //           _.map(this.exportPdfData,(val,key)=>{
	  //           	formdata[key]=val;
	  //           });
	  //           this.$http.post(origin+'/pdf/analysis',formdata).then((res)=>{
	  //           		if(res.data.code==0){
	  //           			window.open(origin+'/pdf/downLoad?fileName='+res.data.data)
			// 				this.chooseShow=false;
			// 				this.exportPdfData.pdfMap={}
	  //           		}
	  //           });
			// },
			kok(postData,type){
				//
				if(_.isEmpty(postData.pdfMap)){//
					this.chooseShow=false;				
					return;
				};
				if(type=="choose"){
					postData.activityID=this.id.activityID;
					postData.bankUuidString=this.id.bankUuidString;
				}
				let formdata = {};
	            _.map(postData,(val,key)=>{
	            	formdata[key]=val;
	            });
	            this.$http.post(origin+'/pdf/analysis',formdata).then((res)=>{
	            		if(res.data.code==0){
	            			window.open(origin+'/pdf/downLoad?fileName='+res.data.data)
							this.chooseShow=false;
							postData={}
	            		}
	            });
			},
			changed(select,id){
                if(select){
                    this.saveID.statuses=_.concat(this.searchData.statuses,id);
                }else{
                    _.pullAll(this.saveID.statuses,id);
                }
            },
	        checked({select,type,key}){
	            if(select){
	                if(!this.exportPdfData.pdfMap[type]){
	                	this.exportPdfData.pdfMap[type]={};
	                	if(type=='activityBaseInfo'){
	                		this.exportPdfData.pdfMap[type]=this.id.pdfMap[type];
	                	}
	                	if(type=='tradeDataAnalysis'){
	                		this.exportPdfData.pdfMap[type]['today']=this.id.pdfMap.tradeDataAnalysis.today;
	                		this.exportPdfData.pdfMap[type]['total']=this.id.pdfMap.tradeDataAnalysis.total;
	                	};
	                	if(type=='tradeAreaAnalysis' || type=='merchantDataAnalysis' || type=='cardBINDataAnalysis' || type=='oneCardTradeAnalysis'){
	                		this.exportPdfData.pdfMap[type]['keyData']=this.id.pdfMap[type].keyData;
	                	}
	                }
	                this.exportPdfData.pdfMap[type][key]=this.id.pdfMap[type][key];
	            }else{
	                this.exportPdfData.pdfMap[type]=_.omit(this.exportPdfData.pdfMap[type], [key]);
	                if(_.isEmpty(_.omit(this.exportPdfData.pdfMap[type], ['today','total','keyData']))){
	                	this.exportPdfData.pdfMap=_.omit(this.exportPdfData.pdfMap, [type]);
	                }
	            }
	        }
		},
		ready(){
            this.tradeAnalysis();
            this.regionDetail();
            this.transactionTimeReady();
            this.merchantData();
            this.cardBINData();
            this.oneCard();
		},
        created(){
			this.dateGetShow();
			if(this.$route.params.pdfActivityId!=':pdfActivityId'){
				this.id.activityID=this.$route.params.pdfActivityId;
				this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id=this.$route.params.pdfActivityId;
				this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].uri= this.$API.getinfoList + this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id;
                if(this.$route.params.pdfActivityIds!=':pdfActivityIds'){
                    this.model.getinfoList(this.$route.params.pdfActivityIds).then((res)=>{
                        if(res.data.code===0){
                            this.$set('basicData',res.data.data.base);
                            let data={
                                uuid:this.basicData.uuid
                            }
                            this.model.getBankByUuid(data).then((res)=>{
                                if(res.data.code===0){
                                    this.shortName=res.data.data.shortName;
                                }
                            })
                        }
                    })
                }
			}else{
				this.id.activityID='';
				this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].id='';
				this.id.pdfMap.activityBaseInfo.activityBaseInfo[0].uri='';
				this.id.pdfMap=_.omit(this.id.pdfMap, ['activityBaseInfo']);
			}
		}
	}
</script>