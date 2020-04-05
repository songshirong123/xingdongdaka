<template>
	<view class="content">
		
		<view class="cardDetails">
			<!-- 顶部个人信息 -->
			<view class="xd-list">
				<view class="xd-list-items">
					<view class="xd-list-image">
						<image class="xd-list-image" src="../../../static/images/pic/list2.jpg"></image>
					</view>
					<view class="xd-list-body">
						<view class="xd-list-title-text xd-ellipsis-line2">这个人比较懒，什么都没写！</view>
					</view>
				</view>
				<view class="xd-grids xd-flex-center">
					<view class="xd-grids-items sponsor-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">赞助</view>
							<view class="xd-badge">3</view>
						</view>
					</view>
					<view class="xd-grids-items bond-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">保证金<text class="xd-tbr-txt-bold">￥45</text></view>
						</view>
					</view>
					<view class="xd-grids-items supervise-grids">
						<view class="xd-relative">
							<view class="xd-tbr-large">邀请围观</view>
							<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">4</view>
						</view>
					</view>
				</view>
			</view>
			<view class="xd-line"></view>
			
			<!-- 打卡列表 -->
			<view class="card-list xd-comments">
				
				<!-- 循环card-list-item 为一条打卡记录 -->
				<view class="card-list-item xd-border-b-color">
					<view class="xd-comments-items">
						<image src="../../../static/images/pic/Simba.jpg" class="xd-comments-face"></image>
						<view class="xd-comments-body">
							<view class="xd-comments-header">
								<text class="xd-comments-header-name">辛巴</text>
								<text class="xd-comments-header-text">12月31日 15:11 (20/30)</text>
							</view>
							<view class="xd-comments-imgs">
								<view class="xd-comments-image">
									<image src="../../../static/images/pic/detail1.jpg" class="xd-comments-img" mode="widthFix"></image>
								</view>
								<view class="xd-comments-image">
									<image src="../../../static/images/pic/detail2.jpg" class="xd-comments-img" mode="widthFix"></image>
								</view>
							</view>
							<view class="xd-comments-info-text">我回来了！</view>
							<view class="xd-comments-key xd-border-b-black">
								<image src="../../../static/images/icon/address.png"></image>
								<text class="xd-comments-key-text">#King</text>
							</view>
							<!-- 评论 -->
							<view class="xd-fri-comments">
								<view class="xd-comments-items">
									<image src="../../../static/images/pic/Scar.jpg" class="xd-comments-face"></image>
									<view class="xd-comments-body">
										<view class="xd-comments-header">
											<text class="xd-comments-header-name">刀疤</text>
											<text class="xd-comments-header-text">12月31日 16:00</text>
										</view>
										<view class="xd-comments-info-text">辛巴？呵呵。你还活着？！还真是个...惊喜！看到他们了吗？他们认为我才是这里的国王。</view>
									</view>
								</view>
								<view class="xd-comments-items">
									<image src="../../../static/images/pic/Sarabi.jpg" class="xd-comments-face"></image>
									<view class="xd-comments-body">
										<view class="xd-comments-header">
											<text class="xd-comments-header-name">沙拉碧</text>
											<text class="xd-comments-header-text">12月31日 16:01</text>
										</view>
										<view class="xd-comments-info-text">我们不这么想，辛巴才是这里合法的国王。</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 功能列表 -->
					<view class="xd-grids xd-space-between xd-flex-v-center">
						<view class="xd-grids-items comment-grids">
							<view class="xd-relative">
								<image class="xd-grids-icon-img" src="../../../static/images/icon/comment.png" mode="widthFix"></image>
								<view class="xd-badge">34</view>
							</view>
						</view>
						<view class="xd-grids-items love-grids">
							<view class="xd-relative">
								<image class="xd-grids-icon-img-love" src="../../../static/images/icon/love-on.png" mode="widthFix"></image>
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
					</view><!-- 功能列表end -->
				</view><!-- card-list-item end -->
								
				<view class="card-list-item xd-border-b-color">
					<view class="xd-comments-items">
						<image src="../../../static/images/pic/Simba.jpg" class="xd-comments-face"></image>
						<view class="xd-comments-body">
							<view class="xd-comments-header">
								<text class="xd-comments-header-name">辛巴</text>
								<text class="xd-comments-header-text">12月31日 18:55 (30/35)</text>
							</view>
							<view class="xd-comments-imgs">
								<view class="xd-comments-image">
									<image src="../../../static/images/pic/detail3.jpg" class="xd-comments-img" mode="widthFix"></image>
								</view>
								<view class="xd-comments-image">
									<image src="../../../static/images/pic/detail4.jpg" class="xd-comments-img" mode="widthFix"></image>
								</view>
							</view>
							<view class="xd-comments-info-text">谢谢你们的帮助</view>
							<view class="xd-comments-key xd-border-b-black">
								<image src="../../../static/images/icon/address.png"></image>
								<text class="xd-comments-key-text">#忧伤</text>
							</view>
							<!-- 评论 -->
							<view class="xd-fri-comments">
								<view class="xd-comments-items">
									<image src="../../../static/images/pic/Timon.jpg" class="xd-comments-face"></image>
									<view class="xd-comments-body">
										<view class="xd-comments-header">
											<text class="xd-comments-header-name">丁满</text>
											<text class="xd-comments-header-text">12月31日 18:58</text>
										</view>
										<view class="xd-comments-info-text">天啊，他笼罩在蓝色的忧伤里</view>
									</view>
								</view>
								<view class="xd-comments-items">
									<image src="../../../static/images/pic/Pumbaa.jpg" class="xd-comments-face"></image>
									<view class="xd-comments-body">
										<view class="xd-comments-header">
											<text class="xd-comments-header-name">彭彭</text>
											<text class="xd-comments-header-text">12月31日 18:59</text>
										</view>
										<view class="xd-comments-info-text">我觉得他是金黄色的</view>
									</view>
								</view>
								<view class="xd-comments-items">
									<image src="../../../static/images/pic/Timon.jpg" class="xd-comments-face"></image>
									<view class="xd-comments-body">
										<view class="xd-comments-header">
											<text class="xd-comments-header-name">丁满</text>
											<text class="xd-comments-header-text">12月31日 19:01</text>
										</view>
										<view class="xd-comments-info-text">不不不，我是说他很沮丧</view>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!-- 功能列表 -->
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
					</view><!-- 功能列表end -->
				</view><!-- card-list-item end -->
				
				
						
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
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
					padding: 0 30upx;
					
					.xd-comments-image{
						width:285upx; height:207upx; margin:5upx; font-size:0; overflow:hidden;
					}
					.xd-comments-img{
						width:285upx; height:207upx;
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
		
	
	
</style>
