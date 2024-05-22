<template>
    <div class="container m-auto" style="min-height: 70vh;">
      <h1>Nos auteurs passionnés</h1>
      <div class="team-view d-flex justify-content-around">
        <div v-for="person in team" :key="person.id" class="person-card card pt-4 mt-2" style="width: 300px;">
          <img :src="require(`@/assets/team/${person.photo}`)" alt="Person Photo" class="person-photo card-img-top mx-auto d-block">
          <div class="card-body d-flex flex-column align-items-center">
            <h3 class="card-title text-center">{{ person.name }}</h3>
            <h4 class="card-text text-center">{{ person.role }}</h4>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'TeamView',
    data() {
      return {
        team: [
          {
            id: 1,
            name: "Aleksa Dupont",
            role: "Expert-comptable",
            photo: "F_black_business.webp"
          },
          {
            id: 2,
            name: "Jane Smith",
            role: "Designer",
            photo: "F_white_business.webp"
          },
          {
            id: 3,
            name: "Bruce Lee",
            role: "Kinésithérapeute",
            photo: "H_asia_cook.webp"
          },
          {
            id: 4,
            name: "Kris Dupont",
            role: "Developpeur web",
            photo: "h_middleE_decontracté.webp"
          },
          {
            id: 5,
            name: "Laura Dupont",
            role: "Infirmière libérale",
            photo: "F_white_smile.webp"
          },
          {
            id: 6,
            name: "Laura Craft",
            role: "Vétérinaire",
            photo: "F_white_smile2.webp"
          },
        ]
      };
    }
  };
  </script>
  
  <style scoped>
  .team-view {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }

  
  .person-photo {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 50%;
  }
  
  .person-card, .card {
    min-height: 350px !important;
  }
  </style>
  