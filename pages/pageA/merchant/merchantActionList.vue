<template>
	<view>
		<view class="cu-card dynamic">
			<view class="cu-item shadow">
				<view class="text-content margin-top-sm padding-bottom-sm" style="border-bottom: 1upx solid #ddd;">
					<text class="text-orange">{{activity.statusName}}</text>
					<view class="xd-rows">
						<text class="cu-tag light bg-red radius" >保证金：￥{{activity.baoZhengJin}}</text>
						<text style="margin-left: 3px;">{{activity.labels}}</text>
					</view>
					<view class="xd-rows">
						<text style="font-size: 10px;color: #999999;">截止日期：{{activity.activityEndTime}}  计划天数：{{activity.planDay}} 可休假天数：{{activity.holidayDay}}</text>
					</view>
					<view style="height: 7px;"></view>
				</view>
				<view class="text-contents contentext">
					<text style="font-size: 14px;font-weight: 700;">{{activity.activityContent}}</text>
				</view>
				<view class="grid flex-sub padding-lr" style="margin-top: 5px;margin-bottom: 5px;">
					<image class="bg-img imgheit" :src="activity.imgs" mode="aspectFill" @tap="goPageImgHD(activity.imgs)">
					</image>
				</view>
			</view>
		</view>
		
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(items,index) in ['全部','待审核','未达成','已通过','参与者']"
				 :key="index" @tap="tabSelect" :id="index">
					{{items}}
					<!-- <text v-if="index==TabCur">{{merchantList.length}}</text> -->
				</view>
			</view>
		</scroll-view>
		<view v-if="TabCur==4" v-for="(attention,index) in activityUserList" :key="index">
			<view class="ali-main bg-white">
				<view class="ali-main-img">
					<image class='xd-mag' :src="attention.userHead"></image>
				</view>
				<view class="lli-main-content">
					<view class="xd-list-title-text">
						<text>{{attention.userName}}</text>
					</view>
					<view class="moreInfoIn">
						<image class='address' src="/static/images/icon/address.png"></image>
						<text class="province">{{attention.province}}.{{attention.city}}</text>
					</view>
				</view>
				<view class="ali-main-list">
					<view class="ali-main-list-num">共打卡{{attention.pushCard}}次</view>
				</view>
			</view>
		
		</view>
		
		<!-- 事件内容 -->
		<block v-if="TabCur!=4" v-for="(list, index) in merchantList" :key="index">
			<view class="cu-card dynamic">
				<view class="cu-item shadow">
					<view class="cu-list menu-avatar">
						<view class="cu-item">
							<view class="cu-avatar round lg"  :style="{backgroundImage: 'url(' +list.userHead + ')'}" @tap="goPageImg(list.userHead)"></view>
							<!-- class="content flex-sub" -->
							<view class="xd-columns" style="position: absolute;left: 146upx;">
								<view>{{list.userName}}</view>
								<!-- 打卡地址 -->
								<view class="text-gray text-sm flex justify-between" style="color: #1cbbb4;font-size: 8px;">
									{{list.province}}
								</view>
							</view>
						</view>
					</view>
					<view  @tap="activityDetail(activity)"  class="text-content cu-item margin-top-sm">
						<text class="text-orange">{{list.statusName}}</text>
						<view class="xd-rows">
							<text class="cu-tag light bg-red radius" >保证金：￥{{activity.baoZhengJin}}</text>
							<text style="margin-left: 3px;">{{activity.labels}}</text>
						</view>
						<view class="xd-rows">
							<text style="font-size: 10px;color: #999999;">截止日期：{{activity.activityEndTime}}  计划天数：{{activity.planDay}} 可休假天数：{{activity.holidayDay}}</text>
						</view>
					</view>
					<view  @tap="activityDetail(activity)"  class="text-contents contentext">
						<text style="font-size: 14px;font-weight: 700;">{{activity.activityContent}}</text>
					</view>
					<view class="grid flex-sub padding-lr" style="margin-top: 5px;margin-bottom: 5px;">
						<image class="bg-img imgheit" :src="activity.imgs" mode="aspectFill" @tap="goPageImgHD(activity.imgs)">
						</image>
					</view>
					<view  class="flex padding-sm">
						<view v-if="list.reason!=null" style="flex: 1;">
							<text v-if="list.reason=='已通过'" style="color: #39B54A;">{{list.reason}}</text>
							<view v-else class="xd-columns">
								<text style="color: red;">参与活动失败</text>
								<text>失败原因：{{list.reason}}</text>
							</view>
							
						</view>
						<view v-if="list.pushCardStatus==1 ||list.pushCardStatus==3" style="flex: 1;justify-items: center;justify-content: center;text-align: center;">
							<button size="mini" type="warn"@tap="addActivityNo(list)">审核不通过</button>
						</view>
						<view v-if="list.pushCardStatus==1 ||list.pushCardStatus==2" style="flex: 1;justify-items: center;justify-content: center;text-align: center;">
							<button size="mini" type="primary"  @tap="addActivityOk(list)">审核通过</button>
						</view>
					</view>
				</view>
				
			</view>
		</block>
		<view v-if="showInReLy">
			<view class="mask"></view>
			<view class="maskDialog" style="border-radius: 10px;">
				<view class="xd-columns">
					<view class="xd-columns" style="text-align: center;padding-bottom: 5px;padding-top: 5px;">
						<text style="font-size: 16px;">审核不通过</text>
						<text>请填写不通过原因</text>
					</view>
					<view class="padding-xs">
						<input @input="inputInfo" style="height: 60px;padding: 6px;border: 1px solid #777777;" />
					</view>
					<view class="flex" style="border-top: 1px solid #f0f0f0;">
						<text @click="showInReLyBut(0)" style="flex: 1;text-align: center;padding-top: 12px;padding-bottom: 12px;">取消</text>
						<text @click="showInReLyBut(1)"style="border-left: 1px solid #f0f0f0;flex: 1;text-align: center;padding-top: 12px;padding-bottom: 12px;color: #007AFF;">确定</text>
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
				showInReLy:false,//显示输入的原因
				TabCur: 0,
				merchantList: [],
				activityUserList: [],
				pageNum: 1,
				inputMsg:"",
				activityid:0,
				selectHD:{},
				activity:{}
			}
		},
		methods: {
			//审核通过
			addActivityOk(event){
				let _this =this;
				uni.showModal({
					title: '温馨提示',
					content: "您确定要通过该活动吗？？",
					showCancel: true,
					success: function(res) {
						if (res.confirm) {
							_this.checkReason(event,"已通过");
						}
					}
				});
			},
			inputInfo(e) {
				this.inputMsg = e.detail.value;
			},
			showInReLyBut(types){
				if(types==0){
					this.showInReLy =false;
				}else{
					let inpuMsg = this.inputMsg;
					if(this.xdUniUtils.IsNullOrEmpty(inpuMsg)){
						return  this.xdUniUtils.showToast(false, "不通过原因不能为空！！", "");
					}
					this.showInReLy =false;
					this.checkReason(this.selectHD,inpuMsg);
				}
			},
			
			checkReason(event,msg) {
				let _this = this;
				let info = {
					id:event.id,
					activityId: this.activityid,
					reason:msg,
					token: uni.getStorageSync('token')
				}
				console.log("xd_checkReason参数")
				console.log(info);
				this.xd_request_get(this.xdServerUrls.xd_checkReason, info, true).then((res) => {
					console.log("xd_checkReason")
					console.log(res);
					_this.pageNum = 1;
					_this.getAction();
				})
			},
			//审核不通过
			addActivityNo(event){
				this.showInReLy =true;
				this.selectHD = event;
			},
			//活动详情
			activityDetail(event) {
				uni.navigateTo({
					url: './merchantDetail?activity=' + JSON.stringify(event)
				})
			},
			goPageImgHD(e, index) {
				this.xdUniUtils.xd_showImg(e, index)
			},
			tabSelect(e) {
				this.TabCur = e.target.id;
				this.pageNum = 1;
				this.inputMsg="",
				this.getAction();
			},
			getAction() {
				if(this.TabCur==4){
					this.getActivityUserList();
				}else{
					this.getActionList();
				}
			},
			selectByActivityId() {
				let _this = this;
				let info = {
					activityId: this.activityid,
					token: uni.getStorageSync('token')
				}
				this.xd_request_get(this.xdServerUrls.xd_selectByActivityId, info, true).then((res) => {
					console.log("获取活动详情", res);
					let Acobj= res.obj;
					Acobj.statusName=Acobj.status==0?"进行中…":"已结束";
					Acobj.activityEndTime=_this.xdUniUtils.xd_timestampToTime(Acobj.activityEndTime, false, false, false);
					_this.activity = Acobj;
					_this.getAction();
				}).catch(err => {});
			},
			getActionList(){
				let _this = this;
				if (this.pageNum == 0) {
					return this.xdUniUtils.showToast(false, "没有更多数据了！", "");
				}
				let info = {
					activityId:this.activityid,
					token: uni.getStorageSync('token'),
					pageNum: _this.pageNum,
					pageSize: 10,
					type: _this.TabCur==0?4:_this.TabCur
				}
				console.log("xd_checkList参数")
				console.log(info);
				this.xd_request_get(this.xdServerUrls.xd_checkList, info, true).then((res) => {
					console.log("xd_checkList")
					console.log(res);
					let list = res.obj.list;
					for (let i in list) {
						list[i].statusName = _this.getStateName(list[i].pushCardStatus);
					}
					_this.merchantList = _this.pageNum == 1 ? list : _this.merchantList.concat(list);
					_this.pageNum = res.obj.nextPage;
				})
			},
			
			//参与者列表
			getActivityUserList() {
				if (this.pageNum == 0) {
					return this.xdUniUtils.showToast(false, "没有更多数据了！", "");
				}
			
				let info = {
					activityId: this.activityid,
					pageNum: this.pageNum,
					pageSize: 10
				}
				uni.showLoading({
					title: '加载中..',
				})
				let _this = this;
				console.log("参与者参数", info);
				this.xd_request_get(this.xdServerUrls.xd_joinActivityUserList, info, true).then((res) => {
					uni.hideLoading();
					console.log("参与者结果", res);
					let list = res.obj.list;
					_this.activityUserList = _this.pageNum == 1 ? list : _this.activityUserList.concat(list);
					_this.pageNum = res.obj.nextPage;
				}).catch(err => {});
			},
			getStateName(id){
				if(id==1){
					return "进行中…";
				}else if(id==2){
					return "未完成";
				}else if(id==3){
					return "已完成";
				}
				return "";
			},
		},
		onLoad(option) {
			this.activityid = option.activityid;
			this.TabCur =option.selectType;
			this.selectByActivityId();
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.pageNum = 1;
			this.getAction();
		},
		// 上拉加载
		onReachBottom() {
			this.getAction();
		},
	}
</script>

<style lang="scss">
	.mask{
		width: 100%;height: 100%;background-color: #000000;position: fixed;top: 0;left: 0;opacity: 0.7;z-index: 1001;
	}
	.maskDialog{
		width: 80%;
		margin-left: 10%;
		background-color: #FFFFFF;
		position: fixed;
		top: 20%;
		z-index: 1002;
	}
.imgheit {
		height: 320upx;
		width: 100%;
	}
	
	.ali-main {
		display: flex;
		padding: 20rpx;
		border-bottom: 1px solid #DDDDDD;
	
		.ali-main-list {
			margin-left: 10%;
			line-height: 130rpx;
	
			.ali-main-list-num {}
		}
	
		.ali-main-img .xd-mag {
			border-radius: 100%;
			height: 125rpx;
			width: 125rpx;
		}
	
		.lli-main-content {
			margin-left: 15px;
			padding-top: 10px;
	
			.lli-main-content-text {
				// line-height: 90rpx;
				margin-right: 20rpx;
			}
	
			.moreInfoIn {
				.address {
					width: 30rpx;
					height: 30rpx;
				}
	
				.province {
					font-size: 28rpx;
					margin-left: 6rpx;
				}
			}
		}
	}
</style>
