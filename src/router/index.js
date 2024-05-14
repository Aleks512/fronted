import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "@/views/AboutView.vue";
import PublicRecipesList from "@/views/PublicRecipesList.vue";
import PublicRecipeDetail from "@/views/PublicRecipeDetail.vue";
import PostsView from "@/views/posts/PostsView.vue";
import PostView from "@/views/posts/PostView.vue";
import LoginView from "@/views/LoginView.vue";
import LogoutView from "@/views/LogoutView.vue";
import { store } from "../store"; //
import DashboardView from "@/views/DashboardView.vue";
import RegisterView from "@/views/RegisterView.vue"; 
import AddReceite from "@/views/private/AddReceite.vue";
import DeleteReceipe from "@/views/private/DeleteReceipe.vue";
import EditReceipe from "@/views/private/EditReceipe.vue";
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
    path: '/recipes-list/',
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
    path: "/add-receipe",
    name: "add-receipe",
    component: AddReceite,
  },
  {
    path: "/delete-receipe/:id",
    name: "delete-receipe",
    component: DeleteReceipe,
    props: true,
  },
  {
    path: "/edit-receipe/:id",
    name: "edit-receipe",
    component: EditReceipe,
    props: true,
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: DashboardView,
    beforeEnter: (to, from, next) => {
      // Vérifie si l'utilisateur est connecté
      if (!store.getters["auth/isLoggedIn"]) {
        next({ name: "Login" }); // Redirige vers la page de connexion si non connecté
      } else {
        next(); // Continue vers le tableau de bord si connecté
      }
    },
  },
  {
    path: "/register",
    name: "register",
    component: RegisterView, // Ajoutez la nouvelle route pour l'inscription
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

  // Redirect
  {
    path: "/about-us",
    redirect: { name: "about" },
  },
  {
    path: "/all-posts",
    redirect: { name: "posts" },
  },
  // Catch All 404
  {
    path: "/:catchAll(.*)",
    component: () => import("@/views/NotFoundView.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
