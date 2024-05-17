<template>
  <div class="register-container container mt-5">
    <h1 class="mb-4">Inscription</h1>
    <form @submit.prevent="submitRegister">
      <div class="mb-3">
        <label for="name" class="form-label">Nom :</label>
        <input id="name" type="text" class="form-control" v-model="form.name" required>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">Email :</label>
        <input id="email" type="email" class="form-control" v-model="form.email" required>
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Mot de passe :</label>
        <input id="password" type="password" class="form-control" v-model="form.password" required>
      </div>
      <div class="mb-3">
        <label for="password2" class="form-label">Confirmer le mot de passe :</label>
        <input id="password2" type="password" class="form-control" v-model="form.password2" required>
      </div>
      <div>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
      </div>
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
      form: {
        name: '',
        email: '',
        password: '',
        password2: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    ...mapActions('auth', ['register']),
    async submitRegister() {
      try {
        console.log("Attempting to register with data:", this.form);
        await this.register({
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password2: this.form.password2
        });
        console.log("Registration successful, redirecting to login...");
        this.$router.push({ name: 'login' });
      } catch (error) {
        console.error("Registration failed with error:", error);
        this.errorMessage = "Inscription échouée: " + (error.response?.data?.detail || error.message);
      }
    }
  }
};
</script>

<style scoped>
.register-container {
  margin: auto;
  width: 300px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
}
label {
  margin: 10px 0 5px;
  display: block;
}
input[type="text"], input[type="email"], input[type="password"] {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px 15px;
  cursor: pointer;
}
.error {
  color: red;
}
</style>
