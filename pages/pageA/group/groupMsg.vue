<template>
	<view>
		<!-- 小组简介 -->
		<view style="padding: 10px;border-bottom: 1px solid #f0f0f0;background-color: #FFFFFF;">
			<!-- 群组名称和图片 -->
			<view class="xd-rows">
				<view style="flex: 1;">{{group.roomName}}</view>
				<view >
					<image :src="group.roomHead" style="width: 120px;height: 60px;"></image>
				</view>
			</view>
			<!-- 用户信息 -->
			<view class="xd-rows">
				<view class="xd-rows"style="flex: 1;">
					<image :src="group.userHead" style="width: 25px;height: 25px;border-radius: 50%;border: 1px solid #f0f0f0;"></image>
					<text style="margin-left: 10px;margin-top: 7px;font-size: 12px;">{{group.userName}} {{group.createTime}}</text>
				</view>
				<view style="flex: 1;text-align: end;align-items: flex-end;justify-content: flex-end;">
					<text class="addBut">加入</text>
				</view>
			</view>
		</view>
		
		<!-- 消息列表  别人的左边展示  自己的右边展示-->
		<view  style="padding: 10px;">
			<view v-for="(item,index) in msgList":key="index">
				<view  v-if="item.sendUserId==userId" class="xd-rows" style="text-align: end;align-items: flex-end;justify-content: flex-end;">
					<text style="margin-left: 5px;margin-right: 40px;border: 1px solid #f0f0f0;padding: 8px;background-color: #39B54A;">{{item.msg}}</text>
					<image :src="item.userHead" style="height: 30px;width: 30px;border: 1px solid #f0f0f0;"></image>
				</view>
				<view class="xd-rows">
					<image :src="item.userHead" style="height: 30px;width: 30px;border: 1px solid #f0f0f0;"></image>
					<text style="margin-left: 5px;margin-right: 40px;border: 1px solid #f0f0f0;padding: 8px;background-color: #FFFFFF;">{{item.msg}}</text>
				</view>
				
			</view>
		</view>
		
		<view class="btn_bar xd-rows">
			<view style="flex: 1;margin-left: 5px;">
				<input style="background-color: #FFFFFF;flex: 1;height: 35px;padding-left: 5px;padding-right: 5px;" />
			</view>
			<button style="height: 30px;margin: 3px;font-size: 13px;display: flex;flex-direction: column;justify-content: center;" >发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId:uni.getStorageSync('id'),
				msgList:[],
				group:{},
				pageNum:1,
			}
		},
		methods: {
			//获取消息
			getGroupMsg(){
				let info={
					roomId:this.group.id,
					pageNum:this.pageNum,
					pageSize:10
				}
				let _this =this;
				this.xd_request_post(this.xdServerUrls.xd_selectMsgList, info, true).then((res) => {
					console.log("群消息列表信息",res);
					let list = res.obj.list;
					for (let i in list) {
						list[i].createTime =_this.xdUniUtils.xd_timestampToTime(list[i].createTime,false,true,false);
					}
					_this.msgList= _this.pageNum==1?list:_this.msgList.concat(list);
				}).catch(err => {});
			},
			//发消息
			sendGroupMsg(){
				//私发 lookUserId 传值
				let userInfos = uni.getStorageSync('userInfo');
				let info={
					roomId:this.group.id,
					sendUserId:this.userId,
					userHead:userInfos.userHead,
					userName:userInfos.userName,
					sendUserHead:userInfos.userHead,
					msg:this.inputMsg,
					lookUserId:""
				}
				let _this =this;
				this.xd_request_post(this.xdServerUrls.xd_sendRoomMsg, info, true).then((res) => {
					_this.getGroupMsg();
				}).catch(err => {});
			},
		},
		onLoad(option) {
			this.group =JSON.parse(decodeURIComponent(option.group));
			this.getGroupMsg();
		}
	}
</script>

<style>
.addBut{
	display: inline-flex;
	flex-direction: column;
	text-align: center;
	justify-content: center;
	align-content: center;
	padding-left: 5px;
	padding-right: 5px;
	padding-top: 2px;
	padding-bottom: 2px;
	border-radius: 20upx;
	background-color: #fd5107;
	font-size: 10px;
	color: #FFFFFF;
}
</style>
