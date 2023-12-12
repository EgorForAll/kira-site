<script>
import ListCard from "./ListCard.vue";
export default {
    name: 'PostList',
    props: ['posts'],
    components: {ListCard}
}
</script>

<template>
    <section class="posts">
        <div class="container pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-5 pb-lg-5">
            <ul class="posts__list">
                <list-card v-for="(post) in posts" :key="post.id" :post="post"/>
            </ul>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "../../scss/main";

.posts {
    width: 100%;
}

.posts__list {
    margin: 0;
    padding: 0 250px;
}
</style>
