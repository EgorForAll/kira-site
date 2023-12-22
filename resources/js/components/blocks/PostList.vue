<script>
import ListCard from "../blocks/ListCard.vue";
import PaginationList from "../ui/Pagiantion.vue";
import EditCard from "../blocks/EditCard.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'PostList',
    props: ['posts'],
    components: {ListCard, PaginationList, EditCard},
    data() {
        return {
            isUpdate: false
        }
    },
    methods: {
        ...mapActions({
            setCreateNew: "posts/setCreateNew"
        }),
    },
    computed: {
        ...mapGetters({
            isEdit: "posts/getCreateNew"
        }),
        ...mapGetters({
            currentPost: "posts/getCurrentPost"
        })
    }
}
</script>

<template>
    <section class="posts">
        <div class="container pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-5 pb-lg-5">
            <ul class="posts__list">
                <list-card ref="listItem" v-for="(post) in posts" :key="post.id" :post="post"
                           @openEditModal="isUpdate = !isUpdate"/>
            </ul>
            <pagination-list @loadMore="$emit('loadMore')"/>
            <transition name="custom-classes-transition"
                        enter-active-class="cssanimation moveFromTop" leave-active-class="cssanimation moveToTop">
                <EditCard v-if="isUpdate" @openEditModal="isUpdate = !isUpdate" :id="currentPost.id" :current-title="currentPost.title" :current-image="currentPost.image" :current-content="currentPost.content"/>
            </transition>
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
