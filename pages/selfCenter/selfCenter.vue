<template>
	<view class="selfCenter">
		<!-- <button @click="clickMe">支付</button> -->
		<view class="personContent">
			<view class="personHead" @click="goPage('/pages/selfCenter/editUserInfo')">
				<img :src="userInfo.avatarUrl" alt="" class="imgHead">
			</view>
			<view class="personInfo"  @click="goPage('/pages/selfCenter/editUserInfo')">
				<view class="xd-list-title-text name ">
					<text>{{userInfo.nickName}}</text>
				</view>
				<view class="subInfo">
					<text></text>
				</view>
			</view>
			<!-- <view class="personOpt">
				<text class="viewself link"  @click="goPage('/pages/selfCenter/selfView?view=other')">个人主页</text>
				<button @click="clickMe" class="pay">支付</button>
			</view> -->
		</view>
		<view class="moreInfo">
			<view class="moreInfoRow">
				<view class="moreInfoIn">
					<text>{{userInfo.province}}.{{userInfo.city}}</text>
				</view>
				<view class="moreInfoIn" >
					<text v-if="userInfo.gender==1" class="boy">♂</text>
					<text v-else class="gender">♀</text>
					<!-- <text>20</text> -->
				</view>
				<view class="moreInfoIn flex1">
					<text>学校</text>
				</view>
				<!-- <view class="moreInfoIn">
					<text>  &nbsp;</text>
				</view> -->
			</view>
			<!-- <view class="moreInfoRow">
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
				<view class="moreInfoIn link">
					<text>订单详情</text>
				</view>
				<view class="moreInfoIn">
					<text>积分：1</text>
				</view>
				<view class="moreInfoIn link" @click="goPage('/pages/selfCenter/income')">
					<text>收益：1999</text>
				</view>
			</view>
			 -->
		</view>
		
		<!-- <view class="actionInfo">
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
		</view> -->
	</view>
</template>

<script>
	// import actionlist from "./selfCenterList.vue"
	import actionlist from "@/components/actionlist.vue"
	export default {
		data() {
			return {
				tab:0,//行动，围观，收藏
				list:[1,2,3,4,5],
				userInfo:uni.getStorageSync('userInfo'),
			}
		},
		methods: {
			goPage(url){
				uni.navigateTo({
					url
				});
			},
			clickMe: function () {
			 
			 //  wx.showToast({
			 //    title: '成功-2',
			 //    icon: 'success',
			 //    duration: 2000
			 //  })
			  // 登录
			  wx.login({
			    success: res => {
			      console.info("aaaaa" + res.code);
			      let code = res.code;
			      var getOpenId = "https://api.weixin.qq.com/sns/jscode2session?appid=wxc2af58f1589eb15d&secret="+
			      "e89b64565ff1deacc73ee0c5e9ddd581&js_code="+ res.code +"&grant_type=authorization_code";
			      wx.request({
			        url: getOpenId, //仅为示例，并非真实的接口地址
			        header: {
			          'content-type': 'application/json' // 默认值
			        },
			        success(res) {
			          console.info(1111111);
			          console.log(res)
			
			          wx.request({
			            url: 'https://xingdongdaka.zhidashixun.com/wechat/pay', //仅为示例，并非真实的接口地址
			            method: 'post',
			            data: {
			              openid: res.data.openid
			            },
			           header: {
			             'content-type': 'application/x-www-form-urlencoded' // 默认值
			            },
			            success(res) {
			              console.info(2222222);
			              console.log(res.data);
			              console.log(res.data.obj.appId);
			
			
			              // 获取用户信息
			              wx.getSetting({
			                success: res => {
			                  if (res.authSetting['scope.userInfo']) {
			                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
			                    wx.getUserInfo({
			                      success: res => {
			                        console.info(55555);
			                        console.info(res);
			                        console.info(res.iv);
			                        console.info(res.encryptedData);
			                        console.info(res.cloudID);
			                        let iv = res.iv;
			                        let encryptedData = res.encryptedData;
			
			                       //  // 可以将 res 发送给后台解码出 unionId
			                       //  this.globalData.userInfo = res.userInfo
			
			                       //  // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
			                       //  // 所以此处加入 callback 以防止这种情况
			                       //  if (this.userInfoReadyCallback) {
			                       //    this.userInfoReadyCallback(res)
			                       //  }
			                         console.info("bbbbb");
			                        console.info(iv);
			                        console.info(encryptedData);
			                        console.info(encodeURIComponent(encryptedData))
			                        console.info(code);
			                       //  wx.request({
			                       //    url: 'http://xingdongdaka.zhidashixun.com/login/weiXinLogin',
			                       //    method: 'post',
			                       //    data: {
			                       //       userName: "1212aaa",
			                       //      encryptedData: encodeURIComponent(encryptedData),
			                       //       iv: iv,
			                       //      code: code
			                       //    },
			                       //    header: {
			                       //      'content-type': 'application/x-www-form-urlencoded' // 默认值
			                       //    },
			                       //    success(res) {
			                       //      console.info(66666);
			                       //      console.info(res);
			                       //    }
			                       //  });
			
			
			
			                      }
			                    })
			                  }
			                }
			              })
			
			             
			              
			
			       wx.requestPayment(
			             {
			             'appId': res.data.obj.appId,
			           'timeStamp': res.data.obj.timeStamp,
			           'nonceStr': res.data.obj.nonceStr,
			           'package': res.data.obj.packageAlias,
			           'signType': 'MD5',
			           'paySign': res.data.obj.paySign,
			               'success': function (res) {
			                 console.info(res);
			               },
			               'fail': function (res) {console.info(res) },
			               'complete': function (res) {
			                 console.info(res);
			               }
			             })
			
			
			            }
			          })
			
			
			        }
			      })
			
			
			    }, 'fail': function (res) { console.info(res) },
			       'complete': function (res) {
			
			         // wx.showToast({
			         //   title: 'error' + res,
			         //   icon: 'success',
			         //   duration: 2000
			         // })
			       }
			  })
			
			
			 },
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
	.viewself{
		font-size: 26rpx;
		margin-right: 24rpx;
	}
	.link{
		color:$xd-color-base;
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
	.boy{
		background:#66CCFF;
		color:#fff;
		display: inline-block;
		padding:0 6rpx;
		border-radius: 100%;
		font-size: 22rpx;
		margin-right: 2rpx;
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
