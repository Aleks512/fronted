<template>
  <div class="background-container">
    <div class="overlay">
      <div class="container mt-5">
        <div class="row">
          <!-- Display posts fetched from the API -->
          <div v-for="post in APIData" :key="post.id" class="col-md-4">
            <div class="card m-2">
              <div class="card-body">
                <h3 class="card-title">{{ post.city }}</h3>
                <h4 class="card-title">{{ post.title }}</h4>
                <p class="card-text">{{ post.content }}</p>
                <h5 class="card-title">{{ post.event_date }}</h5>
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
.background-container {
  background: url('@/assets/salad-cezar2.webp') no-repeat center center fixed;
  background-size: cover;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.overlay {
  background-color: rgba(237, 255, 204, 0.8);

  width: 100%;
  padding: 50px 0;
}

.card {
  background: rgba(255, 255, 255, 0.9);
}

.card-title {
  font-family: 'Lobster', cursive;
}

h5 {
  font-size: 1.5rem;
}

.container {
  max-width: 1200px;
}
</style>
