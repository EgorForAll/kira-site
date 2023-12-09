<script>
export default {
    name: 'Posts'
}
</script>

<template>
    <section class="posts">
        <div class="container ps-0 pe-0 pt-lg-5 pb-lg-5">
            <ul class="posts__list">
                <li class="posts__item">
                    <img src="" alt="" class="posts__img">
                </li>
                <li class="posts__item">
                </li>
                <li class="posts__item">
                </li>
                <li class="posts__item">
                </li>
            </ul>

        </div>
    </section>
</template>

<style scoped lang="scss">
@import "../../scss/main";

.posts__item {
    width: 100%;
    height: 300px;
    background-color: $blue;
}

.posts__list {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap: 30px;
    row-gap: 40px;
}
</style>
