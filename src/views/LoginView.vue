<template>
  <div class="container position-relative mt-5 p-0">
    <div class="row no-gutters">
      <div class="col-12">
        <img :src="logo" class="img-fluid w-100" alt="Logo Kitchen" style="height: 100vh; object-fit: cover; filter: brightness(50%);">
        <div class="position-absolute top-50 start-50 translate-middle w-100">
          <div class="col-md-6 offset-md-3 bg-white p-5 rounded shadow-lg" style="background: rgba(255, 255, 255, 0.8);">
            <p v-if="incorrectAuth" class="text-danger">Incorrect email or password entered - please try again</p>
            <form @submit.prevent="login" class="form" novalidate>
              <div class="form-group mb-3">
                <label for="email">Email</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Enter email" required @input="validateEmail">
                <span v-if="emailError" class="text-danger">{{ emailError }}</span> <!-- Message d'erreur pour email invalide -->
              </div>
              <div class="form-group mb-3">
                <label for="password">Password</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Enter password" required @input="validatePassword">
                <span v-if="passwordError" class="text-danger">{{ passwordError }}</span> <!-- Message d'erreur pour mot de passe invalide -->
              </div>
              <button type="submit" class="btn btn-custom w-100" :disabled="!isFormValid">Login</button> <!-- Bouton désactivé tant que le formulaire n'est pas valide -->
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      emailError: '', // Message d'erreur pour l'email
      passwordError: '', // Message d'erreur pour le mot de passe
      logo: require('@/assets/pages/vegetarian_meal.webp')
    };
  },
  computed: {
    // Accès à un getter pour obtenir l'erreur d'authentification
    incorrectAuth() {
      return this.$store.getters['auth/authError'];
    },
    // Validation de l'état du formulaire
    isFormValid() {
      return !this.emailError && !this.passwordError && this.email && this.password;
    }
  },
  methods: {
    login() {
      // Désinfection manuelle des entrées pour retirer les caractères potentiellement dangereux
      const sanitizedEmail = this.sanitizeInput(this.email);
      const sanitizedPassword = this.sanitizeInput(this.password);

      // Dispatch d'une action de login avec les entrées désinfectées
      this.$store.dispatch('auth/login', {
        email: sanitizedEmail,
        password: sanitizedPassword
      }).then(() => {
        this.$router.push({ name: 'private-recipes-list' }); // Assurez-vous que le nom de la route est correct.
      }).catch(error => {
        console.error("Login failed:", error);
        alert('Failed to login: ' + error.message);
      });
    },
    validateEmail() {
      // Validation de l'email avec une expression régulière
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.email.match(emailPattern)) {
        this.emailError = 'Please enter a valid email address.'; // Message d'erreur si l'email est invalide
      } else {
        this.emailError = '';
      }
    },
    validatePassword() {
      // Validation du mot de passe pour vérifier qu'il est d'au moins 8 caractères
      if (this.password.length < 8) {
        this.passwordError = 'Password must be at least 8 characters long.'; // Message d'erreur si le mot de passe est trop court
      } else {
        this.passwordError = '';
      }
    },
    sanitizeInput(input) {
      // Retire les caractères potentiellement dangereux pour éviter les attaques XSS
      return input.replace(/[<>\/\\'"]/g, ''); 
    }
  }
}
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à ce composant */
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

.text-danger {
  color: #dc3545;
}
</style>
