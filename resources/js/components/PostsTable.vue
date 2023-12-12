<script>
import {mapActions, mapGetters} from "vuex";
import {toRaw} from "vue";
import ModalCard from "./ModalCard.vue";
import Comments from "./Comments.vue";
import Pagination from "./Pagination.vue";
import PostCard from "./PostCard.vue";

export default {
    name: 'Posts',
    components: {PostCard, ModalCard, Comments, Pagination},
    props: ['posts'],
    data() {
        return {
            isCardOpened: true,
            isCommentsShown: false,
            postsPerPage: 9,
            currentPage: 1,
        }
    },
    methods: {
        ...mapActions({
            setCurrentPost: "posts/setCurrentPost"
        }),
        toggleComment() {
            this.$data.isCommentsShown = !this.$data.isCommentsShown
        },
        setCurrentPage(value) {
            this.$data.currentPage = value
        },
        findCurrentPosts() {
            const lastIndex = this.$data.currentPage * this.$data.postsPerPage
            const firstIndex = lastIndex - this.$data.postsPerPage
            return this.posts.slice(firstIndex, lastIndex)
        },
    },
    computed: {
        ...mapGetters({
            currentPost: "posts/getCurrentPost"
        }),
        ...mapGetters({
            comments: "comments/getComments"
        }),
    },
    updated() {
        const currentPost = toRaw(this.$store.state.posts.currentPost);
        if (currentPost) {

            document.querySelector('body').classList.add('overlay')
        }
    }

}
</script>

<template>
    <section class="posts">
        <div class="container pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-5 pb-lg-5">
            <transition name="custom-classes-transition" enter-active-class="cssanimation fadeInt">
                <ul class="posts__list me-md-0 ms-md-0">
                    <post-card :set-current-post="setCurrentPost" v-for="(post) in findCurrentPosts()" :post="post" :key="post.id"/>
                </ul>
            </transition>
            <modal-card v-if="currentPost" :currentPost="currentPost" :toggle-comment="toggleComment"
                        :is-comment-shown="isCommentsShown"/>
            <transition name="custom-classes-transition" enter-active-class="cssanimation fadeInLeft"
                        leave-active-class="cssanimation fadeOutLeft">
                <comments v-if="isCommentsShown && comments.length > 0" :comments="comments"
                          :toggle-comment="toggleComment"/>
            </transition>
            <pagination :current-page="currentPage" :total-posts="posts.length" :toggle-page="setCurrentPage"
                        :posts-per-page="postsPerPage"/>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "../../scss/main";


.posts__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 30px;
    row-gap: 40px;
    z-index: 1;

    @media (max-width: $md) {
        column-gap: 15px;
        row-gap: 15px;
    }
}


</style>
