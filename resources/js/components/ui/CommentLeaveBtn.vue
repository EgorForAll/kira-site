<script>
export default {
    name: 'CommentLeaveBtn',
    props: ['isAddNewComment'],
}
</script>

<template>
    <button v-if="!isAddNewComment" @click="$emit('onClickBtn')" class="comment__add">
        Оставить комментарий
    </button>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.comment__add {
    padding: 5px 10px;
    background-color: #a9a9ff;
    border: 1px solid #333;
    color: #333;
    transition: color, background-color, 0.2s ease;
    border-radius: 5px;
    font-size: 16px;

    @media (max-width: $md) {
        font-size: 12px;
        padding: 5px;
    }

    &:hover {
        color: #000;
        background-color: #5d797c;
    }
}
</style>
