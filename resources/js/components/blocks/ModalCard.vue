<script>
import Widgets from "../ui/Widjets.vue";
import Comments from "./CommentsModal.vue";
import HumanDate from "../ui/HumanDate.vue";
import {mapActions, mapGetters} from "vuex";
import {toRaw} from "vue";

export default {
    name: 'ModalCard',
    components: {Widgets, Comments, HumanDate},
    props: ['toggleComment', 'isCommentShown', 'commentRef'],
    methods: {
        ...mapActions({
            setCurrentPost: "posts/setCurrentPost"
        }),
        ...mapActions({
            loadComments: "comments/postComments"
        }),
        closeWindow() {
            const setCurrentPost = (value) => {
                this.setCurrentPost(value)
                document.querySelector('body').classList.remove('overlay')
            }
            this.$refs.modal.classList.remove('elevateRight')
            this.$refs.modal.classList.add('moveToTop')
            if (this.$props.isCommentShown) {
                this.$props.toggleComment()
            }
            setTimeout(() => setCurrentPost(null), 500)
        },
        onEscDown(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                this.closeWindow()
            }
        },
        onWindowClick(e) {
            const inModal = e.composedPath().includes(this.$refs.modal)
            const commentsModal = document.querySelector('#comments')
            const inComments = e.composedPath().includes(commentsModal)
            if (!inModal && !inComments) {
                this.closeWindow()
            }
        },
    },
    computed: {
        ...mapGetters({
            currentPost: "posts/getCurrentPost"
        }),
        ...mapGetters({
            comments: 'comments/getPostComments'
        }),
    },
    created() {
        const post = toRaw(this.currentPost)
        this.loadComments(post.id)
    },
    mounted() {
        window.addEventListener('keydown', this.onEscDown)
        setTimeout(() => window.addEventListener('click', this.onWindowClick), 500)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.onEscDown)
        window.removeEventListener('click', this.onWindowClick)
    },
}
</script>

<template>
    <div ref="modal" class="modal-card cssanimation elevateRight">
        <header class="modal-card__header pb-2 pt-1">
            <span class="modal-card__tile">#{{currentPost.title}}</span>
            <button @click="closeWindow" type="button" class="btn-close modal-card__btn-close" aria-label="Закрыть"></button>
        </header>
        <div class="modal-card__body pt-2 pb-2">
            <div class="modal-card__img-wrapper">
                <img :src="currentPost.image" :alt="currentPost.title" class="modal-card__img" width="100%" height="350px">
            </div>
            <div class="modal-card__content pt-3 pb-3">
                <p class="content__text m-0">{{currentPost.content}}</p>
            </div>
            <div class="modal-card__widgets pt-3 pb-3">
                <widgets :post-id="currentPost.id" :comments="comments" @show-comments="toggleComment()"/>
                <human-date :in-date="currentPost.created_at"/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.modal-card__tile {
    color: #3600ff;
}

.modal-card__widgets {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-card__content {
    border-bottom: 3px solid #4C80CE;
}

.content__text {
    @include  text-content();
}

.modal-card__btn-close {
    transform: translate(10px, 0);
}

.modal-card {
@include modal-card();
}

.modal-card__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.modal-card__body {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.modal-card__img {
    object-fit: cover;
    border-radius: 10px;
    box-shadow: 0 0 5px 0 #236585;
    @media (max-width: $lg) {
        height: 300px;
    }

    @media (max-width: $md) {
        height: 275px;
    }
}

</style>
