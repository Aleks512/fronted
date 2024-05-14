<template>
    <div class="post">
        <!-- Contenu du post -->
        <h1>Post detail page</h1>
        <h2>{{ id }}</h2>

    </div>
</template>

<script>


export default {
    name: 'PostView',
    props: {
        id: Number,
        
        
    },
    // data() {
    //     return {
    //         id: this.$route.params.id
    //     }
    // },
}
</script>

<style scoped>
.post {
    color : black
}

.post-details {
    font-size: 0.8em;
    color: #999;
    margin-top: 10px;
}
</style>