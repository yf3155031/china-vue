import Vue from 'vue'
import Router from 'vue-router'
import home from '@/components/home'
import publish from '@/components/publish'
import informaction from '@/components/informaction'
import personal from '@/components/personal'
import content from '@/components/content'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
    	path: '/publish',
    	name: 'publish',
    	component: publish
    },
    {
    	path: '/informaction',
    	name: 'informaction',
    	component: informaction
    },
    {
    	path: '/personal/:loginname',
    	name: 'personal',
    	component: personal
    },
    {  
    	path: '/content/:id',
    	name: 'content',
    	component: content
    },
    {
    	path: '/login',
    	name: 'login',
    	component: login
    }
  ]
})
