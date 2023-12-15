import { createRouter, createWebHashHistory } from 'vue-router'
// import DetailPage from '../views/DetailPage.vue'
import HomeLayout from '../views/layout/HomeLayout.vue'
import ContentLayout from '../views/layout/ContentLayout.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeLayout
  },
  {
    path: '/content',
    name: 'content',
    component: ContentLayout,
    meta: {
      name: '内容'
    },
    children: [
      {
        path: 'testpage',
        name: 'TestPage',
        component: () => import('@/views/TestPage.vue'),
        meta: {
          name: '测试页面'
        }
      },
      {
        path: 'detailpage',
        name: 'DetailPage',
        component: () => import('@/views/DetailPage.vue'),
      }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
