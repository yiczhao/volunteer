export default function install(Vue) {
    var _o={};

    //- todo 活动分析pdf导出 data_analysis
    /**
     * @description 交易数据分析获取某个时间段的累计关键数据信息
     * @author 赵勇
     * @method POST
     */
    _o.getTradeDataTotal = './transfer/data_analysis/das/api/v1/trade_data/total';
    /**
     * @description 交易数据分析获取某个时间段的交易总金额集合
     * @author 赵勇
     * @method POST
     */
    _o.getTradeAmount = './transfer/data_analysis/das/api/v1/trade_data/trade_amount/list';
    /**
     * @description 交易数据分析获取某个时间段的补贴总金额集合
     * @author 赵勇
     * @method POST
     */
    _o.getSubsidyAmount = './transfer/data_analysis/das/api/v1/trade_data/subsidy_amount/list';
    /**
     * @description 交易数据分析获取某个时间段的交易总笔数集合
     * @author 赵勇
     * @method POST
     */
    _o.getTradeNum = './transfer/data_analysis/das/api/v1/trade_data/trade_num/list';
    /**
     * @description 交易区域获取累计关键数据信息
     * @author 赵勇
     * @method POST
     */
    _o.getTradeAreaTotal = './transfer/data_analysis/das/api/v1/trade_area/total';
    /**
     * @description 交易区域获取交易金额排行
     * @author 赵勇
     * @method POST
     */
    _o.getTradeAreaTotalAmountList = './transfer/data_analysis/das/api/v1/trade_area/trade_amount/hot_list';
    /**
     * @description 交易区域获取交易笔数排行
     * @author 赵勇
     * @method POST
     */
    _o.getTradeAreaNumList = './transfer/data_analysis/das/api/v1/trade_area/trade_num/hot_list';
    /**
     * @description 交易时段分析
     * @author 赵勇
     * @method POST
     */
    _o.getTradePeriodTotal = './transfer/data_analysis/das/api/v1/trade_period/total';
    /**
     * @description 商户数据累计关键数据
     * @author 赵勇
     * @method POST
     */
    _o.getMerchantTradeTotal = './transfer/data_analysis/das/api/v1/merchant_data/total';
    /**
     * @description 商户数据获取交易金额
     * @author 赵勇
     * @method POST
     */
    _o.getMerchantTradeAmount = './transfer/data_analysis/das/api/v1/merchant_data/trade_amount';
    /**
     * @description 商户数据获取交易笔数
     * @author 赵勇
     * @method POST
     */
    _o.getMerchantTradeCount = './transfer/data_analysis/das/api/v1/merchant_data/trade_count';
    /**
     * @description 卡BIN获取卡BIN累计关键数据信息
     * @author 赵勇
     * @method POST
     */
    _o.getCardBINTotal = './transfer/data_analysis/das/api/v1/card_bin/total';
    /**
     * @description 卡BIN获取卡BIN交易金额排行
     * @author 赵勇
     * @method POST
     */
    _o.getCardBINTradeAmountList = './transfer/data_analysis/das/api/v1/card_bin/trade_amount/hot_list';
    /**
     * @description 卡BIN获取卡BIN交易笔数排行
     * @author 赵勇
     * @method POST
     */
    _o.getCardBINTradeNumList = './transfer/data_analysis/das/api/v1/card_bin/trade_num/hot_list';
    /**
     * @description 单卡获取关键数据
     * @author 赵勇
     * @method POST
     */
    _o.getOneCardTotal = './transfer/data_analysis/das/api/v1/one_card/total';
    /**
     * @description 单卡获取单卡参与次数数据
     * @author 赵勇
     * @method POST
     */
    _o.getOneCardSwipedCount = './transfer/data_analysis/das/api/v1/one_card/swiped_count';
    /**
     * @description 查询活动所有数据
     * @author 赵勇
     * @method POST
     */
    _o.getinfoList = './transfer/activity_configure/api/v1/activity/view/';
    /**
     * @description 交易查询导出
     * @author 赵勇
     * @method POST
     */
    _o.tradeSearchExport = '/transfer/data_analysis/das/api/v1/trade_query/statistics/list/excel/export?';
    /**
     * @description 交易明细导出
     * @author 赵勇
     * @method POST
     */
    _o.tradeDetailExport = '/transfer/data_analysis/das/api/v1/trade_query/detail/list/excel/export?';
    /**
     * @description 上传
     * @author 赵勇
     * @method POST
     */
    _o.uploadExcel = '/bams/v1/upload/up_files_info';
    /**
     * @description 权益查询导出
     * @author 赵勇
     * @method POST
     */
    _o.latinosSearchExcel = '/transfer/activity_configure/api/v1/coupon/list/excel/export?';
    /**
     * @description 权益明细导出
     * @author 赵勇
     * @method POST
     */
    _o.latinosDetailExcel = '/transfer/activity_configure/api/v1/coupon/detail/list/excel/export?';

    Object.defineProperties(Vue.prototype, {
        $API: {get(){return _o}}
    })
}
