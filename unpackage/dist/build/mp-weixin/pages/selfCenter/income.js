(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/selfCenter/income"],{"042e":function(e,t,n){"use strict";n.r(t);var a=n("544e"),i=n("9f7c");for(var o in i)"default"!==o&&function(e){n.d(t,e,(function(){return i[e]}))}(o);n("18d0");var r,u=n("f0c5"),c=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);t["default"]=c.exports},"18d0":function(e,t,n){"use strict";var a=n("ea36"),i=n.n(a);i.a},"544e":function(e,t,n){"use strict";var a,i=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.balanceList,(function(t,n){var a=e.__get_orig(t),i=e.xdUniUtils.xd_timestampToTime(t.createTime,!1,!0,!1);return{$orig:a,g0:i}})));e.$mp.data=Object.assign({},{$root:{l0:n}})},o=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a}))},"8bfa":function(e,t,n){"use strict";(function(e){n("4e6c"),n("921b");a(n("66fd"));var t=a(n("042e"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"9f7c":function(e,t,n){"use strict";n.r(t);var a=n("e5b0"),i=n.n(a);for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);t["default"]=i.a},e5b0:function(e,t,n){"use strict";(function(e){var n;function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i=(n={data:function(){return{balanceList:[],rmb:0,nextPage:1,pageSize:10}},onLoad:function(){this.loadata(),this.getBalance(),this.burieUpdate()},onReachBottom:function(){this.loadata()},methods:{burieUpdate:function(){this.xd_request_post(this.xdServerUrls.xd_updateBurieStatistics,{type:2},!0).then((function(e){}))},getBalance:function(){var t=this;this.xd_request_post(this.xdServerUrls.xd_inquireBalance,{token:e.getStorageSync("token")},!0).then((function(e){void 0!==typeof e.obj.rmb&&(t.rmb=e.obj.rmb/100)}))},loadata:function(){var t=this;this.xd_request_post(this.xdServerUrls.xd_balanceOrderQuery,{token:e.getStorageSync("token"),pageNum:1,pageSize:10},!0).then((function(e){t.nextPage=e.obj.nextPage,t.balanceList=e.obj.list}))},gobalance:function(){e.navigateTo({url:"balanDrawal"})},getReachList:function(){var t=this;if(0==this.nextPage)return e.showLoading({title:"没有更多数据了"}),setTimeout((function(){e.hideLoading()}),1e3),!1;e.showLoading({title:"加载中..",mask:!0}),this.xd_request_post(this.xdServerUrls.xd_balanceOrderQuery,{token:e.getStorageSync("token"),pageNum:this.nextPage,pageSize:this.pageSize},!1).then((function(n){t.nextPage=n.obj.nextPage,t.balanceList=t.balanceList.concat(n.obj.list),setTimeout((function(){e.hideLoading()}),1e3)}))}}},a(n,"onReachBottom",(function(){this.getReachList()})),a(n,"onPullDownRefresh",(function(){this.loadata(),e.stopPullDownRefresh()})),n);t.default=i}).call(this,n("543d")["default"])},ea36:function(e,t,n){}},[["8bfa","common/runtime","common/vendor"]]]);