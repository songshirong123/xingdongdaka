<template>
	<view class="formAction">
		<form>
			<view class="uni-form-item uni-column">
				<view class="title">打卡总天数</view>
				<view class="form-item"><input class="uni-input" type="number" name="input" placeholder="请输入打卡总天数" maxlength="50" step="1" min="1" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">每周打卡天数</view>
				<view class="form-item"><input class="uni-input" type="number" name="input" placeholder="请输入每周打卡天数" maxlength="50" step="1" min="1" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">可休假天数</view>
				<view class="form-item"><input class="uni-input" type="number" name="input" placeholder="请输入可休假天数" maxlength="150" step="1" min="0" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">首次打卡时间</view>
				<view class="sb-box">
					<view class="select">
						<picker @change="bindPickerChange" :value="dateList[index]['showStr']" :range="dateList"  :range-key="'showStr'">
							<view class="uni-input">{{ dateList[index]["showStr"] }}</view>
						</picker>
					</view>
					<view class="sb-icon"><view class="triangle"></view></view>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">阶段期限</view>
				<view></view>
			</view>
		</form>
		<view class="btn_bar">
			<view class="btns"><button class="btn" @click="goStep">下一步</button></view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			index: 0,
			dateList: []
		};
	},
	onLoad() {
		this.initDateList();
	},
	methods: {
		goStep() {
			uni.navigateTo({
				url: `/pages/action/finish`
			});
		},
		initDateList() {
			const { monday, sunday: end } = this.getNextWeek(1);
			const now = this.moment();
			let list = [];
			for (let p = now; p.diff(end) <= 0; p = p.add(1, 'd')) {
				let str = p.format('YYYY-MM-DD');
				let ddd = p.format('ddd');
				list.push({
					time: p,
					str ,
					showStr: `(${ddd}) ${str}`
				});
			}
			console.log(list);
			this.dateList = list;
		},
		getNextWeek(i) {
			const weekOfDay = parseInt(this.moment().format('E')); //计算今天是这周第几天
			const monday = this.moment().add(7 - weekOfDay + 7 * (i - 1) + 1, 'days'); //.format('YYYY-MM-DD');//周一日期
			const sunday = this.moment().add(7 - weekOfDay + 7 * i, 'days'); //.format('YYYY-MM-DD');//周日日期
			return { monday, sunday };
		},
		bindPickerChange(e){
			this.index = e.target.value;
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
			border-bottom: 1px solid $xd-color-base;
		}
		height: 68rpx;
		line-height: 68rpx;
		margin-bottom: 12rpx;
		padding: 0 20rpx;
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
			background: $xd-color-base;
			// color: #fff;
			font-size: 28rpx;
		}
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
</style>
