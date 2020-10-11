<template>
	<view>
		<usershow :list="userInfo" :guanzhu="guanzhu" :lookerCount="lookerCount" :likeCount="likeCount" v-on:clidtags='clidtags'
		 :userId="userId"></usershow>
	</view>
</template>

<script>
	import usershow from "@/components/usershow.vue"
	export default {
		data() {
			return {
				userId: '',
				userInfo: '',
				lookerList: [],
				lookTotal: 0,
				lookerCount: 0,
				likeCount: 0,
				guanzhu: '关注'

			}
		},
		methods: {
			getUserInfo() {
				this.xd_request_post(this.xdServerUrls.xd_getUserInfoByUserId, {
						userId: this.userId,
					}, true)
					.then(res => {
						this.userInfo = res.obj;
						// this.$set(this.userInfo,res.obj)
					})
			},

		},
		onLoad(option) {
			this.userId = option.userId;
			this.getUserInfo();

		}
	}
</script>

<style>

</style>
