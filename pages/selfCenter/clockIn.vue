<template>
	<view class="clockIn">
		<form @submit="submitFrom">
			<view class="uni-form-item uni-column cl-time">
				<view class="form-item clockbar">
					<view class="clockImg"><img src="../../static/images/icon/clock.png" alt="" /></view>
					<view class="itembtns timeBtns">
						<button class="btn" hover-class='default' :loading='buttonStart' @tap="timingStart" :disabled='buttonStart'>开始</button>
						<button class="btn" hover-class='default' @tap="stop" :disabled='!buttonStart'>完成</button>
					</view>
				</view>
				<view class="form-item timetr">
					<text>记时：</text>
					<text >{{times}}</text>
					<text class="timesplit">-</text>
					<text class="timetxt" >{{startTime}}</text>
				</view>
				<view class="form-item timetr">
					<text>时长：</text>
					<text>{{dayData}}</text>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="form-item nobtm mediaList">
					<!-- <view class="section" >
						<audio style="text-align: left" :src="current.src" :name="current.name" :author="current.author" :action="audioAction" controls></audio>
					</view> -->
					<!-- <view class="section">
						<video
							id="myVideo"
							src="https://dcloud-img.oss-cn-hangzhou.aliyuncs.com/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126.mp4"
							controls
						></video>
					</view> -->
					<view class="section">
						<image  class="imagetip" v-show="param.pictures" :src="param.pictures" ></image>
						<view class="imagetip"  v-show="!param.pictures" >
							<view class="imagetipicon">
								<text>+</text>
							</view> 
						</view> 
					</view>
				</view>
				<view class="form-item nobtm itembtns">
					<button class="btn" @click="popUpImg">上传图片</button>
					<button class="btn">上传视频</button>
					<button class="btn">上传音频</button>
				</view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">描述</view>
				<view class="form-item nobtm"><textarea class="inputarea" name='content' placeholder="请输入描述" maxlength="250" /></view>
			</view>
			<view class="uni-form-item uni-column">
				<view class="title">概况</view>
				<view class="form-item nobtm"><textarea class="inputarea" name='extendContent' placeholder="请输入概况" maxlength="250" /></view>
			</view>
			<view class="btn_bar">
				<view class="btns"><button class="btn" form-type="submit" >提交</button></view>
			</view>
		</form>
	</view>
</template>

<script>
export default {
	data() {
		return {
			buttonStart:false,
			times:'',
			startTime:'',
			endTime:'',
			duration:'',
			timeHour :'', // 小时
			timeMinute :  '',// 分钟
			timeSecond :'', // 秒
			hour:'', // 小时
			minute:'', // 分钟
			second:'', // 秒
			strtime : '2020-05-21 00:00:00:000',
			timeCount:'',
			dayData:'',
			param:{
				pictures:""
			},
			pushId:'',
			startTimes:undefined,
			endTimes:undefined
			
		};
	},
	onLoad(option) {
		console.log(option.pushId)
		this.pushId=option.pushId;
		this.getTime();
	},
	methods: {
		submitFrom(e){
			if(this.endTimes==undefined){
				uni.showToast({
				    title: '计时以后才能提交',
					mask:true,
				    duration: 1000,
					image:'/static/images/icon/clock.png'
				});
				return false
			};
			if(e.detail.value.content==''){
				uni.showToast({
				    title: '描述不能为空',
					mask:true,
				    duration: 1000,
					image:'/static/images/icon/clock.png'
				});
				return false
			}
			this.xd_request_post(this.xdServerUrls.xd_savePushCard,{
				pushId:this.pushId,
				userId:uni.getStorageSync('id'),
				content:e.detail.value.content,
				extendContent:e.detail.value.extendContent,
				pictures:this.param.pictures,
				startTime:this.startTimes,
				endTime:this.endTimes,
			},false).then(res=>{
				
			})
			
		},
		popUpImg(){
			const that = this;
			uni.chooseImage({
			    count: 1, //默认9
			    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
			    sourceType: ['album'], //从相册选择
			    success: function (res) {
					let tempFilePaths = res.tempFilePaths;
					 uni.uploadFile({
					            url: that.xdServerUrls.xd_uploadFile, 
					            filePath: tempFilePaths[0],
					            name: 'files',
					            formData: {
					                'userId': uni.getStorageSync('id'),
					            },
					            success: (uploadFileRes) => {
			
									that.param.pictures=JSON.parse(uploadFileRes.data).obj[0];
					               
					            }
					        });
			    }
			});
		},
		getTime(){
			let _this = this;
		var date = new Date(),
		 hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
		 minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
		 second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
		  _this.hour=hour;
		   _this.minute=minute;
		    _this.second=second;
			_this.startTimes=date
		var timer = hour + ':' + minute + ':' + second;
		_this.times=timer;
		},
		timingStart() {
		    let _this = this;
			  _this.getTime();
		     _this.timeCount=setInterval(function() {
		        var nowTime = (Date.parse(new Date())) / 1000;
		      
		        var date = new Date(_this.strtime.replace(/-/g, '/'));
		        var time3 = (Date.parse(date)) / 1000;
		        var time4 = nowTime - time3;
		        var timeDay = Math.floor(time4 / 60 / 60 / 24);
		        var timeHour = Math.floor(time4 / 60 / 60) - timeDay * 24;
		        var timeMinute = Math.floor(time4 / 60) - timeDay * 24 * 60 - timeHour * 60;
		        var timeSecond = Math.floor(time4) - timeDay * 24 * 60 * 60 - timeHour * 60 * 60 - timeMinute * 60;
		        _this.timeHour = timeHour; // 小时
		        _this.timeMinute = timeMinute; // 分钟
		        _this.timeSecond = timeSecond; // 秒
				 _this.startTime = timeHour + ':' + timeMinute + ':' + timeSecond;
		    }, 1000);
			this.buttonStart=!this.buttonStart;
			},	
			stop(){
				var dd=new Date();
				clearInterval(this.timeCount); 
				this.endTimes=dd;
				this.getDateCha(this.startTimes,dd);
				this.buttonStart=!this.buttonStart;
			},
			getDateCha(beginDate,endDate){  
			    var res={D:0,H:0,M:0,S:0,abs:true,error:false};  
			    //属性形式验证：第一次参数必须是Date类型，第二个参数可以为空，默认为new Date()  
			    if(typeof(endDate)=="undefined" || null== endDate||""==endDate ){endDate = new Date();}  
			    if( !(beginDate instanceof (Date)) ||  !(endDate instanceof (Date))){  
			        res.error=true;//"非法时间字符串";  
			        return res;  
			    }  
			  
			    //比较大小，保证差值一定是正数。  
			    if(beginDate>endDate){  
			        var tempDate = beginDate;  
			        beginDate = endDate;  
			        endDate=tempDate;  
			        res.abs=false;//表示beginDate大于endDate  
			    }  
			    var chaTime =(endDate.getTime()-beginDate.getTime());  
			      
			    var Day_Param  =1000*60*60*24;//一天等于毫秒数  
			    var Hour_Param = 1000*60*60;//一小时等于毫秒数  
			    res.D =Math.floor(chaTime/(Day_Param));//  
			  
			    chaTime = chaTime-res.D*Day_Param;//减去天的毫秒数。再求小时个数  
			    res.H = Math.floor(chaTime/(Hour_Param));  
			    chaTime = chaTime-res.H*Hour_Param;//减去小时的毫秒数。再求分钟个数  
			    res.M = Math.floor(chaTime/(1000*60));  
			    res.S=(chaTime-res.M*1000*60)/1000;//减去分钟的毫秒数。再求秒的个数  
			    //alert(res.S);  
			   console.log(res)
			   this.dayData= res.H+":"+res.M+":"+Math.trunc(res.S);  
			   
			}  
			
	},
};
</script>

<style lang="scss">
.clockIn {
	padding: 30rpx 30rpx 150rpx 30rpx;
	font-size: 30rpx;
}
.imagetip{
		border:4px solid #eee;
		color:#eee;
		position: relative;
		width:200rpx;
		height: 150rpx;
		// line-height: 100rpx;
		font-size: 100rpx;
		text-align: center;
		margin-left: 35%;
	}
.clockbar {
	height: 100rpx;
	// line-height: 60rpx;

	display: flex;
	align-items: center;
	justify-content: space-between;
	img {
		display: block;
		height: 85rpx;
		width: 85rpx;
	}
}
.cl-time {
	.timetr {
		margin: 12rpx 0 0 0;
		.timesplit {
			margin: 0 15rpx;
		}
	}
}
.uni-form-item {
	.title {
		padding: 15rpx 0;
		font-weight: bold;
	}
	.form-item {
		margin-bottom: 12rpx;
		padding: 0 20rpx;
		&.mediaList {
			min-height: 200rpx;
			// border: 1px solid #dfdfdf;
			margin: 20rpx 10rpx;
			border-radius: 5px;
			display: flex;
			align-items: center;
			.section{
				width:100%;
				margin-bottom: 12rpx;
				audio{
					width: 100%;
				}
				video{
					width: 100%;
				}
			}
		}
	}
}
.inputarea {
	border: 1px solid #dfdfdf;
	border-radius: 5px;
	padding: 20rpx;
	height: 130rpx;
}
.btn_bar {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	.btns {
		height: 120rpx;

		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		font-size: 28rpx;
		.btn {
			flex: 1;
			height: 64rpx;
			line-height: 64rpx;
			background: #ffa700;
			// color: #fff;
			font-size: 28rpx;
		}
	}
}
.itembtns {
	flex: 1;
	display: flex;
	justify-content: flex-end;
	align-items: center;
}
.btn {
	display: block;
	font-size: 26rpx;
	height: 50rpx;
	line-height: 50rpx;
	background: $xd-color-base;
	width: 200rpx;
	margin: 0 20rpx 0 0;
	&.other {
		background: #fd5107;
		color: #fff;
	}
}
</style>
