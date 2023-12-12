<script>
import Date from "./Date.vue"

export default {
    name: 'Comments',
    props: ['comments', 'toggleComment'],
    components: {Date},
    data() {
        return {
            isAddNewComment: false
        }
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
            <li v-for="(comment, index) in comments" :key="index" class="comments__item">
                <div class="comment__text">{{ comment.comment }}</div>
                <div class="comment__attributes">
                    <span class="comment__user">{{ comment.user }}</span>
                    <date :in-date="comment.created_at"/>
                </div>
            </li>
        </ul>
        <div class="comment__footer">
            <button v-if="!isAddNewComment" @click="isAddNewComment = !isAddNewComment" class="comment__add">
                Оставить комментарий
            </button>
            <transition name="custom-classes-transition"
                        enter-active-class="cssanimation fadeIn"
                        leave-active-class="cssanimation fadeOut">
                <form v-if="isAddNewComment" ref="formComment" action="#" class="comment__form">
                    <div class="comment__textarea-wrapper">
                        <textarea class="comment__textarea" placeholder="Напишите комментарий Кире"></textarea>
                    </div>
                    <button class="comment__submit">Опубликовать</button>
                </form>
            </transition>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../../scss/main";

.comment__textarea-wrapper {
    position: relative;

    &::before {
        position: absolute;
        bottom: 2px;
        left: 12px;
        content: '';
        border: 8px solid transparent;
        border-right: 8px solid #fff;
        border-bottom: 12px solid #fff;
    }
}

.comment__submit {
    width: 170px;
    background-color: #5d47a9;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-left: 20px;
    margin-top: 20px;
    margin-bottom: 20px;
    height: 30px;
    border-radius: 5px;
    @include trans(background-color, 0.2s);

    @media (max-width: $md) {
        font-size: 14px;
        width: 130px;
        height: 30px;
    }

    &:hover {
        background-color: #500667;
    }

    &:focus {
        outline: 2px solid #e86cb2;
    }

    &:active {
        outline: 2px solid #e86cb2;
    }
}

.comment__textarea {
    position: relative;
    width: 82%;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    margin-left: 20px;
    border: none;
    resize: none;
    font-size: 14px;

    &:focus {
        outline: none;
    }

    &:active {
        outline: none;
    }

    @media (max-width: $md) {
        font-size: 12px;
        line-height: 14px;
    }
}

.comment__form {
    display: flex;
    flex-direction: column;
}

.comment__header {
    display: flex;
    justify-content: flex-end;
    padding: 10px;
}

.comment__add {
    background-color: transparent;
    border: none;
    padding: 0;
    color: #333;
    @include trans(color, 0.3s);
    font-size: 16px;
    margin-left: 20px;
    margin-bottom: 10px;

    @media (max-width: $md) {
        font-size: 12px;
    }

    &:hover {
        color: #000;
    }
}

.comments {
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 10%;
    left: 0;
    width: 450px;
    min-height: 265px;
    max-height: 700px;
    color: #000;
    background-color: #cdbfff;
    z-index: 4;
    border-radius: 0 10px 10px 0;
    box-shadow: 0 0 1px 2px #5d47a9;
    overflow-y: scroll;
    @media (max-width: $lg) {
       width: 365px;
    }
    @media (max-width: $md) {
        width: 270px;
        top: 8%;
    }
}

.comment__no-comments {
    color: #000;
    font-size: 18px;
    line-height: 23px;
    text-align: center;
}

.comments__list {
    width: 100%;
    overflow-y: scroll;;
    border-radius: 5px;
    padding: 0 20px;
    flex-grow: 1;
}

.comments__item {
    position: relative;
    background-color: #5d47a9;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    width: 82%;

    @media (max-width: $lg) {
        font-size: 14px;
        line-height: 18px;
    }

    @media (max-width: $md) {
        font-size: 12px;
        line-height: 16px;
    }

    &:last-child {
        margin-bottom: 0;
    }

    &:nth-of-type(2n) {
        background-color: #e86cb2;
        position: relative;
        margin-left: auto;


        &:before {
            display: none;
        }

        &:after {
            position: absolute;
            content: '';
            right: -8px;
            bottom: 0;
            rotate: 1deg;
            border: 8px solid transparent;
            border-bottom: 12px solid #e86cb2;
            border-left: 12px solid #e86cb2;
        }

    }

    &:before {
        position: absolute;
        bottom: 0;
        left: -8px;
        content: '';
        border: 8px solid transparent;
        border-right: 8px solid #5d47a9;
        border-bottom: 12px solid #5d47a9;
    }

}

.comment__attributes {
    display: flex;
    justify-content: space-between;

    .widgets__date {
        display: inline;
        font-size: 12px;
        color: #5fff9e;

        @media (max-width: $md) {
            font-size: 9px;
        }
    }
}

.comment__user {
    font-size: 12px;
    color: #5fff9e;
    @media (max-width: $md) {
        font-size: 9px;

    }
}
</style>
