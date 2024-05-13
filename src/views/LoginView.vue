<template>
  <p v-if="incorrectAuth" style="color: red;">Incorrect email or password entered - please try again</p>
  <form @submit.prevent="login">
    <input v-model="email" type="email" placeholder="Email" required>
    <input v-model="password" type="password" placeholder="Password" required>
    <button type="submit">Login</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      // incorrectAuth is now reactive based on Vuex state
    };
  },
  computed: {
    incorrectAuth() {
      return this.$store.getters['auth/isAuthError'];
    }
  },
  methods: {
    login() {
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({ name: 'posts' });
        alert('Login successful!');
      }).catch(error => {
        alert('Failed to login: ' + error.message);
      });
    }
  }
}
</script>
