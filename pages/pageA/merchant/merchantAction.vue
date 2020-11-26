<template>
	<view class="flex bg-white contentspe">
		<form class="contentspe" @submit="formSubmit">
			<view class="flex flex-wrap padding solid-top align-center">
				<view class="text-xl">
					<text class="lg text-gray cuIcon-list "></text>
				</view>
				<text class="margin-left-xs">分类</text>

				<view class="xd-flex-end label-left  radius " @tap="showradios" style="flex: 1;">
					<view class="bg-gray radius ">
						<text v-if="labeldata.length">{{labeldata}}</text>
						<text v-else>参与活动</text>
						<text class="lg text-gray cuIcon-triangledownfill"></text>
					</view>

				</view>
				<view class="cu-modal  cu-modal-z" :class="modalNamecheckbox?'show':''" @tap="showradios">
					<view class="cu-dialog" @tap.stop="">
						<checkbox-group class="block" @change="RadioChange" name="label">
							<view class="cu-list menues text-left ">
								<block v-for="(item,index) in pickerlabel" :key="item.id" :id="index">
									<view class="cu-item padding-left-sm">
										<label class="flex justify-between align-center flex-sub">
											<view class="flex-sub">{{item.labelName}}</view>
											<checkbox class="round" :class="item.checked?'checked':''" :checked="item.checked" :value="item.id" color="#009098"
											 style="transform:scale(0.8);font-size: 13px;margin-left: 5px;"></checkbox>

										</label>
									</view>
								</block>
							</view>
						</checkbox-group>
						<view class="checkbox-text flex justify-around">
							<text @tap="showradios"> 确定</text>
							<text @tap="showradios(1)"> 取消</text>
						</view>
					</view>
				</view>
			</view>
			<view class=" flex flex-wrap padding solid-top align-center justify-between">
				<view class="flex flex-wrap">
					<view class="text-xl">
						<text class="lg text-gray cuIcon-activity"></text>
					</view>
					<text class="margin-left-xs">行动内容</text>
				</view>
			</view>
			
			<view class="flex flex-wrap padding solid-top align-center">
				<view class="text-xl">
					<text class="lg text-gray cuIcon-moneybag"></text>
				</view>
				<text class="margin-left-xs">保证金</text>
			
				<view class="xd-flex-end label-left  radius " style="flex: 1;">
					<view>
						<text>5</text>
						<text class="lg text-gray cuIcon-triangledownfill"></text>
					</view>
				</view>
			</view>
			
			<view class=" flex flex-wrap padding solid-top align-center">
				<view class="text-xl">
					<text class="lg text-gray cuIcon-calendar"></text>
				</view>
				<view class="title margin-left-xs">计划天数</view>
				<view class="xd-flex-end label-left  radius " style="flex: 1;">
					<view class="flex flex-wrap  bg-gray radius align-center card-time-left ">
						<picker class="data-time-left-whint" @change="PickerChange" :range="picker">
							<view class="picker">
								{{picker[indextime]}}
							</view>
						</picker>
						<text class="lg text-gray cuIcon-triangledownfill"></text>
					</view>
					<view v-if="indextime==5">
						<input type="number" class="timeinput" placeholder="输入天数" :focus="targetDayf" @input="targetDayinput" maxlength="50"
						 step="1" min="1"></input>
					</view>
				</view>

			</view>
			<view class="flex flex-wrap padding solid-top align-center">
				<view class="margin-left-lg ">可休假天数</view>
				<view class="xd-flex-end label-left  radius " style="flex: 1;">
					<view class="flex flex-wrap  bg-gray radius align-center data-time-left">
						<picker class="data-time-left-whint" @change="PickerChangeholiday" :value="holidayDay" :range="pickerdate">
							<view class="picker">
								{{pickerdate[indexholiday]}}
							</view>
						</picker>
						<text class="lg text-gray cuIcon-triangledownfill"></text>
					</view>
					<view class="" v-if="indexholiday==8">
						<input class="timeinput" placeholder="输入天数" :value="holidayDay" :focus="holidayf" @input="holidayDayinput"
						 maxlength="50" step="1" min="0"></input>
					</view>
				</view>
			</view>

			<view class="padding solid-top">
				<view class="flex flex-wrap">
					<view class="text-xl">
						<text class="lg text-gray cuIcon-camera"></text>
					</view>
					<text class="margin-left-xs">上传封面</text>
				</view>
				<view style="margin-top: 10px;">
					<view class="cu-form-group">
						<view class="grid col-4 grid-square flex-sub">
							<view class="bg-img" @tap="ViewImage" :data-url="param.pictures" v-if="param.pictures!=''">
								<image :src="param.pictures" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="popUpImg" v-if="param.pictures==''">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="btn_bar">
				<button class="bg-orange " form-type="submit">发起活动</button>
			</view>
		</form>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				switchA: 0,
				switchB: 0,
				content: '',
				xinXin: '',
				dongLi: '',
				holidayf: false,
				targetDayf: false,
				extendContent: '',
				punchCardWay: '',
				indextime: 0,
				time: '12:00',
				indexholiday: 0,
				modalNamecheckbox: false,
				param: {
					pictures: ""
				},
				pickerlabel: [],
				picker: [
					"一周",
					"一个月",
					"三个月",
					"半年",
					"一年",
					"自定义"
				],
				pickerdate: [
					"一天",
					"两天",
					"三天",
					"四天",
					"五天",
					"六天",
					"一周",
					"一月",
					"自定义"
				],
				targetDay: 7,
				holidayDay: 1,
				labeldata: [],
			}
		},
		onShow() {
			this.tabs();
		},
		methods: {
			showradios(e) {
				if (e == 1) {
					for (var i = 0; i < this.pickerlabel.length; ++i) {
						this.pickerlabel[i].checked = false;
					}
					this.labeldata = [];
					this.modalNamecheckbox = !this.modalNamecheckbox;
				} else {
					this.modalNamecheckbox = !this.modalNamecheckbox;
				}
			},
			tabs() {
				this.xd_request_post(this.xdServerUrls.xd_label, {}, false).then((res) => {
					this.pickerlabel = res.obj;
				}).catch(err => {

				});
			},
			//休息天数
			PickerChangeholiday(e) {
				switch (e.detail.value) {
					case '0':
						this.indexholiday = 0;
						this.holidayDay = 1;
						break;
					case '1':
						this.indexholiday = 1;
						this.holidayDay = 2;
						break;
					case '2':
						this.indexholiday = 2;
						this.holidayDay = 3;
						break;
					case '3':
						this.indexholiday = 3;
						this.holidayDay = 4;
						break;
					case '4':
						this.indexholiday = 4;
						this.holidayDay = 5;
						break;
					case '5':
						this.indexholiday = 5;
						this.holidayDay = 6;
						break;
					case '6':
						this.indexholiday = 6;
						this.holidayDay = 7;
						break;
					case '7':
						this.indexholiday = 7;
						this.holidayDay = 30;
						break;
					case '8':
						this.indexholiday = 8;
						this.holidayDay = '';
						this.holidayf = true;
						break;
				}
			},

			//选择标签
			RadioChange(e) {
				var values = [];
				values = e.detail.value;
				var labeldatas = [];
				for (var i = 0; i < this.pickerlabel.length; ++i) {
					const item = this.pickerlabel[i].id
					if (values.includes(item.toString())) {
						this.pickerlabel[i].checked = true;
						labeldatas.push(this.pickerlabel[i].labelName);
					} else {
						this.pickerlabel[i].checked = false;
						labeldatas.splice(i)
					}

				}
				this.labeldata = labeldatas
			},

			PickerChange(e) {

				var that = this;
				switch (e.detail.value) {
					case '0':
						that.indextime = 0;
						that.targetDay = 7;
						break;
					case '1':
						that.indextime = 1;
						that.targetDay = 30;
						break;
					case '2':
						that.indextime = 2;
						that.targetDay = 90;
						break;
					case '3':
						that.indextime = 3;
						that.targetDay = 180;
						break;
					case '4':
						that.indextime = 4;
						that.targetDay = 365;
						break;
					case '5':
						that.indextime = 5;
						that.targetDay = '';
						that.targetDayf = true;
						break;
				}
			},

		}
	}
</script>

<style lang="scss">
	.contentspe {
		width: 100%;
	}

	.label-left {
		margin-left: 15%;
		width: 390rpx;
	}

	.card-time-left {
		margin-left: 38%;
		width: 150upx;
	}

	.data-time-left {
		margin-left: 34.5%;
		width: 150upx;
	}

	.timeinput {
		width: 115upx;
	}

	.btn_bar {
		position: fixed;
		bottom: 0;
		width: 100%;
		padding: 5px;
		background-color: #FFFFFF;
	}

	.textare-heght {
		height: 300upx;
	}

	.data-time-left-whint {
		width: 115upx;
		text-align: center;
		// padding-left: 5px;
		// padding-right: 5px;
	}

	.pading-time {
		margin-bottom: 20%;
	}

	.checkbox-text {
		height: 90rpx;
		border-top: 1px solid #f0f0f0;

		align-items: center;

		text {
			font-size: 35rpx;
		}

	}

	.menues {
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		line-height: 100upx;
		justify-content: space-evenly;
	}

	.titleBT {

		font-size: 35rpx;


	}
</style>
