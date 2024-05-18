import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PublicRecipesList from "@/views/PublicRecipesList.vue";
import PublicRecipeDetail from "@/views/PublicRecipeDetail.vue";
import PostsView from "@/views/posts/PostsView.vue";
import PostView from "@/views/posts/PostView.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import { store } from "../store"; // Assurez-vous que le chemin est correct
import DashboardView from "@/views/DashboardView.vue";
import RegisterView from "@/views/RegisterView.vue"; 

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
  },
  {
    path: '/recipes-list',
    name: 'PublicRecipesList',
    component: PublicRecipesList,
    props: true
  },
  {
    path: '/recipe/:id',
    name: 'PublicRecipeDetail',
    component: PublicRecipeDetail,
    props: true
  },
  {
    path: "/posts",
    name: "posts",
    component: PostsView,
    beforeEnter: (to, from, next) => {
      if (store.getters["auth/isLoggedIn"]) {
        next();
      } else {
        next({ name: "login" }); // Redirigez vers la page de connexion si non connecté
      }
    },
  },
  {
    path: "/post/:id",
    name: "post",
    component: PostView,
    props: true,
  },
  
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: (to, from, next) => {
      if (!store.getters["auth/isLoggedIn"]) {
        next({ name: "login" }); // Redirige vers la page de connexion si non connecté
      } else {
        next(); // Continue vers le tableau de bord si connecté
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView,
  },
  {
    path: "/login",
    name: "login",
    component: LoginView,
  },
  {
    path: "/logout",
    name: "logout",
    component: LogoutView,
  },
  {
    path: "/about-us",
    redirect: { name: "about" },
  },
  {
    path: "/all-posts",
    redirect: { name: "posts" },
  },
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
