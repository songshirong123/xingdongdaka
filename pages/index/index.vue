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
					<!-- <view :class="['group-lable', isGroupLable? 'group-active' : '']" @tap="lebleTab">
						<view>互助小组</view>
					</view> -->
					<view :class="['group-lable', isRankingLable? 'group-active' : '']" @tap="lebleTab(1)">
						<view>挑战赛</view>
					</view>

					<!-- 互助小组对应内容 -->
					<view class="xd-line"></view>
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
										<view class='cu-tag bg-orange '>
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

				// audioPlaySrc:'../static/images/icon/img/title1.png',
				inimg: '',
				adtime: 31,
				active: 1,
				adid: [],
				// adid: ['adunit-694551ca7bf1d034', 'adunit-ceaf57e168a329aa', 'adunit-a1ac7b29661ff452'],
				currentIndex: -1,
				isGroupLable: false,
				isRankingLable: false,
				labelId: 1,
				bannerList: [],
				groupList: [],
				tabs: [],
				listnotice: [

				],
				listsTab: [],
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
				return that.xdUniUtils.xd_onShare();
			} else {
				that.setSaveShareInfo(res);
				return {
					title: that.listsTab[res.target.id].userId == that.userId ? '第' + that.listsTab[res.target.id].pushCardCishuCount +
						'次打卡:' + that.listsTab[res.target.id].pushCardList[0].content : '我为@' + that.listsTab[res.target.id].userName +
						'打Call：' + that.listsTab[res.target.id].pushCardList[0].content,
					path: '/pages/index/action/action?pushId=' + that.listsTab[res.target.id].id + '&share=' + uni.getStorageSync('id') +
						'&isopen=' + that.listsTab[res.target.id].isopen,
					imageUrl: that.listsTab[res.target.id].pushCardList[0].pictures[0] ? that.listsTab[res.target.id].pushCardList[0].pictures[
						0] : 'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png',
				}
			}
		},
		onReady() {
			// setTimeout(()=>{
			// 	this.getLocationInfo(); 
			// },2000)

		},

		onLoad(option) {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
			if (!this.xdUniUtils.IsNullOrEmpty(option.isGroupLable)) {
				this.isGroupLable = option.isGroupLable;
			}
			this.indexData();
			this.burieInit();
			this.getnotic();

		},
		onShow(option) {
			// this.currentIndex=-1;
			// this.active=1;
			// this.indexData();
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
				if (this.currentIndex != -1) {
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
					that.pageNum = res.obj.nextPage;
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
				if(this.listnoticedata[e].desc==''||this.listnoticedata[e].desc==undefined){
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
					
					dataList[i].pushCardList[0].address = this.xdUniUtils.IsNullOrEmpty(dataList[i].pushCardList[0].address)?"":dataList[i].pushCardList[0].address;
					dataList[i].pushCardList[0].createTime = time;
					dataList[i].challengeRmb = Math.floor(dataList[i].challengeRmb / 100);

				}
				return dataList;
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
			lebleTab(e) {
				if (e == 1) {
					this.isRankingLable = !this.isRankingLable;
					this.isGroupLable = false;
					this.pageNum = 1;
				} else {
					this.isGroupLable = !this.isGroupLable;
					this.isRankingLable = false;
					this.pageNum = 1;
					this.getGroupList();
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
			if (lableTabid) {
				this.getGroupList();
			} else {
				this.getReachList();
			}

		},
	}
</script>

<style scoped lang="scss">
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
		border: 1px solid #626466;
		font-size: 12px;
	}

	.group-active {
		border: 1px solid #fd5107;
		color: #fd5107;
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
