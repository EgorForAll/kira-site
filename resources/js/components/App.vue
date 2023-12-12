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
            isTableView: false
        }
    },
    methods: {
        ...mapActions({
            load: 'posts/fetchPosts'
        }),
    },
    computed: {
        ...mapGetters({
            posts: "posts/getPosts"
        })
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
            <posts-table v-if="isTableView" :posts="posts"/>
            <post-list v-else  :posts="posts" />
        </main>

    </div>
</template>


