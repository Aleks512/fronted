<template>
    <div>
      <h1>{{ isEdit ? 'Modifier' : 'Créer' }} une Recette</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-3">
          <label for="title" class="form-label">Titre</label>
          <input type="text" v-model="recipe.title" class="form-control" id="title" required>
        </div>
        <div class="mb-3">
          <label for="picture" class="form-label">URL de l'image</label>
          <input type="text" v-model="recipe.picture" class="form-control" id="picture">
        </div>
        <button type="submit" class="btn btn-primary">{{ isEdit ? 'Mettre à jour' : 'Créer' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      id: {
        type: Number, // Accepter des entiers pour l'ID
        required: false, // Ne pas exiger cette prop si elle n'est pas fournie
      }
    },
    data() {
      return {
        recipe: {
          title: '',
          picture: ''
        },
        isEdit: false
      };
    },
    created() {
      if (this.id) {
        this.isEdit = true;
        this.fetchRecipe();
      }
    },
    methods: {
      fetchRecipe() {
        this.$store.dispatch('recipes/fetchRecipe', this.id)
          .then(recipe => {
            this.recipe = recipe;
          })
          .catch(error => {
            console.error('Error fetching recipe:', error);
          });
      },
      handleSubmit() {
        if (this.isEdit) {
          this.$store.dispatch('recipes/updateRecipe', { id: this.id, recipeData: this.recipe })
            .then(() => {
              this.$router.push({ name: 'private-recipes-list' });
            })
            .catch(error => {
              console.error('Error updating recipe:', error);
            });
        } else {
          this.$store.dispatch('recipes/createRecipe', this.recipe)
            .then(() => {
              this.$router.push({ name: 'private-recipes-list' });
            })
            .catch(error => {
              console.error('Error creating recipe:', error);
            });
        }
      }
    }
  }
  </script>
  
  <style scoped>
  /* Ajoutez ici des styles spécifiques à ce composant */
  </style>
  