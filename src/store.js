import { createStore } from "vuex";
import getAPI from "./axios-api";
import jwt_decode from 'jwt-decode';


// Define the auth module
const auth = {
  namespaced: true,
  state: {
    accessToken: sessionStorage.getItem('accessToken') || null,
    refreshToken: sessionStorage.getItem('refreshToken') || null,
    authError: null, // Use null to indicate no error initially
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    authError: (state) => state.authError, // Simplified name for consistency
  },
  mutations: {
    SET_TOKENS(state, { accessToken, refreshToken }) {
      const decoded = jwt_decode(accessToken);
      const expiresAt = decoded.exp * 1000; // Convert to milliseconds
  
      sessionStorage.setItem('accessToken', accessToken);
      sessionStorage.setItem('refreshToken', refreshToken);
      sessionStorage.setItem('expiresAt', expiresAt);
  
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.expiresAt = expiresAt;
      state.authError = null; // Reset auth error
    },
    CLEAR_TOKENS(state) {
      state.accessToken = null;
      state.refreshToken = null;
      sessionStorage.removeItem('accessToken');
      sessionStorage.removeItem('refreshToken');
      delete getAPI.defaults.headers.common["Authorization"]; // Remove the auth header
    },
    SET_AUTH_ERROR(state, error) {
      state.authError = error; // Store the error message
    },
  },
  actions: {
    register({ commit }, credentials) {
      return getAPI
        .post("/register", credentials) // Ensure this matches your API endpoint
        .then(({ data }) => {
          commit("SET_TOKENS", {
            accessToken: data.access, // Adjust these if your API returns different fields
            refreshToken: data.refresh,
          });
          getAPI.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${data.access}`;
        })
        .catch((error) => {
          console.error("Registration failed:", error);
          commit("SET_AUTH_ERROR", "Registration failed"); // Set a general registration error
          throw error;
        });
    },
    async login({ commit }, credentials) {
      try {
        const response = await getAPI.post("/api-token/", credentials);
        commit("SET_TOKENS", {
          accessToken: response.data.access,
          refreshToken: response.data.refresh,
        });
        getAPI.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.data.access}`;
      } catch (error) {
        console.error("Login failed:", error);
        commit("SET_AUTH_ERROR", "Login failed"); // Set a more specific login error
        throw error;
      }
    },
    logout({ commit }) {
      commit("CLEAR_TOKENS");
    },
    toggleActiveStatus({ commit }, { user }) {
      const updatedStatus = !user.is_active;
      return getAPI
        .patch(`/users/${user.id}`, { is_active: updatedStatus })
        .then(() => {
          commit("UPDATE_USER_STATUS", {
            userId: user.id,
            isActive: updatedStatus,
          });
        })
        .catch((error) => {
          console.error("Error updating user status:", error);
          // Handle errors, for example by returning a rejected promise or using another commit for an error state
          throw error;
        });
    },
    async refreshToken({ commit, state }) {
      if (!state.refreshToken) {
        throw new Error("No refresh token available.");
      }
      try {
        const response = await getAPI.post('/api-token-refresh/', { refresh: state.refreshToken });
        commit("SET_TOKENS", {
          accessToken: response.data.access,
          refreshToken: response.data.refresh, // Assume the server sends a new refresh token
        });
        return response.data.access;
      } catch (error) {
        console.error("Token refresh failed:", error);
        commit("CLEAR_TOKENS");
        throw error;
      }
    },
  }
};

// Create the Vuex store
export const store = createStore({
  modules: {
    auth: auth,
  },
});
