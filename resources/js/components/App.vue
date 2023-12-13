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
            postsPerPage: 9,
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
            } else {
                this.$data.postsPerPage = this.$data.postsPerPage * 2;
            }
        },
    },
    computed: {
        ...mapGetters({
            posts: "posts/getPosts"
        }),
        currentPosts() {
            const lastIndex = this.$data.currentPage * this.$data.postsPerPage
            if (this.$data.isTableView) {
                const firstIndex = lastIndex - this.$data.postsPerPage
                return this.posts.slice(firstIndex, lastIndex)
            } else {
                return this.posts.slice(0, this.$data.postsPerPage);
            }
        },
    },
    created() {
        this.load()
    },
}
</script>


<template>
    <div class="root">
        <Header/>
        <main>
            <introduction @set-view="isTableView = !isTableView"  :is-table-view="isTableView"/>
            <posts-table @togglePage="setCurrentPage" v-if="isTableView" :posts="posts" :current-posts="currentPosts" :posts-per-page="postsPerPage" :current-page="currentPage"/>
            <post-list v-else  :posts="posts" :current-posts="currentPosts" @loadMore="setCurrentPage"/>
        </main>

    </div>
</template>


