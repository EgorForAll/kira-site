<script>
import Spinner from "@/components/ui/Spinner.vue";
import {mapActions} from "vuex";
import {useVuelidate} from '@vuelidate/core'
import {isIncludesHtml} from "../../utils.js";

export default {
    name: 'NewPost',
    components: {Spinner},
    props: ['currentTitle', 'currentContent', 'currentImage', 'id'],
    setup() {
        return {v$: useVuelidate()}
    },
    data() {
        return {
            isLoading: false,
            title: this.$props.currentTitle,
            content: this.$props.currentContent,
        }
    },
    validations() {
        return {
            title: {isIncludesHtml},
            content: {isIncludesHtml}
        }
    },
    methods: {
        ...mapActions({
            updatePosts: "posts/fetchPosts"
        }),
        ...mapActions({
            setCurrentPost: "posts/setCurrentPost"
        }),
        onCloseBtn() {
            this.setCurrentPost(null)
            this.$emit('openEditModal')
            document.querySelector('body').classList.remove('overlay')
        },
        onEscDown(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                this.onCloseBtn()
            }
        },
        async onSubmit(e) {
            e.preventDefault()
            const isFormCorrect = await this.v$.$validate()
            if (isFormCorrect) {
                this.isLoading = true;
                const data = new FormData()
                data.append('title', this.title ?? '')
                data.append('content', this.content ?? '')
                data.append('image', this.$refs.fileRef.files[0] ?? '')
                data.append('_method', 'PATCH');
                const options = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
                this.$axios.post(`laravel_route/posts/update/${this.$props.id}`, data, options).then((res) => {
                    if (res.status === 200) {
                        this.updatePosts({url: 'http://127.0.0.1:8000/laravel_route/posts', isUpdate: true})
                        document.querySelector('body').classList.remove('overlay')
                        this.isLoading = false
                        this.setCurrentPost(null)
                        this.$emit('openEditModal')
                    }
                })
            } else {
                alert('Проверьте правильность введенных данных')
            }
        }
    },
    mounted() {
        window.addEventListener('keydown', this.onEscDown)
    },
    beforeUnmount() {
        window.removeEventListener('keydown', this.onEscDown)
    }
}
</script>

<template>
    <div class="new-post">
        <div class="new-post__header d-flex justify-content-end">
            <button @click="onCloseBtn" type="button" class="btn-close modal-card__btn-close"
                    aria-label="Закрыть"></button>
        </div>
        <form class="new-post__form" action="" enctype="multipart/form-data" method="post">
            <div class="new-post-title pt-2 pb-2 pt-lg-3 pb-lg-3">
                <label for="title">Название поста:</label>
                <input v-model.trim="v$.title.$model" type="text" class="new-post__title-input" name="title" id="title">
            </div>
            <div class="new-post__content pt-2 pb-2 pt-lg-3 pb-lg-3">
                <label class="file-label" for="image">Фото</label>
                <input ref="fileRef" type="file" class="new-post__image" id="image" name="image"
                       accept="image/png, image/jpeg, image/jpg">
                <textarea v-model.trim="v$.content.$model" name="content" id="content"
                          class="new-post__text-area"></textarea>
            </div>
            <div class="new-post__footer">
                <button :disabled="isLoading" @click="onSubmit" type="submit" class="btn btn-primary new-post__btn">
                    Редактировать
                </button>
                <button class="btn btn-secondary new-post__btn ms-md-3 ms-1" type="reset">Сбросить</button>
                <spinner v-if="isLoading"/>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.new-post__footer .spinner-border {
    width: 20px;
    height: 20px;
    margin-left: 20px;
    margin-top: 10px;
}

.new-post__form label {
    font-size: 14px;
}

.new-post__btn {
    font-size: 18px;
    @media (max-width: $md) {
        font-size: 12px;

    }
}

.new-post__text-area {
    margin-top: 30px;
    width: 100%;
    height: 150px;
    padding: 10px 15px;
    resize: none;
    border-radius: 5px;
    border: 1px solid #333;
    margin-bottom: 10px;
    @media (max-width: $md) {
        height: 100px;
        font-size: 12px;
        margin-top: 15px;
    }
}

.file-label {
    @include visually-hidden;
}

.new-post {
    @include modal-card();
    height: 450px;
    margin-left: -300px;
    top: 60%;
    @media (max-width: $lg) {
        height: 400px;
    }
    @media (max-width: $md) {
        height: 330px;
        margin-top: -290px;
    }
}

.new-post__title-input {
    margin-left: 10px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #333;
    padding-bottom: 3px;

    @media (max-width: $md) {
        margin-left: 0;
    }

    &:focus {
        outline: none;
    }
}

.new-post__image {
    font-size: 16px;
    @media (max-width: $md) {
        font-size: 12px;
    }
}
</style>
