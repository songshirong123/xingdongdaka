<template>
	<view class="formAction">
		<form @submit="formSubmit">
			<!-- <view class="uni-form-item uni-column">
				<view class="title">是否公开</view>
				<view class="form-item nobtm">
					<label class="radio">
						<radio value="r1" checked="true" color="#ffa700" />
						是
					</label>
					<label class="radio">
						<radio value="r2" color="#ffa700" />
						否
					</label>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">所属分类</view>
				<view class="sb-box">
					<view class="select">
						<picker @change="bindPickerChange" :value="dateList[index]" :range="dateList" :range-key="'str'">
							<view class="uni-input">{{ dateList[index]['showStr'] }}</view>
						</picker>
					</view>
					<view class="sb-icon"><view class="triangle"></view></view>
				</view>
			</view> -->
			<view class="uni-form-item uni-column">
				<view class="title">设置保障金</view>
				
				<view class="form-item"><input :value="rmb.challengeRmb" type="digit" class="digit" name="challengeRmb" placeholder="请输入保障金数额" maxlength="50" /></view>
				<view class="pricelis">
					<view class="priceli" @click="priceRmb(1)"><text>1元</text></view>
					<view class="priceli" @click="priceRmb(6)"><text>6元</text></view>
					<view class="priceli" @click="priceRmb(18)"><text>18元</text></view>
					<view class="priceli" @click="priceRmb(66)"><text>66元</text></view>
					<view class="priceli" @click="priceRmb(188)"><text>188元</text></view>
					<view class="priceli" @click="priceRmb(888)"><text>888元</text></view>
				</view>
			</view>
			<view class="uni-form-item uni-content">
				<text>说明：目标达成则原额退回。否则将全部扣除，分配30%给平台；剩余的70%平均分配给有效围观者，或在24小时内进行自定义特别感谢。</text>
			</view>
			<!--  #ifdef  MP-WEIXIN -->
			<view class="btn_bar">
				<view class="btns"><button class="btn" form-type="submit" >提交</button></view>
			</view>
			<!--  #endif -->
		</form>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
export default {
	data() {
		return {
			rmb:{
				challengeRmb:'',
			},
			formData:{},
			saveData:{},
			pushData:'',
			payNum:0,
				
			
		};
	},
	computed: {
	           ...mapState(['hasLogin'])  
	       },  
	onLoad(option) {
		
		this.formData= JSON.parse(decodeURIComponent(option.data));
		
	},
	methods: {
		...mapMutations(['logOut'])  ,
		timeType(res){
			var data=res.obj;
			var  time=this.xdUniUtils.xd_timestampToTime(data.createTime);
			    data.createTime=time;
				data.challengeRmb=Math.trunc(data.challengeRmb/100);
				return data;
		},
		formSubmit(e) {
			if(!this.hasLogin){
				uni.navigateTo({
					url: '../login/login' 
				});
				return false;
			}
			var that = this;
			// if(that.rmb.challengeRmb==null){
			// 	if(e.detail.value.challengeRmb==''||e.detail.value.challengeRmb==0){
			// 		uni.showToast({
			// 		    title: '请出入保障金',
			// 			mask:true,
			// 		    duration: 1000,
			// 			image:'/static/images/icon/clock.png'
			// 		});
			// 		return false
			// 	};
			// }		
			let userData={
				token:'',
				userId:'',
			}
			try{
				userData.token=uni.getStorageSync('token');
				userData.userId=uni.getStorageSync('id');
			}catch(e){
				//TODO handle the exception
			}
			if(that.rmb.challengeRmb!=''){
				that.saveData=Object.assign(that.formData,that.rmb,userData);	
			}else{
				that.saveData=Object.assign(that.formData,e.detail.value,userData);
				
			};
			if(that.rmb.challengeRmb==''&&that.payNum<=0){
				if(e.detail.value.challengeRmb==''||e.detail.value.challengeRmb<=0){
					that.saveData.challengeRmb=0;
					that.xd_request_post(that.xdServerUrls.xd_savePush,that.saveData,true).then( res=>{
						uni.reLaunch({
							url: '../index/action/action?pushList='+encodeURIComponent(JSON.stringify(that.timeType(res)))
							})
					})
				}else{
					that.saveData.challengeRmb=that.saveData.challengeRmb*100;
					if(that.payNum>0){
						that.pushData.obj.challengeRmb=that.saveData.challengeRmb;
						that.updataPushId();		
					}else{
						that.getPushId();		
					}
					    		
				}
			}else{
				that.saveData.challengeRmb=that.saveData.challengeRmb*100;
				if(that.payNum>0){
					that.pushData.obj.challengeRmb=that.saveData.challengeRmb;
					that.updataPushId();		
				}else{
					that.getPushId();		
				}
			}		
		},
		updataPushId(){
			console.log(this.pushData.obj)
			this.xd_request_post(this.xdServerUrls.xd_updatePushDataByPushId,
				{
					id:this.pushData.obj.id,
					userId:this.pushData.obj.userId,
					challengeRmb:0,
				}
			,true).then( res=>{
					uni.reLaunch({
						url: '../index/action/action?pushList='+encodeURIComponent(JSON.stringify(this.timeType(this.pushData)))
						})
			})
		},
		getPushId(){
			this.xd_request_post(this.xdServerUrls.xd_savePush,this.saveData,true).then( res=>{
				this.pushData=res;
				this.goPay();
			})
		},
		priceRmb(e){	
			this.rmb.challengeRmb=e
			this.formSubmit();
		},
		//#ifdef MP-WEIXIN
		goPay(){
			var that = this;
			var data={
				id:'',
				userName:'',
				// userMobile:''
				token:'',
				unionId:'',
				openid:'',
				city:'',
				province:'',
				payRmb:'',
				pushId:'',
			};
			let userInfo={};
			try{
				userInfo=uni.getStorageSync('userInfo');
				
			}catch(e){
				//TODO handle the exception
			};
			data.id=that.saveData.userId;
			data.token=that.saveData.token;
			data.city=userInfo.city;
			data.userName=userInfo.nickName;
			data.province=userInfo.province;
			data.unionId=userInfo.unionId;
			data.openid=userInfo.openId;
			data.payRmb=that.saveData.challengeRmb
			data.pushId=that.pushData.obj.id;
			wx.getSetting({
			  success: res => {
			    if (res.authSetting['scope.userInfo']) {
					that.xd_request_post(that.xdServerUrls.xd_pay,data,false).then(res=>{
						uni.requestPayment({
							 'appId': res.obj.appId,
							'timeStamp': res.obj.timeStamp,
							'nonceStr': res.obj.nonceStr,
							'package': res.obj.packageAlias,
							'signType': 'MD5',
							'paySign': res.obj.paySign,
							success: function (re) {
								uni.showToast({
									title: '微信支付成功',
									icon: 'success',
									duration: 1000
								});
								uni.reLaunch({
									url: '../index/action/action?pushList='+encodeURIComponent(JSON.stringify(that.timeType(that.pushData)))
								})
							},
							fail: function (err) {
								// 支付失败的回调中 用户未付款
								uni.showModal({
									content:'支付取消',
									confirmText:'发布行动',
									// cancelText:'发布行动',
									showCancel:false,
									image:'/static/images/icon/clock.png',
									success:function(ress) {
										 if (ress.confirm) {
											 that.pushData.obj.challengeRmb=0;
												that.updataPushId();
						// 					 that.xd_request_post(that.xdServerUrls.xd_updatePushDataByPushId,
						// 					 {
						// 						pushTarget: that.pushData.obj.toString()
						// 					 }
						
						// 					 ,true).then( res=>{
						// 					 	uni.reLaunch({
						// 					 		url: '../index/action/action?pushList='+encodeURIComponent(JSON.stringify(that.timeType(res)))
						// 					 		})
											 	
						// 					 })
										}
										 // else if (ress.cancel) {
										// 	that.rmb.challengeRmb='';
										// 	that.payNum++;
										// 	console.log(that.rmb.challengeRmb)
										// 	return false
										// 	}
										},
										
								});
							}
						});
					})
			}else{
				  this.logOut();
				  uni.navigateTo({
					url: '../login/login'
				  });
			  }
								
		}
		
		})
		//#endif
		}
	},
	
};
</script>

<style lang="scss">
.formAction {
	padding: 0 30rpx 150rpx 30rpx;
	font-size: 30rpx;
}
.uni-form-item {
	.title {
		padding: 15rpx 0;
		font-weight: bold;
	}
	.form-item {
		&:not(.nobtm) {
			border-bottom: 1px solid #ffa700;
		}
		height: 68rpx;
		line-height: 68rpx;
		margin-bottom: 12rpx;
		padding: 0 20rpx;
		.radio {
			margin-right: 20rpx;
		}
	}
}
.btn_bar {
	position: fixed;
	bottom: 0;
	left: 0;
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
.pricelis {
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	.priceli {
		width: 190rpx;
		height: 100rpx;
		line-height: 100rpx;
		margin-top: 35rpx;
		text-align: center;
		border: 1px solid $xd-color-base;
	}
}
.sb-box {
	display: flex;
	height: 65rpx;
	line-height: 65rpx;
	border: 1px solid $xd-color-base;
	border-radius: 5px;
	overflow: hidden;
	position: relative;
	.select {
		flex: 1;
		.sb-input {
			padding: 0 20rpx;
			color: #666;
		}
	}
	.sb-icon {
		position: absolute;
		height: 65rpx;
		right: 0;
		z-index: -1;
		background: $xd-color-base;
		width: 55rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		.triangle {
			width: 0;
			height: 0;
			border-left: 10rpx solid transparent;
			border-right: 10rpx solid transparent;
			border-top: 10rpx solid #fff;
		}
	}
}
.uni-content{
	margin-top:50rpx;
	color:#888;
	font-size: 26rpx;
	line-height: 45rpx;
}
</style>
