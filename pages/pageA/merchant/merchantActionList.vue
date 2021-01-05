<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(items,index) in ['未达成','待审核','已审核']"
				 :key="index" @tap="tabSelect" :id="index">
					{{items}}
				</view>
			</view>
		</scroll-view>
		<!-- 事件内容 -->
		<block v-for="(list, index) in merchantList" :key="index">
			<view class="cu-card dynamic">
				<view class="cu-item shadow">
					<view  @tap="activityDetail(list)"  class="text-content margin-top-sm padding-bottom-sm" style="border-bottom: 1upx solid #ddd;">
						<view class="xd-rows">
							<text class="text-orange">进行中……</text>
							<text style="margin-left: 3px;">{{list.labels}}</text>
						</view>
						<view class="xd-rows">
							<text>打卡天数：{{list.planDay}} 可休假天数：{{list.holidayDay}}</text>
							<text style="margin-left: 3px;">保证金：￥{{list.baoZhengJin}}</text>
						</view>
						<view style="height: 7px;"></view>
					</view>
					<view  @tap="activityDetail(list)"  class="text-contents contentext">
						<text style="font-size: 14px;font-weight: 700;">{{list.activityContent}}</text>
					</view>
					<view class="grid flex-sub padding-lr" style="margin-top: 5px;margin-bottom: 5px;">
						<image class="bg-img imgheit" :src="list.imgs" mode="aspectFill" @tap="goPageImgHD(list.imgs)">
						</image>
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
			}
		},
		methods: {
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
				this.checkType = e.target.id+1;
				this.pageNum = 1;
				this.getAction();
			},
			getAction() {
				let _this = this;
				this.xd_request_get(this.xdServerUrls.xd_checkList, {
					token: uni.getStorageSync('token'),
					pageNum: _this.pageNum,
					pageSize: 10,
					type: _this.checkType
				}, true).then((res) => {
					console.log("xd_checkList")
					console.log(res);
					let list = res.obj.list;
					_this.merchantList = _this.pageNum == 1 ? list : _this.merchantList.concat(list);
					_this.pageNum = res.obj.nextPage;
				})
			},
		},
		onLoad() {
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

</style>
