<script>
import {mapActions} from "vuex";
import {toRaw} from "vue";
import {findSrc} from "@/utils.js";

export default {
    name: 'PostCard',
    props: ['post'],
    methods: {
        image() {
            return findSrc(this.$props.post.image);
        },
        ...mapActions({
            setCurrentPost: "posts/setCurrentPost"
        }),
    },
    computed: {
        currentPost() {
            return toRaw(this.$props.post)
        }
    }
}
</script>

<template>
    <li @click="setCurrentPost(currentPost)" class="posts__item cssanimation fadeInBottom">
        <img :src="image()" :alt="post.title" class="posts__img">
    </li>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

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
        padding: 5px;
    }
}

</style>
