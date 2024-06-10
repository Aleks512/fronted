<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <img src="../assets/Logo-kitchen.png" alt="Kitchen Logo" width="50" height="40" />
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link :to="{ name: 'home' }" class="nav-link">Accueil</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'PublicRecipesList' }" class="nav-link">Recettes</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'posts' }" class="nav-link">Événements</router-link>
          </li>
        </ul>
        <ul class="navbar-nav ms-auto">
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'login' }" class="nav-link">Se connecter</router-link>
          </li>
          <li v-if="!isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'register' }" class="nav-link">S'inscrire</router-link>
          </li>
          <li v-if="isLoggedIn" class="nav-item">
            <router-link :to="{ name: 'private-recipes-list' }" class="nav-link">Mes recettes</router-link>
          </li>
          <!-- Link for logout, calls the logout method on click -->
          <li v-if="isLoggedIn" class="nav-item">
            <a @click.prevent="logout" class="nav-link" href="#">Logout</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'NavBar',
  computed: {
    ...mapGetters('auth', ['isLoggedIn']), // Map Vuex getter to check if the user is logged in
  },
  methods: {
    ...mapActions('auth', ['logout']), // Map Vuex action to logout the user
    async logout() {
      // Call the logout action and then redirect to the login page
      await this.logout();
      this.$router.push({ name: 'login' });
    },
  },
};
</script>

<style>
nav {
  font-size: 1rem !important;
  background-color: #FFDE59 !important;
}
a:hover {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  line-height: 1.5rem;
  font-size-adjust: inherit;
}
</style>
