<script>
export default {
    name: 'NotFound'
}
</script>

<template>
    <div class="m-3 m-md-4">
        <h1>404. Page not found</h1>
        <router-link :to="{name: 'home'}">Перейти на главную страницу</router-link>
    </div>
</template>

