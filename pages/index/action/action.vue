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
							<image class="xd-list-head-img" :src="pushList.userHead" mode="aspectFill"></image>
						</view>
					</view>
					<view class="xd-list-body">
						<view class="xd-list-title">
								<text class="xd-list-title-text userName">{{pushList.userName}}</text>
								<view class="xd-tags" v-show="userId!=pushList.userId" @tap="tags">关注</view>
								
						</view>
						<view class="xd-list-desc xd-ellipsis-line2">{{pushList.content}}</view>
					</view>
				</view>
				
				<view class="xd-grids xd-flex-center">
					<view class="xd-grids-items sponsor-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">赞助</view>
							<view class="xd-badge">{{pushList.giveReward}}</view>
						</view>
					</view>
					<view class="xd-grids-items bond-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">保证金<text class="xd-tbr-txt-bold">￥{{pushList.challengeRmb}}</text></view>
						</view>
					</view>
					<view class="xd-grids-items supervise-grids">
						<view class="xd-relative">
							<!-- <view class="xd-tbr-large">邀请围观</view> -->
							<button class="xd-tbr-large buttclass" type="default" open-type="share">邀请围观</button>
							<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">{{pushList.onlookerCount}}</view>
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
						<text class="xd-list-desc">{{pushList.targetDay-pushList.holidayDay-pushList.pushCardCount}}/{{pushList.targetDay}}</text>
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
					<text class="xd-list-desc">{{pushList.extendContent}}</text>
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
			</view>
			<!-- 打卡 -->
			<view class="xd-list-info" :hidden="active == 1">
				<!-- 循环 xd-list -->
				<view class="xd-list xd-border-b-black" v-for="(list,index) in pusCardList" :key="index" >
					<view class="xd-list-items" @tap="cardComentList(list)">
						<view class="xd-comments-image xd_card_imgs">
							<image :src="list.pictures[0]" class="xd-comments-img" v-if="list.pictures!=''" mode="aspectFill"  @tap="goPageImg(list.pictures)"></image>
							<image class="xd-comments-img" v-else :src="audioPlaySrc" @error="error" @tap="goPageImg(audioPlaySrc)"></image>
						</view>
						<view class="xd-list-body">
							<view class="xd-list-body-desc">{{list.createTime}}</view>
							<view class="xd-list-desc xd-ellipsis-line2">{{list.content}}</view>
						</view>
						<view class="xd-grids-items comment-grids">
							<view class="xd-relative">
								<image class="xd-grids-icon-img-comment comentimg" src="../../../static/images/icon/comment.png" mode="widthFix"></image>
								<view class="xd-badge">23</view>
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
			<view class="xd-list-info" :hidden="active == 0">
				<view class="xd-list-extendContent">
					<text class="xd-list-extendContentText">{{pushList.extendContent}}</text>
				</view>
			</view>
		</view>
		
		<view style="height: 10upx;"></view>
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
				<view class="xd-grids-items reward-grids">
					<view class="xd-relative">
						<view class="xd-tbr-large">打赏</view>
						<view class="xd-badge">0</view>
					</view>
				</view>
				<view class="xd-grids-items action-grids" @tap="goStep">
					<view class="xd-relative">
						<view class="xd-tbr-large" @tap="goStep">一起行动</view>
						<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">0</view>
					</view>
				</view>
			</view>
		</view>
		<view class="btn_bar" v-if="userId==pushList.userId">
			<view class="btns"><button class="btn" @click="goSteps">立即打卡</button></view>
		</view>
	</view>
	<!-- <view class='xd-list modal-screen' v-show="modal"  >	
		<view class="xd-list xd-border-b-black" v-for="(list,index) in pushComentList" :key="index" >
				<view class="xd-list-push-item" >
					<view class="xd-comments-head">
						<view class="xd-pushcomments-image">
							<image :src="list.userHead" class="xd-pushcomments-img" mode="widthFix"></image>
						</view>
						<view class="xd-list-body-content">
							<view class="xd-list-desc xd-ellipsis-line2">{{list.userName}}</view>
							<view class="xd-list-desc xd-ellipsis-line2">{{list.createTime}}</view>
							<image src="../../../static/images/icon/love.png" class="love-click" mode="widthFix"></image>
							<view class="love-click-num">0</view>
						</view>
					</view>
					<view class="text-coment-content" @tap="goComent">
						<text class="xd-content" >{{list.content}}</text>
						<text  class="xd-content-more">全部评论({{list.replayPushCommentList.length==undefined?'0':list.replayPushCommentList.length}})</text>
					</view>
			</view>
		</view>
	</view> -->
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
				userId:uni.getStorageSync('id')
				
			};
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onLoad(option) {
			console.log(option)
			if(option.pushList==undefined){
				this.pushId=option.pushId;
				console.log(this.pushId)
				this.getpushList();
			}else{
				var pushdata=JSON.parse(decodeURIComponent(option.pushList));
				this.endTime(pushdata);
				this.getPushCardList();
			}
		},
		onShareAppMessage(res) {
			let that = this;
			return {
				title: that.pushList.content,
				path: '/pages/index/action/action?pushId='+ that.pushList.id,
				imageUrl:that.pushList.pictures?that.pushList.pictures:'../../static/images/icon/img/title1.png',
			}
					
		},
		methods:{
			goSteps(){
				uni.navigateTo({
					url: '../../selfCenter/clockIn??pushId='+this.pushList.id
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
			cardComentList(e){
				
				var data=[];
				data.push(e);
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
			  		token:uni.getStorageSync('token')
			  	},true).then(res=>{	
					
			  		this.endTime(res.obj);
			  		this.getPushCardList();
			  		
			  	})
			  },
			endTime(pushdata){
				var pushListdata=pushdata
				pushListdata['endTime']=0;
				
				pushListdata.endTime=this.xdUniUtils.xd_daysAddSub(pushListdata.createTime,pushListdata.targetDay);
				
				this.pushList=pushListdata
				
			},
			goStep(){
				uni.navigateTo({
					url: `/pages/action/step1`
				});
			},
			getPushComenList(){
				this.xd_request_post(this.xdServerUrls.xd_showCommentAndReplayCommtent,{
					pushId:this.pushList.id,
						token:uni.getStorageSync('token')
				},false).then(res=>{
					
					
					this.pushComentList=this.timeStamp(res);
				})
			},
			getPushCardList(){
				this.xd_request_post(this.xdServerUrls.xd_pushCardListByPushId,{
					pushId:this.pushList.id,		
					
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
			tags(){
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
			padding: 20upx 0; background: #ffffff;
			.navbar{
				margin: 0 80upx; font-size: 34upx; line-height: 44upx;
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
		//
		.modal-screen{
		  position:fixed;
		  overflow: auto;
		  width:100%;
		  height:50%;
		  bottom: 90upx;
		  background:#fff;
		  z-index: 1;
		}
		.xd-list-push-item{
			display: flex;
			flex-direction: column;
		}
		.xd-comments-head{
			display: flex;
			justify-content:space-around ;
			align-items: center;
		}
		.xd-pushcomments-image{
			padding-top: 10rpx;
			
		}
		.xd-pushcomments-img{
			height: 60rpx;
			width: 100rpx;
			border-radius: 50%;
		}
		.xd-list-body-content{
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 80%;
	
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
		.xd-content{
			font-size: 30rpx;
			word-break: break-all;/*允许在单词内换行*/
			text-align: left;
			color: #323232;
			line-height: 45rpx;
			text-overflow: -o-ellipsis-lastline;/*css3中webkit内核提供的一个方法类似ellipsis*/
			overflow: hidden;
			text-overflow: ellipsis;
			display: -webkit-box;/*自适应盒子*/
			-webkit-line-clamp: 2;/*此处为1行,如果是两行就改成2*/
			-webkit-box-orient: vertical;
			text-indent:50rpx;
			
		}
		.xd-content-more{
			font-size: 20rpx;
			color: #00aaff;
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
			bottom: 0;
			left:0;
			width: 100%;
			.btns {
				height: 100rpx;
				
				display: flex;
				align-items: center;
				justify-content: space-between;
				padding: 0 200rpx;
				font-size: 28rpx;
				margin-top: 100rpx;

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
</style>
