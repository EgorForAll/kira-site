<script>
import {mapGetters} from "vuex";
import {toRaw} from "vue";
import ModalCard from "./ModalCard.vue";
import Comments from "./CommentsModal.vue";
import Pagination from "./Pagiantion.vue";
import PostCard from "./PostCard.vue";

export default {
    name: 'Posts',
    components: {PostCard, ModalCard, Comments, Pagination},
    props: ['posts'],
    data() {
        return {
            isCardOpened: true,
            isCommentsShown: false,
        }
    },
    methods: {
        toggleComment() {
            this.$data.isCommentsShown = !this.$data.isCommentsShown
        },
        currentComments() {
            const totalComments = toRaw(this.comments)
            return totalComments.filter((item) => item.post_id === this.currentPost.id)
        }
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
    },

}
</script>

<template>
    <section class="posts">
        <div class="container pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-5 pb-lg-5">
            <transition name="custom-classes-transition" enter-active-class="cssanimation fadeInt">
                <ul class="posts__list me-md-0 ms-md-0">
                    <post-card  v-for="(post, index) in posts" :post="post" :key="index"/>
                </ul>
            </transition>
            <modal-card v-if="currentPost" :currentPost="currentPost" :toggle-comment="toggleComment"
                        :is-comment-shown="isCommentsShown"/>
            <transition name="custom-classes-transition" enter-active-class="cssanimation fadeInLeft"
                        leave-active-class="cssanimation fadeOutLeft">
                <comments v-if="isCommentsShown && comments.length > 0" :comments="currentComments()"
                          :toggle-comment="toggleComment"/>
            </transition>
            <pagination/>
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
