<template>
    <div>
      <h1>Ajouter une Nouvelle Recette</h1>
      <form @submit.prevent="addRecipe">
        <div>
          <label for="title">Titre</label>
          <input v-model="recipe.title" type="text" id="title" required>
        </div>
        <div>
          <label for="desc">Description</label>
          <textarea v-model="recipe.desc" id="desc" required></textarea>
        </div>
        <div>
          <label for="cook_time">Temps de cuisson (minutes)</label>
          <input v-model="recipe.cook_time" type="number" id="cook_time" required>
        </div>
        <div>
          <label for="ingredients">Ingrédients</label>
          <textarea v-model="recipe.ingredients" id="ingredients" required></textarea>
        </div>
        <div>
          <label for="picture">URL de l'image</label>
          <input v-model="recipe.picture" type="text" id="picture">
        </div>
        <div>
          <label for="category">Catégorie</label>
          <input v-model="recipe.category" type="number" id="category" required>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        recipe: {
          title: '',
          desc: '',
          cook_time: 0,
          ingredients: '',
          picture: '',
          category: 1 // ou un ID de catégorie par défaut
        }
      };
    },
    methods: {
      addRecipe() {
        this.$store.dispatch('recipes/createRecipe', this.recipe)
          .then(() => {
            this.$router.push({ name: 'home' });
          })
          .catch(error => {
            console.error('Error adding recipe:', error);
          });
      }
    }
  };
  </script>
  