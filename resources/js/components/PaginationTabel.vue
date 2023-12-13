<script>
export default {
    name: 'Pagination',
    props: ['totalPosts', 'postsPerPage', 'togglePage', 'currentPage'],
    methods: {
        findNumberPage() {
            const pageNumbers = [];
            for (let i = 1; i <= Math.ceil(this.$props.totalPosts / this.$props.postsPerPage); i++) {
                pageNumbers.push(i);
            }
            return pageNumbers;
        },
        onClick(value) {
            window.scrollTo(0, 100);
            this.$emit('togglePage', value);
        }
    }
}
</script>

<template>
    <div class="pagination pb-lg-5 pt-lg-5">
        <ul class="pagination__list">
            <li class="pagination__item" v-for="(page, index) in findNumberPage()" :key="index">
                <button @click="onClick(page)" class="pagination__btn" :disabled="page === currentPage">{{page}}</button>
            </li>
        </ul>
    </div>
</template>

<style scoped lang="scss">

@import "../../scss/main";

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
}

.pagination__list {
    margin: 0;
    display: flex;
    align-items: center;
}

.pagination__item {
    margin-right: 10px;
    &:last-child {
        margin-right: 0;
    }
}

.pagination__btn {
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
