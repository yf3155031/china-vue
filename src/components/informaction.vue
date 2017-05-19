<template>
	<div id="informaction">
		<mu-appbar>
			<span>消息</span>
			<mu-flat-button color="white" label="返回首页" slot="left" to="/" />
		</mu-appbar>
		<template v-if=" accesstoken ">
			<mu-card>
				<h3 class="title">新消息</h3>
				<mu-content-block>
					<p v-if=" !not_read_messages.length ">无消息</p>
					<template v-for=" item in not_read_messages">
						<router-link :to=" '/personal/' + item.author.loginname ">{{ item.author.loginname }}</router-link>
						回复了你的话题
						<router-link :to=" '/content/' + item.topic.id ">《{{ item.topic.title }}》</router-link>
					</template>
				</mu-content-block>		
				<h3 class="title">过往消息</h3>
				
				<mu-content-block>
					<p v-if=" !read_messages.length ">无消息</p>
					<template v-for=" item in read_messages ">
						<router-link :to=" '/personal/' + item.author.loginname ">{{ item.author.loginname }}</router-link>
						回复了你的话题
						<router-link :to=" '/content/' + item.topic.id ">《{{ item.topic.title }}》</router-link>
					</template>
				</mu-content-block>
			</mu-card>
		</template>
		<template v-else>
			<div class="tipLogin">请先<router-link :to="{ name: 'login' }">登录</router-link></div>
		</template>
		<sideBar></sideBar>		
	</div>
</template>

<script>
	import sideBar from './common/sideBar.vue'
	export default {
		name: 'information',
		data() {
			return {
				accesstoken: '',
				read_messages: [],	// 已经阅读
				not_read_messages: [] // 还未阅读
			}
		},
		created() {
			this.accesstoken = localStorage.getItem('accesstoken');
			let _self = this;

			// 获取已经读消息数
			let url = 'https://www.vue-js.com/api/v1/messages?accesstoken=' + this.accesstoken;
			this.axios.get(url,{
				accesstoken: _self.accesstoken
			})
				.then(respone => {
					_self.read_messages = respone.data.data.has_read_messages;
					_self.not_read_messages = respone.data.data.hasnot_read_messages;
				})
				.catch(error => {
					console.log(error);
				})
		},
		components: {
			sideBar
		}
	}
</script>

<style lang="scss" scoped>
	.tipLogin{
		padding: 8px 16px;
	}
</style>