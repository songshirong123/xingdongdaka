<template>
	<view class="editUserInfo">
		<form>
			<view class="f-lists">
				<view class="f-list f-headInfo">
					<view class="h-userInfo">
						<view class="h-headInfo-imgbar"><img class="h-headInfo-img" src="../../static/images/pic/header.png" /></view>
						<view class="h-headInfo-imgTxt">
							<text>点击头像更换</text>
						</view>
					</view>
				</view>
				<view class="f-list"><input class="uni-input" name="nikename" placeholder="昵称" maxlength="12" /></view>
				<view class="f-list"><input class="uni-input" name="name" placeholder="签名" maxlength="12" /></view>
				<view class="f-list">
					<input class="uni-input" name="pickerText" placeholder="请选择地区" maxlength="200" @tap="openAddres" v-model="pickerText" disabled />
					<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm"></simple-address>
				</view>
				<view class="f-list left">
					<text class="f-list-lb">性别：</text>
					<radio-group @change="radioChange">
						<label class="radio">
							<radio value="r1" checked="true" color="#ffa700"/>
							男
						</label>
						<label class="radio">
							<radio value="r2"  color="#ffa700"/>
							女
						</label>
						<label class="radio">
							<radio value="r2"  color="#ffa700"/>
							保密
						</label>
					</radio-group>
				</view>
				<view class="f-list">
					<picker mode="date" :value="date" @change="bindDateChange" class="pickdate">
						<view class="uni-input">{{ date }}</view>
					</picker>
				</view>
				<view class="f-list"><input class="uni-input" name="no" placeholder="学校" maxlength="80" /></view>
				<view class="f-list"><input class="uni-input" name="no" placeholder="行业" maxlength="80" /></view>
				<view class="f-list"><input class="uni-input" name="no" placeholder="公司" maxlength="80" /></view>
				<view class="f-list"><input class="uni-input" name="no" placeholder="职业" maxlength="80" /></view>
				<view class="f-list"><input class="uni-input" name="no" placeholder="职位" maxlength="80" /></view>
				<view class="f-btns"><button class="f-btn f-btn-b" @click="submit()">保存</button></view>
			</view>
		</form>
	</view>
</template>

<script>
import simpleAddress from '@/components/simple-address/simple-address.nvue';
export default {
	data() {
		return {
			cityPickerValueDefault: [0, 0, 1],
			pickerText: '',
			date: '生日',
		};
	},
	methods: {
		openAddres() {
			this.$refs.simpleAddress.open();
		},
		onConfirm(e) {
			this.pickerText = e.label; //JSON.stringify(e);
			console.log(e);
		},
		bindDateChange: function(e) {
			this.date = e.target.value;
		}
	},

	components: {
		simpleAddress
	}
};
</script>

<style lang="scss">
	.radio{
		margin-right: 24rpx;
		radio{
			color:$xd-color-base;
			margin-right: 3rpx;
		}
		
	}
.f-lists {
	font-size: 26rpx;
	padding: 36rpx 25rpx;
	color: #666;
	.f-list {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid $xd-color-base;
		height: 68rpx;
		align-items: center;
		margin-bottom: 12rpx;
		padding: 0 20rpx;
		.f-list-lb{
			margin-right: 50rpx;
		}
		.uni-input {
			flex: 1;
		}
		.f-list-left {
			flex: 1;
		}
		.f-list-right {
			color: $xd-color-base;
		}
		&.left{
			justify-content: flex-start;
		}
		&.f-headInfo {
			display: flex;
			justify-content: space-between;
			height: 156rpx;
			align-items: center;
			// padding-right: 0;
			.h-userInfo {
				flex:1;
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				font-size: 20rpx;
				color:#999;
				
			}
			.h-headInfo-imgbar {
				// margin-right: 20rpx;
				.h-headInfo-img {
					width: 100rpx;
					height: 100rpx;
					border-radius: 100%;
				}
			}
			.user-contact {
				display: flex;
				flex-direction: column;
				justify-content: center;
				.user-lis {
					height: 30rpx;
					line-height: 30rpx;
					margin-bottom: 5rpx;
				}
			}
			.h-headInfo-btn {
				border: 1px solid $xd-color-base;
				background: #fff;
				color: $xd-color-base;
				font-size: 20rpx;
			}
			
		}
		.pickdate {
			flex: 1;
			.uni-picker-action.uni-picker-action-confirm {
				color: #57dbd0 !important;
			}
		}
	}
	.f-btns {
		margin-top: 120rpx;
		.f-btn {
			text-align: center;
			height: 70rpx;
			line-height: 70rpx;
			font-size: 28rpx;
			&.f-btn-b {
				background: $xd-color-base;
				// color: #fff;
			}
		}
	}
}
</style>
