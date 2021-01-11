import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ShowDetails from '../views/ShowDetails.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/showdetails',
    name: 'ShowDetails',
    component: ShowDetails
  }
]

const router = new VueRouter({
  routes
})

export default router
