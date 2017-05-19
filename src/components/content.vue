<template>
	<div id="content">
		<mu-appbar>
			<span>正文</span>
			<mu-flat-button color="white" label="返回首页" slot="left" to="/" />
		</mu-appbar>
		<h3 class="title">
			<mu-badge content="置顶" secondary slot="after" v-if=" content.top " color="rgb(255,206,23)"/>
			{{ content.title }}
		</h3>
		<mu-content-block>
    	<p>
    		<span class="content_info">发布于&nbsp;{{ content.create_at | getTimeAgo }}</span>
    		<span class="content_info">{{ content.visit_count }}&nbsp;次浏览</span>
    		<span class="content_info">来自&nbsp;<mu-badge :content=" content.tab | getTag " primary slot="after" style="margin-left: 5px"/></span>
    	</p>
    	<div v-html=" content.content "></div>
    	<h3>评论区：{{ content.reply_count }} 条回复</h3>
    	<mu-list>
				<mu-list-item v-for=" (reply,index) in content.replies " :key=" reply.id ">
					<mu-avatar :src=" reply.author.avatar_url " slot="leftAvatar"/>
					<span slot="describe">
		      	<span style="color: #000;margin-right: 5px">{{ reply.author.loginname }}</span>
		      	<span>{{ index + 1 }}楼</span>
	          <span class="timer">
	            {{ reply.create_at | getTimeAgo }}
	          </span>
		      	<span style="margin-right: 5px;display:inline-block;background-color: #ff4081;border-radius: 3px;color: white;font-size: 12px;padding: 0 5px" @click=" giveUp(reply.id) ">{{ reply.ups | getUp }}</span>
		      	<mu-badge :content=" reply.ups.length + '人点赞' " secondary slot="after" color="rgb(255,206,23)"/>
	        </span>
	        <div v-html=" reply.content "></div>
				</mu-list-item>
			</mu-list>
			<mu-text-field hintText="添加回复" multiLine fullWidth inputClass="text" v-model=" m_reply " v-show=" accesstoken "/><br/>
			<mu-raised-button label="回复" secondary @click=" sendReply() " v-show=" accesstoken "/>
		  <mu-dialog :open=" dialog " title="添加回复成功">
		    添加回复成功
		    <mu-flat-button label="确定" slot="actions" primary @click=" close "/>
		  </mu-dialog>
		  <h3 v-show=" !accesstoken ">回复区</h3>
		  <div v-show=" !accesstoken ">请先<router-link :to="{ name: 'login' }">登录</router-link></div>
  	</mu-content-block>
		<sideBar></sideBar>
	</div>
</template>

<script>
	import sideBar from './common/sideBar'
	import timeago from 'timeago.js'
	export default {
		name: 'content',
		data() {
			return {
				content: {},
				m_reply: '',
				accesstoken: '',
				dialog: false,

			}
		},
		methods: {
			sendReply() {
				if(!this.m_reply) return false;
				let _self = this;
				let id = this.$route.params.id;
				this.axios.post('https://www.vue-js.com/api/v1/topic/' + id + '/replies',{
					accesstoken: _self.accesstoken,
					content: _self.m_reply
				})
					.then(respone => {
						this.m_reply = ''
						_self.open();
					})
					.catch(error => {
						throw error;
					});
			},
			getData() {
				let _self = this;
				let id = this.$route.params.id;
				let url = 'https://www.vue-js.com/api/v1/topic/' + id;
				this.axios.get(url)
					.then(respone => {
						_self.content = respone.data.data;
						console.log(_self.content);
					})
					.catch(error => {
						throw error;
					})
			},
			open () {
	      this.dialog = true
	    },
	    close () {
	    	let _self = this;
	      this.dialog = false;
	      window.location.reload(true);
	    },
	    giveUp(id) {
	    	let _self = this;
	    	let url = 'https://www.vue-js.com/api/v1/reply/' + id + '/ups';
	    	this.axios.post(url,{
	    		accesstoken: _self.accesstoken
	    	})
	    		.then(respone => {
	    			window.location.reload(true);
	    		})
	    		.catch(error => {
	    			console.log(error);
	    		})
	    }
		},
		filters: {
			getTag(val) {
        switch (val) {
          case 'share':
            return '分享'
          case 'good':
            return '精华'
          case 'weex':
            return 'weex';
          case 'ask': 
            return '问答'
          case 'job': 
            return '招聘'
        }
      },
      getTimeAgo(val) {
        var time = timeago();
        return time.format(val,'zh_CN')
      },
      getUp(ups) {
      	let id = localStorage.getItem('user_id');
      	let res = ups.some((el,indx) => {
      		return el == id;
      	});
      	if (!res) return '赞';
      	return '取消赞'
      }
		},
		components: {
			sideBar
		},
		created() {
			this.accesstoken = localStorage.getItem('accesstoken');
			this.getData();
		}
	}
</script>

<style lang="scss" scoped>
	.title{
		padding: 8px 16px;
	}
	.content_info{
		color: #ccc;
		margin-right: 5px;
	}
	.text{
		height: 36px !important;
	}
</style>