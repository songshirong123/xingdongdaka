// 保存数据
function xd_setStorage(keyParm, dataParm) {
	uni.setStorage({
		key: keyParm,
		data: dataParm
	});
}
// 保存数据，同步
function xd_setStorageSync(keyParm, dataParm) {
	try {
		uni.setStorageSync(keyParm, dataParm);
	} catch (e) {
		console.log('setStorageSync error');
	}
}
// 获取数据，同步
function xd_getStorageSync(keyParm) {
	try {
		const value = uni.getStorageSync(keyParm);
		return value;
	} catch (e) {
		console.log('getStorageSync error');
	}
}
/*** 设置token */
function xd_setAccessToken(token) {
	xd_setStorageSync('access_token', token);
}
/*** 获取token */
function xd_getAccessToken() {
	return xd_getStorageSync('access_token');
}
/** *************** alert 相关 *********************** */
// 弹出框
function xd_showToast(title, time,icon, callbackFun) {
	uni.showToast({
		title: title,
		duration:time,
		icon: icon ? icon : "none",
		success: function(res) {
			if (typeof(callbackFun) != "undefined" && callbackFun != null) {
				callbackFun(); // 回调函数
			}
		}
	});
}
// // 弹出框:操作成功
// function xd_showToast_success(title, callbackFun) {
// 	uni.showToast({
// 		icon: "success",
// 		success: function() {
// 			if (typeof(callbackFun) != "undefined" && callbackFun != null) {
// 				callbackFun(); // 回调函数
// 			}
// 		}
// 	});
// }
// // 弹出框:操作成功并跳转
// function xd_showToast_success_redirectTo(pageUrl) {
// 	xd_showToast_success(null, function() {
// 		uni.redirectTo({
// 			url: pageUrl // 跳转到页面
// 		});
// 	});
// }
// // 弹出框:操作成功并返回上一级
// function xd_showToast_success_navigateBack() {
// 	xd_showToast_success(null, function() {
// 		uni.navigateBack({
// 			delta: 1
// 		});
// 	});
// }
// // 弹窗，操作完成后返回上一级
// function xd_showToast_navigateBack(toastTitle) {
// 	uni.showToast({
// 		title: toastTitle,
// 		success: function() {
// 			uni.navigateBack({
// 				delta: 1
// 			})
// 		}
// 	});
// }
// // 确认操作
// function xd_showModal_confirm(title, message, showCancelBut, okCallbackFun, cancelCallbackFun) {
// 	uni.showModal({
// 		title: title || '操作确认',
// 		content: message || '您确定要执行该操作吗？！',
// 		showCancel: !showCancelBut ? showCancelBut : true,
// 		success: function(res) {
// 			if (res.confirm) {
// 				if (typeof(okCallbackFun) != "undefined" && okCallbackFun != null) {
// 					okCallbackFun();
// 				}
// 			} else if (res.cancel) {
// 				if (typeof(cancelCallbackFun) != "undefined" && cancelCallbackFun != null) {
// 					cancelCallbackFun();
// 				}
// 			}
// 		}
// 	});
// }

/** ***************request 相关*********************** */
// 请求 url：请求路径，params请求参数，method：方法,请求header，
function xd_request(url, method, params, headers) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method || 'POST', // 默认get请求
			data: params || {},
			header: headers || {},
			dataType: "json",
			
			success: function(res) {
				var d = res;
				if (d.data.resultCode == 10002) {					
					      // 清除登录相关内容
						try {
						  uni.removeStorage('userInfo');
						  uni.removeStorage('id');
						  uni.removeStorage('token');
						} catch (e) {
						}
						// 切换到登录页面
						uni.reLaunch({
						  url: '/pages/login/login'
						});
							  
				} else if(d.data.resultCode ==0||d.data.status==1){
						resolve(d.data);
				}else{
					
					resolve(d.data);
				}
			},
			fail: function(err) {
				uni.showToast({
				  title: err.errMsg
				})
				console.log(err)
				reject(err);
			}
		});
	}).catch((e)=>{
		
	})
}
// 简单request get
function xd_request_get(url, params, withToken) {
	var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
	if (withToken !== false) {
		var accessToken = xd_getAccessToken(); // token
		headers = { // application/json
			'access_token': accessToken // accessToken
		};
	}
	return xd_request(url, 'GET', params, headers);
}
// post请求 url：请求路径，请求header，params请求参数
function xd_request_post(url, params, withToken) {
	var headers = {
		'content-type': 'application/x-www-form-urlencoded',
	};
	// if (withToken !== false) {
		var token = uni.getStorageSync('token'); // token
		if(token==undefined){
			uni.reLaunch({
			  url: '../login/login'
			});
		}
		headers.token = token; // accessToken
	// }
	return xd_request(url, 'POST', params, headers);
}
// 上传
function xd_request_upload(url, params, withToken) {
	var headers = {
		'content-type': "multipart/form-data",
	};
	// if (withToken !== false) {
		
		var token = uni.getStorageSync('token');// token
		if(token==undefined){
			uni.reLaunch({
			  url: '../login/login'
			});
		}
		headers.session_token = token; // accessToken
	// }
	return xd_request(url, 'POST', params, headers);
}
//图片检查
function xd_request_img(data) {
return	new Promise((resolve, reject) => {
	 uni.uploadFile({
	           url: 'https://xingdongdaka.zhidashixun.com/login/getImgIsNormal', 
	           filePath: data,
	           name: 'file',
			   header: {
			          "Content-Type": "multipart/form-data"//记得设置
			        },
	           formData: {
	               
					'token':uni.getStorageSync('token')
	           },
	           success: (uploadFileRes) => {
				            var jsonObj = JSON.parse(uploadFileRes.data);
				            var jsonObj1 = JSON.parse(jsonObj.obj);
					if(jsonObj1.errcode==0
					){
						resolve(true);
					}	else{
						uni.showToast({
							title:'图片不符规定',
							duration:2000
						});
						resolve(false);
					}				
					;
										
	           }
	       });
		    });
}
// 类容检查
function xd_request_text(params) {
var headers = {'Content-Type': 'application/x-www-form-urlencoded'};
var url='https://xingdongdaka.zhidashixun.com/login/getContentIsNormal'
	headers.token = uni.getStorageSync('token');
	return xd_request(url, 'GET', params, headers);
}
// 简单操作
function xd_request_simpleOperate(url, message) {
	var okCallbackFun = function() {
		xd_request_post(url, null, true);
	};
	xd_showModal_confirm(null, message, true, okCallbackFun);
}
// 删除
function xd_request_delete(url, ) {
	xd_request_simpleOperate(url, "确定要删除该条数据吗？");
}
// 返回上一级。delta：返回的页面数，如果 delta 大于现有页面数，则返回到首页
function xd_navigateBack(delta) {
	uni.navigateBack({
		delta: delta
	})
}
//时间处理
 function xd_timestampToTime(timestamp,times,times1,times2) {
  var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1)  : date.getMonth()+1) + '-';
  var D = date.getDate() < 10 ? '0'+ date.getDate() : date.getDate();
  if(times){
	  var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	  var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
	  // var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() ;
	   return M+D+ ' '+h+m;
  }
  if(times1){
  	
	 var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	 var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
	 var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds() ;
  	  return Y+M+D+ ' ' + h+m+s;
  }
  if(times2){
  	
	 var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
	 var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() ;
  	 return Y+M+D + ' '+ h+m;
  }
  return Y+M+D;
}
//获取今天只后日期

function xd_daysAddSub(date, num) {
            let d = new Date(date);
            let newD = new Date(d.setDate(d.getDate() + num));//设置天数 +1 天
			var Y = newD.getFullYear() + '-';
			var M = (newD.getMonth()+1 < 10 ? '0'+(newD.getMonth()+1) : newD.getMonth()+1) + '-';
			var D = newD.getDate() + ' ';
			var h = newD.getHours() + ':';
			var m = newD.getMinutes() ;
			
            return Y+M+D+h+m;
}

//数据校验
//电话
function xd_isValidPhone(str) {
  var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
  if (!myreg.test(str)) {
    return false;
  } else {
    return true;
  }
}
//大图浏览
function xd_showImg(list,num) {
	var ig=[];
	if(Array.isArray(list)){
		ig=list;
	}else{
		ig=list.split(",");
	}
	
  uni.previewImage({
  	current:num?num:0,
	urls:ig,
  })
}
//随机图片
function xd_randomImg(index) {
	var ig=["https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187819589.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187851035.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187868290.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187888025.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187912470.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605187930074.png"
	];
	var imges=["https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605794511337.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605794534523.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605794556624.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605794579223.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605794592931.png",
	"https://chucun2019.oss-cn-beijing.aliyuncs.com/dynamic/1605794613523.png"
	];
	var num=Math.floor(Math.random()*5+1);
	if(index==1){
		return imges[num]
	}else{
		return ig[num]
	}
}
//分享
function xd_onShare(title, path, imageUrl) {
  //设置一个默认分享背景图片
 
  let defaultImageUrl =  this.xd_randomImg(1);
  let defaultTitle="科学乐趣达目标 - 志趣相投交朋友";
  let defaultPath="/pages/index/index";
 
  return {
    title: title ?title: defaultTitle,
    path: path ? path: defaultPath,
    imageUrl: imageUrl ?imageUrl: defaultImageUrl,
    success(res) { 
      console.log("转发成功！");
    },
    fail: function (res) {
      console.log("转发失败！");
    }
  };
}
/**
 * 
 *Tab红点提示
 */
const updateNumber = function(gnumber) {

	if (gnumber < 1) {
		uni.removeTabBarBadge({
			index: 2
		})
	} else if (gnumber > 999) {
		uni.setTabBarBadge({
			index: 2,
			text: "999+"
		});
	} else {
		uni.setTabBarBadge({
			index: 2,
			text: gnumber + ""
		});
	}
	// uni.setStorage({
	// 	key: "gnumber",
	// 	data: gnumber
	// })
};
//登录检测
function xd_login(e,nav){
	if(!e){
		
		if(nav){
			uni.reLaunch({
			  url: '/pages/login/login'
			});
			
		}else{
			uni.navigateTo({
				url:'/pages/login/login'
			})
			return false;
		}			
		return false;
	}
}
//广告组件
function videoAdUtil(){
	let videoAd = null;
	
	 if (wx.createRewardedVideoAd) {
		 uni.showLoading({
		 	title:"加载中...",
		 });
		 videoAd = wx.createRewardedVideoAd({ 
			 adUnitId: 'adunit-d579021705423692',
			 }) ;
			
			 videoAd.onError((err) => {
				  videoAd.offClose();
				 uni.hideLoading();	 
				 
			 }) ;
			 return videoAd;
	} ;
}
function  videoshowAd(videoAd) {
    if (videoAd) {
		videoAd.load()
		      .then(() => {
		        videoAd.show()
		      })
		      .catch(err => {
		        // 视频加载失败重试,酌情添加
		       videoAd.load()
		        .then(() => {
		         videoAd.show()
		        })
		        .catch(err => {
					videoAd.offClose();
		          wx.showToast({
		            title: '视频加载失败！',
		            icon: 'none',
					success: () => {
						uni.navigateBack({
							delta:1,
						})
					}
		          })
		        })
		      })
	}
   };
   
/**
 * 检测是否为空
 * @param rst
 * @returns {boolean}
 * @constructor
 */
function IsNullOrEmpty(rst) {
	if (rst != null && rst != "" && rst != undefined && Rst != "null") {
		var Rst = JSON.stringify(rst);
		if (Rst != "[]" && Rst != "null" && Rst != "{}" && Rst != "undefined") {
			return false;
		} else {
			return true;
		}
	} else {
		return true;
	}
}
/**
 * 显示弹框
 */
function  showToast(isSuccess, content, methodes) {
	var msg = methodes + content;
	if (!IsNullOrEmpty(msg)) {
		uni.showToast({
			title: msg,
			icon: isSuccess ? "/static/images/suc.png" : "none"
		})
	}
}

function showHzGroup(){
	return true;
}

export default {
	showHzGroup,
	showToast,
	IsNullOrEmpty,
	updateNumber,
	xd_setStorage,
	xd_setStorageSync,
	xd_getStorageSync,
	xd_setAccessToken,
	xd_getAccessToken,
	xd_showToast,
	// xd_showToast_success,
	// xd_showToast_success_redirectTo,
	// xd_showToast_success_navigateBack,
	// xd_showToast_navigateBack,
	// xd_showModal_confirm,
	xd_request,
	xd_request_get,
	xd_request_post,
	xd_request_upload,
	xd_request_simpleOperate,
	xd_request_delete,
	xd_navigateBack,
	xd_timestampToTime,
	xd_daysAddSub,
	xd_request_img,
	xd_request_text,
	xd_showImg,
	xd_randomImg,
	xd_onShare,
	xd_login,
	videoAdUtil,
	videoshowAd,
}
