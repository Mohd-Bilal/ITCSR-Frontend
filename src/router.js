import Vue from 'vue'
import Router from 'vue-router'
import dashboard from './views/dashboard.vue'
import createProposal from './views/createProposal.vue'
import addHead from './views/addHead.vue'
import generateRequest from './views/generateRequest.vue'
import requestDashboard from './views/requestDashboard.vue'
import login from './views/login.vue'
import viewRequest from './views/viewRequest.vue'

import file from './views/file.vue'


Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: login
    },
    {
      path: '/createProposal',
      name: 'createproposal',
      component: createProposal
    },
    {
      path: '/addHead',
      name: 'addHead',
      component: addHead
    },
    {
      path: '/makeRequest',
      name: 'generateRequest',
      component: generateRequest
    },
    {
      path: '/requestDashboard',
      name: 'requestDashboard',
      component: requestDashboard
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/file',
      name: 'file',
      component: file
    },
    {
      path: '/viewRequest',
      name: 'viewRequest',
      component: viewRequest
    }
    

  ]
})
