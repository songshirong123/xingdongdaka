<template>
	<view>
		<!-- 商家活动 -->
			<block v-for="(list, index) in merchantList" :key="index">
				<view class="cu-card dynamic">
					<view class="cu-item shadow">
						<view  @click="addActivity(list,0)"  class="text-content margin-top-sm padding-bottom-sm" style="border-bottom: 1upx solid #ddd;">
							<text class="text-orange">{{list.statusName}}</text>
							<view class="xd-rows">
								<text class="cu-tag light bg-red radius" >保证金：￥{{list.baoZhengJin}}</text>
								<text style="margin-left: 3px;">{{list.labels}}</text>
							</view>
							<view class="xd-rows">
								<text style="font-size: 10px;color: #999999;">截止日期：{{list.activityEndTime}}  计划天数：{{list.planDay}} 可休假天数：{{list.holidayDay}}</text>
							</view>
							<view style="height: 7px;"></view>
						</view>
						<view  @click="addActivity(list,0)"  class="text-contents contentext">
							<text style="font-size: 14px;font-weight: 700;">{{list.activityContent}}</text>
						</view>
						<view class="grid flex-sub padding-lr" style="margin-top: 5px;margin-bottom: 5px;">
							<image class="bg-img imgheit" :src="list.imgsUrl[0]" mode="aspectFill" @tap="goPageImgHD(list.imgsUrl)">
							</image>
						</view>
						<view  class="flex padding-sm">
							<view style="flex: 1;" @click="addActivity(list,1)">待审核</view>
							<view style="flex: 1;" @click="addActivity(list,2)">未达成</view>
							<view style="flex: 1;" @click="addActivity(list,3)">已通过</view>
							<view style="flex: 1;jjustify-items: flex-end;justify-content: flex-end;" class="xd-rows" @click="shareBut(index)">
								<text class="lg text-black cuIcon-forward" style="margin-top: 2px;"></text>
								<text style="margin-left: 3px;">分享活动</text>
							</view>
						</view>
					</view>
				</view>
			</block>
			<!-- 分享 -->
			<share 
				ref="share" 
				:contentHeight="950"
			></share>
	</view>
</template>

<script>
	import share from "@/components/share.vue"
	export default {
		components: {
			share
		
		},
		data() {
			return {
				shareImg:'',
				sharePath:'',
				scen:'',
				shareTitle:'',
				audioPlaySrc: '/static/images/icon/img/xddak.png',
				merchantList:[]
			}
		},
		//#ifdef MP-WEIXIN
		onShareTimeline() {
			let that = this;
			return {
				title: that.activity.labels,
				query: that.scen,
				imageUrl: that.shareImg,
			}
		},
		//#endif
		onShareAppMessage(res) {
			let that = this;
			that.$refs.share.hideModal();	
			return {
				title: that.shareTitle,
				path: that.sharePath+'?'+that.scen,
				imageUrl: that.shareImg,
			   }
		
		},
		methods: {
			shareBut(index){
				let that = this;
				that.shareImg=''
				that.scen=''
				that.sharePath=''
				that.shareTitle=''
				that.sharePath='/pages/pageA/merchant/merchantDetail'
				that.scen='activityid=' + that.merchantList[index].id+"&share="+ uni.getStorageSync('id')
				that.shareTitle=that.merchantList[index].activityContent
				if(that.xdUniUtils.IsNullOrEmpty(that.merchantList[index].imgsUrl)){
					that.shareImg= that.xdUniUtils.xd_randomImg(1)
					that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,'');	
				}else{
					that.shareImg=that.merchantList[index].imgsUrl[0];
					that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);	
				}
			},
			//活动详情
			activityDetail(event) {
				uni.navigateTo({
					url: './merchantDetail?activityid=' + event.id
				})
			},
			
			//添加活动
			addActivity(event,selectType) {
				uni.navigateTo({
					url: './merchantActionList?activityid=' + event.id+"&selectType="+selectType
				})
			},
			goPageImgHD(e, index) {
				this.xdUniUtils.xd_showImg(e, index)
			},
			getAction() {
				let _this = this;
				this.xd_request_get(this.xdServerUrls.xd_selectSHInfo, {
					token: uni.getStorageSync('token'),
					userId:uni.getStorageSync('id')
				}, true).then((res) => {
					console.log("xd_selectSHInfo")
					console.log(res);
					let list = res.obj;
					for (let i in list) {
						list[i].statusName=list[i].status==0?"已结束":"进行中…";
						list[i].activityEndTime=_this.xdUniUtils.xd_timestampToTime(list[i].activityEndTime, false, false, false);
						list[i].imgs = _this.xdUniUtils.IsNullOrEmpty(list[i].imgs) ? _this.audioPlaySrc : list[i].imgs;
						list[i].labels = _this.xdUniUtils.IsNullOrEmpty(list[i].labels) ? "暂未添加" : list[i].labels;
						list[i].planDay = _this.xdUniUtils.IsNullOrEmpty(list[i].planDay) ? "0" : list[i].planDay;
						list[i].activityContent = _this.xdUniUtils.IsNullOrEmpty(list[i].activityContent) ? "暂未添加" : list[i].activityContent;
						list[i].baoZhengJin = _this.xdUniUtils.IsNullOrEmpty(list[i].baoZhengJin) ? "0" : list[i].baoZhengJin;
						list[i].holidayDay = _this.xdUniUtils.IsNullOrEmpty(list[i].holidayDay) ? "0" : list[i].holidayDay;
						list[i].createTime = _this.xdUniUtils.xd_timestampToTime(list[i].createTime, false, true, false);
						list[i].imgsUrl = list[i].imgs.split(",");
					}
					_this.merchantList = list
				})
			},
			//编辑商户信息
		},
		onLoad() {
			this.getAction();
		}
	}
</script>

<style>
.imgheit {
		height: 320upx;
		width: 100%;
	}
	
</style>
