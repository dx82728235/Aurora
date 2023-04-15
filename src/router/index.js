import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

export const BaseRouters = [
  {
    path: '/doubansearch',
    name: 'doubansearch',
    component: () => import('../views/DouBanSearch.vue'),
    cName: '豆瓣搜索'
  },
  {
    path: '/favoritelive',
    name: 'favoritelive',
    component: () => import('../views/FavoriteLive.vue'),
    cName: '喜爱的直播'
  },
  // {
  //   path: '/ideas',
  //   name: 'ideas',
  //   component: () => import('../views/Ideas.vue'),
  //   cName: '未来的想法'
  // },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
    path: '/',
    name: 'home',
    redirect: '/doubansearch',
    component: HomeView,
    children: BaseRouters
  }],
})

export default router
