<template>
	<view style="background-color: #FFFFFF">
		<view class="xd-columns">
			<!-- 头像 -->
			<view class="cu-item flex padding flex-wrap align-center solid-bottom">
				<view class="cu-avatar round ll" :style="{backgroundImage: 'url(' +newList.userHead + ')'}"></view>
				<view class="content flex-sub margin-left-sm">
					<view class="text-lg flex align-center" style="padding-bottom: 5px;">
						<text style="font-weight: 700;color: #000000;">{{newList.userName}}</text>
						<text v-if="newList.gender==2" class="cuIcon-female" style="color: #fd5107;margin-left: 5px;font-size: 12px;"></text>
						<text v-if="newList.gender==1" class="cuIcon-male" style="color: #1cbbb4;margin-left: 5px;font-size: 12px;"></text>
					</view>

					<view class=" text-lg flex align-center">
						<text class="text-gray text-sm ">{{newList.province}}{{newList.city}}</text>
					</view>
					<view class=" text-lg flex align-center" v-if="newList.schoolName">
						<text class="text-gray text-sm ">{{newList.schoolName}}</text>
					</view>
				</view>
				<view>
					<view class="cu-tag line-orange radius">未开通审核权限</view>
				</view>
			</view>

			<!-- 支付金额 -->
			<view class="xd-info-main">
				<!-- 说明 -->
				<view class="xd-columns solid-bottom" style="padding: 10px;">
					<text>1.获取分享后行动项的审核权、审核目标是否达成，可设置自己需要的条件。</text>
					<text>2.获取分享后行动项的收入权，获得保证金的特别分配收入。</text>
					<view class="xd-rows">
						<text>3.详细情况可咨询客服。</text>
						<button style="background-color: #FFFFFF;border:1px solid #ffffff; height:40upx;box-shadow: none;line-height: 1;font-size: 32upx;margin-left: 1px;"
						 open-type="contact">
							<text class="cuIcon-service"></text>
						</button>
					</view>


				</view>
				<!-- 支付金额列表-->
				<view class="main-tabbar">
					<!-- <scroll-view :class="['xd-nav-bar', isCenter ? 'xd-nav-center' : '']"  scroll-x="true" show-scrollbar="false"> -->
					<view class="xd-nav-bar solid-bottom" v-for="(item, index) in payList">
						<view :class="['nav-item', currentIndex == item.ID ? 'nav-active' : '']" :id="'tab-'+index" :key="index"
						 :data-index="index" :data-id="item.ID" @tap="navChange(item)">
							<view class="nav-item-title xd-columns">
								<text style="font-size: 20px;font-weight: 700;">{{item.pay}}<text v-if="item.type==1" style="font-size: 12px;font-weight: 300;">/月</text><text
									 v-if="item.type==2||item.type==3" style="font-size: 12px;font-weight: 300;">/年</text></text>
								<text style="margin-top: 3px;">活动收入返点\n可高达{{item.rateDes}}%</text>
							</view>
						</view>
					</view>


					<!-- </scroll-view> -->
				</view>
			</view>
		</view>

		<view class="xd-common-bottom-ly xd-columns" style="background-color: #FFFFFF;padding: 5px">
			<view style="flex: 1">
				<button class="bg-black" hover-class="xd-but-active" @tap="userSubmitSQ">申请体验<text style="font-size: 13px;margin-left: 5px;">{{Times}}</text></button>
			</view>
			<view style="flex: 1;margin-top: 5px;">
				<button class="bg-orange" hover-class="xd-but-active" @tap="userSubmit">立即开通</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'

	export default {
		data() {
			return {
				isCenter: true,
				currentIndex: 0,
				tyInfo: {},
				newList: {},
				payList: [],
				selectPay: {},
				Times:""
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			userSubmitSQ() {
				uni.navigateTo({
					url: './merchantWeb?tyInfo=' + JSON.stringify(this.tyInfo)
				});
			},
			setTimes(times) {
				let that = this;
				this.dateFormat(times);
				setTimeout(function() {
					times--;
					that.setTimes(times);
				}, 1000)
			},
			dateFormat(second) {
				var dd, hh, mm, ss;
				second = typeof second === 'string' ? parseInt(second) : second;
				if (!second || second < 0) {
					return;
				}
				//天  
				dd = second / (24 * 3600) | 0;
				second = Math.round(second) - dd * 24 * 3600;
				//小时  
				hh = second / 3600 | 0;
				second = Math.round(second) - hh * 3600;
				//分  
				mm = second / 60 | 0;
				//秒  
				ss = Math.round(second) - mm * 60;

				if (Math.round(dd) < 10) {
					dd = dd > 0 ? '0' + dd : '0';
				}

				if (Math.round(hh) < 10) {
					hh = '0' + hh;
				}

				if (Math.round(mm) < 10) {
					mm = '0' + mm;
				}
				if (Math.round(ss) < 10) {
					ss = '0' + ss;
				}
				 this.Times = dd + '天' + hh + '时' + mm + '分' + ss+"秒";
			},
			//确认开通
			userSubmit() {
				let userInfo = uni.getStorageSync('userInfo');
				var that = this;
				let selectPay = this.selectPay;
				let payAmout = selectPay.pay;
				if (selectPay.expFlag) {
					payAmout = parseFloat(selectPay.tyrate) * payAmout
				}

				var data = {
					id: uni.getStorageSync('id'),
					userName: '',
					unionId: userInfo.unionId,
					openid: userInfo.openId,
					city: '',
					province: '',
					payRmb: (parseFloat(payAmout) * 100),
					merchantType: 1,
					type: 6
				};
				console.log("xd_generalPay 参数", data)
				uni.showLoading({
					title: "请稍后"
				})
				this.xd_request_post(this.xdServerUrls.xd_generalPay, data, true).then(res => {
					uni.hideLoading();
					console.log("xd_generalPay 结果", res)
					if (res.resultCode == '400' || res.resultCode == '10016')
						return that.xdUniUtils.showToast(false, res.msg + JSON.stringify(res.obj), "");


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
			getTimeInit() {
				let _this = this;
				this.xd_request_get(this.xdServerUrls.xd_init, {
					token: uni.getStorageSync('token')
				}, true).then((res) => {
					_this.tyInfo = res.obj;
					console.log("xd_init")
					console.log(res);
					let times = res.obj.time;
					if(times>0){
						_this.setTimes(times);
					}
					
				})
			},

			// 金额选择
			navChange(item) {
				this.selectPay = item;
				this.currentIndex = item.ID;

			},

			//金额列表
			getMerchantConfig() {
				let that = this;
				this.xd_request_get(this.xdServerUrls.xd_getVal, {
					key: "merchant_config",
					token: uni.getStorageSync('token')
				}, true).then((res) => {
					console.log("xd_getVal res.obj")
					console.log(res.obj)
					let pays = JSON.parse(res.obj);
					if (!that.xdUniUtils.IsNullOrEmpty(pays)) {
						for (let i in pays) {
							pays[i].ID = i;
							pays[i].rateDes = pays[i].rate * 100;
						}
						that.selectPay = pays[0];
						that.payList = pays;
					}
				}).catch(err => {});
			},

		},
		onShow() {
			this.getMerchantConfig();
			this.getTimeInit();
			if (!this.hasLogin) {
				return this.xdUniUtils.xd_login(this.hasLogin);
			}
			if (this.userInfos == '' || this.userInfos == undefined || this.userInfos == null) {
				try {
					this.newList = uni.getStorageSync('userInfo')
				} catch (e) {
					console.log(Error)
				};

			}
		}
	}
</script>

<style scoped lang="scss">
	.xd-info-main {
		width: 100%;

		.main-tabbar {
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1px solid #efe5e8;
			// padding: 20upx 3upx 20upx 3upx;
			background-color: #FFFFFF;

			.xd-nav-bar {
				width: 100%;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				padding-top: 5px;
				padding-bottom: 5px;
				// white-space: nowrap;

				.nav-item {
					width: 60%;
					display: inline-flex;
					flex-direction: column;
					text-align: center;
					margin: 0 0.6%;
					padding: 5px;
					background: #f0f0f0;
					border: 1px solid #f0f0f0;
					border-radius: 10upx;

					.nav-item-title {
						padding-top: 5px;
						font-size: 26rpx;
						line-height: 36rpx;
						width: 100%;
						color: #626466;

					}
				}

				.nav-item.nav-active {
					border: 1px solid #fd5107;
					background-color: #FFFFFF;

					.nav-item-title {
						color: #fd5107;
					}
				}
			}
		}

		.swiper-box {

			.swiper-item {
				display: none;
			}

			.swiper-item.box-active {
				display: block;
			}

			.infos-box {
				padding-top: 20upx;
			}
		}
	}
</style>
