<template>
	<view class="selfCenter">
		<usershow :list="userInfo" :guanzhu="guanzhu" :lookerCount="lookerCount" :likeCount="likeCount" v-on:clidtags='clidtags'
		 :userId="userId"></usershow>

		<view v-if="showInfo" class="userInfo-ly">
			<!-- 组名称 -->
			<view class="label-hint">提供</view>
			<view class="label-hint infos xd-rows">
				<input disabled="true" placeholder="为本群提供的信息" style="width: 100%;" :value="postInfo" />
				<text v-if="editInfo" class="text-cuIcon-right cuIcon-right"></text>
			</view>
			<!-- 组名称 -->
			<view class="label-hint" style="border-top: 1px solid #f0f0f0;">需要</view>
			<view class="label-hint infos xd-rows">
				<input disabled="true" placeholder="从本群获取到的信息" style="width: 100%;" :value="getInfo" />
				<text v-if="editInfo" class="text-cuIcon-right cuIcon-right"></text>
			</view>
		</view>

		<view class="actionInfo">
			<view class="tabbar bg-white">
				<view class="tab " :class="tab===1?'active':''" @click="tab=1">
					<text>行动 ({{total}})</text>
				</view>
				<view class="tab" :class="tab===2?'active':''" @click="tab=2">
					<text v-if="userId==user">围观的行动({{lookTotal}})</text>
					<text v-else>TA围观的行动({{lookTotal}})</text>
				</view>
			</view>
			<view class="actionTabList">
				<view class="actionMy" v-show="tab===1">
					<actionlist v-for="(item,index) in list" :key="index" :tab="tab" :showBut='1' :item='item' :index='index'
					 v-on:lookerClick="lookerClick" :userId="user" v-on:share="share"></actionlist>
				</view>
				<view class="actionLook" v-show="tab===2">
					<actionlist v-for="(item,index) in lookerList" :key="index" :tab="tab" :showBut='1' :item='item' :index='index'
					 v-on:lookerClick="lookerClick" :userId="user" v-on:share="share"></actionlist>
				</view>
			</view>
			<share
					ref="share" 
					:contentHeight="950"
				></share>
		</view>
	</view>
</template>

<script>
	import actionlist from "@/components/actionlist.vue"
	import usershow from "@/components/usershow.vue"
	import share from "@/components/share.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			usershow,
			actionlist,
			share
		},
		data() {
			return {
				shareImg:'',
				sharePath:'',
				scen:'',
				shareTitle:'',
				tab: 1, //行动，围观，收藏
				list: [],
				userId: '',
				roomId: "",
				postInfo: "",
				getInfo: "",
				editInfo: false,
				showInfo: false, //显示用户群信息
				user: uni.getStorageSync('id'),
				total: '',
				userInfo: '',
				lookerList: [],
				pushId: '',
				lookTotal: 0,
				lookerCount: 0,
				likeCount: 0,
				guanzhu: '关注'
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onShareAppMessage(res) {
			let that = this;
			if (res.from == "menu") {
				if(that.lookerList[0].userId == that.user){
					return that.xdUniUtils.xd_onShare('我没动力时,就想想围观分钱的你们','pages/selfCenter/selfView?pushId=' + that.userId);
				}else{
					return that.xdUniUtils.xd_onShare('你不加油,我们就围观分钱@'+that.userInfo.userName,'pages/selfCenter/selfView?pushId=' + that.userId);
				}
			} else {
				that.$refs.share.hideModal();
				return	that.xdUniUtils.xd_onShare(that.shareTitle,that.sharePath+'?'+that.scen,that.shareImg);
			}
		},
		//#ifdef MP-WEIXIN
		onShareTimeline() {
			let that = this;
			if(that.lookerList[0].userId == that.user||that.list[0].userId == that.user){
				return {
					title: '我没动力时,就想想围观分钱的你们',
					query: 'userId=' + that.userId,
					imageUrl: that.xdUniUtils.xd_randomImg(1),
				}
			}else{
				return {
					title: '你不加油,我们就围观分钱@'+that.userInfo.userName,
					query: 'userId=' + that.userId,
					imageUrl: that.xdUniUtils.xd_randomImg(1),
				}
			}
			
		
		},
		//#endif
		onShow() {
			if (this.showInfo) {
				this.getGroupUserInfo();
			}
		},
		onLoad(option) {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				menus: ['shareAppMessage']
			})
			//#endif
			this.userId = option.userId;
			this.roomId = option.roomId;
			this.showInfo = this.xdUniUtils.IsNullOrEmpty(option.showInfo) ? false : option.showInfo;
			this.getCardList();
			this.getLookerList();
			this.getUserInfo();
			this.getIsAttention();
			this.lookerCountData();
		},
		methods: {
			share(item,index){
				let that = this;
				that.shareImg=''
				that.scen=''
				that.sharePath=''
				that.shareTitle=''
				that.sharePath='/pages/index/action/action'
				if (!that.hasLogin) {
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				if(that.tab == 1){
					that.scen='pushId=' + that.list[index].id + '&share=' + uni.getStorageSync('id') +
							'&isopen=' + that.list[index].isopen
					that.shareImg=that.list[index].pictures[0] ? that.list[index].pictures[0] : that.xdUniUtils.xd_randomImg(1)
					if(that.list[index].challengeRmb>0){
						that.shareTitle=that.list[index].userId == that.user ? '我没动力时,就想想围观分钱的你们:' + that.list[index].pushCardCishuCount+
								that.list[index].content : '@' + that.list[index].userName + '你不加油,我们就围观分钱:' + that.list[index]
								.content
					}else{
						that.shareTitle=that.list[index].userId == that.user ? '我没动力时,就想想围观的你们:' + that.list[index].pushCardCishuCount+
								that.list[index].content : '我为@' + that.list[index].userName + '打Call:' + that.list[index]
								.content
					}
				}else if(that.tab == 2){
					that.scen='pushId=' + that.lookerList[index].id + '&share=' + uni.getStorageSync('id') + '&isopen=' + that.lookerList[index].isopen
					that.shareImg=that.lookerList[index].pictures[0] ? that.lookerList[index].pictures[0] : that.xdUniUtils.xd_randomImg(1)
					if(that.lookerList[index].challengeRmb>0){
						that.shareTitle=that.lookerList[index].userId == that.user ? '我没动力时,就想想围观分钱的你们:' + that.lookerList[index].pushCardCishuCount +
								 that.lookerList[index].content : '@' + that.lookerList[index].userName + '你不加油,我们就围观分钱:' +
								that.lookerList[index].content
					}else{
						that.shareTitle=that.lookerList[index].userId == that.user ? '我没动力时,就想想围观的你们:' + that.lookerList[index].pushCardCishuCount +
								 that.lookerList[index].content : '我为@' + that.lookerList[index].userName + '打Call:' +
								that.lookerList[index].content
					}
				}
				if(that.lookerList[index].pictures||that.list[index].pictures){
					that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);	
				}else{
					that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,"");	
				}
				
			},
			lookerCountData() {
				var that = this;
				that.xd_request_post(that.xdServerUrls.xd_getLookerCountByUserId, {
					userId: that.userId
				}, true).then(res => {
					if (res.resultCode == 0) {
						that.lookerCount = res.obj.lookerCount
						that.likeCount = res.obj.likeCount
					}
				})
			},
			clidtags(e) {
				if(this.guanzhu =='已关注'){
					this.xd_request_post(this.xdServerUrls.xd_cancelAttention,{
						userId: uni.getStorageSync('id'),
						attentionUserId: e.id,	
					},true).then(res=>{
						if(res.resultCode == 0){
							 this.guanzhu="关注"
							 uni.showToast({
							 	icon:'none',
							   title: '取消关注',
							 })
						}else{
							uni.showToast({
								icon:'none',
							  title: res.msg,
							})
						}
					})
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_saveAttention, {
					userId: uni.getStorageSync('id'),
					attentionUserId: e.id,

				}, true).then(res => {
					if (res.resultCode == 0) {
						this.guanzhu = "已关注"
						uni.showToast({
							icon: 'none',
							title: '关注成功',
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg,
						})
					}
				})
			},
			goPush(e) {
				uni.navigateTo({
					url: '../index/action/action?pushId=' + e
				});
			},
			//围观
			lookerClick: function(item, index) {
				var that = this;
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '../../login/login'
					});
					return false
				}
				that.userId = uni.getStorageSync('id');
				that.xd_request_post(that.xdServerUrls.xd_saveLooker, {

					pushId: item.id,
					lookUserId: that.userId,
				}, true).then(res => {

					if (res.resultCode == 0) {
						
						that.list[index].onlooker = true
						that.list[index].onlookerCount++;
						
						uni.showToast({
							title: '围观成功',
							duration: 1000,
							icon: 'none',
						})
					} else if (res.resultCode == 10015) {
						uni.showToast({
							title: '您已经围观了',
							duration: 1000,
							icon: 'none',
						})
					}


				})
			},
			getIsAttention() {
				if (this.userId == uni.getStorageSync('id')) {
					this.guanzhu = ''
				} else {
					this.xd_request_post(this.xdServerUrls.xd_iSAttention, {
							userId: uni.getStorageSync('id'),
							attentionUserId: this.userId,
						}, true)
						.then(res => {
							var data = res.obj;
							if (data) {
								this.guanzhu = '已关注'
							} else {
								this.guanzhu = '关注'
							}

						})
				}
			},

			getUserInfo() {
				this.xd_request_post(this.xdServerUrls.xd_getUserInfoByUserId, {
						userId: this.userId,
					}, true)
					.then(res => {
						this.userInfo = res.obj;
						// this.$set(this.userInfo,res.obj)
					})
			},
			getCardList() {
				this.xd_request_post(this.xdServerUrls.xd_pushByUserIdList, {
						token: uni.getStorageSync('token'),
						lookUserId: uni.getStorageSync('id'),
						userId: this.userId,
					}, true)
					.then(res => {
						this.list = this.timeStamp(res);
						this.total = res.obj.total;
					})
			},
			timeStamp(res) {
				let dataList = res.obj.list;
				for (var i = 0; i < res.obj.list.length; i++) {
					dataList[i].challengeRmb = Math.floor(dataList[i].challengeRmb / 100);
					if(dataList[i].pictures){
						dataList[i].pictures=dataList[i].pictures.split(',')
						
					}else{
						dataList[i].pictures=[]
					}
				}
				return dataList;
			},
			getLookerList() {
				this.xd_request_post(this.xdServerUrls.xd_lookerPushListByUserId, {
						userId: this.userId,
						pageNum: 1,
						pageSize: 20,
					}, true)
					.then(res => {
						this.lookerList = this.timeStamp(res);
						this.lookTotal = res.obj.total
						// this.lookerList.forEach(function(item) {
						// 	if (typeof item.pictures === 'undefined' || item.pictures == '') {
						// 		item.pictures = '../../static/images/icon/img/title1.png'
						// 	} else {
						// 		if (item.pictures.indexOf(",") > -1) {
						// 			item.pictures = item.pictures.split(",")[0]
						// 		}
						// 	}
						// })

					})
			},
			//查询用户在本群的提供和需要信息
			getGroupUserInfo() {
				let info = {
					type: 2,
					roomId: this.roomId,
					userId: this.userId
				}
				if (uni.getStorageSync('id') == this.userId) {
					this.editInfo = true;
				}
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_myRoomByType, info, true).then((res) => {
					console.log("这个人小组信息", res);
					let userGroupInfo = res.obj.list[0];
					_this.postInfo = _this.xdUniUtils.IsNullOrEmpty(userGroupInfo.offer) ? "" : userGroupInfo.offer;
					_this.getInfo = _this.xdUniUtils.IsNullOrEmpty(userGroupInfo.need) ? "" : userGroupInfo.need;
				}).catch(err => {});
			},

		},
	}
</script>

<style lang="scss">
	.selfCenter {
		padding: 0 20rpx;
	}

	.text-cuIcon-right {
		font-size: 10px;
		margin-top: 6px;
	}

	.userInfo-ly {
		background-color: #FFFFFF;

		.label-hint {
			font-size: 12px;
			padding: 10px;
			width: 100%;
		}

		.infos {
			background-color: #FFFFFF;
			width: 100%;
			font-size: 14px;
		}
	}

	.actionInfo {
		margin: 15rpx 0;

		.tabbar {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;

			.tab {
				flex: 1;
				text-align: center;
				border-bottom: 1px solid #d9d9d9;
				padding: 16rpx;

				&.active {
					border-bottom: 1px solid #fd5107;
					color: #fd5107;
				}
			}
		}
	}
</style>
