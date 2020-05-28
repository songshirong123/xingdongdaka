<template name='indexList'>
	<view class="xd-list xd-border-b-color">
		<view class="xd-list-items">	
			<view class="xd-list-image xd-relative">				
					<image class="xd-list-image xd-box-shadow" v-if="list.pictures!=''" :src="list.pictures" mode="aspectFill" @tap="goPageImg(list.pictures)" ></image>	
					<image class="xd-list-image xd-box-shadow" v-else :src="audioPlaySrc" @tap="goPageImg(audioPlaySrc)" @error="error"></image>
				<view class="xd-list-head" @tap="goPage(list)">
					<image class="xd-list-head-img xd-box-shadow" :src="list.userHead" mode="aspectFill"></image>
				</view>
			</view>
			<view class="xd-list-body xd-border-b-black">
				<view class="xd-list-title" @tap="goPage(list)">
					<text class="xd-list-title-text">{{list.userName}}</text>
					<!-- <view class="xd-list-title-desc">20190318</view> -->
				</view>
				
					<view class="xd-list-body-desc xd-ellipsis-line2" @tap="goPageCard(list)" >{{list.content}}</view>
				
			</view>
		</view>
		<view class="xd-list-body-desc xd-list-time"><text>{{list.createTime }}  ({{list.pushCardCount}}/{{list.targetDay}})</text></view>
		
			<view class="xd-list-desc" @tap="goComentConten(list)">{{list.pushCardList[0].content}}</view>
			
		
		<view class="xd-grids">
			<view class="xd-grids-items comment-grids">
				<view class="xd-relative" >
					<image class="xd-grids-icon-img" src="../static/images/icon/comment.png"  mode="widthFix" @tap="goComent(list)"></image>
					<view class="xd-badge">{{list.comment}}</view>
				</view>
			</view>
			<view class="xd-grids-items love-grids">
				<view class="xd-relative">
					<view v-show="!list.currentUserGiveLike">
					  <image class="xd-grids-icon-img-love" src="../static/images/icon/love.png" mode="widthFix" v-on:click="loveClick(list,index)"></image>
					</view>
					<view v-show="list.currentUserGiveLike">
					  <image class="xd-grids-icon-img-love" src="../static/images/icon/love-on.png" mode="widthFix" v-on:click="loveClick(list,index)"></image>
					</view>
					<view class="xd-badge">{{list.giveLike}}</view>
				</view>
			</view>
			<!-- <view class="xd-grids-items sponsor-grids">
				<view class="xd-relative">
					<view class="xd-tbr-large">赞助</view>
					<view class="xd-badge">{{list.giveReward}}</view>
				</view>
			</view> -->
			<view class="xd-grids-items bond-grids">
				<view class="xd-relative">
					<view class="xd-tbr-large" v-show="list.challengeRmb>0">保证金<text class="xd-tbr-txt-bold">￥{{list.challengeRmb}}</text></view>
				</view>
			</view>
			<view class="xd-grids-items supervise-grids">
				<view class="xd-relative">
					<!-- #ifdef MP-WEIXIN -->
					<button class="buttonShare" v-if="list.userId==userId || list.onlooker "  :id="index" open-type="share" >邀请围观</button>
					<button class="buttonShare" v-else-if="list.userId!=userId && !list.onlooker&&list.challengeRmb<=0"  @tap="lookerClick(list,index)">围观</button>
					<button class="buttonShare" v-else  @tap="lookerClick(list,index)">围观分钱</button>
					<!-- #endif -->
					<view class="xd-badge xd-bg-red xd-badge-absolute xd-white">{{list.lookerCount}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"actionlist",
		props:['list','index','hasLogin','userId'],
		data() {
			return {
				audioPlaySrc:'../static/images/icon/img/title.png',
			};
		},
		methods:{
			error: function() {
				
				var num=Math.floor(Math.random()*8+1);
				this.audioPlaySrc='../static/images/icon/img/title'+num+'.png'
			            }  ,
			lookerClick(list,index){
				
				this.$emit('lookerClick',list,index);
			},
			loveClick(e,index){
				
				this.$emit('loveclick',e,index);
			},
			goComent(e){
				console.log(e)
				var pushCard={
					pushList:e,
					pushCardList:e.pushCardList,
				};
				uni.navigateTo({
					url: '../index/cardDetails/cardDetails?pushCard='+encodeURIComponent(JSON.stringify(pushCard))
				});
			},
			goComentConten(e){
				uni.navigateTo({
					url: '../index/cardDetails/cardDetails?pushList='+encodeURIComponent(JSON.stringify(e))
				});
			}
			,
			goPage(e){
				if(!this.hasLogin){
					uni.navigateTo({
						url: '../login/login' 
					});
					return false;
				}
				uni.navigateTo({
					url:'../selfCenter/selfView?userId='+e.userId+'&pushId='+e.id
				})
			},
			goPageCard(e){
				
				uni.navigateTo({
					url:'../index/action/action?pushList='+encodeURIComponent(JSON.stringify(e))
				})
			},
			goPageImg(e){
				uni.navigateTo({
					url:'../img/img?url='+encodeURIComponent(JSON.stringify(e))
				})
			}
		}
	}
</script>

<style lang="scss">
			// 列表功能
			.xd-list{
				width: 100%;
				padding-top: 25upx;
				margin-bottom: 3upx;
				
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
							margin-top: 11upx;
	
						}
					}
				}
			}
			button::after {
				  border: none;
				}
				element.style{
					height: none;
				}

</style>
