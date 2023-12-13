<script>
import {mapActions, mapGetters} from "vuex";

export default  {
    name: 'PaginationList',
    methods: {
        ...mapActions({
            loadPosts: 'posts/fetchPosts'
        }),
        ...mapActions({
            loadComments: "comments/fetchComments"
        }),
        ...mapActions({
           setPostsPerPage: 'posts/setPostsPerPage'
        }),
        loadMore() {
            this.loadPosts(this.links.next)
            this.setPostsPerPage();
            this.loadComments(this.postsPerPage)
        },
        isLastPage() {
            if (this.meta && (this.meta.current_page === this.meta.last_page)) {
                return true
            }
        }
    },
    computed: {
        ...mapGetters({
            links: "posts/getLinks"
        }),
        ...mapGetters({
            meta: "posts/getMeta"
        }),
        ...mapGetters({
            postsPerPage: 'posts/getPostsPerPage'
        })
    }
}
</script>

<template>
    <div class="pagination pt-lg-5 pb-lg-5 pt-4 pb-4">
        <button @click="loadMore" class="pagination__button" :disabled="isLastPage()">{{isLastPage() ? 'Посты закончились' : 'Загрузить еще'}}</button>
    </div>
</template>

<style scoped lang="scss">
@import "../../scss/main";
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
.pagination__button {
    font-size: 20px;
    border: none;
    background-color: #ABCDFF;
    @include  trans(background-color, 0.3s);
    padding: 10px 20px;
    border-radius: 5px;
    color: #333;
    &:hover {
        background-color: #4C80CE;
    }

    &:disabled {
        background-color: #4a5568;
        color: #fff;
    }

    @media (max-width: $lg) {
        font-size: 16px;
    }
    @media (max-width: $md) {
        font-size: 14px;
    }
}
</style>
