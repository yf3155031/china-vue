// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueAxios from 'vue-axios';
import axios from 'axios';

import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'	// muse-ui框架
import 'muse-ui/dist/theme-light.css' // 使用carbon主题

Vue.use(MuseUI);
Vue.use(vueAxios,axios);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
