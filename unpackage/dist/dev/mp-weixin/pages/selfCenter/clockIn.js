(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["pages/selfCenter/clockIn"],{

/***/ 39:
/*!**************************************************************************************************!*\
  !*** E:/Documents/HBuilderProjects/xingdongdaka/main.js?{"page":"pages%2FselfCenter%2FclockIn"} ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(createPage) {__webpack_require__(/*! uni-pages */ 4);__webpack_require__(/*! @dcloudio/uni-stat */ 5);
var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 2));
var _clockIn = _interopRequireDefault(__webpack_require__(/*! ./pages/selfCenter/clockIn.vue */ 40));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}
createPage(_clockIn.default);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["createPage"]))

/***/ }),

/***/ 40:
/*!*******************************************************************************!*\
  !*** E:/Documents/HBuilderProjects/xingdongdaka/pages/selfCenter/clockIn.vue ***!
  \*******************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _clockIn_vue_vue_type_template_id_9527bb84___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./clockIn.vue?vue&type=template&id=9527bb84& */ 41);
/* harmony import */ var _clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./clockIn.vue?vue&type=script&lang=js& */ 43);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _clockIn_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./clockIn.vue?vue&type=style&index=0&lang=scss& */ 48);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js */ 16);

var renderjs





/* normalize component */

var component = Object(_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_3__["default"])(
  _clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _clockIn_vue_vue_type_template_id_9527bb84___WEBPACK_IMPORTED_MODULE_0__["render"],
  _clockIn_vue_vue_type_template_id_9527bb84___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null,
  false,
  _clockIn_vue_vue_type_template_id_9527bb84___WEBPACK_IMPORTED_MODULE_0__["components"],
  renderjs
)

component.options.__file = "pages/selfCenter/clockIn.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ 41:
/*!**************************************************************************************************************!*\
  !*** E:/Documents/HBuilderProjects/xingdongdaka/pages/selfCenter/clockIn.vue?vue&type=template&id=9527bb84& ***!
  \**************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_template_id_9527bb84___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./clockIn.vue?vue&type=template&id=9527bb84& */ 42);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_template_id_9527bb84___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_template_id_9527bb84___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_template_id_9527bb84___WEBPACK_IMPORTED_MODULE_0__["recyclableRender"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "components", function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_16_0_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_template_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_uni_app_loader_page_meta_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_template_id_9527bb84___WEBPACK_IMPORTED_MODULE_0__["components"]; });



/***/ }),

/***/ 42:
/*!**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--16-0!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/template.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-uni-app-loader/page-meta.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Documents/HBuilderProjects/xingdongdaka/pages/selfCenter/clockIn.vue?vue&type=template&id=9527bb84& ***!
  \**************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns, recyclableRender, components */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "recyclableRender", function() { return recyclableRender; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "components", function() { return components; });
var components
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
}
var recyclableRender = false
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ 43:
/*!********************************************************************************************************!*\
  !*** E:/Documents/HBuilderProjects/xingdongdaka/pages/selfCenter/clockIn.vue?vue&type=script&lang=js& ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./clockIn.vue?vue&type=script&lang=js& */ 44);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_babel_loader_lib_index_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_12_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_script_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 44:
/*!***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--12-1!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/script.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Documents/HBuilderProjects/xingdongdaka/pages/selfCenter/clockIn.vue?vue&type=script&lang=js& ***!
  \***************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _regenerator = _interopRequireDefault(__webpack_require__(/*! ./node_modules/@babel/runtime/regenerator */ 45));






































































































































var _vuex = __webpack_require__(/*! vuex */ 13);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}var imtAudio = function imtAudio() {__webpack_require__.e(/*! require.ensure | components/imt-audio/imt-audio */ "components/imt-audio/imt-audio").then((function () {return resolve(__webpack_require__(/*! components/imt-audio/imt-audio */ 251));}).bind(null, __webpack_require__)).catch(__webpack_require__.oe);};

var recorderManager = uni.getRecorderManager();
var innerAudioContext = uni.createInnerAudioContext();var _default =
{
  components: {
    imtAudio: imtAudio },


  data: function data() {
    return {
      plays: true,
      showmp3: false,
      popUp: false,
      buttonStart: false,
      param: {
        'pictures': [] },

      audioPlaySrc: '../static/images/icon/img/title.png',
      loading: '',
      pushId: '',
      videodata: '',
      MP3data: '',
      progreessnum: '',
      tempFilePaths: [],
      j: 0,
      isShare: 1,
      pushList: '',
      voicePath: '',

      max: 120000, // 录音最大时长，单位毫秒
      frame: 50, // 执行绘画的频率，单位毫秒
      maxTiming: false, // 最长录音时间的定时器
      draw: undefined,
      timeminute: 0, //显示秒数
      _isLoaded: '' };



  },

  computed: _objectSpread({},
  (0, _vuex.mapState)(['hasLogin'])),

  onLoad: function onLoad(option) {
    this.pushId = option.pushId;
    this.getpushList();
  },
  onReady: function onReady() {
    //  this._isLoaded = false
    //  rewardedVideoAd = this._rewardedVideoAd = uni.createRewardedVideoAd({ adpid: '1507000689' }) // 仅用于HBuilder基座调试 adpid: '1507000689'
    //  rewardedVideoAd.onLoad(() => {
    // this._isLoaded = true

    //  })
    //  rewardedVideoAd.onError((err) => {
    //   console.log('onError event', err)
    // })
    // rewardedVideoAd.onClose((res) => {
    //   console.log('onClose event', res)
    // })
  },
  methods: {
    showAd: function showAd() {
      if (this._isLoaded) {
        this._rewardedVideoAd.show();
      }
    },
    stopplay: function stopplay() {
      innerAudioContext.stop;
      this.plays = true;
    },
    play: function play() {
      innerAudioContext.setSrc = this.MP3data;
      innerAudioContext.play;
      this.plays = false;
    },
    popUpImgs: function popUpImgs() {
      this.popUp = !this.popUp;
    },
    showmp: function showmp() {
      this.popUp = false;
      this.showmp3 = !this.showmp3;
    },
    ViewImage: function ViewImage(e) {

      this.param.pictures.splice(e, 1);
    },
    Viewvideo: function Viewvideo() {
      this.videodata = '';
    },
    error: function error() {
      this.audioPlaySrc = this.xdUniUtils.xd_randomImg();
    },
    getpushList: function getpushList() {var _this = this;
      if (!this.hasLogin) {
        return this.xdUniUtils.xd_login(this.hasLogin);
      }
      this.xd_request_post(this.xdServerUrls.xd_pushDataByPushId, {
        pushId: this.pushId,
        isShare: this.isShare,
        lookUserId: uni.getStorageSync('id') },
      true).then(function (res) {
        if (res.resultCode == 0) {
          var data = res.obj;
          data.createTime = _this.xdUniUtils.xd_timestampToTime(res.obj.createTime, false, false, true);
          data.endTime = _this.xdUniUtils.xd_timestampToTime(res.obj.endTime, false, false, true);
          data.challengeRmb = res.obj.challengeRmb / 100;
          _this.pushList = data;
        } else {
          uni.showToast({
            title: res.msg,
            icon: 'none' });

        }

      });
    },
    submitFrom: function submitFrom(e) {var _this2 = this;
      var end = undefined;
      if (!this.hasLogin) {
        return this.xdUniUtils.xd_login(this.hasLogin);
      }
      if (e.detail.value.content == '') {
        uni.showToast({
          title: '打卡不能为空',
          mask: true,
          duration: 1000,
          image: '/static/images/icon/clock.png' });

        return false;
      };
      this.xdUniUtils.xd_request_text({ content: e.detail.value }).then(function (res) {
        if (res.obj.errcode == 0) {
          _this2.xd_request_post(_this2.xdServerUrls.xd_savePushCard, {
            pushId: _this2.pushId,
            userId: uni.getStorageSync('id'),
            content: e.detail.value.content,
            pictures: _this2.param.pictures,
            videos: _this2.videodata,
            extendContent: _this2.MP3data },
          true).then(function (res) {
            var that = _this2;
            uni.showToast({
              title: '保存成功',
              icon: 'success',
              duration: 1500,

              success: function success() {
                uni.reLaunch({
                  url: '../index/cardDetails/cardDetails?pushId=' + that.pushId + '&cardId=' + res.obj + '&show=0' });

              } });


          });
        } else {
          uni.showToast({
            title: '内容包含敏感内容',
            mask: true,
            duration: 2000 });


          return false;
        }

      });




    },
    popUpImg: function popUpImg() {
      var that = this;
      if (that.videodata != '') {
        uni.showToast({
          title: '已上传视频无法上传图片',
          icon: 'none',
          duration: 2000 });

        return false;
      }
      that.popUp = false;
      uni.chooseImage({
        count: 9, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: function success(res) {
          that.tempFilePaths = res.tempFilePaths;
          that.j = 0;
          that.getImg();
        } });

    },
    getImg: function getImg() {
      var that = this;
      if (that.j >= that.tempFilePaths.length) {
        return false;
      }
      that.xdUniUtils.xd_request_img(that.tempFilePaths[that.j]).then(function (res) {
        if (res) {
          var uploadTask = uni.uploadFile({
            url: that.xdServerUrls.xd_uploadFile,
            filePath: that.tempFilePaths[that.j],
            name: 'files',
            formData: {
              'userId': uni.getStorageSync('id') },

            success: function success(uploadFileRes) {
              if (JSON.parse(uploadFileRes.data).resultCode == 0) {
                that.param.pictures.push(JSON.parse(uploadFileRes.data).obj[0]);
                that.j++;
                that.getImg();
              }

            } });

          uploadTask.onProgressUpdate(function (res) {
            that.loading = res.progress;
            if (that.loading >= 100) {
              setTimeout(function () {
                that.loading = 0;
              }, 1000);
            }

          });
        }
      });
    },
    popUpVideo: function popUpVideo() {var _this3 = this;return _asyncToGenerator( /*#__PURE__*/_regenerator.default.mark(function _callee() {var that;return _regenerator.default.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
                // 上传视频
                that = _this3;if (!(
                that.videodata != '')) {_context.next = 4;break;}
                uni.showToast({
                  title: '已上传视频',
                  icon: 'none',
                  duration: 2000 });return _context.abrupt("return",

                false);case 4:

                that.xdUniUtils.xd_request_post(that.xdServerUrls.xd_saveRedisByFree, {
                  'token': uni.getStorageSync('token') }).
                then(function (res) {

                });
                that.popUp = false;
                uni.chooseVideo({
                  maxDuration: 60,
                  count: 1,
                  compressed: false,
                  sourceType: ['album'],
                  success: function success(responent) {
                    var videoFile = responent.tempFilePath;

                    if (responent.size > 100 * 1024 * 1024) {
                      uni.showModal({
                        title: '观看视频广告免费上传大于100M视频',
                        confirmText: '观看',
                        cancelText: '取消',
                        success: function success(ress) {
                          if (ress.confirm) {
                            that.videoAd = that.xdUniUtils.videoAdUtil();
                            if (that.videoAd) {
                              that.xdUniUtils.videoshowAd(that.videoAd);

                              that.videoAd.onLoad(function () {
                                uni.hideLoading();
                              });
                              that.videoAd.onClose(function (res) {
                                if (res && res.isEnded || res === undefined) {
                                  var uploadTask = uni.uploadFile({
                                    url: that.xdServerUrls.xd_uploadFile,
                                    method: "POST",
                                    formData: {
                                      'userId': uni.getStorageSync('id'),
                                      'token': uni.getStorageSync('token') },

                                    filePath: videoFile,
                                    name: 'files',
                                    success: function success(res) {
                                      that.videodata = JSON.parse(res.data).obj[0];

                                    } });

                                  uploadTask.onProgressUpdate(function (res) {
                                    that.loading = res.progress;
                                    if (that.loading >= 100) {
                                      setTimeout(function () {
                                        that.loading = 0;
                                      }, 1000);
                                    }

                                  });
                                } else {
                                  that.videoAd.offClose();
                                  wx.showModal({
                                    content: '广告未播放完成,无法删除',
                                    showCancel: false });

                                  return false;
                                }

                              });
                            }

                          } else if (ress.cancel) {
                            return false;

                          }
                        } });

                    } else {
                      var uploadTask = uni.uploadFile({
                        url: that.xdServerUrls.xd_uploadFile,
                        method: "POST",
                        formData: {
                          'userId': uni.getStorageSync('id'),
                          'token': uni.getStorageSync('token') },

                        filePath: videoFile,
                        name: 'files',
                        success: function success(res) {
                          that.videodata = JSON.parse(res.data).obj[0];

                        } });

                      uploadTask.onProgressUpdate(function (res) {
                        that.loading = res.progress;
                        if (that.loading >= 100) {
                          setTimeout(function () {
                            that.loading = 0;
                          }, 1000);
                        }

                      });
                    }


                  } });case 7:case "end":return _context.stop();}}}, _callee);}))();


    }
    // startRecord(e) {

    //      let that=this;
    //                 recorderManager.start({
    // 					duration:600000,
    // 					format:'mp3'
    // 				}
    // 				);
    // 				that.maxTiming = setTimeout(function() {
    // 					clearInterval(that.draw);
    // 					console.log('时间到');

    // 				}, that.max);
    // 				let x=e.detail.x/2;
    // 				let y=e.detail.y/2;

    // 				// 录音过程圆圈动画
    // 				let angle = -0.5;
    // 				var millisecond = 0; //毫秒
    // 				let context = uni.createCanvasContext('canvas');
    // 				that.draw = setInterval(function() {
    // 					millisecond = millisecond + 50;
    // 					if (millisecond >= 1000) {
    // 						console.log(millisecond)
    // 						millisecond = 0;
    // 						that.timeminute = that.timeminute+1;
    // 									}
    // 					context.beginPath();
    // 					context.setStrokeStyle("#1296db");
    // 					context.setLineWidth(3);
    // 					context.arc(30, 30, 25,  -0.5 * Math.PI, (angle += 2 / (that.max / that.frame)) * Math.PI, false);
    // 					context.stroke();
    // 					context.draw(false);
    // 				}, that.frame);
    //             },
    // endRecord(e) {
    // 	let that=this;
    // 	clearInterval(that.draw);
    // 	that.showmp3=false;
    // 	recorderManager.stop();
    //        recorderManager.onStop(function (res) {
    // 		const	voicePath = res.tempFilePath;
    // 			const uploadTask =uni.uploadFile({
    // 				url:that.xdServerUrls.xd_uploadFile,
    // 				method:"POST",
    // 				 header: {
    // 				          "Content-Type": "multipart/form-data"
    // 				        },
    // 				formData: {
    // 					'userId': uni.getStorageSync('id'),
    // 				},
    // 				filePath:voicePath,
    // 				name:'files',
    // 				success: (res) => {    
    // 					that.timeminute=0;
    // 					that.MP3data = JSON.parse(res.data).obj[0] 
    // 				}
    // 			})
    // 			uploadTask.onProgressUpdate((res) => {
    // 				 that.loading=res.progress
    // 				 if(that.loading>=100){
    // 					 setTimeout(function(){
    // 						  that.loading=0;
    // 								},1000);
    // 				 }

    // 			 });  

    // 		});
    // },
  } };exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 48:
/*!*****************************************************************************************************************!*\
  !*** E:/Documents/HBuilderProjects/xingdongdaka/pages/selfCenter/clockIn.vue?vue&type=style&index=0&lang=scss& ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!./clockIn.vue?vue&type=style&index=0&lang=scss& */ 49);
/* harmony import */ var _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_D_HBuilderX_plugins_uniapp_cli_node_modules_mini_css_extract_plugin_dist_loader_js_ref_8_oneOf_1_0_D_HBuilderX_plugins_uniapp_cli_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_loaders_stylePostLoader_js_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_2_D_HBuilderX_plugins_uniapp_cli_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_D_HBuilderX_plugins_uniapp_cli_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_webpack_preprocess_loader_index_js_ref_8_oneOf_1_5_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_vue_cli_plugin_uni_packages_vue_loader_lib_index_js_vue_loader_options_D_HBuilderX_plugins_uniapp_cli_node_modules_dcloudio_webpack_uni_mp_loader_lib_style_js_clockIn_vue_vue_type_style_index_0_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ 49:
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/mini-css-extract-plugin/dist/loader.js??ref--8-oneOf-1-0!./node_modules/css-loader/dist/cjs.js??ref--8-oneOf-1-1!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/loaders/stylePostLoader.js!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-2!./node_modules/postcss-loader/src??ref--8-oneOf-1-3!./node_modules/sass-loader/dist/cjs.js??ref--8-oneOf-1-4!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/webpack-preprocess-loader??ref--8-oneOf-1-5!./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib??vue-loader-options!./node_modules/@dcloudio/webpack-uni-mp-loader/lib/style.js!E:/Documents/HBuilderProjects/xingdongdaka/pages/selfCenter/clockIn.vue?vue&type=style&index=0&lang=scss& ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin
    if(false) { var cssReload; }
  

/***/ })

},[[39,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/selfCenter/clockIn.js.map