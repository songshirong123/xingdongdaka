(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/selfCenter/feedback"],{2774:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var o=n("2f62");function r(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?r(Object(n),!0).forEach((function(t){c(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):r(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}var a={data:function(){return{array:["请选择反馈类型","产品相关","功能异常","优化建议","其他"],index:0,contentLength:0,content:"",mobile:"",userInfo:"",onOff:!0}},computed:i({},(0,o.mapState)(["hasLogin"])),onShow:function(){if(""==this.userInfo||void 0==this.userInfo||null==this.userInfo)try{this.userInfo=e.getStorageSync("userInfo")}catch(t){console.log(Error)}},onLoad:function(){if(!this.hasLogin)return e.redirectTo({url:"../login/login"}),!1;try{this.userInfo=e.getStorageSync("userInfo")}catch(t){console.log(Error)}},methods:i({},(0,o.mapMutations)(["logOut"]),{goPage:function(t){e.navigateTo({url:t})},contentInput:function(e){this.contentLength=e.target.value.length,this.content=e.target.value},mobileInput:function(e){this.mobile=e.target.value},bindPickerChange:function(e){this.index=e.detail.value},isValidPhone:function(e){var t=/^[1][3,4,5,7,8][0-9]{9}$/;return t.test(e)},submitFeedback:function(t){var n=this;return n.hasLogin?(n.userId=e.getStorageSync("id"),0==n.index?(e.showToast({title:"请选择反馈类型",mask:!0,duration:2e3,image:"/static/images/icon/clock.png"}),!1):""==n.content?(e.showToast({title:"请输入反馈内容",mask:!0,duration:2e3,image:"/static/images/icon/clock.png"}),!1):(n.mobile,""==n.mobile||n.isValidPhone(n.mobile)?void n.xd_request_post(n.xdServerUrls.xd_savefeedbackInfo,{userId:n.userId,content:n.content,mobile:n.mobile,feedType:n.array[n.index]},!1).then((function(t){0==t.resultCode?e.showToast({title:"提交成功",mask:!0,duration:2e3,icon:"success"}):e.showToast({title:"提交失败",mask:!0,duration:2e3,image:"/static/images/icon/clock.png"})})):(e.showToast({title:"手机号码不正确",mask:!0,duration:2e3,image:"/static/images/icon/clock.png"}),!1))):(e.navigateTo({url:"../login/login"}),!1)}})};t.default=a}).call(this,n("543d")["default"])},"41cc":function(e,t,n){"use strict";var o,r=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"b",(function(){return r})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return o}))},"47b7":function(e,t,n){"use strict";n.r(t);var o=n("2774"),r=n.n(o);for(var i in o)"default"!==i&&function(e){n.d(t,e,(function(){return o[e]}))}(i);t["default"]=r.a},"9b56":function(e,t,n){"use strict";var o=n("fa90"),r=n.n(o);r.a},b282:function(e,t,n){"use strict";n.r(t);var o=n("41cc"),r=n("47b7");for(var i in r)"default"!==i&&function(e){n.d(t,e,(function(){return r[e]}))}(i);n("9b56");var c,a=n("f0c5"),u=Object(a["a"])(r["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],c);t["default"]=u.exports},bee8:function(e,t,n){"use strict";(function(e){n("4e6c"),n("921b");o(n("66fd"));var t=o(n("b282"));function o(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},fa90:function(e,t,n){}},[["bee8","common/runtime","common/vendor"]]]);