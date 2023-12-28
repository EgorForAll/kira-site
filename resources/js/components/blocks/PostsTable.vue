<script>
import {mapGetters} from "vuex";
import {toRaw} from "vue";
import ModalCard from "./ModalCard.vue";
import Comments from "./CommentsModal.vue";
import Pagination from "../ui/Pagiantion.vue";
import PostCard from "./PostCard.vue";
import NoPosts from "../ui/NoPosts.vue";
import Spinner from "../ui/Spinner.vue";

export default {
    name: 'Posts',
    components: {PostCard, ModalCard, Comments, Pagination, NoPosts, Spinner},
    props: ['posts', 'comments'],
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
        defineComments(id) {
            return this.$props.comments.filter((item) => item.post_id === id)
        }
    },
    computed: {
        ...mapGetters({
            currentPost: "posts/getCurrentPost"
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
        <h2 class="posts__title">Список постов</h2>
        <div class="container post__container pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-5 pb-lg-5">
            <Spinner v-if="!posts.length" />
            <transition name="custom-classes-transition" enter-active-class="cssanimation fadeInt">
                <ul v-if="posts.length" class="posts__list me-md-0 ms-md-0">
                    <post-card  v-for="(post, index) in posts" :post="post" :key="index"/>
                </ul>
            </transition>
            <modal-card v-if="currentPost" :currentPost="currentPost" :toggle-comment="toggleComment"
                        :is-comment-shown="isCommentsShown" :comments="defineComments(currentPost.id)"/>
            <transition name="custom-classes-transition" enter-active-class="cssanimation fadeInLeft"
                        leave-active-class="cssanimation fadeOutLeft">
                <comments :post-id="currentPost.id" v-if="isCommentsShown" :toggle-comment="toggleComment" :comments="defineComments(currentPost.id)"/>
            </transition>
            <pagination v-if="posts.length >= 9"/>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.posts__title {
    @include visually-hidden();
}

.posts {
    flex-grow: 1;
}

.post__container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: $lg) {
        min-height: 500px;
    }

}

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
