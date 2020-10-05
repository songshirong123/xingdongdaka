<template>
	<view>
		<!-- 小组简介 -->
		<view style="padding: 10px;border-bottom: 1px solid #f0f0f0;background-color: #FFFFFF;">
			<!-- 群组名称和图片 -->
			<view class="xd-rows">
				<view style="flex: 1;">{{group.roomName}}</view>
				<image :src="group.roomHead" style="width: 120px;height: 60px;"></image>
			</view>
			<!-- 用户信息 -->
			<view class="xd-rows">
				<image :src="group.userHead" style="width: 25px;height: 25px;border-radius: 50%;border: 1px solid #f0f0f0;"></image>
				<text style="margin-left: 10px;margin-top: 7px;font-size: 12px;">{{group.userName}} {{group.createTime}}</text>
			</view>
			<!-- <view class="label-hint"  style="margin-top: 10px;">诚意金</view>
			<view class="label-hint infos">{{group.rmb}}</view> -->
			<!-- 标签选择 -->
			<view class="label-hint" style="margin-top: 10px;">标签</view>
			<view class="nav-item">
				<view class="nav-item-title">{{lableName}}</view>
			</view>
			<textarea class="text-aresa" placeholder="您能为本小组提供什么" @input="inputPostInfo"></textarea>
			<textarea class="text-aresa" placeholder="您想从本小组得到什么" @input="inputGetInfo"></textarea>
			
            <button style="margin-top: 10px;" class="bg-orange" hover-class="xd-but-active" @tap="userAddGroup">申请加入</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				group: "",
				lableName:"",
				postInfo:"",
				getInfo:""
			}
		},
		methods: {
			//提供的信息
			inputPostInfo(e){
				let inpus =e.detail.value;
				this.postInfo=inpus;
			},
			//获取的信息
			inputGetInfo(e){
				let inpus =e.detail.value;
				this.getInfo=inpus;
			},
			
            //获取标签
			getlable() {
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_label, {}, false).then((res) => {					
					for (let i in res.obj) {
						if (res.obj[i].id ==_this.group.roomType) {
							_this.lableName = res.obj[i].labelName;
						}
					}
				}).catch(err => {});
			},
			userAddGroup(){
				let postinfo = this.postInfo;			
				if (this.xdUniUtils.IsNullOrEmpty(postinfo)) 
					return this.xdUniUtils.showToast(false, "提供内容不能为空！", "");
								
				let getinfo = this.getInfo;
				if (this.xdUniUtils.IsNullOrEmpty(getinfo)) 
					return this.xdUniUtils.showToast(false, "需要获取的内容不能为空！", "");
								
				let info ={
					roomId:this.group.id
				}
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_saveRoomJoin, info, false).then((res) => {	
					_this.xdUniUtils.showToast(false, "已申请加入！", "");
					_this.xdUniUtils.xd_navigateBack(1);
				}).catch(err => {});
			},
		},

		onLoad(option) {
			this.group = JSON.parse(decodeURIComponent(option.group));
			this.getlable();
		}
	}
</script>

<style lang="scss">
	.text-aresa{
		height: 70px;
		width: 100%;
		margin-top: 10px;
		text-align: left;
		border: 1px solid #BBBBBB;
		border-radius: 5px;
		padding: 5px;
		font-size: 14px;
	}
	.nav-item {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
		margin: 5px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 3px;
		padding-bottom: 3px;
		background: #FFFFFF;
		border-radius: 30upx;
		border: 1px solid #fd5107;
		font-size: 12px;
	
		.nav-item-title {
			font-size: 26rpx;
			line-height: 36rpx;
			width: 100%;
			color: #fd5107;
		}
	}
	.label-hint {
		font-size: 12px;
		width: 100%;
		padding-bottom: 10px;
	}

	.infos {
		background-color: #FFFFFF;
		width: 100%;
		font-size: 14px;
	}
</style>
