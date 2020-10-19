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
				<view class="add-but-ly" @tap="userAdd">
					<text style="font-size: 25px;margin-top: 8px;" class="lg text-gray cuIcon-more"></text>
					<!-- <text class="add-but" hover-class="xd-but-active" @tap="userAdd">更多</text> -->
				</view>
			</view>
		</view>

		<!-- 消息列表  别人的左边展示  自己的右边展示-->
		<view style="padding: 10px;margin-bottom: 60px;">
			<view v-for="(item,index) in msgList" :key="index">
				<view v-if="item.sendUserId==userId" class="xd-rows" style="text-align: end;align-items: flex-end;justify-content: flex-end;margin-top: 10px;align-items: flex-start;">
					<image @tap="goPageImg(item.img)" v-if="item.img!=''" :src="item.img" class="msg-send-img" style="margin-right: 5px;margin-left: 40px;"
					 mode="widthFix"></image>
					<text v-else class="msg-msg" style="margin-right: 5px;margin-left: 40px;background-color: #ff9800;">{{item.msg}}</text>
					<image :src="item.userHead" class="msg-img"></image>
				</view>
				<view v-else class="xd-rows" style="margin-top: 10px;align-items: flex-start;">
					<image :src="item.userHead" class="msg-img" @longpress="lookSendUser(item)" @tap="goUserInfo(item)"></image>
					<image @tap="goPageImg(item.img)" v-if="item.img!=''" :src="item.img" class="msg-send-img" mode="widthFix"></image>
					<text v-else class="msg-msg">{{item.msg}}</text>
				</view>

			</view>
		</view>

		<view class="xd-common-bottom-ly xd-rows" style="padding-top: 5px;padding-bottom: 5px;">
			<view style="flex: 1;margin-left: 5px;border-radius: 5px;">
				<input :disabled="sendMsgPrims" class="input-msg" @input="sendMsgInput" :value="inputMsg"  :placeholder="inputHintMsg" @click="clickAddHint"/>
			</view>
			<view v-if="sendImg">
				<button class="send-img-but" @tap="sendPublicGroupImg" hover-class="xd-but-active">+</button>
			</view>
			<view v-else>
				<button class="send-but" :disabled="inputdisabled" @tap="sendPublicGroupMsg" hover-class="xd-but-active">发送</button>
				<view v-if="showPrivteBut" class="start-add">
					<button class="privite-send-but" @tap="sendGroupMsg" hover-class="xd-but-active">私发</button>
				</view>
			</view>

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
				inputHintMsg:"",
				lookUser: "",
				inputdisabled: true,
				sendMsgPrims: true,
				showPrivteBut: false,
				sendImg: true,
				custState: 3,
			}
		},
		methods: {
			//用户信息
			goUserInfo(user) {
				uni.navigateTo({
					url: '../../selfCenter/selfView?showInfo=true&userId=' + user.sendUserId+"&roomId="+this.group.id
				})
			},

			//长按可@用户发送消息
			lookSendUser(user) {
				this.lookUser = user;
				this.inputMsg = "@" + user.userName + " ";
				this.inputdisabled = false;
				this.showPrivteBut = true;
				this.sendImg = false;
			},
			//消息输入
			sendMsgInput(e) {
				let inpus = e.detail.value;
				this.inputMsg = inpus;
				this.inputdisabled = false;
				this.sendImg = false;
				if (this.xdUniUtils.IsNullOrEmpty(inpus)) {
					this.lookUser = "";
					this.inputdisabled = true;
					this.showPrivteBut = false;
					this.sendImg = true;
				}
			},
			//申请加入
			clickAddHint(){
				if (this.custState == 3){
					let _this =this;
					uni.showModal({
						title: '温馨提示',
						content: "申请加入获取发言权限",
						showCancel: true,
						cancelText:"暂不",
						confirmText:"申请",
						success: function(res) {
							if (res.confirm) {
								_this.userAdd();
							}
						}
					});
				}
			},
			//用户申请加入组
			userAdd() {
				let group = this.group;
				uni.navigateTo({
					url: "./userAddGroup?group=" + encodeURIComponent(JSON.stringify(group))
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
					if (!this.xdUniUtils.IsNullOrEmpty(list)) {
						for (let i in list) {
							list[i].img = _this.equals(list[i].msg, "http") ? list[i].msg : "";
							list[i].createTime = _this.xdUniUtils.xd_timestampToTime(list[i].createTime, false, true, false);
						}
						list.sort(function(a, b) {
							return a.time < b.time ? 1 : -1
						});
						_this.msgList = _this.pageNum == 1 ? list : list.concat(_this.msgList);
					}

				}).catch(err => {});
			},
			//获取用户在这个小组的状态
			getCustomerGroupState() {
				let info = {
					roomId: this.group.id
				}
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_currentStatusByRoom, info, true).then((res) => {
					console.log("用户在群状态", res); //1群主 2群成员 3游客
					_this.custState =  res.obj;
					_this.sendMsgPrims = res.obj == 3 ? true : false;
					_this.inputHintMsg = res.obj == 3 ? "申请加入获取发言权限" : "";
				}).catch(err => {});
			},
			/**
			 * 判断字符创包含另一个字符串
			 */
			equals(rst, rut) {
				if (rst.indexOf(rut) != -1) {
					return true;
				} else {
					return false;
				}
			},
			//发送图片
			sendPublicGroupImg() {
				if (this.custState == 3){
					this.clickAddHint();
					return;
				}
	

				const that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let tempFilePaths = res.tempFilePaths;
						that.xdUniUtils.xd_request_img(res.tempFilePaths[0]).then(res => {
							if (res) {
								uni.uploadFile({
									url: that.xdServerUrls.xd_uploadFile,
									filePath: tempFilePaths[0],
									name: 'files',
									formData: {
										'userId': uni.getStorageSync('id'),
									},
									success: (uploadFileRes) => {
										console.log(uploadFileRes.data)
										let photo = JSON.parse(uploadFileRes.data).obj[0];
										that.sendGroupImg(photo);
										// console.log(that.photo)
									}
								});
							} else {
								uni.showToast({
									title: '内容包含敏感内容',
									mask: true,
									duration: 2000,

								});
								return false
							}
						});

					}
				});

			},

			//发送消息
			sendPublicGroupMsg() {
				this.lookUser = "";
				this.sendGroupMsg();
			},
			goPageImg(e) {
				this.xdUniUtils.xd_showImg(e)
			},

			//往群里面发送图片
			sendGroupImg(imgurl) {
				//私发 lookUserId 传值 接收人的userid
				let userInfos = uni.getStorageSync('userInfo');
				let info = {
					roomId: this.group.id,
					sendUserId: this.userId,
					userHead: this.group.userHead, //创建人的头像
					userName: this.group.userName,
					sendUserHead: userInfos.userHead, //发消息人的头像
					msg: imgurl,
				}
				console.log("发消息", info);
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_sendRoomMsg, info, true).then((res) => {
					_this.inputMsg = "";
					_this.pageNum = 1;
					_this.lookUser = "";
					_this.getGroupMsg();
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

				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_sendRoomMsg, info, true).then((res) => {
					_this.inputMsg = "";
					_this.sendImg = true;
					_this.pageNum = 1;
					_this.lookUser = "";
					_this.inputdisabled = true;
					_this.showPrivteBut = false;
					_this.getGroupMsg();
				}).catch(err => {});
			},
		},
		onLoad(option) {
			this.group = JSON.parse(decodeURIComponent(option.group));
			console.log("组信息", this.group);
			this.getGroupMsg();
		},
		onShareAppMessage(res) {
			let that = this;
			if (res.from == "menu") {
				return that.xdUniUtils.xd_onShare();
			} else {
				return {
					title: that.group.roomName,
					path: '/pages/pageA/group/groupMsg?group='+encodeURIComponent(JSON.stringify(that.group)),
					imageUrl: that.group.roomHead,
				}
			}
		},
		onShow() {
			this.getCustomerGroupState();
		},
		onPullDownRefresh() {
			this.pageNum += 1;
			this.getGroupMsg();
			uni.stopPullDownRefresh();
		},
	}
</script>

<style lang="scss">
	.start-add {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		position: fixed;
		height: 30px;
		font-size: 12px;
		bottom: 40px;
		right: 0px;
		z-index: 99;
	}

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

	.msg-send-img {
		border-radius: 10px;
		border: 1px solid #f0f0f0;
		max-width: 80px;
		min-width: 40px;
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

	.privite-send-but {
		height: 30px;
		margin: 3px;
		font-size: 13px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		color: #FFFFFF;
		background-color: #FFA700;
	}

	.send-img-but {
		height: 30px;
		width: 30px;
		margin-right: 10px;
		margin-left: 10px;
		margin-top: 3px;
		border: 1px solid #000000;
		border-radius: 50%;
		font-size: 18px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-self: center;
		align-items: center;
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
		// border-radius: 20upx;
		// background-color: #fd5107;
		font-size: 10px;
		// color: #FFFFFF;
		margin-top: 5px;
	}
</style>
