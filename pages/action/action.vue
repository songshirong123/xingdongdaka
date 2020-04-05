<template>
	<view class="action">
		<view class="actionInfo">
			<view class="tabbar">
				<view class="tab " :class="tab===0?'active':''" @click="tab=0">
					<text>行动 (1)</text>
				</view>
				<view class="tab" :class="tab===1?'active':''" @click="tab=1">
					<text>围观 (125)</text>
				</view>
				<view class="tab" :class="tab===2?'active':''" @click="tab=2">
					<text>收藏 (128)</text>
				</view>
			</view>
			<view class="actionTabList">
				<view class="actionMy" v-show="tab===0">
					<actionlist v-for="(item,index) in [1,2,3,4]" :key="index" :tab="tab"></actionlist>
				</view>
				<view class="actionLook" v-show="tab===1">
					<actionlist  :tab="tab"></actionlist>
				</view>
				<view class="actionFavorite" v-show="tab===2">
					<actionlist v-for="(item,index) in [1,2]" :key="index" :tab="tab"></actionlist>
				</view>
			</view>
		</view>
		
		
		
		
		<view class="btn_bar">
			<view class="btns"><button class="btn" @click="goStep">制定新的行动项</button></view>
		</view>
		
		
	</view>
</template>

<script>
import actionlist from "@/components/actionlist.vue";
export default {
	data() {
		return {
			tab:0,//行动，围观，收藏
		};
	},
	methods: {
		goStep(){
			uni.navigateTo({
				url: `/pages/action/step1`
			});
		}
	},
	components:{
		actionlist
	}
};
</script>

<style lang="scss">
.action {
	padding: 0 30rpx 150rpx 30rpx;
	font-size: 30rpx;
}
.actionInfo{
	margin:24rpx 0;
	.tabbar{
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		.tab{
			flex: 1;
			text-align: center;
			border-bottom: 1px solid #d9d9d9;
			padding:16rpx;
			&.active{
				border-bottom: 1px solid #fd5107;
				color:#fd5107;
			}
		}
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
</style>
