<template>
  <div class="container mt-3">
    <h1 class="mb-4">Recettes et Catégories</h1>
    <div class="row">
      <!-- <div class="col-md-3">
        <h2>Catégories</h2>
        <ul class="list-group">
          <li class="list-group-item" v-for="category in categories" :key="category.id">{{ category.name }}</li>
        </ul>
      </div> -->
      <div class="col-md-9">
        <h2>Recettes</h2>
        <div class="row">
          <div class="col-md-12" v-for="recipe in recipes" :key="recipe.id">
            <div class="card mb-3" style="cursor: pointer;" @click="viewRecipe(recipe.id)">
              <img :src="getImageUrl(recipe.picture)" class="card-img-top" alt="Image de la recette" v-if="recipe.picture">
              <div class="card-body">
                <h5 class="card-title">{{ recipe.title }}</h5>
                <p class="card-text">{{ recipe.desc }}</p>
                <p class="card-text"><small class="text-muted">Temps de cuisson: {{ recipe.cook_time }} minutes</small></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import getAPI from "@/axios-api";


export default {
  name: 'PublicRecipesList',
  data() {
    return {
      recipes: [],
      categories: []
    };
  },
  created() {
    this.loadRecipes();
    this.loadCategories();
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
    },
    loadCategories() {
      getAPI.get('/api/categories/')
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error("Failed to load categories:", error);
        });
    },
    getImageUrl(path) {
      if (!path) return '';
      return `${process.env.VUE_APP_API_URL}${path}`;
    },
    viewRecipe(id) {
      this.$router.push({ name: 'PublicRecipeDetail', params: { id } });
    }
  }
}
</script>


<style scoped>
h1, h2 {
  color: #333;
}

.card-img-top {
  width: 100%; /* ensures the image covers the card width */
  height: 18.75rem; /* REM-based height for consistency */
  object-fit: cover; /* ensures the image covers the space without distortion */
}
</style>
