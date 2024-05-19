<template>
    <div>
      <h1>Mes Recettes</h1>
      <form @submit.prevent="addRecipe" enctype="multipart/form-data">
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
          <label for="picture">Image</label>
          <input @change="onFileChange" type="file" id="picture">
        </div>
        <div>
          <label for="category">Catégorie</label>
          <input v-model="newRecipe.category" type="number" id="category" required>
        </div>
        <button type="submit" class="btn btn-success">Ajouter la recette</button>
      </form>
  
      <div v-if="isLoggedIn" class="table-responsive">
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
  
        getAPI.post('/api/recipes/create/', formData, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`,
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          console.log('Recipe added successfully');
          this.newRecipe = {
            title: '',
            desc: '',
            cook_time: 0,
            ingredients: '',
            picture: null,
            category: 1
          };
          this.fetchRecipes();
        })
        .catch(error => {
          console.error('Error adding recipe:', error);
          if (error.response) {
            console.error('Response data:', error.response.data);
            console.error('Response status:', error.response.status);
            console.error('Response headers:', error.response.headers);
          }
        });
      },
      editRecipe(id) {
        this.$router.push({ name: 'edit-recipe', params: { id } });
      },
      deleteRecipe(id) {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette recette ?')) {
          getAPI.delete(`/api/recipes/${id}/delete/`, {
            headers: {
              'Authorization': `Bearer ${sessionStorage.getItem('accessToken')}`
            }
          })
          .then(() => {
            console.log('Recipe deleted successfully');
            this.fetchRecipes();
          })
          .catch(error => {
            console.error('Error deleting recipe:', error);
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
  /* Ajoutez ici des styles spécifiques à ce composant */
  </style>
  