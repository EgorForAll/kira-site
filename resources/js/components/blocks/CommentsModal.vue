<script>

import BalloonComment from "../ui/BalloonComment.vue";
import CommentForm from "../ui/CommentForm.vue";
import CommentLeaveBtn from "../ui/CommentLeaveBtn.vue";
import {mapActions, mapGetters} from "vuex";

export default {
    name: 'Comments',
    props: ['toggleComment', 'postId', 'comments'],
    components: {BalloonComment, CommentForm, CommentLeaveBtn},
    data() {
        return {
            isAddNewComment: false,
        }
    },
    computed: {
        ...mapGetters({
            user: "auth/getUser"
        }),
    },
}
</script>

<template>
    <div class="comments" id="comments">
        <div class="comment__header">
            <button @click="toggleComment()" type="button" class="btn-close modal-card__btn-close"
                    aria-label="Закрыть"></button>
        </div>
        <ul class="comments__list">
            <BalloonComment :comments="comments"/>
        </ul>
        <div class="comment__footer">
            <comment-leave-btn :is-add-new-comment="isAddNewComment" @onClickBtn="isAddNewComment = !isAddNewComment"/>
            <transition name="custom-classes-transition"
                        enter-active-class="cssanimation fadeIn">
                <CommentForm :current-comments="comments" :post-id="postId" :is-add-new-comment="isAddNewComment"/>
            </transition>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.comment__header {
    display: flex;
    justify-content: flex-end;
    padding: 10px 20px 10px;
}

.comments {
    position: fixed;
    display: flex;
    flex-direction: column;
    overflow: auto;
    scrollbar-width: var(--scrollbarWidth);
    scrollbar-color: var(--scrollbarThumbComment) var(--scrollbarBgComment);
    top: 10%;
    left: 0;
    width: 450px;
    min-height: 265px;
    max-height: 700px;
    color: #000;
    background-color: #cdbfff;
    background-image: url("../../../assets/images/chat-background.jpg");
    background-size: 100% auto;
    z-index: 4;
    border-radius: 0 10px 10px 0;
    box-shadow: 0 0 1px 2px #5d47a9;
    @media (max-width: $lg) {
        width: 365px;
    }
    @media (max-width: $md) {
        width: 270px;
        top: 8%;
    }

    &::-webkit-scrollbar {
        width: var(--scrollbarWidth);
    }

    &::-webkit-scrollbar-track {
        background: var(--scrollbarBgComment);
        border-radius: var(--scrollbarBorderRadius);
    }

    &::-webkit-scrollbar-thumb {
        background-color: var(--scrollbarThumbComment);
        border-radius: var(--scrollbarBorderRadius);
        border: var(--scrollbarBorder);
    }
}

.comment__no-comments {
    color: #000;
    font-size: 18px;
    line-height: 23px;
    text-align: center;
}

.comments__list {
    display: flex;
    flex-direction: column;
    width: 100%;
    border-radius: 5px;
    padding: 0 25px;
    flex-grow: 1;
}


.comment__footer {
    padding: 10px 20px;
}

</style>
