<template>
	<view class="flex bg-white contentspe">
			<form class="contentspe">
				<view class="flex flex-wrap padding solid-top align-center">
					<view class="text-xl">
						<text class="lg text-gray cuIcon-list "></text>
					</view>
					<text class="margin-left-xs">分类</text>
	
					<view class="xd-flex-end label-left  radius "style="flex: 1;">
						<view class="bg-gray radius ">
							<text>{{fromInfo.label}}</text>
							<!-- <text v-else>参与活动</text> -->
							<text class="lg text-gray cuIcon-triangledownfill"></text>
						</view>
	
					</view>
					<view class="cu-modal  cu-modal-z" :class="modalNamecheckbox?'show':''" @tap="showradios">
						<view class="cu-dialog" @tap.stop="">
							<checkbox-group class="block" @change="RadioChange" name="label">
								<view class="cu-list menues text-left ">
									<block v-for="(item,index) in pickerlabel" :key="item.id" :id="index">
										<view class="cu-item padding-left-sm">
											<label class="flex justify-between align-center flex-sub">
												<view class="flex-sub">{{item.labelName}}</view>
												<checkbox class="round" :class="item.checked?'checked':''" :checked="item.checked" :value="item.id" color="#009098"
												 style="transform:scale(0.8);font-size: 13px;margin-left: 5px;"></checkbox>
	
											</label>
										</view>
									</block>
								</view>
							</checkbox-group>
							<view class="checkbox-text flex justify-around">
								<text @tap="showradios"> 确定</text>
								<text @tap="showradios(1)"> 取消</text>
							</view>
						</view>
					</view>
				</view>
				<view class="padding solid-top align-center justify-between">
					<view class="flex flex-wrap">
						<view class="text-xl">
							<text class="lg text-gray cuIcon-activity"></text>
						</view>
						<text class="margin-left-xs">活动内容</text>
	
					</view>
					<textarea @input="onInputActivity" placeholder="请输入活动内容" :value="fromInfo.content" style="padding-top: 10px;padding-bottom: 10px;font-size: 12px;"></textarea>
				</view>
	
				<view class="flex flex-wrap padding solid-top align-center">
					<view class="text-xl">
						<text class="lg text-gray cuIcon-moneybag"></text>
					</view>
					<text class="margin-left-xs">保证金</text>
	
					<view class="xd-flex-end label-left  radius " style="flex: 1;">
						<view class="flex flex-wrap">
							<input disabled="disabled" type="number" min="0" :value="fromInfo.baozhengjin" style="text-align: right;padding-right: 5px;height: 20px;" />
							<text class="lg text-gray cuIcon-triangledownfill" style="margin-top: 6px;"></text>
						</view>
					</view>
				</view>
	
				<view class=" flex flex-wrap padding solid-top align-center">
					<view class="text-xl">
						<text class="lg text-gray cuIcon-calendar"></text>
					</view>
					<view class="title margin-left-xs">计划天数</view>
					<view class="xd-flex-end label-left  radius " style="flex: 1;">
						<view class="flex flex-wrap  bg-gray radius align-center card-time-left ">
							<picker class="data-time-left-whint" @change="PickerChange" :range="picker">
								<view class="picker">
									{{picker[indextime]}}
								</view>
							</picker>
							<text class="lg text-gray cuIcon-triangledownfill"></text>
						</view>
						<view v-if="indextime==5">
							<input type="number" class="timeinput" placeholder="输入天数" :focus="targetDayf" @input="targetDayinput" maxlength="50"
							 step="1" min="1"></input>
						</view>
					</view>
	
				</view>
				<view class="flex flex-wrap padding solid-top align-center">
					<view class="margin-left-lg ">可休假天数</view>
					<view class="xd-flex-end label-left  radius " style="flex: 1;">
						<view class="flex flex-wrap  bg-gray radius align-center data-time-left">
							<picker class="data-time-left-whint" @change="PickerChangeholiday" :value="holidayDay" :range="pickerdate">
								<view class="picker">
									{{pickerdate[indexholiday]}}
								</view>
							</picker>
							<text class="lg text-gray cuIcon-triangledownfill"></text>
						</view>
						<view class="" v-if="indexholiday==8">
							<input class="timeinput" placeholder="输入天数" :value="holidayDay" :focus="holidayf" @input="holidayDayinput"
							 maxlength="50" step="1" min="0"></input>
						</view>
					</view>
				</view>
				<view class=" flex flex-wrap padding solid-top align-center">
					<view class="text-xl">
						<text class="lg text-gray cuIcon-calendar"></text>
					</view>
					<view class="title margin-left-xs">截止日期</view>
					<view class="xd-flex-end label-left  radius " style="flex: 1;">
						<view class="flex flex-wrap  bg-gray radius align-center data-time-left">
							<!-- <picker mode="date" :value="pikerdate" :start="pikerdate" :end="2050-01-01" @change="bindDateChange"> -->
								<view class="uni-input">{{fromInfo.activityEndTime}}</view>
							<!-- </picker> -->
						</view>
					</view>
				</view>
	
				<view class="padding solid-top" style="margin-bottom: 80px;">
					<view class="flex flex-wrap">
						<view class="text-xl">
							<text class="lg text-gray cuIcon-camera"></text>
						</view>
						<text class="margin-left-xs">上传封面</text>
					</view>
					<view style="margin-top: 10px;">
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" :data-url="fromInfo.pictures" v-if="fromInfo.pictures!=''">
									<image :src="fromInfo.pictures" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg">
										<text class='cuIcon-close'></text>
									</view>
								</view>
								<view class="solids" @tap="popUpImg" v-if="fromInfo.pictures==''">
									<text class='cuIcon-cameraadd'></text>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="btn_bar">
					<button class="bg-orange " @click="savePush">参与活动</button>
				</view>
			</form>
		</view>
	
</template>

<script>
	export default {
		data() {
			return {
				fromInfo:{},
				actionid:"",
				indextime: 0,
				indexholiday: 0,
				pickerlabel: [],
				picker: [
					"一周",
					"一个月",
					"三个月",
					"半年",
					"一年",
					"自定义"
				],
				pickerdate: [
					"一天",
					"两天",
					"三天",
					"四天",
					"五天",
					"六天",
					"一周",
					"一月",
					"自定义"
				],
			}
		},
		methods: {
			savePush() {
				let saveData = this.fromInfo;
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
					activityId: this.actionid
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
										url: "../action/action"
									})
								}
							});
						}
			
					} else {
						_this.xdUniUtils.showToast(false, res.msg, "");
					}
				})
			},
			
			setPickerChangeholiday(holidayDay){
				switch (holidayDay) {
					case '1':
						this.indexholiday = 0;
						break;
					case '2':
						this.indexholiday = 1;
						break;
					case '3':
						this.indexholiday = 2;
						break;
					case '4':
						this.indexholiday = 3;
						break;
					case '5':
						this.indexholiday = 4;
						break;
					case '6':
						this.indexholiday = 5;
						break;
					case '7':
						this.indexholiday = 6;
						break;
					case '30':
						this.indexholiday = 7;
						break;
				}
			},
			
			//休息天数
			PickerChangeholiday(e) {
				switch (e.detail.value) {
					case '0':
						this.indexholiday = 0;
						this.fromInfo.holidayDay =1;
						break;
					case '1':
						this.indexholiday = 1;
						this.fromInfo.holidayDay =2;
						break;
					case '2':
						this.indexholiday = 2;
						this.fromInfo.holidayDay =3;
						break;
					case '3':
						this.indexholiday = 3;
						this.fromInfo.holidayDay =4;
						break;
					case '4':
						this.indexholiday = 4;
						this.fromInfo.holidayDay =5;
						break;
					case '5':
						this.indexholiday = 5;
						this.fromInfo.holidayDay =6;
						break;
					case '6':
						this.indexholiday = 6;
						this.fromInfo.holidayDay =7;
						break;
					case '7':
						this.indexholiday = 7;
						this.fromInfo.holidayDay =30;
						break;
					case '8':
						this.indexholiday = 8;
						this.fromInfo.holidayDay ="";
						this.holidayDay = '';
						this.holidayf = true;
						break;
				}
			},
			//可休息天数
			holidayDayinput(e) {
				this.fromInfo.holidayDay =e.detail.value;
			},
			//打卡天数
			targetDayinput(e) {
				this.fromInfo.targetDay = e.detail.value;
			},
			
			setPickerChange(targetDay) {
			
				var that = this;
				switch (targetDay) {
					case '7':
						that.indextime = 0;
						break;
					case '30':
						that.indextime = 1;
						break;
					case '90':
						that.indextime = 2;
						break;
					case '180':
						break;
					case '365':
						that.indextime = 4;
						break;
				}
			},
			
			PickerChange(e) {
			
				var that = this;
				switch (e.detail.value) {
					case '0':
						that.indextime = 0;
						that.fromInfo.targetDay =7;
						break;
					case '1':
						that.indextime = 1;
						that.fromInfo.targetDay =30;
						break;
					case '2':
						that.indextime = 2;
						that.fromInfo.targetDay =90;
						break;
					case '3':
						that.indextime = 3;
						that.fromInfo.targetDay =180;
						break;
					case '4':
						that.indextime = 4;
						that.fromInfo.targetDay =365;
						break;
					case '5':
						that.indextime = 5;
						that.targetDay = '';
						that.targetDayf = true;
						break;
				}
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
													url: "../action/action"
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
			
			popUpImg() {
				const that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let tempFilePaths = res.tempFilePaths;
						that.xdUniUtils.xd_request_img(res.tempFilePaths[0]).then(res => {
							if (res) {
								uni.uploadFile({
									url: that.xdServerUrls.xd_uploadFile,
									filePath: tempFilePaths[0],
									name: 'files',
									formData: {
										'userId': uni.getStorageSync('id'),
									},
									success: (uploadFileRes) => {
			
										that.fromInfo.pictures = JSON.parse(uploadFileRes.data).obj[0];
										console.log(that.fromInfo.pictures)
									}
								});
							} else {
								uni.showToast({
									title: '内容包含敏感内容',
									mask: true,
									duration: 2000,
			
								});
								return false
							}
						});
			
					}
				});
			},
			DelImg() {
				this.fromInfo.pictures = '';
			},
		},
		onLoad(option) {
			let fromInfo = JSON.parse(option.fromInfo);
			// fromInfo.baozhengjin=fromInfo/100;
			this.fromInfo = fromInfo;
			
			this.actionid =option.actionid;
			this.setPickerChange(fromInfo.targetDay);
			this.setPickerChangeholiday(fromInfo.holidayDay);
		}
	}
</script>

<style lang="scss">
	.contentspe {
		width: 100%;
	}

	.label-left {
		margin-left: 15%;
		width: 390rpx;
	}

	.card-time-left {
		margin-left: 38%;
		width: 150upx;
	}

	.data-time-left {
		margin-left: 34.5%;
		width: 150upx;
	}

	.timeinput {
		width: 115upx;
	}

	.btn_bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 5px;
		background-color: #FFFFFF;
	}

	.textare-heght {
		height: 300upx;
	}

	.data-time-left-whint {
		width: 115upx;
		text-align: center;
		// padding-left: 5px;
		// padding-right: 5px;
	}

	.pading-time {
		margin-bottom: 20%;
	}

	.checkbox-text {
		height: 90rpx;
		border-top: 1px solid #f0f0f0;

		align-items: center;

		text {
			font-size: 35rpx;
		}

	}

	.menues {
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		line-height: 100upx;
		justify-content: space-evenly;
	}

	.titleBT {

		font-size: 35rpx;


	}
</style>
