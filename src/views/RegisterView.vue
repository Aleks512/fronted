<template>
  <div class="container position-relative mt-5 p-0">
    <div class="row no-gutters">
      <div class="col-12">
        <img :src="backgroundImage" class="img-fluid w-100" alt="Background Image" style="height: 100vh; object-fit: cover; filter: brightness(50%);">
        <div class="position-absolute top-50 start-50 translate-middle w-100">
          <div class="col-md-6 offset-md-3 bg-white p-5 rounded shadow-lg" style="background: rgba(255, 255, 255, 0.8);">
            <h1 class="mb-4 text-center">Inscription</h1>
            <form @submit.prevent="submitRegister">
              <div class="mb-3">
                <label for="name" class="form-label">Nom :</label>
                <input id="name" type="text" class="form-control" v-model="form.name" required>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email :</label>
                <input id="email" type="email" class="form-control" v-model="form.email" required>
                <small v-if="emailError" class="text-danger">{{ emailError }}</small>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Mot de passe :</label>
                <input id="password" type="password" class="form-control" v-model="form.password" required>
                <small v-if="passwordError" class="text-danger">{{ passwordError }}</small>
              </div>
              <div class="mb-3">
                <label for="password2" class="form-label">Confirmer le mot de passe :</label>
                <input id="password2" type="password" class="form-control" v-model="form.password2" required>
                <small v-if="passwordMatchError" class="text-danger">{{ passwordMatchError }}</small>
              </div>
              <div>
                <button type="submit" class="btn btn-custom w-100">S'inscrire</button>
              </div>
            </form>
            <div v-if="errorMessage" class="text-danger mt-3 text-center">{{ errorMessage }}</div>
          </div>
        </div>
      </div>
    </div>
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
      errorMessage: '',
      emailError: '',
      passwordError: '',
      passwordMatchError: '',
      backgroundImage: require('@/assets/pages/ananas_salad.webp') // Charger l'image de fond
    };
  },
  methods: {
    ...mapActions('auth', ['register']),
    validatePassword(password) {
      const minLength = 10;
      const hasNumber = /\d/;
      const hasUpperCase = /[A-Z]/;
      const hasLowerCase = /[a-z]/;
      return (
        password.length >= minLength &&
        hasNumber.test(password) &&
        hasUpperCase.test(password) &&
        hasLowerCase.test(password)
      );
    },
    async submitRegister() {
      this.passwordError = '';
      this.emailError = '';
      this.passwordMatchError = '';
      this.errorMessage = '';

      if (!this.validatePassword(this.form.password)) {
        this.passwordError = 'Le mot de passe doit contenir au moins 10 caractères, une majuscule, une minuscule et un chiffre.';
        return;
      }

      if (this.form.password !== this.form.password2) {
        this.passwordMatchError = 'Les mots de passe ne correspondent pas.';
        return;
      }

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
        if (error.response?.data) {
          if (error.response.data.email) {
            this.emailError = error.response.data.email.join(' ');
          }
          if (error.response.data.password) {
            this.passwordError = error.response.data.password.join(' ');
          }
          if (error.response.data.detail) {
            this.errorMessage = error.response.data.detail;
          }
        } else {
          this.errorMessage = "Une erreur est survenue lors de l'inscription. Veuillez réessayer.";
        }
      }
    }
  }
};
</script>

<style scoped>
.container-fluid {
  padding: 0;
  margin: 0;
}

.no-gutters {
  margin: 0;
}

.img-fluid {
  filter: brightness(50%);
}

.bg-white {
  background: rgba(237, 255, 204, 0.8) !important;
}

.shadow-lg {
  box-shadow: 0 1rem 3rem rgba(0, 0, 0, 0.175) !important;
}
.btn-custom {
  font-family: 'cursive' !important;
  background-color: #E60020 !important;
}
</style>
