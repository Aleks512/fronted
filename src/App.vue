<template>
  <NavBar />
 
  <!-- <button @click="redirect">Redirect</button>
  <button @click="back">Back</button>
  <button @click="forward">Forward</button> -->

  <router-view/>
</template>

<script>
import NavBar from '@/components/NavbarView.vue'


export default {
  name: 'App',
  components: {
    NavBar
  },
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
