<template>
  <div>
    <h1>Mes Recettes</h1>
    <form @submit.prevent="addRecipe">
      <div>
        <label for="title">Titre</label>
        <input v-model="newRecipe.title" type="text" id="title" required>
      </div>
      <div>
        <label for="desc">Description</label>
        <textarea v-model="newRecipe.desc" id="desc" required></textarea>
      </div>
      <div>
        <label for="cook_time">Temps de cuisson (minutes)</label>
        <input v-model="newRecipe.cook_time" type="number" id="cook_time" required>
      </div>
      <div>
        <label for="ingredients">Ingrédients</label>
        <textarea v-model="newRecipe.ingredients" id="ingredients" required></textarea>
      </div>
      <div>
        <label for="picture">URL de l'image</label>
        <input v-model="newRecipe.picture" type="text" id="picture">
      </div>
      <div>
        <label for="category">Catégorie</label>
        <input v-model="newRecipe.category" type="number" id="category" required>
      </div>
      <button type="submit" class="btn btn-success">Ajouter la recette</button>
    </form>

    <div class="table-responsive">
      <table class="table">
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
              <img v-if="recipe.picture" :src="recipe.picture" alt="Recipe Picture" style="width: 100px; height: 100px;">
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
    </div>
    <p v-if="recipes.length === 0">Aucune recette trouvée. Ajoutez votre première recette!</p>
    <router-link to="/recipe/new" class="btn btn-success">Ajouter une nouvelle recette</router-link>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  data() {
    return {
      newRecipe: {
        title: '',
        desc: '',
        cook_time: 0,
        ingredients: '',
        picture: '',
        category: 1
      }
    };
  },
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
    addRecipe() {
      console.log('Adding recipe:', this.newRecipe); // Log pour débogage
      this.$store.dispatch('recipes/createRecipe', this.newRecipe)
        .then(() => {
          console.log('Recipe added successfully');
          this.newRecipe = {
            title: '',
            desc: '',
            cook_time: 0,
            ingredients: '',
            picture: '',
            category: 1
          };
          this.fetchMyRecipes();
        })
        .catch(error => {
          console.error('Error adding recipe:', error);
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
};
</script>

<style scoped>
/* Ajoutez ici des styles spécifiques à ce composant */
</style>
