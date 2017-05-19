<template>
<div>
  <button @click="toggle(true)" class="btn"><mu-icon value="menu" :size="16"/></button>
  <mu-drawer :open="open" :docked="docked" @close="toggle()" right style="width: 200px;">
    <mu-list @itemClick="docked ? '' : toggle()">
    	<mu-list-item title="主页" to="/" />
      <mu-list-item title="发布" to="/publish" />
      <mu-list-item title="信息" to="/informaction" />
      <mu-list-item title="个人中心" :to=" '/personal/' + loginname " v-show=" accesstoken "/>
      <mu-list-item title="登录" to="/login" v-show=" !accesstoken "/>
      <mu-list-item title="退出" v-show=" accesstoken " @click=" loginOut() "/>
    </mu-list>
  </mu-drawer>
</div>
</template>

<script>
export default {
	name: 'sideBar',
  data () {
    return {
      open: false,
      docked: true,
      accesstoken: '',
      loginname: ''
    }
  },
  methods: {
    toggle (flag) {
      this.open = !this.open
      this.docked = !flag
    },
    loginOut() {
      localStorage.removeItem("accesstoken");
      this.$router.push({
        path: 'login'
      })
    }
  },
  mounted() {
    this.accesstoken = localStorage.getItem('accesstoken');
    this.loginname = localStorage.getItem('loginname');
  }
}
</script>

<style lang="scss" scoped>
  .btn{
    min-width: 35px;
    border: none;
    height: 35px;
    line-height: 41px;
    width: 30px;
    border-radius: 30px;
    position: fixed;
    right: 10px;
    bottom: 50px;
    z-index: 10;
    background-color: #2196f3;
    &:active{
      outline: none;
    }
    i{
      line-height: 0;
      color: white;
    }
  }
</style>