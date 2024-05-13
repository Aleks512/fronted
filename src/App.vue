<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <router-link :to="{ name: 'home' }" class="navbar-brand">Home</router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link :to="{ name: 'about' }" class="nav-link">About</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'posts' }" class="nav-link">Posts</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'login' }" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'logout' }" class="nav-link">Logout</router-link>
        </li>
      </ul>
    </div>
  </nav>

  <button @click="redirect">Redirect</button>
  <button @click="back">Back</button>
  <button @click="forward">Forward</button>

  <router-view/>
</template>

<script>
export default {
  name: 'App',
  methods: {
    redirect() {
      this.$router.push({ name: 'home' });
    },
    back() {
      this.$router.back();
    },
    forward() {
      this.$router.forward();
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #041423;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #020e09;
  background-color: chartreuse;
}

button {
  margin: 0 10px;
  padding: 10px;
  border-radius: 4px;
  border: none;
}
</style>
