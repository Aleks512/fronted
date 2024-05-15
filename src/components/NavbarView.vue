<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
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
              <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'PublicRecipesList' }" class="nav-link">Receipes</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'posts' }" class="nav-link">Posts</router-link>
            </li>
          </ul>
          <ul class="navbar-nav ms-auto"> <!-- Added ms-auto to align right -->
            <li class="nav-item">
              <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
      name: 'NavBar',
      data() {
          return {
              // Your component's data properties go here
          };
      },
      methods: {
          // Your component's methods go here
      },
      computed: {
          // Your component's computed properties go here
      },
      mounted() {
          // Code to run when the component is mounted goes here
      },
      // Your component's lifecycle hooks go here
  };
  </script>
  
  <style scoped>
  nav {
    font-family: 'Arial', sans-serif;
    font-size: 1rem !important;
    background-color: #FFDE59 !important;
}
  </style>
  