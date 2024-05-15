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
            title: "Healthy Eating: Nourishing Body and Mind",
            content: "Healthy eating is not about strict dietary limitations, staying unrealistically thin, or depriving yourself of the foods you love. Rather, it’s about feeling great, having more energy, improving your health, and boosting your mood. If you feel overwhelmed by all the conflicting nutrition and diet advice out there, you’re not alone. It seems that for every expert who tells you a certain food is good for you, you’ll find another saying exactly the opposite. But by using these simple tips, you can cut through the confusion and learn how to create a tasty, varied, and healthy diet that is as good for your mind as it is for your body."
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
    line-height: 6rem;;
}

.lead {
    font-size: 1.25rem;
}
</style>
