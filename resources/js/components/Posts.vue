<script>
import {mapActions, mapGetters, mapState} from "vuex";
import {toRaw} from "vue";
import ModalCard from "@/components/ModalCard.vue";

export default {
    name: 'Posts',
    components: {ModalCard},
    data() {
        return {
            isCardOpened: true
        }
    },
    methods: {
        ...mapActions({
            load: 'posts/fetchPosts'
        }),
        ...mapActions({
            setCurrentPost: "posts/setCurrentPost"
        })
    },
    computed: {
        ...mapGetters({
            posts: "posts/getPosts"
        }),
        ...mapGetters({
            currentPost: "posts/getCurrentPost"
        }),
    },
    created() {
        this.load()
    },
    updated() {
        const currentPost = toRaw(this.$store.state.posts.currentPost);
        if (currentPost) {

            document.querySelector('body').classList.add('overlay')
        }
    }

}
</script>

<template>
    <section class="posts">
        <div class="container pt-2 pb-2 pt-md-3 pb-md-3 pt-lg-5 pb-lg-5">
            <ul class="posts__list me-md-0 ms-md-0">
                <li @click="setCurrentPost(post)" class="posts__item cssanimation fadeIn" v-for="(post, index) in posts"
                    :key="index">
                    <img :src="post.image" :alt="post.title" class="posts__img">
                </li>
            </ul>
            <ModalCard v-if="currentPost" :currentPost="currentPost"/>
        </div>
    </section>
</template>

<style scoped lang="scss">
@import "../../scss/main";

.posts__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.posts__item {
    position: relative;
    width: 100%;
    height: 400px;
    padding: 10px;
    background-color: $blue;

    &:hover {
        &::before {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
            @include trans(background-color, 0.2s);
            background-color: rgba(0, 0, 0, 0.2);
            cursor: pointer;
        }
    }

    @media (max-width: $lg) {
        height: 250px;
    }
    @media (max-width: $md) {
        height: 150px;
    }
}

.posts__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 30px;
    row-gap: 40px;
    z-index: 1;

    @media (max-width: $md) {
        column-gap: 15px;
        row-gap: 15px;
    }
}


</style>
