import Vue from 'vue'
import Router from 'vue-router'
import dashboard from './views/dashboard.vue'
import createProposal from './views/createProposal.vue'
import addHead from './views/addHead.vue'
import generateRequest from './views/generateRequest.vue'
import requestDashboard from './views/requestDashboard.vue'
import login from './views/login.vue'
import viewRequest from './views/viewRequest.vue'
import addUser from './views/addUser.vue'
import file from './views/file.vue'

import  store  from './store'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: login
 
      }
    ,
    {
      path: '/createProposal',
      name: 'createproposal',
      component: createProposal,
       beforeEnter:(to,from,next)=>{
        if(!store.state.token){
          next(false)
        }else{
          if(store.state.privilege === "Clerk")
            next();
          else {
            alert("Access denied");
            next('/')
          }  
        }
        }     
        
    },
    {
      path: '/addHead',
      name: 'addHead',
      component: addHead,
      beforeEnter:(to,from,next)=>{
        if(!store.state.token){
          next('/')
        }else{
          if(store.state.privilege === "Clerk")
            next();
          else {
            alert("Access denied");
            next('/')
          }  
        }
        }
    },
    {
      path: '/makeRequest',
      name: 'generateRequest',
      component: generateRequest,
      // beforeEnter:(to,from,next)=>{
      //   if(!store.state.token){
      //     next('/')
      //   }else{
      //     if(store.state.privilege === "Clerk")
      //       next();
      //     else {
      //       alert("Access denied");
      //       next('/')
      //     }  
      //   }
      //   }
    },
    {
      path: '/requestDashboard',
      name: 'requestDashboard',
      component: requestDashboard,
      beforeEnter:(to,from,next)=>{
        if(!store.state.token){
          next('/')
        }else{
          if(store.state.privilege === "Principal Investigator")
            next();
          else {
            alert("Access denied");
            next('/')
          }  
        }
        }
    },
    {
      path: '/file',
      name: 'file',
      component: file,
      beforeEnter:(to,from,next)=>{
        if(!store.state.token){
          next('/')
        }else{
          if(store.state.privilege ==="Clerk")
            next();
          else {
            alert("Access denied");
            next('/')
          }  
        }
        }
    },
    {
      path: '/viewRequest',
      name: 'viewRequest',
      component: viewRequest,
      beforeEnter:(to,from,next)=>{
        if(!store.state.token){
          next('/')
        }else{
          if(store.state.privilege === "Clerk"||store.state.privilege === "Principal Investigator")
            next();
          else {
            alert("Access denied");
            next('/')
          }  
        }
        }
    },
    {
      path:'/addUser',
      name:'addUser',
      component:addUser,
      beforeEnter:(to,from,next)=>{
        if(!store.state.token){
          next('/')
        }else{
          if(store.state.privilege === "Clerk")
            next();
          else {
            alert("Access denied");
            next('/')
          }  
        }
        }
    }
    

  ]
})
