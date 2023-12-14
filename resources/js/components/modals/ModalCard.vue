<script>
import Widgets from "../ui/Widjets.vue";
import Date from "../ui/Date.vue";
import Comments from "./CommentsModal.vue";
import {mapActions, mapGetters} from "vuex";
import {toRaw} from "vue";

export default {
    name: 'ModalCard',
    components: {Widgets, Date, Comments},
    props: ['toggleComment', 'isCommentShown', 'commentRef'],
    methods: {
        ...mapActions({
            setCurrentPost: "posts/setCurrentPost"
        }),
        ...mapActions({
            loadComments: "comments/fetchComments"
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
        currentComments(id) {
            return this.comments.filter((item) => item.post_id === id)
        }
    },
    computed: {
        ...mapGetters({
            currentPost: "posts/getCurrentPost"
        }),
        ...mapGetters({
            comments: 'comments/getComments'
        }),
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
                <widgets :likes="currentPost.likes" :comments="currentComments(currentPost.id)" @show-comments="toggleComment()"/>
                <date :in-date="currentPost.created_at"/>
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
    max-height: 175px;
    overflow-y: scroll;
    text-align: justify;
    line-height: 22px;
    color: #000;
    background-color: transparent;
    border-radius: 5px;
    padding: 10px;
    @media (max-width: $lg) {
        max-height: 215px;
        font-size: 16px;
        line-height: 23px;
    }
    @media (max-width: $md) {
        font-size: 14px;
        line-height: 18px;
        max-height: 185px;
        overflow-y: scroll;
    }
}

.modal-card__btn-close {
    transform: translate(10px, 0);
}

.modal-card {
    position: fixed;
    top: 50%;
    left: 50%;
    width: 600px;
    height: 700px;
    padding: 20px 40px;
    margin-top: -350px;
    margin-left: -250px;
    background-color: #ABCDFF;
    z-index: 3;
    border-radius: 10px;
    @media (max-width: $lg) {
        width: 500px;
        height: 700px;
        margin-left: -225px;
        margin-top: -350px;
    }
    @media (max-width: $md) {
        width: 280px;
        height: 600px;
        margin-left: -140px;
        margin-top: -300px;
        padding: 10px 15px;
    }
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
