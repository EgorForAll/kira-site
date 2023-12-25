<script>
export default {
    name: 'NotAdmin'
}
</script>

<template>
    <div class="m-3 m-md-4">
        <h1>403. Your are not admin</h1>
        <router-link :to="{name: 'home'}">Перейти на главную страницу</router-link>
    </div>
</template>

