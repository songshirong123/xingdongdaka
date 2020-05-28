<template>
	<view class="content">
		
		<view class="cardDetails">
			<!-- 顶部个人信息 -->
			<view class="xd-list">
				<view class="xd-list-items">
					<view class="xd-list-image">
						<image class="xd-list-image" v-if="pusCardLists.pictures!=''" :src="pusCardLists.pictures" mode="aspectFill"  @tap="goPageImg(pusCardLists.pictures)"></image>
						<image class="xd-list-image" v-else :src="audioPlaySrc" @error="error" @tap="goPageImg(audioPlaySrc)"></image>
					</view>
					<view class="xd-list-body">
						<view class="xd-list-title-text xd-ellipsis-line2">{{pusCardLists.content}}</view>
					</view>		
				</view>
				<view class="xd-grids xd-flex-center">
					<!-- <view class="xd-grids-items sponsor-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">赞助</view>
							<view class="xd-badge">0</view>
						</view>
					</view> -->
					<view class="xd-grids-items bond-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">保证金<text class="xd-tbr-txt-bold">￥{{pusCardLists.challengeRmb}}</text></view>
						</view>
					</view>
					<view class="xd-grids-items supervise-grids">
						<view class="xd-relative">
							<button class="xd-tbr-large buttclass" type="default" open-type="share">邀请围观</button>
							<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">0</view>
						</view>
					</view>
				</view>
			</view>
			<view class="xd-line"></view>
			
			<!-- 打卡列表 -->
			<view class="card-list xd-comments" >
				<block v-for="(item, indexs) in cardList" :key="indexs" >	
					<view class="xd-comments-cardList" :id="'index'+item.pushCard.id" >
						<view class="xd-list-head heradImg">
							<image class="xd-comments-face" :src="pusCardLists.userHead" ></image>
							<view class="xd-list-title heradImgName">
								<text class="xd-list-title-text">{{pusCardLists.userName}}</text>
							</view>
						</view>
					<view class="cardList-image" >
							<block v-for="(pictures, index) in item.pushCard.pictures" :key="index" v-if="item.pushCard.pictures"  >	
								<image :src="pictures" class="xd-comments-img imgs" mode="aspectFill" @tap="goPageImg(item.pushCard.pictures)"></image>
							</block>
							<!-- <image :src="item.pushCard.pictures" class="xd-comments-img imgs" mode="aspectFill" v-show="item.pushCard.pictures.length!=0" @tap="goPageImg(item.pushCard.pictures)"></image> -->
						</view>
						<view class="cardList-text" >
							<text class="xd-content">{{item.pushCard.content}}</text>
						</view>
						<!-- <view class="cardList-time" >
							<text>{{pusCardLists.extendContent}}</text>
						</view> -->
					</view>
					<!-- 循环card-list-item 为一条打卡记录 -->
					<view class="card-list-item xd-border-b-color">
						<view class="xd-comments-items" v-for="(list,index) in item.pushCommentList" :key="index" v-show="item.pushCommentList.length>0"> 
							<image :src="list.userHead" class="xd-comments-face"></image>
							<view class="xd-comments-body">
								<view class="xd-comments-header">
									<text class="xd-comments-header-name">{{list.userName}}</text>
									<text class="xd-comments-header-text">{{list.createTimeStr}}</text>
								</view>
								<view class="xd-comments-info-text">{{list.content}}</view>
								<view class="xd-comments-key xd-border-b-black">
									<image src="../../../static/images/icon/address.png"></image>
									<text class="xd-comments-key-text comenttext"  @tap="userRepaly(list,indexs,index)">回复:</text>
									<!-- <text class="xd-comments-key-text" v-else>#：</text> -->
								</view>
								<!-- 评论 -->
								<view class="xd-fri-comments" v-show="list.cardReplayCommentList.length>0">
									<view class="xd-comments-items" v-for="(lists,index) in list.cardReplayCommentList" :key="index">
										<!-- <image src="../../../static/images/pic/Scar.jpg" class="xd-comments-face"></image> -->
										<view class="xd-comments-body">
											<view class="xd-comments-header">
												<text class="xd-comments-header-name commentsText" >{{lists.userName}}-回复:{{pusCardLists.userName}}</text>
												<text class="xd-comments-header-text">{{lists.createTimeStr}}</text>
											</view>
											<view class="xd-comments-info-text">{{lists.content}}</view>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 功能列表 -->
						<view class="xd-grids xd-space-between xd-flex-v-center">
							<view class="xd-grids-items comment-grids">
								<view class="xd-relative">
									<image class="xd-grids-icon-img" src="../../../static/images/icon/comment.png" mode="widthFix" @tap="showInputComent(item,indexs)"></image>
									<view class="xd-badge">0</view>
								</view>
							</view>
							<view class="xd-grids-items love-grids">
								<!-- <view class="xd-relative" v-show="!pushList.currentUserGiveLike">
									  <image class="xd-grids-icon-img-love" src="../../../static/images/icon/love.png" mode="widthFix" @tap="loveClick" ></image>
									  <view class="xd-badge">{{pushList.giveLike}}</view>
								</view> -->
								<view class="xd-relative" v-show="!pusCardLists.currentUserGiveLike">
									  <image class="xd-grids-icon-img-love" src="../../../static/images/icon/love.png" mode="widthFix" @tap="loveClick" ></image>
									  <view class="xd-badge">{{pusCardLists.giveLike}}</view>
								</view>
								<view class="xd-relative" v-show="pusCardLists.currentUserGiveLike">
									  <image class="xd-grids-icon-img-love" src="../../../static/images/icon/love-on.png" mode="widthFix" @tap="loveClick"></image>
									  <view class="xd-badge">{{pusCardLists.giveLike}}</view>
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
									<!-- <image class="xd-grids-icon-img" src="../../../static/images/icon/share.png" mode="widthFix"></image> -->
									<view class="xd-badge">0</view>
								</view>
							</view>
							<!-- <view class="xd-grids-items reward-grids">
								<view class="xd-relative">
									<view class="xd-tbr-large">打赏</view>
									<view class="xd-badge">0</view>
								</view>
							</view> -->
							<view class="xd-grids-items action-grids">
								<view class="xd-relative" @tap="goStep">
									<view class="xd-tbr-large">一起行动</view>
									<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">0</view>
								</view>
							</view>
						</view><!-- 功能列表end -->
						<view class="comentInput">
							<input  v-show="showInput&&indexs==indexId" :value='value' placeholder="请输入评论内容"  adjust-position='false' auto-height='true' hold-keyboard='true' @confirm='inputComent' confirm-type="done" :focus="showInput"/>
						</view>
					</view><!-- card-list-item end -->		
				</block>
			</view>
			<view class="btn_bar" v-if="id==pusCardLists.userId">
				<view class="btns"><button class="btn" @click="goSteps">立即打卡</button></view>
			</view>
		</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {
				audioPlaySrc:'../../../static/images/icon/img/ti.png',
				showInput:false,
				pusCardLists:undefined,
				cardList:undefined,
				pushComentList:[],
				value:'',
				id:uni.getStorageSync('id'),
				userId:'',
				inputType:1,//2评论，1回复
				cardId:'',
				dataCardId:'',
				indexId:'',
				pushUserId:'',
				commentId:'',
				pushId:'',
			}
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onReady() {		
			var that=this;
				setTimeout(function(){
					
					uni.createSelectorQuery().in(that).select('#index'+that.cardId).boundingClientRect(data=>{//目标节点
					
					　　uni.createSelectorQuery().select(".card-list").boundingClientRect((res)=>{//最外层盒子节点
					
					　　　　uni.pageScrollTo({
					　　　　　　duration:0,//过渡时间必须为0，uniapp bug，否则运行到手机会报错
					　　　　　　scrollTop:data.top-res.top ,//滚动到实际距离是元素距离顶部的距离减去最外层盒子的滚动距离
					　　　　})
					　　}).exec()
					}).exec(); 
					
							},3000);
		},
		onShareAppMessage(res) {
			let that = this;
			return {
				title: that.pusCardLists.content,
				path: '/pages/index/action/action?pushId='+ that.pusCardLists.id,
				imageUrl:that.pusCardLists.pictures?that.pusCardLists.pictures:'../../static/images/icon/img/title1.png',
			}
					
		},
		onLoad(option) {
			if(option.pushList!=undefined){
				var data=JSON.parse(decodeURIComponent(option.pushList));
				
				if(data.pushId==undefined){
					this.pusCardLists=data;
					this.cardId=data.pushCardList[0].id;
					this.getPushComenList();
				}else{
					this.pushId=data.pushId;
					
					this.getpushList();
				}
			}else if(option.pushCard!=undefined){
				var pusCard=JSON.parse(decodeURIComponent(option.pushCard));
				this.pushUserId=pusCard.pushCardList[0].userId;
				this.cardId=pusCard.pushCardList[0].id;
				this.pusCardLists=pusCard.pushList;
				this.getPushComenList();
				this.showInput=true;
			} 
		},
		methods: {
			goSteps(){
				
				uni.navigateTo({
					url: '../../selfCenter/clockIn?pushId='+this.pusCardLists.id
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
			loveClick:function(e,index){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../../login/login' 
					});
					return false;
				}
				this.xd_request_post(this.xdServerUrls.xd_saveGiveLikeByPush,{
					
					cardId:this.pusCardLists.pusCardList.id,
					initiatorUserId:this.id,
					giveLikeUserId:this.pusCardList.userId,
					token:uni.getStorageSync('token'),
				},true
				   ).then(res => {		
						   if(!this.pusCardList.currentUserGiveLike){								   
												this.pusCardList.currentUserGiveLike=true;
												this.pusCardList.giveLike++;
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
			goStep(){
				uni.navigateTo({
					url: `/pages/action/step1`
				});
			},
			userRepaly(e,indexs,index){
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
				this.indexId=indexs;
				this.userId=e.userId,
				this.dataCardId=e.cardId;
				this.inputType=1;
			},
			inputComent(e){
				
				if(this.inputType==1){
						
						this.xd_request_post(this.xdServerUrls.xd_saveCardReplayComment,{
							replayUserId:this.userId,
							commentId:this.commentId,
							cardId:this.dataCardId,
							userId:this.id,
							content:e.detail.value,
						},true).then(res=>{
						
							// this.showInput=false;
							// this.value='';
							uni.redirectTo({
								url:'../cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(this.pusCardLists))
							})
							// this.getPushComenList();
						})
				}else if(this.inputType==2){	
						this.xd_request_post(this.xdServerUrls.xd_saveCardComment,{
							cardId:this.dataCardId,
							userId:this.id,
							content:e.detail.value,
						},true).then(res=>{
							
							// this.showInput=false;
							// this.value='';
							uni.redirectTo({
								url:'../cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(this.pusCardLists))
							})
							// this.getPushComenList();
						})
					
				}
	
				
			},
			showInputComent(e,indexs){
				
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../../login/login' 
					});
					return false;
				}
				this.dataCardId=e.pushCard.id;
				this.indexId=indexs;
				this.showInput=!this.showInput;
				this.inputType=2;
			},
			getpushList(){
				this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId,{
					pushId:this.pushId,
					token:uni.getStorageSync('token')
				},true).then(res=>{	
					var data =res.obj;
					data.challengeRmb=res.obj.challengeRmb/100;
					this.pusCardLists=data;
					this.getPushComenList();
					
				})
			},
			getPushComenList(){
				this.xd_request_post(this.xdServerUrls.xd_showUserCardCommentAndReplayCommtent,{
					userid:this.pusCardLists.userId,
					pushId:this.pusCardLists.id,
					// token:uni.getStorageSync('token')
				},true).then(res=>{	
					this.cardList=this.strToArr(res.obj);
					
				})
			},
			// getPushCardComenList(){
				
			// 	this.xd_request_post(this.xdServerUrls.xd_showCardComment,{
			// 		cardId:this.pusCardLists.pushCardList.id,
			// 	},true).then(res=>{
			// 		console.log(res)
			// 		this.pushComentList=this.timeStampCard(res);
			// 	})
			// },
			strToArr(res){
				var dataList=res;
				for(var i=0;i <res.length;i++){
					if(res[i].pushCard.pictures){
						 dataList[i].pushCard.pictures=res[i].pushCard.pictures.split(",")
					}
				}
				console.log(dataList)
				return dataList;
			},
			
		}
	}
</script>

<style  scoped lang="scss">
	
		.cardDetails{
			width: 100%; box-sizing: border-box;
			
			.xd-list{
				width: 100%; box-sizing: border-box;
				padding: 20upx 30upx 0 30upx;
				.xd-list-body{
					margin-left: 28upx;
					.xd-list-title-text{font-weight: normal;}
				}
				.xd-grids{
					padding-top: 20upx; padding-bottom: 10upx;
					.xd-grids-items{
						width: auto;
						margin: 0 28upx;
					}
					.xd-grids-items.sponsor-grids{
						.xd-tbr-large{
							background: #ffe66f;
							color: #101010;
						}
					}
					.xd-grids-items.bond-grids{
						.xd-tbr-large{
							background: #f9ebe5;
							color: #e17175;
							.xd-tbr-txt-bold{
								color: #ea030b;
							}
						}
					}
					.xd-grids-items.supervise-grids{
						.xd-tbr-large{
							background: #f9ebe5;
							color: #e17175;
						}
					}
				}
			}
		}
		
		//打卡列表
		.card-list{
			.card-list-item{
				padding-top: 10upx; margin-bottom: 20upx; 
				.xd-comments-items{
					width: 100%;
					box-sizing: border-box;
					padding: 0 100upx;
					
					.xd-comments-image{
						width:285upx; height:207upx; margin:5upx; font-size:0; overflow:hidden;
					}
					.xd-comments-img{
						width:285upx; height:207upx;

					}
					.comenttext{
						color: #55aaff;
						text-decoration:underline;
					}
					.xd-comments-header{
						justify-content: inherit; 
						
						.xd-comments-header-text{
							padding-left: 18upx;
						}
					}
					.xd-comments-key image{
						width: 30upx; height: 30upx;
					}
				
					// 围观者评论
					.xd-fri-comments{
						.xd-comments-items{
							padding: 0;
						}
					}
				}
				// 功能列表
				.xd-grids{
					padding: 30upx 30upx 20upx 30upx;
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
			
		}
		button::after {
			  border: none;
			}
			.butShare{
				height: 70upx;
				width: 90upx;
				background-color: #FFFFFF;
			}
			.xd-comments-cardList{
				width: 100%;
				height: auto;
				display: flex;
				flex-direction: column ;
				padding-top: 20upx;
				padding-left: 50upx;
			}
			.cardList-image{
				margin-left: 20upx;
				margin-left: 60upx;
			}
			.cardList-text{
				font-size: 32upx;
				margin-left: 66upx;
				margin-right: 56rpx;
					
			}
			.cardList-time{
				font-size: 28upx;
				text-indent: 30rpx;

			}
		
	.imgs{
		margin-left: 15upx;
	}
	.comentInput{
		padding-left: 30upx;
	}
	.heradImg{
		display: flex;
		flex-direction: row;
		margin-bottom: 10upx;
	}
	.heradImgName{
		padding-top: 15upx;
		padding-left: 10upx;
	}
	.xd-content{
	font-size: 30rpx;
	word-break: break-all;/*允许在单词内换行*/
	text-align: left;
	color: #323232;
	line-height: 45rpx;
	// text-overflow: -o-ellipsis-lastline;/*css3中webkit内核提供的一个方法类似ellipsis*/
	// overflow: hidden;
	// text-overflow: ellipsis;
	// display: -webkit-box;/*自适应盒子*/
	// -webkit-line-clamp: 2;/*此处为1行,如果是两行就改成2*/
	// -webkit-box-orient: vertical;
	// text-indent:50rpx;
	}
	.buttclass{
			height: 40upx;
			margin-top: 5upx;
			font-size: 28upx;
	}
		button::after {
			  border: none;
			}
			.btn_bar{
				position:fixed ;
				bottom: 0;
				left:0;
				width: 100%;
				.btns {
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
