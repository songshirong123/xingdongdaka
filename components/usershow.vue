<template name='usershow'>

<!-- bg-blue  -->
	<view class="cu-list bg-white">
		<view class="cu-item flex padding flex-wrap align-center solid-bottom">
			<view class="cu-avatar round ll" :style="{backgroundImage: 'url(' +newList.userHead + ')'}" @click="clidgoPage(0)">
				<!-- <view v-if="newList.gender==2" class="cu-tag badge cuIcon-female bg-pink"></view>
				<view v-if="newList.gender==1" class="cu-tag badge cuIcon-male bg-cyan"></view> -->
			</view>
			<view class="content flex-sub margin-left-sm" @click="clidgoPage(1)">
				<view class="text-lg flex align-center" style="padding-bottom: 5px;">
					<text style="font-weight: 700;color: #000000;">{{newList.userName}}</text>
					<text v-if="newList.gender==2" class="cuIcon-female" style="color: #fd5107;margin-left: 5px;font-size: 12px;"></text>
					<text v-if="newList.gender==1" class="cuIcon-male" style="color: #1cbbb4;margin-left: 5px;font-size: 12px;"></text>
				</view>
				
				<view class=" text-lg flex align-center">
					<!-- <text class="lg text-orange cuIcon-location"></text> -->
					<text class="text-gray text-sm ">{{newList.province}}{{newList.city}}</text>
				</view>
				<view class=" text-lg flex align-center" v-if="newList.schoolName">
					<!-- <text class="lg text-orange cuIcon-home"></text> -->
					<text class="text-gray text-sm ">{{newList.schoolName}}</text>
				</view>
			</view>
			<view>
				<!-- <view class="cu-tag line-orange radius" v-if="guanzhu.length > 0"  @tap="clickGroup(userId)" >互助小组</view> -->
				<view class="cu-tag line-orange radius" v-if="guanzhu.length > 0" @tap="clidtags(newList)">{{guanzhu}}</view>
				<!-- <view class="personOpt" v-if="guanzhu.length== ''">
						<button @click="clickMe" class="pay" v-if="env!='release'">支付</button>
					</view> -->
			</view>
		</view>

<!-- moreInfoRow -->
		<view class="xd-rows">

           <!-- moreInfoIn flex flex-wrap justify-around-->
			<view  class="xd-rows" style="flex: 1;border-top: 1px solid #F0F0F0;">
				<view @click="clidgoPage(2,userId)" class="div-info">
					<text>{{lookerCount}}</text>
					<text>关注</text>
				</view>
				<view  @click="clidgoPage(3)"  v-if="looktotals!=null &&guanzhu== ''" style="flex: 1;" class="div-info">
					<text>{{looktotals}}</text>
					<text>分享量</text>
				</view>
				<view @click="clidgoPage(4,userId)" style="flex: 1;" class="div-info">
					
					<text>{{likeCount}}</text>
					<text>粉丝</text>
					<!-- <view class="cu-tag  tag-text bg-red" v-if="num>0&&num<100">{{num}}</view>
					<view class="cu-tag  tag-text bg-red" v-if="num>=100">99+</view> -->
				</view>
				
				<!-- <text  @click="clidgoPage(2,userId)">关注{{lookerCount}} </text>
				<text v-if="looktotals!=null &&guanzhu== ''" class="moreInfoIn_text" @click="clidgoPage(3)">分享量{{looktotals}} </text>
				<view class="flex flex-wrap">
					<text class="moreInfoIn_text" @click="clidgoPage(4,userId)">粉丝 {{likeCount}} </text>
					<view class="cu-tag  tag-text bg-red" v-if="num>0&&num<100">{{num}}</view>
					<view class="cu-tag  tag-text bg-red" v-if="num>=100">99+</view>
				</view> -->

			</view>

		</view>

	</view>

</template>

<script>
	export default {
		name: "usershow",
		props: ['userId', 'list', 'looktotals', 'guanzhu', 'likeCount', 'lookerCount', 'num', 'isEditInfo'],
		data() {
			return {
				env: uni.getStorageSync('env'),
				newList: ''
			}
		},
		watch: {
			list: function() {

				this.newList = this.list;
			}
		},
		methods: {
			//互助小组点击事件
			clickGroup(userid) {
				if (userid == uni.getStorageSync('id')) {
					uni.navigateTo({
						url: '../pageA/group/groupList?userId=' + userid
					})
				} else {
					uni.reLaunch({
						url: '../pages/index?isGroupLable=true'
					})
				}
				// uni.navigateTo({
				// 	url:'../pageA/group/groupList?userId='+userid
				// })
			},

			clidtags(e) {
				this.$emit("clidtags", e);
			},
			clickMe() {
				this.$emit("clickMe");
			},
			clidgoPage(num, e) {
				let that = this;
				switch (num) {
					case 0:
						if (!that.xdUniUtils.IsNullOrEmpty(that.isEditInfo)) {
							uni.navigateTo({
								url: '../pageA/user/editUserInfo'
							})
						} else {
							that.xdUniUtils.xd_showImg(that.newList.userHead, 0);
						}
						break;
					case 1:
						if (!that.xdUniUtils.IsNullOrEmpty(that.isEditInfo)) {
							uni.navigateTo({
								url: '../pageA/user/editUserInfo'
							})
						}
						break;
					case 2:
						uni.navigateTo({
							url: '../pageA/user/myattention?userId=' + e
						})
						break;
					case 3:
						uni.navigateTo({
							url: '../pageA/user/myfans'
						})
						break;
					case 4:
						uni.navigateTo({
							url: '../pageA/user/myfans?userId=' + e
						})
						break;
				}

			}
		}
	}
</script>

<style lang="scss">
	.gender-type{
		border-radius: 200upx;font-size: 20upx;padding: 0upx 10upx;color: #ffffff;
	}
	.div-info{
		display:flex;
		flex-direction: column;
		flex: 1;
		justify-content: center;
		justify-items: center;
		text-align: center;
		padding-top: 10px;
		padding-bottom: 10px;
	}
	.moreInfoRow {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin: 0 0 14rpx 0;

		&.rowaction {
			margin-top: 18rpx;
		}

		.moreInfoIn {

			width: 100%;
			overflow: hidden;

			margin: 0;

			&.flex1 {
				flex: 1;
			}

			padding: 0;
			text-align: center;
			height: 70rpx;
			line-height: 70rpx;
			background-color: rgb(235, 244, 255);
			border-bottom: 1px solid #e7e7e7;
			border-top: 1px solid #e7e7e7;
		}

		.moreInfoIn_text {
			// margin-left: 300rpx;
		}

		.moreInfoIn .thin {
			padding: 0 16rpx;
		}
	}

	.tag-text {
		border-radius: 200rpx;
		font-size: 20rpx;
		padding: 0rpx 10rpx;
		height: 28rpx;
		color: #ffffff;

	}
</style>
