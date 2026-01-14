import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Info from '../views/Info.vue'
import Sayu from '../views/Sayu.vue'
import SayuEng from '../views/SayuEng.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/info',
    name: 'Info',
    component: Info
  },
  {
    path: '/sayu',
    name: 'Sayu',
    component: Sayu
  },
  {
    path: '/sayu-eng',
    name: 'SayuEng',
    component: SayuEng
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
