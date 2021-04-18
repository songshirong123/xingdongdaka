<template>
	<view class="action">
		<view class="actionInfo">
			<view class="tabbar bg-white">
				<view class="tab " :class="tab===0?'active':''" @click="tabs(0)">
					<!-- <text>行动 ({{total}})</text> -->
					<text>事项</text>
				</view>
				<view class="tab " :class="tab===1?'active':''" @click="tabs(1)">
					<!-- <text>行动 ({{total}})</text> -->
					<text>行动</text>
				</view>
				<view class="tab" :class="tab===2?'active':''" @click="tabs(2)">
					<!-- <text v-if="looktotal != ''">我围观行动({{looktotal}})</text>
							<text v-if="looktotal == ''">我围观行动</text> -->
					<text>围观</text>
				</view>
				<view class="tab " :class="tab===3?'active':''" @click="tabs(3)">
					<text>参与</text>
				</view>
				<view class="tab " :class="tab===4?'active':''" @click="tabs(4)">
					<text>发起</text>
				</view>
			</view>
			<view class="actionTabList">
				<view class="actionMy" v-show="tab===0">
				</view>
				<view class="actionMy" v-show="tab===1">
					<actionlist v-for="(item,index) in cardList" :item="item" :key="index" :tab="tab" :index='index' v-on:toggleMask="toggleMask"
					 :userId="userId" v-on:share="share"></actionlist>
				</view>
				<view class="actionLook" v-show="tab===2">
					<actionlist v-for="(item,index) in lookerList" :item="item" :key="index" :tab="tab" :index='index' v-on:toggleMask="toggleMask"
					 :userId="userId" v-on:share="share"></actionlist>
				</view>
				<view v-if="tab===3 || tab===4" v-for="(activity,index) in activityByUserId" :key="index">
					<view class="cu-card dynamic">
						<view class="cu-item shadow">
							<view  class="text-content margin-top-sm padding-bottom-sm" style="border-bottom: 1upx solid #ddd;">
								<view class="flex flex-wrap justify-between">
									<text class="text-orange">{{activity.statusName}}</text>
									<view class="ali_right moreandroidwhite" @click="toggleMask(activity,index)" v-if="tab===4" >
										<text class="cuIcon-moreandroid" ></text>
									</view>
								</view>
								<view class="xd-rows" @click="addActivity(activity,0)">
									<text class="cu-tag light bg-red radius">保证金：￥{{activity.baoZhengJin}}</text>
									<text style="margin-left: 3px;">{{activity.labels}}</text>
									
								</view>
								<view class="xd-rows" @click="addActivity(activity,0)">
									<text style="font-size: 10px;color: #999999;">截止日期：{{activity.activityEndTime}} 计划天数：{{activity.planDay}}
										可休假天数：{{activity.holidayDay}}</text>
								</view>
								
								<view style="height: 7px;"></view>
							</view>
							<view class="grid flex-sub padding-lr" style="margin-bottom: 5px;" :class="activity.imgsUrl.length>1?'col-3 grid-square':'col-1'" >
								<view class="bg-img" :class="activity.imgsUrl.length>1?'':'only-img'" :style="{backgroundImage:'url('+item+')'}"
								 v-for="(item,indexs) in activity.imgsUrl" :key="indexs" @tap="goPageImgHD(activity.imgsUrl,indexs)" v-if="activity.imgsUrl.length>0">
								</view>
								<image class="bg-img imgheit "  :src="activity.imgsUrl[0]" v-if="activity.imgsUrl.length==0" mode="aspectFill"
								 @tap="goPageImgHD(activity.imgsUrl)"  @error="error">
								</image>
							</view>
							<!-- <view  class="grid flex-sub padding-lr" style="margin-bottom: 5px;">
								<view class="swiper-banner">
									<swiper class="swiper" autoplay="true" circular="true" >
										<swiper-item v-for="(item ,index)  in activity.imgsUrl" :key="item">
											<image class="swiper-item" :src="item" v-model="aspectFill"></image>
										</swiper-item>
									</swiper>
								</view>
							</view> -->
							<view @click="addActivity(activity,0)" class="text-contents contentext">
								<text style="font-size: 14px;font-weight: 700;">{{activity.activityContent}}</text>
							</view>
							<!-- <view class="grid flex-sub padding-lr" style="margin-top: 5px;margin-bottom: 5px;">
								<image class="bg-img imgheit" :src="activity.imgs" mode="aspectFill" @tap="goPageImgHD(activity.imgs)">
								</image>
							</view> -->
							<view v-if="tab===4" class="flex padding-sm">
								<view style="flex: 1;margin-top: 5px;" @click="addActivity(activity,1)">
									<text>待审核<text style="color: red;margin-left: 3px;">{{activity.joinCount}}</text></text>
								</view>
								<view style="flex: 1;margin-top: 5px;" @click="addActivity(activity,2)">未达成</view>
								<view style="flex: 1;margin-top: 5px;" @click="addActivity(activity,3)">已通过</view>
								<view style="flex: 1;justify-items: flex-end;justify-content: flex-end;" class="xd-rows">
									<button class="cu-btn bg-white" style="padding: 0px;"  @click="share(index)"><text class="lg text-black cuIcon-forward"
										 style="margin-top: 2px;"></text>分享活动</button>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- <view class="btn_bar">
			<view class="btns"><button class="btn" @click="goStep">制定新的行动项</button></view>
		</view> -->
		<backTop :scrollTop="scrollTop"></backTop>
		<view class="start-add" @click="goStep" v-if="scrollTop<2000">
			<image src="../../static/images/icon/add.png" mode="widthFix"></image>
		</view>
		<view class="mask" :class="maskState===0 ? 'none' : maskState===1 ? 'show' : ''" @click="toggleMask">
			<view class="mask-content">
				<view class="mask_top" v-if="tab===4">
					<view class="mask_top_text" @tap="creatAC(1)" v-if="status===0">
						<text class="mask_text">编辑</text>
					</view>
					<view class="mask_top_text" @tap="creatAC(0)">
						<text class="mask_text">复用</text>
					</view>
				</view>
				<view class="mask_top" v-else>
					<view class="mask_top_text" @tap="creatXd(1)">
						<text class="mask_text">重新编辑行动</text>
					</view>
					<view class="mask_top_text" @tap="creatXd(2)">
						<text class="mask_text">删除行动</text>
					</view>
				</view>
			</view>
		</view>
        <share 
				ref="share" 
				:contentHeight="950"
			></share>
			
	</view>
</template>

<script>
	import {
		mapState,
		mapMutations
	} from 'vuex'
	import actionlist from "@/components/actionlist.vue";
	import backTop from "@/components/backTop.vue"
	import share from "@/components/share.vue"

	export default {
		components: {
			actionlist,
			backTop,
			share
		},
		data() {
			return {
				shareImg:'',
				sharePath:'',
				scen:'',
				shareTitle:'',
				vi: 1,
				tab: 1, //行动，围观，收藏
				userId: uni.getStorageSync('id'),
				cardList: [],
				lookerList: [],
				activityByUserId: [],
				maskState: 0,
				nextPage: 1, //当前页数
				pageNum: 1,
				pageSize: 10, //每页条数
				nextPageTwo: '',
				total: '',
				looktotal: '',
				pushId: '',
				index: '',
				scrollTop: 0,
				scrollTopinfo: true,
				showlogin: true,
				videoAd: '',
				actvityDate:'',
				status:0,
				delNum:1,
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
		watch: {
			hasLogin() {
				setTimeout(() => {
					this.inDada(this.tab);
					this.userId = uni.getStorageSync('id');

				}, 100);

			}

		},
		onShow() {
			if (!this.hasLogin) {
				return this.xdUniUtils.xd_login(this.hasLogin);

			}
			this.inDada(this.tab);
		},
		onLoad() {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				menus: ['shareAppMessage']
			})
			//#endif

		},
		onReady() {},
		computed: {
			...mapState(['hasLogin'])
		},
		onShareAppMessage(res) {

			let that = this;
			if (res.from == "menu") {
				return that.xdUniUtils.xd_onShare(
					'我不加油，你们就围观分钱', '/pages/selfCenter/selfView?userId=' + uni.getStorageSync('id'), ''
				);
			} else {
				that.$refs.share.hideModal();
				return	that.xdUniUtils.xd_onShare(that.shareTitle,that.sharePath+'?'+that.scen,that.shareImg);
			}
		}, 
		methods: {
			
			//分享
			share(index){
				let that = this;
				that.shareImg=''
				that.scen=''
				that.sharePath=''
				that.shareTitle=''
				that.sharePath='/pages/index/action/action'
				if (!that.hasLogin) {
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				if(that.tab == 1){
					
					that.scen='pushId=' + that.cardList[index].id + '&share=' + uni.getStorageSync('id') + '&isopen=' + that.cardList[index].isopen
					if(that.cardList[index].challengeRmb>0){
						that.shareTitle='我没动力时,就想想围观分钱的你们:' + that.cardList[index].content
					}else{
						that.shareTitle='我没动力时,就想想围观的你们:' + that.cardList[index].content
					}
					if(that.cardList[index].pictures){
						that.shareImg=that.cardList[index].pictures[0]
						that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);	
					}else{
						that.shareImg=that.xdUniUtils.xd_randomImg(1)
						that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,'');
					}

				}else if(that.tab == 2){
					that.scen='pushId=' + that.lookerList[index].id + '&share=' + uni.getStorageSync('id') + '&isopen=' + that.lookerList[index].isopen
					that.shareImg=that.lookerList[index].pictures ? that.lookerList[index].pictures : that.xdUniUtils.xd_randomImg(1)
					if(that.lookerList[index].challengeRmb>0){
						that.shareTitle='@'+ that.lookerList[index].userName + '你不加油,我们就围观分钱:' + that.lookerList[index].content
					}else{
						that.shareTitle='我为@'+ that.lookerList[index].userName + '打Call:' + that.lookerList[index].content
					}
					if(that.lookerList[index].pictures){
						that.shareImg=that.lookerList[index].pictures[0]
						that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);	
					}else{
						that.shareImg=that.xdUniUtils.xd_randomImg(1)
						that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,'');
					}	
				}else if(that.tab == 3 || that.tab == 4){
					that.sharePath='/pages/pageA/merchant/merchantDetail'
					that.scen='activityid=' + that.activityByUserId[index].id+"&share="+ uni.getStorageSync('id')
	                that.shareTitle=that.activityByUserId[index].activityContent
					if(that.xdUniUtils.IsNullOrEmpty(that.activityByUserId[index].imgsUrl)){
						that.shareImg= that.xdUniUtils.xd_randomImg(1)
						that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,'');	
					}else{
						that.shareImg=that.activityByUserId[index].imgsUrl[0];
						that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);	
					}
					
				}
			
			},
			tabs(e) {
				this.tab = e;
				this.pageNum = 1;
				this.inDada(e);
			},
			setSaveShareInfo(res) {
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo, {
					pushId: this.cardList[res.target.id].id,
					shareUserId: uni.getStorageSync('id'),
				}, true).then(res => {

				})
			},
			creatAC(e){
				var  data={
					type:'',
					activity:''
				}
				data.type=e
				data.activity=this.actvityDate
				try {
					uni.setStorageSync('activityData', data);
				} catch (e) {
					// error
				}
				
				uni.navigateTo({
					url: '../pageA/merchant/merchantAction'
				})
			},
			creatXd(e) {
				var that = this;
				var id = that.pushId;
				var i = that.index;
				if (e == 1 && that.cardList[i].pushCardStatus != 2) {
					uni.showModal({
						title: '重新编辑行动',
						content: '将删除原行动及打卡信息，在重新发布新行动',
						success: function(res) {
							if (res.confirm) {
								that.xd_request_post(that.xdServerUrls.xd_delPushDataByPushId, {
									pushid: id
								}, true).then(res => {
									if (res.resultCode == 0) {
										uni.showToast({
											title: '删除成功，将重新编辑',
											icon: 'none',
											duration: 1500,
											success() {
												try {
													uni.setStorageSync('pushData', that.cardList[i]);
												} catch (e) {
													// error
												}

												uni.navigateTo({
													url: 'step1'
												})
											}
										});


									} else if (res.cancel) {
										that.maskState = 0;
									}
								});
							}
						}
					});
				} else if (e == 2) {
					if (that.cardList[i].pushCardStatus == 2 || that.cardList[i].pushCardStatus == 3) {
						uni.showModal({
							title: '删除行动',
							content: '删除未完成和已完成行动单次2元，月费6元，年费60元,观看视频免费删除 ',
							confirmText: '免费删除',
							cancelText: '取消',
							success: function(res) {
								if (res.confirm) {
									that.videoAd = that.xdUniUtils.videoAdUtil();
									if (that.videoAd) {
										that.xdUniUtils.videoshowAd(that.videoAd);

										that.videoAd.onLoad(() => {
											uni.hideLoading();
										});
										that.videoAd.onClose((res) => {
											that.videoAd.offClose()
											if (res && res.isEnded || res === undefined) {
												that.xd_request_post(that.xdServerUrls.xd_delPushDataByPushId, {
													pushId: id,
													tsbs: 'jlsp',
												}, true).then(res => {

													if (res.resultCode == 0) {
														uni.showToast({
															title: '删除成功',
															icon: 'none',
															duration: 1500
														});
														that.cardList.splice(i, 1);
													} else {
														uni.showModal({
															title: '该行动项发布已超过3天，不能删除，请继续',
															icon: 'none',

														});
													}

												})
											} else {
												that.videoAd.offClose()
												wx.showModal({
													content: '广告未播放完成,无法删除',
													showCancel: false
												})
											}

										});


									} else if (res.cancel) {
										that.maskState = 0;
									}
								}
							}
						})

					} else if (that.cardList[i].pushCardStatus == 1) {
						
						// if(!that.bd.get('delNum',false)){
						// 	that.bd.put('delNum',that.delNum,43200)
						// }
						if(that.bd.get('delNum')>=4){
							uni.showModal({
								content: '近期删除次数过多，请不要轻易放弃行动目标，如需继续删除，将扣除10%的保证金。',
								success: function(res) {
									if (res.confirm) {
										that.delePush(id,i)
									} else if (res.cancel) {
										that.maskState = 0;
										return false
									}
								}
							});
						}else{
							that.delePush(id,i)
						}
						
					}
				}
			},
			delePush(id,i){
				var that=this
				uni.showModal({
					title: '删除行动',
					content: '进行中行动项3天内删除将退回保证金',
					success: function(res) {
						if (res.confirm) {
							that.xd_request_post(that.xdServerUrls.xd_delPushDataByPushId, {
								pushId: id
							}, true).then(res => {
				
								if (res.resultCode == 0) {
									let num=that.bd.get('delNum')?that.bd.get('delNum'):1
									that.bd.put('delNum',num+1,43200)
									
									uni.showToast({
										title: '删除成功',
										icon: 'none',
										duration: 1500
									});
									that.cardList.splice(i, 1);
								} else {
									uni.showModal({
										title: '该行动项发布已超过3天，不能删除，请继续',
										icon: 'none',
				
									});
								}
				
							})
						} else if (res.cancel) {
							that.maskState = 0;
						}
					}
				});
			},
			toggleMask(type, index) {
				let state = index>=0 ? 1 : 0;
				if(this.tab===4){
					this.actvityDate=type;
					this.status=type.status;
				}else{
					this.pushId = type;
					this.index = index
				}
				this.maskState = 2;
				
				setTimeout(() => {
					this.maskState = state;
				}, 10)
			},
			toAction(e) {
				uni.navigateTo({
					url: '../index/action/action?pushId=' + e
				});
			},
			goStep() {
				uni.navigateTo({
					url: `/pages/action/step1`
				});
			},

			inDada(tab) {
				let token = '';
				let id = '';
				let that = this;
				try {
					token = uni.getStorageSync('token');
					id = uni.getStorageSync('id');
				} catch (e) {
					//TODO handle the exception
				}
				if (tab == 0) {
					uni.navigateToMiniProgram({
						appId: 'wxf9286c35b3f9d0d0',
						path: 'main/index'
					})

				} else if (tab == 1) {
					that.xd_request_post(that.xdServerUrls.xd_pushByUserIdList, {
							token: token,
							userId: id,
							pageNum: 1,
							pageSize: 10,
						},
						true

					).then(res => {
						that.cardList = that.dataPaly(res);
						that.nextPage = res.obj.nextPage;
						that.pageNum = res.obj.nextPage;
						that.total = res.obj.total;
					}).catch(Error => {
						console.log(Error)
					})
				} else if (tab == 2) {
					that.xd_request_post(that.xdServerUrls.xd_lookerPushListByUserId, {
							userId: uni.getStorageSync("id"),
							pageNum: 1,
							pageSize: 10,
						},
						true).then(res => {

						that.lookerList = res.obj.list;
						that.nextPageTwo = res.obj.nextPage;
						that.pageNum = res.obj.nextPage;
						that.looktotal = res.obj.total;
						that.lookerList.forEach(function(item) {
							if (typeof item.challengeRmb != 'undefined' && item.challengeRmb != '' && item.challengeRmb != '0') {
								item.challengeRmb = Math.floor(item.challengeRmb / 100);
							}
							if (typeof item.pictures === 'undefined' || item.pictures == '') {
								var img=[]
								img.push(that.xdUniUtils.xd_randomImg(1));
								item.pictures =img
							} else {
								
									item.pictures = item.pictures.split(",")
								
							}
						})
						console.log(that.lookerList)

					}).catch(Error => {
						console.log(Error)
					})
				} else if (tab == 3) {
					that.getActivityByUserId();
				} else if (tab == 4) {
					that.getAction();
				}
			},
			goPageImgHD(e, index) {
				this.xdUniUtils.xd_showImg(e, index)
			},
			//添加活动
			addActivity(event, selectType) {
				if (this.tab == 3) {
					this.activityDetail(event);
				} else if (this.tab == 4) {
					uni.navigateTo({
						url: '../pageA/merchant/merchantActionList?activityid=' + event.id + "&selectType=" + selectType
					})
				}
			},
			//活动详情
			activityDetail(event) {
				uni.navigateTo({
					url: '../pageA/merchant/merchantDetail?activityid=' + event.id
				})
			},
			//获取发起的活动列表
			getAction() {
				let _this = this;
				this.xd_request_get(this.xdServerUrls.xd_selectSHInfo, {
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id')
				}, true).then((res) => {
					console.log("xd_selectSHInfo")
					console.log(res);
					let list = res.obj;
					for (let i in list) {
						list[i].statusName = list[i].status == 0 ? "进行中…" : "已结束";
						list[i].activityEndTime = _this.xdUniUtils.xd_timestampToTime(list[i].activityEndTime, false, false, false);
						list[i].imgs = _this.xdUniUtils.IsNullOrEmpty(list[i].imgs) ?  _this.xdUniUtils.xd_randomImg(1) : list[i].imgs;
						list[i].labels = _this.xdUniUtils.IsNullOrEmpty(list[i].labels) ? "暂未添加" : list[i].labels;
						list[i].planDay = _this.xdUniUtils.IsNullOrEmpty(list[i].planDay) ? "0" : list[i].planDay;
						list[i].activityContent = _this.xdUniUtils.IsNullOrEmpty(list[i].activityContent) ? "暂未添加" : list[i].activityContent;
						list[i].baoZhengJin = _this.xdUniUtils.IsNullOrEmpty(list[i].baoZhengJin) ? "0" : list[i].baoZhengJin;
						list[i].holidayDay = _this.xdUniUtils.IsNullOrEmpty(list[i].holidayDay) ? "0" : list[i].holidayDay;
						list[i].createTime = _this.xdUniUtils.xd_timestampToTime(list[i].createTime, false, true, false);
					    list[i].imgsUrl = list[i].imgs.split(",");
					}
					_this.activityByUserId = _this.pageNum == 1 ? list : _this.activityByUserId.concat(list);
				})
			},
			//参与活动
			getActivityByUserId() {
				if (this.pageNum == 0) {
					return this.xdUniUtils.showToast(false, "没有更多数据了！", "");
				}

				let info = {
					token: uni.getStorageSync('token'),
					pageNum: this.pageNum,
					pageSize: 10
				}
				// uni.showLoading({
				// 	title: '加载中..',
				// })
				let _this = this;
				console.log("参与者参数", info);
				this.xd_request_get(this.xdServerUrls.xd_getActivityByUserId, info, true).then((res) => {
					// uni.hideLoading();
					console.log("参与的活动", res);
					let list = res.obj.list;
					for (let i in list) {
						list[i].statusName = list[i].status == 0 ? "进行中…" : "已结束";
						list[i].activityEndTime = _this.xdUniUtils.xd_timestampToTime(list[i].activityEndTime, false, false, false);
						list[i].imgs = _this.xdUniUtils.IsNullOrEmpty(list[i].imgs) ?  _this.xdUniUtils.xd_randomImg(1) : list[i].imgs;
						list[i].labels = _this.xdUniUtils.IsNullOrEmpty(list[i].labels) ? "暂未添加" : list[i].labels;
						list[i].planDay = _this.xdUniUtils.IsNullOrEmpty(list[i].planDay) ? "0" : list[i].planDay;
						list[i].activityContent = _this.xdUniUtils.IsNullOrEmpty(list[i].activityContent) ? "暂未添加" : list[i].activityContent;
						list[i].baoZhengJin = _this.xdUniUtils.IsNullOrEmpty(list[i].baoZhengJin) ? "0" : list[i].baoZhengJin;
						list[i].holidayDay = _this.xdUniUtils.IsNullOrEmpty(list[i].holidayDay) ? "0" : list[i].holidayDay;
						list[i].createTime = _this.xdUniUtils.xd_timestampToTime(list[i].createTime, false, true, false);
					    list[i].imgsUrl = list[i].imgs.split(",");
					}
					_this.activityByUserId = _this.pageNum == 1 ? list : _this.activityByUserId.concat(list);
					_this.pageNum = res.obj.nextPage;
				}).catch(err => {});
			},

			getReachList() {
				let that = this;
				if (that.tab == 1) {
					if (that.nextPage == 0) {
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
						mask: true
					})
					that.xd_request_post(that.xdServerUrls.xd_pushByUserIdList, {
							token: uni.getStorageSync('token'),
							userId: uni.getStorageSync('id'),
							pageNum: that.nextPage,
							pageSize: that.pageSize,
						},
						false
					).then(res => {
						that.nextPage = res.obj.nextPage;
						var data = that.dataPaly(res);
						that.cardList = that.cardList.concat(data);
						setTimeout(function() {
							uni.hideLoading()
						}, 1000);
						// uni.hideNavigationBarLoading();//关闭加载动画

					})
				} else if (that.tab == 2) {

					if (that.nextPageTwo == 0) {
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
						mask: true
					})
					that.xd_request_post(that.xdServerUrls.xd_lookerPushListByUserId, {
							userId: uni.getStorageSync("id"),
							pageNum: that.nextPageTwo,
							pageSize: 10,
						},
						true).then(res => {
						var data = res.obj.list;
						that.nextPageTwo = res.obj.nextPage;
						data.forEach(function(item) {
							if (typeof item.challengeRmb != 'undefined' && item.challengeRmb != '' && item.challengeRmb != '0') {
								item.challengeRmb = Math.floor(item.challengeRmb / 100);
							}
							if (typeof item.pictures === 'undefined' || item.pictures == '') {
								var img=[]
								img.push(that.xdUniUtils.xd_randomImg(1));
								item.pictures =img 
							} else {
								
									item.pictures = item.pictures.split(",")
								
							}
						})
						that.lookerList = that.lookerList.concat(data);
						setTimeout(function() {
							uni.hideLoading()
						}, 1000);
					}).catch(Error => {
						console.log(Error)
					})
				} else if (that.tab == 3) {
					that.getActivityByUserId();
				} else if (that.tab == 4) {
					that.getAction();
				}
			},
			dataPaly(res) {
				let dataList = res.obj.list;

				var date = new Date();

				date = date.getTime();
				for (var i = 0; i < dataList.length; i++) {
					if(dataList[i].pictures){
						dataList[i].pictures=dataList[i].pictures.split(',')
						
					}else{
						dataList[i].pictures=[]
					}
					
					dataList[i].challengeRmb = Math.floor(dataList[i].challengeRmb / 100);

				}
				console.log(dataList)
				return dataList;
			}

		},
		onReachBottom() {
			this.getReachList()
		},
		onPullDownRefresh() {
			this.inDada(this.tab);
			uni.stopPullDownRefresh();
		},
		components: {
			actionlist
		}
	};
</script>

<style lang="scss">
	.action {
		padding: 0 10rpx 0 10rpx;
		font-size: 30rpx;
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

	.actionInfo {
		.tabbar {
			font-size: 28rpx;
			display: flex;
			justify-content: space-between;

			.tab {
				flex: 1;
				text-align: center;
				border-bottom: 1px solid #d9d9d9;
				padding: 16rpx;

				&.active {
					border-bottom: 1px solid #fd5107;
					color: #fd5107;
				}
			}
		}
	}

	// .btn_bar{
	// 	position: fixed;
	// 	bottom: 0;
	// 	left:25%;
	// 	width: 50%;
	// 	.btns {
	// 		height: 100rpx;

	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: space-between;
	// 		font-size: 28rpx;
	// 		.btn {
	// 			flex: 1;
	// 			height: 64rpx;
	// 			line-height: 64rpx;
	// 			background: #ffa700;
	// 			// color: #fff;
	// 			font-size: 28rpx;
	// 			border-radius: 40rpx;

	// 		}
	// 	}
	// 	}

	.mask {
		display: flex;
		align-items: flex-end;
		position: fixed;
		left: 0;
		top: var(--window-top);
		bottom: 0;
		width: 100%;
		background: rgba(0, 0, 0, 0);
		z-index: 9995;
		transition: .3s;

		.mask-content {
			width: 100%;
			// min-height: 30vh;
			max-height: 70vh;
			background: #f3f3f3;
			transform: translateY(100%);
			transition: .3s;
			overflow-y: scroll;
		}

		&.none {
			display: none;
		}

		&.show {
			background: rgba(0, 0, 0, .4);

			.mask-content {
				transform: translateY(0);
			}
		}
	}

	.mask_top {
		display: flex;
		flex-direction: column;
	}

	.imgheit {
		height: 320upx;
		width: 100%;
	}

	.mask_top_text {
		margin-bottom: 5upx;
		background-color: #FFFFFF;
		width: 100%;
		height: 100upx;
		text-align: center;
	}

	.mask_text {
		font-size: 28upx;
		font-weight: bold;
		line-height: 100upx;

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
	.moreandroidwhite{
		font-size: 40upx;
	}
</style>
