<script>
import {mapActions} from "vuex";

export default  {
    name: 'NewPost',
    methods: {
        ...mapActions({
            setCreateNew: "posts/setCreateNew"
        }),
        onCloseBtn() {
            this.setCreateNew()
            document.querySelector('body').classList.remove('overlay')
        },
        onEscDown(e) {
            if (e.key === 'Escape' || e.key === 'Esc') {
                this.onCloseBtn()
            }
        },
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
            <button @click="onCloseBtn"  type="button" class="btn-close modal-card__btn-close" aria-label="Закрыть"></button>
        </div>
        <form class="new-post__form" action="" enctype="multipart/form-data" method="post">
            <div class="new-post-title pt-2 pb-2 pt-lg-3 pb-lg-3">
                <label for="title">Название поста:</label>
                <input type="text" class="new-post__title-input" name="title" id="title">
            </div>
            <div class="new-post__content pt-2 pb-2 pt-lg-3 pb-lg-3">
                <label class="file-label" for="image">Фото</label>
                <input type="file" class="new-post__image" id="image" name="image" accept="image/png, image/jpeg">
                <textarea name="description" id="description"  class="new-post__text-area"></textarea>
            </div>
            <div class="new-post__footer">
                <button type="submit" class="btn btn-primary new-post__btn">Опубликовать</button>
                <button class="btn btn-secondary new-post__btn ms-3" type="reset">Сбросить</button>
            </div>
        </form>
    </div>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

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
        height: 350px;
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
</style>
