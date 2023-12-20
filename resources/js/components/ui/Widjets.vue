<script>
import HeartSVG from "../../../assets/images/heart.svg?component";
import CommentSVG from "../../../assets/images/comment.svg"

export default {
    name: 'Widgets',
    props: ['comments', 'postId'],
    data() {
        return {
            likes: 0
        }
    },
    components: {HeartSVG, CommentSVG},
    methods: {
        onClickBtn() {
            this.$emit('showComments')
        },
        // onLike() {
        //     this.$axios.post(`/laravel_route/like/${this.$props.postId}`).then((res) => console.log(res))
        // },
        getLikes() {
            this.$axios.get(`/laravel_route/likes/${this.$props.postId}`).then((res) => {
                if (res.status === 200) {
                    this.likes = res.data.likes
                }
            })
        }
    },
    created() {
        this.getLikes()
    }
}
</script>

<template>
    <div class="widgets__buttons">
        <div class="widgets__button-wrapper">
            <span class="widgets__number">{{likes}}</span>
            <button @click="onLike" class="widgets__button btn-heart">
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
@import "../../../scss/main";
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
