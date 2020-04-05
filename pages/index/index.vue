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
						<swiper-item>
							<navigator url=""><image src="../../static/images/pic/banner1.jpg"></image></navigator>
						</swiper-item>
						<swiper-item>
							 <navigator url=""><image src="../../static/images/pic/banner2.jpg"></image></navigator>
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
								@click="navChange">
								<view class="nav-item-title">
									{{item.title}}
									<view class="nav-item-desc">{{item.dsc}}</view>
								</view>
							</view>
						</scroll-view>
					</view>
					<view class="xd-line"></view>
					<!-- 推荐项对应内容 -->
					<view class="swiper-box">
						<view :class="['swiper-item', currentIndex == boxIndex ? 'box-active' : '']" v-for="(listsBox, boxIndex) in listsTab" :key="boxIndex">
							<view class="infos-box">
								<block v-for="(list, index) in listsTab[boxIndex].lists" :key="index">
									
									<view class="xd-list xd-border-b-color">
										<view class="xd-list-items">
											<view class="xd-list-image xd-relative">
												<image class="xd-list-image xd-box-shadow" :src="list.coverImg"></image>
												<view class="xd-list-head" @click="goPage('/pages/selfCenter/selfView?view=other')">
													<image class="xd-list-head-img xd-box-shadow" :src="list.headImg" mode="widthFix"></image>
												</view>
											</view>
											<view class="xd-list-body xd-border-b-black">
												<view class="xd-list-title">
													<text class="xd-list-title-text">{{list.name}}</text>
													<!-- <view class="xd-list-title-desc">20190318</view> -->
												</view>
												<navigator hover-class="none" url="action/action">
													<view class="xd-list-body-desc xd-ellipsis-line2">{{list.sgin}}</view>
												</navigator>
											</view>
										</view>
										<view class="xd-list-body-desc xd-list-time">{{list.time}}<text>{{list.chishu}}</text></view>
										<navigator hover-class="none" url="cardDetails/cardDetails">
											<view class="xd-list-desc">{{list.desc}}</view>
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
													  <image class="xd-grids-icon-img-love" src="../../static/images/icon/love.png" mode="widthFix"></image>
													</view>
													<view v-else>
													  <image class="xd-grids-icon-img-love" src="../../static/images/icon/love-on.png" mode="widthFix"></image>
													</view>
													<view class="xd-badge">{{list.love}}</view>
												</view>
											</view>
											<view class="xd-grids-items sponsor-grids">
												<view class="xd-relative">
													<view class="xd-tbr-large">赞助</view>
													<view class="xd-badge">{{list.sponsor}}</view>
												</view>
											</view>
											<view class="xd-grids-items bond-grids">
												<view class="xd-relative">
													<view class="xd-tbr-large">保证金<text class="xd-tbr-txt-bold">￥{{list.bond}}</text></view>
												</view>
											</view>
											<view class="xd-grids-items supervise-grids">
												<view class="xd-relative">
													<view class="xd-tbr-large">邀请围观</view>
													<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">{{list.supervise}}</view>
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
		<view class="start-add" @click="goPage('/pages/action/step1')">
			<image src="../../static/images/icon/add.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				active:1,
				currentIndex:0,
				tabs: [
					{
						title: '早睡早起',  dsc: '41项'
					}, {
						title: '娱乐放松', dsc: '34项'
					}, {
						title: '攒小金库', dsc: '79项'
					}, {
						title: '请求帮助', dsc: '21项'
					}, {
						title: '热门项', dsc: '33项'
					}],
				
				"listsTab":[{
						"type":"早睡早起",
						"lists":[{
								id: "01",
								name: 'Hakuna matata',
								sgin:"世上有两个我，一个吃货的我，一个想减肥的我。",
								headImg:'../../static/images/pic/header.png',
								coverImg:'../../static/images/pic/list2.jpg',
								time:"12月25日17:02",
								chishu:"(20/30)",
								desc:"通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型",
								comment:"234",
								love:"888",
								islove:'1',
								bond:"999",
								sponsor:"666",
								supervise:"88k"
							}, {
								"id": "02",
								name: '沙祖',
								sgin:"你妈妈没有教过你不要玩弄你的食物？",
								headImg:'../../static/images/pic/Zazu.jpg',
								coverImg:'../../static/images/pic/list.jpg',
								time:"12月24日10:00",
								chishu:"(27/30)",
								desc:"通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型",
								comment:"24",
								love:'38',
								islove:'0',
								bond:"99",
								sponsor:'636',
								supervise:'2k'
							}]
					  }, {
					  	"type":"娱乐放松",
					  	"lists":[{
								"id": "10",
								name: '刀疤',
								sgin:"哦，你害我的午餐跑掉了。",
								headImg:'../../static/images/pic/Scar.jpg',
								coverImg:'../../static/images/pic/list.jpg',
								time:"12月24日10:00",
								chishu:"(27/30)",
								desc:"通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型",
								comment:"24",
								love:'38',
								islove:'1',
								bond:"0.9",
								sponsor:'636',
								supervise:'2k'
							}]    
					  }, {
					  	"type":"攒小金库",
					  	"lists":[{
								"id": "20",
								name: '彭彭',
								sgin:"世上有两个我，一个吃货的我，一个想减肥的我。",
								headImg:'../../static/images/pic/Pumbaa.jpg',
								coverImg:'../../static/images/pic/list2.jpg',
								time:"12月24日10:00",
								chishu:"(27/30)",
								desc:"通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型",
								comment:"24",
								love:'38',
								islove:'0',
								bond:"5",
								sponsor:'636',
								supervise:'2k'
							}]    
					  }, {
					  	"type":"请求帮助",
					  	"lists":[{
								"id": "30",
								name: 'Hakuna matata',
								sgin:"世上有两个我，一个吃货的我，一个想减肥的我。",
								headImg:'../../static/images/pic/header.png',
								coverImg:'../../static/images/pic/list2.jpg',
								time:"12月24日10:00",
								chishu:"(27/30)",
								desc:"通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型",
								comment:"24",
								love:'38',
								islove:'1',
								bond:"20",
								sponsor:'636',
								supervise:'2k'
							}]    
					  }, {
					  	"type":"热门项",
					  	"lists":[{
								"id": "40",
								name: '丁满',
								sgin:"世上有两个我，一个吃货的我，一个想减肥的我。",
								headImg:'../../static/images/pic/Timon.jpg',
								coverImg:'../../static/images/pic/list.jpg',
								time:"12月24日10:00",
								chishu:"(27/30)",
								desc:"通常你希望每个 prop 都有指定的值类型。这时，你可以以对象形式列出 prop，这些属性的名称和值分别是 prop 各自的名称和类型",
								comment:"24",
								love:'38',
								islove:'0',
								bond:"100",
								sponsor:'636',
								supervise:'2k'
							}]    
					  }
					]
			};
		},
		
		onLoad() {
	
		},
		methods:{
			goPage(url){
				uni.navigateTo({
					url
				});
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
					padding-bottom: 20upx;
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
							}
						}
					}
					.xd-grids-items.supervise-grids{
						width: 23%;
						.xd-tbr-large{
							background: #f9ebe5;
							color: #e17175;
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
