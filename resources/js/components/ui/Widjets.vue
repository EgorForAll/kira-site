<script>
import HeartSVG from "../ui/HeartSVG.vue";
import CommentSVG from "../../../assets/images/comment.svg"
import {mapGetters} from "vuex";

export default {
    name: 'Widgets',
    props: ['comments', 'postId'],
    data() {
        return {
            likes: 0,
            liked: false,
            isErrorShow: false,
            isLoading: false
        }
    },
    components: {HeartSVG, CommentSVG},
    computed: {
        ...mapGetters({
            user: "auth/getUser"
        })
    },
    methods: {
        onClickBtn() {
            this.$emit('showComments')
        },
        onLike() {
            if (this.user.name) {
                this.isLoading = true
                if (this.$data.liked) {
                    this.$axios.post(`/laravel_route/unlike/${this.$props.postId}`).then((res) => {
                        if (res.status === 200) {
                            this.likes--
                            this.liked = false
                        }
                    })
                } else {
                    this.$axios.post(`/laravel_route/like/${this.$props.postId}`).then((res) => {
                        if (res.status === 200) {
                            this.likes++
                            this.liked = true
                        }
                    })
                }
                this.isLoading = false
            } else {
                this.isErrorShow = true
                setTimeout(() => this.isErrorShow = false, 3000)
            }
        },
        getLikes() {
            this.$axios.get(`/laravel_route/likes/${this.$props.postId}`).then((res) => {
                if (res.status === 200) {
                    this.likes = res.data.likes
                    if (res.data.liked) {
                        this.liked = true
                    }
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
            <span class="widgets__number">{{ likes }}</span>
            <button @click="onLike" class="widgets__button btn-heart" :disabled="isLoading">
                <HeartSVG :liked="liked"/>
            </button>
        </div>
        <div class="widgets__button-wrapper">
            <span class="widgets__number">{{ comments.length }}</span>
            <button @click="onClickBtn" class="widgets__button btn-comment">
                <CommentSVG/>
            </button>
        </div>
        <transition name="custom-classes-transition"
                    enter-active-class="cssanimation fadeInTop" leave-active-class="cssanimation fadeOutTop">
            <span v-if="isErrorShow" type="button" class="error" data-bs-title="Подсказка внизу">
                Необходима авторизация
            </span>
        </transition>
    </div>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.modal-card .error {
    position: fixed;
    bottom: 1%;
    left: -1%;
    display: flex;
    align-items: center;
    width: max-content;
    @media (max-width: $lg) {
        bottom: 7%;
        left: -2%;
    }
    @media (max-width: $md) {
        bottom: 5%;
        left: -4%;
    }
}


.error {
    position: absolute;
    left: -4px;
    font-size: 12px;
    line-height: 15px;
    background-color: #e3d1d1;
    border-radius: 10px;
    padding: 5px 10px;
    bottom: -5px;

    &::before {
        position: absolute;
        content: '';
        top: -20px;
        left: 70px;
        border: 10px solid transparent;
        border-bottom: 10px solid #e3d1d1;
        @media (max-width: $md) {
            left: 40px;
        }
    }

    @media (max-width: $lg) {
        bottom: -10px;
    }
    @media (max-width: $md) {
        bottom: -20px;
        font-size: 9px;
        line-height: 12px;
        padding: 5px;
    }
}


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
