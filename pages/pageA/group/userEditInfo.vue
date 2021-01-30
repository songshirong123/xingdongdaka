<template>
	<view class="xd-columns">
		<view class="xd-flex-center" style="padding-top: 25px;">
			<text style="font-size: 16px;font-weight: 700;">{{group.editInfo}}</text>
		</view>
		<view class="infos xd-rows">
			<image :src="group.roomHead" style="width: 30px;height: 30px;"></image>
			<input style="width: 100%;padding-left: 10px;margin-top: 5px;" :value="group.showInfo" placeholder="请输入" @input="inputInfo" />
		</view>
		<text style="padding: 5px;">小圈名称：{{group.roomName}}</text>
		<view style="padding: 5px;">
			<button class="bg-orange" hover-class="xd-but-active" @tap="userSubmit">完成</button>
		</view>
	</view>
</template>

<script>
	import usershow from "@/components/usershow.vue"
	export default {
		data() {
			return {
				group: '',
				inputMsg: ""
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

				//1群主 2群成员 3游客
				let styates = this.group.custState;
				if (styates == 3) { //返回填写的数据
					this.xdUniUtils.xd_setStorageSync("editInfo", msg);
					this.xdUniUtils.xd_navigateBack(1);
				} else { //直接编辑
				    this.userEditGroup();
				}
			},
			//编辑提供和需要
			userEditGroup() {
				let group= this.group;
				let info = {
					roomId: group.id
				}
				// eType 0:诚意金 1：提供 2：需要 3：描述 4:投票
				if(group.eType==1){
					info["offer"]=this.inputMsg;
				}else if(group.eType==2){
					info["need"]=this.inputMsg;
				}
				
				console.log("saveRoomJoin 参数", info)
				uni.showLoading({
					title: '请稍候..',
				})
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_saveRoomJoin, info, true).then((res) => {
					uni.hideLoading();
					console.log("saveRoomJoin 结果", res.resultCode)
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
				}).catch(err => {
					uni.hideLoading();
				});
			},
		},
		onLoad(option) {
			this.group = JSON.parse(decodeURIComponent(option.group));
			this.inputMsg = this.group.showInfo;
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
