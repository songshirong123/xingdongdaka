<template>
	<view>
		<view class="actionInfo">
			<view class="tabbar bg-white">
				<view class="tab " :class="tab===0?'active':''" @click="tabs(0)">加入的</view>
				<view class="tab" :class="tab===1?'active':''" @click="tabs(1)">创建的</view>
			</view>
			<view class="actionTabList">
				<view v-for="(item,index) in groupList" @tap="selectGroup(item)" :key="index" style="padding: 10px;border-bottom: 1px solid #f0f0f0;background-color: #FFFFFF;">
					<!-- 群组名称和图片 -->
					<view class="xd-rows">
						<view style="flex: 1;">{{item.roomName}}</view>
						<view >
							<image :src="item.roomHead" style="width: 120px;height: 60px;"></image>
						</view>
					</view>
					<!-- 用户信息 -->
					<view class="xd-rows">
						<image :src="item.userHead" style="width: 25px;height: 25px;border-radius: 50%;border: 1px solid #f0f0f0;"></image>
						<text style="margin-left: 10px;margin-top: 7px;font-size: 12px;">{{item.userName}} {{item.createTime}}</text>
					</view>
				</view>
			</view>
		</view>

		<!-- 开始行动-加号 -->
		<view class="start-add" @tap="groupAdd()">
			<text class="cuIcon-friendadd"></text>
			<!-- <image src="../../../static/images/icon/add.png" mode="widthFix"></image> -->
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageNum:1,
				tab: 0,
				groupList: []
			}
		},
		methods: {
			//标签选择
			tabs(e) {
				this.tab = e;
				this.pageNum =1;
				this.getGroupList();
			},

			//添加小组
			groupAdd() {
				uni.navigateTo({
					url:"./groupAdd?group=&isadd=true"
				})
			},
			selectGroup(group){
				uni.navigateTo({
					url:"./groupMsg?group="+encodeURIComponent(JSON.stringify(group))
				})
			},
			
			getGroupList(){
				let info={
					type:this.tab,
					pageNum:this.pageNum,
					pageSize:10
				}
				console.log("群列表参数",info);
				let _this =this;
				this.xd_request_post(this.xdServerUrls.xd_myRoomByType, info, true).then((res) => {
					console.log("群列表信息",res);
					let list = res.obj.list;
					for (let i in list) {
						list[i].createTime =_this.xdUniUtils.xd_timestampToTime(list[i].createTime,false,true,false);
					}
					_this.groupList= _this.pageNum==1?list:_this.groupList.concat(list);
				}).catch(err => {});
			}
		},
		onShow() {
			this.getGroupList();
		},
		onPullDownRefresh() {
			this.pageNum=1;
			this.getGroupList();
		},
		// 上拉加载
		onReachBottom() {
			this.pageNum+=1;
			this.getGroupList()
		},	
	}
</script>

<style lang="scss">
	.actionInfo {
		.tabbar {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;

			.tab {
				flex: 1;
				text-align: center;
				border-bottom: 1px solid #d9d9d9;
				padding: 16rpx;

				&.active {
					border-bottom: 1px solid #fd5107;
					color: #fd5107;
				}
			}
		}
	}

	.start-add {
		width: 100upx;
		height: 100upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: #ffe66f;
		border: 2px solid #ffa700;
		border-radius: 50%;
		position: fixed;
		bottom: 100upx;
		right: 30upx;
		z-index: 99;
	}

	.start-add text {
		font-size: 48upx;
	}
</style>
