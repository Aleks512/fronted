// src/store.js
import { createStore } from 'vuex';
import getAPI from './axios-api';

const auth = {
  namespaced: true,
  state: {
    accessToken: null,
    refreshToken: null,
    authError: false,  // Added to track if there was an authentication error
  },
  getters: {
    isLoggedIn: state => !!state.accessToken,
    isAuthError: state => state.authError  // Getter to access the auth error state
  },
  mutations: {
    SET_TOKENS(state, { accessToken, refreshToken }) {
      console.log("Setting access token:", accessToken);
      console.log("Setting refresh token:", refreshToken);
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.authError = false;  // Reset auth error on successful login
    },
    CLEAR_TOKENS(state) {
      state.accessToken = null;
      state.refreshToken = null;
    },
    SET_AUTH_ERROR(state) {
      state.authError = true;  // Set auth error on login failure
    }
  },
  actions: {
    async login({ commit }, credentials) {
      try {
        const response = await getAPI.post('/api-token/', credentials);
        commit('SET_TOKENS', {
          accessToken: response.data.access,
          refreshToken: response.data.refresh
        });
        getAPI.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      } catch (error) {
        console.error('Login failed:', error);
        commit('SET_AUTH_ERROR');  // Commit the authentication error mutation
        throw error;
      }
    },
    logout({ commit }) {
      commit('CLEAR_TOKENS');
    }
  }
};

export const store = createStore({
  modules: {
    auth: auth
  }
});
