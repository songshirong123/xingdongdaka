<template>
	<view class="content">
		<!-- 搜索 -->
		<view class="xd-search-box">
			<view class="xd-search">
				<view class="pageNav xd-flex-center">
					<view :class="[active == 0 ? 'active' : '']" @tap="showNew">最新</view>
					<view :class="[active == 1 || active ==3 ? 'active' : '']" @tap="showRecommend">推荐</view>
					<view :class="[active == 2 ? 'active' : '']" @tap="showFollow">关注</view>
				</view>
			</view>
		</view>
		<view class="xd-body">

			<!-- 最新 -->
			<view class="xd-list-info" :hidden="active == 1||active==2|| active ==3">
				<block v-for="(list, index) in listsTab" :key="index">


					<!-- <indexList  @gotoSponsor='gotoSponsor' :list="list" :index="index" v-on:loveclick='loveClick' :hasLogin="hasLogin" :userId='userId' v-on:lookerClick="lookerClick" :inimg='inimg'></indexList>

				  <indexList  :list="list" :index="index" v-on:loveclick='loveClick' :hasLogin="hasLogin" :userId='userId' v-on:lookerClick="lookerClick" :inimg='inimg' :Off="Off"></indexList> -->


					<indexList @gotoSponsor='gotoSponsor' :list="list" :index="index" v-on:loveclick='loveClick' :hasLogin="hasLogin"
					 :userId='userId' v-on:lookerClick="lookerClick" :inimg='inimg'></indexList>

				</block>
			</view>
			<!-- 推荐 -->
			<view class="xd-list-info" :hidden="active == 0||active==2">
				<view class="cu-bar search bg-white">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input @blur="search" :adjust-position="false" type="text" :value='searchValue' placeholder="输入搜索行动" confirm-type="search"></input>
					</view>
					<view class="action">
						<button class="cu-btn shadow-blur round coletext">搜索</button>
					</view>
				</view>
				<view class="pading-top-ss">
					<wyb-noticeBar type="vert" :text="listnotice" v-on:showMore="showMore" font-weight="bold" height="80" />
				</view>
				<view class="swiper-banner " v-if="active == 1 || active ==3">
					<swiper class="swiper" autoplay="true" circular="true" v-if="adOff" interval="20000" :style="{'height':adHeight+'px'}">
						<swiper-item v-for="(item,index) in adid" :key="item">
							<!-- #ifdef MP-WEIXIN -->
							<ad-custom v-if="index<3" id="ads" :unit-id="item" :ad-intervals="adtime" @load="bindload" @error="binderror"></ad-custom>
							<image id="ads" v-else class="swiper-item" :src="item.bannerImage" v-model="aspectFit" @tap="bannerListtap(index)"></image>
							<!-- #endif -->
						</swiper-item>
					</swiper>
					<swiper class="swiper" autoplay="true" circular="true" v-else>
						<swiper-item v-for="(item ,index)  in bannerList" :key="item">
							<image class="swiper-item" :src="item.bannerImage" v-model="aspectFit" @tap="bannerListtap(index)"></image>
						</swiper-item>
					</swiper>
				</view>
				<!-- 推荐内容 -->
				<view class="xd-info-main">
					<!-- 推荐项 -->
					<view class="main-tabbar">
						<scroll-view :class="['xd-nav-bar', isCenter ? 'xd-nav-center' : '']" scroll-x="true" show-scrollbar="false">
							<view :class="['nav-item', currentIndex == item.id ? 'nav-active' : '']" :id="'tab-'+index" v-for="(item, index) in tabs"
							 :key="index" :data-index="index" :data-id="item.id" @tap="navChange">
								<view class="nav-item-title">
									{{item.labelName}}
									<!-- <view class="nav-item-desc">{{item.id}}项</view> -->
								</view>
							</view>
						</scroll-view>
					</view>

					<!-- 活动标签 -->
					<view class="xd-rows" style="background-color: #FFFFFF;margin-top: 2px;">
						<scroll-view scroll-x="true" show-scrollbar="false">
							<view v-for="(item, index) in activityList" v-if="item.IsOpen" :class="['group-lable', item.Checked? 'group-active' : '']"
							 @tap="lebleTab(item.ID)">
								{{item.Name}}
							</view>
						</scroll-view>
					</view>

					<view class="xd-line"></view>
					<!-- 互助小组对应内容 -->
					<view v-if="isGroupLable">
						<view v-for="(item,groupindex) in groupList" @tap="selectGroup(item)" :key="groupindex" style="padding: 10px;border-bottom: 1px solid #f0f0f0;background-color: #FFFFFF;">
							<view class="xd-rows">
								<view style="flex: 1;">{{item.roomName}}</view>
								<view>
									<image :src="item.roomHead" style="width: 120px;height: 60px;"></image>
								</view>
							</view>
							<view class="xd-rows">
								<image :src="item.userHead" style="width: 25px;height: 25px;border-radius: 50%;border: 1px solid #f0f0f0;"></image>
								<text style="margin-left: 10px;margin-top: 7px;font-size: 12px;">{{item.userName}} {{item.createTime}}</text>
							</view>
						</view>
					</view>
					<!-- 挑战赛 -->
					<view class="cu-card case " v-else-if="isRankingLable" v-for="(rankinItem,rangkingindex) in listsTab" :key="rangkingindex">
						<view class="cu-item shadow">
							<view class=" flex justify-center " @tap="rankingGoDet()">
								<view class="image cu-item-imggs ">
									<image :src="rankinItem.pictures" mode="aspectFill"></image>
									<view class="cu-tag bg-orange text-bold">挑战赛</view>
									<view class="cu-bar bg-shadeBottom"> <text class="text-cut">{{rankinItem.label}}</text></view>
								</view>
							</view>
							<view class="cu-list menu-avatar rankinglist">
								<view class=" flex flex-wrap justify-between align-center rankinglist">
									<view class="flex flex-wrap align-center margin-left-sm">
										<view style="font-size: 30px;">
											<text class="lg text-orange cuIcon-upstage"></text>
										</view>
										<text>￥123</text>
									</view>
									<view class="cu-capsule round margin-right-sm">
										<view class='cu-tag bg-orange ' @tap="goRanking(rankinItem.id)">
											加入
										</view>
										<view class="cu-tag line-orange">
											999+
										</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 商家活动 -->
					<view v-else-if="isMerchant">

						<!-- 推荐项 -->

						<block v-for="(list, index) in merchantList" :key="index">

							<view class="cu-card dynamic">

								<view class="cu-item ">
									<view @tap="activityUser(list)" class="cu-list menu-avatar">
										<view class="cu-item">
											<view class="cu-avatar round lg" :style="{backgroundImage: 'url(' +list.userHead + ')'}" @tap="goPageImg(list.userHead)"></view>
											<!-- class="content flex-sub" -->
											<view class="xd-columns" style="position: absolute;left: 146upx;" @tap="goPage(list)">
												<view>{{list.userName}}</view>
												<!-- 打卡地址 -->
												<view class="text-gray text-sm flex justify-between" style="color: #1cbbb4;font-size: 8px;">
													{{list.province}}
												</view>
											</view>
										</view>
									</view>
									<view @tap="activityDetail(list)" class="text-content margin-top-sm">
										<text class="text-orange">{{list.statusName}}</text>
										<view class="xd-rows">
											<text class="cu-tag light bg-red radius">保证金：￥{{list.baoZhengJin}}</text>
											<text style="margin-left: 3px;">{{list.labels}}</text>
										</view>
										<view class="xd-rows">
											<text style="font-size: 10px;color: #999999;">截止日期：{{list.activityEndTime}} 计划天数：{{list.planDay}} 可休假天数：{{list.holidayDay}}</text>
										</view>
									</view>
									<view  class="grid flex-sub padding-lr" style="margin-bottom: 5px;">
										<view class="swiper-banner">
											<swiper class="swiper" autoplay="true" circular="true" >
												<swiper-item v-for="(item ,index)  in list.imgsUrl" :key="item">
													<image class="swiper-item" :src="item" v-model="aspectFill"></image>
												</swiper-item>
											</swiper>
										</view>
									</view>
									<view class="text-contents contentext" @tap="activityDetail(list)">
										<text style="font-size: 14px;font-weight: 700;">{{list.activityContent}}</text>
									</view>
									
									<view class="flex padding-sm">
										<view @click="merchant" style="flex: 1;margin-top: 5px;" class="xd-rows">
											<text class="lg text-black cuIcon-friendfavor" style="margin-top: 2px;"></text>
											<text style="margin-left: 3px;">我要发布</text>
										</view>
										<view style="flex: 1;justify-items: center;justify-content: center;" class="xd-rows">
											<button class="cu-btn bg-white" style="padding: 0px;" :id="index" open-type="share"><text class="lg text-black cuIcon-forward"
												 style="margin-top: 2px;"></text>分享活动</button>
										</view>
										<view style="flex: 1;justify-items: flex-end;justify-content: flex-end;margin-top: 5px;" class="xd-rows">
											<text class="lg text-black cuIcon-friendfavor" style="margin-top: 2px;"></text>
											<text style="margin-left: 3px;" @tap="addActivity(list)">参与活动 {{list.joinCount}}</text>
										</view>

									</view>
								</view>
							</view>
						</block>
					</view>

					<view v-else>
						<block v-for="(list, index) in listsTab" :key="index">
							<indexList id="indexList" :list="list" :index="index" @gotoSponsor='gotoSponsor' v-on:loveclick='loveClick'
							 v-on:lookerClick="lookerClick" :hasLogin="hasLogin" :userId='userId' :inimg='inimg'></indexList>
						</block>
					</view>
				</view>
			</view>

			<!-- 关注 -->
			<view class="xd-list-info" :hidden="active == 0||active==1 ||active == 3">
				<block v-for="(attention, index) in attentionList" :key="index">
					<view class="actionLi" @tap="goUser(attention.attentionUserId)">
						<view class="ali-main">
							<view class="ali-main-img">
								<image class='xd-mag xd-box-shadow' :src="attention.userHead"></image>
							</view>
							<view class="lli-main-content xd-list-body ">
								<view class="xd-list-title-text">
									<text>{{attention.userName}}</text>
								</view>
								<view>
									<text v-if="attention.sex==1" class="boy">♂</text>
									<text v-else-if="attention.sex==0" class="gender">♀</text>
									<text v-else class="boy">密</text>
									<!-- <text>20</text> -->
								</view>
							</view>
							<view class="lli-main-content">
								<!-- <text>取消关注</text> -->
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>
		<backTop :scrollTop="scrollTop"></backTop>
		<!-- 开始行动-加号 -->
		<view class="start-add" v-if="scrollTop<2000">
			<text v-if="isGroupLable" class="cuIcon-friendadd" @tap="groupAdd()" style="font-size: 20px;"></text>
			<image v-else-if="isRankingLable" src="../../static/images/Body.png" @tap="rankingAdd" mode="widthFix"></image>
			<image v-else-if="isMerchant" src="../../static/images/icon/add.png" @tap="merchant" mode="widthFix"></image>
			<image v-else src="../../static/images/icon/add.png" @tap="goPage('/pages/action/step1')" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import indexList from "@/components/indexList.vue";
	import backTop from "@/components/backTop.vue";
	import wybNoticeBar from '@/components/wyb-noticeBar/wyb-noticeBar.vue'

	export default {
		components: {
			indexList,
			backTop,
			wybNoticeBar,

		},
		data() {
			return {
				audioPlaySrc: '../../static/images/icon/img/xddak.png',
				inimg: '',
				adtime: 31,
				active: 1,
				// adid: [],
				adid: ['adunit-694551ca7bf1d034', 'adunit-ceaf57e168a329aa', 'adunit-a1ac7b29661ff452'],
				currentIndex: -1,
				labelId: 1,
				bannerList: [],
				tabs: [],
				listnotice: [],
				listsTab: [],
				userBean: {},
				attentionList: [],
				token: uni.getStorageSync('token'),
				pageNum: 1, //当前页数
				pageSize: 10, //每页条数
				userId: uni.getStorageSync('id'),
				searchValue: '',
				num: 3,
				Off: '',
				scrollTop: 0,
				adOff: true,
				scrollTopinfo: true,
				listnoticedata: '',
				adHeight: '',
				selectHD: {},
				isGroupLable: false, //是否展示互助小组内容
				isRankingLable: false, //是否展示挑战赛内容
				isMerchant: false, //是否展示商家活动内容
				groupList: [], //互助小组内容
				merchantList: [], //商家活动内容
				activityHDImgList: [
					"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1611630676459.jpg",
					"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1611456459031.jpg",
					"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1611390055210.png",
					"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1611630676459.jpg",
					"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1611630676459.jpg"
				],
				activityList: [{
					ID: 0,
					Name: "互助小圈",
					IsOpen: this.xdUniUtils.showHzGroup(),
					Checked: false
				}, {
					ID: 1,
					Name: "奖励活动",
					IsOpen: true,
					Checked: false
				}, {
					ID: 2,
					Name: "挑战赛",
					IsOpen: false,
					Checked: false
				}]
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			if (this.scrollTopinfo) {
				this.scrollTopinfo = false;
				setTimeout(() => {
					this.scrollTop = 0
					this.scrollTopinfo = true;
				}, 3000)
			}

		},
		onShareAppMessage(res) {
			let that = this;
			if (!that.hasLogin) {
				return that.xdUniUtils.xd_login(that.hasLogin);
			}
			if (res.from == "menu") {
				
				return {
					
					path: '/pages/index/indexx?share=' + uni.getStorageSync('id') ,
					imageUrl: that.xdUniUtils.xd_randomImg(1),
				}
			} else {
				if (this.isMerchant) {
					
					let imgs = that.merchantList[res.target.id].imgs;
					if (this.xdUniUtils.IsNullOrEmpty(imgs)) {
						imgs = that.xdUniUtils.xd_randomImg(1);
					}
					return {
						title: that.merchantList[res.target.id].activityContent,
						path: '/pages/pageA/merchant/merchantDetail?activityid=' + that.merchantList[res.target.id].id,
						imageUrl: imgs,
					}
				} else {
					that.setSaveShareInfo(res);
					return {
						title: that.listsTab[res.target.id].userId == that.userId ? '第' + that.listsTab[res.target.id].pushCardCishuCount +
							'次打卡:' + that.listsTab[res.target.id].pushCardList[0].content : '我为@' + that.listsTab[res.target.id].userName +
							'打Call：' + that.listsTab[res.target.id].pushCardList[0].content,
						path: '/pages/index/action/action?pushId=' + that.listsTab[res.target.id].id + '&share=' + uni.getStorageSync(
								'id') +
							'&isopen=' + that.listsTab[res.target.id].isopen,
						imageUrl: that.listsTab[res.target.id].pushCardList[0].pictures[0] ? that.listsTab[res.target.id].pushCardList[0]
							.pictures[
								0] : that.xdUniUtils.xd_randomImg(1),
					}
				}


			}
		},
		onReady() {
			// setTimeout(()=>{
			// 	this.getLocationInfo(); 
			// },2000)

		},
		//#ifdef MP-WEIXIN
		onShareTimeline() {
			let that = this;
			
			return {
				
				query: 'share=' + uni.getStorageSync('id'),
				imageUrl: that.xdUniUtils.xd_randomImg(1),
			}

		},
		//#endif
		onLoad(option) {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
			if(wx.getLaunchOptionsSync().query.share!=undefined){
				try{												
				 uni.setStorageSync('share',wx.getLaunchOptionsSync().query.share);
				}catch(e){
			
			}
			}
			//#endif
			
			if (!this.xdUniUtils.IsNullOrEmpty(option.isGroupLable)) {
				this.isGroupLable = option.isGroupLable;
				let activtyList = this.activityList;
				for (let i in activtyList) {
					activtyList[i].Checked = false;
					if (activtyList[i].Name == "互助小组") {
						activtyList[i].Checked = true;
					}
				}
			}
			// this.indexData();
			this.burieInit();
			this.getnotic();

		},
		onShow(option) {
			this.currentIndex = -1;
			this.active = 1;
			this.indexData();
		},

		computed: {
			...mapState(['hasLogin'])
		},
		methods: {
			...mapMutations(['logIn', 'logOut', 'IndexlogIn']),
			bindload() {
				var that = this;
				let info = uni.createSelectorQuery().select("#ads");
				info.boundingClientRect(function(data) { //data - 各种参数
					that.adHeight = data.height;
				}).exec()
			},

			goRanking(e) {
				uni.navigateTo({
					url: '../pageA/ranking/rankinAdd?id=' + e
				})
			},
			//商家活动商家点击事件
			activityUser(event) {
				let userId = event.userId;
				if (!this.xdUniUtils.IsNullOrEmpty(userId)) {
					uni.navigateTo({
						url: '../selfCenter/selfView?userId=' + userId
					})
				}
			},
			//活动详情
			activityDetail(event) {
				uni.navigateTo({
					url: '../pageA/merchant/merchantDetail?activityid=' + event.id
				})
			},

			//添加活动
			addActivity(event) {
				if (event.status == 1)
					return this.xdUniUtils.showToast(false, "活动已结束！", "");

				if (event.userId == uni.getStorageSync('id'))
					return this.xdUniUtils.showToast(false, "自己发布的活动不能自己参与！", "");


				this.selectHD = event;
				this.addActivityToUser(event);

				// let _this = this;
				// uni.showModal({
				// 	title: '温馨提示',
				// 	content: "您确定要加入该活动吗？？",
				// 	showCancel: true,
				// 	success: function(res) {
				// 		if (res.confirm) {
				// 			_this.selectHD = event;
				// 			_this.addActivityToUser(event);
				// 		}
				// 	}
				// });
			},
			//加入活动
			addActivityToUser(event) {
				let _this = this;
				let info = {
					activityId: event.id,
					userId: uni.getStorageSync('id'),
					token: uni.getStorageSync('token')
				}
				console.log("加入活动222")
				console.log(event)
				this.xd_request_get(this.xdServerUrls.xd_joinActivity, info, true).then((res) => {
					console.log("加入活动")
					console.log(res)
					if (res.resultCode == "10000") {
						_this.xdUniUtils.showToast(false, res.obj, "");
					} else if (res.resultCode == "10038") {
						_this.xdUniUtils.showToast(false, res.msg, "");
					} else {
						let objs = res.obj;
						objs.activityEndTime = event.activityEndTime;
						objs.baozhengjin = event.baoZhengJin;
						uni.navigateTo({
							url: "../pageA/merchant/merchantActionEdit?actionid=" + event.id + "&fromInfo=" + JSON.stringify(objs)
						})
						// _this.savePush(res.obj, event);
					}

				}).catch(err => {});
			},
			savePush(saveData, event) {

				let info = {
					label: saveData.label,
					content: saveData.content,
					dongLi: "",
					xinXin: "",
					isopen: saveData.isopen,
					subscribeType: saveData.subscribeType,
					targetDay: saveData.targetDay,
					holidayDay: saveData.holidayDay,
					pictures: saveData.pictures,
					challengeRmb: saveData.challengeRmb,
					userId: saveData.userId,
					token: uni.getStorageSync('token'),
					activityId: event.id
				}

				console.log("saveData info")
				console.log(info)
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_savePush, info, true).then(res => {
					console.log("xd_savePush")
					console.log(res)
					if (res.resultCode == 0) {
						if (res.obj.payWay != 1) {
							_this.goPay(res.obj);
						} else {
							uni.showModal({
								title: '温馨提示',
								content: "加入成功！",
								showCancel: false,
								confirmText: "我知道了",
								success: function() {
									uni.switchTab({
										url: "../action/action"
									})
								}
							});
						}

					} else {
						_this.xdUniUtils.showToast(false, res.msg, "");
					}
				})
			},


			goPay(saveData) {
				var that = this;
				let userInfo = {};
				try {
					userInfo = uni.getStorageSync('userInfo');
				} catch (e) {
					//TODO handle the exception
				};
				var data = {
					id: uni.getStorageSync('id'),
					userName: '',
					token: uni.getStorageSync('token'),
					unionId: userInfo.unionId,
					openid: userInfo.openId,
					city: '',
					province: '',
					payRmb: saveData.challengeRmb,
					pushId: saveData.id,
				};

				wx.getSetting({
					success: res => {
						if (res.authSetting['scope.userInfo']) {
							that.xd_request_post(that.xdServerUrls.xd_pay, data, false).then(res => {
								uni.requestPayment({
									'appId': res.obj.appId,
									'timeStamp': res.obj.timeStamp,
									'nonceStr': res.obj.nonceStr,
									'package': res.obj.packageAlias,
									'signType': 'MD5',
									'paySign': res.obj.paySign,
									success: function(re) {
										uni.showModal({
											title: '温馨提示',
											content: "加入成功！",
											showCancel: false,
											confirmText: "我知道了",
											success: function() {
												uni.switchTab({
													url: "../action/action"
												})
											}
										});
									},
									fail: function(err) {}
								});
							})
						}
					}

				})
			},


			//添加小组
			groupAdd() {
				let tabs = this.tabs;
				let id = this.currentIndex;
				let group = "";
				if (id != -1) {
					for (let i in tabs) {
						if (tabs[i].id == id) {
							group = JSON.stringify(tabs[i]);
						}
					}
				}
				uni.navigateTo({
					url: "../pageA/group/groupAdd?isadd=true&group=" + group
				})
			},
			rankingAdd() {
				uni.navigateTo({
					url: '../pageA/ranking/rankingUp'
				})
			},
			rankingGoDet(e) {
				uni.navigateTo({
					url: '../pageA/ranking/rangkinDet?rangkinId=' + encodeURIComponent(JSON.stringify(e))
				})
			},
			//选择互助小组
			selectGroup(group) {
				uni.navigateTo({
					url: "../pageA/group/groupMsg?group=" + encodeURIComponent(JSON.stringify(group))
				})
			},
			//获取小组列表
			getGroupList() {
				if (this.pageNum == 0) {
					return this.xdUniUtils.showToast(false, "没有更多数据了！", "");
				}
				let info = {
					pageNum: this.pageNum,
					pageSize: 10
				}
				if (this.currentIndex != -1 && this.currentIndex != -10) {
					info["type"] = this.currentIndex;
				}

				uni.showLoading({
					title: '加载中..',
				})
				let _this = this;
				console.log("群列表信息参数", info);
				this.xd_request_post(this.xdServerUrls.xd_selectList, info, true).then((res) => {
					uni.hideLoading();
					console.log("群列表信息", res);
					let list = res.obj.list;
					for (let i in list) {
						list[i].createTime = _this.xdUniUtils.xd_timestampToTime(list[i].createTime, false, true, false);
					}
					_this.groupList = _this.pageNum == 1 ? list : _this.groupList.concat(list);
					_this.pageNum = res.obj.nextPage;
				}).catch(err => {});
			},


			//获取商家活动
			getMerchantList() {
				if (this.pageNum == 0) {
					return this.xdUniUtils.showToast(false, "没有更多数据了！", "");
				}
				let info = {
					pageNum: this.pageNum,
					pageSize: 10,
					token: uni.getStorageSync('token')
				}
				uni.showLoading({
					title: '加载中..',
				})
				let _this = this;
				console.log("商家活动信息参数", info);
				this.xd_request_get(this.xdServerUrls.xd_selectSHList, info, true).then((res) => {
					uni.hideLoading();
					console.log("商家活动信息结果", res);
					let list = res.obj.list;
					for (let i in list) {
						list[i].statusName = list[i].status == 0 ? "进行中…" : "已结束";
						list[i].activityEndTime = _this.xdUniUtils.xd_timestampToTime(list[i].activityEndTime, false, false, false);
						list[i].imgs = _this.xdUniUtils.IsNullOrEmpty(list[i].imgs) ? _this.xdUniUtils.xd_randomImg() : list[i].imgs;
						list[i].labels = _this.xdUniUtils.IsNullOrEmpty(list[i].labels) ? "暂未添加" : list[i].labels;
						list[i].planDay = _this.xdUniUtils.IsNullOrEmpty(list[i].planDay) ? "0" : list[i].planDay;
						list[i].activityContent = _this.xdUniUtils.IsNullOrEmpty(list[i].activityContent) ? "暂未添加" : list[i].activityContent;
						list[i].baoZhengJin = _this.xdUniUtils.IsNullOrEmpty(list[i].baoZhengJin) ? "0" : list[i].baoZhengJin;
						list[i].holidayDay = _this.xdUniUtils.IsNullOrEmpty(list[i].holidayDay) ? "0" : list[i].holidayDay;
						list[i].createTime = _this.xdUniUtils.xd_timestampToTime(list[i].createTime, false, true, false);
						list[i].imgsUrl = list[i].imgs.split(",");
					}
					_this.merchantList = _this.pageNum == 1 ? list : _this.merchantList.concat(list);
					_this.pageNum = res.obj.nextPage;
				}).catch(err => {});
			},

			//获取通知
			getnotic() {
				this.xd_request_get(this.xdServerUrls.xd_getVal, {
					key: 'inform_list_config'
				}, true).then(res => {
					if (res.resultCode == 0) {
						var data = JSON.parse(res.obj);

						data.forEach(item => {
							this.listnotice.push(item.title)
						})
						this.listnoticedata = data;


					}
				})
			},

			//通知跳转
			showMore(e) {
				if (this.listnoticedata[e].desc == '' || this.listnoticedata[e].desc == undefined) {
					return
				}
				if (this.listnoticedata[e].type == 1) {
					var url = encodeURIComponent(this.listnoticedata[e].desc);
					uni.navigateTo({
						url: '../pageA/web/richtext?url=' + url
					});
				} else if (this.listnoticedata[e].type == 2) {
					var url = encodeURIComponent(this.listnoticedata[e].desc);
					uni.navigateTo({
						url: '../pageA/web/webShow?url=' + url
					});
				} else {
					uni.navigateTo({
						url: this.listnoticedata.desc
					});

				}

			},
			bannerListtap(e) {

				if (e >= this.bannerList.length) {
					e = e - 3;
				}
				if (this.bannerList[e].type == 1) {
					uni.navigateTo({
						url: this.bannerList.bannerUrl
					});
				} else if (this.bannerList[e].type == 2) {
					var url = encodeURIComponent(this.bannerList[e].bannerUrl);

					uni.navigateTo({
						url: '../pageA/web/webShow?url=' + url
					});
				} else {
					var url = encodeURIComponent(this.bannerList[e].content);
					uni.navigateTo({
						url: '../pageA/web/richtext?url=' + url,

					});
				}
			},
			binderror(e) {

				this.adOff = false;
			},
			goUser(e) {
				if (!this.hasLogin) {
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				uni.navigateTo({
					url: '../selfCenter/selfView?userId=' + e
				})
			},
			//分享记录
			setSaveShareInfo(res) {
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo, {
					pushId: this.listsTab[res.target.id].id,
					shareUserId: uni.getStorageSync('id'),
				}, true).then(res => {

				})
			},

			search(e) {
				this.searchValue = e.detail.value;
				this.currentIndex = -2;
				this.xd_request_post(this.xdServerUrls.xd_searchPushData, {
						pushName: e.detail.value,

					},
					true
				).then((res) => {
					if (res.resultCode == 0) {
						this.searchValue = '';
						this.listsTab = this.timeStamp(res.obj);
						this.pageNum = res.obj.nextPage == undefined ? 1 : res.obj.nextPage;
					} else {
						this.searchValue = '';
						uni.showToast({
							title: res.obj,
							icon: 'none',
						})
					}

				}).catch(err => {});

			},
			goPage(url) {
				if (!this.hasLogin) {
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				uni.navigateTo({
					url
				});
			},
			//首页信息
			indexData: function() {
				this.xd_request_post(this.xdServerUrls.xd_bannerList, {}, true).then((res) => {

					this.bannerList = res.obj;
					this.adid.push(...res.obj);
				}).catch(err => {});
				this.getimg();
				this.xd_request_post(this.xdServerUrls.xd_label, {}, false).then((res) => {
					var da = [{
						id: -1,
						labelName: "全部"
					}, ...res.obj];
					this.tabs = da;
				}).catch(err => {});

				if (this.isGroupLable) { //加载互助小组
					this.isRankingLable = false;
					this.pageNum = 1;
					this.getGroupList();
				} else if (this.isMerchant) {
					this.isGroupLable = false;
					this.isRankingLable = false;
					this.pageNum = 1;
					this.getMerchantList();
				} else { //加载打卡列表
					this.getShowRecommend();
				}

			},
			// 赞助
			gotoSponsor(list, index) {

				uni.setStorageSync("pushId", list.id);
				uni.setStorageSync("cardId", list.pushCardList[0].id);
				uni.navigateTo({
					url: '../sponsor/action'

				})
			},
			//围观
			lookerClick: function(list, index) {
				var that = this;
				if (!that.hasLogin) {
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				that.userId = uni.getStorageSync('id');
				if (that.listsTab[index].onlooker == true) {
					that.xd_request_post(that.xdServerUrls.xd_cancelLooker, {
						pushId: list.id,
						lookUserId: that.userId,
					}, true).then(res => {

						that.listsTab[index].onlooker = false
						that.listsTab[index].onlookerCount--;
						uni.showToast({
							title: '已取消围观',
							duration: 1000,
							icon: 'none',
						})
					})
				} else {
					that.xd_request_post(that.xdServerUrls.xd_saveLooker, {

						pushId: list.id,
						lookUserId: that.userId,
					}, false).then(res => {

						if (res.resultCode == 0) {
							that.listsTab[index].onlooker = true
							that.listsTab[index].onlookerCount++;

							if (uni.getStorageSync(new Date().toLocaleDateString() + "dycwgKey") != 1) {
								uni.showModal({
									content: that.xdCommon.gzsm_wgglts,
									showCancel: false,
									buttonText: '知道了',
									success: (res) => {
										if (res.confirm) {
											uni.setStorageSync(new Date().toLocaleDateString() + 'dycwgKey', 1);
										} else if (res.cancel) {
											uni.setStorageSync(new Date().toLocaleDateString() + 'dycwgKey', 1);
										}
									}
								})
							} else {
								uni.showToast({
									title: '围观成功',
									duration: 1000,
									icon: 'none',
								})
							}
						} else if (res.resultCode == 10015) {
							uni.showToast({
								title: '您已经围观了',
								duration: 1000,
								icon: 'none',
							})
						}


					})
				}
			},

			showNew: function() {
				this.active = 0;
				this.pageNum = 1;
				this.listsTab = [];
				this.getShowNew();
				// setTimeout(()=>{
				// 	this.getLocationInfo()
				// },5000)

			},
			getShowNew() {
				this.xd_request_post(this.xdServerUrls.xd_pushByCreateTimeList, {
						pageNum: 1,
						pageSize: 10,
					},
					true
				).then((res) => {
					console.log("打卡new内容")
					console.log(res.obj.list)
					this.listsTab = this.timeStamp(res.obj.list);
					this.pageNum = res.obj.nextPage;
				}).catch(err => {});

			},
			// 推荐
			showRecommend: function() {
				this.active = 1;
				this.currentIndex = -1,
					this.pageNum = 1;
				this.listsTab = [];
				this.indexData();

			},
			getShowRecommend() {
				this.xd_request_post(this.xdServerUrls.xd_pushByHighGradeList, {
						token: uni.getStorageSync('token'),
						pageNum: 1,
						pageSize: 10,
					},
					true
				).then((res) => {
					console.log("打卡内容")
					console.log(res.obj.list)
					this.listsTab = this.timeStamp(res.obj.list);
					this.pageNum = res.obj.nextPage;
				}).catch(err => {});

			},
			getimg() {
				this.xd_request_get(this.xdServerUrls.xd_tacitlyPushPng, ).then((res) => {
					this.inimg = res.obj;
				}).catch(err => {});

			},
			timeStamp(res) {
				let dataList = res;
				for (var i = 0; i < res.length; i++) {
					var imgs = [];
					var time = this.xdUniUtils.xd_timestampToTime(res[i].pushCardList[0].createTime, false, false, true);
					if (dataList[i].pushCardList[0].pictures) {
						imgs = dataList[i].pushCardList[0].pictures.split(",");
						dataList[i].pushCardList[0].pictures = imgs;
					} else {
						dataList[i].pushCardList[0].pictures = [];
					}

					dataList[i].pushCardList[0].address = this.xdUniUtils.IsNullOrEmpty(dataList[i].pushCardList[0].address) ? "" :
						dataList[i].pushCardList[0].address;
					dataList[i].pushCardList[0].createTime = time;
					dataList[i].challengeRmb = Math.floor(dataList[i].challengeRmb / 100);

				}
				return dataList;
			},
			goPageImgHD(e, index) {
				this.xdUniUtils.xd_showImg(e, index)
			},
			// 关注
			showFollow: function() {
				this.active = 2;
				this.pageNum = 1;
				this.getShowFollow();
			},
			getShowFollow() {
				if (!this.hasLogin) {
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				this.xd_request_post(this.xdServerUrls.xd_getAttentionList, {
						userId: uni.getStorageSync('id'),
						pageNum: 1,
						pageSize: 10,
					},
					true
				).then((res) => {
					this.attentionList = res.obj.list;
					this.pageNum = res.obj.nextPage;
				}).catch(err => {});


			},
			//标签获取列表
			getPushByLabel() {
				this.xd_request_post(this.xdServerUrls.xd_pushByLabel, {
						token: uni.getStorageSync('token'),
						pageNum: 1,
						pageSize: 10,
						labelId: this.labelId,
					},
					true
				).then((res) => {
					this.listsTab = this.timeStamp(res.obj.list);
					this.pageNum = res.obj.nextPage == undefined ? 1 : res.obj.nextPage;
				}).catch(err => {});

			},
			lebleTab(id) {
				if (!this.hasLogin) {
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				let activtyList = this.activityList;
				for (let i in activtyList) {
					activtyList[i].Checked = false;
					if (activtyList[i].ID == id)
						activtyList[i].Checked = true;
				}
				this.currentIndex = -10;
				this.pageNum = 1;
				this.isGroupLable = false;
				this.isRankingLable = false;
				this.isMerchant = false;
				if (id == 0) { //互助小组
					this.isGroupLable = true;
					this.getGroupList();
				} else if (id == 1) { //商家活动 
					this.isMerchant = true;
					this.getBalance();
					this.getMerchantList();
				} else if (id == 2) { //挑战赛
					this.isRankingLable = true;

				}


			},
			// 推荐内容切换
			navChange: function(e) {

				this.pageNum = 1;
				this.listsTab = [];
				this.active = 3;
				let id = e.currentTarget.dataset.id
				this.currentIndex = id;
				this.isGroupLable = false;
				this.isRankingLable = false;
				this.isMerchant = false;
				let activityList = this.activityList;
				for (let i in activityList) {
					activityList[i].Checked = false;
				}

				if (e.currentTarget.dataset.id == -1) {
					this.currentIndex = -1;
					this.getShowRecommend();
				} else {
					this.labelId = e.currentTarget.dataset.id;
					this.getPushByLabel();
				}


			},
			getNewList() {},
			getReachList() {
				var data = {};
				let that = this;
				if (that.pageNum == 0) {
					uni.showLoading({
						title: '没有更多数据了'
					})
					setTimeout(function() {
						uni.hideLoading();
					}, 1000);

					return false
				}
				uni.showLoading({
					title: '加载中..',
				})
				switch (that.active) {
					case 0:
						that.xd_request_post(that.xdServerUrls.xd_pushByCreateTimeList, {

								pageNum: that.pageNum,
								pageSize: that.pageSize,
							},
							true
						).then(res => {
							that.pageNum = res.obj.nextPage;
							data = that.timeStamp(res.obj.list);
							that.listsTab = that.listsTab.concat(data);
							setTimeout(function() {
								uni.hideLoading()
							}, 1000);
						})

						break;
					case 1:
						that.xd_request_post(that.xdServerUrls.xd_pushByHighGradeList, {
								pageNum: that.pageNum,
								pageSize: that.pageSize,
							},
							true
						).then(res => {
							that.pageNum = res.obj.nextPage;

							data = that.timeStamp(res.obj.list);
							that.listsTab = that.listsTab.concat(data);
							setTimeout(function() {
								uni.hideLoading()
							}, 1000);
						})
						break;
					case 2:
						if (!that.hasLogin) {
							return that.xdUniUtils.xd_login(that.hasLogin);
						}
						that.xd_request_post(that.xdServerUrls.xd_getAttentionList, {
								userId: uni.getStorageSync('id'),
								pageNum: that.pageNum,
								pageSize: that.pageSize,
							},
							true
						).then(res => {
							that.pageNum = res.obj.nextPage;
							that.attentionList = that.attentionList.concat(res.obj.list);
							setTimeout(function() {
								uni.hideLoading()
							}, 1000);

						})

						break;
					case 3:
						that.xd_request_post(that.xdServerUrls.xd_pushByLabel, {
								pageNum: that.pageNum,
								pageSize: that.pageSize,
								labelId: this.labelId,
							},
							true
						).then(res => {
							that.pageNum = res.obj.nextPage;

							data = that.timeStamp(res.obj.list);
							that.listsTab = that.listsTab.concat(data);
							setTimeout(function() {
								uni.hideLoading()
							}, 1000);
						})
						break;
				}
			},
			// 跳转外部链接
			tonewurl(e) {
				let url = e;
				// 判断链接是否为空
				if (url == null) {
					return false;
				}
				// 判断链接是否为https
				let notS = url.split(':')[0];
				let a = notS.indexOf('s') > -1;
				if (a == false) {
					uni.navigateTo({
						url: url
					});
					return false;
				}
				//  链接拼接编码网址（同时用模板字符串放置所需要的数据）
				// url = encodeURIComponent(url + `?typefrom=${typefrom}&utoken=${utoken}&unionid=${unionid}&shopid=${shopId}`);
				url = encodeURIComponent(url);
				uni.navigateTo({
					url: '../web/webShow?url=' + url
				});
			},
			merchant() {
				let userBean = this.userBean;
				if (!this.xdUniUtils.IsNullOrEmpty(userBean)) {
					let merchantType = userBean.merchantType;
					if (merchantType == 0) {
						uni.showModal({
							title: '温馨提示',
							content: '您尚未开通审核权限，是否开通？',
							confirmText: "去开通",
							cancelText: "暂不开通",
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '../pageA/merchant/merchantPay'
									});
								}
							},
						});
					} else if (merchantType == 1) {
						uni.navigateTo({
							url: '../pageA/merchant/merchantAction?souce=0'
						});
					}
				}
			},
			getBalance() {
				this.xd_request_post(this.xdServerUrls.xd_inquireBalance, {
					token: uni.getStorageSync('token'),
				}, true).then((res) => {
					console.log("xd_inquireBalance");
					console.log(res);
					this.userBean = res.obj.userBean;
				})
			},
			burieInit() {
				this.xd_request_post(this.xdServerUrls.xd_selectBurieStatistics, {}, true).then((res) => {
					if (res.resultCode == 0) {
						let gz_num = res.obj.gzCount;
						let wg_num = res.obj.wgCount;
						let num = gz_num + wg_num;
						this.xdUniUtils.updateNumber(num);
					}
				})

			},
		},

		// 下拉刷新
		onPullDownRefresh() {
			switch (this.active) {
				case 0:
					this.getShowNew(),
						this.pageNum = 1,
						uni.stopPullDownRefresh();
					break;
				case 1:
					this.indexData(),
						this.pageNum = 1,
						uni.stopPullDownRefresh();

				case 2:
					this.getShowFollow(),
						this.pageNum = 1,
						uni.stopPullDownRefresh();
					break;
				case 3:
					this.indexData(),
						this.pageNum = 1,
						uni.stopPullDownRefresh();
					this.currentIndex = -1;
					break;
			}
		},
		// 上拉加载
		onReachBottom() {
			let lableTabid = this.isGroupLable;
			let isMerchant = this.isMerchant;
			if (lableTabid) {
				this.getGroupList();
			} else if (isMerchant) {
				this.getMerchantList();
			} else {
				this.getReachList();
			}

		},
	}
</script>

<style scoped lang="scss">
	.imgheit {
		height: 320upx;
		width: 100%;
	}


	.group-lable {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
		margin: 5px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 3px;
		padding-bottom: 3px;
		background: #FFFFFF;
		border-radius: 30upx;
		border: 1px solid #fd5107;
		font-size: 12px;
		background: #fbf3e6;
		color: #fd5107
	}

	.group-active {
		border: 1px solid #fd5107;
		background: #fd5107;
		color: #FFFFFF;
	}


	.xd-body {
		box-sizing: border-box;
		padding: 15% 15upx;
		width: 100%;
	}

	.pageNav {
		padding: 20upx 0;

		view {
			margin: 0 28upx;
			font-size: 34upx;
			line-height: 44upx;
			border-bottom: 3px solid #ffe66f;
		}

		view.active {
			border-color: #fd5107;
			font-weight: bold;
			color: #fd5107;

		}
	}

	.swiper-banner {
		width: 100%;

		height: auto;
		padding-top: 10upx;

		.swiper {
			width: 100%;

			// min-height: 208upx;max-height: 270upx;
			swiper-item image {
				width: 100%;
				height: 100%;
				border-radius: 10upx;
			}
		}
	}

	.xd-info-main {
		width: 100%;

		.main-tabbar {
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1px solid #efe5e8;
			padding: 10upx 3upx 10upx 3upx;
			background-color: #FFFFFF;
			margin-top: 10upx;

			.xd-nav-bar {
				width: 100%;
				display: flex;
				white-space: nowrap;

				.nav-item {
					width: 25%;
					display: inline-flex;
					flex-direction: column;
					text-align: center;
					margin: 0 0.6%;
					padding: 12upx 0;
					background: #fbf3e6;
					border-radius: 10upx;

					.nav-item-title {
						font-size: 26rpx;
						line-height: 36rpx;
						width: 100%;
						color: #fd5107;
					}
				}

				.nav-item.nav-active {
					background: #fd5107;

					.nav-item-title {
						color: #ffffff;
					}
				}
			}
		}

		.swiper-box {

			.swiper-item {
				display: none;
			}

			.swiper-item.box-active {
				display: block;
			}

			.infos-box {
				padding-top: 20upx;
			}
		}
	}

	.start-add {
		width: 100upx;
		height: 100upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: #ffe66f;
		border: 2px solid #ffa700;
		border-radius: 50%;
		position: fixed;
		bottom: 100upx;
		right: 30upx;
		z-index: 99;
	}

	.start-add image {
		width: 48upx;
		height: 48upx;
	}

	.actionLi {
		padding-top: 20rpx;
		border-bottom: 1upx solid #ffa700;

		.ali-main {
			display: flex;
		}

		.xd-mag {
			height: 125rpx;
			width: 125rpx;
		}
	}

	.gender {
		background: #fd5107;
		color: #fff;
		display: inline-block;
		padding: 0 6rpx;
		border-radius: 100%;
		font-size: 22rpx;
		margin-right: 2rpx;
		// height: 24rpx;
		// line-height: 24rpx;
	}

	.boy {
		background: #66CCFF;
		color: #fff;
		display: inline-block;
		padding: 0 6rpx;
		border-radius: 100%;
		font-size: 22rpx;
		margin-right: 2rpx;
	}

	// .adclass{
	// 	width: 90%;
	// 	height: 208upx;
	// 	margin: 0 5.5%;
	// }
	.coletext {
		background: #ffe66f;
	}

	.notice-area {
		padding-top: 20upx;
	}

	.pading-top-ss {
		padding-top: 10upx;
	}

	.rankinglist {

		height: 90upx;
	}

	.cu-item-imggs {

		width: 93%;
		margin-top: 20upx;

	}
</style>
