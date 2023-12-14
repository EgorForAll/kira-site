<script>
export default {
    name: 'CommentForm',
    props: ['isAddNewComment']
}
</script>

<template>
    <form v-if="isAddNewComment" ref="formComment" action="#" class="comment__form">
        <div class="comment__textarea-wrapper">
            <textarea class="comment__textarea" placeholder="Напишите комментарий Кире"></textarea>
        </div>
        <button class="comment__submit">Опубликовать</button>
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
</style>
