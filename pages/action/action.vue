<template>
	<view class="action">
		<view class="actionInfo">
			<view class="tabbar">
				<view class="tab " :class="tab===0?'active':''" @click="tab=0">
					<text>行动 ({{total}})</text>
				</view>
				<view class="tab" :class="tab===1?'active':''" @click="tab=0">
					<text>围观 (0)</text>
				</view>
				<view class="tab" :class="tab===2?'active':''" @click="tab=0">
					<text>收藏 (0)</text>
				</view>
			</view>
			<view class="actionTabList">
				<view class="actionMy" v-show="tab===0">
					<actionlist v-for="(item,index) in cardList" :item="item" :key="index" :tab="tab" ></actionlist>
				</view>
				<view class="actionLook" v-show="tab===1">
					<actionlist  :tab="tab"></actionlist>
				</view>
				<view class="actionFavorite" v-show="tab===2">
					<actionlist v-for="(item,index) in cardList" :item="item" :key="index" :tab="tab"></actionlist>
				</view>
			</view>
		</view>	
		<view class="btn_bar">
			<view class="btns"><button class="btn" @click="goStep">制定新的行动项</button></view>
		</view>
		
		
	</view>
</template>

<script>
import actionlist from "@/components/actionlist.vue";
export default {
	data() {
		return {
			tab:0,//行动，围观，收藏
			cardList:[],
			pageNum:1,//当前页数
			pageSize:10,//每页条数
			total:'',
		};
	},
	onLoad() {
		this.inDada();
	},
	methods: {
		goStep(){
			uni.navigateTo({
				url: `/pages/action/step1`
			});
		},
		inDada(){
			let token='';
			let id='';
			try{
				token=uni.getStorageSync('token');
				id=uni.getStorageSync('id');
			}catch(e){
				//TODO handle the exception
			}
			   this.xd_request_post(this.xdServerUrls.xd_pushByUserIdList,
			   {
			   token:token,
			   userId:id,
			   pageNum:1,
			   pageSize:10,
			   },
			   false
			   
			       ).then(res=>{
					   console.log(res)
						 this.cardList=res.obj.list;
						 this.pageNum=res.obj.nextPage;
						 this.total=res.obj.total;
			   	}).catch(Error=>{
			   		console.log(Error)
			   	})
			   
			    
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
						mask:true
					})
					this.xd_request_post(this.xdServerUrls.xd_pushByUserIdList,
					{
						token:uni.getStorageSync('token'),
						userId:uni.getStorageSync('id'),
						pageNum:this.pageNum,
						pageSize:this.pageSize,
					},
					false
						   ).then(res=>{
							   this.pageNum=res.obj.nextPage;
							console.log(res.obj.list);		
							this.cardList = this.cardList.concat(res.obj.list);					
							setTimeout(function () {
							    uni.hideLoading()
							}, 1000);
							// uni.hideNavigationBarLoading();//关闭加载动画
							
						})
				}
				
	},
	onReachBottom() {
		this.getReachList()
	},
	onPullDownRefresh() {
		
	},
	components:{
		actionlist
	}
};
</script>

<style lang="scss">
.action {
	padding: 0 30rpx 150rpx 30rpx;
	font-size: 30rpx;
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
.btn_bar{
	position: fixed;
	bottom: 0;
	left:0;
	width: 100%;
	.btns {
		height: 120rpx;
		
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		font-size: 28rpx;
		.btn {
			flex: 1;
			height: 64rpx;
			line-height: 64rpx;
			background: #ffa700;
			// color: #fff;
			font-size: 28rpx;
		}
	}
}
</style>
