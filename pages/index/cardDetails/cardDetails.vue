<template>
	<view >
		<view class="cu-card dynamic " :class="pusCardLists.pictures!='' ?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar">
					<view class="cu-item ">
						<view @tap="goUser(pusCardLists.userId)" class="cu-avatar round lg" :style="{backgroundImage: 'url(' +pusCardLists.userHead + ')'}" ></view>
						<!-- class="content flex-sub" -->
						<view  class="xd-columns" style="position: absolute;left: 146upx;" >
							<view @tap="goUser(pusCardLists.userId)">{{pusCardLists.userName}}</view>
							<view class="text-gray text-sm flex justify-between" style="margin-top: 3px;">{{pushCardCreateTime}}</view>
							<!-- 打卡地址 -->
							<view class="text-gray text-sm flex justify-between" style="color: #1cbbb4;font-size: 8px;">
								{{pusCardLists.pushCardList[0].address}}
							</view>
						</view>
						<view >
							<view v-if="showHzGroup" class="cu-tag line-orange radius" @tap="clickGroup(pusCardLists.userId)" >互助小圈</view>
							<view class="cu-tag  radius" :class="guanzhu=='关注'?'line-orange':'line-gray'" v-if="guanzhu.length > 0" @tap="tags">{{guanzhu}}</view>
						</view>
					</view>
				</view>				
				<view class="text-contents margin-top-sm flex flex-direction">
					<view class="cu-tag bg-gray radius sm dakacishu" >第{{dakacishu}}次打卡</view>
					<view class="padding-top-sm">
						<text class="contentext" style="padding-left: 5px;" @longpress="copyContent">{{showCardCommentlist.pushCard.content}}</text>			
					</view>
					
				</view>	
				<view class="padding-lr" v-if="showCardCommentlist.pushCard.videos!=''&&showCardCommentlist.pushCard.videos!=undefined&&showCardCommentlist.pushCard.videos!=null">
					<video class="videoheit" 
					:src="showCardCommentlist.pushCard.videos" 
					controls
					autoplay="true"
					 ad-unit-id="adunit-8cadd04dc721ad13"
					 bindadplay="onAdplay"
					 bindadload="onAdload"
					 bindadclose="onAdclose"
					 bindaderror="onAdError"
					 ></video>
				</view>
				<view class="grid flex-sub padding-lr" :class="showCardCommentlist.pushCard.pictures.length>1?'col-3 grid-square':'col-1'" >
					<view class="bg-img" :class="showCardCommentlist.pushCard.pictures.length>1?'':'only-img'" :style="{backgroundImage:'url('+item+')'}"
					 v-for="(item,index) in showCardCommentlist.pushCard.pictures" :key="index" @tap="goPageImg(showCardCommentlist.pushCard.pictures,index)" >
					</view>
					<view class="" v-if="showCardCommentlist.pushCard.extendContent">	
					    <imt-audio continue :src="showCardCommentlist.pushCard.extendContent" :duration="8" @prev="next"
		 @next="next"></imt-audio>
		              </view>
					<image class="bg-img imgheit "  :src="showCardCommentlist.pushCard.pictures" v-if="showCardCommentlist.pushCard.pictures.length==0" mode="aspectFill"
					 @tap="goPageImg(showCardCommentlist.pushCard.pictures)"  >
					</image>
				</view>
				<view class="cu-list bg-blue menu-avatar">
					<view class="flex flex-wrap padding justify-between align-center">
						<view class="flex  flex-wrap " >
							<view class="">所属行动</view>
							<view class="text-gray text-sm  margincardlist " style="padding-left: 5px;">
								{{pusCardLists.createTime }}  ({{pusCardLists.pushCardCount}}/{{pusCardLists.targetDay}})
							</view>
						</view>
					</view>
					<view class=" flex  padding">
						<image class="bg-img imgheit"  :src="pusCardLists.pictures[0]" mode="aspectFill"
						 @tap="goPageImg(pusCardLists.pictures[0])" v-if="pusCardLists.pictures[0]!=''">
						</image>
						<image class="bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
						 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
						</image>
						<view class="text-content textheit margin-left-sm flex flex-direction" @tap="goAction(pusCardLists.id)">
							<text class="contentext" >{{pusCardLists.content}}</text>	
							<view class="cu-tag  bg-pink radius dakacishus" v-if="pusCardLists.challengeRmb>0" >
								保证金￥{{pusCardLists.challengeRmb}}
							</view>
						</view>	
					</view>		
				</view>
				<view class="flex padding justify-start">
					<view class="text-xxl"  @tap="tabSelect(0)">
						<text class=" text-df" :class="TabCur==0?'text-orange cur':''">评论 {{showCardCommentlist.pushCommentList.length?showCardCommentlist.pushCommentList.length:0}}</text>
					</view>
					<view class="text-xxl margin-left-sm"  @tap="tabSelect(1)">
						<text class=" text-df" :class="TabCur==1?'text-orange cur':''">围观排行 {{lookerList.length?lookerList.length:0}}</text>
					</view>
				</view>
				<view class="" v-if="TabCur==0">
					<view class="cu-list menu-avatar comment solids-top">
						<view class="cu-item" v-for="(item,index) in showCardCommentlist.pushCommentList" :key='index'>
							<view class="cu-avatar round" :style="{backgroundImage: 'url(' +item.userHead + ')'}" @tap="goUser(item.userId)"></view>
							<view class="content">
								<view class="">
									<view class="text-grey" @tap="goUser(item.userId)">{{item.userName}}  
									</view>
								</view>
								<view style="user-select: text;-webkit-user-select:text;" class="text-content text-df commenttext">
									<text user-select>{{item.content}}</text>
									
								</view>
								<view class="flex flex-wrap">
									<view class="text-gray text-df">{{item.createTimeStr}}</view>
									<text>-</text>
									<view class="text-grey" @tap="userRepaly(item,index)">回复</view>
									<text>-</text>
									<view class="text-grey thanktext" @tap="gothank(item)">
										感谢TA
									</view>
								</view>
								<view class="bg-gray padding-sm radius margin-top-sm  text-sm" v-if="showCardCommentlist.pushCommentList[index].cardReplayCommentList.length>0">
									<view class="flex align-center"  v-for="(items,index) in showCardCommentlist.pushCommentList[index].cardReplayCommentList" :key='index'>
										<view class="cu-tag bg-red sm margin-lr-xs" v-if="items.userId==pusCardLists.userId">达人</view>
										<view class="" v-else>{{items.userName }} </view>
										<view class="text-bold margin-lr-xs" @tap="goUser(items.replayUserId)"> 回复 </view>
										<text class=""> {{ item.userName}}：</text>
										<view class="flex-sub"><text>{{items.content}}</text></view>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
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
				
							<view class="defaultthank" @click="gothanks(attention)">
								<button class="defaultbut" type="default">感谢</button>
							</view>
				
						</view>
					</view>
				</block>
				<view class="underconten" v-if="showCardCommentlist.pushCommentList.length==0&&TabCur==0">
					<view class=" underconten-a" >
						<view class="padding">还没有人发布评论，快来帮助TA行动起来...</view>
					</view>
					<button class="cu-btn bg-orange undercontenbutton" @click="showInputComent" >评论</button>
				</view>
				<view class="underconten" v-if="lookerList.length==0&&TabCur==1">
					<view class=" underconten-a">
						<view class="padding">还没有人围观,快来围观吧...</view>
					</view>
					
				</view>
			</view>
			<view class="padding-top-sm adcus" v-if="!showInput">
				<ad-custom unit-id="adunit-8354389cd1f86a3f" ad-intervals="31" ></ad-custom>
			</view>
			<form @submit="inputComent" >
				<view class="cu-bar foot input" >
					<textarea class="  textarea-text"  placeholder-style="font-size:28rpx;"  :focus="showInput" :placeholder='conmmmenttext' maxlength="150" cursor-spacing="10"  confirm-type="done" @input="inputshowvue" @focus="onshowad" @blur="onblur" show-confirm-bar="false" name="conten"></textarea>
					<block v-if="!showInput">
						<view class="action flex flex-direction" @tap="gotoSponsor">
							<text class="lg text-black cuIcon-moneybag"></text>
							<text class="text-xs">赞助</text>
						</view>
						<view class=" flex flex-direction">
							<button class="cu-btns" @click="shareBt">
								<view class="text-black text-xxl">
									<text class="lg text-black cuIcon-forward"></text>
								</view>
							</button>
							<text class="text-xs" v-if="pusCardLists.userId==userId ">分享邀请</text>
							<text class="text-xs" v-else>为TA打Call</text>
							
						</view>
						<view class="action flex flex-direction " @tap="lookerClick(pusCardLists)">
							<text class="lg text-black cuIcon-friendfavor"></text>
							<text class="text-xs text-red" v-if="pusCardLists.userId!=userId && !pusCardLists.onlooker&&pusCardLists.challengeRmb<=0" >围观</text>
							<text class="text-xs " v-else-if="pusCardLists.onlooker">已围观</text>
							<text class="text-xs text-red" v-else  >围观分钱</text>
							<view class="cu-tag badge tagcss ">{{pusCardLists.onlookerCount}}</view>
						</view>
					</block>
					<block v-else>
						<view class="margin-right-xl">
							<button class="cu-btn bg-pink" form-type="submit" > 发送</button>
						</view>
					</block>
				</view>
			</form>
		</view>
		<!-- 分享 -->
		<share 
			ref="share" 
			:contentHeight="950"
		></share>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	import share from "@/components/share.vue"
	export default {
		components:{
			share
		},
		data() {
			return {
				lookerList:[],
				TabCur: 0,
				audioPlaySrc:'../../../static/images/icon/img/ti.png',
				showInput:false,
				pusCardLists:undefined,
				InputBottom: 0,
				value:false,
				id:uni.getStorageSync('id'),
				userId:uni.getStorageSync('id'),
				inputType:2,//2评论，1回复
				cardId:'',
				dataCardId:'',
				indexId:'',
				pushUserId:'',
				commentId:'',
				pushId:'',
				tolist:false,
				conmmmenttext:'说些什么...',
				showCardCommentlist:'',
				guanzhu:'关注',
				pushCardCreateTime:'',
				dakacishu:0,
				showHzGroup:this.xdUniUtils.showHzGroup(),
				shareImg:'',
				sharePath:'',
				shareTitle:'',
				scen:'',
			}
		},
		watch:{
			hasLogin() {
				setTimeout(() => {
					this.id=uni.getStorageSync('id');
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
		onShareAppMessage(res) {
			let that = this;
			that.$refs.share.hideModal();
			that.setSaveShareInfo();
			 return	that.xdUniUtils.xd_onShare(that.shareTitle,that.sharePath+'?'+that.scen,that.shareImg);
			
		},
		//#ifdef MP-WEIXIN
		onShareTimeline(){
			let that = this;
			that.setSaveShareInfo();
				return {
					title:that.shareTitle,
					query: 'pushId='+ that.pusCardLists.id+'&cardId='+that.cardId,
					imageUrl:that.shareImg,
				}
			
		},
		//#endif
		onLoad(option) {		
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
			this.pushId=option.pushId;
			this.cardId=option.cardId;
			
			if(option.show==1){
				this.showInput=true;
			}
			this.getshowCardComment();
			this.getpushList();
			this.getLookerList();
			
			
		},
		methods: {

			//分享
			shareBt(){
				let that = this;
				if(!that.hasLogin){
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				that.$refs.share.toggleMask(that.shareTitle,that.sharePath,that.scen,that.shareImg);	
			},
			getshare(){
				let that = this;
				that.scen='pushId='+ that.pusCardLists.id+'&share='+uni.getStorageSync('id')+'&isopen='+that.pusCardLists.isopen
				that.shareImg= that.showCardCommentlist.pushCard.pictures[0]?that.xdUniUtils.xd_randomImg('',that.showCardCommentlist.pushCard.pictures):that.xdUniUtils.xd_randomImg(1)
				that.sharePath= '/pages/index/action/action'
				if(that.pusCardLists.challengeRmb>0){
					that.shareTitle=that.pusCardLists.userId==that.userId? '我不加油,你们就围观分钱:'+that.pusCardLists.pushCardList[this.dakacishu-1].content:'@'+that.pusCardLists.userName+'你不加油,我们就围观分钱:'+that.pusCardLists.pushCardList[this.dakacishu-1].content
				}else{
					that.shareTitle= that.pusCardLists.userId==that.userId? '第'+that.dakacishu+'次打卡:'+that.pusCardLists.pushCardList[this.dakacishu-1].content:'我为@'+that.pusCardLists.userName+'打Call：'+that.pusCardLists.pushCardList[this.dakacishu-1].content
					
				}
			},

			copyContent(e){
				// console.log(this.pusCardLists.id)
				// console.log(this.id)
				if (this.pusCardLists.id == this.id) {
					uni.setClipboardData({
						data: this.showCardCommentlist.pushCard.content,
						success: function(res) {
							uni.getClipboardData({
								success: function(res) {
									uni.showToast({
										title: '已复制到剪贴板'
									});
								}
							});
						}
					});
				}
			},
			
			tabSelect(e){
				this.TabCur=e;
				if(this.TabCur ==1){
					this.getLookerList()
				}
			},
			//围观排行
			getLookerList(){
				this.xd_request_post(this.xdServerUrls.xd_getLookerByPushId,{
					pushId:this.pushId,
					pageNum: this.lookNextPageTwo,
					pageSize:10,
				},true)
				.then(res=>{
					this.lookerList=res.obj.list;
					this.looktotal=res.obj.total;
					this.lookNextPageTwo=res.obj.nextPage;
					this.lookerList.forEach(item =>{
						if(item.lookUserId == uni.getStorageSync('id')){
							this.guanzhu ='已关注'
						}
					})
					
				})
			},
			onblur(){
				this.showInput=false;
			},
			onshowad(){
				if(!this.showInput){
					this.showInput=true;
				}
			},
			gotoSponsor() {
				
				uni.setStorageSync("pushId", this.pushId);
				uni.setStorageSync("cardId", this.cardId);
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
				url:'/pages/pageA/thankmoney/thankmoney?userId='+e.userId+"&pushId="+this.pusCardLists.id
			});
			},
			gothanks(e){
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
			//围观
			
			lookerClick:function(list){
				var that=this ;
				if(!that.hasLogin){
					return that.xdUniUtils.xd_login(that.hasLogin);
				}
				that.userId=uni.getStorageSync('id');
				if(that.pusCardLists.onlooker==true){
					that.xd_request_post(that.xdServerUrls.xd_cancelLooker,{
						pushId:that.pusCardLists.id,
						lookUserId:that.userId,
					},true
					   ).then(res => {
			
						   that.pusCardLists.onlooker=false
						   that.pusCardLists.onlookerCount--;
						   uni.showToast({
								title:'已取消围观',
								 duration: 1000,
								 icon:'none',
						   }) 
						   })
				}else{
					that.xd_request_post(that.xdServerUrls.xd_saveLooker,{
						
						pushId:list.id,
						lookUserId:that.userId,
					},false
					   ).then(res => {	
					
							   if(res.resultCode==0){
								   that.pusCardLists.onlooker=true
								   that.pusCardLists.onlookerCount++;
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
									title: res.msg,
									 duration: 1000,
									 icon:'none',
								   })
							   }
							   
						
					})
				}
			},
			goAction(e){
				uni.navigateTo({
					url:'/pages/index/action/action?pushId='+e
				})
			},
			setSaveShareInfo(){
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
					pushId:this.pusCardLists.id,
					shareUserId:uni.getStorageSync('id'),
				},true
				   ).then(res => {
					   console.log(res)
					   })
			},
			goUser(e){
				if(!this.hasLogin){
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				uni.navigateTo({
					url:'../../selfCenter/selfView?userId='+e
				})
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
			goSteps(){
				
				uni.navigateTo({
					url: '../../selfCenter/clockIn?pushId='+this.pusCardLists.id
				});
			},
			 goPageImg(e,index){
				this.xdUniUtils.xd_showImg(e,index);
			},
			// error: function() {
			// 	this.audioPlaySrc=this.xdUniUtils.xd_randomImg();
			//             }  ,
			
			getshowCardComment(){
				this.xd_request_post(this.xdServerUrls.xd_showCardComment,{
					cardId:this.cardId,
				},true).then(res=>{	
					var data=res.obj;
					var imgs=[];
					if(data.pushCard.pictures!=''){
						imgs=data.pushCard.pictures.split(",");
						data.pushCard.pictures=imgs;
					}else{
						data.pushCard.pictures=[];
					}
					
					this.showCardCommentlist=data
					
				})
			},
			userRepaly(e,indexs){
				if(e.userId==this.id){
					uni.showToast({
						title:'无法回复自己',
						 duration: 1000,
						 icon:'none',
					})
					return false;
				}
				this.commentId=e.id;
				this.showInput=true;
				// this.indexId=indexs.pushCard.id;
				this.userId=e.userId,
				this.dataCardId=e.cardId;
				this.inputType=1;
				this.conmmmenttext='回复：'+e.userName
			},
			inputComent(e){	
				console.log(e)
				if(!this.hasLogin){
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				if(e.detail.value.conten==undefined||e.detail.value.conten==''){
					uni.showToast({
						title: '评论内容不能为空',
						mask: true,
						duration: 2000,
						icon: 'none'
					});
					return false
				}
				this.xdUniUtils.xd_request_text({content:e.detail.value}).then(res=>{
					if(res.obj.errcode==0){
						if(this.inputType==1){
							this.xd_request_post(this.xdServerUrls.xd_saveCardReplayComment,{
								replayUserId:this.userId,
								commentId:this.commentId,
								cardId:this.dataCardId,
								userId:this.id,
								content:e.detail.value.conten,
							},true).then(res=>{
							
								this.showInput=false;
								this.value=false;
								if (res.resultCode == 0) {
									var data=res.obj;
									this.showCardCommentlist=data
								}
							})
								
						}else if(this.inputType==2){
								this.xd_request_post(this.xdServerUrls.xd_saveCardComment,{
									cardId:this.dataCardId?this.dataCardId:this.cardId,
									userId:this.id,
									content:e.detail.value.conten,
								},true).then(res=>{
									
									this.showInput=false;
									this.value=false;
									/* uni.redirectTo({
										url:'../cardDetails/cardDetails?pushId='+this.pushId+'&cardId='+this.cardId+'&show=0'
									}) */
									 if (res.resultCode == 0) {
										var data=res.obj;
										this.showCardCommentlist=data
									} 
									
						    })
						}
					}else{
						uni.showToast({
							title: '内容包含敏感内容',
							mask:true,
							duration: 2000,
							
						});
						return false
					}
					})
			
			},
			inputshowvue(e){
			this.value=true;	
			},
			showInputComent(){
				if(!this.hasLogin){
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				this.showInput=!this.showInput;
				this.inputType=2;
				this.conmmmenttext='说些什么...'
			},
			getpushList(){
				this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId,{
					pushId:this.pushId,
					token:uni.getStorageSync('token')
				},true).then(res=>{	
					var data =res.obj;
					data.pushCardList[0].address = this.xdUniUtils.IsNullOrEmpty(data.pushCardList[0].address)?"":data.pushCardList[0].address;
					// console.log("getpushList");
					// console.log(data);
					data.challengeRmb=res.obj.challengeRmb/100;
					var time=this.xdUniUtils.xd_timestampToTime(res.obj.createTime,false,false,true);
					data.createTime=time;
					data.pictures=res.obj.pictures.split(',')
					// data.pictures=["https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187819589.png",
					// "https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187851035.png",
					// "https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187868290.png",
					// "https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187888025.png",
					// ];
					this.pusCardLists=data;
					
					data.pushCardList.reverse().forEach((item,index)=>{
						if(item.id==this.cardId){
							this.pushCardCreateTime=this.xdUniUtils.xd_timestampToTime(item.createTime,false,true,false)
							this.dakacishu = index+1
							
						}
					})
					if(data.userId == uni.getStorageSync('id')){
						this.guanzhu =''
					}else{
						this.xd_request_post(this.xdServerUrls.xd_iSAttention,{
							userId:uni.getStorageSync('id'),
							attentionUserId:data.userId,
						},true)
						.then(res=>{
							if(res.obj){
								this.guanzhu ='已关注'
							}else{
								this.guanzhu ='关注'
							}
							
						})
					}
					// if(typeof data.pushCardList !== undefined){
					// 	data.pushCardList.forEach(item =>{
					// 		if(this.cardId == item.id){
					// 			this.dakacishu = item.cardIndex
					// 		}
					// 	});
					// 	if(this.dakacishu == 0){
					// 		//兼容之前的数据
					// 		this.dakacishu = this.pusCardLists.pushCardCishuCount
					// 	}
					// }
					this.getshare()
				})
			},
			strToArr(res){
				var dataList=res;
				for(var i=0;i <res.length;i++){
					if(res[i].pushCard.pictures){
						 dataList[i].pushCard.pictures=res[i].pushCard.pictures.split(",")
					}
				}
				
				return dataList;
			},
			tags(){
				if(this.guanzhu =='已关注'){
					this.xd_request_post(this.xdServerUrls.xd_cancelAttention,{
						userId:uni.getStorageSync('id'),
						attentionUserId:this.pusCardLists.userId,		
						
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
				this.xd_request_post(this.xdServerUrls.xd_saveAttention,{
					userId:uni.getStorageSync('id'),
					attentionUserId:this.pusCardLists.userId,		
					
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
			
		}
	}
</script>

<style  scoped lang="scss">
	.imgheit{
		width: 150upx;
		height: 80upx;
	}
	.textheit{
		width: 80%;
		overflow: hidden;
		text-overflow:ellipsis;
		-webkit-box-orient:vertical;
		-webkit-line-clamp:2; ; 
	}
	.cu-barbox{
		position: fixed;
		display: flex;
		-webkit-box-align: center;
		-webkit-align-items: center;
		align-items: center;
		min-height: 100rpx;
		-webkit-box-pack: justify;
		-webkit-justify-content: space-between;
		justify-content: space-between;
		bottom: 0;
		background-color: #FFFFFF;
		width: 100%;
		padding: 0 20upx 0 20upx;

	}
	.margincardlist{
		margin-top: 10upx;
	}
	.commenttext{
		
	}
	.bg-light-blue{background-color: #007AFF;}
	.videoheit{
		width: 100%;
		height: 360upx;
	}
	.thanktext{
		float: right;
	}

	.textplo{
		color: #007AFF;
	}
	.dakacishu{
		width: 20%;
	}
	.dakacishus{
		width: 30%;
	}
	.tagcss{
		top:12upx;
		right: 50upx;
	}
	.cu-btns{
		// position: static;
		background-color: #FFFFFF;
		padding-left: 1upx;
		padding-right: 1upx;
		line-height: 1.1;

	}
	button::after{
		
		border:none;
	}
	.adcus{
		padding-bottom: 105upx;
	}
	.underconten{
		height: 300upx;
		.underconten-a{
			text-align: center;
			padding-top: 10%;
		}
		.undercontenbutton{
			margin-left: 40%;
			width: 20%;
		}
	}
	.cur{
	padding-bottom: 18upx;
	 border-bottom: 4rpx solid;
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
	.textarea-text{
		    background-color: #f5f5f5;
		    height: 64rpx;
		    font-size: 28rpx;
		    color: #333333;
		    display: -webkit-box;
		    display: -webkit-flex;
		    display: flex;
		    -webkit-box-align: center;
		    -webkit-align-items: center;
		    align-items: center;
		    margin: 0 20rpx;
		   width: 54%;
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
	
</style>
