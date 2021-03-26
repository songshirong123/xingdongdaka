<template>
	<view>
		<usershow :list="userInfos" :userId="id" :guanzhu="guanzhu" :looktotals="looktotals" :lookerCount="lookerCount"
		 :likeCount="likeCount" :newFans="newFans" v-on:clidtags='clidtags' :num="num" v-on:clickMe="clickMe" :isEditInfo='true'></usershow>
		<view class="moreInfo">
			<view class="moreInfoRow2">
				<view class="user_column_item" @tap="gomessage">
					    <button class='content cu-btn' open-type="msgcount">
						      <text class="lg text-gray cuIcon-mail" style="color: red;"></text>
						      <text class='thin'>消息提醒 <text v-if="unreadMsg !== 0" style="margin-left: 200px; background-color: #ff6600; color: #fff; display: inline-block; border-radius: 5px; width: 20px;">{{unreadMsg}}</text> </text>
						    </button>
				</view>
				<view class="user_column_item" @tap="gomoney">
					<button class='content cu-btn'>
						      <text class="lg text-gray cuIcon-moneybag"></text>
						      <text class='thin'>钱包</text>
						<text class="lg text-orange cuIcon-pay margin-left-lg">{{rmb}}元</text>
						<view class="cu-tag  tag-text1 bg-red" v-if="wg_num>0&&wg_num<100">{{wg_num}}</view>
						<view class="cu-tag  tag-text1 bg-red" v-if="wg_num>=100">99+</view>
						    
					</button>
				</view>
				<view class="user_column_item">
					    <button class='content cu-btn' open-type="feedback">
						      <text class="lg text-gray cuIcon-question"></text>
						      <text class='thin'>问题反馈</text>
						    </button>
				</view>
				<view class='user_column_item'>
					<button class="content cu-btn" open-type="contact">
						<view class="text-lg">
							<text class="lg text-gray cuIcon-service"></text>
						</view>
						<text class="thin">联系客服</text>
					</button>
				</view>

				<view v-if="showHzGroup"  class="user_column_item"  @tap="gogroup">
					    <button class='content cu-btn'>
						      <text class="lg text-gray cuIcon-group"></text>
						      <text class='thin'>互助小圈</text>
						  </button>
				</view>
				<view class="user_column_item"  @tap="merchant">
					    <button class='content cu-btn'>
						      <text class="lg text-gray cuIcon-group"></text>
						      <text class='thin'>高级权限</text>
						    </button>
				</view>

				<!-- <view class="user_column_item"  @tap="goranking">
				    <button class='content cu-btn'>
				      <text class="lg text-gray cuIcon-group"></text>
				      <text class='thin'>挑战赛</text>
				    </button>
				</view> -->
			</view>
		</view>
	</view>
</template>

<script>
	import usershow from "@/components/usershow.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		components: {
			usershow

		},
		data() {
			return {
				tab: 0, //行动，围观，收藏
				// list: [1, 2, 3, 4, 5],
				userInfos: '',
				looktotals: 0,
				lookerCount: 0,
				likeCount: 0,
				num: 0, //关注新增数量
				wg_num: 0, //围观分钱新增数量
				// onOff: true,
				// env:uni.getStorageSync('env'),
				rmb: 0.00,
				unreadMsg:0, //未读消息数
				newFans: 0, //新增粉丝数
				id: uni.getStorageSync('id'),
				userId: '',
				guanzhu: '',
				userBean: {},
				showHzGroup: this.xdUniUtils.showHzGroup(),
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		onShow() {
			if (!this.hasLogin) {
				return this.xdUniUtils.xd_login(this.hasLogin);
			}
			if (this.userInfos == '' || this.userInfos == undefined || this.userInfos == null) {
				try {
					this.userInfos = uni.getStorageSync('userInfo')
				} catch (e) {
					console.log(Error)
				};

			}
			this.getBalance();
			this.lookerCountData();
			this.burieInit();
			this.getShowFollow();
			this.getUnreadMsgCount(this.id);
			this.getLikeCount(uni.getStorageSync('token'), this.id);
		},

		onLoad() {
			this.onToOff();
		},
		watch: {
			userInfo() {
				this.userInfos = '';
				setTimeout(() => {
					this.userInfos = this.xdUniUtils.xd_getStorageSync('userInfo');
				}, 100);
			},

		},
		methods: {
			// 获取粉丝数量
			getLikeCount(token,userId) {
				var that = this
				wx.request({
				  url: 'http://39.106.107.255:10065/attention/getLookerCountByUserId', //仅为示例，并非真实的接口地址
				  data: {
					token,
				    userId
				  },
				  header: {
				    // 'content-type': 'application/json' // 默认值
					'content-type': 'application/x-www-form-urlencoded'
				  },
				  method: 'POST',
				  success: function(res) {
				    console.log(res.data)
					// console.log(that)
					var count = res.data.obj.likeCount
					that.$data.likeCount = count
				  }
				})
			},
			// 获取未读消息数量
			getUnreadMsgCount(userId) {
				var that = this
				wx.request({
				  url: 'http://39.106.107.255:10065/msg/getUnreadMsgCount', //仅为示例，并非真实的接口地址
				  data: {
				     userId
				  },
				  header: {
				    'content-type': 'application/json' // 默认值
				  },
				  method: 'GET',
				  success: function(res) {
				    console.log(res.data)
					var newFans = res.data.obj.attention.unreadcount
					var count = res.data.obj.comment.unreadcount /*+ res.data.obj.like.unreadcount */+ res.data.obj.looker.unreadcount + res.data.obj.replay.unreadcount
					console.log(count)
					that.$data.unreadMsg = count,
					that.$data.newFans = newFans
				  }
				})
			}
			,
			...mapMutations(['logOut']),
			async getBalance() {
				if (!uni.getStorageSync('token')) {
					return this.xdUniUtils.xd_login(false);
				}
				this.xd_request_post(this.xdServerUrls.xd_inquireBalance, {
					token: uni.getStorageSync('token'),
				}, true).then((res) => {
					
					if (typeof res.obj.rmb !== undefined) {
						this.rmb = res.obj.rmb / 100;
					}
					this.userBean = res.obj.userBean;
				})
			},
			getShowFollow() {
				this.xd_request_post(this.xdServerUrls.xd_getInviteList, {
						token: uni.getStorageSync('token'),

					},
					true
				).then((res) => {
					this.looktotals = res.obj.total;
				}).catch(err => {});
			},
			burieInit() {
				this.xd_request_post(this.xdServerUrls.xd_selectBurieStatistics, {}, true).then((res) => {
					if (res.resultCode == 0) {
						let gz_num = res.obj.gzCount;
						let wg_num = res.obj.wgCount;
						this.num = gz_num;
						this.wg_num = wg_num;
						let num = gz_num + wg_num;
						if(num==null||num==undefined){
							that.xdUniUtils.xd_login(true);
						}
						this.xdUniUtils.updateNumber(0);
					}
				})

			},
			onToOff() {
				const accountInfo = wx.getAccountInfoSync();
				// env类型
				const env = accountInfo.miniProgram.envVersion;

				this.onOff = (env != 'release' ? true : false)

			},
			//审核权限
			merchant() {
				// uni.navigateTo({
				// 	url: '../pageA/merchant/merchantPay'
				// });
				
				let userBean = this.userBean;
				if (!this.xdUniUtils.IsNullOrEmpty(userBean)) {
					let merchantType = userBean.merchantType;
					if (merchantType == 0) {
						uni.showModal({
							title: '温馨提示',
							content: '您尚未开通审核权限，是否开通？',
							confirmText: "去开通",
							cancelText: "暂不开通",
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '../pageA/merchant/merchantPay'
									});
								}
							},
						});
					} else if (merchantType == 1) {
						uni.navigateTo({
							url: '../pageA/merchant/merchant'
						});
					}
				}
			},
			//去互助小组列表
			gogroup() {
				uni.navigateTo({
					url: '../pageA/group/groupList'
				});
			},
			//我的挑战赛页面
			goranking() {
				uni.navigateTo({
					url: '../pageA/ranking/rankinglist'
				});
			},
			//去提现
			gomoney() {

				uni.navigateTo({
					url: './income'
				});
			},
			// 跳转消息提醒页面
			gomessage() {
				uni.navigateTo({
					url: './message'
				});
			},
				
			goPage(url) {
				uni.navigateTo({
					url
				});
			},
			lookerCountData: function(list) {
				var that = this;
				if (!that.hasLogin) {
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				that.userId = uni.getStorageSync('id');
				that.xd_request_post(that.xdServerUrls.xd_getLookerCountByUserId, {
					userId: that.userId
				}, false).then(res => {

					if (res.resultCode == 0) {

						that.lookerCount = res.obj.lookerCount
						that.likeCount = res.obj.likeCount
					} else {
						console.log(res)
					}
				})
			},
			clickMe: function() {
				let that = this;
				wx.getSetting({
					success: res => {

						if (res.authSetting['scope.userInfo']) {
							that.xd_request_post(that.xdServerUrls.xd_pay, {
								unionId: that.userInfos.unionId,
								openid: that.userInfos.openId,
								userName: that.userInfos.nickName,
								id: uni.getStorageSync('id'),
								token: uni.getStorageSync('token'),
								userHead: that.userInfos.avatarUrl,
								city: that.userInfos.city,
								province: that.userInfos.province,
								payRmb: 1,
								pushId: 1,

							}, true).then(res => {

								uni.requestPayment({
									'appId': res.obj.appId,
									'timeStamp': res.obj.timeStamp,
									'nonceStr': res.obj.nonceStr,
									'package': res.obj.packageAlias,
									'signType': 'MD5',
									'paySign': res.obj.paySign,
									success: function(res) {
										that.xd_request_post(that.xdServerUrls.xd_resultCallBack, {}, false).then(res => {})
										uni.showToast({
											title: '微信支付成功',
											icon: 'success',
											duration: 1500
										});
										uni.reLaunch({
											url: '../index/index'
										})
									},
									fail: function(err) {
										// 支付失败的回调中 用户未付款
										uni.showModal({
											content: '支付取消',
											confirmText: '继续支付',
											cancelText: '返回首页',
											image: '/static/images/icon/clock.png',
											success: function(res) {
												if (res.confirm) {
													return false
												} else if (res.cancel) {
													uni.reLaunch({
														url: '../index/index',
													})
												}
											},

										});
									}
								});
							})

						} else {
							this.logOut();
							uni.navigateTo({
								url: '../login/login'
							});
						}
					}
				})


			},
		},
		// components:{
		// 	actionlist
		// }
	}
</script>

<style lang="scss">
	.selfCenter {
		padding: 10rpx 20rpx 20rpx;
	}

	.moreInfo {
		padding: 6rpx 0;
		font-size: 26rpx;

		.user_column_item {
			background-color: #FFFFFF;
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 20rpx;
			border-bottom: 1px solid #F0F0F0;
		}

		.user_column_item .cu-btn {
			background-color: #FFFFFF;
			padding: 0;
		}

		.user_column_item .thin {
			padding: 0 16rpx;
		}

		.tag-text1 {
			border-radius: 200rpx;
			font-size: 20rpx;
			padding: 0rpx 10rpx;
			height: 28rpx;
			color: #ffffff;
			margin-bottom: 14rpx;
		}
	}

	.actionInfo {
		margin: 24rpx 0;

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
