<script>
import {mapGetters} from "vuex";
import {useVuelidate} from '@vuelidate/core'
import {required, minLength} from '@vuelidate/validators'
import {isUser, isIncludesHtml} from "@/utils.js";

export default {
    name: 'CommentForm',
    setup() {
        return {v$: useVuelidate()}
    },
    props: ['isAddNewComment', 'postId'],
    data() {
        return {
            error: '',
            form: {
                comment: ''
            }
        }
    },
    methods: {
        async submitForm(e) {
            e.preventDefault()
            const isFormCorrect = await this.v$.$validate()
            if (isFormCorrect) {
                const data = {
                    comment: this.$refs.commentInput.value,
                    user: this.user.name,
                    post_id: this.$props.postId
                }

                this.$axios.get('/sanctum/csrf-cookie').then(response => {
                    this.$axios.post('laravel_route/comments', data).then(() => this.$emit('loadNewComments'))
                }).catch((err) => alert(`Произошла ошибка ${err}`))

                this.$emit('closeCommentInput')

            }
        },
    },
    computed: {
        ...mapGetters({
            user: "auth/getUser",
        }),
    },
    validations() {
        return {
            form: {
                comment: {required, minLength: minLength(5), isUser: isUser(this.user.name), isIncludesHtml}
            }
        }
    }
}
</script>

<template>
    <form v-if="isAddNewComment" ref="formComment" action="#" class="comment__form" method="post"
          @submit="submitForm">
        <div class="comment__textarea-wrapper">
            <textarea v-model.trim="v$.form.comment.$model" ref="commentInput"
                      :class="'comment__textarea'"
                      placeholder="Напишите комментарий Кире"></textarea>
            <p class="error-msg" v-if="v$.form.comment.minLength.$invalid">Введите не менее 5 символов</p>
            <p class="error-msg" v-if="v$.form.comment.isUser.$invalid">
                Пожалуйста, авторизируйтесь
            </p>
        </div>
        <button type="submit" @submit="submitForm" class="comment__submit">Опубликовать</button>
    </form>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.error-msg {
    font-size: 12px;
    color: #e05151 !important;
    max-width: 60%;
    text-align: center;
    padding: 5px;
    border-radius: 5px;
    margin-top: 5px;
    margin-bottom: 0;
    background-color: #cad5f6;
    @media (max-width: $md) {
        font-size: 10px;
        max-width: 100%;
    }
}

.is-invalid {
    @extend .comment__textarea;
    border: 1px solid #d34e4e;
}

.comment__submit {
    width: 170px;
    background-color: #5d47a9;
    color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    margin-top: 10px;
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
