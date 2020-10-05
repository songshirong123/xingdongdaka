<template>
	<view class="padding-xs">
		<rich-text :nodes="strings">
		</rich-text>
	</view>
</template>

<script>
	export default {
			data() {
				return {
					strings: '',
				};
			},
			onShareAppMessage(res) {
				
					// return {
					// 	title: 
					// 	path: 
					// 	imageUrl: ,
					// }
				
			},
			onLoad(val) {
				this.strings = decodeURIComponent(val.url) //解码网址
			},
		}
</script>

<style>
</style>
