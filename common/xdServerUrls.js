// url路径
import xdConfig from './xdConfig.js';
const config = xdConfig.appConfig; // 配置
const serverBaseUrl = `${config.serverProtocal}://${config.serverIp}`;//:${config.serverPort}`;//${config.serverName}`;  基本路径
const serverUrls = { //根据接口具体配置
	xd_register: serverBaseUrl + '/xxx', // 注册
	xd_login: serverBaseUrl + '/xxx', // 登录
	xd_logout: serverBaseUrl + '/xxx',
	xd_change_pass: serverBaseUrl + '/xxxxx' ,// 修改密码
	
	xd_bannerList: serverBaseUrl + '/banner/bannerList' ,// banner广告
	xd_label: serverBaseUrl + '/label/getLabels' ,//标签
	
	xd_saveCardReplayComment: serverBaseUrl + '/cardReplayComment/saveCardReplayComment' ,//保存打卡回复评论
	xd_saveCardComment: serverBaseUrl + '/cardComment/saveCardComment' ,//保存打卡评论
	xd_showCardComment: serverBaseUrl + '/cardComment/showCardCommentAndReplayCommtent' ,//评论和回复的展现
	xd_showUserCardCommentAndReplayCommtent: serverBaseUrl + '/cardComment/showUserCardCommentAndReplayCommtent' ,//通过用户id查询所有打卡详情、评论及评论回复
	
	xd_saveGiveLikeByPush: serverBaseUrl + '/giveLike/saveGiveLikeByPush' ,//给行动项或打卡记录点赞
	xd_getAttentionList: serverBaseUrl + '/attention/getAttentionList' ,//获取关注列表
	xd_saveAttention: serverBaseUrl + '/attention/saveAttention' ,//保存关注
	
	xd_lookerPushListByUserId: serverBaseUrl + '/publishTarget/lookerPushListByUserId' ,//当前用户围观的行动项计划
	xd_pushByCreateTimeList: serverBaseUrl + '/publishTarget/pushByCreateTimeList' ,//根据创建时间获取目标列表
	xd_pushByHighGradeList: serverBaseUrl + '/publishTarget/pushByHighGradeList' ,//根据点赞数获取目标列表
	xd_pushByUserIdList: serverBaseUrl + '/publishTarget/pushByUserIdList' ,//根据用户id获取目标列表
	xd_savePush: serverBaseUrl + '/publishTarget/savePush' ,//保存发起的目标
	xd_pushByLabel: serverBaseUrl + '/publishTarget/pushByLabel' ,//根据标签获取行动项列表
	
	xd_uploadFile: serverBaseUrl + '/uploadFile/saveFiles' ,//上传图片
	
	xd_getLookerByPushId: serverBaseUrl + '/looker/getLookerByPushId' ,//根据行动项id查看围观人
	xd_saveLooker: serverBaseUrl + '/looker/saveLooker' ,//保存围观信息
	xd_getLookerByUserId: serverBaseUrl + '/looker/getLookerByUserId' ,//根据用户id获取围观数据
	
	xd_wechatCommercialTenant: serverBaseUrl + '/wechatCommercialTenant/pay' ,//微信商户给用户付款pay
	xd_decodeUserInfo: serverBaseUrl + '/wechat/decodeUserInfo' ,//获取微信的openid和unionid
	xd_pay: serverBaseUrl + '/wechat/pay' ,//pay
	xd_resultCallBack: serverBaseUrl + '/wechat/resultCallBack' ,//decodeUserInfo
	
	xd_getImgIsNormal: serverBaseUrl + '/login/getImgIsNormal' ,//图片是否正常
	xd_modifyUserInfo: serverBaseUrl + '/login/modifyUserInfo' ,//修改用户的基础信息
	xd_weiXinLogin: serverBaseUrl + '/login/weiXinLogin' ,//微信登陆接口
	// GET /login/getAccessToken 获取token
	// GET /login/getContentIsNormal 内容是否正常
	
	xd_saveReplayComment: serverBaseUrl + '/replayPushComment/saveReplayComment' ,//行动项回复评论
	xd_saveComment: serverBaseUrl + '/pushComment/saveComment' ,//保存行动项评论
	xd_showCommentAndReplayCommtent: serverBaseUrl + '/pushComment/showCommentAndReplayCommtent' ,//评论和回复的展现
	
	xd_savePushCard: serverBaseUrl + '/publishCard/savePushCard' ,//保存打卡记录
	xd_pushCardListByPushId: serverBaseUrl + '/publishCard/pushCardListByPushId' ,//根据行动项id获取打卡列表
	
}
export default {
	serverUrls,
	serverBaseUrl
}
