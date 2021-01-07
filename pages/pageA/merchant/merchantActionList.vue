<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(items,index) in ['待审核','未达成','已审核']"
				 :key="index" @tap="tabSelect" :id="index">
					{{items}}
				</view>
			</view>
		</scroll-view>
		<!-- 事件内容 -->
		<block v-for="(list, index) in merchantList" :key="index">
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
						<view class="xd-rows">
							<text class="text-orange">{{list.statusName}}</text>
							<text style="margin-left: 3px;">{{activity.labels}}</text>
						</view>
						<view class="xd-rows">
							<text>打卡天数：{{activity.planDay}} 可休假天数：{{activity.holidayDay}}</text>
							<text style="margin-left: 3px;">保证金：￥{{activity.baoZhengJin}}</text>
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
						<view style="flex: 1;">
							<text class="text-sm marginxs" @tap="addActivityNo(list)">审核不通过</text>
						</view>
						<view class=" flex flex-wrap justify-end" style="flex: 1">
							<text class="text-sm marginxs" @tap="addActivityOk(list)">审核通过</text>
						</view>
					</view>
				</view>
				
			</view>
		</block>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				merchantList: [],
				pageNum: 1,
				checkType:1,
				activityid:0,
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
				this.checkType = parseInt(e.target.id) +1;
				this.pageNum = 1;
				this.getAction();
			},
			getAction() {
				let _this = this;
				if (this.pageNum == 0) {
					return this.xdUniUtils.showToast(false, "没有更多数据了！", "");
				}
				let info = {
					activityId:this.activityid,
					token: uni.getStorageSync('token'),
					pageNum: _this.pageNum,
					pageSize: 10,
					type: _this.checkType
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
			getStateName(id){
				if(id==1){
					return "进行中…";
				}else if(id==2){
					return "未完成";
				}else if(id==3){
					return "完成";
				}
				return "";
			},
		},
		onLoad(option) {
			let activity = JSON.parse(option.activity);
			this.activity = activity;
			this.activityid = activity.id;
			this.getAction();
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

<style>
.imgheit {
		height: 320upx;
		width: 100%;
	}
</style>
