<template>
	<view class="container">
		<view >
			<form @submit="formSubmit" @reset="formReset">
				<!-- 列表 -->
				<view class="cu-list menu-avatar ">
					 
					<block v-for="(item, index) in lookerList" :key="item.id">
							<view class="cu-item">
								<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' +item.userHead + ')'}" @tap="goPageImg(item.userHead)"></view>
								<view class="content flex-sub" @tap="goPage(list)">
									<view>{{item.userName}}</view>
								</view>
								<view class="">
									<input :name="item.userId" placeholder="输入感谢金" type="number" :value="rmbList[item.userId]" confirm-type="done"/>
								</view>
								<text class="margin-right-xl">元</text>
								<view class=" text-xl">
									<text class="lg text-gray cuIcon-appreciate"></text>
									<text>{{item.lookerCount}}</text>
								</view>
							</view>
					</block>
				</view>
				<!-- 底部菜单栏 -->
				<view class="action-section">
					
					<!-- <button type="primary" class="no-border confirm-btn" @click="setrmb">智能设置</button> -->
					<view class="total-box">
						<!-- <text class="price">保证金¥{{challengeRmb}}</text> -->
					</view>
					<button type="primary" class="no-border confirm-btn" form-type="submit" >确定</button>
				</view>
			</form>
		</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	import indexList from "@/components/indexList.vue";
	
	export default {
		data() {
			return {
				lookNextPageTwo:'',
				pushId:'',
				lookerList:[],
				userInfos :uni.getStorageSync('userInfo'),
				userId:'',
				challengeRmb:'',
				rmbList:[],
			}
		},
		onLoad(options) {
			if(options.userId!=undefined){
				this.userId=options.userId;
				this.pushId=options.pushId;
				this.getUserInfo();
				// this.getpushList();
			}else{
				// this.pushId=options.pushId;
				// this.getLookerList();
				// this.getpushList();
			}
		},
		computed: {
			...mapState(['hasLogin','userInfo'])
		},
		methods: {
			setrmb(){
				
			},
			inputRmb(e){
				this.rmbList.push(e.detail.value);
			},
			formSubmit(e){
				let that = this;
				for (let k=0;k<that.lookerList.length ;k++ )
				          {
				      that.rmbList=e.detail.value;
					   console.log(that.rmbList)
				     }
				if(that.rmbList.length<=0){
					uni.showToast({
					    title: '感谢金不能为空',
						mask:true,
					    duration: 2000,
						icon:'none'
					});
					return false
				}
				let rmb=0;
				for (let j=0;j<that.lookerList.length ;j++ )
				          {
						  let index=that.lookerList[j].userId;
				          rmb+= that.rmbList[index.toString()];
				     }
					wx.getSetting({
						success: res => {
							if (res.authSetting['scope.userInfo']) {
								that.xd_request_post(that.xdServerUrls.xd_pay, {
									unionId: that.userInfos.unionId,
									openid: that.userInfos.openId,
									userName: that.userInfos.nickName,
									id: uni.getStorageSync('id'),
									token: uni.getStorageSync('token'),
									userHead: that.userInfos.avatarUrl,
									city: that.userInfos.city,
									province: that.userInfos.province,
									payRmb: rmb*100,
									pushId: that.pushId,
				
								}, true).then(res => {
				
									uni.requestPayment({
										'appId': res.obj.appId,
										'timeStamp': res.obj.timeStamp,
										'nonceStr': res.obj.nonceStr,
										'package': res.obj.packageAlias,
										'signType': 'MD5',
										'paySign': res.obj.paySign,
										success: function(res) {
											for(let i=0;i<that.rmbList.length;i++){
												that.xd_request_post(that.xdServerUrls.xd_saveGratitude,{
													pushId:that.pushId,
													userIds:that.userId,
													rmb:that.rmbList[i]*100,
													
												},true)
												.then(res=>{
													if(res){
														uni.navigateBack({
															delta:1
														})
													}
												})
											}
										},
										fail: function(err) {
											// 支付失败的回调中 用户未付款
											uni.showModal({
												content: '支付取消',
												confirmText: '继续支付',
												cancelText: '返回',
												image: '/static/images/icon/clock.png',
												success: function(res) {
													if (res.confirm) {
														that.rmbList=[];
														return false
													} else if (res.cancel) {
														uni.navigateBack({
															delta:1
														})
													}
												},
				
											});
										}
									});
								})
				
							} else {
								this.logOut();
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					})
				
				
			
			},
			// getLookerList(){
			// 	this.xd_request_post(this.xdServerUrls.xd_getLookerByPushId,{
			// 		pushId:this.pushId,
			// 		pageNum: this.lookNextPageTwo,
			// 		pageSize:10,
			// 	},true)
			// 	.then(res=>{
			// 		this.lookerList=res.obj.list;
			// 		this.lookNextPageTwo=res.obj.nextPage;	
			// 	})
			// },
			getUserInfo(){
				this.xd_request_post(this.xdServerUrls.xd_getUserInfoByUserId,{
					userId:this.userId,
				},true)
				.then(res=>{
					var data=res.obj;
					data.userId=res.obj.id;
					this.lookerList.push(data);
					
				})
			},
			// getpushList(){
			// 	this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId,{
			// 		pushId:this.pushId,
			// 		token:uni.getStorageSync('token')
			// 	},true).then(res=>{	
			// 		this.challengeRmb=res.obj.challengeRmb/100;
			// 	})
			// },
		}
		
		
	}
</script>
<style lang="scss">
	.container{
		padding-bottom: 134upx;
		}
	
	.action-section{
		position:fixed;
		left: 30upx;
		bottom:30upx;
		z-index: 95;
		display: flex;
		align-items: center;
		width: 690upx;
		height: 100upx;
		padding: 0 30upx;
		background: rgba(255,255,255,.9);
		box-shadow: 0 0 20upx 0 rgba(0,0,0,.5);
		border-radius: 16upx;
		
		.total-box{
			flex: 1;
			display:flex;
			flex-direction: column;
			text-align:right;
			padding-right: 40upx;
			.price{
				font-size: 40upx;
			
			}
			
		}
		.confirm-btn{
			padding: 0 38upx;
			margin: 0;
			border-radius: 100px;
			height: 76upx;
			line-height: 76upx;
			font-size: 30upx;
		
			box-shadow: 1px 2px 5px rgba(217, 60, 93, 0.72)
		}
		}
	
</style>
