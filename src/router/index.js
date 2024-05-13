import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '@/views/AboutView.vue'
import PostsView from '@/views/posts/PostsView.vue'
import PostView from '@/views/posts/PostView.vue'
import LoginView from '@/views/LoginView.vue'
import LogoutView from '@/views/LogoutView.vue'
import { store } from '../store'; //
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
    component: PostsView,
    beforeEnter: (to, from, next) => {
      if (store.getters['auth/isLoggedIn']) {
        next();
      } else {
        next({ name: 'login' }); // Redirigez vers la page de connexion si non connecté
      }
    }
  },
  {
    path: '/post/:id',
    name: 'post',
    component: PostView,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/logout',
    name: 'logout',
    component: LogoutView,
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
