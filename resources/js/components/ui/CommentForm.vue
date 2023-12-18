<script>
import {mapGetters} from "vuex";

export default {
    name: 'CommentForm',
    props: ['isAddNewComment', 'postId'],
    methods: {
        onSubmit() {
            if (this.$refs.commentInput.value.length > 0) {
                const data = {
                    comment: this.$refs.commentInput.value,
                    user: this.user.name,
                    post_id: this.$props.postId
                }

                this.$axios.get('/sanctum/csrf-cookie').then(response => {
                    this.$axios.post('laravel_route/comments', data).then(() => this.$emit('loadNewComments'))
                }).catch((err) => alert(`Произошла ошибка ${err}`))

                this.$emit('closeCommentInput')
                // setTimeout(()=>this.$emit('loadNewComments'), 250)
            } else {
                alert('Введите комментарий')
            }
        }
    },
    computed: {
        ...mapGetters({
            user: "auth/getUser",
        }),
    }
}
</script>

<template>
    <form v-if="isAddNewComment" ref="formComment" action="#" class="comment__form" method="post">
        <div class="comment__textarea-wrapper">
            <textarea ref="commentInput" class="comment__textarea" placeholder="Напишите комментарий Кире"></textarea>
        </div>
        <button @click="onSubmit" type="button" class="comment__submit">Опубликовать</button>
    </form>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.comment__textarea-wrapper {
    position: relative;

    &::before {
        position: absolute;
        bottom: 2px;
        left: -8px;
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
    margin-top: 20px;
    height: 30px;
    border-radius: 5px;
    @include trans(background-color, 0.2s);

    @media (max-width: $md) {
        font-size: 12px;
        width: 130px;
        margin-top: 10px;
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
    width: 100%;
}
</style>
