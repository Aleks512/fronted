import { createStore } from "vuex";
import getAPI from "./axios-api";
import router from '@/router';

const auth = {
  namespaced: true,
  state: {
    accessToken: sessionStorage.getItem('accessToken') || null,
    refreshToken: sessionStorage.getItem('refreshToken') || null,
    accessTokenExpiresAt: sessionStorage.getItem('accessTokenExpiresAt') || null,
    refreshTokenExpiresAt: sessionStorage.getItem('refreshTokenExpiresAt') || null,
    authError: null,
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken && Date.now() < state.accessTokenExpiresAt,
    authError: (state) => state.authError,
  },
  mutations: {
    SET_TOKENS(state, { accessToken, refreshToken }) {
      const accessTokenExpiresAt = Date.now() + 30 * 60 * 1000; // 30 minutes
      const refreshTokenExpiresAt = Date.now() + 24 * 60 * 60 * 1000; // 1 day

      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('accessTokenExpiresAt', accessTokenExpiresAt);
      sessionStorage.setItem('refreshTokenExpiresAt', refreshTokenExpiresAt);

      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.accessTokenExpiresAt = accessTokenExpiresAt;
      state.refreshTokenExpiresAt = refreshTokenExpiresAt;
      state.authError = null;
    },
    CLEAR_TOKENS(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.accessTokenExpiresAt = null;
      state.refreshTokenExpiresAt = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      sessionStorage.removeItem('accessTokenExpiresAt');
      sessionStorage.removeItem('refreshTokenExpiresAt');
      delete getAPI.defaults.headers.common["Authorization"];
    },
    SET_AUTH_ERROR(state, error) {
      state.authError = error;
    },
  },
  actions: {
    register({ commit }, credentials) {
      return getAPI.post("/register/", credentials)
        .then(response => {
          console.log("Registration successful:", response.data); // Log the response data for debugging
        })
        .catch((error) => {
          console.error("Registration failed:", error.response?.data || error.message); // Log the error message for debugging
          commit("SET_AUTH_ERROR", "Registration failed");
          throw error;
        });
    },
    async login({ commit }, credentials) {
      try {
        const response = await getAPI.post("/api-token/", credentials);
        commit("SET_TOKENS", { accessToken: response.data.access, refreshToken: response.data.refresh });
        getAPI.defaults.headers.common["Authorization"] = `Bearer ${response.data.access}`;
      } catch (error) {
        console.error("Login failed:", error.response?.data || error.message); // Log the error message for debugging
        commit("SET_AUTH_ERROR", "Login failed");
        throw error;
      }
    },
    logout({ commit }) {
      commit("CLEAR_TOKENS");
      router.push({ name: 'login' });
    },
    toggleActiveStatus({ commit }, { user }) {
      const updatedStatus = !user.is_active;
      return getAPI.patch(`/users/${user.id}/`, { is_active: updatedStatus })
        .then(() => {
          commit("UPDATE_USER_STATUS", { userId: user.id, isActive: updatedStatus });
        })
        .catch((error) => {
          console.error("Error updating user status:", error.response?.data || error.message); // Log the error message for debugging
          throw error;
        });
    },
    async refreshToken({ commit, state }) {
      if (!state.refreshToken || Date.now() >= state.refreshTokenExpiresAt) {
        commit("CLEAR_TOKENS");
        router.push({ name: 'login' });
        throw new Error("Refresh token expired or not available.");
      }
      try {
        const response = await getAPI.post('/api-token-refresh/', { refresh: state.refreshToken });
        commit("SET_TOKENS", { accessToken: response.data.access, refreshToken: response.data.refresh });
        return response.data.access;
      } catch (error) {
        console.error("Token refresh failed:", error.response?.data || error.message); // Log the error message for debugging
        commit("CLEAR_TOKENS");
        router.push({ name: 'login' });
        throw error;
      }
    }
  }
};

// store/modules/recipes.js
const recipes = {
  namespaced: true, // Ajout du namespace
  state: {
    recipesList: [],
  },
  getters: {
    allRecipes: state => state.recipesList,
  },
  mutations: {
    SET_RECIPES(state, recipes) {
      state.recipesList = recipes;
    },
    ADD_RECIPE(state, recipe) {
      state.recipesList.push(recipe);
    },
    UPDATE_RECIPE(state, updatedRecipe) {
      const index = state.recipesList.findIndex(recipe => recipe.id === updatedRecipe.id);
      if (index !== -1) {
        state.recipesList.splice(index, 1, updatedRecipe);
      }
    },
    REMOVE_RECIPE(state, recipeId) {
      state.recipesList = state.recipesList.filter(recipe => recipe.id !== recipeId);
    },
  },
  actions: {
    fetchMyRecipes({ commit }) {
      return getAPI.get('/api/my-recipes/')
        .then(response => {
          commit('SET_RECIPES', response.data);
        })
        .catch(error => console.error('Failed to fetch recipes', error));
    },
    createRecipe({ commit }, recipeData) {
      return getAPI.post('/api/recipes/create/', recipeData)
        .then(response => {
          commit('ADD_RECIPE', response.data);
        })
        .catch(error => console.error('Failed to create recipe', error));
    },
    updateRecipe({ commit }, recipeData) {
      return getAPI.put(`/api/recipes/${recipeData.id}/update/`, recipeData)
        .then(response => {
          commit('UPDATE_RECIPE', response.data);
        })
        .catch(error => console.error('Failed to update recipe', error));
    },
    deleteRecipe({ commit }, recipeId) {
      return getAPI.delete(`/api/recipes/${recipeId}/delate`)
        .then(() => {
          commit('REMOVE_RECIPE', recipeId);
        })
        .catch(error => console.error('Failed to delete recipe', error));
    },
  }
};

export const store = createStore({
  modules: {
    auth : auth, // Enregistrement du module auth
    recipes :recipes // Enregistrement du module recipes
  }
});
