<template>
	<view>
		<web-view :webview-styles="webviewStyles" src="http://zhidashixun.mikecrm.com/gTo9azg"></web-view>

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
				urlinfo: "http://zhidashixun.mikecrm.com/gTo9azg"
			}
		},
		onLoad(option) {},
		methods: {

		}
	}
</script>

<style>

</style>
