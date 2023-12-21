<script>
import {mapActions, mapGetters} from "vuex";
import Header from "../layout/Header.vue"
import Introduction from "../blocks/Intro.vue";
import PostsTable from "../blocks/PostsTable.vue";
import PostList from "../blocks/PostList.vue";
import Footer from "../layout/Footer.vue";
import NewPost from "../blocks/NewPost.vue";

export default {
    name: 'Home',
    components: {Introduction, PostsTable, Header, PostList, NewPost, Footer},
    data() {
        return {
            isTableView: true,
        }
    },
    methods: {
        ...mapActions({
            loadPosts: 'posts/fetchPosts'
        }),
        ...mapActions({
            getUser: "auth/fetchUserData"
        }),
    },
    computed: {
        ...mapGetters({
            postsPerPage: "posts/getPostsPerPage"
        }),
        ...mapGetters({
            posts: "posts/getPosts"
        }),
        ...mapGetters({
            isCreateNewPost: 'posts/getCreateNew'
        }),
    },
    created() {
        this.loadPosts({url: `http://127.0.0.1:8000/laravel_route/posts`, isUpdate: false})
        this.getUser()
    },
}




</script>


<template>
    <div class="root">
        <Header/>
        <main>
            <introduction @set-view="isTableView = !isTableView"  :is-table-view="isTableView"/>
            <posts-table v-if="isTableView" :posts="posts"  :posts-per-page="postsPerPage"/>
            <post-list v-else :posts="posts"/>
            <transition name="custom-classes-transition"
                        enter-active-class="cssanimation moveFromTop" leave-active-class="cssanimation moveToTop">
                <new-post v-if="isCreateNewPost"/>
            </transition>
        </main>
        <Footer />
    </div>
</template>


