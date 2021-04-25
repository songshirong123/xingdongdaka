<template>
	<view>
		<uni-list>
			<block v-for="(item, index) in cityList" :key="item">
				<view class="xd-rows item-ly" @click="selectCity(item)" >
					<text style="font-size: 14px;">{{item.fullname}}</text>
				</view>
			</block>
		</uni-list>
	</view>
</template>

<script>
	var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
	export default {
		data() {
			return {
				cityList: []
			}
		},
		methods: {

			//选择城市
			selectCity(item){
				item.title=item.fullname;
				item.address="";
				console.log("selectCity");
				console.log(item);
				this.xdUniUtils.xd_setStorageSync("selectCity",item);
				this.xdUniUtils.xd_navigateBack(1);
				
			},
		},
		onLoad() {
			var qqmapsdk = new QQMapWX({
				key: 'S4EBZ-MKCCV-ECYPE-UFCS3-XUJEV-AJBEM' // 必填
			});
			let that =this;
			qqmapsdk.getCityList({
				success: function(res) { //成功后的回调
					// console.log(res);
					that.cityList = res.result[0];
					console.log('省份数据：', res.result[0]); //打印省份数据
					// console.log('城市数据：', res.result[1]); //打印城市数据
					// console.log('区县数据：', res.result[2]); //打印区县数据
				},
				fail: function(error) {},
				complete: function(res) {}
			});
		}
	}
</script>

<style>
.item-ly {
		border-bottom: 1px solid #F0F0F0;
		background-color: #FFFFFF;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 15px;
		padding-bottom: 15px;
	}
</style>
