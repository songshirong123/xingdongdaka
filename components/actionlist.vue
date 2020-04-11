<template name='actionlist'>
	<view class="actionLi">
		<view class="ali-top">
			<view class="ali-top-in">
				<text>进度:{{item.targetDay-item.holidayDay-item.pushCardCount}}\{{item.targetDay}}</text>
			</view>
			<view class="ali-top-in">
				<text>休假:{{item.holidayDay}}</text>
			</view>
		</view>
		<view class="ali-main">
			<view class="ali-main-img">
				<img :src="item.pictures" alt="" class="xd-list-image">
			</view>
			<view class="lli-main-content xd-list-body ">
				<view class="xd-list-title-text">
					<text>{{item.content}}</text>
				</view>
				
			</view>
		</view>
		<view class="ali-footer">
			<view class="actionBar xd-tbr-large">
				<text>获赞助金</text>
				<text class="price">￥{{item.giveReward}}</text>
				<text class="sub xd-badge">{{item.onlookerCount}}</text>
			</view>
			<view class="actionBar xd-tbr-large">
				<text>我的保证金</text>
				<text class="price">￥{{item.challengeRmb}}</text>
			</view>
			<view class="actionBar xd-tbr-large">
				<text>邀请围观</text>
				<text class="sub xd-badge">{{item.onlookerCount}}</text>
			</view>
		</view>
		<view class="ali-btns" :v-if="tab===0&&getRole()">
			<button class="btn" @click="goPage(item)">立即打卡</button>
		</view>
	</view>
</template>

<script>
	export default {
		name:"actionlist",
		props:['tab','item','view'],
		
		
		data(){
			return {
				
			}
		},
		methods:{
			goPage(item){
				console.log(item)
				uni.navigateTo({
					url:'/pages/selfCenter/clockIn?pushId='+item.id
				});
			},
			getRole(){
				return this.view != "other";
			}
		}
	}
</script>

<style  lang="scss">
	.actionLi{
		.ali-top{
			display: flex;
			justify-content: space-between;
			color:#888;
			font-size: 24rpx;
			line-height: 36rpx;
			padding: 18rpx 0 12rpx 0;
		}
		.ali-main{
			display: flex;
			.ali-main-img{
				img{
					width: 236rpx;
				}
			}
		}
		.ali-footer{
			display: flex;
			justify-content: space-between;
			padding:20rpx;
			.actionBar{
				position: relative;
				background: #f9ebe5;
				color: #e17175;
				.price{
					color: #ea030b;
				}
			}
		}
		.ali-btns{
			display: flex;
			justify-content: center;
			.btn{
				// display: block;
				text-align: center;
				padding:0;
				font-size: 26rpx;
				height: 66rpx;
				 background: $xd-color-base;
				width:200rpx;
				margin:0 20rpx 0 0;
			}
		}
	}
</style>
