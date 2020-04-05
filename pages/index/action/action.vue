<template>
	<view class="content">
		
		<view class="xd-info-main">				
			<view class="xd-list xd-border-b-black">
				<view class="xd-list-items">
					<view class="xd-list-image xd-relative">
						<image class="xd-list-image" src="../../../static/images/pic/list2.jpg"></image>
						<view class="xd-list-head">
							<image class="xd-list-head-img" src="../../../static/images/pic/header.png" mode="widthFix"></image>
						</view>
					</view>
					<view class="xd-list-body">
						<view class="xd-list-title">
								<text class="xd-list-title-text">小太阳</text>
								<text class="xd-tags">关注</text>
						</view>
						<view class="xd-list-desc xd-ellipsis-line2">这个人比较懒，什么也没写。</view>
					</view>
				</view>
				
				<view class="xd-grids xd-flex-center">
					<view class="xd-grids-items sponsor-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">赞助</view>
							<view class="xd-badge">45</view>
						</view>
					</view>
					<view class="xd-grids-items bond-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">保证金<text class="xd-tbr-txt-bold">￥50</text></view>
						</view>
					</view>
					<view class="xd-grids-items supervise-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">邀请围观</view>
							<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">23</view>
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
					<text class="xd-list-desc">2020年1月2日-2020年3月2日</text>
				</view>
				<view class="xd-list-title">
					<view class="list-title-row xd-rows">
						<text class="xd-list-title-text">坚持天数</text>
						<text class="xd-list-desc">10/30</text>
					</view>
					<view class="list-title-row xd-rows">
						<text class="xd-list-title-text">休假天数</text>
						<text class="xd-list-desc">2/10</text>
					</view>
				</view>
			</view>
			<view class="flag-box bottom xd-border-b-black">
				<view class="xd-list-title">
					<text class="xd-list-title-text">动机目标：</text>
					<text class="xd-list-desc">成为更好的自己</text>
				</view>
				<view class="xd-list-title">
					<text class="xd-list-title-text">打卡方式：</text>
					<text class="xd-list-desc">按时拍食物和健身照片</text>
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
				<view class="xd-list xd-border-b-black">
					<view class="xd-list-items">
						<view class="xd-comments-image">
							<image src="../../../static/images/pic/detail2.jpg" class="xd-comments-img" mode="widthFix"></image>
						</view>
						<view class="xd-list-body">
							<view class="xd-list-body-desc">1月2日 15:57 (20/30)</view>
							<view class="xd-list-desc xd-ellipsis-line2">我又吃多了</view>
						</view>
					</view>
					<view class="xd-grids">
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
					</view>
				</view>
				
				<view class="xd-list xd-border-b-black">
					<view class="xd-list-items">
						<view class="xd-comments-image">
							<image src="../../../static/images/pic/detail2.jpg" class="xd-comments-img" mode="widthFix"></image>
						</view>
						<view class="xd-list-body">
							<view class="xd-list-body-desc">1月2日 15:57 (20/30)</view>
							<view class="xd-list-desc xd-ellipsis-line2">我又吃多了</view>
						</view>
					</view>
					<view class="xd-grids">
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
					</view>
				</view>
				
				<view class="xd-list xd-border-b-black">
					<view class="xd-list-items">
						<view class="xd-comments-image">
							<image src="../../../static/images/pic/detail2.jpg" class="xd-comments-img" mode="widthFix"></image>
						</view>
						<view class="xd-list-body">
							<view class="xd-list-body-desc">1月2日 15:57 (20/30)</view>
							<view class="xd-list-desc xd-ellipsis-line2">我又吃多了</view>
						</view>
					</view>
					<view class="xd-grids">
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
					</view>
				</view>
				
				<view class="xd-list xd-border-b-black">
					<view class="xd-list-items">
						<view class="xd-comments-image">
							<image src="../../../static/images/pic/detail2.jpg" class="xd-comments-img" mode="widthFix"></image>
						</view>
						<view class="xd-list-body">
							<view class="xd-list-body-desc">1月2日 15:57 (20/30)</view>
							<view class="xd-list-desc xd-ellipsis-line2">我又吃多了</view>
						</view>
					</view>
					<view class="xd-grids">
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
					</view>
				</view>
				
				<view class="xd-list xd-border-b-black">
					<view class="xd-list-items">
						<view class="xd-comments-image">
							<image src="../../../static/images/pic/detail2.jpg" class="xd-comments-img" mode="widthFix"></image>
						</view>
						<view class="xd-list-body">
							<view class="xd-list-body-desc">1月2日 15:57 (20/30)</view>
							<view class="xd-list-desc xd-ellipsis-line2">我又吃多了</view>
						</view>
					</view>
					<view class="xd-grids">
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
					</view>
				</view>
				
			</view>
			
			<!-- 详情 -->
			<view class="xd-list-info" :hidden="active == 0">
				详情
			</view>
		</view>
		
		<view style="height: 10upx;"></view>
		<!-- 底部 -->
		<view class="footer">
			<view class="xd-grids xd-space-between xd-flex-v-center">
				<view class="xd-grids-items comment-grids">
					<view class="xd-relative">
						<image class="xd-grids-icon-img" src="../../../static/images/icon/comment.png" mode="widthFix"></image>
						<view class="xd-badge">34</view>
					</view>
				</view>
				<view class="xd-grids-items love-grids">
					<view class="xd-relative">
						<image class="xd-grids-icon-img-love" src="../../../static/images/icon/love.png" mode="widthFix"></image>
						<view class="xd-badge">5</view>
					</view>
				</view>
				<view class="xd-grids-items collect-grids">
					<view class="xd-relative">
						<image class="xd-grids-icon-img" src="../../../static/images/icon/collect.png" mode="widthFix"></image>
						<view class="xd-badge">15</view>
					</view>
				</view>
				<view class="xd-grids-items share-grids">
					<view class="xd-relative">
						<image class="xd-grids-icon-img" src="../../../static/images/icon/share.png" mode="widthFix"></image>
						<view class="xd-badge">34</view>
					</view>
				</view>
				<view class="xd-grids-items reward-grids">
					<view class="xd-relative">
						<view class="xd-tbr-large">打赏</view>
						<view class="xd-badge">6</view>
					</view>
				</view>
				<view class="xd-grids-items action-grids">
					<view class="xd-relative">
						<view class="xd-tbr-large">一起行动</view>
						<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">12</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		data() {
			return {
				active: 0,
			};
		},
		
		onLoad() {
	
		},
		methods:{
			// 打卡
			cardFn: function () {
				this.active = 0;
			},
			// 详情
			detailFn : function(){
				this.active = 1;
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
	
</style>
