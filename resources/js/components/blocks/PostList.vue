<script>

import ListCard from "../blocks/ListCard.vue";
import PaginationList from "../ui/Pagiantion.vue";


export default {
    name: 'PostList',
    props: ['posts', 'comments'],
    components: {ListCard, PaginationList},
    methods: {
        findComments(id) {
            return this.$props.comments.filter((item) => item.post_id === id)
        },
    }
}
</script>

<template>
    <section class="posts">
        <div class="container pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-5 pb-lg-5">
            <ul class="posts__list">
                <list-card ref="listItem" v-for="(post) in posts" :key="post.id" :post="post" :comments="findComments(post.id)"/>
            </ul>
            <pagination-list @loadMore="$emit('loadMore')"/>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.posts {
    width: 100%;
}

.posts__list {
    width: 50%;
    margin: 0 auto;

    @media (max-width: $lg) {
        width: 80%;
    }


    @media (max-width: $md) {
        width: 85%;
    }
}
</style>
