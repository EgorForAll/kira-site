<script>
import ListCard from "../blocks/ListCard.vue";
import PaginationList from "../ui/Pagiantion.vue";
import EditCard from "../blocks/EditCard.vue";
import {mapActions, mapGetters} from "vuex";
import NoPosts from "../ui/NoPosts.vue";
import DeleteWindow from "../ui/DeleteWindow.vue";

export default {
    name: 'PostList',
    props: ['posts', 'comments'],
    components: {ListCard, PaginationList, EditCard,  NoPosts, DeleteWindow},
    data() {
        return {
            isUpdate: false,
            isDelete: false
        }
    },
    methods: {
        ...mapActions({
            setCreateNew: "posts/setCreateNew"
        }),
        ...mapActions({
           setCurrentPost: "posts/setCurrentPost"
        }),
        toggleDelete(post) {
            this.setCurrentPost(post)
            this.isDelete = !this.isDelete
        },
        closeDeleteWindow() {
            document.querySelector('body').classList.remove('overlay')
            this.isDelete = !this.isDelete
        },
        defineComments(id) {
            return this.$props.comments.filter((item) => item.post_id === id)
        }
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
        <h2 class="posts__title">Список постов</h2>
        <div class="container post__container  pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-5 pb-lg-5">
            <ul v-if="posts.length" class="posts__list">
                <list-card ref="listItem" v-for="(post) in posts" :comments="defineComments(post.id)" :key="post.id" :post="post"
                          @toggle-edit-modal="isUpdate = !isUpdate" @toggle-delete-modal="toggleDelete"/>
            </ul>
            <no-posts v-else />
            <pagination-list v-if="posts.length >= 9" @loadMore="$emit('loadMore')"/>
            <transition name="custom-classes-transition"
                        enter-active-class="cssanimation moveFromTop" leave-active-class="cssanimation moveToTop">
                <EditCard v-if="isUpdate" @toggle-edit-modal="isUpdate = !isUpdate" :id="currentPost.id" :current-title="currentPost.title" :current-image="currentPost.image" :current-content="currentPost.content"/>
            </transition>
            <delete-window v-if="isDelete" @close-delete="closeDeleteWindow"/>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.posts {
    width: 100%;
    flex-grow: 1;
}

.posts__title {
    @include visually-hidden();
}

.post__container {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.posts__list {
    width: 50%;
    margin: 0 auto 50px;

    @media (max-width: $lg) {
        width: 80%;
    }


    @media (max-width: $md) {
        width: 85%;
    }
}
</style>
