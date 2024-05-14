<template>
    <div class="register-container">
      <h1>Inscription</h1>
      <form @submit.prevent="register">
        <div>
          <label for="name">Nom :</label>
          <input id="name" type="text" v-model="form.name" required>
        </div>
        <div>
          <label for="email">Email :</label>
          <input id="email" type="email" v-model="form.email" required>
        </div>
        <div>
          <label for="password">Mot de passe :</label>
          <input id="password" type="password" v-model="form.password" required>
        </div>
        <div>
          <label for="password2">Confirmer le mot de passe :</label>
          <input id="password2" type="password" v-model="form.password2" required>
        </div>
        <div>
          <button type="submit">S'inscrire</button>
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
  