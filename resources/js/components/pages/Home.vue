<script>
import {mapActions, mapGetters} from "vuex";
import Header from "../layout/Header.vue"
import Introduction from "../blocks/Intro.vue";
import PostsTable from "../views/PostsTable.vue";
import PostList from "../views/PostList.vue";
import Footer from "../layout/Footer.vue";

export default  {
    name: 'App',
    components: {Introduction, PostsTable, Header, PostList, Footer},
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
            loadComments: "comments/fetchComments"
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
            comments: 'comments/getComments'
        }),
    },
    created() {
        this.loadPosts(`http://127.0.0.1:8000/posts`)
        this.loadComments(this.postsPerPage)
    },
}
</script>


<template>
    <div class="root">
        <Header/>
        <main>
            <introduction @set-view="isTableView = !isTableView"  :is-table-view="isTableView"/>
            <posts-table v-if="isTableView" :posts="posts"  :posts-per-page="postsPerPage"/>
            <post-list v-else  :posts="posts"  :comments="comments"/>
        </main>
        <Footer />
    </div>
</template>


