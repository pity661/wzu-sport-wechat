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
			<input size="large" type="text" v-model="loginForm.studentId" placeholder="请输入您的学号">

			<label>姓名</label>
			<input size="large" type="text" v-model="loginForm.name" placeholder="请输入您的姓名">
		</div>
		<div v-if="step === 2" class="page-2">
			<p>你好，{{loginForm.name}}</p>
			<el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess"
			 :before-upload="beforeAvatarUpload">
				<img v-if="imageUrl" :src="imageUrl" class="avatar">
				<i v-else class="el-icon-plus avatar-uploader-icon"></i>
			</el-upload>
			<p>上传个人头像，让你更有魅力</p>
		</div>
		<div v-if="step === 3" class="page-3">
			<label>新密码</label>
			<input size="large" type="password" v-model="loginForm.password" placeholder="请输入6-16位密码">
			<label>再次输入密码</label>
			<input size="large" type="password" v-model="loginForm.rePassword" placeholder="请输入6-16位密码">
		</div>
		<button type="" @click="step < 3 ? next() : submit()">{{step < 3 ? '下一步' : '提交'}}</button>
	</div>
</template>

<script>
	import resources from '../resources'
	const universitiesQuery = `
	{
		universities {
			id
			name
		}
	}`;

	export default {
		data() {
			return {
				step: 1,
				universities: [],
				loginForm: {
					universityId: '',
					studentId: '',
					name: '',
					password: '',
					rePassword: '',
				},
				imageUrl: ''
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
				this.step++;
				console.log('next!', this.loginForm);
			},
			submit() {
				console.log('submit!', this.loginForm);
			},
			handleAvatarSuccess(res, file) {
				this.imageUrl = URL.createObjectURL(file.raw);
			},
			beforeAvatarUpload(file) {
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;

				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			}
		},
		mounted: function () {
			this.getUniversities();
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
	}
</style>