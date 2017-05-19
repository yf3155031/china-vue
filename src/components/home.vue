<template>
	<div id="home">
		<mu-tabs :value=" activeTab " @change=" changeTab ">
		  <mu-tab title="全部" value="all"/>
		  <mu-tab title="精华" value="good"/>
		  <mu-tab title="wexx" value="wexx"/>
		  <mu-tab title="分享" value="share"/>
		  <mu-tab title="问答" value="ask"/>
		  <mu-tab title="招聘" value="job"/>
		</mu-tabs>
		<mu-list>
			<mu-list-item :title=" msg.title " v-for=" msg in messages " :to=" 'content/' + msg.id " :key="msg.id">
				<mu-avatar :src=" msg.author.avatar_url " slot="leftAvatar"/>
				<span slot="describe">
	      	<span style="color: #000;margin-right: 5px">{{ msg.author.loginname }}</span>
	      	{{ msg.reply_count }} / {{ msg.visit_count }}
          <mu-badge :content=" msg.tab | getTag " secondary slot="after" style="margin-left: 5px"/>
          <mu-badge content="置顶" secondary slot="after" v-if=" msg.top " color="rgb(255,206,23)"/>
          <span class="timer">
            {{ msg.create_at | getTimeAgo }}
          </span>
        </span>
			</mu-list-item>
			<p v-if=" !messages.length " class="tip">无话题</p>
		</mu-list>
		<div v-if=" messages.length ">
			<mu-pagination :total=" total " :current=" page " @pageChange=" pageChange ">
	    </mu-pagination>
		</div>
    <sideBar></sideBar>
	</div>
</template>

<script>
  import timeago from 'timeago.js';
  import sideBar from './common/sideBar.vue'
	export default {
    name: 'home',
		data() {
			return {
				messages: [],
				activeTab: 'all',
				url: 'http://www.vue-js.com/api/v1/topics?tab=all',
        flag: true,
        page: 1,
        total: 200
			}
		},
		methods: {
			changeTab(val) {
				this.activeTab = val;
				this.getData();
			},
			getData() {
        this.page = 1;
				let _self = this;
				this.url = 'https://www.vue-js.com/api/v1/topics?tab=' + this.activeTab;
				this.axios.get(this.url)
					.then(respone => {
						_self.messages = respone.data.data;
					})
					.catch(error => {
						throw error
					})
			},
			pageChange (newPage) {
        if(this.flag) {
          this.flag = false;
          this.page = newPage;
  	      let _self = this;
          let url = _self.url + '&page=' + this.page;
  	      let arr = [];
          this.axios.get(url)
            .then(respone => {
              arr = respone.data.data;
              _self.messages = [...arr];
              _self.flag = true;
            })
            .catch(error => {
              throw(error);
            })
        }
	    }
		},
		created(){
			this.getData();
		},
		mounted() {
			this.scroller = window;
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
      }
    },
    components: {
      sideBar
    }
	}
</script>

<style lang="scss" scoped>
  .timer{
    float: right;
  }
	.tip{
		text-align: center;
		font-weight: bold;
	}
</style>