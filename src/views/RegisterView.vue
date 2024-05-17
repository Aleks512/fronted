<template>
  <div class="register-container">
    <h2>Inscription</h2>
    <form @submit.prevent="register">
      <div>
        <label for="name">Nom</label>
        <input type="text" v-model="name" required />
      </div>
      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Mot de passe</label>
        <input type="password" v-model="password" required />
      </div>
      <div>
        <label for="password2">Confirmer le mot de passe</label>
        <input type="password" v-model="password2" required />
      </div>
      <button type="submit">S'inscrire</button>
    </form>
    <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegisterView',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password2: '',
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions('auth', ['register']),
    async register() {
      try {
        await this.register({
          name: this.name,
          email: this.email,
          password: this.password,
          password2: this.password2
        });
        this.$router.push({ name: 'login' });
      } catch (error) {
        this.errorMessage = "Inscription échouée: " + error.response.data.detail;
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}
.error {
  color: red;
}
</style>
