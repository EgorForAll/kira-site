<script>
export default {
    name: 'PostCard',
    props: ['setCurrentPost', 'post']
}
</script>

<template>
    <li @click="setCurrentPost(post)" class="posts__item cssanimation fadeInTop">
        <img :src="post.image" :alt="post.title" class="posts__img">
    </li>
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
        padding: 5px;
    }
}

</style>
