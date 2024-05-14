import { createStore } from "vuex";
import getAPI from "./axios-api";

const auth = {
  namespaced: true,
  state: {
    accessToken: null,
    refreshToken: null,
    authError: null, // Use null to indicate no error initially
  },
  getters: {
    isLoggedIn: (state) => !!state.accessToken,
    authError: (state) => state.authError, // Simplified name for consistency
  },
  mutations: {
    SET_TOKENS(state, { accessToken, refreshToken }) {
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
      state.authError = null; // Reset auth error on successful token reception
    },
    CLEAR_TOKENS(state) {
      state.accessToken = null;
      state.refreshToken = null;
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
          // Gérer les erreurs, par exemple en retournant une promesse rejetée ou en utilisant un autre commit pour un état d'erreur
          throw error;
        });
    },
  },
};

export const store = createStore({
  modules: {
    auth: auth,
  },
});
