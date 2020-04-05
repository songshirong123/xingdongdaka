<template>
	<view class="formAction">
		<form>
			<view class="uni-form-item uni-column">
				<view class="title">是否公开</view>
				<view class="form-item nobtm">
					<label class="radio">
						<radio value="r1" checked="true" color="#ffa700" />
						是
					</label>
					<label class="radio">
						<radio value="r2" color="#ffa700" />
						否
					</label>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">所属分类</view>
				<view class="sb-box">
					<view class="select">
						<picker @change="bindPickerChange" :value="dateList[index]" :range="dateList" :range-key="'str'">
							<view class="uni-input">{{ dateList[index]['showStr'] }}</view>
						</picker>
					</view>
					<view class="sb-icon"><view class="triangle"></view></view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">设置保障金</view>
				<view class="form-item"><input type="digit" class="digit" placeholder="请输入保障金数额" /></view>
				<view class="pricelis">
					<view class="priceli"><text>1元</text></view>
					<view class="priceli"><text>6元</text></view>
					<view class="priceli"><text>18元</text></view>
					<view class="priceli"><text>66元</text></view>
					<view class="priceli"><text>188元</text></view>
					<view class="priceli"><text>888元</text></view>
				</view>
			</view>
			<view class="uni-form-item uni-content">
				<text>说明：目标达成则原额退回。否则将全部扣除，分配30%给平台；剩余的70%平均分配给有效围观者，或在24小时内进行自定义特别感谢。</text>
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
		return {};
	},
	methods: {
		goStep2() {
			uni.navigateTo({
				url: `/pages/action/step2`
			});
		}
	}
};
</script>

<style lang="scss">
.formAction {
	padding: 0 30rpx 150rpx 30rpx;
	font-size: 30rpx;
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
		.radio {
			margin-right: 20rpx;
		}
	}
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
.pricelis {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.priceli {
		width: 190rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-top: 35rpx;
		text-align: center;
		border: 1px solid $xd-color-base;
	}
}
.sb-box {
	display: flex;
	height: 65rpx;
	line-height: 65rpx;
	border: 1px solid $xd-color-base;
	border-radius: 5px;
	overflow: hidden;
	position: relative;
	.select {
		flex: 1;
		.sb-input {
			padding: 0 20rpx;
			color: #666;
		}
	}
	.sb-icon {
		position: absolute;
		height: 65rpx;
		right: 0;
		z-index: -1;
		background: $xd-color-base;
		width: 55rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.triangle {
			width: 0;
			height: 0;
			border-left: 10rpx solid transparent;
			border-right: 10rpx solid transparent;
			border-top: 10rpx solid #fff;
		}
	}
}
.uni-content{
	margin-top:50rpx;
	color:#888;
	font-size: 26rpx;
	line-height: 45rpx;
}
</style>
