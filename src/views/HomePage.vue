<!--  微页面  -->
<template>
	<div class="wechat-page">
		<el-form :model="loginForm" :rules="rules" ref="loginForm" label-position="top" label-width="80px" class="login-form">
			<el-form-item label="学校">
				<el-select v-model="loginForm.universityId">
					<el-option v-for="university in universities" :key="university.id" :label="university.name" :value="university.id"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item prop="account" label="工号">
				<el-input size="large" type="text" v-model="loginForm.account" placeholder="工号"></el-input>
			</el-form-item>
			<el-form-item prop="password" label="密码">
				<el-input size="large" type="password" v-model="loginForm.password" placeholder="密码"></el-input>
			</el-form-item>
		</el-form>
		<button type="">下一步</button>
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
				universities: [],
				loginForm: {
					universityId: '',
					studentId: '',
					name: '',
					password: '',
					rePassword: '',
				},
				rules: {
					account: [
						{ required: true, message: '请输入账号', trigger: 'blur' },
					],
					password: [
						{ required: true, message: '请输入密码', trigger: 'blur' },
					]
				},
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
			}
		},
		mounted: function () {
			this.getUniversities();
		}
	}

</script>

<style lang="scss" scoped>
	.wechat-page {
		padding: 10px;
		color: #fff;
		background: #66a6ff;
		height: 100%;
		width: 100%;
		form {
			width: 90%;
		}

		select {
			width: 90%;
			color: #fff;
			border: none;
			border-radius: 0;
			border-bottom: 1px solid #fff;
			outline: none;
			background: transparent;
		}

		input {
			color: #fff;
			background: transparent;
			border: none;
			border-bottom: 1px solid #fff;
			width: 90%;
			outline: none;
		}

		button {
			width: 90%;
			height: 35px;
			background: #fff;
			border: 1px solid #ccc;
			border-radius: 12px;
			margin-top: 10px;
			outline: none;
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
	}
</style>