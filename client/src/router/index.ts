import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import SignIn from '@/views/SignIn'
import Signup from '@/views/SignUp'
import TestJwt from '@/views/TestJwt'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/signin',
    name: 'SignIn',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/test-jwt',
    name: 'TestJwt',
    component: TestJwt
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
