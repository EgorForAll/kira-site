<script>
import { mapActions, mapGetters } from "vuex";
import Header from "../layout/Header.vue";
import Introduction from "../blocks/Intro.vue";
import PostsTable from "../blocks/PostsTable.vue";
import PostList from "../blocks/PostsListHome.vue";
import Mail from "../blocks/Mail.vue";
import Footer from "../layout/Footer.vue";
import Subsribe from "../blocks/Subsribe.vue";

export default {
    name: "Home",
    components: {
        Introduction,
        PostsTable,
        Header,
        PostList,
        Footer,
        Mail,
        Subsribe,
    },
    data() {
        return {
            isTableView: true,
            isMailOpened: false,
            isSubscribeOpened: false,
        };
    },
    methods: {
        ...mapActions({
            loadPosts: "posts/fetchPosts",
        }),
        ...mapActions({
            loadComments: "comments/fetchComments",
        }),
        ...mapActions({
            getUser: "auth/fetchUserData",
        }),
        onClickMail() {
            document.querySelector("body").classList.add("overlay");
            this.isMailOpened = true;
        },
        onCloseMail() {
            document.querySelector("body").classList.remove("overlay");
            this.isMailOpened = false;
        },
        onClickSubcribe() {
            document.querySelector("body").classList.add("overlay");
            this.isSubscribeOpened = true;
        },
        onCloseSubscribe() {
            document.querySelector("body").classList.remove("overlay");
            this.isSubscribeOpened = false;
        },
    },
    computed: {
        ...mapGetters({
            postsPerPage: "posts/getPostsPerPage",
        }),
        ...mapGetters({
            posts: "posts/getPosts",
        }),
        ...mapGetters({
            comments: "comments/getComments",
        }),
    },
    created() {
        this.loadPosts({
            url: `http://127.0.0.1:8000/laravel_route/posts`,
            isUpdate: true,
        });
        this.loadComments();
        this.getUser();
    },
};
</script>

<template>
    <div class="root">
        <Header />
        <main>
            <introduction
                @set-view="isTableView = !isTableView"
                :is-table-view="isTableView"
            />
            <posts-table
                v-if="isTableView"
                :posts="posts"
                :comments="comments"
                :posts-per-page="postsPerPage"
            />
            <post-list v-else :posts="posts" :comments="comments" />
            <transition
                name="custom-classes-transition"
                enter-active-class="cssanimation fadeInBottom"
                leave-active-class="cssanimation fadeOutBottom"
            >
                <mail v-if="isMailOpened" @on-close-mail="onCloseMail" />
            </transition>
            <transition
                name="custom-classes-transition"
                enter-active-class="cssanimation fadeInBottom"
                leave-active-class="cssanimation fadeOutBottom"
            >
                <subsribe
                    v-if="isSubscribeOpened"
                    @on-close-subscribe="onCloseSubscribe"
                />
            </transition>
        </main>
        <Footer
            @on-click-mail="onClickMail"
            @on-click-subscribe="onClickSubcribe"
        />
    </div>
</template>
