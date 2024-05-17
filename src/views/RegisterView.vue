<template>
  <div class="register-container container mt-5">
    <h1 class="mb-4">Inscription</h1>
    <form @submit.prevent="register">
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
  </div>
</template>

  
  <script>
  import { useRouter } from 'vue-router';
  import getAPI from '@/axios-api';
  
  export default {
    name: 'RegisterView',
    setup() {
      const router = useRouter();
      const form = {
        name: '',
        email: '',
        password: '',
        password2: ''
      };
  
      const register = () => {
        if (form.password !== form.password2) {
          alert("Les mots de passe ne correspondent pas.");
          return;
        }
  
        getAPI.post('/register', {
          name: form.name,
          email: form.email,
          password: form.password
        })
        .then(() => {
          alert("Inscription réussie. Vous pouvez maintenant vous connecter.");
          router.push('/login');
        })
        .catch(error => {
          console.error("Erreur d'inscription:", error);
          alert("Erreur lors de l'inscription.");
        });
      };
  
      return { form, register };
    }
  };
  </script>
  
  <style>
  /* Styles basiques */
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
  </style>
  