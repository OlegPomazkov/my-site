import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '@/views/Home.vue'
import ComingSoon from '@/views/ComingSoon.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/resumeformal',
    name: 'ResumeFormal',
    component: () => import(/* webpackChunkName: "resumeformal" */ '../views/ResumeFormal.vue')
  },
  {
    path: '/freestyle',
    name: 'Freestyle',
    component: ComingSoon
  },
  {
    path: '/art',
    name: 'Art',
    component: ComingSoon
  },
  {
    path: '/games',
    name: 'Games',
    component: ComingSoon
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
