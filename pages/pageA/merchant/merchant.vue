<template>
	<view style="background-color: #FFFFFF">
		<view class="xd-columns">
			<!-- 头像 -->
			<view class="cu-item flex padding flex-wrap align-center solid-bottom">
				<view class="cu-avatar round ll" :style="{backgroundImage: 'url(' +newList.userHead + ')'}"></view>
				<view class="content flex-sub margin-left-sm">
					<view class="text-lg flex align-center" style="padding-bottom: 5px;">
						<text style="font-weight: 700;color: #000000;">{{newList.userName}}</text>
						<text v-if="newList.gender==2" class="cuIcon-female" style="color: #fd5107;margin-left: 5px;font-size: 12px;"></text>
						<text v-if="newList.gender==1" class="cuIcon-male" style="color: #1cbbb4;margin-left: 5px;font-size: 12px;"></text>
					</view>

					<view class=" text-lg flex align-center">
						<text class="text-gray text-sm ">{{newList.province}}{{newList.city}}</text>
					</view>
					<view class=" text-lg flex align-center" v-if="newList.schoolName">
						<text class="text-gray text-sm ">{{newList.schoolName}}</text>
					</view>
				</view>
				<view>
					<view class="cu-tag line-orange radius">已开通审核权限</view>
				</view>
			</view>

			<!-- 说明 -->
			<view class="xd-columns" style="padding: 10px;border-bottom: 2px solid #f0f0f0;">
				<text>1.已获取分享后行动项的审核权、审核目标是否达成，可设置自己需要的条件。</text>
				<text>2.已获取分享后行动项的收入权，获得保证金的特别分配收入。</text>
				<view class="xd-rows">
					<text>3.详细情况可咨询客服。</text>
					<button style="background-color: #FFFFFF;border:1px solid #ffffff; height:40upx;box-shadow: none;line-height: 1;font-size: 32upx;margin-left: 1px;" open-type="contact">
						<text class="cuIcon-service"></text>
					</button>
				</view>
			</view>
			<!-- 事件内容 -->
			<view v-for="(item,index) in userInfolist" @tap="selectGroup(item)" :key="index" style="padding: 10px;border-bottom: 1px solid #f0f0f0;background-color: #FFFFFF;">
				<view class="xd-rows">
					<view class="xd-rows" style="flex: 1;padding-top: 3px;padding-bottom: 3px;">
						<text :class='item.Icon'  style="margin-top: 2px;"></text>
						<text class='thin' style="margin-left: 5px;">{{item.Name}}</text>
					</view>
					<view class="xd-rows" style="width: 100px;display: flex;justify-content: flex-end;padding-top: 3px;padding-bottom: 3px;">
						<text>{{item.Value}}</text>
						<text class="text-gray cuIcon-right" style="margin-top: 2px;"></text> 
					</view>
					  
				</view>
			</view>
		</view>
		<view class="xd-common-bottom-ly" style="padding: 5px;background-color: #FFFFFF">
			<view style="flex: 1">
				<button class="bg-orange" hover-class="xd-but-active" @tap="userSubmit">发起活动</button>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				newList: {},
				userBean: {},
				userInfolist: [{
					ID: 0,
					Name: "联系电话",
					Value: "暂无",
					Icon: "cuIcon-mobile"
				}, {
					ID: 1,
					Name: "活动电话",
					Value: "暂无",
					Icon: "cuIcon-phone"
				}, {
					ID: 2,
					Name: "联系微信",
					Value: "暂无",
					Icon: "cuIcon-weixin"
				},{
					ID: 3,
					Name: "我的活动",
					Value: "",
					Icon: "cuIcon-activity"
				}, {
					ID: 4,
					Name: "活动收入",
					Value: "",
					Icon: "cuIcon-activity"
				}, {
					ID: 5,
					Name: "参与活动",
					Value: "",
					Icon: "cuIcon-activity"
				}],
			}
		},
		computed: {
			...mapState(['hasLogin', 'userInfo'])
		},
		methods: {
			selectGroup(item){
				let id = item.ID;
				if(id==0 || id==1||id==2){
					
				}else if(id==3){
					
				}else if(id==4){
					
				}else if(id==5){
					uni.navigateTo({
						url:'./merchantActionList'
					})
				}
			},
			//发起活动
			userSubmit(){
				uni.navigateTo({
					url:'./merchantAction'
				})
			},
			//获取余额 如果没有余额或者余额不够支付 用微信支付否则用余额支付
			getBalance() {
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_inquireBalance, {
					token: uni.getStorageSync('token')
				}, true).then((res) => {
					console.log("res.obj xd_inquireBalance")
					console.log(res.obj)
					_this.userBean = res.obj.userBean;
					let userMobile = _this.userBean.userMobile;
					if (_this.xdUniUtils.IsNullOrEmpty(userMobile)) {
						let mobiles = userMobile.split(",");
						_this.userInfolist[0].Value = mobiles[0];
						_this.userInfolist[1].Value = mobiles[1];
					}
				})
			},
		},
		onShow() {
			this.getBalance();
			if (!this.hasLogin) {
				return this.xdUniUtils.xd_login(this.hasLogin);
			}
			if (this.userInfos == '' || this.userInfos == undefined || this.userInfos == null) {
				try {
					this.newList = uni.getStorageSync('userInfo')
				} catch (e) {
					console.log(Error)
				};
			}
		}
	}
</script>

<style>

</style>
