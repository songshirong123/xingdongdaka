<template>
	<view>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="text-content margin-top-sm padding-bottom-sm" style="border-bottom: 1upx solid #ddd;">
					<view class="xd-rows">
						<text class="text-orange">进行中……</text>
						<text style="margin-left: 3px;">{{activity.labels}}</text>
					</view>
					<view class="xd-rows">
						<text>打卡天数：{{activity.planDay}} 可休假天数：{{activity.holidayDay}}</text>
						<text style="margin-left: 3px;">保证金：￥{{activity.baoZhengJin}}</text>
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
					<view style="flex: 1;">
						<!-- <view class="text-lg">
							<text class="lg text-black cuIcon-mark"></text>
						</view>
						<text class="text-sm marginxs"></text> -->
					</view>
					<view class=" flex flex-wrap justify-end" style="flex: 1">
						<view class="text-lg">
							<text class="lg text-black cuIcon-friendfavor"></text>
						</view>
						<text class="text-sm marginxs" @tap="addActivity(activity)">加入活动</text>
					</view>

				</view>
			</view>
		</view>
		<view class="actionInfo">
			<view class="tabbar bg-white">
				<view class="tab " :class="tab===0?'active':''" @click="tabs(0)">参与活动</view>
				<view class="tab" :class="tab===1?'active':''" @click="tabs(1)">参与者</view>
			</view>
		</view>

		<view v-if="tab===1" v-for="(attention,index) in activityUserList" @tap="selectGroup(item)" :key="index">
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
				activityUserList: []
			}
		},
		methods: {
			//添加活动
			addActivity(event) {
				let _this = this;
				uni.showModal({
					title: '温馨提示',
					content: "您确定要加入该活动吗？？",
					showCancel: false,
					success: function(res) {
						if (res.confirm) {
							_this.addActivityToUser(event);
						}
					}
				});
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
					let contents = "加入成功！";
					if (res.resultCode == 10000) {
						contents = res.msg;
					}

					uni.showModal({
						title: '温馨提示',
						content: contents,
						showCancel: false,
						confirmText: "我知道了"
					});
				}).catch(err => {});
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
					token: uni.getStorageSync('token'),
					pageNum: this.pageNum,
					pageSize: 10
				}
				uni.showLoading({
					title: '加载中..',
				})
				let _this = this;
				console.log("参与者参数", info);
				this.xd_request_get(this.xdServerUrls.xd_getActivityByUserId, info, true).then((res) => {
					uni.hideLoading();
					console.log("参与的活动", res);
					let list = res.obj.list;
					_this.pageNum = res.obj.nextPage;
				}).catch(err => {});
			},

			//参与者列表
			getActivityUserList() {
				if (this.pageNum == 0) {
					return this.xdUniUtils.showToast(false, "没有更多数据了！", "");
				}

				let info = {
					activityId: this.activity.id,
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
			this.activity = JSON.parse(option.activity);
			this.getData();
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
