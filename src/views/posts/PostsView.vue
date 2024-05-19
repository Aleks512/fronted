<!-- PostsView.vue -->
<template>
  <h1>Posts</h1>
  <div v-if="isLoggedIn" class="posts">
   
    <div class="album py-5 bg-light">
      <div class="container">
        <div class="row">
          <!-- Display posts fetched from the API -->
          <div v-if="APIData.length > 0">
            <div v-for="post in APIData" :key="post.id" class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img
                  class="card-img-top"
                  src="https://via.placeholder.com/150x100"
                  alt="Card image cap"
                />
                <div class="card-body">
                  <h4>
                    <router-link
                      :to="{ name: 'post', params: { id: post.id } }"
                      class="text-secondary"
                      >{{ post.title }}</router-link
                    >
                  </h4>
                  <p class="card-text">{{ post.content }}</p>
                  <div
                    class="d-flex justify-content-between align-items-center"
                  >
                    <div class="btn-group">
                      <a
                        href=""
                        class="btn btn-sm btn-outline-primary"
                        role="button"
                        >View</a
                      >
                      <a
                        href=""
                        class="btn btn-sm btn-outline-secondary"
                        role="button"
                        >Edit</a
                      >
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else>
            <div class="text-center">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only"></span>
              </div>
              <p>Loading ...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <p>You need to be logged in to view this page</p>
  </div>
</template>

<script>
import getAPI from "../../axios-api"; // Correct import path
import { mapGetters } from "vuex";

export default {
  name: "PostsView",
  data() {
    return {
      APIData: [],
    };
  },
  created() {
    // Le retrait de l'appel API de cette partie et le laisser géré uniquement par le watcher
    this.checkLoginAndFetch();
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "auth/isLoggedIn",
    }),
  },
  methods: {
    fetchPosts() {
      getAPI.get("/posts/")
        .then((response) => {
          console.log("API fetched data successfully", response.data);
          this.APIData = response.data;
          console.log("API data assigned to APIData:", this.APIData);
        })
        .catch((err) => {
          console.error("Error fetching posts:", err);
        });
    },
    checkLoginAndFetch() {
      if (this.isLoggedIn) {
        this.fetchPosts();
      } else {
        console.log("User is not logged in");
      }
    }
  },
  watch: {
  isLoggedIn(newValue) {
    if (newValue) {
      this.fetchPosts();
    } else {
      this.APIData = [];
      console.log("User is not logged in or has logged out");
    }
  }
}
};
</script>


<style scoped>
/* Your scoped styles here */
</style>