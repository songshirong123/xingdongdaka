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
function xd_showToast(title, icon, callbackFun) {
	uni.showToast({
		title: title,
		icon: icon ? icon : "none",
		success: function() {
			if (typeof(callbackFun) != "undefined" && callbackFun != null) {
				callbackFun(); // 回调函数
			}
		}
	});
}
// 弹出框:操作成功
function xd_showToast_success(title, callbackFun) {
	uni.showToast({
		icon: "success",
		success: function() {
			if (typeof(callbackFun) != "undefined" && callbackFun != null) {
				callbackFun(); // 回调函数
			}
		}
	});
}
// 弹出框:操作成功并跳转
function xd_showToast_success_redirectTo(pageUrl) {
	xd_showToast_success(null, function() {
		uni.redirectTo({
			url: pageUrl // 跳转到页面
		});
	});
}
// 弹出框:操作成功并返回上一级
function xd_showToast_success_navigateBack() {
	xd_showToast_success(null, function() {
		uni.navigateBack({
			delta: 1
		});
	});
}
// 弹窗，操作完成后返回上一级
function xd_showToast_navigateBack(toastTitle) {
	uni.showToast({
		title: toastTitle,
		success: function() {
			uni.navigateBack({
				delta: 1
			})
		}
	});
}
// 确认操作
function xd_showModal_confirm(title, message, showCancelBut, okCallbackFun, cancelCallbackFun) {
	uni.showModal({
		title: title || '操作确认',
		content: message || '您确定要执行该操作吗？！',
		showCancel: !showCancelBut ? showCancelBut : true,
		success: function(res) {
			if (res.confirm) {
				if (typeof(okCallbackFun) != "undefined" && okCallbackFun != null) {
					okCallbackFun();
				}
			} else if (res.cancel) {
				if (typeof(cancelCallbackFun) != "undefined" && cancelCallbackFun != null) {
					cancelCallbackFun();
				}
			}
		}
	});
}

/** ***************request 相关*********************** */
// 请求 url：请求路径，params请求参数，method：方法,请求header，
function xd_request(url, method, params, headers) {
	return new Promise((resolve, reject) => {
		uni.request({
			url: url,
			method: method || 'GET', // 默认get请求
			data: params || {},
			header: headers || {},
			dataType: "json",
			success: function(res) {
				var d = res.data;
				if (d.code === 0) {
					resolve(d); // 自行处理返回结果
				} else {
					reject(d.msg);
				}
			},
			fail: function(err) {
				reject(err);
			}
		});
	});
}
// 简单request get
function xd_request_get(url, params, withToken) {
	var headers = {};
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
		'content-type': 'application/x-www-form-urlencoded'
	};
	if (withToken !== false) {
		var token = xd_getAccessToken(); // token
		headers.access_token = token; // accessToken
	}
	return xd_request(url, 'POST', params, headers);
}
// 上传
function xd_request_upload(url, params, withToken) {
	var headers = {
		'content-type': 'application/form-data'
	};
	if (withToken !== false) {
		var accessToken = xd_getToken(); // token
		headers.access_token = token; // accessToken
	}
	return xd_request(url, 'POST', params, headers);
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
export default {
	xd_setStorage,
	xd_setStorageSync,
	xd_getStorageSync,
	xd_setAccessToken,
	xd_getAccessToken,
	xd_showToast,
	xd_showToast_success,
	xd_showToast_success_redirectTo,
	xd_showToast_success_navigateBack,
	xd_showToast_navigateBack,
	xd_showModal_confirm,
	xd_request,
	xd_request_get,
	xd_request_post,
	xd_request_upload,
	xd_request_simpleOperate,
	xd_request_delete,
	xd_navigateBack
}
