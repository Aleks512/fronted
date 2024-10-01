<template>
  <div class="container mt-5">
  <div id="carouselExampleCaptions" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="@/assets/vegetarian_chili.webp" class="d-block w-100" alt="First slide">
        <div class="carousel-caption d-none d-md-block">
          <h5>Syper Chili Spicy</h5>
          <p>Le chili végétarien est un plat épicé à base de légumes, de haricots et d'épices, sans viande, offrant une alternative savoureuse au chili traditionnel</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/few_rivolis.webp" class="d-block w-100" alt="Second slide">
        <div class="carousel-caption d-none d-md-block">
          <h5>Ravioli Végétarien</h5>
          <p>Le ravioli végétarien est une option saine et équilibrée, riche en fibres et nutriments, grâce à sa farce de légumes et légumineuses, sans les graisses saturées de la viande</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="@/assets/salad-cezar2.webp" class="d-block w-100" alt="Third slide">
        <div class="carousel-caption d-none d-md-block">
          <h5>Salade Composée</h5>
          <p>La salade composée est un plat frais et nutritif, combinant légumes riches en vitamines, protéines maigres, et bonnes graisses, offrant un repas complet et bénéfique pour la santé.</p>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
</div>
<br>
<br>

<ArticleView />
<br>

    <TeamView />
<br>

  </template>
  
  

<script>
import TeamView from '@/components/TeamView.vue';
import ArticleView from '@/components/ArticleView.vue';

// @ is an alias to /src


export default {
  name: 'HomeView',
  components: {
    ArticleView,
    TeamView,
  }
}
</script>

<style>

</style>
