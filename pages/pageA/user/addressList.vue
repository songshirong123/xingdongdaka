<template>
	<view>
		<view class="xd-rows item-ly">
			<view style="flex: 3;color: #007aff;">
				不显示位置
			</view>
			<view  @click="selectNoAddress"  style="flex: 1;display: flex;flex-direction: column;justify-content: right;text-align: right;align-items: flex-end;">
				<text v-if="isNoPoi" class="cuIcon-radiobox" style="color: #f0ad4e;"></text>
			</view>
		</view>
		<uni-list>
			<block  v-for="(item,index) in addressList" :key="item">
				<view class="xd-rows item-ly">
					<view style="flex: 2;display: flex;flex-direction: column;" @click="selectCity(index)">
						<text style="font-size: 14px;">{{item.title}}</text>
						<text v-if="item.address!=''" style="color: #555555;font-size: 12px;">{{item.address}}</text>
					</view>
					<view @click="selectAddress(item)" style="flex: 1;display: flex;flex-direction: column;justify-content: center;text-align: right;align-items: flex-end;">
						<text v-if="item.isSelect" class="cuIcon-radiobox" style="color: #f0ad4e;"></text>
					</view>
				</view>
			</block>
		</uni-list>

	</view>
</template>

<script>
	var QQMapWX = require('../../../utils/qqmap-wx-jssdk.js');
	var qqmapsdk = null;
	export default {
		data() {
			return {
				addressList: [],
				address: {},
				isNoPoi: true
			}
		},
		methods: {

			//城市选择
			selectCity(index) {
				if (index == 0)
					uni.navigateTo({
						url: "./cityList"
					})

			},
			selectNoAddress(){
				this.xdUniUtils.xd_setStorageSync("selectAddress", null);
				this.xdUniUtils.xd_navigateBack(1);
			},

			//选择地址
			selectAddress(item) {
				if (item.isSelect)
					return;

				this.isNoPoi = false;
				console.log("selectAddress");
				console.log(item);
				this.xdUniUtils.xd_setStorageSync("selectAddress", item);
				this.xdUniUtils.xd_navigateBack(1);

			},

			//获取地址列表
			getAddressList(longitude, latitude) {
				let location = latitude + "," + longitude;
				let that = this;
				qqmapsdk.reverseGeocoder({
					location: location,
					get_poi: 1,
					poi_options: "radius=5000",
					success: function(res) { //成功后的回调
						console.log(res);
						var res = res.result;
						var city={
							isSelect:false,
							address:"",
							title:res.ad_info.city,
							id:res.ad_info.adcode,
							ad_info:res.ad_info,
							location:res.ad_info.location
						}
						// res.ad_info.title = res.ad_info.city;
						// res.ad_info.address = "";
						// res.ad_info.isSelect = false;
						// res.ad_info.id = res.ad_info.adcode;
						// res.ad_info.ad_info =res.ad_info;
						var mks = [];
						mks.push(city);
						for (let i in res.pois) {
							res.pois[i].isSelect = false;
							let address = that.address;
							if (!that.xdUniUtils.IsNullOrEmpty(address)) {
								if (address.id == res.pois[i].id) {
									res.pois[i].isSelect = true;
									that.isNoPoi = false;
								}

							}
							mks.push(res.pois[i]);
						}
						console.log(mks);
						that.addressList = mks;
					},
					fail: function(error) {},
					complete: function(res) {}
				})
			}
		},
		onShow() {
			let city = this.xdUniUtils.xd_getStorageSync("selectCity");
			if (!this.xdUniUtils.IsNullOrEmpty(city)) {
				this.getAddressList(city.location.lng, city.location.lat);
			}

		},

		onLoad(option) {
			let address = this.xdUniUtils.xd_getStorageSync("selectAddress");
			if (!this.xdUniUtils.IsNullOrEmpty(address)) {
				this.address = address;
			}


			qqmapsdk = new QQMapWX({
				key: 'S4EBZ-MKCCV-ECYPE-UFCS3-XUJEV-AJBEM' // 必填
			});
			let that = this;
			uni.getLocation({
				type: 'wgs84',
				success: function(res) {
					console.log(res);
					console.log('当前位置的经度：' + res.longitude);
					console.log('当前位置的纬度：' + res.latitude);
					that.getAddressList(res.longitude, res.latitude);
				}
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
