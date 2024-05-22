<template>
  <div id="app" class="d-flex flex-column min-vh-100">
    <NavBar />
    <main class="flex-grow-1">
      <router-view/>
    </main>
    <FooterView />
  </div>
</template>

<script>
import NavBar from '@/components/NavbarView.vue'
import FooterView from './components/FooterView.vue';

export default {
  name: 'App',
  components: {
    NavBar,
    FooterView
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
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #041423;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

@import url('https://fonts.googleapis.com/css2?family=Lobster&family=Bad+Script&family=Open+Sans:wght@400;700&display=swap');

body {
    background-color:#EDFFCC !important;
    color: #2c3e50;
    margin: 0;
    font-family: 'Open Sans', sans-serif;
}

/* Add styles using the fonts */
h1, h3 {
    font-family: 'Lobster', cursive;
    font-size: 3rem;
}
h2 {
    font-family: 'Bad Script';
    font-size: 2rem;
}

.btn-custom {
    font-family: 'cursive'!important;
    background-color: #E60020 !important;
}

.section-title {
    margin-bottom: 5rem;
}

p {
    font-size: 1rem !important;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  line-height: 1.5rem;
  font-size-adjust: inherit;
}

nav a.router-link-exact-active {
  color: #E60020 !important;
  text-decoration: underline red;
}

button {
 
  padding: 10px;
  border-radius: 4px;
  border: none;
}
</style>
