<template>
	<view class="bg-white">
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
						<!-- 	<view class="cu-tag line-orange radius" @tap="clickGroup(pushList.userId)">赞助</view> -->
							<view class="cu-tag line-orange radius" @tap="clickGroup(pushList.userId)">互助小圈</view>
							<view class="cu-tag  radius" :class="guanzhu=='关注'?'line-orange':'line-gray'" v-if="guanzhu.length > 0" @tap="tags">
								{{guanzhu}}
							</view>
							
						</view>
					</view>
					<view class="flex flex-direction padding justify-between">
						<view class="flex flex-wrap justify-between">
							<view class="">
								<text class="text-orange" v-if="pushList.pushCardStatus==1">进行中...</text>
								<text class="text-gray" v-else-if="pushList.pushCardStatus==2">未达成</text>
								<text class="text-green" v-else-if="pushList.pushCardStatus==3">已达成</text>
								<view class="margin-left-xs cu-tag bg-grey radio">{{pushList.label}}</view>
							</view>
						</view>
						<view class="flex light bg-orange radius ">
							<view class="widthtext padding-sm">
								<view class="text-black text-sm ">
									阶段期限：{{pushList.createTime}}--{{pushList.endTime}}
								</view>
								<view class="xd-rows margin-top-sm">
									<view class="text-gray text-sm ">
										已达成天数：{{pushList.pushCardCount}}/{{pushList.targetDay}}
									</view>
									<view class="text-gray text-sm " style="margin-left: 10px;">
										可休假天数：
										<view class="text-sm display-inline" v-if="pushList.surpassHolidayDay>=0">
											{{pushList.kholidayDay}}
										</view>
										<view class="text-sm text-red display-inline" v-else>
											超期{{surpassHolidayDay}}
										</view>
										<view class="text-sm display-inline">
											/{{pushList.holidayDay}}
										</view>
									</view>
								</view>
							
							</view>
							<view class='xd-flex flex-direction bg-pink align-center widthtext-b radius' v-if="pushList.challengeRmb>0" >
								<view v-if="userId==pushList.userId " >
									<view :class="pushList.challengeRmb>10?'textlinhet-a':'textlinhet'" @click="gotoSponsor(pushList)">
										保证金￥{{pushList.challengeRmb}}
									</view>
								</view>
								<view v-if="userId!==pushList.userId" >
									<view :class="pushList.challengeRmb>10?'textlinhet-a':'textlinhet'" @click="gotoSponsor(pushList)">
										保证金￥{{pushList.challengeRmb+sponsorRmb}}
									</view>
								</view>
								<!-- <view style="margin-right: 6px;" v-if="userId==pushList.userId && sponsorRmb>0">
									<view class="cu-tag radius bg-yellow " @click="gotoSponsor(pushList)">
										获赞助金￥{{sponsorRmb}}
									</view>
									<text style="position:relative;top:2px;left:4px;" class="text-gray text-df ">{{sponsorCnt}}</text>
								</view> -->
							    <!-- && sponsorCnt>0 -->
								<!-- <view style="margin-right: 6px;" v-if="userId!=pushList.userId ">
									<view class="cu-tag radius bg-yellow" @click="gotoSponsor(pushList)">
										赞助
									</view>
									<text style="position:relative;top:2px;left:4px;" class="text-gray text-df ">{{sponsorCnt}}</text>
								</view> -->
							</view>
						</view>
						<view class="widthtext margin-top-sm text-black">
							<view class=" text-sm flex flex-wrap align-center testdonli" @tap="showModal(1)">
								<view class="text-xl">
									<text class="lg text-gray cuIcon-write"></text>
								</view>
								<text class=" margin-left-xs testcontentshow">动力：{{pushList.dongLi?pushList.dongLi:""}}</text>
							</view>
							<view class=" text-sm margin-top-sm flex flex-wrap align-center testdonli" @tap="showModal">
								<view class="text-xl">
									<text class="lg text-gray cuIcon-write"></text>
								</view>
								<text class=" margin-left-xs testcontentshow">信心：{{pushList.xinXin?pushList.xinXin:""}}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="text-contents contentext">
				<text style="font-size: 14px;font-weight: 700;">{{pushList.content}}</text>
			</view>
			<view class="grid flex-sub padding-lr" style="margin-top: 5px;" :class="pushList.pictures.length>1?'col-3 grid-square':'col-1'" v-if="pushList.pictures.length>1">
				<view class="bg-img" :class="pushList.pictures.length>1?'':'only-img'" :style="{backgroundImage:'url('+item+')'}"
				 v-for="(item,index) in pushList.pictures" :key="index" @tap="goPageImg(pushList.pictures,index)" >
				</view>
			</view>
			<view class="grid flex-sub padding-lr" style="margin-top: 5px;" v-else >
				<image class="bg-img imgheit" :src="pushList.pictures[0]" mode="aspectFill" @tap="goPageImg(pushList.pictures[0])" v-if="pushList.pictures[0]">
				</image>
				<image class="bg-img imgheit" :src="audioPlaySrc" mode="aspectFill" @tap="goPageImg(audioPlaySrc)" v-else @error="error">
				</image>
			</view>
			<view class="flex padding justify-around align-center">
				<view class="action flex flex-wrap align-center" @tap="gotoSponsor(pushList,index)">
					<view class="text-lg">
						<text class="lg text-black cuIcon-moneybag"></text>
					</view>
					
					<text class="text-sm marginxs">赞助</text>
					<text v-if="pushList.sponsorCount>0" class="text-gray text-sm ">{{pushList.sponsorCount}}</text>
				</view>
				<button class="cu-btns" :id="index"  @click="shareBt">
					<view class="flex flex-wrap align-center ">
						<view class="text-black text-lg">
							<text class="lg text-black cuIcon-forward"></text>
						</view>
						<text class="text-sm marginxs" v-if="pushList.userId==userId ">分享邀请</text>
						<text class="text-sm marginxs" v-else>为TA打Call</text>
					</view>
				</button>
				<view class="" v-if="isRanking">
					<button class="cu-btn bg-green sm round"  @click="addRankin" >选择该行动加入</button>
				</view>
				
				<view class="action flex flex-wrap align-center " v-else   @tap="lookerClick(pushList,index)">
					<view class="text-lg">
						<text class="lg text-black cuIcon-friendfavor"></text>
					</view>
					<text class="text-sm marginxs text-red" v-if="pushList.userId!=userId && !pushList.onlooker&&pushList.challengeRmb<=0" :id="index"   >围观</text>
					<text class="text-sm marginxs text-red" v-else-if="!pushList.onlooker" >围观分钱</text>
					<text class="text-sm marginxs" v-else-if="pushList.onlooker">已围观</text>
					<text class="text-gray text-sm " v-if="pushList.onlookerCount>0">{{pushList.onlookerCount}}</text>
				</view>
				<view class="action flex flex-wrap align-center" >
					<view class="text-lg">
						<text class="lg text-black cuIcon-activityfill"></text>
					</view>
					
					<text class="text-sm marginxs" @click="goSteps" v-if="userId==pushList.userId">立即打卡</text>
					<text class="text-sm marginxs" @click="gostep" v-else>一起行动</text>
				</view>
				

			</view>
		</view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange curcss':''" v-for="(items,index) in ['打卡内容','围观排行']"
				 :key="index" @tap="tabSelect" :id="index">
					{{items}}
				</view>
			</view>
		</scroll-view>
		<block v-for="(item,index) in pusCardList" :key="index" v-if="TabCur==0">
			<view class="cu-timeline">
				<view class="cu-time" v-if="index==0||compareDate(pusCardList[index-1],item)">{{item.createTime}}</view>
				<view class="cu-item">
					<view class="content">
						<view class="">
							<view class="cu-tag line-green">第{{pusCardList.length-index}}次打卡</view>
						</view>
						<view class="margin-top-sm margin-bottom-sm margin-left-lg textcon" @tap="gocardComentList(item,0)">{{item.content}}</view>
						<view class="videheit" v-if="item.videos!=''&&item.videos!=undefined &&item.videos!=null ">
							<video class="videos" :src="item.videos" controls></video>
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
		<block v-for="(attention,index) in lookerList" :key="index" v-if="TabCur==1">
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
		<view class="cu-modal" :class="modalName=='Modal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">{{ModalTitil}}</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-red"></text>
					</view>
				</view>
				<view class="padding-sm text-sm texttDonAndXin">
					<textarea class="textarescss" auto-height="true" :value="ModalConten" maxlength="500" @input="textDonAndXin" />
					</view>
					<button class="buttonDonAndXin " v-if="pushList.userId==userId" type="default" @tap="updataPushData">修改</button>
				</view>
			</view>
			<backTop :scrollTop="scrollTop"></backTop>
			<!-- 开始行动-加号 -->
			<view class="start-add" @tap="goPage('/pages/action/step1')" v-if="scrollTop<2000">
				<image src="../../../static/images/icon/add.png" mode="widthFix"></image>
			</view>
			<!-- 分享 -->
			<share 
				ref="share" 
				:contentHeight="950"
			></share>
		</view>
	</view>
</template>

<script>
	import lookerCountInfo from "@/components/lookerCountInfo.vue"
	import{ mapState,mapMutations} from 'vuex'
	import backTop from "@/components/backTop.vue"
	import share from "@/components/share.vue"
	export default {
		components:{
			lookerCountInfo,
			backTop,
			share
		},
		data() {
			return {
				shareImg:'',
				sharePath:'',
				scen:'',
				shareTitle:'',
				TabCur: 0,
				pushComentList:[],
				pusCardList:[],
				pushList:{},
				modal: false,
				addrAnimation:'',
				audioPlaySrc:'../../../static/images/icon/img/titl.png',
				userId:uni.getStorageSync('id'),
				sponsorRmb:0,  //赞助金额
				sponsorCnt:0,  //赞助笔数
				surpassHolidayDay:0,
				modalName:null,
				ModalTitil:'',
				ModalConten:'',
				cententdata:'',
				lookerList:[],
				looktotal:'',
				lookNextPageTwo:'',
				pushId:'',
				isShare:0,
				guanzhu:'关注',
				scrollTop:0,
				scrollTopinfo:true,
				
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			// if(this.scrollTopinfo){
			// 	this.scrollTopinfo=false;
			// 	setTimeout(()=>{
			// 		this.scrollTop=0
			// 		this.scrollTopinfo=true;
			// 	},3000)
			// }
			
		},
		watch:{
			hasLogin() {
				setTimeout(() => {
					// this.id=uni.getStorageSync('id');
					this.userId=uni.getStorageSync('id');
					this.getpushList();
					let pages = getCurrentPages(); // 当前页面
					let beforePage = pages[pages.length - 2]; // 前一个页面
					beforePage.onLoad(); // 执行前一个页面的onLoad方法
					that.getshare()
				}, 100);
			},
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onLoad(option) {
			console.log(option)
			if(option.tabId){
				this.TabCur = 1
			}
			this.getActSponsor()
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
			if(option.scene){
				 var id=decodeURIComponent(option.scene);	
				 var  ids= id.split('&')
				 var    pushIds =  ids[0].split('=')
			     var   shares=    ids[1].split('=')
			     var     isopens=  ids[2].split('=')
				   if(pushIds[0]=='pushId'){
					   this.pushId=pushIds[1]
				   }
				   if(shares[0]=='share'){
				   			try{
				   			 uni.setStorageSync('share',shares[1]);
				   			}catch(e){
				   				console.log(Error)
				   			};
				   }
				   if(isopens[0]=='isopen'){
				   		this.isShare=isopens[1]?isopens[1]:0
				   }
			}else if(option.pushList==undefined){
				
				this.pushId=option.pushId;
				this.isShare=option.isopen?option.isopen:0;
				if(option.share!=undefined){
					try{												
					 uni.setStorageSync('share',option.share);
					}catch(e){
						console.log(Error)
					};
				}
				this.getLookerList()
			}
			// 均为同步，重复代码提到条件外
			this.getpushList();
			this.getPushCardList();
			this.clickSaveShareInfo();
		},
		// 三点
		onShareAppMessage(res) {
			let that = this;
			that.$refs.share.hideModal();
			let img;
			if(that.pusCardList.length>0){
				img=that.pusCardList[0].pictures[0]
			} else {
				img=that.shareImg?that.shareImg:that.xdUniUtils.xd_randomImg(1)
			}
			return	that.xdUniUtils.xd_onShare(that.shareTitle,that.sharePath+'?'+that.scen,img)
			that.setSaveShareInfo()
},
		//#ifdef MP-WEIXIN
		onShareTimeline(){
			let that = this;
			that.setSaveShareInfo()
				return {
					title: that.shareTitle,
					query: that.scen,
					imageUrl:that.shareImg?that.shareImg:that.xdUniUtils.xd_randomImg(1),
				}
				
		},
		//#endif
		methods:{
			// 按钮分享
			shareBt(){
				let that = this;
				if(!that.hasLogin){
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				this.getshare()
				if(that.shareImg.length){
					that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);
				}else{
					that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,'');
				}
				// that.scen='pushId='+ that.pushList.id+'&share='+uni.getStorageSync('id')+'&isopen='+that.pushList.isopen
				// that.sharePath= '/pages/index/action/action'
				// if(that.pushList.challengeRmb>0){
				// 	if(that.pusCardList.length>0){
				// 		that.shareImg=that.pusCardList[0].pictures[0]
				// 		that.shareTitle=that.pushList.userId==that.userId? '我没动力时,就想想围观分钱的你们:'+that.pusCardList[0].content:'@'+that.pushList.userName+'你不加油,我们就围观分钱:'+that.pusCardList[0].content
				// 		if(that.shareImg){
				// 			that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);
				// 		}else{
				// 			that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,'');
				// 		}
				// 	}else{
						
				// 		that.shareImg=that.pushList.pictures[0]
				// 		that.shareTitle=that.pushList.userId==that.userId? '我没动力时,就想想围观分钱的你们:'+that.pushList.content:'@'+that.pushList.userName+'你不加油,我们就围观分钱:'+that.pushList.content
				// 		if(that.shareImg){
				// 			that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);
				// 		}else{
				// 			that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,'');
				// 		}
				// 	}
				
				// }else{
				// 	if(that.pusCardList.length>0){
				// 		that.shareTitle=that.pushList.userId==that.userId? '我没动力时,就想想围观的你们:'+that.pusCardList[0].content:'我为@'+that.pushList.userName+'打Call:'+that.pusCardList[0].content
				// 		that.shareImg=that.pusCardList[0].pictures[0]
				// 		if(that.shareImg){
				// 			that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);
				// 		}else{
				// 			that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,'');
				// 		}
				// 	}else{
				// 		that.shareTitle=that.pushList.userId==that.userId? '我没动力时,就想想围观的你们:'+that.pushList.content:'我为@'+that.pushList.userName+'打Call:'+that.pushList.content
				// 		that.shareImg=that.pushList.pictures[0]
				// 		if(that.shareImg){
				// 			that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);
				// 		}else{
				// 			that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,'');
				// 		}
				// 	}
					
				// }
			},
			getshare(){
				let that = this;
				that.scen='pushId='+ that.pushList.id+'&share='+uni.getStorageSync('id')+'&isopen='+that.pushList.isopen
				that.sharePath= '/pages/index/action/action'
				if(that.pushList.challengeRmb>0){
					if(that.pusCardList.length>0){
						that.shareImg=that.pusCardList[0].pictures[0]
						that.shareTitle=that.pushList.userId==that.userId? '我没动力时,就想想围观分钱的你们:'+that.pusCardList[0].content:'@'+that.pushList.userName+'你不加油,我们就围观分钱:'+that.pusCardList[0].content
					}else{
						that.shareImg=that.pushList.pictures[0]
						that.shareTitle=that.pushList.userId==that.userId? '我没动力时,就想想围观分钱的你们:'+that.pushList.content:'@'+that.pushList.userName+'你不加油,我们就围观分钱:'+that.pushList.content
					}
				}else{
					if(that.pusCardList.length>0){
						that.shareTitle=that.pushList.userId==that.userId? '我没动力时,就想想围观的你们:'+that.pusCardList[0].content:'我为@'+that.pushList.userName+'打Call:'+that.pusCardList[0].content
						that.shareImg=that.pusCardList[0].pictures[0]
					}else{
						that.shareTitle=that.pushList.userId==that.userId? '我没动力时,就想想围观的你们:'+that.pushList.content:'我为@'+that.pushList.userName+'打Call:'+that.pushList.content
						that.shareImg=that.pushList.pictures[0]
					}
				}
			},
			//互助小组点击事件
			clickGroup(userid){
				if(userid == uni.getStorageSync('id')){
					uni.navigateTo({
						url:'../../pageA/group/groupList?userId='+userid
					})
				}else{
					uni.reLaunch({
						url:'../index?isGroupLable=true'
					})
				}
			},
			//动力信心修改内容
			textDonAndXin(e){
				this.cententdata=e.detail.value;
			},
			//修改动力信心
			updataPushData(){
				let data='';
				if (this.cententdata == '') {
					uni.showToast({
						title: '请输入修改内容',
						duration: 2000,
						icon: 'none'
					});
					return false
				};
				if(this.ModalTitil=="动力"){
					data={id:this.pushId?this.pushId:uni.getStorageSync('pushId'),
					dongLi:this.cententdata
					}
				}else{
					data={id:this.pushId?this.pushId:uni.getStorageSync('pushId'),
					xinXin:this.cententdata
					}
				}
				this.xd_request_post(this.xdServerUrls.xd_updatePushDataByPushId,
					data
				,true
				   ).then(res => {
					   this.getpushList();
					   this.getPushCardList();
						this.modalName = null;
						this.ModalTitil='';
						this.ModalConten='';
						this.cententdata =''
					   })
				
			},
			//动力信心修改弹窗
			showModal(e) {
				this.modalName = "Modal";
				if(e==1){
					this.ModalTitil="动力";
					this.ModalConten=this.pushList.dongLi;
				}else{
					this.ModalTitil="信心";
					this.ModalConten=this.pushList.xinXin;
				}
			},
			//关闭弹窗
			hideModal(e) {
				this.modalName = null;
				this.ModalTitil='';
				this.ModalConten='';
			},
			// 赞助
			gotoSponsor(list) {
				console.log('aaaaa',list)
				uni.setStorageSync("pushId", list.id);
				uni.setStorageSync("cardId", list.pushCardList[0].id);
				uni.navigateTo({
					url: '../../sponsor/action'

				})
			},
			gothank(e){
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../../login/login' 
					});
					return false
				}
				uni.navigateTo({
				url:'/pages/pageA/thankmoney/thankmoney?userId='+e.lookUserId+"&pushId="+e.pushId
			});
			},
			async getActSponsor(){	
				
				const that = this
				const parm = {
					token: uni.getStorageSync('token'), 
					pageSize: 99 , 
					pageNum: 1 , 
					pushId: this.pushId,       // 行动项id
				} 
				const {resultCode,obj,msg} = await that.xd_request_post(that.xdServerUrls.xd_getActSponsor,parm)
				console.log(obj)
				if(resultCode==='0'){
					
					if(obj.pageInfo && obj.pageInfo.list &&  Array.isArray(obj.pageInfo.list) && obj.pageInfo.list.length>0 ) {
						 this.sponsorList = obj.pageInfo.list.map(item=> {
							 return {
								...item,
								 ...{sponsorCondition: item.sponsorCondition? JSON.parse(item.sponsorCondition):this.sponsorCondition,
								 	pictures: item.pictures? JSON.parse(item.pictures):this.pictures,
								 }
							 }
						 })
						
						 this.sponsorCnt = this.sponsorList.length
						 this.sponsorRmb = Math.round(this.sponsorList.reduce((t,v)=> t+=v.zanzhujinRmb,0)/100)
						
					}
					this.sponsorShare = obj.pushTarget
				} else {
					uni.showToast({
						title: obj,
						icon: 'none',
						duration: 3000,
						success:function() {
							return false;
						}
					})
				}

			},
			goPage(url){
				if(!this.hasLogin){
					// uni.switchTab({
					// 	url:'../index'
					// })
					// return false
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				uni.navigateTo({
					url
				});
			},
		    showBanner(lookUserId,pushId){
				this.$refs.lookerCountInfo.showBanner(lookUserId,pushId);
			},
			compareDate (d1, d2) {
				if(typeof d1 == 'undefined'){
					return true
				}
				if(typeof d2 == 'undefined'){
					return true
				}
				
				return d1.createTime != d2.createTime
			},
			gostep(){
				if(!uni.getStorageSync('token')){
					uni.switchTab({
						url:'../index'
					})
				}else{
					uni.showModal({
						 content: '是否要创建相同行动项',
						 confirmText: '新建',
						 confirmText:'继续',
						 success: (res) => {
						   if (res.confirm) {
							   uni.setStorageSync('pushData',this.pushList)
							 uni.navigateTo({
							 	url:'../../action/step1'
							 });
						   } else if (res.cancel) {
							 
						   }
						 }
					})
				}
				
			},
			tabSelect(e){
				this.TabCur=e.target.id;
				if(this.TabCur ==1){
					this.getLookerList()
				}
			},
			setSaveShareInfo(){
				alert(uni.getStorageSync('id'))
				// uni.getStorageSync('id')
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
					pushId:this.pushId,
					// shareUserId:this.userId,
					shareUserId:uni.getStorageSync('id'),
				},true
				   ).then(res => {
					  
					   })
			},
			clickSaveShareInfo(){
				if(uni.getStorageSync('share') != '' && this.userId != undefined){
					this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
						pushId:this.pushId,
						shareUserId:uni.getStorageSync('share'),
						clickUserId:this.userId,
					},true
					   ).then(res => {
						   if(res.resultCode==0){
						    this.getpushList();
						       }else{
						         this.xdUniUtils.xd_showToast(res.obj,5000,"none")
						    }		
						 
						   })
				}
			},
			goUser(e){
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../../login/login' 
					});
									return false
				}
				if(!this.hasLogin){
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				uni.navigateTo({
					url:'../../selfCenter/selfView?userId='+e
				})
			},
			//围观
			lookerClick:function(list,index){
				var that=this ;
				if(!that.hasLogin){
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../../login/login' 
					});
									return false
				}
				that.userId=uni.getStorageSync('id');
				that.xd_request_post(that.xdServerUrls.xd_saveLooker,{
					
					pushId:list.id,
					lookUserId:that.userId,
				},true
				   ).then(res => {	
				
						   if(res.resultCode==0){
							   that.pushList.onlooker=true
							   that.pushList.onlookerCount++;
							  if(uni.getStorageSync(new Date().toLocaleDateString()+"dycwgKey") != 1){
								   uni.showModal({
										 content: that.xdCommon.gzsm_wgglts,
										 showCancel: false,
										 buttonText: '知道了',
										 success: (res) => {
										   if (res.confirm) {
											 uni.setStorageSync(new Date().toLocaleDateString()+'dycwgKey',1);
										   } else if (res.cancel) {
											 uni.setStorageSync(new Date().toLocaleDateString()+'dycwgKey',1);
										   }
										 }
									})
							  }else{
								  uni.showToast({
										title:'围观成功',
										 duration: 1000,
										 icon:'none',
								  }) 
							  }
						   }else{
							   uni.showToast({
								title:res.msg,
								 duration: 1000,
								 icon:'none',
							   })
						   }
						   
					
				})
			},
			gothanl(item){
				uni.showModal({
				    content: '感谢金设置',
					cancelText:'自定义',
					confirmText:'智能分配',
				    success: function (res) {
				        if (res.confirm) {
				
				        } else if (res.cancel) {
				            uni.navigateTo({
				            	url:'/pages/pageA/thankmoney/thankmoney?pushId='+item.id
				            });
				        }
				    },
				})
			},
			goSteps(){
				if(this.pushList.pushCardStatus==2||this.pushList.pushCardStatus==3){
					uni.showModal({
						 content: this.xdCommon.gzsm_clickCard,
						 confirmText: '新建',
						 success: (res) => {
						   if (res.confirm) {
							   uni.setStorageSync('pushData',this.pushList)
							 uni.navigateTo({
							 	url:'../../action/step1'
							 });
						   } else if (res.cancel) {
							 
						   }
						 }
					})
				}else{
					uni.navigateTo({
						url: '/pages/pageA/user/clockIn?pushId='+this.pushList.id
					});
				}
			},
			goPageImg(e,index){
				this.xdUniUtils.xd_showImg(e,index);
			},
			error: function() {
				this.audioPlaySrc=this.xdUniUtils.xd_randomImg(1);
			       }  ,
						
			gocardComentList(e,index){
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../../login/login' 
					});
									return false
				}
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushId='+e.pushId+'&cardId='+e.id+'&show='+index
				});
			},
			cardComentList(e){			
				var data=[];
				data.push(e);
				if(this.pushList.pushCardList.length<=0){
					var da={
						id:e.id,
						userId:e.userId
					};
					this.pushList.pushCardList.push(da);
				}
				
				var pushCard={
					pushList:this.pushList,
					pushCardList:data,
				};
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushCard='+encodeURIComponent(JSON.stringify(pushCard))
				});
			},
			timeStamp(res){
				let dataList=res.obj;
				for(var i=0;i <res.obj.length;i++){
				   var  time=this.xdUniUtils.xd_timestampToTime(res.obj[i].createTime,true);
					dataList[i].createTime=time;
				}
				return dataList;
			},
			openAddr() {
			// 	this.getPushComenList();
			
			//       this.modal=!this.modal;
			uni.navigateTo({
				url: '../cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(this.pushList))
			});
			     
			  },
		async	getpushList(){
				if(this.isShare==1){
					if(!uni.getStorageSync('token')){
						uni.navigateTo({
							url: '../../login/login' 
						});
						return false
					}
				}
			  	this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId,{
			  		pushId:this.pushId,
					isShare:this.isShare,
					lookUserId:uni.getStorageSync('id'),
			  	},true).then(res=>{	
					if(res.resultCode==0){
						var data=res.obj;
						data.createTime=this.xdUniUtils.xd_timestampToTime(res.obj.createTime,true)
						data.endTime=this.xdUniUtils.xd_timestampToTime(res.obj.endTime,true)
						data.challengeRmb=res.obj.challengeRmb/100;
						if(data.pictures.length){
							data.pictures=res.obj.pictures.split(',')
						}else{
							data.pictures=[]
						}
						this.pushList=data;
						this.surpassHolidayDay=Math.abs(this.pushList.surpassHolidayDay)
						
						if(this.pushList.userId == uni.getStorageSync('id')){
							this.guanzhu =''
						}else{
							this.xd_request_post(this.xdServerUrls.xd_iSAttention,{
								userId:uni.getStorageSync('id'),
								attentionUserId:this.pushList.userId,
							},true)
							.then(res=>{
								if(res.obj){
									this.guanzhu ='已关注'
								}else{
									this.guanzhu ='关注'
								}
								
							})
						}
						
					}else{
						uni.showToast({
							title:res.obj,
							icon:'none',
						})
					}
					this.getshare()
			  	})
				
			  },
			goStep(){
				uni.navigateTo({
					url: `/pages/action/step1`
				});
			},
			getPushComenList(){
				this.xd_request_post(this.xdServerUrls.xd_showCommentAndReplayCommtent,{
					pushId:this.pushId,
						token:uni.getStorageSync('token')
				},false).then(res=>{
					if(res.resultCode==0){
					this.pushComentList=this.timeStamp(res);
					    }else{
					      this.xdUniUtils.xd_showToast(res.obj,5000,"none")
					 }	
					
					
				})
			},
		async	getPushCardList(){
				this.xd_request_post(this.xdServerUrls.xd_pushCardListByPushId,{
					pushId:this.pushId,		
				},true).then(res=>{
					if(res.resultCode==0){
					var data=res.obj.list;
					for(let i=0;i<res.obj.list.length;i++){
						data[i].createTime=this.xdUniUtils.xd_timestampToTime(data[i].createTime,false,false,false,true);
						if(res.obj.list[i].pictures){
							data[i].pictures=res.obj.list[i].pictures.split(',')
						}else{
							data[i].pictures=[]
						}
					}
					this.pusCardList=data;
					    }else{
					      this.xdUniUtils.xd_showToast(res.obj,5000,"none")
					 }	
			
				})
			},
			// 打卡
			cardFn: function () {
				this.active = 0;
			},
			// 详情
			detailFn : function(){
				this.active = 1;
			},
			// 围观的人
			lookFn : function(){
				this.active = 2;
				this.getLookerList();
			},
			tags(){
				console.log('pageACTION')
				if(!uni.getStorageSync('token')){
					uni.navigateTo({
						url: '../../login/login' 
					});
									return false
				}
				if(this.guanzhu =='已关注'){
					this.xd_request_post(this.xdServerUrls.xd_cancelAttention,{
						userId:uni.getStorageSync('id'),
						attentionUserId:this.pushList.userId,		
						
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
							  title: res.obj,
							})
						}
					})
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_saveAttention,{
					userId:uni.getStorageSync('id'),
					attentionUserId:this.pushList.userId,		
					
				},true).then(res=>{
					if(res.resultCode == 0){
						 this.guanzhu="已关注"
						 uni.showToast({
						 	icon:'none',
						   title: '关注成功',
						 })
					}else{
						uni.showToast({
							icon:'none',
						  title: res.msg,
						})
					}
				})
			},
			getLookerList(){
				this.xd_request_post(this.xdServerUrls.xd_getLookerByPushId,{
					pushId:this.pushId,
					pageNum: this.lookNextPageTwo,
					pageSize:10,
				},true)
				.then(res=>{
					if(res.resultCode==0){
					this.lookerList=res.obj.list;
					this.looktotal=res.obj.total;
					this.lookNextPageTwo=res.obj.nextPage;
					this.lookerList.forEach(item =>{
						if(item.lookUserId == uni.getStorageSync('id')){
							this.guanzhu ='已关注'
						}
					})
					    }else{
					      this.xdUniUtils.xd_showToast(res.obj,5000,"none")
					 }	
				})
			}
		}
	}
	
</script>
<style scoped lang="scss">
	
	page{background-color: #FFFFFF;}
	.imgheit{
		height: 320upx;
		width: 100%;
	}
	.contentext{
		font-size: 13px;
		padding: 10px;
	}
	.cu-timeline .cu-time{
		width: 160rpx;
	}
	.commentCount{
		right: 0;
	}
	.actionLi{
		padding-bottom: 10upx;
	}
	.ali-main{
		display: flex;
		padding: 20rpx;
		.ali-main-list{
			color: #f37b1d;
			margin-left: 10%;
			line-height: 130rpx;
			width: 140rpx;
			.ali-main-list-num{
				margin-left: 40%;
			}
		}
		.ali-main-img .xd-mag{
			border-radius: 100%;
			height: 125rpx;
			width: 125rpx;
		}
		.lli-main-content {
			.boy{
				background:#66CCFF;
				color:#fff;
				display: inline-block;
				padding:0 12upx;
				border-radius: 100%;
				font-size: 25rpx;
				
				margin-left: 14rpx;
			}
			.lli-main-content-text{
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

	.textcon{
		overflow: hidden;
		text-overflow:ellipsis;
		display:-webkit-box; 
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; ; 
	}

	.bg-light-blue{background-color: #007AFF;}
	
	.videos{
		width: 500upx;
		height: 325upx;
	}
	.widthtext{
		width: 80%;
	}
	.widthtext-b{
		width: 20%;
	}
	.texticon{
		display: inline-flex;
		position: absolute;
		color: #f37b1d;
		font-size: 35upx;
		white-space: nowrap;
		-webkit-transform:rotate(-50deg);
		z-index: 10;

	}
	.textnum{
		display: inline-flex;
		position: absolute;
		color: #FFFFFF;
		background-color:#f37b1d;
		white-space: nowrap;
		z-index: 10;
		border-radius: 200rpx;
		padding: 0rpx 10rpx;
		height: 28rpx;
	}
	.start-add{
		width: 100upx; height:100upx;
		display:flex; flex-direction:row; justify-content:center; align-items:center;
		background: #ffe66f;
		border: 2px solid #ffa700;
		border-radius: 50%;
		position: fixed; bottom: 100upx; right:30upx; z-index: 99;
	}
	.start-add image{
		width: 48upx; height:48upx;
	}
	.defaultthank{
		padding-top: 30upx;
	}
	.defaultbut{
		border: 1upx solid #f37b1d;
		color: #f37b1d;
		background-color: #FFFFFF;
		height: 60upx;
		line-height: 2.5;
		font-size: 14px;
	}
.testcontentshow{
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 2;
	overflow: hidden;
}
.testdonli{
	flex-wrap: nowrap;
}
.textarescss{
	width: 100%;
	text-align: left;
	
}
.buttonDonAndXin{
	// background: #ffe66f;
	// border: 2px solid #ffa700;
}
.curcss{
	  border-bottom: 4rpx solid;

}
.textlinhet{
	margin-top: 31%;
}
.textlinhet-a{
	margin-top: 20%;
	margin-left: 20%;
}
button::after{
		border:none;
	}
	.cu-btns{
		margin-left: unset;
		margin-right: unset;
		background-color: #FFFFFF;
		line-height: unset;
		padding-left: unset;
		padding-right: unset;
		color: #333333;
	}
	.marginxs{
		margin-left: 4upx;
	}

</style>
