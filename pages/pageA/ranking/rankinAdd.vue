<template>
	<view class="selfCenter">
		<view class="actionInfo">
			<view class="cu-bar justify-center bg-white">
				<view class="action border-title">
					<text class="text-xl text-bold text-blue">选择需要加入挑战赛的行动、没有请新创建行动</text>
				</view>
			</view>
			
			<view class="actionTabList">
				<view class="actionMy" >
					
						<actionlist v-for="(item,index) in list" :item="item" :key="index" tab="1" :index='index' v-on:addRankin="addRankin" 
						 :userId="userId" :isRanking='isRanking'></actionlist>
		
				</view>
			</view>
		</view>
		<view class="start-add" >
			<image  src="../../../static/images/Body.png" @tap="goPage('/pages/action/step1')" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	import actionlist from "@/components/actionlist.vue";
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components:{
		
			actionlist
		},
		data() {
			return {
				isRanking:true,
				tab:0,//行动，围观，收藏
				list:[],
				userId:'',
				user:uni.getStorageSync('id'),
				total:'',
				userInfo:'',
				lookerList:[],
				pushId:'',
				lookTotal:0,
				lookerCount: 0,
				likeCount: 0,
				guanzhu:'关注'
			}
		},
		computed: {
			...mapState(['hasLogin'])
		},
		
		onShow() {
			
		},
		onLoad(option) {
			this.getCardList();
		
		},
		methods: {
			goPage(url) {
				if (!this.hasLogin) {
					return this.xdUniUtils.xd_login(this.hasLogin);
				}
				uni.navigateTo({
					url
				});
			},
			addRankin(list,index){
				this.xd_request_get(this.xdServerUrls.xd_challengeSave,{
					token:uni.getStorageSync('token'),
					pushId:list.id,		
					
				},true).then(res=>{
					if(res.resultCode == 0){
						 this.guanzhu="已关注"
						 uni.showToast({
						 	icon:'none',
						   title: '加入成功',
						 })
					}else{
						uni.showToast({
							icon:'none',
						  title: res.msg,
						})
					}
				})
			},
			getCardList(){
				this.xd_request_post(this.xdServerUrls.xd_pushByUserIdList,{
					token: uni.getStorageSync('token'),
					userId: uni.getStorageSync('id'),
					pageNum: 1,
					pageSize: 10,
				},true)
				.then(res=>{
					this.list=this.timeStamp(res);
					this.total=res.obj.total;
				})
			},
			timeStamp(res){
				let dataList=res.obj.list;
				for(var i=0;i <res.obj.list.length;i++){
					dataList[i].challengeRmb=Math.floor(dataList[i].challengeRmb/100);
					
				}
				return dataList;
			},
		},
		// 上拉加载
		onReachBottom() {
			this.getCardList()
		
		},
	}
</script>

<style  lang="scss">
	.selfCenter{
		padding:0 20rpx;
	}
.actionInfo{
	margin:24rpx 0;
	.tabbar{
		font-size: 28rpx;
		display: flex;
		justify-content: space-between;
		.tab{
			flex: 1;
			text-align: center;
			border-bottom: 1px solid #d9d9d9;
			padding:16rpx;
			&.active{
				border-bottom: 1px solid #fd5107;
				color:#fd5107;
			}
		}
	}
}
.start-add {
		width: 100upx;
		height: 100upx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
		background: #ffe66f;
		border: 2px solid #ffa700;
		border-radius: 50%;
		position: fixed;
		bottom: 100upx;
		right: 30upx;
		z-index: 99;
	}

	.start-add image {
		width: 48upx;
		height: 48upx;
	}

</style>
