<template>
	<view>
		<scroll-view scroll-x class="bg-white nav">
			<view class="flex text-center">
				<view class="cu-item flex-sub" :class="index==TabCur?'text-orange cur':''" v-for="(items,index) in ['未达成','待审核','已审核']"
				 :key="index" @tap="tabSelect" :id="index">
					{{items}}
				</view>
			</view>
		</scroll-view>
		<!-- 事件内容 -->
		<view v-for="(item,index) in actionList" @tap="selectGroup(item)" :key="index" style="padding: 10px;border-bottom: 1px solid #f0f0f0;background-color: #FFFFFF;">
			<view class="xd-rows">
				<text class='thin' style="margin-left: 5px;">{{item.Name}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				TabCur: 0,
				actionList:[]
			}
		},
		methods: {
			tabSelect(e) {
				this.TabCur = e.target.id;
			},
		}
	}
</script>

<style>

</style>
