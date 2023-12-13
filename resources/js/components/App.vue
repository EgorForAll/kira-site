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
            load: 'posts/fetchPosts'
        }),
        setCurrentPage(value) {
            if (this.$data.isTableView) {
                this.$data.currentPage = value;
            }
        },
    },
    computed: {
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
        this.load(`http://127.0.0.1:8000/posts`)
    },
}
</script>


<template>
    <div class="root">
        <Header/>
        <main>
            <introduction @set-view="isTableView = !isTableView"  :is-table-view="isTableView"/>
            <posts-table @togglePage="setCurrentPage" v-if="isTableView" :posts="posts" :current-posts="currentPosts" :posts-per-page="postsPerPage" :current-page="currentPage"/>
            <post-list v-else  :posts="posts" @loadMore="setCurrentPage"/>
        </main>

    </div>
</template>


