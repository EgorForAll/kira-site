<script>
import Header from "../layout/Header.vue";
import Footer from "../layout/Footer.vue"
import PostList from "../blocks/PostList.vue";
import NewPost from "../blocks/NewPost.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'Admin',
    components: {Header, PostList, Footer, NewPost},
    methods: {
        ...mapActions({
            loadPosts: 'posts/fetchPosts'
        }),
        ...mapActions({
            loadComments: "comments/fetchComments"
        }),
        ...mapActions({
            setCreateNew: "posts/setCreateNew"
        }),
        onAddClick() {
            this.setCreateNew()
            document.querySelector('body').classList.add('overlay')
        }
    },
    computed: {
        ...mapGetters({
            posts: 'posts/getPosts'
        }),
        ...mapGetters({
            comments: 'comments/getComments'
        }),
        ...mapGetters({
            isCreateNewPost: 'posts/getCreateNew'
        }),
    },
    created() {
        this.loadPosts({url: `http://127.0.0.1:8000/laravel_route/posts`, isUpdate: true})
        this.loadComments()
    }
}
</script>

<template>
    <Header />
    <main class="align-items-center">
        <button @click="onAddClick" class="btn btn-primary add-btn mb-4 mt-4 mt-md-3 mb-md-3 mt-lg-1 mb-lg-1">Добавить пост</button>
        <PostList :posts="posts" :comments="comments"/>
        <transition name="custom-classes-transition"
                    enter-active-class="cssanimation moveFromTop" leave-active-class="cssanimation moveToTop">
            <new-post v-if="isCreateNewPost"/>
        </transition>
    </main>
    <Footer/>
</template>

<style lang="scss">
@import "../../../scss/main";
.add-btn {
    width: 50%;
    @media (max-width: $lg) {
        width: 80%;
    }

    @media (max-width: $md) {
        width: 85%;
    }
}
</style>
