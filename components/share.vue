<template>
	
	<view class="cu-modal" :class="show?'show':''">
		<view class="cu-dialog shareImg">
			<view class="bg-img" :style="[{backgroundImage: 'url('+url+')',height:config.height+80+'px'}]" style="background-size: contain;">
				<view class="cu-bar justify-end text-white">
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close text-bold text-black"></text>
					</view>
				</view>
			</view>
		</view>
		<view class="flex flex-wrap  bg-share" :style="{'margin-top':'-'+config.height*0.18+'px'}">
			<button class="cu-btn block bg-blues  sharebtn" @click="saveEwm">
				<text class="cuIcon-down"></text>下载图片发朋友圈</button>
			<button class="cu-btn block bg-green  sharebtn margin-left-sm" open-type="share"  >
				分享链接
			</button>	
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: 0,
				show: false,
				config: {},
				url:'',
				
			};
		},
		props:{
			contentHeight:{
				type: Number,
				default: 0
			},
			
		},
		created() {
			const height = uni.upx2px(this.safeAreaHeight) ;
			this.config = {
				height: height
			}
			
		},
		methods:{
			hideModal(){
				this.show = false
			},
			toggleMask(name,path,op,img){
				
				//防止高频点击
				if(this.timer == 1){
					return;
				}
				this.timer = 1;
				setTimeout(()=>{
					this.timer = 0;
				}, 500)
				
				
				if(this.show){
					this.show = false
				}else{
					this.getImg(name,path,op,img)
					
				}
				
			},
			
			saveEwm:function(index){
				if(this.timer == 1){
					return;
				}
				this.timer = 1;
				setTimeout(()=>{
					this.timer = 0;
				}, 500)
					 var thant=this;
						//获取相册授权
						uni.getSetting({
							 success(res) {
							   if (!res.authSetting['scope.writePhotosAlbum']) {
								 uni.authorize({
								   scope: 'scope.writePhotosAlbum',
								   success() {
									 //这里是用户同意授权后的回调
									 thant.dow();
								   },
								   fail() {//这里是用户拒绝授权后的回调
									   thant.openSettingBtnHidden=false
								   }
								 })
							   } else {//用户已经授权过了
								 thant.dow();
							   }
							 }
						})
						  
					},
				getImg(name,path,op,img){
					var that=this;
					uni.showLoading({
						title:'生成海报中...',
						mask:true,
						
					})
					setTimeout(()=>{
						uni.hideLoading()
					}, 6000)
					const tc=name.split(':')
					
					const title=tc[0]
					 tc.shift()
					var content=''	
					tc.forEach(ite=>{
					content=content+ite
						
					})
						that.xd_request_get(that.xdServerUrls.xd_createQr,{
							url:path+'?'+op,
							title:title,
							content:content,
							file:img?img:''
						},true
						   ).then(res => {
							   that.url=res.obj
							   this.show = true
							   uni.hideLoading()
							   })
					},	
				dow(){
					var that=this;
						  uni.downloadFile({
						  		url: that.url,
						  		success: (res) =>{
						  			if (res.statusCode ===200){
						  				uni.saveImageToPhotosAlbum({
						  					filePath: res.tempFilePath,
						  					success: function() {
						  						uni.showToast({
						  							title: "已保存分享图",
						  							icon: "none"
						  						});
												that.toggleMask();
												
						  					},
						  					fail: function() {
						  						uni.showToast({
						  							title: "保存失败",
						  							icon: "none"
						  						});
												that.toggleMask();
												
						  					}
						  				});
						  			}
						  		}
						  	})
				
				}
				
			}
		
	}
</script>

<style lang='scss'>
	.shareImg{
		width: 474upx;
		margin-top: 50upx;
		
	}
	
	button::after{
		
		border:none;
	}
	.bg-share{
		width: 84%;
		justify-content: flex-end;
	}
	.sharebtn{
		width: 150uxp;
		height: 55upx;
		color: #FFFFFF;
	
		/* display: flex;
		flex-direction: column; */
		/* background: none !important; */
	}
</style>
