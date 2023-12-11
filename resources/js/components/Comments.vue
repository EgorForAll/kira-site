<script>
export default {
    name: 'Comments',
    props: ['comments'],
    beforeUnmount() {

    }
}
</script>

<template>
    <div ref="comment" class="comments">
        <ul class="comments__list">
            <li v-for="(comment, index) in comments" :key="index" class="comments__item">{{ comment.comment }}</li>
        </ul>
    </div>
</template>

<style scoped lang="scss">
@import "../../scss/main";

.comments {
    position: fixed;
    top: 35%;
    left: 0;
    width: 400px;
    min-height: 300px;
    color: #000;
    background-color: #cdbfff;
    z-index: 4;
    border-radius: 0 10px 10px 0;
    box-shadow: 0 0 1px 2px #5d47a9;
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
    padding: 20px;
}

.comments__item {
    position: relative;
    background-color: #5d47a9;
    margin-bottom: 10px;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    width: 82%;

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
        border-right: 12px solid #5d47a9;
        border-bottom: 12px solid #5d47a9;
    }
}
</style>
