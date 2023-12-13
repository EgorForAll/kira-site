<script>
import {mapActions, mapGetters} from "vuex";
import Header from "./Header.vue"
import Introduction from "./Intro.vue";
import PostsTable from "./PostsTable.vue";
import PostList from "./PostList.vue";

export default  {
    name: 'App',
    components: {Introduction, PostsTable, Header, PostList},
    data() {
        return {
            isTableView: false,
            currentPage: 1,
        }
    },
    methods: {
        ...mapActions({
            loadPosts: 'posts/fetchPosts'
        }),
        ...mapActions({
            loadComments: "comments/fetchComments"
        }),
        setCurrentPage(value) {
            if (this.$data.isTableView) {
                this.$data.currentPage = value;
            }
        },
    },
    computed: {
        ...mapGetters({
            postsPerPage: "posts/getPostsPerPage"
        }),
        ...mapGetters({
            posts: "posts/getPosts"
        }),
        ...mapGetters(({
            postsPerPage: "posts/getPostsPerPage"
        })),
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
            <posts-table @togglePage="setCurrentPage" v-if="isTableView" :posts="posts" :current-posts="currentPosts" :posts-per-page="postsPerPage" :current-page="currentPage"/>
            <post-list v-else  :posts="posts" @loadMore="setCurrentPage" :comments="comments"/>
        </main>

    </div>
</template>


