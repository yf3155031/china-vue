<template>
	<div id="login">
		<mu-appbar>
			<span>登录</span>
			<mu-flat-button color="white" label="返回首页" slot="left" to="/" />
		</mu-appbar>
		<div class="wrap">
			<mu-text-field v-model="val" label="请输入accesstoken" :errorText="error" labelFloat/>
			<mu-raised-button @click="login" label="登录" primary/>
		</div>
		<mu-content-block>
			<mu-sub-header>
				知识点
			</mu-sub-header>
			如何获取 accessToken？ 用户登录后，在设置页面可以看到自己的 accessToken。 建议各移动端应用使用手机扫码的形式登录，验证使用 /accesstoken 接口，登录后长期保存 accessToken
		</mu-content-block>
		<mu-popup position="top" :overlay="false" popupClass="popup-top" :open="topPopup">
	    登录成功
	  </mu-popup>
	  <sideBar></sideBar>
	</div>
</template>

<script>
	import sideBar from './common/sideBar.vue'
	export default {
		name: 'login',
		data() {
			return {
				val: '',
        error: '',
        topPopup: false
			}
		},
		methods: {
			login() {
				if (!this.val) return false;
				let _self = this;
				this.axios.post('https://www.vue-js.com/api/v1/accesstoken',{
					accesstoken: _self.val
				})
					.then(respone => {
		        localStorage.setItem('accesstoken', _self.val);
            localStorage.setItem('user_id', respone.data.id);
            localStorage.setItem('loginname', respone.data.loginname);
            localStorage.setItem('avatar_url',respone.data.avatar_url);
          	_self.val = '';
            _self.open('top');
            setTimeout(() => {
	            _self.$router.push({
	            	path: '/'
	            })
            }, 1000);
					})
					.catch(error => {
						_self.error = '请检查你的accesstoken'
					})
			},
			open (position) {
	      this[position + 'Popup'] = true
	    },
	    close (position) {
	      this[position + 'Popup'] = false
	    }
		},
		watch: {
	    topPopup (val) {
	      if (val) {
	        setTimeout(() => {
	          this.topPopup = false
	        }, 2000)
	      }
	    }
  	},
  	components: {
  		sideBar
  	}
	}
</script>

<style lang="scss" scoped>
	#login{
		.title{
			text-align: center;
		}
		.wrap{
			flex: 1;
			text-align: center;
		}
	}	
	.popup-top{
		width: 100%;
	  opacity: .8;
	  height: 48px;
	  line-height: 48px;
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  max-width: 375px;
	}
</style>