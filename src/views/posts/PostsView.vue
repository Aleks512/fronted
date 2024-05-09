<!-- PostsView.vue -->
<template>
    <h1>Posts</h1>
    <div class="posts">
      <!-- Add your Navbar here if needed -->
      <div class="album py-5 bg-light">
        <div class="container">
          <div class="row">
            <!-- Display posts fetched from the API -->
            <div v-for="post in APIData" :key="post.id" class="col-md-4">
              <div class="card mb-4 box-shadow">
                <img class="card-img-top" src="https://via.placeholder.com/150x100" alt="Card image cap" />
                <div class="card-body">
                  <h4>
                    <a class="text-secondary" href="">{{ post.title }}</a>
                  </h4>
                  <p class="card-text">{{ post.content }}</p>
                  <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                      <a href="" class="btn btn-sm btn-outline-primary" role="button">View</a>
                      <a href="" class="btn btn-sm btn-outline-secondary" role="button">Edit</a>
                    </div>
                    <small class="text-muted">9 mins</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import getAPI from '../../axios-api'; // Correct import path
  
  export default {
    name: 'PostsView',
    data() {
      return {
        APIData: [],
      };
    },
    created() {
      // Fetch posts via the API
      getAPI
        .get('/posts/')
        .then((response) => {
          console.log('API fetched data successfully');
          this.APIData = response.data;
        })
        .catch((err) => {
          console.error('Error fetching posts:', err);
        });
    },
  };
  </script>
  
  <style scoped>
  /* Your scoped styles here */
  </style>
  