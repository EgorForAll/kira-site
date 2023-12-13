<script>
export default  {
    name: 'PaginationList',
    props: ['posts', 'currentPosts']
}
</script>

<template>
    <div class="pagination pt-lg-5 pb-lg-5">
        <button @click="$emit('loadMore')" class="pagination__button" :disabled="posts.length === currentPosts.length">{{posts.length === currentPosts.length ? 'Посты закончились(' : 'Загрузить еще'}}</button>
    </div>
</template>

<style scoped lang="scss">
@import "../../scss/main";
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}
.pagination__button {
    font-size: 20px;
    border: none;
    background-color: #ABCDFF;
    @include  trans(background-color, 0.3s);
    padding: 10px 20px;
    border-radius: 5px;
    color: #333;
    &:hover {
        background-color: #4C80CE;
    }


    &:disabled {
        background-color: #4a5568;
        color: #fff;
    }
}
</style>
