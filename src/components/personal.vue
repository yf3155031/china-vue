<template>
	<div id="personal">
		<mu-appbar>
			<span>个人中心</span>
			<mu-flat-button color="white" label="返回首页" slot="left" to="/" />
		</mu-appbar>
		<template v-if=" accesstoken ">
			<mu-card>
				<h3 class="title">基本资料</h3>
			  <mu-card-header :title=" user.loginname " :subTitle=" '积分：' + user.score ">
			    <mu-avatar :src=" user.avatar_url " slot="avatar"/>
			  </mu-card-header>
			  <p class="title">注册时间：{{ user.create_at | getTimeAgo }}</p>
				<h3 class="title">最近创建的话题</h3>
				<mu-list>
					<mu-list-item :title=" topic.title " v-for=" topic in user.recent_topics " :to="{name: 'content',params:{id: topic.id}}" :key=" topic.id ">
						<mu-avatar :src=" topic.author.avatar_url " slot="leftAvatar"/>
						<span slot="describe">
			      	<span style="color: #000;margin-right: 5px">{{ topic.author.loginname }}</span>
		        </span>
					</mu-list-item>
					<p v-show=" !user.recent_topics " class="title">无话题</p>
				</mu-list>
				<h3 class="title">最近参与的话题</h3>
				<mu-list>
					<mu-list-item :title=" topic.title " v-for=" topic in user.recent_replies " :to="{name: 'content',params:{id: topic.id}}" :key=" topic.id ">
						<mu-avatar :src=" topic.author.avatar_url " slot="leftAvatar"/>
						<span slot="describe">
			      	<span style="color: #000;margin-right: 5px">{{ topic.author.loginname }}</span>
		        </span>
					</mu-list-item>
					<p v-show=" !user.recent_replies " class="title">无话题</p>
				</mu-list>
			</mu-card>
		</template>
		<template v-else>
			<div class="tipLogin">请先<router-link :to="{ name: 'login' }">登录</router-link></div>
		</template>
		<sideBar></sideBar>		
	</div>
</template>

<script>
	import timeago from 'timeago.js'
	import sideBar from './common/sideBar.vue'
	export default {
		name: 'personal',
		data() {
			return {
				accesstoken: '',
				user: {},
				time: {}
			}
		},
		created() {
			this.accesstoken = localStorage.getItem('accesstoken');
			let _self = this;
			let loginName = this.$route.params.loginname;
			let url = 'https://www.vue-js.com/api/v1/user/' + loginName;
			this.axios.get(url)
				.then(respone => {
					_self.user = respone.data.data;
				})
				.catch(error => {
					throw error;
				})
		},
		components: {
			sideBar
		},
		filters: {
			getTimeAgo(val) {
        var time = timeago();
        return time.format(val,'zh_CN')
      }
		}
	}
</script>

<style lang="scss" scoped>
	#personal{
		.title{
			margin: 0;
		}
		.tipLogin{
			padding: 8px 16px;
		}
	}
</style>