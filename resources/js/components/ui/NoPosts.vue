<script>
export default  {
    name: 'NoPosts'
}
</script>

<template>
<h2 class="no-posts mt-5 mb-5">Здесь пока нет постов, но скоро появятся!</h2>
</template>

<style scoped lang="scss">
@import "../../../scss/main";
    .no-posts {
        font-size: 40px;
        color: #bc9c9c;
        text-align: center;
        font-weight: 700;
        line-height: 50px;
        @media (max-width: $lg) {
            font-size: 30px;
            line-height: 40px;
        }
        @media (max-width: $md) {
            font-size: 23px;
            line-height: 28px;
        }
    }
</style>
