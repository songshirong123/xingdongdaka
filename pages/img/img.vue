<template>
	<view class="previewImg" >
		<view class="mask" v-if="imgType">
			<swiper @change="changeSwiper" class="my_swiper" :current="current" :circular="circular" :indicator-dots="indicatorDots" :autoplay="autoplay" :duration="duration">
				<swiper-item v-for="(x, y) in picList" :key="y">
					<view class="bg_img" :style="{ backgroundImage: 'url('+x+')'}"></view>
				</swiper-item>
			</swiper>
		</view>
		<view class="page" v-if="picList.length>0">{{ current + 1 }} / {{ picList.length }}</view>
		<view class="mask" v-if="!imgType">
			<image :src="img"></image>
		</view>
	</view>
</template>

<script>
export default { 
	data() {
		return {
			picList: [],
			indicatorDots: false,
			autoplay: false,
			duration: 500,
			circular: true,
			current: 0,
			isShowSwiper: false,
			img:'',
			imgType:true,
		};
	},
	onLoad(option) {
		this.index(option);
	}, 
	methods: {
		index(option){
			var url=JSON.parse(decodeURIComponent(option.url)).toString();
			var notS = url.split(':')[0];
			var a = notS.indexOf('ps') > -1;
			if(a){
				this.picList.push(url);	
				this.imgType=true;
			}else{
				this.imgType=false;
				var num=Math.floor(Math.random()*8+1);
				this.img='../../static/images/icon/img/title'+num+'.png'
			}			
		},
		clickPic(index) {
			this.current = index;
			this.isShowSwiper = true;
		},
		changeSwiper(e) {
			this.current = e.target.current;
		}
	}
};
</script>

<style lang="scss" scoped>
.page {
	position: fixed;
	z-index: 6;
	color: #fff;
	bottom: 20rpx;
	text-align: center;
	width: 100%;
}
.mask {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: #000;
	z-index: 5;
	> .my_swiper {
		width: 100%;
		height: 60vh;
		.bg_img {
			background-size: 100% auto;
			background-repeat: no-repeat;
			background-position:center;
			width: 100%;
			height: 100%;
		}
	}
}

.pic_list {
	display: flex;
	flex-flow: row wrap;
	> view {
		flex: 0 0 33.3vw;
		height: 33.3vw;
		padding: 1vw;
		> image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>