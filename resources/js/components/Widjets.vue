<script>
import HeartSVG from "../../assets/images/heart.svg?component";
import CommentSVG from "../../assets/images/comment.svg"

export default {
    name: 'Widgets',
    props: ['likes', 'comments'],
    components: {HeartSVG, CommentSVG},
    methods: {
        onClickBtn() {
            this.$emit('showComments')
        }
    }
}
</script>

<template>
    <div class="widgets__buttons">
        <div class="widgets__button-wrapper">
            <span class="widgets__number">{{likes}}</span>
            <button class="widgets__button btn-heart">
                <HeartSVG/>
            </button>
        </div>
        <div class="widgets__button-wrapper">
            <span class="widgets__number">{{comments.length}}</span>
            <button @click="onClickBtn" class="widgets__button btn-comment">
                <CommentSVG/>
            </button>
        </div>
    </div>
</template>

<style scoped lang="scss">
@import "../../scss/main";
.widgets__number {
    font-size: 18px;
    color: #000;
    margin-right: 5px;

    @media (max-width: $lg) {
        font-size: 14px;
    }
}
.widgets__buttons {
    display: flex;
}
.widgets__button-wrapper {
    display: flex;
    align-items: center;
    &:nth-child(2) {
        margin-left: 15px;
        @media (max-width: $md) {
            margin-left: 5px;
        }
    }

}

.widgets__button {
    background-color: transparent;
    border: none;
    padding: 0;
}
</style>
