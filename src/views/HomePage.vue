<!--  微页面  -->
<template>
	<div class="wechat-page">
		<div v-if="step === 1">
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
		<div v-if="step === 2">
			<label>新密码</label>
			<input size="large" type="password" v-model="loginForm.password" placeholder="请输入6-16位密码">
			<label>再次输入密码</label> 
			<input size="large" type="password" v-model="loginForm.rePassword" placeholder="请输入6-16位密码">
		</div>
		<button type="" @click="step === 1 ? next() : submit()">{{step === 1 ? '下一步' : '提交'}}</button>
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
				this.step = 2;
				console.log('next!', this.loginForm);
			},
			submit() {
				console.log('submit!', this.loginForm);
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