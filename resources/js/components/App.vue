<script>
import Header from "./Header.vue"
import Intro from "@/components/Intro.vue";
import Posts from "@/components/Posts.vue";
export default  {
    name: 'App',
    components: {Header, Intro, Posts}
}
</script>


<template>
    <div class="root">
        <Header/>
        <main>
            <Intro/>
            <Posts />
        </main>

    </div>
</template>


