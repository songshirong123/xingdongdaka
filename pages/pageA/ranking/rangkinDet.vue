<template>
	<view >
		<view class="cu-card dynamic " :class="pushList.pictures!=''?'no-card':''">
			<view class="cu-item shadow">
				<view class="grid flex-sub padding-lr"  >
					<image class="bg-img imgheit"  :src="listsTab[0].pictures" mode="aspectFill"
					 @tap="goPageImg(listsTab[0].pictures)" v-if="listsTab[0].pictures!=''">
					</image>
					<image class="bg-img imgheit"  :src="audioPlaySrc" mode="aspectFill"
					 @tap="goPageImg(audioPlaySrc)" v-else @error="error">
					</image>
				</view>
				<view class="cu-list menu-avatar">
					<view class="flex flex-wrap padding justify-between">
						<view >
							<view class="cu-tag light bg-orange radius" >
								挑战金奖池￥{{listsTab[0].challengeRmb}}
							</view>
						</view>
						<view class="widthtext " >
							<view class="text-gray text-sm ">
								挑战时间：{{listsTab[0].createTime}}--{{listsTab[0].endTime}}
							</view>
						</view>
					</view>
				</view>
				
				<view class="text-contents">
					<text class="contentext" >{{listsTab[0].content}}
					</text>
				</view>
				<view class="flex padding justify-between align-center" >
					<view class="text-xxl"  >
						<button class="cu-btn line-green sm round  " @click="goAdd" >加入挑战</button>
						<text class="text-gray text-df ">{{pushList.onlookerCount}}</text>
					</view>
					<view>
						<button class="cu-btn line-green sm round"  open-type="share">分享挑战</button>
					</view>
				</view>
			</view>
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(items,index) in ['新加入行动','挑战金排行']" :key="index" @tap="tabSelect" :id="index" >
						{{items}}
					</view>
				</view>
			</scroll-view>
			<block v-for="(item,index) in listsTab" :key="index" v-if="TabCur==0">
				<indexList id="indexList" :list="item" :index="index" @gotoSponsor='gotoSponsor' v-on:loveclick='loveClick'
				 v-on:lookerClick="lookerClick" :hasLogin="hasLogin" :userId='userId' :inimg='inimg'></indexList>
			</block>
			<block v-for="(attention,index) in listsTab" :key="index" v-if="TabCur==1">
				<indexList id="indexList" :list="attention" :index="index" @gotoSponsor='gotoSponsor' v-on:loveclick='loveClick'
				 v-on:lookerClick="lookerClick" :hasLogin="hasLogin" :userId='userId' :inimg='inimg'></indexList>
			</block>
		</view>
		<backTop :scrollTop="scrollTop"></backTop>
		<!-- 开始行动-加号 -->
		<view class="start-add" @tap="goPage" v-if="scrollTop<2000">
			<image src="../../../static/images/Body.png" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	
	import{ mapState,mapMutations} from 'vuex'
	import backTop from "@/components/backTop.vue"
	import indexList from "@/components/indexList.vue";
	export default {
		components:{
			indexList,
			backTop
		},
		data() {
			return {
				TabCur: 0,
				pushComentList:[],
				pusCardList:[],
				listsTab:[],
				audioPlaySrc:'../../../static/images/icon/img/titl.png',
				userId:uni.getStorageSync('id'),
				scrollTop:0,
				scrollTopinfo:true,
				
			};
		},
		onPageScroll(e) {
			this.scrollTop = e.scrollTop;
			
			
		},
		computed: {
		           ...mapState(['hasLogin'])  
		       },  
		onLoad(option) {
			//#ifdef MP-WEIXIN
			wx.showShareMenu({
			  menus: ['shareAppMessage', 'shareTimeline']
			})
			//#endif
			this.setSaveShareInfo();
			
		},
		/* watch: {
			hasLogin() {
				setTimeout(() => {
					this.clickSaveShareInfo();

				}, 100);
			},
		}, */
	
		onShareAppMessage(res) {
			let that = this;
			let tit=that.pushList.userId==that.userId? '第'+that.pushList.pushCardCishuCount+'次打卡:'+that.pusCardList[0].content:'我为@'+that.pushList.userName+'打Call：'+that.pusCardList[0].content;
			let path='/pages/index/action/action?pushId='+ that.pushList.id+'&share='+that.pushList.userId+'&isopen='+that.pushList.isopen;
			let img=that.pusCardList[0].pictures[0]?that.pusCardList[0].pictures[0]:'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png';
			
		    let	tit2= that.pushList.userId==that.userId? '第'+that.pushList.pushCardCishuCount+'次打卡:'+that.pushList.content:'我为@'+that.pushList.userName+'打Call：'+that.pushList.content;
		    let	path2= '/pages/index/action/action?pushId='+ that.pushList.id+'&share='+that.pushList.userId+'&isopen='+that.pushList.isopen;
		    let	img2=that.pushList.pictures?that.pushList.pictures:'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png';
			if(res.from=="menu"){
				
			if(that.pusCardList.length>0){
				that.setSaveShareInfo();
				return	that.xdUniUtils.xd_onShare(tit,path,img);
				
			}else{
				that.setSaveShareInfo();
				return	that.xdUniUtils.xd_onShare(tit2,path2,img2);	
			}
			}else{
				if(that.pusCardList.length>0){
					that.setSaveShareInfo();
					return	that.xdUniUtils.xd_onShare(tit,path,img);
					
				}else{
					that.setSaveShareInfo();
					return	that.xdUniUtils.xd_onShare(tit2,path2,img2);	
				}
			}		
		},
		//#ifdef MP-WEIXIN
		onShareTimeline(){
			let that = this;
			if(that.pusCardList.length>0){
				
				return {
					title: that.pushList.userId==that.userId? '第'+that.pushList.pushCardCishuCount+'次打卡:'+that.pusCardList[0].content:'我为@'+that.pushList.userName+'打Call：'+that.pusCardList[0].content,
					query: 'pushId='+ that.pushList.id+'&share='+that.pushList.userId+'&isopen='+that.pushList.isopen,
					imageUrl:that.pusCardList[0].pictures[0]?that.pusCardList[0].pictures[0]:'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png',
				}
				
			}else{
				
				return {
					title: that.pushList.userId==that.userId? '第'+that.pushList.pushCardCishuCount+'次打卡:'+that.pushList.content:'我为@'+that.pushList.userName+'打Call：'+that.pushList.content,
					query: 'pushId='+ that.pushList.id+'&share='+that.pushList.userId+'&isopen='+that.pushList.isopen,
					imageUrl:that.pushList.pictures?that.pushList.pictures:'https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1595733463227.png',
				}
				
			}
		},
		//#endif
		methods:{
			goAdd(){
				uni.navigateTo({
					url:'rankinAdd'
				})
			},
			tabSelect(e){
				this.TabCur=e.target.id;
				if(this.TabCur ==1){
					this.getLookerList()
				}
			},
			setSaveShareInfo(){
				this.xd_request_post(this.xdServerUrls.xd_pushByCreateTimeList, {
						pageNum: 1,
						pageSize: 10,
					},
					true
				).then((res) => {
				
					this.listsTab = res.obj.list;
					
				}).catch(err => {});
			},
			
		}
	}
	
</script>
<style scoped lang="scss">
	page{background: #fcfcfc;}
	.imgheit{
		height: 320upx;
		width: 100%;
	}
	.contentext{
		
	}
	
	.actionLi{
		padding-bottom: 10upx;
	}
	
	.bg-light-blue{background-color: #007AFF;}
	
	.widthtext{
		width: 100%;
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
