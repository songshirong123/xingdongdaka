<template name='indexList'>
	<view >
		<view id="dynamic" class="cu-card dynamic " :class="list.pushCardList[0].pictures.length>1?'no-card':''">
			<view class="cu-item shadow">
				<view class="cu-list menu-avatar" >
					<view class="cu-item">
						<view class="cu-avatar round lg"  :style="{backgroundImage: 'url(' +list.userHead + ')'}" @tap="goPageImg(list.userHead)"></view>
						<!-- class="content flex-sub" -->
						<view class="xd-columns" style="position: absolute;left: 146upx;"  @tap="goPage(list)">
							<view>{{list.userName}}</view>
							<view class="text-gray text-sm flex justify-between" style="margin-top: 3px;">
								{{list.pushCardList[0].createTime }}  ({{list.pushCardCount}}/{{list.targetDay}})
							</view>
							<!-- 打卡地址 -->
							<view class="text-gray text-sm flex justify-between" style="color: #1cbbb4;font-size: 8px;">
								{{list.pushCardList[0].address}}
							</view>
						</view>
					</view>
				</view>
				
				<view class=" text-content margin-top-sm padding-bottom-sm" @tap="goComentConten(list)">	
					<view class="flex flex-wrap align-center">
						<view class="cu-tag bg-pink radius sm" >打卡</view>
						<view class= "cu-tag margin-left-xs light bg-red sm" v-if="list.challengeRmb>0">
							<view v-if="list.belongOwn" class="cu-tag light bg-red radius sm" >
								保证金￥{{list.challengeRmb}}
							</view>
							<view v-else class="cu-tag light bg-red radius sm" >
								保证金￥{{list.challengeRmb+Math.round(list.sponsorRmb/100)}}
							</view>
						</view>
					</view>
					<text class="contentext"  style="padding-left: 5px;">{{list.pushCardList[0].content}}</text>
				</view>
			<!-- 	<view class="text-content margin-top-sm padding-bottom-sm"  @tap="goPageCard(list)" v-if="list.pushCardCount.length==0">
					<view class="cu-tag bg-green radius sm" >行动</view>
					<view v-if="list.challengeRmb>0">
						<view v-if="list.belongOwn" class="cu-tag light bg-red radius sm" >
							保证金￥{{list.challengeRmb}}
						</view>
						<view v-else class="cu-tag light bg-red radius sm" >
							保证金￥{{list.challengeRmb+Math.round(list.sponsorRmb/100)}}
						</view>
					</view>
					<text class="contentext" style="padding-left: 5px;">{{list.content}}</text>
				</view>	 -->
				<view class="grid flex-sub padding-lr " :class="list.pushCardList[0].videos!=''?'col-3 grid-square':'col-1'" v-if="list.pushCardList[0].videos!=undefined && list.pushCardList[0].videos!=null && list.pushCardList[0].videos!=''">
					<video  id="videowhind" class="videowhind" :src="list.pushCardList[0].videos" controls></video>
				</view>
				<view class="grid flex-sub padding-lr" :class="list.pushCardList[0].pictures.length>1?'col-3 grid-square':'col-1'" v-else-if="list.pushCardCount>0">
					<view class="bg-img" :class="list.pushCardList[0].pictures.length>1?'':'only-img'" :style="{backgroundImage:'url('+item+')'}"
					 v-for="(item,index) in list.pushCardList[0].pictures" :key="index" @tap="goPageImg(list.pushCardList[0].pictures,index)" v-if="list.pushCardList[0].pictures.length>0">
					</view>
					<image class="bg-img imgheit "  :src="audioPlaySrc" v-if="list.pushCardList[0].pictures.length==0" mode="aspectFill"
					 @tap="goPageImg(audioPlaySrc)"  @error="error">
					</image>
				</view>
				
				<view class="grid flex-sub padding-lr"  v-if="list.pushCardCount==0">
					<image class="bg-img imgheit"  :src="list.pictures" mode="aspectFill"
					 @tap="goPageImg(list.pictures)" v-if="list.pictures!=''">
					</image>
					<image class="bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
					 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
					</image>
				</view>
				<view class="flex padding justify-around align-center">
					<view class="action flex flex-wrap align-center" @tap="goComent(list)">
						<view class="text-lg">
							<text class="lg text-black cuIcon-mark"></text>
						</view>
						
						<text class="text-sm marginxs">评论</text>
					</view>
					<view class="action flex flex-wrap align-center" @tap="gotoSponsor(list,index)">
						<view class="text-lg">
							<text class="lg text-black cuIcon-moneybag"></text>
						</view>
						
						<text class="text-sm marginxs">赞助</text>
						<text v-if="list.sponsorCount>0" class="text-gray text-sm ">{{list.sponsorCount}}</text>
					</view>
					<button class="cu-btns"   @tap="share(list,index)">
						<view class="flex flex-wrap align-center ">
							<view class="text-black text-lg">
								<text class="lg text-black cuIcon-forward"></text>
							</view>
							<text class="text-sm marginxs" v-if="list.userId==userId ">分享邀请</text>
							<text class="text-sm marginxs" v-else>为TA打Call</text>
						</view>
					</button>
					<view class="action flex flex-wrap align-center "    @tap="lookerClick(list,index)">
						<view class="text-lg">
							<text class="lg text-black cuIcon-friendfavor"></text>
						</view>
						<text class="text-sm marginxs text-red" v-if="list.userId!=userId && !list.onlooker&&list.challengeRmb<=0" :id="index"   >围观</text>
						<text class="text-sm marginxs text-red" v-else-if="!list.onlooker" >围观分钱</text>
						<text class="text-sm marginxs" v-else-if="list.onlooker">已围观</text>
						<text class="text-gray text-sm " v-if="list.onlookerCount>0">{{list.onlookerCount}}</text>
					</view>

				</view>
			</view>
			<view class="padding-top-xs padding-bottom-xs"  v-if="index==4||index==7 ">
				<ad-custom v-if="active==0"  :unit-id="adList[index%2]" ad-intervals="31" ></ad-custom>
				<ad-custom  v-else :unit-id="adLists[index%2]" ad-intervals="31" ></ad-custom>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name:"actionlist",
		props:['list','index','hasLogin','userId','isRanking','active'],
		data() {
			return {
				audioPlaySrc:'../static/images/icon/img/title.png',
				adList:['adunit-73360e20595db52c','adunit-9fd077ffaafb3ee5'],
				adLists:['adunit-6da3956e24c7352a','adunit-1fa4e569a99f2ac6']
				// adshow:false,
			};
		},
		// watch:{
		// 	Off:function(){
		// 			console.log('1')
		// 			var query = uni.createSelectorQuery();
		// 			 query.selectAll('#videowhind').boundingClientRect()
		// 			 query.exec(res => {
		// 			       console.log(res)
		// 		 })
				
		// 	  },
		// },
		methods:{
			// adload(e){
			// 	this.adshow=true;
				
			// },
			// aderror(e){
			// 	this.adshow=false;
			// },
			getcreat(){
				var query = uni.createSelectorQuery();
				 query.selectAll('#videowhind').boundingClientRect()
				 query.exec(res => {
				       // console.log(res)
					    })
			},
			error: function() {
				this.audioPlaySrc=this.xdUniUtils.xd_randomImg(1);
			            }  ,
			gotoSponsor(list,index){
				this.$emit('gotoSponsor',list,index);
			},			
			lookerClick(list,index){
				this.$emit('lookerClick',list,index);
			},
			share(list,index){
				this.$emit('share',list,index);
			},
			goComent(e){
				if(!e.pushCardList||e.pushCardList.length==0){
					return false
				}
				uni.navigateTo({
					url: '../index/cardDetails/cardDetails?pushId='+e.id+'&cardId='+e.pushCardList[0].id+'&show=1'
				});
			},
			goComentConten(e){
				uni.navigateTo({
					url: '../index/cardDetails/cardDetails?pushId='+e.id+'&cardId='+e.pushCardList[0].id+'&show=0'
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
					url:'../selfCenter/selfView?userId='+e.userId
				})
			},
			goPageCard(e){
				
					uni.navigateTo({
						url:'../index/action/action?pushId='+e.id
					})
				
			},
			goPageImg(e,index){
				this.xdUniUtils.xd_showImg(e,index)
			},
			
		}
	}
</script>

<style lang="scss">
			.imgheit{
				height: 320upx;
				width: 100%;
			}
			// .contentext{
			// 	margin-left: 50upx;
			// }
.bg-light-blue{background-color: #007AFF;}
.videowhind{
	width: 100%;
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
