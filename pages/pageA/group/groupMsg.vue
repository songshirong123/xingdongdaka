<template>
	<view>
		<!-- 小组简介 -->
		<view style="padding: 10px;border-bottom: 1px solid #f0f0f0;background-color: #FFFFFF;">
			<!-- 群组名称和图片 -->
			<view class="xd-rows">
				<view style="flex: 1;">{{group.roomName}}</view>
				<view>
					<image :src="group.roomHead" style="width: 120px;height: 60px;"></image>
				</view>
			</view>
			<!-- 用户信息 -->
			<view class="xd-rows">
				<view class="xd-rows" style="flex: 3;">
					<image :src="group.userHead" style="width: 25px;height: 25px;border-radius: 50%;border: 1px solid #f0f0f0;"></image>
					<text style="margin-left: 10px;margin-top: 7px;font-size: 12px;">{{group.userName}} {{group.createTime}}</text>
				</view>
				<view class="add-but-ly">
					<text class="add-but" hover-class="xd-but-active" @tap="userAdd">加入</text>
				</view>
			</view>
		</view>

		<!-- 消息列表  别人的左边展示  自己的右边展示-->
		<view style="padding: 10px;margin-bottom: 60px;">
			<view v-for="(item,index) in msgList" :key="index">
				<view v-if="item.sendUserId==userId" class="xd-rows" style="text-align: end;align-items: flex-end;justify-content: flex-end;margin-top: 10px;">
					<text class="msg-msg" style="margin-right: 5px;margin-left: 40px;background-color: #ff9800;">{{item.msg}}</text>
					<image :src="item.userHead" class="msg-img"></image>
				</view>
				<view v-else class="xd-rows" style="margin-top: 10px;">
					<image :src="item.userHead" class="msg-img" @longpress="lookSendUser(item)"></image>
					<text class="msg-msg">{{item.msg}}</text>
				</view>

			</view>
		</view>

		<view class="xd-common-bottom-ly xd-rows" style="padding-top: 5px;padding-bottom: 5px;">
			<view style="flex: 1;margin-left: 5px;border-radius: 5px;">
				<input class="input-msg" @input="sendMsgInput" :value="inputMsg" />
			</view>
			<button class="send-but" :disabled="inputdisabled" @tap="sendGroupMsg" hover-class="xd-but-active">发送</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userId: uni.getStorageSync('id'),
				msgList: [],
				group: {},
				pageNum: 1,
				inputMsg: "",
				lookUser:"",
				inputdisabled:true
			}
		},
		methods: {
			lookSendUser(user){
				console.log("lookSendUser", user);
				this.lookUser = user;
				this.inputMsg = "@"+user.userName+" ";
				this.inputdisabled=false;
			},
			//消息输入
			sendMsgInput(e) {
				let inpus =e.detail.value;
				this.inputMsg = inpus;
				this.inputdisabled=false;
				if(this.xdUniUtils.IsNullOrEmpty(inpus)){
					this.lookUser = "";
					this.inputdisabled=true;
				}
			},
			//用户申请加入组
			userAdd(){
				let group = this.group;
				uni.navigateTo({
					url:"./userAddGroup?group="+encodeURIComponent(JSON.stringify(group))
				})
			},
			//获取消息
			getGroupMsg() {
				let info = {
					roomId: this.group.id,
					pageNum: this.pageNum,
					pageSize: 10
				}
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_selectMsgList, info, true).then((res) => {
					console.log("群消息列表信息", res);
					let list = res.obj.list;
					if(!this.xdUniUtils.IsNullOrEmpty(list)){
						for (let i in list) {
							list[i].createTime = _this.xdUniUtils.xd_timestampToTime(list[i].createTime, false, true, false);
						}
						list.sort(function(a, b) {
							return a.time< b.time? 1 : -1
						});
						_this.msgList = _this.pageNum == 1 ? list : list.concat(_this.msgList);					
					}
					
				}).catch(err => {});
			},
			//发消息
			sendGroupMsg() {

				let msg = this.inputMsg;
				if (this.xdUniUtils.IsNullOrEmpty(msg)) {
					return this.xdUniUtils.showToast(false, "消息不能为空！", "");
				}
				//私发 lookUserId 传值 接收人的userid
				let userInfos = uni.getStorageSync('userInfo');
				let info = {
					roomId: this.group.id,
					sendUserId: this.userId,
					userHead: this.group.userHead, //创建人的头像
					userName: this.group.userName,
					sendUserHead: userInfos.userHead, //发消息人的头像
					msg: msg,
				}
				let user = this.lookUser;
				if (!this.xdUniUtils.IsNullOrEmpty(user)) {	
					info["lookUserId"] = user.sendUserId;
				}
				
				console.log("发消息", info);
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_sendRoomMsg, info, true).then((res) => {
					_this.inputMsg = "";
					_this.pageNum=1;
					_this.lookUser = "";
					_this.inputdisabled=true;
					_this.getGroupMsg();
				}).catch(err => {});
			},
		},
		onLoad(option) {
			this.group = JSON.parse(decodeURIComponent(option.group));
			this.getGroupMsg();
		},
		onPullDownRefresh() {
			this.pageNum+=1;
			this.getGroupMsg();
			uni.stopPullDownRefresh();
		},
	}
</script>

<style lang="scss">
	.msg-msg {
		margin-left: 5px;
		margin-right: 40px;
		max-width: 200px;
		border: 1px solid #f0f0f0;
		padding: 8px;
		background-color: #FFFFFF;
		border-radius: 5px;
		font-size: 14px;
		word-break: break-all;
		word-wrap: break-word;
		text-align: left;
	}

	.msg-img {
		height: 32px;
		width: 32px;
		border: 1px solid #f0f0f0;
	}

	.input-msg {
		background-color: #FFFFFF;
		flex: 1;
		height: 35px;
		padding-left: 5px;
		padding-right: 5px;
		vertical-align: text-top
	}

	.send-but {
		height: 30px;
		margin: 3px;
		font-size: 13px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #FFFFFF;
		background-color: #39B54A;		
	}

	.add-but-ly {
		flex: 1;
		text-align: end;
		align-items: flex-end;
		justify-content: flex-end;
	}

	.add-but {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		align-content: center;
		padding-left: 7px;
		padding-right: 7px;
		padding-top: 3px;
		padding-bottom: 3px;
		border-radius: 20upx;
		background-color: #fd5107;
		font-size: 10px;
		color: #FFFFFF;
		margin-top: 5px;
	}
</style>
