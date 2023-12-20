<script>
export default  {
    name: 'HeartSVG',
    props: ['liked']
}
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg"  fill="#4C80CE" :class="liked ? 'bi bi-heart-fill liked' : 'bi bi-heart-fill'" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>
</template>

<style scoped lang="scss">
@import "../../../scss/main";

.bi-heart-fill {
    width: 40px;
    height: 40px;
    @include trans(fill, 0.3s);
    &:hover {
        fill: #295bc2;
    }
    @media (max-width: $md) {
        width: 20px;
        height: 20px;
    }
}

.liked {
    fill: #d34e4e;
}

</style>
