<template>
	<view class="selfCenter">
		<view class="actionInfo">
			<text>选择需要加入挑战赛的行动、没有请新创建行动</text>
			<view class="actionTabList">
				<view class="actionMy" >
					<block v-for="(item, index) in list" :key="index">
						<indexList id="indexList" :list="item" :index="index" @gotoSponsor='gotoSponsor' 
						 v-on:addRankin="addRankin" :hasLogin="hasLogin" :userId='userId' :isRanking='isRanking'></indexList>
					</block>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import indexList from "@/components/indexList.vue";
	
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components:{
		
			indexList
		},
		data() {
			return {
				isRanking:'true',
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
			
			addRankin(e){
				if(this.guanzhu=="已关注"){
					return
				}
				this.xd_request_post(this.xdServerUrls.xd_saveAttention,{
					userId:uni.getStorageSync('id'),
					attentionUserId:e.id,		
					
				},true).then(res=>{
					if(res.resultCode == 0){
						 this.guanzhu="已关注"
						 uni.showToast({
						 	icon:'none',
						   title: '关注成功',
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
				this.xd_request_post(this.xdServerUrls.xd_pushByCreateTimeList,{
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
		}
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

</style>
