<!--  微页面  -->
<template>
	<div class="wechat-page">
		<div v-if="step === 1" class="page-1">
			<label>学校</label>
			<select v-model="loginForm.universityId">
				<option value='' disabled selected style='display:none;'>请选择您当前就读学校</option>
				<option v-for="universitiy in universities" :value="universitiy.id">{{universitiy.name}}</option>
			</select>

			<label>学号</label>
			<input size="large" type="text" v-model="loginForm.studentNo" placeholder="请输入您的学号">

			<label>姓名</label>
			<input size="large" type="text" v-model="loginForm.name" placeholder="请输入您的姓名">
			<p v-if="verifyError" class="error-msg">该姓名与学号不符，请重新输入</p>
		</div>
		<div v-if="step === 2" class="page-3">
			<label>新密码</label>
			<input min="6" max="16" size="large" type="password" v-model="loginForm.password" placeholder="请输入6-16位密码">
			<label>再次输入密码</label>
			<input min="6" max="16" size="large" type="password" v-model="loginForm.rePassword" placeholder="请输入6-16位密码">
			<p v-if="passError" class="error-msg">{{passErrorMsg}}</p>
		</div>
		<button  @click="step == 1 ? next() : submit()">{{step == 1 ? '下一步' : '提交'}}</button>
		<a href="#/help">帮助中心</a>
	</div>
</template>

<script>
	import resources from '../resources'
	import md5 from 'js-md5'
	import { Loading, Message } from 'element-ui'

	const universitiesQuery = `
	{
		universities {
			id
			name
		}
	}`;

	const studentQuery = `
	query(
		$universityId: Long
		$studentNo: String
		$name: String
	){
		student(
			universityId: $universityId, 
			studentNo: $studentNo
			name: $name
		){
			name
			id
			userId
		}
	}`

	export default {
		data() {
			return {
				step: 1,
				openid: '',
				universities: [],
				loginForm: {
					// 测试账号: 15210231110 name: 林金鸿
					universityId: 1,
					studentNo: '15210231110',
					name: '林金鸿',
					password: '',
					rePassword: '',
				},
				userId: '',
				verifyError: false, // 学号与姓名验证结果
				passError: false,
				passErrorMsg: ''
			}
		},
		methods: {
			getUniversities() {
				this.$ajax.post(`${resources.graphQlApi}`, {
					'query': `${universitiesQuery}`
				})
					.then(res => {
						this.universities = res.data.data.universities;
					});
			},
			next() {
				let _this = this;

				if (!this.loginForm.name || !this.loginForm.universityId || !this.loginForm.studentNo) {
					Message.error({
						message: '学校／学号／姓名不能为空'
					})
					return;
				}

				let params = {
					universityId: this.loginForm.universityId,
					studentNo: this.loginForm.studentNo,
					name: this.loginForm.name
				}
				this.$ajax.post(`${resources.graphQlApi}`, {
					'query': `${studentQuery}`,
					variables: params
				})
				.then(res => {
					if (res.data.data.student) {
						_this.userId = res.data.data.student.id;
						// 调用一次user更新接口，更新userid
						let updateUrl = resources.users(this.userId);
						let updateParams = new URLSearchParams();
						updateParams.append('userId', _this.userId);
						updateParams.append('openid', this.openid);
						_this.$ajax.post(updateUrl, updateParams)
						.then(res => {console.log('更新openid')});

						_this.step++;
					} else {
						_this.verifyError = true;
					}


				});

			},
			submit() {
				let _this = this;
				if (this.loginForm.password !== this.loginForm.rePassword) {
					_this.passError = true;
					_this.passErrorMsg = '两次密码输入不一致，请重新输入';
					return
				}

				if (this.loginForm.password.length < 6 || this.loginForm.password.length > 16) {
					_this.passError = true;
					_this.passErrorMsg = '密码格式不正确，请重新输入';
					return;
				}

				_this.passError = false;
				let url = resources.users(this.userId);
				let params = new URLSearchParams();
				params.append('studentNo', this.loginForm.studentNo);
				params.append('password', md5(this.loginForm.password));
				params.append('openid', this.openid);

				this.$ajax.post(url, params)
					.then(res => {
						Message.success({
							message: '成功！'
						})
					});
			},
		},
		mounted: function () {
			this.getUniversities();
			this.openid = getQueryString('openid');
			// 获取url参数
			function getQueryString(name) {
				var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
				var r = window.location.search.substr(1).match(reg);
				if (r != null) return unescape(r[2]);
				return null;
			}
		}
	}

</script>

<style lang="scss" scoped>
	.wechat-page {
		color: #fff;
		background: #66a6ff;
		height: 100%;
		width: 100%;
		.page-1,
		.page-3 {
			padding: 10px;
		}
		.page-2 {
			text-align: center;
			padding: 0;
			padding-top: 60px;
		}
		label {
			display: block;
			margin: 10px 0;
			font-size: 16px;
		}
		select {
			width: 90%;
			color: #fff;
			border: none;
			border-radius: 0;
			border-bottom: 1px solid #fff;
			outline: none;
			background: transparent;
			margin: 5px;
		}

		input {
			color: #fff;
			background: transparent;
			border: none;
			border-bottom: 1px solid #fff;
			width: 90%;
			outline: none;
			margin: 5px;
		}

		button {
			width: 95%;
			height: 35px;
			background: #fff;
			border: 1px solid #ccc;
			border-radius: 12px;
			outline: none;
			margin: 0 auto;
			margin-top: 10px;
			display: block;
		}

		::-webkit-input-placeholder {
			/* WebKit browsers */
			color: #fff;
		}

		:-moz-placeholder {
			/* Mozilla Firefox 4 to 18 */
			color: #fff;
		}

		::-moz-placeholder {
			/* Mozilla Firefox 19+ */
			color: #fff;
		}

		:-ms-input-placeholder {
			/* Internet Explorer 10+ */
			color: #fff;
		}
		.el-form-item__content {
			width: 90%;
		}
		.avatar-uploader .el-upload {
			border: 1px dashed #d9d9d9;
			border-radius: 6px;
			cursor: pointer;
			position: relative;
			overflow: hidden;
		}
		.avatar-uploader .el-upload:hover {
			border-color: #20a0ff;
		}
		.avatar-uploader-icon {
			font-size: 28px;
			color: #fff;
			width: 178px;
			height: 178px;
			line-height: 178px;
			text-align: center;
			border: 3px solid #fff;
			border-radius: 50%;
		}
		.avatar {
			width: 178px;
			height: 178px;
			display: block;
		}
		.error-msg {
			font-size: 12px;
			color: #59f4df;
			margin: 5px;
		}
	}
</style>