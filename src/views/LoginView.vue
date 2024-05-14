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
    };
  },
  computed: {
    // Accès à un getter
    incorrectAuth() {
      return this.$store.getters['auth/authError'];
    }
  },
  methods: {
    login() {
      // Dispatch d'une action
      this.$store.dispatch('auth/login', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push({ name: 'dashboard' }); // Assurez-vous que le nom de la route est correct.
        alert('Login successful!');
      }).catch(error => {
        console.error("Login failed:", error);
        alert('Failed to login: ' + error.message);
      });
    }
  }
}
</script>
