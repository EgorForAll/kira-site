<script>
import Widgets from "./Widjets.vue";
import Date from "./Date.vue";


export default {
    name: 'ListCard',
    props: ['post', 'comments'],
    components: {Widgets, Date},
    data() {
        return {
            isCommentShow: false,
        }
    },
    methods: {
        toggleComment() {
            this.$data.isCommentShow = !this.$data.isCommentShow
        },
    },
}
</script>

<template>
    <li class="list__card">
        <header class="card__header pb-3 pt-0">
            <span class="card__title">#{{ post.title }}</span>
        </header>
        <div class="card__img-wrapper">
            <img :src="post.image" :alt="post.title" width="100%" class="card__img">
        </div>
        <div class="card__content pt-lg-3 pb-lg-3">
            <p class="card__text">{{ post.content }}</p>
        </div>
        <div class="card__widgets pt-lg-3 pb-lg-3">
            <widgets :likes="post.likes" :comments="comments" @showComments="toggleComment()"/>
            <date :in-date="post.created_at"/>
        </div>
        <div class="card__comments" v-if="isCommentShow">
            <ul class="comments__list">
                <li class="comments__item" v-for="(comments) in comments" :key="comment.id">
                    <div class="comments__text">{{ comment.comment }}</div>
                    <div class="comments__attr">
                        <span class="comments__user">{{ comment.user }}</span>
                        <span class="comments__date">{{ comment.created_at }}</span>
                    </div>
                </li>
            </ul>
        </div>
    </li>
</template>

<style scoped lang="scss">
.list__card {
    width: 100%;
    padding: 20px 40px;
    background-color: #ABCDFF;
    border-radius: 10px;
    margin-bottom: 50px;

    &:last-child {
        margin-bottom: 0;
    }

}

.card__img {
    object-fit: cover;
    box-shadow: 0 0 7px 5px #5d797c;
    border-radius: 10px;
    height: 500px;
}

.card__title {
    color: #3600ff;
    font-size: 20px;
}

.card__widgets {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card__content {
    border-bottom: 3px solid #4C80CE;
}

.card__text {
    font-size: 18px;
    line-height: 25px;
    text-align: justify;
    margin: 0;
    max-height: 300px;
    overflow-y: scroll;
    padding: 10px 20px;
}
</style>
