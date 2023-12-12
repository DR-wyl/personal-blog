import { createRouter, createWebHashHistory } from 'vue-router'
import DetailPage from '../views/DetailPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: DetailPage
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
