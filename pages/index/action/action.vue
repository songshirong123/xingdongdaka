<template>
	<view >
	<view class="content">
		
		<view class="xd-info-main">				
			<view class="xd-list xd-border-b-black">
				<view class="xd-list-items">
					<view class="xd-list-image xd-relative">
						<image class="xd-list-image" v-if="pushList.pictures!=''" :src="pushList.pictures" mode="aspectFill" @tap="goPageImg(pushList.pictures)"></image>
						<image class="xd-list-image" v-else :src="audioPlaySrc" @error="error" @tap="goPageImg(audioPlaySrc)"></image>
						<view class="xd-list-head">
							<image class="xd-list-head-img" :src="pushList.userHead" mode="aspectFill" @tap="goUser(pushList.userId)"></image>
						</view>
					</view>
					<view class="xd-list-body">
						<view class="xd-list-title">
								<text class="xd-list-title-text userName" @tap="goUser(pushList.userId)">{{pushList.userName}}</text>
								<view class="xd-tags" v-show="userId!=pushList.userId" @tap="tags">关注</view>
								
						</view>
						<view class="xd-list-desc xd-ellipsis-line2">{{pushList.content}}</view>
					</view>
				</view>
				
				<view class="xd-grids xd-flex-center">
					<!-- <view class="xd-grids-items sponsor-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">赞助</view>
							<view class="xd-badge">{{pushList.giveReward}}</view>
						</view>
					</view> -->
					<view class="xd-grids-items bond-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">保证金<text class="xd-tbr-txt-bold">￥{{pushList.challengeRmb}}</text></view>
						</view>
					</view>
					<view class="xd-grids-items supervise-grids">
						<view class="xd-relative">
							<!-- <view class="xd-tbr-large">邀请围观</view> -->
							<!-- <button class="xd-tbr-large buttclass" type="default" open-type="share">邀请围观</button> -->
							<button class="xd-tbr-large buttclass" v-if="pushList.userId==userId || pushList.onlooker "  :id="index" open-type="share" >邀请围观</button>
							<button class="xd-tbr-large buttclass" v-else-if="pushList.userId!=userId && !pushList.onlooker&&pushList.challengeRmb<=0"  @tap="lookerClick(pushList,index)">围观</button>
							<button class="xd-tbr-large buttclass" v-else  @tap="lookerClick(pushList,index)">围观分钱</button>
							<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">{{pushList.lookerCount}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- flag -->
		<view class="flag-info">
			<view class="flag-box top">
				<view class="xd-list-title xd-border-b-black">
					<text class="xd-list-title-text">阶段期限</text>
					<text class="xd-list-desc">{{pushList.createTime }} - {{ pushList.endTime}}</text>
				</view>
				<view class="xd-list-title">
					<view class="list-title-row xd-rows">
						<text class="xd-list-title-text">坚持天数</text>
						<text class="xd-list-desc">{{pushList.pushCardCount}}/{{pushList.targetDay}}</text>
					</view>
					<view class="list-title-row xd-rows">
						<text class="xd-list-title-text">休假天数</text>
						<text class="xd-list-desc">{{pushList.holidayDay}}</text>
					</view>
				</view>
			</view>
			<view class="flag-box bottom xd-border-b-black">
				<view class="xd-list-title">
					<text class="xd-list-title-text">动机目标：</text>
					<text class="xd-list-desc extendContenttext">{{pushList.extendContent}}</text>
				</view>
				<view class="xd-list-title">
					<text class="xd-list-title-text">打卡方式：</text>
					<text class="xd-list-desc">{{pushList.punchCardWay}}</text>
				</view>
			</view>
		</view>
		<!-- 打卡列表 -->
		<view class="xd-body">
			<view class="pageNav xd-rows xd-border-b-black">
				<view :class="['navbar', active == 0 ? 'active' : '']" @tap="cardFn">打卡</view>
				<view :class="['navbar', active == 1 ? 'active' : '']" @tap="detailFn">详情</view>
				<view :class="['navbar', active == 2 ? 'active' : '']" @tap="lookFn" v-if="userId==pushList.userId">围观的人</view>
				<view :class="['navbar', active == 2 ? 'active' : '']" @tap="lookFn" v-else>围观TA的人</view>
			</view>
			<!-- 打卡 -->
			<view class="xd-list-info" v-if="active==0">
				<!-- 循环 xd-list -->
				<view class="xd-list xd-border-b-black" v-for="(list,index) in pusCardList" :key="index" >
					<view class="xd-list-items">
						<view class="xd-comments-image xd_card_imgs">
							<image :src="list.pictures[0]" class="xd-comments-img" v-if="list.pictures!=''" mode="aspectFill"  @tap="goPageImg(list.pictures)"></image>
							<image class="xd-comments-img" v-else :src="audioPlaySrc" @error="error" @tap="goPageImg(audioPlaySrc)"></image>
						</view>
						<view class="xd-list-body"  @tap="gocardComentList(list)">
							<view class="xd-list-body-desc">{{list.createTime}}</view>
							<view class="xd-list-desc xd-ellipsis-line2">{{list.content}}</view>
						</view>
						<view class="xd-grids-items comment-grids">
							<view class="xd-relative" >
								<image class="xd-grids-icon-img-comment comentimg" src="../../../static/images/icon/comment.png" mode="widthFix" @tap="cardComentList(list)"></image>
								<view class="xd-badge" >{{list.commentCount}}</view>
							</view>
						</view>
					</view>
					<!-- <view class="xd-grids">
						<view class="xd-grids-items comment-grids">
							<view class="xd-relative">
								<image class="xd-grids-icon-img-comment" src="../../../static/images/icon/comment.png" mode="widthFix"></image>
								<view class="xd-badge">23</view>
							</view>
						</view>
						<view class="xd-grids-items love-grids">
							<view class="xd-relative">
								<image class="xd-grids-icon-img-love" src="../../../static/images/icon/love.png" mode="widthFix"></image>
								<view class="xd-badge">32</view>
							</view>
						</view>
					</view> -->
				</view>
			</view>
			
			<!-- 详情 -->
			<view class="xd-list-info" v-else-if="active==1">
				<view class="xd-list-extendContent">
					<text class="xd-list-extendContentText">{{pushList.extendContent}}</text>
				</view>
			</view>
			<!-- 围观的人 -->
			<view class="xd-list-info" v-else-if="active==2">
				<view class="actionLook" >
					<block v-for="(attention, index) in lookerList" :key="index" >
						<view class="actionLi" >
							<view class="ali-main">
								<view class="ali-main-img">
									<image class='xd-mag xd-box-shadow' :src="attention.userHead"></image>
								</view>
								<view class="lli-main-content xd-list-body ">
									<view class="xd-list-title-text">
										<text>{{attention.userName}}</text>
									</view>
									<view  >
										<text v-if="attention.sex==1" class="boy">♂</text>
										<text v-else-if="attention.sex==0" class="gender">♀</text>
										<text v-else class="boy">密</text>
										<!-- <text>20</text> -->
									</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view>
		</view>
		
		<view style="height: 10upx;"></view>
		<view class="btn_bar" v-if="userId==pushList.userId">
			<view class="btns" v-if="pushList.pushCardCount<pushList.targetDay"><button class="btn" @click="goSteps">立即打卡</button></view>
		</view>
		<!-- 底部 -->
		<view class="footer">
			
			<view class="xd-grids xd-space-between xd-flex-v-center" >
				<view class="xd-grids-items comment-grids" @tap='openAddr'>
					<view class="xd-relative">
						<image class="xd-grids-icon-img" src="../../../static/images/icon/comment.png" mode="widthFix"></image>
						<view class="xd-badge">0</view>
					</view>
				</view>
				<view class="xd-grids-items love-grids" >
					<!-- <view class="xd-relative" v-show="!list.currentUserGiveLike">
						<image class="xd-grids-icon-img-love" src="../../../static/images/icon/love.png" mode="widthFix"></image>
						<view class="xd-badge">{{pushList.giveLike}}</view>
					</view> -->
					
					<view class="xd-relative" v-show="!pushList.currentUserGiveLike">
						  <image class="xd-grids-icon-img-love" src="../../../static/images/icon/love.png" mode="widthFix" @tap="loveClick" ></image>
						  <view class="xd-badge">0</view>
					</view>
					<view class="xd-relative" v-show="pushList.currentUserGiveLike">
						  <image class="xd-grids-icon-img-love" src="../../../static/images/icon/love-on.png" mode="widthFix" @tap="loveClick"></image>
						  <view class="xd-badge">0</view>
					</view>
				</view>
				<view class="xd-grids-items collect-grids">
					<view class="xd-relative">
						<image class="xd-grids-icon-img" src="../../../static/images/icon/collect.png" mode="widthFix"></image>
						<view class="xd-badge">0</view>
					</view>
				</view>
				<view class="xd-grids-items share-grids">
					<view class="xd-relative">
						<button  class="butShare" open-type="share" >
						  <image class="xd-grids-icon-img" src="../../../static/images/icon/share.png" mode="widthFix"  ></image>
						</button>
						<view class="xd-badge">0</view>
					</view>
				</view>
				<!-- <view class="xd-grids-items reward-grids">
					<view class="xd-relative">
						<view class="xd-tbr-large">打赏</view>
						<view class="xd-badge">0</view>
					</view>
				</view> -->
				<view class="xd-grids-items action-grids" @tap="goStep">
					<view class="xd-relative">
						<view class="xd-tbr-large" @tap="goStep">一起行动</view>
						<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">0</view>
					</view>
				</view>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				active: 0,
				pushComentList:[],
				pusCardList:[],
				pushList:{},
				modal: false,
				addrAnimation:'',
				audioPlaySrc:'../../../static/images/icon/img/titl.png',
				userId:uni.getStorageSync('id'),
				share:'',
				lookerList:[],
				pushId:'',
				isShare:0,
				
			};
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onLoad(option) {			
			if(option.pushList==undefined){
				this.pushId=option.pushId;
				if(option.share!=undefined){
					this.share=option.share;
					this.isShare=1;
				}
				this.getpushList();
			}
		},
		onShow() {	
		this.clickSaveShareInfo();
		},
		onShareAppMessage(res) {
			let that = this;
			if(that.pusCardList.length>0){
				that.setSaveShareInfo();
				return {
					title: that.pusCardList[0].content,
					path: '/pages/index/action/action?pushId='+ that.pushList.id+'&share='+userId,
					imageUrl:that.pusCardList[0].pictures[0]?that.pusCardList[0].pictures[0]:'../../../static/images/icon/img/title1.png',
				}
				
			}else{
				that.setSaveShareInfo();
				return {
					title: that.pushList.content,
					path: '/pages/index/action/action?pushId='+ that.pushList.id+'&share='+userId,
					imageUrl:that.pushList.pictures?that.pushList.pictures:'../../../static/images/icon/img/title1.png',
				}
				
			}
			
					
		},
		methods:{
			isOpen(){
				
			},
			setSaveShareInfo(){
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
					pushId:this.pushId,
					shareUserId:this.userId,
				},true
				   ).then(res => {
					   console.log(res)
					   })
			},
			clickSaveShareInfo(){
				if(this.share!=''){
					this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
						pushId:this.pushId,
						shareUserId:this.share,
						clickUserId:this.userId,
					},true
					   ).then(res => {
						   console.log(res)
						   })
				}
			},
			getShareInfo(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../../login/login' 
					});
					return false;
				}
				if(this.share==''||this.share==undefined){
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_saveShareInfo,{
					pushId:this.pushId,
					shareUserId:this.share,
					clickUserId:this.userId,
				},true
				   ).then(res => {
					   console.log(res)
					   })
			},
			goUser(e){
				
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../../login/login' 
					});
					return false;
				}
				uni.navigateTo({
					url:'../../selfCenter/selfView?userId='+e
				})
			},
			//围观
			lookerClick:function(list,index){
				var that=this ;
				if(!that.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				that.userId=uni.getStorageSync('id');
				that.xd_request_post(that.xdServerUrls.xd_saveLooker,{
					
					pushId:list.id,
					lookUserId:that.userId,
				},true
				   ).then(res => {	
				
						   if(res.resultCode==0){
							   that.pushList.onlooker=true
							   that.pushList.lookerCount++;
							   uni.showToast({
								title:'围观成功',
								 duration: 1000,
								 icon:'none',
							   })
						   }else if(res.resultCode==10015){
							   uni.showToast({
								title:'您已经围观了',
								 duration: 1000,
								 icon:'none',
							   })
						   }
						   
					
				})
			},
			goSteps(){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../../login/login' 
					});
					return false;
				}
				uni.navigateTo({
					url: '../../selfCenter/clockIn?pushId='+this.pushList.id
				});
			},
			goPageImg(e){
				uni.navigateTo({	
					url:'../../img/img?url='+encodeURIComponent(JSON.stringify(e))
				})
			},
			error: function() {
				var num=Math.floor(Math.random()*8+1);
				
				this.audioPlaySrc='../../../static/images/icon/img/title'+num+'.png'
				
			            }  ,
						
			// goComent(){
			// 	uni.navigateTo({
			// 		url: '../cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(this.pushList))
			// 	});
			// },
			gocardComentList(e){
				this.pushList.pushCardList[0].id=e.id;
				this.pushList.pushCardList[0].userId=e.userId;
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(this.pushList))
				});
			},
			cardComentList(e){			
				var data=[];
				data.push(e);
				this.pushList.pushCardList[0].id=e.id;
				this.pushList.pushCardList[0].userId=e.userId;
				var pushCard={
					pushList:this.pushList,
					pushCardList:data,
				};
				uni.navigateTo({
					url: '../cardDetails/cardDetails?pushCard='+encodeURIComponent(JSON.stringify(pushCard))
				});
			},
			loveClick:function(e,index){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_saveGiveLikeByPush,{
					
					pushId:this.pushList.id,
					initiatorUserId:uni.getStorageSync('id'),
					giveLikeUserId:this.pushList.userId,
					token:uni.getStorageSync('token'),
				},false
				   ).then(res => {		
						   if(!this.pushList.currentUserGiveLike){								   
												this.pushList.currentUserGiveLike=true;
												this.pushList.giveLike++;
						   }else{
						   uni.showToast({
														title:'已经赞过了',
														 duration: 1000,
														 icon:'none',
						   })}
					  }).catch(err => {
					  						   if(err=='操作失败'){
					  							   uni.showToast({
					  								title:'已经赞过了',
					  								 duration: 1000,
					  								 icon:'none',
					  							   })
					  						   }
					
				})
				
				
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
			  getpushList(){
			  	this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId,{
			  		pushId:this.pushId,
					isShare:this.isShare,
			  		token:uni.getStorageSync('token')
			  	},true).then(res=>{	
					if(res.resultCode==0){
						var data=res.obj;
						data.createTime=this.xdUniUtils.xd_timestampToTime(res.obj.createTime,false,false,true)
						data.challengeRmb=res.obj.challengeRmb/100;
						this.endTime(data);
						this.getPushCardList();
						if(this.share!=''){
							this.getShareInfo();
						}
					}else{
						uni.showToast({
							title:res.msg,
							icon:'none',
						})
					}
					
			  	})
			  },
			endTime(pushdata){
				console.log(pushdata)
				var da={id:'1'};
				var pushListdata=pushdata
				pushListdata['endTime']=0;
				pushListdata.endTime=this.xdUniUtils.xd_daysAddSub(pushListdata.createTime,pushListdata.targetDay);
				pushListdata.pushCardList.push(da)
				this.pushList=pushListdata
				
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
					
					
					this.pushComentList=this.timeStamp(res);
				})
			},
			getPushCardList(){
				this.xd_request_post(this.xdServerUrls.xd_pushCardListByPushId,{
					pushId:this.pushId,		
					
				},true).then(res=>{
					var data=res.obj.list;
					for(let i=0;i<res.obj.list.length;i++){
						data[i].pictures=res.obj.list[i].pictures.split(',')
					}
					this.pusCardList=data;
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
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../../login/login' 
					});
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_saveAttention,{
					userId:uni.getStorageSync('id'),
					attentionUserId:this.pushList.userId,		
					
				},false).then(res=>{
					
					uni.showToast({
						icon:'none',
					  title: res.msg,
					})
				})
			},
			getLookerList(){
				this.xd_request_post(this.xdServerUrls.xd_getLookerByPushId,{
					pushId:this.pushId,
					pageNum:1,
					pageSize:10,
				},true)
				.then(res=>{
					
					this.lookerList=res.obj.list;
					this.lookTotal=res.obj.total
				})
			},
		}
	}
	
</script>

<style>
	page{background: #fcfcfc;}
</style>
<style scoped lang="scss">
	.xd-info-main{
		width: 100%; box-sizing: border-box;
		.xd-list{
			width: 100%; box-sizing: border-box;
			padding: 30upx 30upx 0 30upx;
			
			.xd-list-head{
				position: absolute; top: -24rpx; right: -28rpx; z-index: 9;
			}
			.xd-list-title .xd-tags{
				border: 1px solid #ffa700; border-radius:6upx; 
				height: 40upx; line-height: 40upx; padding-top: 0; padding-bottom: 0;
				color: #101010; font-size:30upx; 
				margin-top: -4upx; margin-left: 28upx;
			}
			.xd-list-desc{
				padding-top: 10upx;
			}
			
			.xd-grids{
				.xd-grids-items{
					width: auto; margin:20upx 26upx 0 26upx;
				}
				
				.xd-grids-items.sponsor-grids{
					.xd-tbr-large{
						background: #ffe66f; color: #101010;
					}
				}
				.xd-grids-items.bond-grids{
					.xd-tbr-large{
						background: #f9ebe5; color: #e17175;
						.xd-tbr-txt-bold{
							color: #ea030b;
						}
					}
				}
				.xd-grids-items.supervise-grids{
					.xd-tbr-large{
						background: #f9ebe5; color: #e17175;
					}
				}
			}
		}
	}
	
	.flag-info{
		width: 100%; box-sizing: border-box; margin-top: 20upx;
		border-top-right-radius: 10upx; border-top-left-radius: 10upx;
		
		.top{
			background: #f4f5f7; 
			width: 100%;  box-sizing: border-box; 
			padding: 0 30upx;
			border: 1px solid #dbdcde; border-radius: 10upx; 
			
			.xd-list-title{padding: 10upx 0;}
			.list-title-row{
				width: 50%;
			}
			.xd-list-title-text{
				font-weight: normal; color:#888888; margin-right: 20upx;
			}
			.xd-list-desc{
				line-height: 40upx; font-size:30upx;
			}
		}
		.bottom{
			width: 100%;  box-sizing: border-box;
			padding: 0 30upx;
			.xd-list-title{padding: 10upx 0;}
			.xd-list-title-text{
				font-weight: normal; color:#575b5e; 
			}
		}
	}
	
	.xd-body{
		width: 100%; box-sizing: border-box; padding-bottom: 86upx;
		.pageNav{
			padding: 20upx 0; background: #ffffff;font-size: 28upx;
			.navbar{
				margin: 0 80upx;  line-height: 44upx;
				border-bottom: 3px solid #ffffff;
			}
			.navbar.active{
				border-color:#fd5107; font-weight:bold; color:#fd5107;
			}
		}
		
		.xd-list-info{
			.xd-list{
				width: 100%; box-sizing: border-box;
				padding: 0 30upx; margin-top: 18upx;
				.xd-list-body{
					margin-left: 20upx;
					.xd-list-body-desc{
						padding-bottom: 10upx;
					}
				}
				.xd-grids{
					.xd-grids-items{
						width: auto; margin:20upx 26upx 0 26upx;
						.xd-grids-icon-img-comment{
							width: 50upx; height:50upx
						}
						.xd-grids-icon-img-love{
							width: 40upx; height:40upx
						}
					}
				}
			}
			
		}
	}
	
	.footer{
		background: #f8f8f8;
		padding: 0 40upx 0 20upx; width: 100%; box-sizing: border-box;
		position: fixed; bottom: 0; left: 0; z-index: 99;
		
		.xd-grids{
			.xd-grids-items{
				width: auto;
			}
			.xd-grids-items.reward-grids{
				.xd-tbr-large{
					color: #101010; font-size:30upx;
				}
			}
			.xd-grids-items.action-grids{
				.xd-tbr-large{
					
					background: #ffe66f;
					color: #101010;
					border:1px solid #ffa700;
				}
			}
		}
		
	}
	.buttclass{
		height: 40upx;
		margin-top: 5upx;
		font-size: 28upx;
}
	button::after {
		  border: none;
		}
		.butShare{
			height: 70upx;
			width: 90upx;
		}
		.love-click{
			width: 50upx;
			height:50upx ;
		}
		.love-click-num{
			position: absolute;
			font-size: 22rpx;
			margin-left: 37%;
			margin-top: -20rpx;
		}
		.text-coment-content{
			padding-left: 10rpx;
			display: flex;
			align-items: flex-end;

		}
		
		.comentimg{
			width: 60upx;
			height: 50upx;
		}
		.xd_card_imgs{
			height: auto;
		}
		.xd-list-extendContentText{
			font-size: 28upx;
			color: #101010;
		}
		.xd-list-extendContent{
			margin-left: 25upx;
			margin-right: 10upx;
			text-indent: 55upx;

		}
		.userName{
			margin-top: -10upx;
		}
		.btn_bar{
			position: fixed;
			bottom: 0;
			left:0;
			width: 100%;
			.btns {
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 200rpx;
				font-size: 28rpx;
				margin-top: -170rpx;

				.btn {
					flex: 1;
					height: 64rpx;
					line-height: 64rpx;
					background: #ffa700;
					// color: #fff;
					font-size: 28rpx;
					border-radius: 40rpx;
		
				}
			}
			}
			.extendContenttext{
				width: 78%;
			}
			.actionLi{
					padding-top: 20rpx;
					border-bottom: 1upx solid #ffa700;
					.ali-main{
						display: flex;
						}
						.xd-mag{
							height: 125rpx;
							width: 125rpx;
						}
					}
				.boy{
					background:#66CCFF;
					color:#fff;
					display: inline-block;
					padding:0 6rpx;
					border-radius: 100%;
					font-size: 22rpx;
					margin-right: 2rpx;
				}
				.actionLook{
					padding-left: 30upx;
					width: 96%;
				}
</style>
