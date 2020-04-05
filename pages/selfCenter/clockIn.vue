<template>
	<view class="clockIn">
		<form>
			<view class="uni-form-item uni-column cl-time">
				<view class="form-item clockbar">
					<view class="clockImg"><img src="../../static/images/icon/clock.png" alt="" /></view>
					<view class="itembtns timeBtns">
						<button class="btn">开始</button>
						<button class="btn">完成</button>
					</view>
				</view>
				<view class="form-item timetr">
					<text>记时：</text>
					<text>15:30:15</text>
					<text class="timesplit">-</text>
					<text class="timetxt">19:30:15</text>
				</view>
				<view class="form-item timetr">
					<text>时长：</text>
					<text>5:30:15</text>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="form-item nobtm mediaList">
					<view class="section" >
						<audio style="text-align: left" :src="current.src" :name="current.name" :author="current.author" :action="audioAction" controls></audio>
					</view>
					<!-- <view class="section">
						<video
							id="myVideo"
							src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
							controls
						></video>
					</view> -->
				</view>
				<view class="form-item nobtm itembtns">
					<button class="btn">上传图片</button>
					<button class="btn">上传视频</button>
					<button class="btn">上传音频</button>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">描述</view>
				<view class="form-item nobtm"><textarea class="inputarea" placeholder="请输入描述" maxlength="250" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">概况</view>
				<view class="form-item nobtm"><textarea class="inputarea" placeholder="请输入概况" maxlength="250" /></view>
			</view>
		</form>
		<view class="btn_bar">
			<view class="btns"><button class="btn" @click="finish">提交</button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			current: {
				poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
				name: '致爱丽丝',
				author: '暂无',
				src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3'
			},
			audioAction: {
				method: 'pause'
			}
		};
	}
};
</script>

<style lang="scss">
.clockIn {
	padding: 30rpx 30rpx 150rpx 30rpx;
	font-size: 30rpx;
}
.clockbar {
	height: 100rpx;
	// line-height: 60rpx;

	display: flex;
	align-items: center;
	justify-content: space-between;
	img {
		display: block;
		height: 85rpx;
		width: 85rpx;
	}
}
.cl-time {
	.timetr {
		margin: 12rpx 0 0 0;
		.timesplit {
			margin: 0 15rpx;
		}
	}
}
.uni-form-item {
	.title {
		padding: 15rpx 0;
		font-weight: bold;
	}
	.form-item {
		margin-bottom: 12rpx;
		padding: 0 20rpx;
		&.mediaList {
			min-height: 200rpx;
			// border: 1px solid #dfdfdf;
			margin: 20rpx 10rpx;
			border-radius: 5px;
			display: flex;
			align-items: center;
			.section{
				width:100%;
				margin-bottom: 12rpx;
				audio{
					width: 100%;
				}
				video{
					width: 100%;
				}
			}
		}
	}
}
.inputarea {
	border: 1px solid #dfdfdf;
	border-radius: 5px;
	padding: 20rpx;
	height: 200rpx;
}
.btn_bar {
	position: fixed;
	bottom: 0;
	left: 0;
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
.itembtns {
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.btn {
	display: block;
	font-size: 26rpx;
	height: 50rpx;
	line-height: 50rpx;
	background: $xd-color-base;
	width: 200rpx;
	margin: 0 20rpx 0 0;
	&.other {
		background: #fd5107;
		color: #fff;
	}
}
</style>
