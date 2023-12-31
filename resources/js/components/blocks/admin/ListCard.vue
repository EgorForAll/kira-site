<script>
import Widgets from "../../ui/Widjets.vue";
import BalloonComment from "../../ui/BalloonComment.vue";
import HumanDate from "../../ui/HumanDate.vue";
import {findSrc, observer} from "@/utils.js";
import CommentForm from "../../ui/CommentForm.vue";
import CommentLeaveBtn from "../../ui/CommentLeaveBtn.vue";
import EditSVG from "../../../../assets/images/edit.svg?component";
import {mapActions} from "vuex";

export default {
    name: 'ListCard',
    props: ['post', 'comments'],
    emits: ['toggleEditModal', 'toggleDeleteModal'],
    mixins: [findSrc],
    components: {CommentForm, BalloonComment, Widgets, CommentLeaveBtn, HumanDate, EditSVG},
    data() {
        return {
            isCommentShow: false,
            isAddNewComment: false,
            isDelete: false,
        }
    },
    methods: {
        ...mapActions({
            setCurrentPost: 'posts/setCurrentPost'
        }),
        image() {
            return findSrc(this.$props.post.image);
        },
        openDeleteWindow() {
            document.querySelector('body').classList.add('overlay')
            this.$emit('toggleDeleteModal', this.$props.post)
        },
        toggleComment() {
            this.$data.isCommentShow = !this.$data.isCommentShow
        },
        async fetchComments() {
            try {
                this.$data.comments = await loadComments(this.$props.post.id)
            } catch (err) {
                throw new err
            }
        },
        onClickEdit() {
            this.setCurrentPost(this.$props.post)
            document.querySelector('body').classList.add('overlay')
            this.$emit('toggleEditModal')
        }
    },
    mounted() {
        this.$refs.listItem.style.visibility = 'hidden'
        observer.observe(this.$refs.listItem)
    },
}
</script>

<template>
    <li class="list__card cssanimation" ref="listItem">
        <header class="card__header d-flex justify-content-between pb-3 pt-0">
            <span class="card__title">#{{ post.title }}</span>
            <button  @click="onClickEdit" class="list__edit-btn">
                <EditSVG/>
            </button>

        </header>
        <div class="card__img-wrapper">
            <img :src="image()" :alt="post.title" width="100%" class="card__img">
        </div>
        <div class="card__content pt-3 pb-3 pt-md-2 pb-md-2 pt-lg-4 pb-lg-4">
            <p class="card__text">{{ post.content }}</p>
        </div>
        <div class="card__widgets pt-lg-3 pb-lg-3 pb-md-3 pt-md-3 pt-2 pb-2">
            <widgets :post-id="post.id" :comments="comments" @showComments="toggleComment()"/>
            <human-date :in-date="post.created_at"/>
        </div>
        <div  class="card__delete d-flex justify-content-end mb-md-3 mb-1 mt-2">
            <button class="btn btn-secondary btn-delete" @click="openDeleteWindow">Удалить</button>
        </div>
        <transition name="custom-classes-transition"
                    enter-active-class="cssanimation fadeIn">
            <div class="card__comments" v-if="isCommentShow">
                <div class="comments__header pb-2">
                    <button class="comments__remove" @click="isCommentShow = !isCommentShow">Скрыть комментарии</button>
                </div>
                <ul class="comments__list">
                    <balloon-comment :comments="comments"/>
                </ul>
                <div class="comment__footer">
                    <comment-leave-btn :is-add-new-comment="isAddNewComment"
                                       @onClickBtn="isAddNewComment = !isAddNewComment"/>
                    <transition name="custom-classes-transition"
                                enter-active-class="cssanimation fadeIn"
                                leave-active-class="cssanimation fadeOut">
                        <CommentForm :post-id="post.id" :is-add-new-comment="isAddNewComment"
                                     @closeCommentInput="isAddNewComment = !isAddNewComment"
                                     @loadNewComments="fetchComments"/>
                    </transition>
                </div>
            </div>
        </transition>
    </li>
</template>

<style scoped lang="scss">
@import "../../../../scss/main";

.btn-delete {
    @media (max-width: $md) {
        font-size: 12px;
    };
}

.list__edit-btn {
    border: none;
    background-color: transparent;
    padding: 0;
}

.comment__footer {
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    @media (max-width: 400px) {
        justify-content: center;
        padding: 10px 15px;
    }
}

.comments__header {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    @media (max-width: $md) {
        padding: 10px 15px;
    }
}

.comments__remove {
    background-color: #d5b5d3;
    padding: 5px 10px;
    border: 1px solid #333;
    border-radius: 5px;
    font-size: 14px;
    color: #333;
    transition: color, background-color, 0.3s ease;

    @media (max-width: $md) {
        font-size: 10px;
        padding: 5px;
    }

    &:hover {
        color: #000;
        background-color: #5d797c;
    }
}

.comments__list {
    display: flex;
    flex-direction: column;
    padding: 20px;
    @media (max-width: $md) {
        padding: 10px 15px;
    }
}

.card__comments {
    background-color: #cdbfff;
    border-radius: 10px;
    border: 1px solid #5d47a9;
    background-image: url("../../../assets/images/chat-background.jpg");
    background-size: 100% auto;
    background-clip: border-box;
}

.list__card {
    width: 100%;
    padding: 20px 40px;
    background-color: #ABCDFF;
    border-radius: 10px;
    margin-bottom: 50px;

    &:last-child {
        margin-bottom: 0;
    }

    @media (max-width: $md) {
        padding: 10px 20px;
    }

}

.card__img {
    object-fit: cover;
    box-shadow: 0 0 7px 5px #5d797c;
    border-radius: 10px;
    height: 400px;
    @media (max-width: $lg) {
        height: 350px;
    }
    @media (max-width: $md) {
        height: 220px;
    }
}

.card__title {
    color: #3600ff;
    font-size: 20px;
    @media (max-width: $lg) {
        font-size: 18px;
    }

    @media (max-width: $md) {
        font-size: 14px;
    }
}

.card__widgets {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .widgets__number {
        font-size: 14px;
    }
}

.card__content {
    border-bottom: 3px solid #4C80CE;
}

.card__text {
    @include text-content();
}
</style>
