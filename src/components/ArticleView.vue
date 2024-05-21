<template>
    <div class="jumbotron jumbotron-fluid">
        <div class="container">
            <h1 class="display-4">{{ title }}</h1>
            <p class="lead">{{ content }}</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ArticleView',
    data() {
        return {
            title: "Alimentation saine : nourrir le corps et l'esprit",
            content: "Manger sainement ne consiste pas à suivre des restrictions alimentaires strictes, à rester irréalistement mince ou à vous priver des aliments que vous aimez. Au contraire, il s'agit de se sentir bien, d'avoir plus d'énergie, d'améliorer votre santé et de stimuler votre humeur. Si vous vous sentez dépassé par tous les conseils contradictoires en matière de nutrition et de régime alimentaire, vous n'êtes pas seul. Il semble que pour chaque expert qui vous dit qu'un certain aliment est bon pour vous, vous en trouverez un autre qui dit exactement le contraire. Mais en suivant ces simples recettes, vous pouvez vous débarrasser de la confusion et apprendre à créer un régime alimentaire savoureux, varié et sain qui est aussi bon pour votre esprit que pour votre corps."
        };
    }
}
</script>

<style scoped>
.jumbotron {
    background-color: #f8f9fa;
    padding: 2rem 1rem;
    margin-bottom: 2rem;
    border-radius: 0.3rem;
}

.display-4 {
    font-size: 2.5rem;
    font-weight: bold;
}

.lead {
    font-size: 1.25rem;
}
</style>
