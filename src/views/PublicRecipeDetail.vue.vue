<template>
    <div v-if="recipe">
      <h1>{{ recipe.title }}</h1>
      <img :src="recipe.picture" alt="Image de la recette" v-if="recipe.picture"/>
      <p>Description: {{ recipe.desc }}</p>
      <p>Temps de cuisson: {{ recipe.cook_time }}</p>
      <p>Ingrédients:</p>
      <ul>
        <li v-for="ingredient in recipe.ingredients.split(',')" :key="ingredient">{{ ingredient }}</li>
      </ul>
      <p>Procédure:</p>
      <div>{{ recipe.procedure }}</div>
    </div>
    <div v-else>
      <p>Chargement des détails de la recette...</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        recipe: null
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
      }
    }
  }
  </script>
  
  <style scoped>
  h1 {
    color: #2c3e50;
  }
  img {
    max-width: 100%;
    height: auto;
  }
  </style>
  