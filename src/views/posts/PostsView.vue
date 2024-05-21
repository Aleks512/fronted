<template>
  <h1>Evenements </h1>

  
      <div class="container">
        <div class="row">
          <!-- Display posts fetched from the API -->
          <div v-for="post in APIData" :key="post.id" class="col-md-4">
            <div class="card m-2">
  <div class="card-body">
    <h5 class="card-title">{{ post.title }}</h5>
    <p class="card-text">With supporting text below as a natural lead-in to additional content.</p>
    <a href="#" class="btn btn-primary">Button</a>
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