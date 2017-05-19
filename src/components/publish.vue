<template>
	<div id="publish">
		<mu-appbar>
			<span>发布话题</span>
			<mu-flat-button color="white" label="返回首页" slot="left" to="/" />
		</mu-appbar>
		<mu-content-block v-if=" accesstoken ">
		  <mu-select-field v-model=" tab " :labelFocusClass=" ['label-foucs'] " label="选择板块" fullWidth :errorText="err_tab" @open=" clearErrorText() ">
		  	<mu-menu-item v-for=" (text,index) in list " :key=" index " :value=" index " :title=" text "/>
		  </mu-select-field>
			<mu-text-field label="标题字数十个字以上" labelFloat fullWidth  v-model=" title " :errorText="err_title" @focus=" clearErrorText() "/><br/>
			<mu-text-field label="文章支持 Markdown 语法, 请注意标记代码" labelFloat multiLine :rows="12" fullWidth v-model=" content " :errorText="err_content" @focus=" clearErrorText() "/><br/>
			<mu-raised-button  label="发布" secondary @click=" send() "/>
			<mu-raised-button  label="查看正文" primary @click="open('bottom')"/>
		</mu-content-block>
		<template v-else>
			<div class="tipLogin">请先<router-link :to="{ name: 'login' }">登录</router-link></div>
		</template>
		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
	    登录成功
	 	</mu-popup>
	 	<mu-popup position="bottom" popupClass="demo-popup-bottom" :open="bottomPopup" @close="close('bottom')">
	    <mu-appbar :title="title">
	      <mu-flat-button slot="right" label="关闭" color="white" @click="close('bottom')"/>
	    </mu-appbar>
	    <mu-content-block>
	      <vue-markdown :source=" content "></vue-markdown>
	    </mu-content-block>
	  </mu-popup>
		<sideBar></sideBar>	
	</div>
</template>

<script>
	import sideBar from './common/sideBar.vue';
	import VueMarkdown from 'vue-markdown';
	export default {
		name: "publish",
		data() {
			return {
				list: ['分享', '问答', '招聘'],
				accesstoken: '',
				tab: '',
				err_tab: '',
				title: '',
				err_title: '',
				content: '',
				err_content: '',
				topPopup: false,
				bottomPopup: false,
			}
		},
		components: {
			sideBar,
			VueMarkdown
		},
		methods: {
			open (position) {
	      this[position + 'Popup'] = true
	    },
	    close (position) {
	      this[position + 'Popup'] = false
	    },
	    clearErrorText() {
	    	this.err_tab = '';
	    	this.err_title = '';
	    	this.err_content = '';
	    },
			send() {
				let _self = this;
				if(this.tab == '') {
					this.err_tab = '请检查板块是否选择'
					return false;
				}	else if (this.title == '' || this.title.length < 10) {
					this.err_title = '请检查标题格式是否正确';
					return false;
				}	else if (this.content == '') {
					this.err_content = '请检查正文是否填写';
					return false;
				}
				var tab = '';
				switch (this.tab) {
					case '分享':
						tab = 'share';
						break;
					case '问答':
						tab = 'ask';
						break;
					default:
						tab = 'job'
						break;
				};

				let url = 'https://www.vue-js.com/api/v1/topics';
				_self.open('top');
				this.axios.post(url,{
					accesstoken: _self.accesstoken,
					title: _self.title,
					tab: tab,
					content: _self.content
				})
					.then(respone => {
		        _self.title = '';
            _self.content = '';
            _self.tab = '';
            _self.open('top');
            setTimeout(() => {
	            _self.$router.push({
	            	path: '/'
	            })
            }, 1000);
					})
					.catch(error => {
						console.log(error);
					})
			}
		},
		created() {
			this.accesstoken = localStorage.getItem('accesstoken');
		},
		watch: {
	    topPopup (val) {
	      if (val) {
	        setTimeout(() => {
	          this.topPopup = false
	        }, 2000)
	      }
	    }
  	}
	}
</script>

<style lang="scss" scoped>
	.tipLogin{
		padding: 8px 16px;
	}
	.demo-popup-bottom {
	  width: 100%;
	  max-width: 375px;
	  height: 90%;
	  overflow: scroll;
	}
</style>