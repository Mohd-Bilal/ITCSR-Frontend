import Vue from 'vue'
import Router from 'vue-router'
import dashboard from './views/dashboard.vue'
import createProposal from './views/createProposal.vue'
import addHead from './views/addHead.vue'
<<<<<<< HEAD
import generateRequest from './views/generateRequest.vue'
=======
import file from './views/file.vue'

>>>>>>> 1be8360f50fb63dbdb5e5aa7badfece77a800568

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: dashboard
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
<<<<<<< HEAD
      path: '/makeRequest',
      name: 'generateRequest',
      component: generateRequest
=======
      path: '/file',
      name: 'file',
      component: file
>>>>>>> 1be8360f50fb63dbdb5e5aa7badfece77a800568
    }
    

  ]
})
