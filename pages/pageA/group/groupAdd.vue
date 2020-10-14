<template>
	<view>
		<!-- 组名称 -->
		<view class="label-hint">组名称</view>
		<view class="label-hint infos">
			<input placeholder="组名称,不低于20个字" @input="inputGroupName" />
		</view>

		<!-- 诚意金 -->
		<view class="label-hint">诚意金</view>
		<view class="label-hint infos">
			<input type="number" placeholder="请输入诚意金额" @input="inputGroupAmout" />
		</view>
		<text class="moneyhint">如果在2周的考察期内，加入者未退出，创建人可获得70%诚意金。</text>

		<!-- 标签选择 -->
		<view class="label-hint">标签</view>
		<view class="label-hint infos" @click="getLable()">
			<view v-if="lable!=null" class="nav-item">{{lable.labelName}}</view>
			<input v-else placeholder="添加标签对小组进行分类" disabled="true" />
		</view>

		<!-- 标签选择 -->
		<view class="label-hint">描述</view>
		<view class="label-hint infos">
			<input placeholder="添加更多描述信息,说明小组功能作用" @input="inputGroupDescribe" />
		</view>
		<!-- 图片 -->
		<view class="label-hint photoly">
			<view class="photo_border" @click="popUpImg()">
				<image v-if="photo!=''" :src="photo"></image>
				<input v-else placeholder="添加小组图片" disabled="true" />
			</view>
		</view>

		<!-- 创建 -->
		<button class="bg-orange" style="margin: 5px;" @tap="addOrEditGroup">{{butName}}</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				IsAdd: false,
				Group: "",
				lableId: 0,
				lable: null,
				butName: "创建",
				tabsList: [], //标签列表
				photo: "", //图片信息 https://app.fornet.com.cn/Images/0000/202008181117551670.jpg
				groupName: "",
				groupAmout: 0,
				groupDescribe: ""
			}
		},
		methods: {

			//输入名称
			inputGroupName(e) {
				this.groupName = e.detail.value;
			},
			//输入诚意金
			inputGroupAmout(e) {
				this.groupAmout = e.detail.value;
			},
			//输入描述
			inputGroupDescribe(e) {
				this.groupDescribe = e.detail.value;
			},

			//添加或者编辑群组
			addOrEditGroup() {
				
				let groupAmout = this.groupAmout;//诚意金
				if(this.xdUniUtils.IsNullOrEmpty(groupAmout)){
					groupAmout=0;
				}
				
				let groupName = this.groupName;//群名称
				if(this.xdUniUtils.IsNullOrEmpty(groupName)){
					return this.xdUniUtils.showToast(false,"组名称不能为空！","");
				}
				if(groupName.length<20){
					return this.xdUniUtils.showToast(false,"组名不能低于二十个字","");
				}
				
				let lable = this.lable;//标签类型
				if(this.xdUniUtils.IsNullOrEmpty(lable)){
					return this.xdUniUtils.showToast(false,"标签类型不能为空！","");
				}
				
				let photo = this.photo;//群头像
				if(this.xdUniUtils.IsNullOrEmpty(photo)){
					return this.xdUniUtils.showToast(false,"组图片不能为空！","");
				}
				
				let groupDescribe = this.groupDescribe;//群描述
				if(this.xdUniUtils.IsNullOrEmpty(groupDescribe)){
					return this.xdUniUtils.showToast(false,"群描述不能为空！","");
				}
				
				let info ={
					id:"",
					userId:uni.getStorageSync('id'),
					rmb:groupAmout,
					roomName:groupName,
					roomType:this.lable.id,
					roomHead:photo,
					status:0,
					roomDesc:groupDescribe
				}
				let _this = this;
				this.xd_request_post(this.xdServerUrls.xd_saveRoom, info, false).then((res) => {
					_this.xdUniUtils.xd_navigateBack(1);
				}).catch(err => {});
				
			},
			//获取标签
			getLable() {
				let lableId = this.lableId;
				uni.navigateTo({
					url: "./addLable?lableid=" + lableId
				})
			},
			popUpImg() {
				const that = this;
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						let tempFilePaths = res.tempFilePaths;
						that.xdUniUtils.xd_request_img(res.tempFilePaths[0]).then(res => {
							if (res) {
								uni.uploadFile({
									url: that.xdServerUrls.xd_uploadFile,
									filePath: tempFilePaths[0],
									name: 'files',
									formData: {
										'userId': uni.getStorageSync('id'),
									},
									success: (uploadFileRes) => {
										console.log(uploadFileRes.data)
										that.photo = JSON.parse(uploadFileRes.data).obj[0];
										console.log(that.photo)
									}
								});
							} else {
								uni.showToast({
									title: '内容包含敏感内容',
									mask: true,
									duration: 2000,

								});
								return false
							}
						});

					}
				});
			},
		},
		onLoad(options) {
			let group = options.group; //如果是编辑的 传过来 需要编辑的群信息
			if (!this.xdUniUtils.IsNullOrEmpty(group)) {
				let lable = JSON.parse(group);
				this.lableId = lable.id;
				this.lable = lable;
			}
			this.IsAdd = options.isadd; //是否是新添的
			if (!this.IsAdd) {
				this.butName = "修改";
			}
			this.xdUniUtils.xd_setStorageSync("selectlable", null);
		},
		onShow() {
			let lable = uni.getStorageSync('selectlable');
			if (!this.xdUniUtils.IsNullOrEmpty(lable)) {
				this.lable = lable;
			}

		}
	}
</script>

<style>
	.moneyhint{
		font-size: 10px;
		padding-left: 10px;
	}
	.nav-item {
		display: inline-flex;
		flex-direction: column;
		text-align: center;
		padding-left: 10px;
		padding-right: 10px;
		padding-top: 3px;
		padding-bottom: 3px;
		background: #FFFFFF;
		border-radius: 30upx;
		border: 1px solid #fd5107;
		font-size: 12px;
		color: #fd5107;
	}

	.label-hint {
		font-size: 12px;
		padding: 10px;
		width: 100%;
	}

	.infos {
		background-color: #FFFFFF;
		width: 100%;
		font-size: 14px;
	}

	.photo_border {
		border: 1px dashed #BBBBBB;
		border-radius: 10px;
		height: 150px;
		padding: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		align-self: center;
		text-align: center;
	}

	.photoly {
		background-color: #FFFFFF;
		border-top: 1px solid #f0f0f0;
	}

	input {
		width: 100%;
	}
</style>
