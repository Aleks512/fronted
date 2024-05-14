<template>
    <div>
      <h1>Détails de la Recette</h1>
      <div v-if="recipe">
        <h2>{{ recipe.title }}</h2>
        <p>{{ recipe.desc }}</p>
        <button @click="deleteRecipe">Supprimer la Recette</button>
        <button @click="editMode = true">Modifier la Recette</button>
      </div>
  
      <div v-if="editMode">
        <input v-model="recipe.title" placeholder="Titre">
        <textarea v-model="recipe.desc" placeholder="Description"></textarea>
        <button @click="updateRecipe">Sauvegarder</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        recipe: null,
        editMode: false
      };
    },
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    mounted() {
      this.fetchRecipe();
    },
    methods: {
      fetchRecipe() {
        axios.get(`/api/recipes/${this.id}/`)
          .then(response => {
            this.recipe = response.data;
          })
          .catch(error => console.error("Erreur lors de la récupération de la recette:", error));
      },
      updateRecipe() {
        axios.put(`/api/recipes/${this.id}/`, this.recipe)
          .then(response => {
            this.recipe = response.data;
            this.editMode = false;
          })
          .catch(error => console.error("Erreur lors de la mise à jour de la recette:", error));
      },
      deleteRecipe() {
        axios.delete(`/api/recipes/${this.id}/`)
          .then(() => {
            alert("Recette supprimée!");
            this.$router.push('/'); // Rediriger l'utilisateur après la suppression
          })
          .catch(error => console.error("Erreur lors de la suppression de la recette:", error));
      }
    }
  }
  </script>
  