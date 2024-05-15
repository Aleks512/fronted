<template>
  <div class="container mt-5" v-if="recipe">
    <div class="row">
      <div class="col-md-8">
        <h1>{{ recipe.title }}</h1>
        <img :src="getImageUrl(recipe.picture)" class="img-fluid img-thumbnail" alt="Image de la recette"
          v-if="recipe.picture">
        <p class="mt-3"><strong>Description:</strong> {{ recipe.desc }}</p>
        <p><strong>Temps de cuisson:</strong> {{ recipe.cook_time }} minutes</p>
      </div>
      <div class="col-md-4">
        <h2>Ingrédients</h2>
        <ul>
          <li v-for="(ingredient, index) in recipe.ingredients.split(',')" :key="index">{{ ingredient }}</li>
        </ul>
        <h2>Author</h2>
        <div>{{ recipe.author }}</div>
      </div>
    </div>
  </div>
  <div v-else class="text-center">
    <p>Chargement des détails de la recette...</p>
  </div>
</template>

<script>
import getAPI from "@/axios-api";

export default {
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      recipe: null,
      error: null
    };
  },
  mounted() {
    this.fetchRecipe();
  },
  methods: {
    fetchRecipe() {
      getAPI.get(`/api/recipes/${this.id}/`)
        .then(response => {
          this.recipe = response.data;
        })
        .catch(error => {
          this.error = "Erreur lors de la récupération de la recette";
          console.error(this.error, error);
        });
    },
    getImageUrl(path) {
      if (!path) return '';
      return `${process.env.VUE_APP_API_URL}${path}`;
    }
  }
}
</script>

<style scoped>
h1,
h2 {
  color: #2c3e50;
}
</style>
