<template>
	<view>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="text-content margin-top-sm padding-bottom-sm" style="border-bottom: 1upx solid #ddd;">
					<text class="text-orange">{{activity.statusName}}</text>
					<view class="xd-rows">
						<text class="cu-tag light bg-red radius">保证金：￥{{activity.baoZhengJin}}</text>
						<text style="margin-left: 3px;">{{activity.labels}}</text>
					</view>
					<view class="xd-rows">
						<text style="font-size: 10px;color: #999999;">截止日期：{{activity.activityEndTime}} 计划天数：{{activity.planDay}} 可休假天数：{{activity.holidayDay}}</text>
					</view>
					<view style="height: 7px;"></view>
				</view>
				<view class="text-contents contentext">
					<text style="font-size: 14px;font-weight: 700;">{{activity.activityContent}}</text>
				</view>
				<view class="grid flex-sub padding-lr" style="margin-top: 5px;margin-bottom: 5px;">
					<image class="bg-img imgheit" :src="activity.imgs" mode="aspectFill" @tap="goPageImgHD(activity.imgs)">
					</image>
				</view>
				<view class="flex padding-sm">
					<view @click="merchant" style="flex: 1;" class="xd-rows">
						<text class="lg text-black cuIcon-friendfavor" style="margin-top: 2px;"></text>
						<text style="margin-left: 3px;">我要发布</text>
					</view>
					<view style="flex: 1;justify-items: center;justify-content: center;" class="xd-rows">
						<text class="lg text-black cuIcon-forward" style="margin-top: 2px;"></text>
						<text style="margin-left: 3px;">分享活动</text>
					</view>
					<view style="flex: 1;justify-items: flex-end;justify-content: flex-end;" class="xd-rows">
						<text class="lg text-black cuIcon-friendfavor" style="margin-top: 2px;"></text>
						<text style="margin-left: 3px;" @tap="addActivity(activity)">参与活动 {{activity.joinCount}}</text>
					</view>

				</view>
			</view>
		</view>
		<view class="actionInfo">
			<view class="tabbar bg-white">
				<view class="tab " :class="tab===0?'active':''" @click="tabs(0)">参与行动</view>
				<view class="tab" :class="tab===1?'active':''" @click="tabs(1)">参与者</view>
			</view>
		</view>
		<block v-if="tab==0" v-for="(userlist, index) in activityByUserId" :key="index">
			<view class="cu-card dynamic">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' +userlist.userHead + ')'}" @tap="goPageImg(userlist.userHead)"></view>
							<!-- class="content flex-sub" -->
							<view class="xd-columns" style="position: absolute;left: 146upx;">
								<view>{{userlist.userName}}</view>
								<!-- 打卡地址 -->
								<view class="text-gray text-sm flex justify-between" style="color: #1cbbb4;font-size: 8px;">
									{{userlist.province}}
								</view>
							</view>
						</view>
					</view>
					<view class="text-content cu-item margin-top-sm">
						<text class="text-orange">{{userlist.statusName}}</text>
						<view class="xd-rows">
							<text class="cu-tag light bg-red radius">保证金：￥{{activity.baoZhengJin}}</text>
							<text style="margin-left: 3px;">{{activity.labels}}</text>
						</view>
						<view class="xd-rows">
							<text style="font-size: 10px;color: #999999;">截止日期：{{activity.activityEndTime}} 计划天数：{{activity.planDay}} 可休假天数：{{activity.holidayDay}}</text>
						</view>
					</view>
					<view class="text-contents contentext">
						<text style="font-size: 14px;font-weight: 700;">{{activity.activityContent}}</text>
					</view>
					<view class="grid flex-sub padding-lr" style="margin-top: 5px;margin-bottom: 5px;">
						<image class="bg-img imgheit" :src="activity.imgs" mode="aspectFill" @tap="goPageImgHD(activity.imgs)">
						</image>
					</view>
				</view>

			</view>
		</block>

		<view v-if="tab==1" v-for="(attention,index) in activityUserList" @tap="selectGroup(item)" :key="index">
			<view class="ali-main bg-white">
				<view class="ali-main-img">
					<image class='xd-mag' :src="attention.userHead"></image>
				</view>
				<view class="lli-main-content">
					<view class="xd-list-title-text">
						<text>{{attention.userName}}</text>
					</view>
					<view class="moreInfoIn">
						<image class='address' src="/static/images/icon/address.png"></image>
						<text class="province">{{attention.province}}.{{attention.city}}</text>
					</view>
				</view>
				<view class="ali-main-list">
					<view class="ali-main-list-num">共打卡{{attention.pushCard}}次</view>
				</view>
			</view>

		</view>


	</view>
</template>

<script>
	export default {
		data() {
			return {
				tab: 1,
				pageNum: 1,
				activity: {},
				activityId: "",
				activityByUserId: [],
				activityUserList: []
			}
		},
		methods: {
			//添加活动
			addActivity(event) {
				if (event.status == 1)
					return this.xdUniUtils.showToast(false, "活动已结束！", "");

				this.addActivityToUser(event);
				// let _this = this;
				// uni.showModal({
				// 	title: '温馨提示',
				// 	content: "您确定要加入该活动吗？？",
				// 	showCancel: true,
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			_this.addActivityToUser(event);
				// 		}
				// 	}
				// });
			},
			//加入活动
			addActivityToUser(event) {
				let _this = this;
				let info = {
					activityId: event.id,
					userId: uni.getStorageSync('id'),
					token: uni.getStorageSync('token')
				}
				this.xd_request_get(this.xdServerUrls.xd_joinActivity, info, true).then((res) => {

					console.log("加入活动")
					console.log(res)
					if (res.resultCode == "10000") {
						_this.xdUniUtils.showToast(false, res.obj, "");
					} else if (res.resultCode == "10038") {
						_this.xdUniUtils.showToast(false, res.msg, "");
					} else {
						let objs = res.obj;
						objs.activityEndTime =event.activityEndTime;
						objs.baozhengjin =event.baozhengjin;
						uni.navigateTo({
							url: "./merchantActionEdit?actionid=" + event.id + "&fromInfo=" + JSON.stringify(objs)
						})
						// _this.savePush(res.obj, event);
					}
				}).catch(err => {});
			},
			savePush(saveData, event) {

				let info = {
					label: saveData.label,
					content: saveData.content,
					dongLi: "",
					xinXin: "",
					isopen: saveData.isopen,
					subscribeType: saveData.subscribeType,
					targetDay: saveData.targetDay,
					holidayDay: saveData.holidayDay,
					pictures: saveData.pictures,
					challengeRmb: saveData.challengeRmb,
					userId: saveData.userId,
					token: uni.getStorageSync('token'),
					activityId: event.id
				}

				console.log("saveData info")
				console.log(info)
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_savePush, info, true).then(res => {
					console.log("xd_savePush")
					console.log(res)
					if (res.resultCode == 0) {
						if (res.obj.payWay != 1) {
							_this.goPay(res.obj);
						} else {
							uni.showModal({
								title: '温馨提示',
								content: "加入成功！",
								showCancel: false,
								confirmText: "我知道了",
								success: function() {
									uni.switchTab({
										url: "../../action/action"
									})
								}
							});
						}

					} else {
						_this.xdUniUtils.showToast(false, res.msg, "");
					}
				})
			},


			goPay(saveData) {
				var that = this;
				let userInfo = {};
				try {
					userInfo = uni.getStorageSync('userInfo');
				} catch (e) {
					//TODO handle the exception
				};
				var data = {
					id: uni.getStorageSync('id'),
					userName: '',
					token: uni.getStorageSync('token'),
					unionId: userInfo.unionId,
					openid: userInfo.openId,
					city: '',
					province: '',
					payRmb: saveData.challengeRmb,
					pushId: saveData.id,
				};

				wx.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							that.xd_request_post(that.xdServerUrls.xd_pay, data, false).then(res => {
								uni.requestPayment({
									'appId': res.obj.appId,
									'timeStamp': res.obj.timeStamp,
									'nonceStr': res.obj.nonceStr,
									'package': res.obj.packageAlias,
									'signType': 'MD5',
									'paySign': res.obj.paySign,
									success: function(re) {
										uni.showModal({
											title: '温馨提示',
											content: "加入成功！",
											showCancel: false,
											confirmText: "我知道了",
											success: function() {
												uni.switchTab({
													url: "../../action/action"
												})
											}
										});
									},
									fail: function(err) {}
								});
							})
						}
					}

				})
			},



			//获取活动详情
			selectByActivityId() {
				let _this = this;
				let info = {
					activityId: this.activityId,
					token: uni.getStorageSync('token')
				}
				this.xd_request_get(this.xdServerUrls.xd_selectByActivityId, info, true).then((res) => {
					console.log("获取活动详情", res);
					let Acobj = res.obj;
					Acobj.activityEndTime = _this.xdUniUtils.xd_timestampToTime(Acobj.activityEndTime, false, false, false);
					Acobj.statusName = Acobj.status == 0 ? "进行中…" : "已结束";
					_this.activity = Acobj;
				}).catch(err => {});
			},
			merchant() {
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
										url: './merchantPay'
									});
								}
							},
						});
					} else if (merchantType == 1) {
						uni.navigateTo({
							url: './merchantAction'
						});
					}
				}
			},
			getBalance() {
				this.xd_request_post(this.xdServerUrls.xd_inquireBalance, {
					token: uni.getStorageSync('token'),
				}, true).then((res) => {
					console.log("xd_inquireBalance");
					console.log(res);
					this.userBean = res.obj.userBean;
				})
			},

			//标签选择
			tabs(e) {
				this.tab = e;
				this.pageNum = 1;
				this.getData();
			},

			//获取数据（参与活动和参与者）
			getData() {
				if (this.tab == 0) {
					this.getActivityByUserId();
				} else {
					this.getActivityUserList();
				}
			},

			//参与活动
			getActivityByUserId() {
				if (this.pageNum == 0) {
					return this.xdUniUtils.showToast(false, "没有更多数据了！", "");
				}
				let info = {
					activityId: this.activityId,
					token: uni.getStorageSync('token'),
					pageNum: this.pageNum,
					pageSize: 10,
					type: 4
				}
				uni.showLoading({
					title: '加载中..',
				})
				let _this = this;
				console.log("参与活动参数", info);
				this.xd_request_get(this.xdServerUrls.xd_checkList, info, true).then((res) => {
					uni.hideLoading();
					console.log("参与的活动", res);
					let list = res.obj.list;
					for (let i in list) {
						list[i].statusName = _this.getStateName(list[i].pushCardStatus);
					}
					_this.activityByUserId = _this.pageNum == 1 ? list : _this.activityByUserId.concat(list);
					_this.pageNum = res.obj.nextPage;
				}).catch(err => {});
			},
			getStateName(id) {
				if (id == 1) {
					return "进行中…";
				} else if (id == 2) {
					return "未完成";
				} else if (id == 3) {
					return "已完成";
				}
				return "";
			},

			//参与者列表
			getActivityUserList() {
				if (this.pageNum == 0) {
					return this.xdUniUtils.showToast(false, "没有更多数据了！", "");
				}

				let info = {
					activityId: this.activityId,
					pageNum: this.pageNum,
					pageSize: 10
				}
				uni.showLoading({
					title: '加载中..',
				})
				let _this = this;
				console.log("参与者参数", info);
				this.xd_request_get(this.xdServerUrls.xd_joinActivityUserList, info, true).then((res) => {
					uni.hideLoading();
					console.log("参与者结果", res);
					let list = res.obj.list;
					_this.activityUserList = _this.pageNum == 1 ? list : _this.activityUserList.concat(list);
					_this.pageNum = res.obj.nextPage;
				}).catch(err => {});
			},
			goPageImgHD(e, index) {
				this.xdUniUtils.xd_showImg(e, index)
			},
		},
		onLoad(option) {
			this.activityId = option.activityid;
			this.selectByActivityId();
			this.getData();
			this.getBalance()
		}
	}
</script>

<style lang="scss">
	.actionInfo {
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

	.imgheit {
		height: 320upx;
		width: 100%;
	}

	.ali-main {
		display: flex;
		padding: 20rpx;
		border-bottom: 1px solid #DDDDDD;

		.ali-main-list {
			margin-left: 10%;
			line-height: 130rpx;

			.ali-main-list-num {}
		}

		.ali-main-img .xd-mag {
			border-radius: 100%;
			height: 125rpx;
			width: 125rpx;
		}

		.lli-main-content {
			margin-left: 15px;
			padding-top: 10px;

			.lli-main-content-text {
				// line-height: 90rpx;
				margin-right: 20rpx;
			}

			.moreInfoIn {
				.address {
					width: 30rpx;
					height: 30rpx;
				}

				.province {
					font-size: 28rpx;
					margin-left: 6rpx;
				}
			}
		}
	}
</style>
