<template>
	<view class="xd-columns">
		<view class="xd-flex-center" style="padding-top: 25px;">
			<text style="font-size: 16px;font-weight: 700;">{{infos.Title}}</text>
		</view>
		<view class="infos xd-rows">
			<input style="width: 100%;padding-left: 10px;margin-top: 5px;" :value="shInfo.showInfo" placeholder="请输入" @input="inputInfo" />
		</view>
		<view style="padding: 5px;">
			<button class="bg-orange" hover-class="xd-but-active" @tap="userSubmit">完成</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				infos:{},
				shInfo: {},
				inputMsg: ''
			}
		},

		methods: {
			inputInfo(e) {
				this.inputMsg = e.detail.value;
			},
			userSubmit() {
				let msg = this.inputMsg;
				if (this.xdUniUtils.IsNullOrEmpty(msg))
					return this.xdUniUtils.showToast(false, "不能为空！", "");
				
				this.userEditshInfo();
			},
			//编辑商户信息
			userEditshInfo() {
				let _this = this;
				let info = this.shInfo;
				let infos =this.infos;
				if (infos.IDS == 0) {
					info["phone"] = this.inputMsg;
				} else if (infos.IDS == 1) {
					info["activityPhone"] = this.inputMsg;
				} else if (infos.IDS == 2) {
					info["wx"] = this.inputMsg;
				}
				info["userId"] = uni.getStorageSync('id');
				info["token"] =  uni.getStorageSync('token');
				console.log("xd_updateSHInfo")
				console.log(info);
				this.xd_request_get(this.xdServerUrls.xd_baseUpdateSHInfo, info, true).then((res) => {
					let contents = "编辑成功！";
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
				}).catch(err => {});
			},
		},
		onLoad(option) {
			console.log("option.shInfo")
			console.log(option.shInfo);
			this.shInfo = JSON.parse(option.shInfo);
			this.infos = JSON.parse(option.infos);
		}
	}
</script>

<style>
	.infos {
		background-color: #FFFFFF;
		width: 100%;
		font-size: 14px;
		padding: 10px;
		margin-top: 20px;
	}
</style>
