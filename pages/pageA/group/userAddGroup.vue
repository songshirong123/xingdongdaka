<template>
	<view>
		<!-- 小组简介 -->
		<view>
			<!-- 群组名称和图片 -->
			<view class="label-hint infos">
				<view class="xd-rows">
					<view style="flex: 1;">{{group.roomName}}</view>
					<image :src="group.roomHead" style="width: 120px;height: 60px;"></image>
				</view>
				<!-- 用户信息 -->
				<view class="xd-rows">
					<image :src="group.userHead" style="width: 25px;height: 25px;border-radius: 50%;border: 1px solid #f0f0f0;"></image>
					<text style="margin-left: 10px;margin-top: 7px;font-size: 12px;">{{group.userName}} {{group.createTime}}</text>
				</view>
			</view>

			<view class="label-hint">诚意金</view>
			<view class="label-hint infos xd-rows" @tap="editInfo(0)">
				<input disabled="true" placeholder="诚意金" :value="group.rmb" style="width: 100%;" />
				<!-- <text v-if="custState==1" class="text-cuIcon-right cuIcon-right"></text> -->
			</view>
			<text v-if="custState==3" class="moneyhint">2周的考察期内，可随时退出，并退回会诚意金。</text>
			<text v-if="custState==1" class="moneyhint">如果在2周的考察期内，加入者未退出，创建人可获得70%诚意金。</text>
			<!-- 标签选择 -->
			<view class="label-hint">标签</view>
			<view class="label-hint infos">
				<view class="nav-item">
					<view class="nav-item-title">{{lableName}}</view>
				</view>
			</view>
			<view v-if="custState!=1">
				<view class="label-hint">提供</view>
				<view class="label-hint infos xd-rows" @tap="editInfo(1)">
					<input disabled="true" placeholder="您能为本小组提供什么信息" :value="postInfo" style="width: 100%;" />
					<text class="text-cuIcon-right cuIcon-right"></text>
				</view>
				<view class="label-hint">需要</view>
				<view class="label-hint infos xd-rows" @tap="editInfo(2)">
					<input disabled="true" placeholder="您想从本小组得到什么信息" :value="getInfo" style="width: 100%;" />
					<text class="text-cuIcon-right cuIcon-right"></text>
				</view>
			</view>

			<!-- 标签选择 -->
			<view class="label-hint">描述</view>
			<view class="label-hint infos xd-rows" @tap="editInfo(3)">
				<input disabled="true" placeholder="更多小组信息,说明小组功能作用" :value="roomDesc" style="width: 100%;" />
				<!-- <text v-if="custState==1" class="text-cuIcon-right cuIcon-right"></text> -->
			</view>
			
			<!-- <view v-if="custState!=3" class="label-hint infos xd-rows" style="margin-top: 1px;" @tap="editVoteInfo">
				<input disabled="true"  value="投票" style="width: 100%;" />
				<text  class="text-cuIcon-right cuIcon-right"></text>
			</view> -->

			<view v-if="custState!=1" class="label-hint" style="padding: 5px;margin-top: 15px;">
				<button class="bg-orange" hover-class="xd-but-active" @tap="userSubmit">{{butName}}</button>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				group: "",
				lableName: "",
				postInfo: "", //提供
				getInfo: "", //需要
				roomDesc: "", //描述
				custState: 0,
				butName: "申请加入",
				eType: 0
			}
		},
		methods: {
			//投票
			editVoteInfo() {
				let styates = this.custState; //1群主 2群成员 3游客
				let group = this.group;
				group.custState = styates;
				uni.navigateTo({
					url: "./usersVote?group=" + encodeURIComponent(JSON.stringify(group))
				})
			},
			
			//需要编辑或者添加的
			// eType 0:诚意金 1：提供 2：需要 3：描述 4:投票
			editInfo(eType) {
				let styates = this.custState; //1群主 2群成员 3游客
				let infst = "",
					shoifs = "";
				if (styates == 1) {
					return;
					// return this.xdUniUtils.showToast(false, "暂不能修改！", "");
				} else {
					if (eType == 0 || eType == 3)
						return;
					if (styates == 2) {
						infst = "修改";
					} else if (styates == 3) {
						infst = "添加";
					}
				}
				this.eType = eType;
				let ifs = "";
				if (eType == 1) {
					ifs = "提供信息";
					shoifs = this.postInfo;
				} else if (eType == 2) {
					ifs = "需要信息";
					shoifs = this.getInfo;
				}
				this.xdUniUtils.xd_setStorageSync("editInfo", null);
				let group = this.group;
				group.custState = styates;
				group.editInfo = infst + ifs;
				group.showInfo = shoifs;
				group.eType=eType;
				uni.navigateTo({
					url: "./userEditInfo?group=" + encodeURIComponent(JSON.stringify(group))
				})
			},

			//获取标签
			getlable() {
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_label, {}, false).then((res) => {
					for (let i in res.obj) {
						if (res.obj[i].id == _this.group.roomType) {
							_this.lableName = res.obj[i].labelName;
						}
					}
				}).catch(err => {});
			},
			//提交按钮
			userSubmit() {
				//1群主 2群成员 3游客
				let _this = this;
				let state = this.custState;
				if (state == 1) { //解散小组
					return this.xdUniUtils.showToast(false, "暂不能解散！", "");
				} else if (state == 2) { //退出小组
					uni.showModal({
						title: '温馨提示',
						content: "您确定要退出该小组吗？",
						showCancel: true,
						success: function(res) {
							if (res.confirm) {
								_this.userDetateGroup();
							}
						}
					});
				} else if (state == 3) { //加入小组
					let postinfo = this.postInfo;
					if (this.xdUniUtils.IsNullOrEmpty(postinfo))
						return this.xdUniUtils.showToast(false, "提供内容不能为空！", "");

					let getinfo = this.getInfo;
					if (this.xdUniUtils.IsNullOrEmpty(getinfo))
						return this.xdUniUtils.showToast(false, "需要获取的内容不能为空！", "");
					if (this.group.rmb > 0) {
						this.wxChartPay();
					} else {
						this.userAddGroup();
					}
				}
			},

			//支付诚意金
			wxChartPay() {
				let userInfo = uni.getStorageSync('userInfo');
				var that = this;
				var data = {
					id: uni.getStorageSync('id'),
					pushId:uni.getStorageSync('id'),
					outTradeNo: uni.getStorageSync('id'), 
					userName: '',
					unionId: userInfo.unionId,
					openid: userInfo.openId,
					city: '',
					province: '',
					payRmb: (parseFloat(this.group.rmb) * 100),
					roomId: this.group.id,
					type:5
				};
				
				console.log("xd_generalPay 参数", data)
				this.xd_request_post(this.xdServerUrls.xd_generalPay, data, true).then(res => {
					console.log("xd_generalPay 结果", res)
					if(res.resultCode=='400')
						return  that.xdUniUtils.showToast(false, res.msg, "");
					
					
					uni.requestPayment({
						'appId': res.obj.appId,
						'timeStamp': res.obj.timeStamp,
						'nonceStr': res.obj.nonceStr,
						'package': res.obj.packageAlias,
						'signType': 'MD5',
						'paySign': res.obj.paySign,
						success: function(res) {
							that.userAddGroup();
						},
						fail: function(err) {
							uni.showModal({
								title: '温馨提示',
								content: '支付失败',
								confirmText: '重新支付',
								cancelText: '取消',
								image: '/static/images/icon/clock.png',
								success: function(ress) {
									if (ress.confirm) {
										that.wxChartPay();
									} else if (ress.cancel) {
										that.xdUniUtils.xd_navigateBack(1);
									}
								},

							});
						}
					});
				})
			},

			//申请加入
			userAddGroup() {
				let info = {
					roomId: this.group.id,
					offer: this.postInfo,
					need: this.getInfo
				}
				console.log("saveRoomJoin 参数", info)
				uni.showLoading({
					title: '请稍候..',
				})
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_saveRoomJoin, info, true).then((res) => {
					uni.hideLoading();
					console.log("saveRoomJoin 结果", res.resultCode)
					let contents = "已申请加入！";
					if (res.resultCode == 10000) {
						contents = res.msg;
					}

					uni.showModal({
						title: '温馨提示',
						content: contents,
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								_this.xdUniUtils.xd_navigateBack(1);
							}
						}
					});
				}).catch(err => {
					uni.hideLoading();
				});
			},
			//退出小组
			userDetateGroup() {
				let info = {
					roomId: this.group.id
				}
				console.log("infoinfo", info)
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_quitByUserId, info, true).then((res) => {
					uni.showModal({
						title: '提示',
						content: "已经退出该小组！",
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								_this.xdUniUtils.xd_navigateBack(1);
							}
						}
					});
				}).catch(err => {});
			},
			//获取用户在这个小组的状态
			getCustomerGroupState() {
				let info = {
					roomId: this.group.id
				}
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_currentStatusByRoom, info, true).then((res) => {
					let states = res.obj; //1群主 2群成员 3游客
					_this.custState = states;
					let names = "申请加入",
						titleName = "申请加入";
					if (states == 1) {
						names = "解散小组";
						titleName = "查看小组信息"
					} else if (states == 2) {
						names = "退出小组";
						titleName = "查看小组信息"
					}
					_this.butName = names;
					uni.setNavigationBarTitle({
						title: titleName
					})
					_this.getGroupUserInfo();
				}).catch(err => {});
			},

			//查询用户在本群的提供和需要信息
			getGroupUserInfo() {
				let states = this.custState;
				if (states == 1)
					return;

				let info = {
					type: 2,
					roomId: this.group.id,
					userId: uni.getStorageSync('id')
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

		onLoad(option) {
			let group = JSON.parse(decodeURIComponent(option.group));
			console.log("组信息", group);
			this.group = group;
			this.roomDesc = this.xdUniUtils.IsNullOrEmpty(group.roomDesc) ? "" : group.roomDesc;
			this.getlable();
		},
		onShow() {
			if (this.custState == 3) {
				let edtInfo = this.xdUniUtils.xd_getStorageSync("editInfo");
				if (!this.xdUniUtils.IsNullOrEmpty(edtInfo)) {
					let eType = this.eType;
					if (eType == 1) {
						this.postInfo = edtInfo;
					} else if (eType == 2) {
						this.getInfo = edtInfo;
					}
				}
			}
			this.getCustomerGroupState();
		}
	}
</script>

<style lang="scss">
	.moneyhint {
		font-size: 10px;
		padding-left: 5px;
	}

	.text-cuIcon-right {
		font-size: 10px;
		margin-top: 6px;
	}

	.text-aresa {
		height: 50px;
		width: 100%;
		text-align: left;
		border: 1px solid #BBBBBB;
		border-radius: 2px;
		padding: 5px;
		font-size: 14px;
	}

	.nav-item {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 3px;
		padding-bottom: 3px;
		background: #FFFFFF;
		border-radius: 30upx;
		border: 1px solid #fd5107;
		font-size: 12px;

		.nav-item-title {
			font-size: 20rpx;
			line-height: 26rpx;
			width: 100%;
			color: #fd5107;
		}
	}

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
</style>
