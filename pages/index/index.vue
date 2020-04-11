<template>
	<view class="content">
		<!-- 搜索 -->
		<view class="xd-search-box">
			<view class="xd-search">
				<view class="xd-icons icon-search"><image src="../../static/images/icon/search.png"></image></view>
				<input type="text" class="xd-search-input" value="" placeholder="行动项·昵称" placeholder-style="color:#ffffff"/>
			</view>
		</view>
		
		<view class="xd-body">
			<view class="pageNav xd-flex-center">
				<view :class="[active == 0 ? 'active' : '']" @tap="showNew">最新</view>
				<view :class="[active == 1 ? 'active' : '']" @tap="showRecommend">推荐</view>
				<view :class="[active == 2 ? 'active' : '']" @tap="showFollow">关注</view>
			</view>
			
			<!-- 最新 -->
			<view class="xd-list-info" :hidden="active == 1||active==2">
				最新
			</view>
			<!-- 推荐 -->
			<view class="xd-list-info" :hidden="active == 0||active==2">
				<view class="swiper-banner">
				  <swiper class="swiper" indicator-dots="true" autoplay="true" circular="true" indicator-color="#aeaeae" indicator-active-color="#ffffff">
				  	<swiper-item v-for="(item , index) in bannerList" :key="index">
				  				<navigator :url="item.bannerImage"><image :src="item.bannerImage" ></image></navigator>
				  			</swiper-item>
				  </swiper>
				</view>
				
				<!-- 推荐内容 -->
				<view class="xd-info-main">
					<!-- 推荐项 -->
					<view class="main-tabbar">
						<!-- :scroll-into-view="'tab-'+currentIndex" -->
						<scroll-view
						:class="['xd-nav-bar', isCenter ? 'xd-nav-center' : '']" scroll-x="true" show-scrollbar="false" >
							<view :class="['nav-item', currentIndex == index ? 'nav-active' : '']" :id="'tab-'+index" 
								v-for="(item, index) in tabs" :key="index" :data-index="index"
								@tap="navChange">
								<view class="nav-item-title">
									{{item.labelName}}
									<view class="nav-item-desc">{{item.id}}项</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="xd-line"></view>
					<!-- 推荐项对应内容 -->
					<view class="swiper-box">
						<view :class="['swiper-item', currentIndex == boxIndex ? 'box-active' : '']" v-for="(listsBox, boxIndex) in listsTab" :key="boxIndex">						
							<view class="infos-box">
								<!-- <block v-for="(list, index) in listsTab[boxIndex].lists" :key="index"> -->
								<block v-for="(list, index) in listsTab" :key="index">
								
				
									<view class="xd-list xd-border-b-color">
										<view class="xd-list-items">											<view class="xd-list-image xd-relative">
												<image class="xd-list-image xd-box-shadow" :src="list.pictures"></image>
												
												<view class="xd-list-head" @tap="goPage('/pages/selfCenter/selfView?view=other')">
													<image class="xd-list-head-img xd-box-shadow" :src="list.pictures" mode="widthFix"></image>
													
												</view>
											</view>
											<view class="xd-list-body xd-border-b-black">
												<view class="xd-list-title">
													<text class="xd-list-title-text">{{list.label}}</text>
													<!-- <view class="xd-list-title-desc">20190318</view> -->
												</view>
												<navigator hover-class="none" url="action/action">
													<view class="xd-list-body-desc xd-ellipsis-line2">{{list.content}}</view>
												</navigator>
											</view>
										</view>
										<view class="xd-list-body-desc xd-list-time"><text>({{list.targetDay-list.holidayDay-list.pushCardCount}}/{{list.targetDay}})</text></view>
										<navigator hover-class="none" url="cardDetails/cardDetails">
											<view class="xd-list-desc">{{list.extendContent}}</view>
											
										</navigator>
										<view class="xd-grids">
											<view class="xd-grids-items comment-grids">
												<view class="xd-relative">
													<image class="xd-grids-icon-img" src="../../static/images/icon/comment.png" mode="widthFix"></image>
													<view class="xd-badge">{{list.comment}}</view>
												</view>
											</view>
											<view class="xd-grids-items love-grids">
												<view class="xd-relative">
													<view v-if="list.islove==0">
													  <image class="xd-grids-icon-img-love" src="../../static/images/icon/love.png" mode="widthFix" @tap="loveClick(list,index,boxIndex)"></image>
													</view>
													<view v-else>
													  <image class="xd-grids-icon-img-love" src="../../static/images/icon/love-on.png" mode="widthFix" @tap="loveClick(list,index,boxIndex)"></image>
													</view>
													<view class="xd-badge">{{list.giveLike}}</view>
												</view>
											</view>
											<view class="xd-grids-items sponsor-grids">
												<view class="xd-relative">
													<view class="xd-tbr-large">赞助</view>
													<view class="xd-badge">{{list.giveReward}}</view>
												</view>
											</view>
											<view class="xd-grids-items bond-grids">
												<view class="xd-relative">
													<view class="xd-tbr-large">保证金<text class="xd-tbr-txt-bold">￥{{list.challengeRmb}}</text></view>
												</view>
											</view>
											<view class="xd-grids-items supervise-grids">
												<view class="xd-relative">
													<!-- #ifdef MP-WEIXIN -->
													<button class="buttonShare" open-type="share" >邀请围观</button>
													<!-- #endif -->
													<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">{{list.onlookerCount}}</view>
												</view>
											</view>
										</view>
									</view>
								</block>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<!-- 关注 -->
			<view class="xd-list-info" :hidden="active == 0||active==1">
				关注
			</view>
			
		</view>
		<!-- 开始行动-加号 -->
		<view class="start-add" @tap="goPage('/pages/action/step1')">
			<image src="../../static/images/icon/add.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import{ mapState,mapMutations} from 'vuex'
	export default {
		data() {
			return {

				active:1,
				currentIndex:0,
				bannerList:[],
				tabs: [],
				listsTab:[],
				
				
				
				pageNum:1,//当前页数
				pageSize:10,//每页条数
					
			};
		},
		onShareAppMessage(res) {
		      return {
		        title: '我在行动打卡，快来围观我吧',
		        path: '/pages/index/index'
		      }
		    },
		
		onLoad() {
		   this.indexData()
		},
		 computed: {  
		            ...mapState(['hasLogin'])  
		        },  
		methods:{
			...mapMutations(['logIn','logOut'])  ,
			goPage(url){
				uni.navigateTo({
					url
				});
			},
			//首页获取label和根据时间获取列表
			indexData:function(){
				let token='';
				try{
				   token=uni.getStorageSync('token');
												  
				}catch(e){
						console.log(Error)
				};
				console.log(this.hasLogin)
				console.log(this.token)
				
				if(!this.hasLogin &&token==''){
					   this.logOut();
					   uni.navigateTo({
						url:"../login/login",
					   });
					   return false
								
				}else{
					   this.xd_request_post(this.xdServerUrls.xd_bannerList,{},false
				        ).then((res) => {
										   this.bannerList=res.obj
									 
										  
									   }).catch(err => {
							
									});
									this.xd_request_post(this.xdServerUrls.xd_label,{},false
										   ).then((res) => {
											   console.log(res)
											   this.tabs=res.obj
											   
										   }).catch(err => {
										
									});
									this.xd_request_post(this.xdServerUrls.xd_pushByHighGradeList,
									{
										token:token,
										pageNum:1,
										pageSize:10,
									},
									false
										   ).then((res) => {
											   this.listsTab=res.obj.list;
											   this.pageNum=res.obj.nextPage;
										   }).catch(err => {
								
			                                                   });
			  }
				
			},
			//点赞
			loveClick(list,index,boxIndex){
				let isLove=list.islove;
				this.xd_request_post(this.xdServerUrls.xd_saveGiveLikeByPush,{
					pushId:list.id,
					initiatorUserId:uni.getStorageSync('id'),
					giveLikeUserId:list.userId,
				},false
				   ).then(res => {
						   console.log(res)
						   if(isLove==1){								   
												this.listsTab[boxIndex].lists[index].islove=0;
												this.listsTab[boxIndex].lists[index].love--;
						   }else if(isLove==0){
												  this.listsTab[boxIndex].lists[index].islove=1;
												  this.listsTab[boxIndex].lists[index].love++;
						                         						  
						    }
					   }).catch(err => {
					
				})
				
				
			},
			// 最新
			showNew: function () {
				this.active = 0;
			},
			// 推荐
			showRecommend : function(){
				this.active = 1;
			},
			// 关注
			showFollow : function(){
				this.active = 2;
			},
			
			// 推荐内容切换
			navChange: function (e) {
				this.currentIndex = e.currentTarget.dataset.index;
			},
			getNewList(){
				this.indexData(),
				this.pageNum=1,
				uni.stopPullDownRefresh();
			},
			 getReachList(){
				if(this.pageNum==0){
					uni.showLoading(
					{
						title: '没有更多数据了'
					})
					setTimeout(function () {
					    uni.hideLoading();
					}, 1000);
					
					return false
				}
				uni.showLoading(
				{
					title: '加载中..',
				})
				this.xd_request_post(this.xdServerUrls.xd_pushByHighGradeList,
				{
					token:uni.getStorageSync('token'),
					pageNum:this.pageNum,
					pageSize:this.pageSize,
				},
				false
					   ).then(res=>{
						   this.pageNum=res.obj.nextPage;
						
						this.listsTab = this.listsTab.concat(res.obj.list);					
						setTimeout(function () {
						    uni.hideLoading()
						}, 2000);
						
					})
			}
			
		},
		onShow() {
			this.indexData()
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.getNewList()
		},
		// 上拉加载
		onReachBottom() {
			this.getReachList()
		}
		
		
	}
	
</script>

<style scoped lang="scss">
	.xd-body{
		box-sizing: border-box;
		padding: 0 30upx;
		width:100%;
	}	
	.pageNav{
		padding: 20upx 0;
		view{
			margin: 0 28upx; font-size: 34upx; line-height: 44upx;
			border-bottom: 3px solid #ffffff;
		}
		view.active{
			border-color:#fd5107; font-weight:bold; color:#fd5107;
		}
	}
	
	.swiper-banner{
		width: 100%;
		
		.swiper{
			width: 100%; height: 208upx;
			swiper-item image{
				width: 100%; height: 208upx;
				border-radius: 10upx;
			}
		}
	}
	
	.xd-info-main{
		width: 100%;
		
		.main-tabbar{
			width: 100%;
			box-sizing: border-box;
			border-bottom: 1px solid #efe5e8;
			padding: 24upx 0 16upx 0;
			margin-bottom: 12upx;
			
			.xd-nav-bar{
				width:100%; display:flex; white-space:nowrap;
				
				.nav-item{
					width:25%; display:inline-flex; flex-direction:column;
					text-align: center;
					margin: 0 0.6%; padding: 8upx 0;
					background: #fbf3e6;
					border-radius: 10upx;
					
					.nav-item-title{
						font-size:26rpx; line-height:36rpx; width:100%; color:#fd5107;
					}
				}
				.nav-item.nav-active{
					background: #fd5107;
					
					.nav-item-title{
						color:#ffffff;
					}
				}
			}
		}
		
		.swiper-box{
			
			.swiper-item{
				display: none;
			}
			.swiper-item.box-active{
				display: block;
			}
			.infos-box{
				padding-top: 20upx;
			}
			// 列表功能
			.xd-list{
				width: 100%;
				padding-top: 20upx;
				margin-bottom: 16upx;
				
				.xd-list-head{
					position: absolute; top: -24rpx; right: -28rpx; z-index: 9;
				}
				.xd-list-time{
					padding: 18upx 0 12upx 0;
				}
				.xd-list-desc{
					height: 110upx;
					overflow: hidden;
					padding-bottom: 20upx;
					text-indent: 50upx;
					
				}
				
				.xd-grids{
					
					.xd-grids-items.comment-grids{
						width: 13%;
						flex-direction:row
					}
					.xd-grids-items.love-grids{
						width: 14%;
					}
					.xd-grids-items.sponsor-grids{
						width: 20%;
						.xd-tbr-large{
							background: #ffe66f;
							color: #101010;
						}
					}
					.xd-grids-items.bond-grids{
						width: 26%;
						.xd-tbr-large{
							background: #f9ebe5;
							color: #e17175;
							.xd-tbr-txt-bold{
								color: #ea030b;
								font-size: 19upx;
							}
						}
					}
					.xd-grids-items.supervise-grids{
						width: 23%;
						.buttonShare{
							background: #f9ebe5;
							color: #e17175;
							height: 40upx;
							border-radius: 20upx;
							font-size: 25upx;
							line-height: 1.7;
							margin-top: 5upx;

						}
					}
				}
			}
			
		}
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
</style>
