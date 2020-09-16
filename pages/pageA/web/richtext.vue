<template>
	<rich-text :nodes="strings">
		</rich-text>
</template>

<script>
	export default {
			data() {
				return {
					strings: '',
				};
			},
			onLoad(val) {
				console.log(val);
				this.strings = decodeURIComponent(val.url) //解码网址
			},
		}
</script>

<style>
</style>
