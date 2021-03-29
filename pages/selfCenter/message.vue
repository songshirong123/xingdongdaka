<template>
	<view class="message">
		<view class="topTab">
			<text class="tabBox" :class="{current: num == 0}" @tap="change(0)">我的消息</text>
			<text class="tabBox" :class="{current: num == 1}" @tap="change(1)">我的提醒</text>
		</view>
		<view class="msgContent">
			<view class="myMsg msgCon" :class="{dis: num == 0}">
				<!-- <view class="myMsgItem">
					<view class="header">
						<image style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid #333;"></image>
					</view>
					<view class="msgbody">
						<text style="display: block; font-size: 16px;">南风过境</text>
						<text style=" color: #9f9fa4; font-size: 14px;">快来围观我的目标吧</text>
					</view>
					<view class="right">
						<text style="display: inline-block; background-color: #ff6600; border-radius: 50%; width: 20px; height: 20px;line-height: 20px;">{{unreadMsg}}</text>
						<text style="color: #9f9fa4; margin: 0 6px;">09:41</text>
						<text style="color: #9f9fa4;">></text>
					</view>
				</view>
				<view class="myMsgItem">
					<view class="header">
						<image style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid #333;"></image>
					</view>
					<view class="msgmsgbody">
						<text style="display: block; font-size: 16px;">南风过境</text>
						<text style=" color: #9f9fa4; font-size: 14px;">快来围观我的目标吧</text>
					</view>
					<view class="right">
						<text style="display: inline-block; background-color: #ff6600; border-radius: 50%; width: 20px; height: 20px;line-height: 20px;">{{unreadMsg}}</text>
						<text style="color: #9f9fa4; margin: 0 6px;">09:41</text>
						<text style="color: #9f9fa4;">></text>
					</view>
				</view>
				<view class="myMsgItem">
					<view class="header">
						<image style="width: 50px; height: 50px; border-radius: 50%; border: 1px solid #333;"></image>
					</view>
					<view class="msgbody">
						<text style="display: block; font-size: 16px;">南风过境</text>
						<text style=" color: #9f9fa4; font-size: 14px;">快来围观我的目标吧</text>
					</view>
					<view class="right">
						<text style="display: inline-block; background-color: #ff6600; border-radius: 50%; width: 20px; height: 20px;line-height: 20px;">{{unreadMsg}}</text>
						<text style="color: #9f9fa4; margin: 0 6px;">09:41</text>
						<text style="color: #9f9fa4;">></text>
					</view>
				</view> -->
			</view>
			<!--                              我的提醒                                  -->
			<view class="myTips msgCon" :class="{dis: num == 1}">
				<view class="msgTitle">
					<text class="tips">全部提醒</text>
					<text :class="{bgc: flag}" class="read" @tap="allRead(id)" >全部已读</text>
				</view>
				<view class="myMsgItem borderLine" v-for="(item, index) in tipsList" :key = 'index' @tap="goDetails(item,index)">
					<view class="msgbody">
						<text style="display: block;">{{getMsgType(item.typename)}}提醒 【{{item.describes}}】</text>
						<text style="display: block;">{{xdUniUtils.xd_timestampToTime(item.updateTime,false,true,false) }}</text>
					</view>
					<view class="right">
						<text v-if="!arr.includes(index)" class="rightCount">{{item.unreadcount}}</text>
					</view>
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabId: 'looker',
				unreadMsg: 0,
				num: 0,
				dis: 'none',
				id: uni.getStorageSync('id'),
				tipsList: [],
				arr: [],
				flag: false
			};
		},
		onShow() {
			this.getMyTips(this.id)
		},
		methods:{
			// 	切换tab
			change(x) {
				this.num = x
				
			},
			// 获取消息类型
			getMsgType(type){
				// console.log(type)
				// console.log(typeof(type))
				var typename = {
					replay: "回复",
					comment: "评论",
					looker: "围观"
				}
				if(type == "replay") {
					return typename.replay
				}else if(type == "comment"){
					return typename.comment
				}else if(type == "looker"){
					return typename.looker
				}
			},
			// 获取【我的提醒】信息
			getMyTips(userId) {
				this.xd_request_get(
				this.xdServerUrls.xd_getMyTipsByUserId,
				{
					userId:11089
				},
				true
				).then((res => {
					this.$data.tipsList = res.obj
						console.log(this.$data.tipsList)
				}))
				// var that = this
				// console.log(that.id)
				// wx.request({
				// url: 'http://39.106.107.255:10065/msg/getSummaryMsg', //仅为示例，并非真实的接口地址
				// data: {
				//     userId:11089
				// },
				// header: {
				//     // 'content-type': 'application/json' // 默认值
				// 	'content-type': 'application/json'
				// },
				// method: 'GET',
				// success: function(res) {
				// 	console.log(res.data)
				// 	that.$data.tipsList = res.data.obj
				// 	console.log(that.$data.tipsList)
				// },
				// })
			},
			// 跳转至详情
			goDetails(e,index) {
				var that = this
				console.log(that)
				if(e.cardId){
					console.log('111')
					uni.navigateTo({
					url: '../index/cardDetails/cardDetails?pushId='+e.pushId+'&cardId='+e.cardId
				});
				} else {
					console.log('222')
					uni.navigateTo({
						url: '../index/action/action?pushId='+e.pushId+'&tabId='+that.tabId
					})
				}
				console.log(e)
				// 清除红点
				this.$data.arr.push(index)
			},
			// 全部已读
			allRead(userId){
				this.xd_request_get(
				this.xdServerUrls.xd_ignoreAllByUserId,
				{
					userId
				},
				true
				).then((res => {
					console.log('1111')
					this.xd_request_get(
					  this.xdServerUrls.xd_getUnreadMsgCount,
					  {
					    userId,
					  },
					  true
					).then((res) => {
						this.$data.arr = []
						this.$data.tipsList.forEach((item,index) => {
							this.$data.arr.push(index)
							})
							this.$data.flag = true
							console.log(this.$data.tipsList)
							console.log(this.$data.arr)
							console.log(this.$data.arr)
					});
				}))
			}
		},
		
	}
</script>

<style lang="scss">
	page{
		background-color: #fff;
	}
	.message{
		text-align: center;
	}
	.inlbox{
		display: inline-block;
		margin: 0 10px;
	}
	.topTab{
		margin: 20px 10px;
		border-radius: 5px;
		border: 1px solid #00c893;
		.tabBox {
			display: inline-block;
			color: #00c893;
			width: 50%;
			height: 30px;
			line-height: 30px;
			font-size: 14px;
		};
		.current {
			background-color: #00c893;
			color: #fff;
		}
	}
	.msgContent {
		.msgCon{
			display: none;
		};
		.dis {
			display: block;
		}
		.nodis{
			opacity: 0;
		}
		.borderLine{
			margin: 0 10px;
			font-size: 14px;
			border: 1px solid #ccc;
		}
		.myMsgItem{
			position: relative;
			display: flex;
			padding:12rpx 0;
			align-items: center;
			.right{
				font-size: 14px;
				right: 5px;
				top: 50%;
				transform: translate(-10%, -50%);
				position:absolute;
				.rightCount{
					display: inline-block; 
					background-color: #ff6600; 
					color: #fff; 
					border-radius: 10px; 
					width: 30px; 
					height: 20px;
					line-height: 20px;
				}
			}
			.msgbody{
				margin: 0 30px 0 10px;
				text-align: left;
			}
			.header{
				margin-left: 20px;
				padding:12rpx;
			}
		}	
			// -----------------------------------
		.msgTitle{
			margin: 0 20px 10px 20px;
			width: auto;
			height: 20px;
			.bgc{
				background-color: #ccc !important;
			}
			.tips{
				border-radius: 10px ;
				font-size: 12px;
				line-height: 20px;
				float: left;
			}
			.read{
				padding: 0 10px;
				border-radius: 10px ;
				background-color: #ff6600;
				color: #fff;
				font-size: 12px;
				line-height: 20px;
				float: right;
			}
		}
		
	}
</style>
