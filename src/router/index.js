import { createRouter, createWebHistory } from "vue-router";
import { store } from "../store"; // Assurez-vous que le chemin est correct
import PublicRecipeDetail from "@/views/PublicRecipeDetail.vue";
const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/HomeView.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/AboutView.vue"),
  },
  {
    path: "/recipes-list",
    name: "PublicRecipesList",
    component: () => import("@/views/PublicRecipesList.vue"),
    props: true,
  },
  {
    path: "/recipe/:id",
    name: "PublicRecipeDetail",
    component: PublicRecipeDetail,
    props: route => ({ id: Number(route.params.id) }), // Conversion explicite de id en Number
  },
  {
    path: "/posts",
    name: "posts",
    component: () => import("@/views/posts/PostsView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("@/views/DashboardView.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "register",
    component: () => import("@/views/RegisterView.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/logout",
    name: "logout",
    component: () => import("@/views/LogoutView.vue"),
  },
  {
    path: "/my-recipes",
    name: "private-recipes-list",
    component: () => import("@/views/private/PrivateRecipesList.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/recipe/:id",
    name: "private-recipe-detail",
    component: () => import("@/views/private/PrivateRecipeDetail.vue"),
    meta: { requiresAuth: true },
    props: true,
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

// Guard global pour vérifier les routes nécessitant une authentification
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Cette route nécessite une authentification
    if (store.getters["auth/isLoggedIn"]) {
      next(); // L'utilisateur est connecté, continuer vers la route
    } else {
      next({ name: "login" }); // Rediriger vers la page de connexion
    }
  } else {
    next(); // Pas de vérification nécessaire, continuer vers la route
  }
});

export default router;
