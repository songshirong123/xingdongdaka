<template>
	<view>
		<view style="width: 100%;font-size: 12px;color: #555555;padding: 10px;">所有标签</view>

		<view style="width: 100%;">
			<view :class="['nav-item', lableId == item.id ? 'nav-active' : '']" v-for="(item, index) in tabsList" @tap="navChange(item)">
				<view class="nav-item-title">
					{{item.labelName}}
				</view>
			</view>
		</view>
		<view style="width: 100%;padding: 5px;margin-top: 20px;">
			<button class="bg-orange" @tap="labletake">完成</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lableId: 0,
				tabsList: [],
				lable:{}
			}
		},
		methods: {
			navChange(lable) {
				this.lableId = lable.id;
				this.lable=lable;
			},
			labletake(){
				this.xdUniUtils.xd_setStorageSync("selectlable",this.lable);
				this.xdUniUtils.xd_navigateBack(1);
			},
			//获取标签
			getlable() {
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_label, {}, false).then((res) => {
					if (_this.lableId == 0) {
						_this.lableId = res.obj[0].id;
						_this.lable = res.obj[0];
					}
					_this.tabsList = res.obj;
					console.log("获取标签", _this.tabsList);
				}).catch(err => {});
			},
		},
		onLoad(option) {
			this.lableId = option.lableid;
			this.getlable();
		}
	}
</script>

<style lang="scss">
	.nav-item {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
		margin: 5px;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 3px;
		padding-bottom: 3px;
		background: #FFFFFF;
		border-radius: 30upx;
		border: 1px solid #626466;
		font-size: 12px;

		.nav-item-title {
			font-size: 26rpx;
			line-height: 36rpx;
			width: 100%;
		}
	}

	.nav-item.nav-active {
		border: 1px solid #fd5107;

		.nav-item-title {
			color: #fd5107;
		}
	}
</style>
