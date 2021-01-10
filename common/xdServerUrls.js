// url路径
import xdConfig from './xdConfig.js';
const config = xdConfig.appConfig; // 配置

const serverBaseUrl=config.serverIp;//动态根据小程序类型自动获取接口地址
const serverUrls = { //根据接口具体配置
	// xd_register: serverBaseUrl + '/xxx', // 注册
	xd_login: serverBaseUrl + '/xxx', // 登录
	xd_logout: serverBaseUrl + '/xxx',
	// xd_change_pass: serverBaseUrl + '/xxxxx' ,// 修改密码
	
	xd_bannerList: serverBaseUrl + '/banner/bannerList' ,// banner广告
	xd_label: serverBaseUrl + '/label/getLabels' ,//标签
	xd_getLabelsById: serverBaseUrl + '/label/getLabelsById' ,//通过标签id获取标签信息
	xd_tacitlyPushPng: serverBaseUrl + '/publishTarget/tacitlyPushPng' ,//标签
	
	xd_saveCardReplayComment: serverBaseUrl + '/cardReplayComment/saveCardReplayComment' ,//保存打卡回复评论
	xd_saveCardComment: serverBaseUrl + '/cardComment/saveCardComment' ,//保存打卡评论
	xd_showCardComment: serverBaseUrl + '/cardComment/showCardCommentAndReplayCommtent' ,//评论和回复的展现
	xd_showUserCardCommentAndReplayCommtent: serverBaseUrl + '/cardComment/showUserCardCommentAndReplayCommtent' ,//通过用户id查询所有打卡详情、评论及评论回复
	
	// xd_saveGiveLikeByPush: serverBaseUrl + '/giveLike/saveGiveLikeByPush' ,//给行动项或打卡记录点赞
	xd_iSAttention: serverBaseUrl + '/attention/iSAttention' ,//判断该用户是否已经关注了
	xd_getAttentionList: serverBaseUrl + '/attention/getAttentionList' ,//获取关注列表
	xd_getFansList: serverBaseUrl + '/attention/getFansList' ,//获取粉丝列表
	xd_saveAttention: serverBaseUrl + '/attention/saveAttention' ,//保存关注
	xd_cancelAttention: serverBaseUrl + '/attention/cancelAttention' ,//取消关注
	xd_getLookerCountByUserId: serverBaseUrl + '/attention/getLookerCountByUserId' ,//根据用户id获取关注数量和粉丝数量
	
	xd_lookerPushListByUserId: serverBaseUrl + '/publishTarget/lookerPushListByUserId' ,//当前用户围观的行动项计划
	xd_pushByCreateTimeList: serverBaseUrl + '/publishTarget/pushByCreateTimeList' ,//根据创建时间获取目标列表
	xd_pushByHighGradeList: serverBaseUrl + '/publishTarget/pushByHighGradeList' ,//根据点赞数获取目标列表
	xd_pushByUserIdList: serverBaseUrl + '/publishTarget/pushByUserIdList' ,//根据用户id获取目标列表
	xd_savePush: serverBaseUrl + '/publishTarget/savePush' ,//保存发起的目标
	xd_pushByLabel: serverBaseUrl + '/publishTarget/pushByLabel' ,//根据标签获取行动项列表
	
	xd_uploadFile: serverBaseUrl + '/uploadFile/saveFiles' ,//上传图片
	
	xd_getLookerByPushId: serverBaseUrl + '/looker/getLookerByPushId' ,//根据行动项id查看围观人
	xd_saveLooker: serverBaseUrl + '/looker/saveLooker' ,//保存围观信息
	xd_cancelLooker: serverBaseUrl + '/looker/cancelLooker' ,//取消围观
	xd_getLookerByUserId: serverBaseUrl + '/looker/getLookerByUserId' ,//根据用户id获取围观数据
	xd_getLookerCountInfoByPushIdAndUserId: serverBaseUrl + '/looker/getLookerCountInfoByPushIdAndUserId' ,//根据行动项id和围观用户id查看点击数详情
	
	xd_wechatCommercialTenant: serverBaseUrl + '/wechatCommercialTenant/pay' ,//微信商户给用户付款pay
	xd_decodeUserInfo: serverBaseUrl + '/wechat/decodeUserInfo' ,//获取微信的openid和unionid
	xd_pay: serverBaseUrl + '/wechat/pay' ,//pay
	xd_resultCallBack: serverBaseUrl + '/wechat/resultCallBack' ,//decodeUserInfo

	xd_generalPay: serverBaseUrl + '/generalWechat/pay' ,//通用微信支付 pay
	
	
	xd_getImgIsNormal: serverBaseUrl + '/login/getImgIsNormal' ,//图片是否正常
	xd_modifyUserInfo: serverBaseUrl + '/login/modifyUserInfo' ,//修改用户的基础信息
	xd_weiXinLogin: serverBaseUrl + '/login/weiXinLogin' ,//微信登陆接口
	xd_getUserInfoByUserId: serverBaseUrl +'/login/getUserInfoByUserId',//根据用户id获取用户信息
	// GET /login/getAccessToken 获取token
	// GET /login/getContentIsNormal 内容是否正常
	
	xd_saveReplayComment: serverBaseUrl + '/replayPushComment/saveReplayComment' ,//行动项回复评论
	xd_saveComment: serverBaseUrl + '/pushComment/saveComment' ,//保存行动项评论
	xd_showCommentAndReplayCommtent: serverBaseUrl + '/pushComment/showCommentAndReplayCommtent' ,//评论和回复的展现
	
	xd_savePushCard: serverBaseUrl + '/publishCard/savePushCard' ,//保存打卡记录
	xd_pushCardListByPushId: serverBaseUrl + '/publishCard/pushCardListByPushId' ,//根据行动项id获取打卡列表
	
	xd_pushDataByPushId: serverBaseUrl + '/publishTarget/pushDataByPushId' ,//根据行动项id获取行动项信息
	xd_getUserInfoByUserId: serverBaseUrl + '/login/getUserInfoByUserId' ,//根据用户id获取用户信息
	xd_updatePushDataByPushId: serverBaseUrl + '/publishTarget/updatePushDataByPushId' ,//根据行动项id修改行动项信息
	
	xd_getContentIsNormal: serverBaseUrl + '/login/getContentIsNormal' ,//内容是否正常
	xd_getImgIsNormal: serverBaseUrl + '/login/getImgIsNormal' ,//内容是否正常
	xd_searchPushData: serverBaseUrl + '/publishTarget/searchPushData' ,//根据行动项名称搜索行动项
	
	xd_onOff: serverBaseUrl + '/config/onOff' ,//根据行动项名称搜索行动项
	xd_delPushDataByPushId: serverBaseUrl + '/publishTarget/delPushDataByPushId' ,//根据行动项id逻辑删除行动项信息
	xd_saveShareInfo: serverBaseUrl + '/share/saveShareInfo' ,//保存分享记录信息
	xd_getLookerByPushId: serverBaseUrl + '/looker/getLookerByPushId' ,//根据行动项id查看围观人
	
	xd_savefeedbackInfo: serverBaseUrl + '/feedback/savefeedbackInfo' ,//保存反馈信息
	
	xd_balanceOrderQuery: serverBaseUrl + '/balance/balanceOrderQuery' ,//余额订单查询
	xd_balanceWithdrawal: serverBaseUrl + '/balance/balanceWithdrawal' ,//余额提现
	xd_topUpBalance: serverBaseUrl + '/balance/topUpBalance' ,//余额充值
	xd_inquireBalance: serverBaseUrl + '/balance/inquireBalance' ,//余额查询
	xd_selectBurieStatistics: serverBaseUrl + '/burie/selectBurieStatistics' ,//获取埋点数据（新增关注数和新增围观分钱数）
	xd_updateBurieStatistics: serverBaseUrl + '/burie/updateBurieStatistics' ,//查看埋点数据后删除
	xd_updatePushDataByPushId: serverBaseUrl + '/publishTarget/updatePushDataByPushId' ,//根据行动项id修改行动项信息
	


	xd_saveSponsor: serverBaseUrl + '/sponsor/save' ,//保存打卡记录


	xd_saveSponsor: serverBaseUrl + '/sponsor/save' ,//保存赞助金
	xd_getActSponsor: serverBaseUrl + '/sponsor/getList' ,//获取赞助金列表
	xd_delSponsorCount: serverBaseUrl + '/sponsor/delSponsorCount' ,//支付无效删除sponsor


	xd_getInviteList: serverBaseUrl + '/invite/getInviteList' ,//查看埋点数据后删除
	xd_saveRedisByFree: serverBaseUrl + '/uploadFile/saveRedisByFree' ,//看激励视频免一次上传超100M
	

	xd_getVal: serverBaseUrl + '/sys/getVal' ,//获取通知
	xd_saveGratitude: serverBaseUrl + '/gratitude/saveGratitude' ,//感谢金分配
	
	xd_saveRoom: serverBaseUrl + '/room/saveRoom',//保存群组信息
	xd_selectList: serverBaseUrl + '/room/selectList',//群组列表信息
	xd_selectMsgList: serverBaseUrl + '/room/selectMsgList',//获取群消息
	xd_sendRoomMsg: serverBaseUrl + '/room/sendRoomMsg',//发送消息
	xd_myRoomByType: serverBaseUrl + '/room/myRoomByType',//我加入的和我创建的
	xd_saveRoomJoin: serverBaseUrl + '/room/saveRoomJoin',//加入群组	
	xd_currentStatusByRoom: serverBaseUrl + '/room/currentStatusByRoom',//查看用户在群状态	1群主 2群成员 3游客
	xd_quitByUserId: serverBaseUrl + '/room/quitByUserId',//退出小组
	
	xd_selectSHInfo: serverBaseUrl + '/Activity/select',//查询商户活动列表
	xd_baseSelectSHInfo: serverBaseUrl + '/Activity/baseSelect',//查询商户信息
	xd_updateSHInfo: serverBaseUrl + '/Activity/update',//更新商户信息
	xd_baseUpdateSHInfo: serverBaseUrl + '/Activity/baseUpdate',//更新商户信息
	xd_saveSHInfo: serverBaseUrl + '/Activity/save',//保存商户信息
	xd_baseSaveSHInfo: serverBaseUrl + '/Activity/baseSave',//保存商户信息
	xd_selectSHList: serverBaseUrl + '/Activity/selectList',//首页展示商户活动列表
	xd_joinActivity: serverBaseUrl + '/Activity/joinActivity',//加入活动
	xd_joinActivityUserList: serverBaseUrl + '/Activity/joinActivityUserList',//加入活动的人列表
	xd_checkList: serverBaseUrl + '/Activity/checkList',//审核列表
	xd_checkReason: serverBaseUrl + '/Activity/checkReason',//审核操作
	xd_getActivityByUserId: serverBaseUrl + '/Activity/getActivityByUserId',//加入的活动列表
	xd_selectByActivityId: serverBaseUrl + '/Activity/selectByActivityId',//根据活动id获取详情
}
export default {
	serverUrls,
	serverBaseUrl
}