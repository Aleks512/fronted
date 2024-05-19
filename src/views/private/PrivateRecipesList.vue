<template>
  <div>
    <h1>Mes Recettes</h1>
    <router-link to="/recipe/new" class="btn btn-success">Ajouter une nouvelle recette</router-link>
    <table class="table" v-if="recipes.length > 0">
      <thead>
        <tr>
          <th>Photo</th>
          <th>Titre</th>
          <th>Date de publication</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="recipe in recipes" :key="recipe.id">
          <td>
            <img v-if="recipe.picture" :src="recipe.picture" alt="Recipe Picture" class="img-thumbnail" style="width: 100px; height: 100px;">
            <div v-else>Manque le visuel</div>
          </td>
          <td>{{ recipe.title }}</td>
          <td>{{ formatDate(recipe.created_at) }}</td>
          <td>
            <button @click="editRecipe(recipe.id)" class="btn btn-primary">
              <i class="bi bi-pencil-fill"></i>
            </button>
            <button @click="deleteRecipe(recipe.id)" class="btn btn-danger">
              <i class="bi bi-trash-fill"></i>
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>Aucune recette trouvée. Ajoutez votre première recette!</p>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  computed: {
    recipes() {
      return this.$store.getters['recipes/allRecipes'];
    }
  },
  created() {
    this.fetchMyRecipes();
  },
  methods: {
    fetchMyRecipes() {
      this.$store.dispatch('recipes/fetchMyRecipes')
        .then(() => {
          console.log('Recipes fetched successfully');
        })
        .catch(error => {
          console.error('Error fetching recipes:', error);
        });
    },
    editRecipe(id) {
      this.$router.push({ name: 'edit-recipe', params: { id } });
    },
    deleteRecipe(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
        this.$store.dispatch('recipes/deleteRecipe', id)
          .then(() => {
            console.log('Recipe deleted successfully');
          })
          .catch(error => {
            console.error('Error deleting recipe:', error);
          });
      }
    },
    formatDate(date) {
      return format(new Date(date), 'dd/MM/yyyy HH:mm');
    }
  }
}
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à ce composant */
</style>
