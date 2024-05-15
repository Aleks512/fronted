<template>
    <div class="container m-auto" style="height: 70vh;">
        <h1>Our passionate authors</h1>
        <div class="team-view d-flex justify-content-between">
            <div v-for="person in team" :key="person.id" class="person-card card" style="width: 300px; margin: 10px;">
            <img :src="require(`@/assets/team/${person.photo}`)" alt="Person Photo" class="person-photo card-img-top mx-auto d-block" style="width: 200px; height: 200px;">
            <div class="card-body d-flex flex-column align-items-center">
                <h3 class="card-title text-center">{{ person.name }}</h3>
                <p class="card-text text-center">{{ person.role }}</p>
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
                    role: "Developer",
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
                    name: "Harry Potter",
                    role: "Developer",
                    photo: "H_asia_cook.webp"
                },
                {
                    id: 4,
                    name: "Kris Dupont",
                    role: "Designer",
                    photo: "h_middleE_decontracté.webp"
                },
                {
                    id: 5,
                    name: "Laura Dupont",
                    role: "Teacher",
                    photo: "F_white_smile.webp"
                },
                // A
                // Ajoutez les autres membres de l'équipe ici
            ]
        };
    }
};
</script>

<style scoped>
.team-view {
    margin: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    height: 20rem;
}
h3{
    text-align: center;
    font-size: 1rem !important;

};


.person-photo {
    width: 150px;
    height: 150px;
    object-fit: cover;
    border-radius: 50%;
};

.person-card, .card{
    min-height: 400px !important;
}


</style>