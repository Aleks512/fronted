<template>
  <div>
    <h1 class="my-4">Mes Recettes</h1>
    <!-- Zone de notification -->
    <div v-if="successMessage" class="alert alert-success" role="alert">
      {{ successMessage }}
    </div>

    <form @submit.prevent="addRecipe" enctype="multipart/form-data" class="mb-4">
      <div class="form-group">
        <label for="title">Titre</label>
        <input v-model="newRecipe.title" type="text" id="title" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="desc">Description</label>
        <textarea v-model="newRecipe.desc" id="desc" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="cook_time">Temps de cuisson (minutes)</label>
        <input v-model="newRecipe.cook_time" type="number" id="cook_time" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="ingredients">Ingrédients</label>
        <textarea v-model="newRecipe.ingredients" id="ingredients" class="form-control" required></textarea>
      </div>
      <div class="form-group">
        <label for="picture">Image</label>
        <input @change="onFileChange" type="file" id="picture" class="form-control-file">
      </div>
      <div class="form-group">
        <label for="category">Catégorie</label>
        <input v-model="newRecipe.category" type="number" id="category" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-success">Ajouter la recette</button>
    </form>

    <div v-if="isLoggedIn" class="table-responsive">
      <table class="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Photo</th>
            <th>Titre</th>
            <th>Date de publication</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in recipes" :key="recipe.id">
            <td>{{ recipe.id }}</td>
            <td>
              <img v-if="recipe.picture" :src="recipe.picture" alt="Recipe Picture" class="img-thumbnail" style="width: 100px; height: 100px;">
              <div v-else>Manque le visuel</div>
            </td>
            <td>{{ recipe.title }}</td>
            <td>{{ formatDate(recipe.created_at) }}</td>
            <td>
              <button @click="editRecipe(recipe)" class="btn btn-primary btn-sm">
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button @click="deleteRecipe(recipe.id)" class="btn btn-danger btn-sm">
                <i class="bi bi-trash-fill"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="recipes.length === 0">Aucune recette trouvée. Ajoutez votre première recette!</p>
    <p v-else-if="!isLoggedIn">Vous devez être connecté pour voir vos recettes.</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import { format } from 'date-fns';
import getAPI from '../../axios-api';

export default {
  data() {
    return {
      newRecipe: {
        title: '',
        desc: '',
        cook_time: 0,
        ingredients: '',
        picture: null,
        category: 1
      },
      recipes: [],
      isEditMode: false,
      editRecipeId: null,
      successMessage: '', // Message de succès
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: 'auth/isLoggedIn',
    }),
  },
  created() {
    this.checkLoginAndFetch();
  },
  methods: {
    onFileChange(e) {
      const file = e.target.files[0];
      this.newRecipe.picture = file;
    },
    fetchRecipes() {
      getAPI.get('/api/my-recipes/')
        .then((response) => {
          console.log('Recipes fetched successfully', response.data);
          this.recipes = response.data;
        })
        .catch((err) => {
          console.error('Error fetching recipes:', err);
        });
    },
    addRecipe() {
      console.log('Adding recipe:', this.newRecipe); // Log pour débogage

      const formData = new FormData();
      formData.append('title', this.newRecipe.title);
      formData.append('desc', this.newRecipe.desc);
      formData.append('cook_time', this.newRecipe.cook_time);
      formData.append('ingredients', this.newRecipe.ingredients);
      formData.append('category', this.newRecipe.category);
      if (this.newRecipe.picture) {
        formData.append('picture', this.newRecipe.picture);
      }

      let apiMethod = this.isEditMode ? 'put' : 'post';
      let apiUrl = this.isEditMode ? `/api/recipes/${this.editRecipeId}/update/` : '/api/recipes/create/';

      getAPI[apiMethod](apiUrl, formData, {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
          'Content-Type': 'multipart/form-data'
        }
      })
      .then(() => {
        this.successMessage = `Recette ${this.isEditMode ? 'mise à jour' : 'ajoutée'} avec succès`;
        setTimeout(() => {
          this.successMessage = '';
        }, 3000);
        this.resetForm();
        this.fetchRecipes();
      })
      .catch(error => {
        console.error(`Error ${this.isEditMode ? 'updating' : 'adding'} recipe:`, error);
        if (error.response) {
          console.error('Response data:', error.response.data);
          console.error('Response status:', error.response.status);
          console.error('Response headers:', error.response.headers);
        }
      });
    },
    editRecipe(recipe) {
      this.isEditMode = true;
      this.editRecipeId = recipe.id;
      this.newRecipe = { ...recipe, picture: null }; // Exclude picture to avoid issues with FormData
    },
    deleteRecipe(id) {
      console.log('Attempting to delete recipe with ID:', id); // Ajout de log pour débogage
      if (confirm(`Êtes-vous sûr de vouloir supprimer cette recette ? ID: ${id}`)) {
        getAPI.delete(`/api/recipes/${id}/delete/`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
          }
        })
        .then(() => {
          this.successMessage = 'Recette supprimée avec succès';
          setTimeout(() => {
            this.successMessage = '';
          }, 3000);
          this.fetchRecipes();
        })
        .catch(error => {
          console.error('Error deleting recipe:', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          }
        });
      }
    },
    formatDate(date) {
      return format(new Date(date), 'dd/MM/yyyy HH:mm');
    },
    checkLoginAndFetch() {
      if (this.isLoggedIn) {
        this.fetchRecipes();
      } else {
        console.log('User is not logged in');
      }
    },
    resetForm() {
      this.newRecipe = {
        title: '',
        desc: '',
        cook_time: 0,
        ingredients: '',
        picture: null,
        category: 1
      };
      this.isEditMode = false;
      this.editRecipeId = null;
    }
  },
  watch: {
    isLoggedIn(newValue) {
      if (newValue) {
        this.fetchRecipes();
      } else {
        this.recipes = [];
        console.log('User is not logged in or has logged out');
      }
    }
  }
};
</script>

<style scoped>

</style>
