<template>
	<view class="selfCenter">
		<!-- <button @click="clickMe">支付</button> -->
		<view class="personContent">
			<view class="personHead" @click="goPage('/pages/selfCenter/editUserInfo')">
				<img src="../../static/images/pic/header.png" alt="" class="imgHead">
			</view>
			<view class="personInfo"  @click="goPage('/pages/selfCenter/editUserInfo')">
				<view class="xd-list-title-text name ">
					<text>暖暖</text>
				</view>
				<view class="subInfo">
					<text>健身狂魔</text>
				</view>
			</view>
			<view class="personOpt">
				<!-- <button @click="clickMe" class="pay">支付</button> -->
			</view>
		</view>
		<view class="moreInfo">
			<view class="moreInfoRow">
				<view class="moreInfoIn">
					<text>湖南长沙</text>
				</view>
				<view class="moreInfoIn">
					<!-- <text class="gender">♂</text> -->
					<text class="gender">♀</text>
					<text>20</text>
				</view>
				<view class="moreInfoIn flex1">
					<text>学校</text>
				</view>
				<!-- <view class="moreInfoIn">
					<text>  &nbsp;</text>
				</view> -->
			</view>
			<view class="moreInfoRow">
				<view class="moreInfoIn">
					<text>行业</text>
				</view>
				<view class="moreInfoIn">
					<text>公司</text>
				</view>
				<view class="moreInfoIn">
					<text>职业</text>
				</view>
				<view class="moreInfoIn link">
					<text>产品服务</text>
				</view>
			</view>
			<view class="moreInfoRow">
				<view class="moreInfoIn personAction">
					<text>关注：1</text>
				</view>
				<view class="moreInfoIn personAction">
					<text>粉丝：0</text>
				</view>
				<view class="moreInfoIn personAction">
					<text>获赞：12</text>
				</view>
				<view class="moreInfoIn personAction">
					<text>获分享：14</text>
				</view>
			</view>
			<view class="moreInfoRow rowaction">
				<view class="moreInfoIn link" v-if="getRole()">
					<text>订单详情</text>
				</view>
				<view class="moreInfoIn">
					<text>积分：1</text>
				</view>
				<view class="moreInfoIn link" @click="goPage('/pages/selfCenter/income')" v-if="getRole()">
					<text>收益：1999</text>
				</view>
			</view>
			
		</view>
		
		<view class="actionInfo">
			<view class="tabbar">
				<view class="tab " :class="tab===0?'active':''" @click="tab=0">
					<text>行动 (1)</text>
				</view>
				<view class="tab" :class="tab===1?'active':''" @click="tab=1">
					<text>围观 (125)</text>
				</view>
				<!-- <view class="tab" :class="tab===2?'active':''" @click="tab=2">
					<text>收藏 (128)</text>
				</view> -->
			</view>
			<view class="actionTabList">
				<view class="actionMy" v-show="tab===0">
					<actionlist v-for="(item,index) in [1,2,3,4]" :key="index" :tab="tab" :view="view"></actionlist>
				</view>
				<view class="actionLook" v-show="tab===1">
					<actionlist  :tab="tab"  :view="view"></actionlist>
				</view>
				<view class="actionFavorite" v-show="tab===2">
					<actionlist v-for="(item,index) in [1,2]" :key="index" :tab="tab"  :view="view"></actionlist>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import actionlist from "./selfCenterList.vue"
	export default {
		data() {
			return {
				tab:0,//行动，围观，收藏
				list:[1,2,3,4,5],
				view:""
			}
		},
		onLoad(option) {
			this.view = option.view;
			console.log(option.view)
		},
		methods: {
			goPage(url){
				uni.navigateTo({
					url
				});
			},
			getRole(){
				return this.view != "other";
			}
			
		},
		components:{
			actionlist
		}
	}
</script>

<style  lang="scss">
	.selfCenter{
		padding:30rpx;
	}
.personContent{
	padding:12rpx 0;
	display: flex;
	justify-content: flex-start;
	.personHead{
		padding: 6rpx;
		.imgHead{
			height: 104rpx;
			width: 104rpx;
			display: inline-block;
			border-radius: 100%;
		}
	}
	.personInfo{
		margin:0 20rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		.subInfo{
			font-size: 24rpx;
			color:#888;
		}
	}
	.personOpt{
		flex: 1;
		display: flex;
		justify-content: flex-end;
		padding:0;
		.pay{
			display: block;
			font-size: 26rpx;
			height: 66rpx;
			background: $xd-color-base;
			width:200rpx;
			margin:0;
		}
	}
}
.moreInfo{
	padding:20rpx 0;
	border-bottom: 1px solid #d9d9d9;
	border-top: 1px solid #d9d9d9;
	font-size: 26rpx;
	.link{
		color:$xd-color-base;
	}
	.gender{
		background:#fd5107;
		color:#fff;
		display: inline-block;
		padding:0 6rpx;
		border-radius: 100%;
		font-size: 22rpx;
		margin-right: 2rpx;
		// height: 24rpx;
		// line-height: 24rpx;
	}
	.moreInfoRow{
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin:0 0 14rpx 0;
		&.rowaction{
			margin-top:18rpx;
		}
		.moreInfoIn{
			width: 170rpx;
			overflow: hidden;
			
			margin:0;
			padding:0;
			&.flex1{
				flex: 1;
			}
			text-align: left;
		}
	}
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


</style>
