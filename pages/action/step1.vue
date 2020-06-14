<template>
	<view class="formAction">
		<form @submit="formSubmit">
			<view class="uni-form-item uni-column">
				<view class="title">行动项</view>
				<view class="form-item"><input class="uni-input" :value="content" name="content" placeholder="请输入行动项名称" maxlength="50" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">动机目标</view>
				<view class="form-item"><input class="uni-input" :value="extendContent" name="extendContent" placeholder="请输入动机目标" maxlength="50" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">打卡方式</view>
				<view class="form-item"><input class="uni-input" :value="punchCardWay" name="punchCardWay" placeholder="请输入打卡方式" maxlength="150" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">封面上传</view>
				<view class="form-item nobtm">
					<view class="image-content">
						<image class="imgShow" v-show="param.pictures" :src="param.pictures" @click="popUpImg"></image>
						<view class="imagetip"  v-show="!param.pictures" @click="popUpImg">
							<view class="imagetipicon">
								<text>+</text>
							</view> 
							<view class="imagetiptxt">
								<text>点击上传</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		<view class="btn_bar">
			<view class="btns"><button class="btn" form-type="submit">下一步</button></view>
		</view>
		</form>
		<!-- <view class="btn_bar">
			<view class="btns"><button class="btn" form-type="submit">下一步</button></view>
		</view> -->
		
	</view>
</template>

<script>
export default {
	data() {
		return {
			content:'',
			extendContent:'',
			punchCardWay:'',
			param:{
				pictures:""
			}
		};
	},
	onLoad() {
		var data=uni.getStorageSync("pushData");
		if(data){
			this.content=data.content;
			this.extendContent=data.extendContent;
			this.punchCardWay=data.punchCardWay;
			this.param.pictures=data.pictures;
		}
	},
	methods: {
		formSubmit(e){
			if(e.detail.value.content==''){
				uni.showToast({
				    title: '请出入行动项名称',
					mask:true,
				    duration: 1000,
					image:'/static/images/icon/clock.png'
				});
				return false
			};
			this.xdUniUtils.xd_request_text({content:e.detail.value}).then(res=>{
				if(res.obj.errcode==0)
				uni.navigateTo({
					url: '/pages/action/step2?pictures='+this.param.pictures+'&formData='+encodeURIComponent(JSON.stringify(e.detail.value))
				});
			})
			// if(e.detail.value.extendContent==''){
			// 	uni.showToast({
			// 	    title: '请出入行动目标',
			// 		mask:true,
			// 	    duration: 1000,
			// 		image:'/static/images/icon/clock.png'
			// 	});
			// 	return false
			// }if(this.param.pictures==''){
				
			// }
			
		},
		popUpImg(){
			const that=this;
			uni.chooseImage({
			    count: 1, //默认9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
					let tempFilePaths = res.tempFilePaths;
					that.xdUniUtils.xd_request_img(res.tempFilePaths[0]).then(res=>{
						if(res){
							uni.uploadFile({
							           url: that.xdServerUrls.xd_uploadFile, 
							           filePath: tempFilePaths[0],
							           name: 'files',
							           formData: {
							               'userId': uni.getStorageSync('id'),
							           },
							           success: (uploadFileRes) => {
																
																 that.param.pictures=JSON.parse(uploadFileRes.data).obj[0];
																
							           }
							       });
						}
					});
					
			    }
			});
		},
		updataImg(){
			
		}
		
	}
};
</script>

<style lang="scss">
.formAction {
	padding: 0 30rpx 150rpx 30rpx;
	font-size: 28rpx;
}
.uni-form-item {
	.title {
		padding: 15rpx 0;
		font-weight: bold;
	}
	.form-item {
		&:not(.nobtm) {
			border-bottom: 1px solid #ffa700;
		}
		height: 68rpx;
		line-height: 68rpx;
		margin-bottom: 12rpx;
		padding: 0 20rpx;
	}
}
.btn_bar{
	position: fixed;
	bottom: 0;
	left:0;
	width: 100%;
	.btns {
		height: 120rpx;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		font-size: 28rpx;
		.btn {
			flex: 1;
			height: 64rpx;
			line-height: 64rpx;
			background: #ffa700;
			// color: #fff;
			font-size: 28rpx;
		}
	}
}
.image-content{
	position:relative;
	width: 100%;
	height: 180px;
	display: flex;
	justify-content: center;
	align-items: center;
	.imgShow{
		width: 100%; height: 180px; background-color: #eee;
	}
	.imagetip{
		border:4px solid #eee;
		color:#eee;
		position: relative;
		width:200rpx;
		height: 200rpx;
		// line-height: 100rpx;
		font-size: 100rpx;
		text-align: center;
	}
	.imagetipicon{
		margin-top: 45rpx;
	}
	.imagetiptxt{
		font-size: 26rpx;
	}
}

</style>