<template>
	<view>
		<lookerCountInfo ref="lookerCountInfo"></lookerCountInfo>
		<view class="cu-card dynamic " :class="pushList.pictures!=''?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item ">
						<view @tap="goUser(pushList.userId)" class="cu-avatar round lg" :style="{backgroundImage: 'url(' +pushList.userHead + ')'}"></view>
						<view class="content flex-sub">
							<view @tap="goUser(pushList.userId)">{{pushList.userName}}</view>
						</view>
						<view>
							<view class="cu-tag line-orange radius" v-if="guanzhu.length > 0" @tap="tags">
								{{guanzhu}}
							</view>
						</view>
					</view>
					<view class="flex flex-wrap padding justify-between">
						<view class="widthtext ">
							<view class="flex flex-wrap justify-between">
								<view class="">
									<text class="text-orange" v-if="pushList.pushCardStatus==1">进行中...</text>
									<text class="text-gray" v-else-if="pushList.pushCardStatus==2">未达成</text>
									<text class="text-green" v-else-if="pushList.pushCardStatus==3">已达成</text>
									<view class="margin-left-xs cu-tag bg-grey radio">{{pushList.label}}</view>
								</view>
							</view>

							<view class="text-gray text-sm ">
								阶段期限：{{pushList.createTime}}--{{pushList.endTime}}
							</view>
							<view class="xd-rows">
								<view class="text-gray text-sm ">
									已达成天数：{{pushList.pushCardCount}}/{{pushList.targetDay}}
								</view>
								<view class="text-gray text-sm " style="margin-left: 10px;">
									可休假天数：
									<view class="text-sm display-inline" v-if="pushList.surpassHolidayDay>=0">
										{{pushList.kholidayDay}}
									</view>
									<view class="text-sm text-red display-inline" v-else>
										超期{{Math.abs(pushList.surpassHolidayDay)}}
									</view>
									<view class="text-sm display-inline">
										/{{pushList.holidayDay}}
									</view>
								</view>
							</view>
						</view>
						<view class='xd-flex' style="margin-top: 3px;">
							<view v-if="userId==pushList.userId && pushList.challengeRmb>0" style="margin-right: 6px;">
								<view class="cu-tag light bg-red radius">
									保证金￥{{pushList.challengeRmb}}
								</view>
							</view>
							<view v-if="userId!==pushList.userId && pushList.challengeRmb>0" style="margin-right: 6px;">
								<view class="cu-tag light bg-red radius">
									保证金￥{{pushList.challengeRmb+sponsorRmb}}
								</view>
							</view>
							<view style="margin-right: 6px;" v-if="userId==pushList.userId && sponsorRmb>0">
								<view class="cu-tag radius bg-yellow ">
									获赞助金￥{{sponsorRmb}}
								</view>
								<text style="position:relative;top:2px;left:4px;" class="text-gray text-df ">{{sponsorCnt}}</text>
							</view>

							<view v-if="userId!=pushList.userId && sponsorCnt>0">
								<view class="cu-tag radius bg-yellow">
									赞助
								</view>
								<text style="position:relative;top:2px;left:4px;" class="text-gray text-df ">{{sponsorCnt}}</text>
							</view>
						</view>
						<view class="widthtext margin-top-sm">
							<view class="text-gray text-sm flex flex-wrap align-center testdonli">
								<view class="text-xl">
									<text class="lg text-gray cuIcon-write"></text>
								</view>
								<text class=" margin-left-xs testcontentshow">动力：{{pushList.dongLi?pushList.dongLi:""}}</text>
							</view>
							<view class="text-gray text-sm margin-top-sm flex flex-wrap align-center testdonli">
								<view class="text-xl">
									<text class="lg text-gray cuIcon-write"></text>
								</view>
								<text class=" margin-left-xs testcontentshow">信心：{{pushList.xinXin?pushList.xinXin:""}}</text>
							</view>
						</view>
					</view>
				</view>
				<view class="text-contents contentext">
					<text style="font-size: 14px;font-weight: 700;">{{pushList.content}}</text>
				</view>
				<view class="grid flex-sub padding-lr">
					<image class="bg-img imgheit" :src="pushList.pictures" mode="aspectFill" @tap="goPageImg(pushList.pictures)" v-if="pushList.pictures!=''">
					</image>
					<image class="bg-img imgheit" :src="audioPlaySrc" mode="aspectFill" @tap="goPageImg(audioPlaySrc)" v-else @error="error">
					</image>
				</view>
				<scroll-view scroll-x class="bg-white nav">
					<view class="flex text-center">
						<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(items,index) in ['详情','围观排行']"
						 :key="index" @tap="tabSelect" :id="index">
							{{items}}
						</view>
					</view>
				</scroll-view>
				<view v-if="TabCur==0" style="padding-bottom: 60px;">
					<view v-if="sponsorList.length>0" class="solids-top margin-top">
						<view class="cu-list menu-avatar comment solids-top">

							<view v-for="(ite,ind) in sponsorList" :key="ind" class="cu-item">


								<view class="cu-avatar round" :style="'background-image:url('+ite.userHead+');'"></view>
								<view class="content xd-margin-left">
									<view>{{ite.userName}}</view>
									<view class="text-gray text-sm flex justify-between">
										{{xdUniUtils.xd_timestampToTime(ite.createTime,false,true,false)}}
									</view>
									<view class="text-gray text-content text-df">
										<view v-if="!!ite.sponsorCondition.contact"> 联系方式：<span style="color:#fbbd08">{{ite.sponsorCondition.contact}}</span>
										</view>
										<view v-if="ite.zanzhujinRmb>0"> 赞助金：<span style="color:#e54d42;font-weight:600"> ￥
												{{Math.round(ite.zanzhujinRmb/100)}}</span> </view>
										<!-- <view v-if="!!ite.createTime"> 赞助时间： <span style="color:#fbbd08"> {{xdUniUtils.xd_timestampToTime(ite.createTime,false,true,false)}} </span></view> -->
										<view v-if="ite.zanzhujinRmb>0 &&  !!ite.sponsorCondition.money"> 赞助说明：<span style="color:#fbbd08">{{ite.sponsorCondition.money}}</span>
										</view>

										<view v-if="!!ite.location"> 赞助场地：<span style="color:#fbbd08">{{ite.location}}</span> </view>
										<view v-if="!!ite.location && !!ite.sponsorCondition.location"> 获取条件：<span style="color:#fbbd08">{{ite.sponsorCondition.location}}
											</span></view>

										<view v-if="!!ite.location && !!ite.pictures.location" class="grid flex-sub padding-lr" :class="ite.pictures.location.length>1?'col-3 grid-square':'col-1'">
											<view v-for="(item,index) in ite.pictures.location" :key="index" class="bg-img" :class="ite.pictures.location.length>1?'':'only-img'"
											 @tap="goPageImg(ite.pictures.location,index)" :style="{backgroundImage:'url('+item+')'}">
											</view>
										</view>

										<view v-if="!!ite.daiJinQuan"> 代金券：<span style="color:#fbbd08">{{ite.daiJinQuan}} </span></view>
										<view v-if="!!ite.daiJinQuan && !!ite.sponsorCondition.daiJinQuan"> 获取条件：<span style="color:#fbbd08">{{ite.sponsorCondition.daiJinQuan}}
											</span></view>
										<view v-if="!!ite.daiJinQuan && !!ite.pictures.daiJinQuan" class="grid flex-sub padding-lr" :class="ite.pictures.daiJinQuan.length>1?'col-3 grid-square':'col-1'">
											<view v-for="(item,index) in ite.pictures.daiJinQuan" :key="index" class="bg-img" :class="ite.pictures.daiJinQuan.length>1?'':'only-img'"
											 @tap="goPageImg(ite.pictures.daiJinQuan,index)" :style="{backgroundImage:'url('+item+')'}">
											</view>
										</view>
										<view v-if="!!ite.zheKouQuan"> 折扣权：<span style="color:#fbbd08">{{ite.zheKouQuan}} </span></view>
										<view v-if="!!ite.zheKouQuan && !!ite.sponsorCondition.zheKouQuan"> 获取条件：<span style="color:#fbbd08">{{ite.sponsorCondition.zheKouQuan}}
											</span></view>
										<view v-if="!!ite.zheKouQuan && !!ite.pictures.zheKouQuan" class="grid flex-sub padding-lr" :class="ite.pictures.zheKouQuan.length>1?'col-3 grid-square':'col-1'">
											<view v-for="(item,index) in ite.pictures.zheKouQuan" :key="index" class="bg-img" :class="ite.pictures.zheKouQuan.length>1?'':'only-img'"
											 @tap="goPageImg(ite.pictures.zheKouQuan,index)" :style="{backgroundImage:'url('+item+')'}">
											</view>
										</view>
										<view v-if="!!ite.other"> 其他： <span style="color:#fbbd08">{{ite.other}} </span></view>
										<view v-if="!!ite.other && !!ite.sponsorCondition.other"> 获取条件：<span style="color:#fbbd08">{{ite.sponsorCondition.other}}
											</span></view>
										<view v-if="!!ite.other && !!ite.pictures.other" class="grid flex-sub padding-lr" :class="ite.pictures.other.length>1?'col-3 grid-square':'col-1'">
											<view v-for="(item,index) in ite.pictures.other" :key="index" class="bg-img" :class="ite.pictures.other.length>1?'':'only-img'"
											 @tap="goPageImg(ite.pictures.other,index)" :style="{backgroundImage:'url('+item+')'}">
											</view>
										</view>
									</view>
									<!-- <view class="bg-grey padding-sm radius margin-top-sm  text-sm">
										<view class="flex">
											<view></view>
											<view class="flex-sub">
					
											</view>
										</view>
									</view> -->
									<!-- <view class="margin-top-sm flex justify-between">
										<view class="text-gray text-df">{{ite.createTime}} </view>
										<view>
											<text class="cuIcon-appreciatefill text-red"></text>
											<text class="cuIcon-messagefill text-gray margin-left-sm"></text>
										</view>
									</view> -->
								</view>
							</view>
						</view>

					</view>

					<view style="padding: 10px;">
						<block v-for="(item,index) in pusCardList" :key="index">
							<view class="cu-timeline">
								<view class="cu-time" v-if="index == 0 || compareDate(pusCardList[index-1],item)">{{item.createTime}}</view>
								<view class="cu-item">
									<view class="content">
										<view class="">
											<view class="cu-tag line-green">第{{pusCardList.length-index}}次打卡</view>
										</view>
										<view class="margin-top-sm margin-bottom-sm margin-left-lg textcon" @tap="gocardComentList(item,0)">{{item.content}}</view>
										<view class="videheit" v-if="item.videos!=''&&item.videos!=undefined &&item.videos!=null ">
											<video muted="true" class="videos" :src="item.videos" controls></video>
										</view>
										<view v-else class="grid flex-sub padding-lr">
											<image class="bg-img imgheit" :src="item.pictures[0]" mode="aspectFill" @tap="goPageImg(item.pictures)" v-if="item.pictures.length!=''">
											</image>
										</view>
										<view class="text-xxl flex flex-wrap justify-end " @tap="gocardComentList(item,1)">
											<text class="text-gray cuIcon-comment  "></text>
											<text class="text-gray text-df">{{item.commentCount}}</text>
										</view>
									</view>
								</view>
							</view>
						</block>

					</view>

				</view>

				<view v-else style="padding-bottom: 60px;">
					<block v-for="(attention,index) in lookerList" :key="index">
						<view class="actionLi bg-white">
							<view class="ali-main">
								<view class="texticon" v-if="index==0">
									<text class="lg cuIcon-crown"> </text>
								</view>
								<view class="textnum" v-if="index>0">
									{{index+1}}
								</view>
								<view class="ali-main-img" @tap="goUser(attention.lookUserId)">

									<image class='xd-mag xd-box-shadow' :src="attention.userHead"></image>

								</view>
								<view class="lli-main-content xd-list-body" @tap="goUser(attention.lookUserId)">
									<view class="xd-list-title-text">
										<text>{{attention.userName}}</text>
										<text v-if="attention.sex==1" class="boy">♂</text>
										<text v-else-if="attention.sex==0" class="boy">♀</text>
										<text v-else class="boy">密</text>
									</view>
									<view class="moreInfoIn">
										<image class='address' src="/static/images/icon/address.png"></image>
										<text class="province">{{attention.province}}.{{attention.city}}</text>
									</view>
								</view>
								<view class="ali-main-list" @tap="showBanner(attention.lookUserId,attention.pushId)">
									<view class="ali-main-list-num">{{attention.lookerCount}}</view>
								</view>

								<view class="defaultthank" @click="gothank(attention)">
									<button class="defaultbut" type="default">感谢</button>
								</view>

							</view>
						</view>
					</block>
				</view>

				<view style="background:#fff" class="cu-bar foot flex padding justify-around">
					<button class="cu-btn bg-yellow  " @tap="gotoSponsorForm()">我要赞助</button>
					<button class="cu-btn line-green " open-type="share">拉赞助</button>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import lookerCountInfo from "@/components/lookerCountInfo.vue"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			lookerCountInfo
		},
		data() {
			return {
				TabCur: 0,
				pushComentList: [],
				pusCardList: [],
				pushList: {},
				modal: false,
				addrAnimation: '',
				audioPlaySrc: '../../../static/images/icon/img/titl.png',
				userId: uni.getStorageSync('id'),

				lookerList: [],
				looktotal: '',
				lookNextPageTwo: '',
				pushId: '',
				isShare: 0,
				guanzhu: '关注',

				sponsorList: [], //赞助列表
				sponsorShare: {}, //拉赞助
				sponsorRmb: 0, //赞助金额
				sponsorCnt: 0, //赞助笔数
				sponsorCondition: {
					location: '',
					daiJinQuan: '',
					zheKouQuan: '',
					other: '',
					money: '',
					contact: ''
				},
				pictures: {
					location: [],
					daiJinQuan: [],
					zheKouQuan: [],
					other: []
				},

			};
		},
		computed: {
			...mapState(['hasLogin'])
		},
		onLoad(option) {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
				menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
			if (option.pushList == undefined) {
				this.pushId = option.pushId || uni.getStorageSync('pushId');
				this.isShare = option.isopen ? option.isopen : 0;
				this.getActSponsor()
				if (option.share != undefined) {
					try {
						uni.setStorageSync('share', option.share);
					} catch (e) {
						console.log(Error)
					};
				}

				this.getpushList();
				this.getPushCardList();
				this.clickSaveShareInfo();
			}


		},


		onShareAppMessage(res) {
			let that = this;

			that.setSaveShareInfo();
			return {
				title: '我为@' + that.pushList.userName + '拉赞助：' + that.pushList.content,
				path: '/pages/sponsor/action?pushId=' + that.pushList.id + '&share=' + uni.getStorageSync('id') + '&isopen=' + that
					.pushList.isopen,
				imageUrl: that.pushList.pictures ? that.pushList.pictures : 'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605193182702.png',
			}
			// return {
			// 	title: that.pushList.userId==that.userId? '第'+that.pushList.pushCardCishuCount+'次打卡:'+that.pusCardList[0].content:'我为@'+that.pushList.userName+'拉赞助：'+that.pusCardList[0].content,
			// 	path: '/pages/sponsor/action/action?pushId='+ that.pushList.id+'&share='+that.pushList.userId+'&isopen='+that.pushList.isopen,
			// 	imageUrl:that.pusCardList[0].pictures[0]?that.pusCardList[0].pictures[0]:'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png',
			// }

		},
		methods: {
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			async getActSponsor() {

				const that = this
				const parm = {
					token: uni.getStorageSync('token'),
					pageSize: 99,
					pageNum: 1,
					pushId: this.userId, // 行动项id
				}
				const {
					resultCode,
					obj,
					msg
				} = await that.xd_request_post(that.xdServerUrls.xd_getActSponsor, parm)

				if (resultCode === '0') {

					if (obj.pageInfo && obj.pageInfo.list && Array.isArray(obj.pageInfo.list) && obj.pageInfo.list.length > 0) {
						this.sponsorList = obj.pageInfo.list.map(item => {
							return {
								...item,
								...{
									sponsorCondition: item.sponsorCondition ? JSON.parse(item.sponsorCondition) : this.sponsorCondition,
									pictures: item.pictures ? JSON.parse(item.pictures) : this.pictures,
								}
							}
						})
						console.log('-----------------', this.sponsorList)
						this.sponsorCnt = this.sponsorList.length
						this.sponsorRmb = Math.round(this.sponsorList.reduce((t, v) => t += v.zanzhujinRmb, 0) / 100)

					}
					this.sponsorShare = obj.pushTarget
				} else {
					uni.showToast({
						title: msg,
						icon: 'none',
						duration: 3000,
						success: function() {
							return false;
						}
					})
				}

			},
			gotoShare() {
				console.log('gotoShare');
			},
			gotoSponsorForm() {
				console.log('gotoSponsorForm');

				uni.navigateTo({
					url: 'form'
				})
			},
			showBanner(lookUserId, pushId) {
				this.$refs.lookerCountInfo.showBanner(lookUserId, pushId);
			},
			compareDate(d1, d2) {
				if (typeof d1 == 'undefined') {
					return true
				}
				if (typeof d2 == 'undefined') {
					return true
				}
				return this.xdUniUtils.xd_timestampToTime(d1.createTime, false, false, false) > this.xdUniUtils.xd_timestampToTime(
					d2.createTime, false, false, false)
			},
			gostep() {
				uni.navigateTo({
					url: '../../action/step1'
				})
			},
			tabSelect(e) {
				this.TabCur = e.target.id;
				if (this.TabCur == 1) {
					this.getLookerList()
				}
			},
			setSaveShareInfo() {
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo, {
					pushId: this.pushId,
					shareUserId: this.userId,
				}, true).then(res => {})
			},
			clickSaveShareInfo() {
				if (uni.getStorageSync('share') != '' && this.userId != undefined) {
					this.xd_request_post(this.xdServerUrls.xd_saveShareInfo, {
						pushId: this.pushId,
						shareUserId: uni.getStorageSync('share'),
						clickUserId: this.userId,
					}, true).then(res => {
						this.getpushList();
					})
				}
			},
			goUser(e) {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '../../login/login'
					});
					return false
				}
				uni.navigateTo({
					url: '../../selfCenter/selfView?userId=' + e
				})
			},
			// //围观
			// lookerClick:function(list,index){
			// 	var that=this ;
			// 	if(!uni.getStorageSync('token')){
			// 		uni.navigateTo({
			// 			url: '../../login/login' 
			// 		});
			// 						return false
			// 	}
			// 	that.userId=uni.getStorageSync('id');
			// 	that.xd_request_post(that.xdServerUrls.xd_saveLooker,{

			// 		pushId:list.id,
			// 		lookUserId:that.userId,
			// 	},true
			// 	   ).then(res => {	

			// 			   if(res.resultCode==0){
			// 				   that.pushList.onlooker=true
			// 				   that.pushList.onlookerCount++;
			// 				  if(uni.getStorageSync(new Date().toLocaleDateString()+"dycwgKey") != 1){
			// 					   uni.showModal({
			// 							 content: that.xdCommon.gzsm_wgglts,
			// 							 showCancel: false,
			// 							 buttonText: '知道了',
			// 							 success: (res) => {
			// 							   if (res.confirm) {
			// 								 uni.setStorageSync(new Date().toLocaleDateString()+'dycwgKey',1);
			// 							   } else if (res.cancel) {
			// 								 uni.setStorageSync(new Date().toLocaleDateString()+'dycwgKey',1);
			// 							   }
			// 							 }
			// 						})
			// 				  }else{
			// 					  uni.showToast({
			// 							title:'围观成功',
			// 							 duration: 1000,
			// 							 icon:'none',
			// 					  }) 
			// 				  }
			// 			   }else{
			// 				   uni.showToast({
			// 					title:res.msg,
			// 					 duration: 1000,
			// 					 icon:'none',
			// 				   })
			// 			   }


			// 	})
			// },
			gothank(e) {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '../login/login'
					});
					return false
				}
				uni.navigateTo({
					url: '/pages/pageA/thankmoney/thankmoney?userId=' + e.lookUserId + "&pushId=" + e.pushId
				});
			},
			goSteps() {

				uni.navigateTo({
					url: '../../selfCenter/clockIn?pushId=' + this.pushList.id
				});
			},
			goPageImg(e, index) {
				this.xdUniUtils.xd_showImg(e, index);
			},
			error: function() {
				this.audioPlaySrc = this.xdUniUtils.xd_randomImg(1);
			},

			gocardComentList(e, index) {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '../../login/login'
					});
					return false
				}
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushId=' + e.pushId + '&cardId=' + e.id + '&show=' + index
				});
			},
			cardComentList(e) {
				var data = [];
				data.push(e);
				if (this.pushList.pushCardList.length <= 0) {
					var da = {
						id: e.id,
						userId: e.userId
					};
					this.pushList.pushCardList.push(da);
				}

				var pushCard = {
					pushList: this.pushList,
					pushCardList: data,
				};
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushCard=' + encodeURIComponent(JSON.stringify(pushCard))
				});
			},
			timeStamp(res) {
				let dataList = res.obj;
				for (var i = 0; i < res.obj.length; i++) {
					var time = this.xdUniUtils.xd_timestampToTime(res.obj[i].createTime, true);
					dataList[i].createTime = time;
				}
				return dataList;
			},
			openAddr() {
				// 	this.getPushComenList();

				//       this.modal=!this.modal;
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushList=' + encodeURIComponent(JSON.stringify(this.pushList))
				});

			},
			async getpushList() {
				if (this.isShare == 1) {
					if (!uni.getStorageSync('token')) {
						uni.navigateTo({
							url: '../../login/login'
						});
						return false
					}
				}
				this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId, {
					pushId: this.pushId,
					isShare: this.isShare,
					lookUserId: uni.getStorageSync('id'),
				}, true).then(res => {
					if (res.resultCode == 0) {
						var data = res.obj;
						data.createTime = this.xdUniUtils.xd_timestampToTime(res.obj.createTime)
						data.endTime = this.xdUniUtils.xd_timestampToTime(res.obj.endTime)
						data.challengeRmb = res.obj.challengeRmb / 100;
						this.pushList = data;
						if (this.pushList.userId == uni.getStorageSync('id')) {
							this.guanzhu = ''
						} else {
							this.xd_request_post(this.xdServerUrls.xd_iSAttention, {
									userId: uni.getStorageSync('id'),
									attentionUserId: this.pushList.userId,
								}, true)
								.then(res => {
									if (res.obj) {
										this.guanzhu = '已关注'
									} else {
										this.guanzhu = '关注'
									}

								})
						}
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
						})
					}

				})
			},
			goStep() {
				uni.navigateTo({
					url: `/pages/action/step1`
				});
			},
			getPushComenList() {
				this.xd_request_post(this.xdServerUrls.xd_showCommentAndReplayCommtent, {
					pushId: this.pushId,
					token: uni.getStorageSync('token')
				}, false).then(res => {


					this.pushComentList = this.timeStamp(res);
				})
			},
			async getPushCardList() {
				this.xd_request_post(this.xdServerUrls.xd_pushCardListByPushId, {
					pushId: this.pushId,

				}, true).then(res => {
					var data = res.obj.list;
					for (let i = 0; i < res.obj.list.length; i++) {
						data[i].createTime = this.xdUniUtils.xd_timestampToTime(data[i].createTime, false, false, false);
						if (res.obj.list[i].pictures != "") {
							data[i].pictures = res.obj.list[i].pictures.split(',')
						}
					}
					this.pusCardList = data;
				})
			},
			// 打卡
			cardFn: function() {
				this.active = 0;
			},
			// 详情
			detailFn: function() {
				this.active = 1;
			},
			// 围观的人
			lookFn: function() {
				this.active = 2;
				this.getLookerList();
			},
			tags() {
				if (!uni.getStorageSync('token')) {
					uni.navigateTo({
						url: '../../login/login'
					});
					return false
				}
				// if (this.guanzhu == '已关注') {
				// 	return
				// }
				console.log('sponsor')
				if(this.guanzhu =='已关注'){
					// alert(1)
					this.xd_request_post(this.xdServerUrls.xd_cancelAttention,{
						userId: uni.getStorageSync('id'),
						attentionUserId: this.pushList.userId,	
						
					},true).then(res=>{
						if(res.resultCode == 0){
							 this.guanzhu="关注"
							 uni.showToast({
							 	icon:'none',
							   title: '取消关注',
							 })
						}else{
							uni.showToast({
								icon:'none',
							  title: res.msg,
							})
						}
					})
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_saveAttention, {
					userId: uni.getStorageSync('id'),
					attentionUserId: this.pushList.userId,

				}, true).then(res => {
					if (res.resultCode == 0) {
						this.guanzhu = "已关注"
						uni.showToast({
							icon: 'none',
							title: '关注成功',
						})
					} else {
						uni.showToast({
							icon: 'none',
							title: res.msg,
						})
					}
				})
			},
			getLookerList() {
				this.xd_request_post(this.xdServerUrls.xd_getLookerByPushId, {
						pushId: this.pushId,
						pageNum: this.lookNextPageTwo,
						pageSize: 10,
					}, true)
					.then(res => {
						this.lookerList = res.obj.list;
						this.looktotal = res.obj.total;
						this.lookNextPageTwo = res.obj.nextPage;
						this.lookerList.forEach(item => {
							if (item.lookUserId == uni.getStorageSync('id')) {
								this.guanzhu = '已关注'
							}
						})

					})
			}
		}
	}
</script>
<style scoped lang="scss">
	page {
		background: #fcfcfc;
	}

	.imgheit {
		height: 320upx;
		width: 100%;
	}

	.contentext {
		font-size: 13px;
		padding: 10px;
	}

	.cu-timeline .cu-time {
		width: 160rpx;
	}

	.commentCount {
		right: 0;
	}

	.actionLi {
		padding-bottom: 10upx;
	}

	.ali-main {
		display: flex;
		padding: 20rpx;

		.ali-main-list {
			color: #f37b1d;
			margin-left: 10%;
			line-height: 130rpx;
			width: 140rpx;

			.ali-main-list-num {
				margin-left: 40%;
			}
		}

		.ali-main-img .xd-mag {
			border-radius: 100%;
			height: 125rpx;
			width: 125rpx;
		}

		.lli-main-content {
			.boy {
				background: #66CCFF;
				color: #fff;
				display: inline-block;
				padding: 0 12upx;
				border-radius: 100%;
				font-size: 25rpx;

				margin-left: 14rpx;
			}

			.lli-main-content-text {
				line-height: 90rpx;
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

	.textcon {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		;
	}

	.bg-light-blue {
		background-color: #007AFF;
	}

	.videos {
		width: 500upx;
		height: 325upx;
	}

	.widthtext {
		width: 100%;
	}

	.texticon {
		display: inline-flex;
		position: absolute;
		color: #f37b1d;
		font-size: 35upx;
		white-space: nowrap;
		-webkit-transform: rotate(-50deg);
		z-index: 10;

	}

	.textnum {
		display: inline-flex;
		position: absolute;
		color: #FFFFFF;
		background-color: #f37b1d;
		white-space: nowrap;
		z-index: 10;
		border-radius: 200rpx;
		padding: 0rpx 10rpx;
		height: 28rpx;
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

	.defaultthank {
		padding-top: 30upx;
	}

	.defaultbut {
		height: 60upx;
		line-height: 1.9;
		font-size: 14px;
	}

	.testcontentshow {
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.testdonli {
		flex-wrap: nowrap;
	}

	.textarescss {
		width: 100%;

	}

	.buttonDonAndXin {
		// background: #ffe66f;
		// border: 2px solid #ffa700;
	}
</style>
