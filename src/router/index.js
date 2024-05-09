import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PostsView from '@/views/posts/PostsView.vue'
import PostView from '@/views/posts/PostView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView

  },
  {
    path: '/posts',
    name: 'posts',
    component: PostsView
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView,
    props: true
  },

  // Redirect
  {
    path: '/about-us',
    redirect: { name: 'about' }
  },
  {
    path: '/all-posts',
    redirect: { name: 'posts' }
  },
  // Catch All 404
  {
    path: '/:catchAll(.*)',
    component: () => import('@/views/NotFoundView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
