<template>
	<view>
		<web-view :webview-styles="webviewStyles" :src="tyInfo.url"></web-view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					progress: {
						color: '#FF3333'
					}
				},
				tyInfo:{},
				urlinfo: "http://zhidashixun.mikecrm.com/gTo9azg"
			}
		},
		onLoad(option) {
			this.tyInfo = JSON.parse(option.tyInfo);
		},
		methods: {

		}
	}
</script>

<style>

</style>
