<template>
	<view>
		<view class="label-hint">投票规则：当反对者超过支持者后，组长同意后，被禁言。考察期内未确认前，支持者和反对者需缴纳10%的押金。如果确认加入支持者平均获得诚意金、反对押金（组长10%平台20%）。如果退出，反对者平均活动支持押金（组长10%平台20%）</view>
		<uni-grid :column="3" :show-border="false" :square="false" :showBorder="true">
			<uni-grid-item>
				<view style="margin-top: 10px;padding: 5px;">
					<view class="grid-item-layout">
						<image class="grid-img" src="../../../static/images/Body.png"></image>
					</view>
					<text class="grid-text">古耐特</text>
					<view style="display: flex;justify-content: space-between;">
						<text class="bg-green but-ly" hover-class="xd-but-active">支持 12</text>
						<text class="bg-red but-ly" hover-class="xd-but-active">反对 10</text>
					</view>
					<view style="margin-top: 5px;">
						<button class="bg-orange but-ly" hover-class="xd-but-active">结束投票</button>
					</view>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view style="margin-top: 10px;padding: 5px;">
					<view class="grid-item-layout">
						<image class="grid-img" src="../../../static/images/Body.png"></image>
					</view>
					<text class="grid-text">古耐特</text>
					<view style="display: flex;justify-content: space-between;">
						<text class="bg-green but-ly" hover-class="xd-but-active">支持 12</text>
						<text class="bg-red but-ly" hover-class="xd-but-active">反对 10</text>
					</view>
					<view style="margin-top: 5px;">
						<button class="bg-orange but-ly" hover-class="xd-but-active">结束投票</button>
					</view>
				</view>
			</uni-grid-item>
			<uni-grid-item>
				<view style="margin-top: 10px;padding: 5px;">
					<view class="grid-item-layout">
						<image class="grid-img" src="../../../static/images/Body.png"></image>
					</view>
					<text class="grid-text">古耐特</text>
					<view style="display: flex;justify-content: space-between;">
						<text class="bg-green but-ly" hover-class="xd-but-active">支持 12</text>
						<text class="bg-red but-ly" hover-class="xd-but-active">反对 10</text>
					</view>
					<view style="margin-top: 5px;">
						<button class="bg-orange but-ly" hover-class="xd-but-active">结束投票</button>
					</view>
				</view>
			</uni-grid-item>
		</uni-grid>
	</view>
</template>

<script>
	import uniGrid from "@/components/uni-grid/uni-grid.vue"
	import uniGridItem from "@/components/uni-grid-item/uni-grid-item.vue"
	export default {
		components: {
			uniGrid,
			uniGridItem
		},
		data() {
			return {
				group: '',
			}
		},
		methods: {

		},
		onLoad(option) {
			this.group = JSON.parse(decodeURIComponent(option.group));
		}
	}
</script>

<style>
	.grid-img {
		width: 70px;
		height: 70px;
	}

	.grid-text {
		margin-top: 10px;
		font-size: 13px;
		color: #626466;
	}

	.grid-item-layout {
		display: flex;
		flex-direction: column;
		justify-content: center;
		text-align: center;
		align-items: center;
	}

	.but-ly {
		height: 20px;
		display: flex;
		justify-content: center;
		text-align: center;
		align-self: center;
		align-content: center;
		border-radius: 3px;
		font-size: 10px;
		line-height: 20px;
		padding-left: 5px;
		padding-right: 5px;
	}

	.label-hint {
		font-size: 12px;
		padding: 10px;
		width: 100%;
	}
</style>
