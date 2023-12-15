<script>
import HumanDate from "../ui/HumanDate.vue";
export default {
    name: 'BalloonComment',
    props: ['comments'],
    components: {HumanDate}
}

</script>

<template>
    <li v-if="comments.length" v-for="(comment, index) in comments" :key="index" class="comment">
        <div class="comment__text">{{ comment.comment }}</div>
        <div class="comment__attributes">
            <span class="comment__user">{{ comment.user }}</span>
            <human-date :in-date="comment.created_at"/>
        </div>
    </li>
    <div class="no-comments" v-else><span>Здесь пока нет комментариев. <br/> Будьте первыми!</span></div>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.no-comments {
    display: flex;
    flex-grow: 1;
    text-align: center;
    span {
        font-size: 20px;
        font-weight: 700;
        margin: auto;
    }
}

.comment__attributes {
    display: flex;
    justify-content: space-between;

    .human__date {
        display: inline;
        font-size: 12px;
        color: #fff;

        @media (max-width: $md) {
            font-size: 9px;
        }
    }
}

.comment {
    position: relative;
    background-color: #5b527b;
    margin-bottom: 15px;
    padding: 10px;
    border-radius: 10px;
    color: #fff;
    width: 70%;

    @media (max-width: $lg) {
        font-size: 14px;
        line-height: 18px;
    }

    @media (max-width: $md) {
        width: 85%;
        font-size: 12px;
        line-height: 16px;
    }

    &:before {
        position: absolute;
        bottom: 0;
        left: -8px;
        content: "";
        border: 9px solid transparent;
        border-right: 10px solid #5b527b;
        border-bottom: 6px solid #5b527b;
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
            content: "";
            right: -7px;
            bottom: 0;
            rotate: 1deg;
            border: 14px solid transparent;
            border-bottom: 9px solid #e86cb2;
            border-left: 2px solid #e86cb2;
        }

    }

    .comment__user {
        font-size: 12px;
        color: #fff;
        @media (max-width: $md) {
            font-size: 9px;

        }
    }
}
</style>
