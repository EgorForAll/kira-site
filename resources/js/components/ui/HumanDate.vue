<script>
import {defineHumanDate} from "@/utils.js";
export  default {
    name: 'HumanDate',
    props: ['inDate'],
    computed: {
        outDate() {
            return defineHumanDate(this.$props.inDate)
        }
    }
}
</script>

<template>
    <span class="human__date">{{outDate}}</span>
</template>

<style scoped lang="scss">
@import "../../../scss/main";
.widgets__date {
    font-size: 16px;
    display: block;
    color: #000;
    @media (max-width: $md) {
        font-size: 14px;
    }
}
</style>
