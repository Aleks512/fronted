<template>
  <div class="container mt-3">
    <h1 class="mb-4">Recettes et Catégories</h1>
    <div class="row">
      <div class="col-md-6">
        <h2>Catégories</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="category in categories" :key="category.id">{{ category.name }}</li>
        </ul>
      </div>
      <div class="col-md-6">
        <h2>Recettes</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="recipe in recipes" :key="recipe.id">
            <strong>{{ recipe.title }}</strong> - {{ recipe.desc }}
            <img :src="recipe.picture" class="img-fluid" alt="Recipe Image" v-if="recipe.picture">
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import getAPI from "@/axios-api"; 

export default {
  data() {
    return {
      recipes: []
    };
  },
  created() {
    this.loadRecipes();
  },
  methods: {
    loadRecipes() {
      getAPI.get('/api/recipes/')
        .then(response => {
          this.recipes = response.data;
        })
        .catch(error => {
          console.error("Failed to load recipes:", error);
        });
    }
  }
}
</script>

<style scoped>
h1, h2 {
  color: #333;
}
</style>
