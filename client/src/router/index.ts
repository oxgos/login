import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SignIn from '@/views/SignIn' 
import Signup from '@/views/SignUp' 

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/signin',
    name: 'signin',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'signup',
    component: Signup
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
